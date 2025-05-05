import { getFullStatusList, IGraphData, LinkGraph, NodeGraph, Status } from 'components/UIControl/lib/graphTypes';
import { Predicate, LineFilter, Filters } from './lib/filterTypes';

/**
* Добавление предиката в массив.
* @param {string} name - наименование,
* @param {string} area - область (для более удобного поиска предикатов, созданных автоиматически),
* @param {Predicate<T>} predicate - наименование,
* @param {LineFilter<T>} filters - массив предикатов,
* @param {boolean} unique - является ли уникальным 
*   (если да - данным предикатом будет заменен имеющийся с таким же имененм),
* @returns {LineFilter<T>}
*/
function addLineCondition<T>(
  name: string,
  area: string,
  predicate: Predicate<T>,
  filters: LineFilter<T>,
  unique: boolean,
): LineFilter<T> {
  const newFilters = unique !== true ? [...filters] :
    [...filters].filter((condition) => condition.name !== name);
    
  newFilters.push({ name, area, condition: predicate });
  return newFilters;
}

/**
* Добавление предиката в массив для узлов.
* @param {string} name - наименование,
* @param {string} area - область (для более удобного поиска предикатов, созданных автоиматически),
* @param {Predicate<T>} predicate - наименование,
* @param {LineFilter<T>} filters - массив предикатов,
* @param {boolean} unique - является ли уникальным
*   (если да - данным предикатом будет заменен имеющийся с таким же имененм),
* @returns {Filters}
*/
export const addNodeCondition = (
  name: string,
  area: string,
  predicate: Predicate<NodeGraph>,
  filters: Filters,
  unique: boolean,
): Filters => (
  {
    nodeFilters: addLineCondition<NodeGraph>(name, area, predicate, filters.nodeFilters, unique),
    linkFilters: [...filters.linkFilters],
  }
);

/**
* Добавление предиката в массив для связей.
* @param {string} name - наименование,
* @param {string} area - область (для более удобного поиска предикатов, созданных автоиматически),
* @param {Predicate<T>} predicate - наименование,
* @param {LineFilter<T>} filters - массив предикатов,
* @param {boolean} unique - является ли уникальным
*   (если да - данным предикатом будет заменен имеющийся с таким же имененм),
* @returns {Filters}
*/
export const addLinkCondition = (
  name: string,
  area: string,
  predicate: Predicate<LinkGraph>,
  filters: Filters,
  unique: boolean,
): Filters => (
  {
    nodeFilters: [...filters.nodeFilters],
    linkFilters: addLineCondition<LinkGraph>(name, area, predicate, filters.linkFilters, unique),
  }
);

/**
* Автоматическое обновление массива предикатов для статусов узлов.
* @param {Filters} filters - текущий набор,
* @param {Status[]} actualStatuses - разрешенные статусы,
* @param {string} area - область (для более удобного поиска предикатов, созданных автоиматически),
* @returns {Filters}
*/
export const updateStatusNodeFilters = (
  filters: Filters,
  actualStatuses:Status[],
  area: string,
): Filters => {
  let newFilters = { ...filters };
  const statuses = getFullStatusList();
  newFilters.nodeFilters = [...newFilters.nodeFilters.filter((line) => line.area !== area)];

  statuses.forEach((status) => {
    if (!actualStatuses.includes(status)) {
      newFilters = addNodeCondition(
        `legend-status-not-${status}`,
        area,
        (node) => (node.status !== status),
        newFilters,
        true,
      );
    }
  });

  return newFilters;
};

/**
* Автоматическое обновление массива предикатов для статусов связей.
* @param {Filters} filters - текущий набор,
* @param {Status[]} actualStatuses - разрешенные статусы,
* @param {string} area - область (для более удобного поиска предикатов, созданных автоиматически),
* @returns {Filters}
*/
export const updateStatusLinkFilters = (
  filters: Filters,
  actualStatuses:Status[],
  area: string,
): Filters => {
  let newFilters = { ...filters };
  const statuses = getFullStatusList();
  newFilters.linkFilters = [...newFilters.linkFilters.filter((line) => line.area !== area)];

  statuses.forEach((status) => {
    if (!actualStatuses.includes(status)) {
      newFilters = addLinkCondition(
        `legend-status-not-${status}`,
        area,
        (link) => (link.status !== status),
        newFilters,
        true,
      );
    }
  });

  return newFilters;
};

/**
* Проверка выполнения условий (предикатов).
* @param {T} item - объект,
* @param {LineFilter<T>} lineFilter - условия,
* @returns {boolean}
*/
function checkPredicates<T>(item: T, lineFilter: LineFilter<T>): boolean {
  for (let i = 0; i < lineFilter.length; i += 1) {
    if (!(lineFilter[i].condition(item))) return false;
  }
  return true;
}

/**
* Применить фильтры к набору данных.
* @param {IGraphData} nodes, links - набор данных,
* @param {Filters | null} filters - условия,
* @returns {IGraphData}
*/
export const applyFilters = ({ nodes, links }: IGraphData, filters: Filters | null): IGraphData => {
  if (filters === null) return { nodes, links };

  const filteredNodes = nodes.filter((currentNode) => checkPredicates<NodeGraph>(currentNode, filters.nodeFilters));
  const allowedNodesSet = new Set(filteredNodes.map((currentNode) => currentNode.id));

  let filteredLinks = links.filter(
    (currentLink) => allowedNodesSet.has(currentLink.source) && allowedNodesSet.has(currentLink.target),
  );

  filteredLinks = filteredLinks.filter((currentLink) => checkPredicates<LinkGraph>(currentLink, filters.linkFilters));

  return { nodes: filteredNodes, links: filteredLinks };
};
