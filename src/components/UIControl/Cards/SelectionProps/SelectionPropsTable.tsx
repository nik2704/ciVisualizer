import { memo, useCallback } from 'react';
import { isOdd } from 'utils/utils';
import { Status } from '../../lib/graphTypes';
import { EMPTY_SELECTION_DATA, SelectionProps } from './lib/selectionPropsTypes';

/**
* Компонент отображения свойств выбранного элемента графа.
* @returns {ReactElement}
*/
function SelectionPropsTable({
  currentNode,
  currentLink,
  selectionData = EMPTY_SELECTION_DATA,
}: SelectionProps) {
  /**
  * Выбор CSS класса цвета в зависимости от статуса.
  * @returns {string}
  */
  const selectStatusColor = useCallback((highliteStatus: boolean = false): string => {
    const obj = currentNode !== undefined ? currentNode : currentLink;
    let color = '';

    if (highliteStatus && obj) {
      switch (obj.status) {
        case Status.SUCCESS:
          color = 'ui-cell-green';
          break;
        case Status.WARNING:
          color = 'ui-cell-orange';
          break;
        case Status.CRITICAL:
          color = 'ui-cell-red';
          break;
        default:
          color = 'ui-cell-gray';
          break;
      }
    }
        
    return `ui-tbl-cell2 ${color}`;
  }, [currentNode, currentLink]);

  return (
    <table className="ui-tbl" >

      <tbody>
        {selectionData.map((line, idx) => (

          <tr className={isOdd(idx) ? 'ui-tbl-row ui-row-colored' : 'ui-tbl-row'} key={`ui-props-line_${idx}`}>

            <td className="ui-tbl-cell1">{line.name}</td>

            <td className={selectStatusColor(line.highliteStatus)} >{line.value}</td>

          </tr>
          
        ))}
      </tbody>

    </table>
  );
}

export default memo(SelectionPropsTable);
