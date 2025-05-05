import { IGraph, Status } from 'components/UIControl/lib/graphTypes';
import { ViewMode } from 'components/UIControl/ToolBox/lib/toolBoxTypes';

export const STRING_STATUS_DATA = [ 
  [{ status: Status.CRITICAL, statusString: 'critical', color: 'red' }],
  [{ status: Status.WARNING, statusString: 'warning', color: 'orange' }],
  [{ status: Status.SUCCESS, statusString: 'success', color: 'green' }],
  [{ status: Status.UNKNOWN, statusString: 'unknown', color: 'gray' }],
];

export const TEST_NODE_TYPES = ['Host', 'Web server', 'File server', 'Database server'];

export const TOOL_BOX_MODES = [
  [{ viewMode: ViewMode.FORCE }],
  [{ viewMode: ViewMode.HIERARCHY }],
  [{ viewMode: ViewMode.ORTHOGONAL }],
  [{ viewMode: ViewMode.FORCE }],
  [{ viewMode: ViewMode.HIERARCHY }],
  [{ viewMode: ViewMode.ORTHOGONAL }],
];

export const TEST_SELECTION_DATA = [
  [{ currentNode: '-', currentLink: '-' }],
  [{ currentNode: '-', currentLink: 'test' }],
  [{ currentNode: 'test', currentLink: '-' }],
];

/**
* Для теста: возвращает описание тестовой записи связи.
* @returns { fieldCaption: string, fieldName: string, fieldValue: string }
*/
export const getTestLinksDescriptionData = () => [
  [{ idx: 0, fieldCaption: 'Тип', fieldValue: 'linked' }],
  [{ idx: 1, fieldCaption: 'Название', fieldValue: 'view name' }],
  [{ idx: 2, fieldCaption: 'Источник', fieldValue: 'srv1' }],
  [{ idx: 3, fieldCaption: 'Получатель', fieldValue: 'srv2' }],
  [{ idx: 4, fieldCaption: 'Статус', fieldValue: 'unknown' }],
];

/**
* Для теста: возвращает описание тестовой записи узла.
* @returns { fieldCaption: string, fieldName: string, fieldValue: string }
*/
export const getTestNodeDescriptionData = () => [
  [{ idx: 0, fieldCaption: 'Код', fieldValue: 'srv1' }],
  [{ idx: 1, fieldCaption: 'Название', fieldValue: 'srv1' }],
  [{ idx: 2, fieldCaption: 'Статус', fieldValue: 'warning' }],
];

/**
* Для демонстрации: возвращает пустую структуру.
* @returns {IGraph}
*/
export const getEmptyData = (): IGraph => ({
  nodes: [],
  links: [],
});

/**
* Для тестирования: возвращает простой набор данных.
* @returns {IGraph}
*/
export const getTestData = (): IGraph => ({
  nodes: [
    {
      code: 'srv1',
      name: 'srv1',
      type: 'File server',
      status: 'warning',
    },
    {
      code: 'srv2',
      name: 'srv2',
      type: 'Web server',
      status: 'critical',
    },
    {
      code: 'srv3',
      name: 'srv3',
      type: 'Host',
      status: 'success',
    },
  ],
  links: [
    {
      code: 'link-srv1',
      type: 'linked',
      name: 'view name',
      primary: 'srv1',
      secondary: 'srv2',
    },
    {
      code: 'link-srv3',
      type: 'linked',
      name: 'view name',
      primary: 'srv2',
      secondary: 'srv3',
    },
    {
      code: 'link-srv3-1',
      type: 'linked',
      name: 'view name',
      primary: 'srv3',
      secondary: 'srv1',
    },
  ],
});

