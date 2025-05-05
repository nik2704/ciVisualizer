import { getStatusColor } from 'utils/utils';
import { LinkGraph, NodeGraph, Status } from './graphTypes';
import { FilteredNodes } from './uiControlTypes';

/**
  * Возвращает массив связей, статусы которых есть в массиве statuses.
  * @param {LinkGraph[]} links - массив связей.
  * @param {Status[]} statuses - массив разрешенных статусов.
  * @returns {LinkGraph[]}
  */
export const getLinksFilteredByStatus = (links: LinkGraph[], statuses: Status[]): LinkGraph[] => (
  [...links].filter((link) => statuses.includes(link.status))
);

/**
  * Возвращает массив связей, без тех, что связывают узлы в массиве (в любом направлении).
  * @param {LinkGraph[]} links - массив связей.
  * @param {string[]} blackListIds - массив связей.
  * @returns {LinkGraph[]}
  */
export const getLinksFilteredByNodes = (links: LinkGraph[], blackListIds: string[]): LinkGraph[] => (
  [...links].filter((list) => (!blackListIds.includes(list.source)) && (!blackListIds.includes(list.target)))
);

/**
  * Возвращает массив связей c заполненым полем "color".
  * @param {LinkGraph[]} links - массив связей.
  * @returns {LinkGraph[]}
  */
export const getLinksColored = (links: LinkGraph[]): LinkGraph[] => (
  [...links].map((link) => ({ ...link, color: getStatusColor(link.status) }))
);

/**
  * Возвращает объект, содержащий массив ID узлов, статусы которых есть в массиве statuses и массив отфильтрованных ID.
  * @param {NodeGraph[]} nodes - массив узлов.
  * @param {Status[]} statuses - массив разрешенных статусов.
  * @returns {FilteredNodes}
  */
export const getNodesFilteredByStatus = (nodes: NodeGraph[], statuses: Status[]): FilteredNodes => {
  const result: FilteredNodes = { filteredIds: [], currentNodes: [] };

  [...nodes].forEach((node) => {
    statuses.includes(node.status) ? result.currentNodes.push(node) : result.filteredIds.push(node.id);
  });

  return result;
};
