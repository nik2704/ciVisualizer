import { MatrixLink, MatrixLinkStruct, MatrixCoordinates } from './graphTreeTypes';
import { NodeGraph, IGraphData } from './graphTypes';

/**
* Формирование матрицы входящих связей. Строка матрицы - индексы узлов, являющихся target.
* Столбец - индекс узла - source. Пересечение - индекс из массива связей.
*/
export class LinkMatrix {
  private links: MatrixLink[];
  private nodes: NodeGraph[];
  private matrix: number[][];
  
  /**
  * Создается матрица размером NхN (N - количество узлов),
  * где ячейки заполняются по правилу:
  * если есть связь i -> j, то значение = индекс связи из массива, иначе = -1.
  */
  constructor(graphData: IGraphData) {
    this.nodes = [...graphData.nodes];
    this.matrix = new Array(this.nodes.length);
    for (let i = 0; i < this.matrix.length; i += 1) {
      this.matrix[i] = new Array(this.nodes.length);
      this.matrix[i] = [...this.matrix[i]].map(() => -1);
    }

    this.links = [...graphData.links].map((link) => ({ 
      sourceIndex: this.nodes.findIndex((node) => node.id === link.source),
      targetIndex: this.nodes.findIndex((node) => node.id === link.target),
      linkGraph: { ...link },
    }));
    
    for (let i = 0; i < this.links.length; i += 1) {
      this.matrix[this.links[i].targetIndex][this.links[i].sourceIndex] = i;
    }
  }

  /**
  * Определение индексов значения в двумерном массиве результата.
  * @param {string[][]} result - массив, в котором требуется найти значение.
  * @param {string} value - значение, которое требуется найти.
  * @returns {Coordinates | null}
  */
  getValueCoordinatsFromResult = (result: string[][], value: string): MatrixCoordinates | null => {
    for (let i = 0; i < result.length; i += 1) {
      for (let j = 0; j < result[i].length; j += 1) {
        if (result[i][j] === value) {
          return {
            line: i,
            column: j,
          };
        }
      }
    }

    return null;
  };

  /**
  * Формирование матрицы, где в каждой строке содержатся индексы узлов - источников связей,
  * или -1, если по соответствующему   * индексу связи нет.
  * @returns {number[][]} - в результате: индекс строки это индекс узла,
  * а значение строки - массив входящих связей, или -1.
  */
  private getMatrixCopy = ():number[][] => ([...this.matrix].map((matrixLine) => [...matrixLine]));
  
  /**
  * Исключение значений -1.
  * @returns {number[][]} - в результате: индекс строки это индекс узла, а значение строки - массив входящих связей
  * для соотвествующего узла.
  */
  private getLinkMatrixShort = ():number[][] => (
    this.getMatrixCopy().map((line) => line.filter((element) => element !== -1))
  );
  
  /**
  * Получение индексов связей в идентификаторы узлов.
  * @returns {string[][]} - в результате: индекс строки это индекс узла, а значение строки - массив
  * узлов-source входящих связей для соотвествующего узла.
  */
  private getNodeIdexMatrix = ():string[][] => (
    this.getLinkMatrixShort().map((line) => line.map((index) => this.links[index].linkGraph.source))
  );
  
  /**
  * Получение отсортированной (по числу входящих связей по убыванию) матрицы,
  * где каждый элемент - объект, сожержащий идентификатор узла и связи (где данный объект target)
  * @returns {MatrixLinkStruct[]}
  */
  private getLinkStruct = (): MatrixLinkStruct[] => (
    this.getNodeIdexMatrix()
      .map((line, index) => ({ nodeId: this.nodes[index].id, targetIds: line }))
      .sort((obj1, obj2) => obj2.targetIds.length - obj1.targetIds.length)
  );

  /**
  * Добавление одного элнемента в результирующий массив по номеру строки (с проверкой существования элемента).
  * @param {string[][]} array - массив, в который требуется добавить элемент.
  * @param {number} line - массив, в котором требуется найти значение.
  * @param {string} id - значение, которое требуется найти.
  */
  private resultPushSingle = (array: string[][], line: number, id: string): string[][] => {
    const result: string[][] = [...array];
    const tmpCoordinates = this.getValueCoordinatsFromResult(array, id);
    if (tmpCoordinates !== null) return result;

    if (line < 0) {
      return [[id], ...array];
    }

    if (array[line]) {
      result[line].push(id);
    } else {
      result.push([id]);
    }

    return result;
  };

  /**
  * Добавление одного множества элнементов в результирующий массив по номеру строки.
  * @param {string[][]} array - массив, в который требуется добавить элемент.
  * @param {string[] | undefined} line - массив элементов, которые требуется добавить.
  * @param {number} line - номер строки.
  */
  private updateResult = (array: string[][], sourceIds: string[] | undefined, line: number): string[][] => {
    let result: string[][] = [...array];

    if (sourceIds !== undefined) {
      for (let i = 0; i < sourceIds.length; i += 1) {
        result = this.resultPushSingle(result, line, sourceIds[i]);
      }
    }

    return result;
  };

  /**
  * Обработка связки элементов: добавление элемнтов в итоговый массив.
  * @param {string[][]} array - массив, в который требуется добавить элементы.
  * @param {string} targetId - целевой элемент.
  * @param {string[] | undefined} sourceIds - массив источников.
  */
  private resultPush = (array: string[][], targetId: string, sourceIds?: string[]): string[][] => {
    const result: string[][] = [...array];
    const tmpCoordinates = this.getValueCoordinatsFromResult(result, targetId);

    if (tmpCoordinates === null) {
      let lineNumber = result.length;

      if (sourceIds) {
        for (let i = 0; i < sourceIds.length; i += 1) {
          const tmpSrcCoordinates = this.getValueCoordinatsFromResult(result, sourceIds[i]);
          if (tmpSrcCoordinates !== null) {
            lineNumber = tmpSrcCoordinates.line - 1;
            break;
          }
        }
      }

      return this.updateResult(this.resultPushSingle(result, lineNumber, targetId), sourceIds, lineNumber + 1);
    }

    return this.updateResult(result, sourceIds, tmpCoordinates.line + 1);
  };

  /**
  * Получение матрицы, где объекты размещены по соседству. Правило размещения:
  * для каждой строки из матрицы ({узел <- [массив узлов]}) в "результат" добавляет "узел"
  * (если его нет в "результате"), то определяем номер строки для добавления по [массив узлов],
  * если элементов из [массив узлов] нет, то - push в результат (узел, [массив узлов]). Если како-либо элемент
  * из [массив узлов] уже есть в "результате", то отсутствующие элементы из [массив узлов] добавляем
  * в эту же строку, а сам "узел" - добавляем на строку выше. При добавлении каждого узла делается проверка
  * его наличия в "результате".
  * @returns {string[][]}
  */
  getNodesColocated = (): string[][] => {
    let result: string[][] = [];
    const struct = this.getLinkStruct();

    for (let i = 0; i < struct.length; i += 1) {
      result = this.resultPush(result, struct[i].nodeId, struct[i].targetIds);
    }

    return result;
  };
}