/**
* Для демонстрации: возвращает наполненную структуру.
* @returns {IGraph}
*/
export const getData = (): IGraph => ({
  nodes: [
    {
      code: 'srv1',
      name: 'srv1',
      type: 'File server',
      status: 'success',
    },
    {
      code: 'srv2',
      name: 'srv2',
      type: 'File server',
      status: 'success',
    },
    {
      code: 'srv3',
      name: 'srv3',
      type: 'File server',
      status: 'success',
    },
    {
      code: 'srv4',
      name: 'srv4',
      type: 'File server',
      status: 'warning',
    },
    {
      code: 'srv5',
      name: 'srv5',
      type: 'File server',
      status: 'critical',
    },

    {
      code: 'srv6',
      name: 'srv6',
      type: 'Database server',
      status: 'Success',
    },
    {
      code: 'srv7',
      name: 'srv7',
      type: 'Host',
      status: 'warning',
    },
    {
      code: 'srv8',
      name: 'srv8',
      type: 'Web server',
      status: 'Success',
    },
    {
      code: 'srv9',
      name: 'srv9',
      type: 'Database server',
      status: 'Success',
    },
    {
      code: 'srv10',
      name: 'srv10',
      type: 'Host',
      status: 'warning',
    },
    {
      code: 'srv11',
      name: 'srv11',
      type: 'Web server',
      status: 'Success',
    },

    {
      code: 'foo',
      name: 'node 1',
      type: 'Host',
      status: 'warning',
    },
    {
      code: 'bar',
      name: 'node 2',
      type: 'Web server',
      hasevents: true,
    },
    {
      code: 'beer',
      name: 'node 3',
      type: 'File server',
      focused: true,
      // selected: true,
    },
    {
      code: 'bred',
      name: 'node 4',
      type: 'Any server',
      status: 'success',
    },
    {
      code: 'boss',
      name: 'node 5',
      type: 'Database server',
      hasevents: true,
      status: 'critical',
    },
  ],
  links: [
    {
      code: 'link-srv1',
      type: 'linked',
      name: 'Зависит от',
      primary: 'srv1',
      secondary: 'bred',
      status: 'warning',
    },
    {
      code: 'link-srv2',
      type: 'linked',
      name: 'Зависит от',
      primary: 'srv2',
      secondary: 'bred',
      status: 'success',
    },
    {
      code: 'link-srv3',
      type: 'linked',
      name: 'Зависит от',
      primary: 'srv3',
      secondary: 'bred',
      status: 'critical',
    },
    {
      code: 'link-srv4',
      type: 'linked',
      name: 'Зависит от',
      primary: 'srv4',
      secondary: 'bred',
    },
    {
      code: 'link-srv5',
      type: 'linked',
      name: 'Зависит от',
      primary: 'srv5',
      secondary: 'bred',
      status: 'warning',
    },

    {
      code: 'link-foo',
      type: 'linked',
      name: 'Зависит от',
      primary: 'foo',
      secondary: 'bar',
      status: 'success',
    },
    {
      code: 'link-foo-bred',
      type: 'linked',
      name: 'Зависит от',
      primary: 'foo',
      secondary: 'bred',
      status: 'success',
    },
    {
      code: 'link-db-file',
      type: 'linked',
      name: 'Зависит от',
      primary: 'boss',
      secondary: 'beer',
      status: 'critical',
    },
    {
      code: 'link-boss',
      type: 'linked',
      name: 'Зависит от',
      primary: 'boss',
      secondary: 'bar',
      status: 'warning',
    },
    {
      code: 'link-bar-beer',
      type: 'linked',
      name: 'Зависит от',
      primary: 'bar',
      secondary: 'beer',
      status: 'success',
    },
    {
      code: 'link-bred-boss',
      type: 'linked',
      name: 'Зависит от',
      primary: 'bred',
      secondary: 'boss',
      status: 'success',
    },

    {
      code: 'link-srv6-node2',
      type: 'linked',
      name: 'Зависит от',
      primary: 'srv6',
      secondary: 'bar',
      status: 'warning',
    },
    {
      code: 'link-srv7-node2',
      type: 'linked',
      name: 'Зависит от',
      primary: 'srv7',
      secondary: 'bar',
      status: 'critical',
    },
    {
      code: 'link-srv8-node2',
      type: 'linked',
      name: 'Зависит от',
      primary: 'bar',
      secondary: 'srv8',
    },
    {
      code: 'link-srv9-node2',
      type: 'linked',
      name: 'Зависит от',
      primary: 'bar',
      secondary: 'srv9',
    },
    {
      code: 'link-srv10-node2',
      type: 'linked',
      name: 'Зависит от',
      primary: 'srv10',
      secondary: 'bar',
      status: 'warning',
    },
    {
      code: 'link-srv11-node2',
      type: 'linked',
      name: 'Зависит от',
      primary: 'srv11',
      secondary: 'bar',
    },
    {
      code: 'link-bar-srv11',
      type: 'linked',
      name: 'Влияет на',
      primary: 'bar',
      secondary: 'srv11',
      status: 'success',
    },
  ],
});
