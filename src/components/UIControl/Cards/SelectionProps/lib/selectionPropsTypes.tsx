import { LinkGraph, NodeGraph } from '../../../lib/graphTypes';

export const EMPTY_NAME = '-----------------';

export const EMPTY_SELECTION_DATA = [
  {
    name: 'Поле1',
    value: 'Значение поля1',
    colormode: '',
  },
  {
    name: 'Поле2',
    value: 'Значение поля2',
    colormode: '',
  },
  {
    name: 'Поле3',
    value: 'Значение поля3',
    colormode: '',
  },
];

type PropLine = {
  name: string;
  value: string;
  highliteStatus?: boolean;
};
  
export type SelectionProps = {
  currentNode?: NodeGraph;
  currentLink?: LinkGraph;
  selectionData?: PropLine[];
};
