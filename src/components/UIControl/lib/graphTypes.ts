import { CSSProperties } from 'react';

export interface Props {
  className?: string;
  style?: CSSProperties;
}
  
export interface IGraph extends Props {
  itemProps?: ItemProps;
  links: Link[],
  nodes: Node[],
}
  
export type ItemProps = { [key: string]: Props };
  
export type Node = {
  code: string;
  name: string;
  type: string;
  focused?: boolean;
  selected?: boolean;
  hasevents?: boolean;
  status?: string;
};
  
export type Link = {
  code: string;
  name: string;
  type: LinkType;
  primary: string;
  secondary: string;
  status?: string;
};

export type NodeGraph = {
  id: string;
  name: string;
  svg?: string;
  x?: number;
  y?: number;
  focused?: boolean;
  selected?: boolean;
  hasevents?: boolean;
  nodeType?: string;
  status: Status;
};

export type LinkGraph = {
  source: string;
  target: string;
  status: Status;
  name: string;
  linkType: LinkType;
  color?: string;
};

export type IGraphData = {
  itemProps?: ItemProps;
  nodes: NodeGraph[];
  links: LinkGraph[];
};

export type CurrentElement = {
  currentElementCategory: ElementCategory;
  currentNode?: NodeGraph;
  currentLink?: LinkGraph;
};

export enum Status {
  UNKNOWN,
  SUCCESS,
  WARNING,
  CRITICAL,
}

/**
* Возврат список статусов.
* @returns Status[]
*/
export const getFullStatusList = (): Status[] => [Status.CRITICAL, Status.WARNING, Status.SUCCESS, Status.UNKNOWN];

/**
* Возврат строкового значения соответсвующего статусу.
* @returns {string}
*/
export const statusToString = (value: Status): string => {
  switch (value) {
    case Status.SUCCESS:
      return 'success';
    case Status.WARNING:
      return 'warning';
    case Status.CRITICAL:
      return 'critical';
    default:
      return 'unknown';
  }
};

/**
* Возврат значения типа Status, соответсвующего строковому.
* @returns {Status}
*/
export const stringToStatus = (value: string | undefined): Status => {
  if (value === undefined) return Status.UNKNOWN;
    
  const lvalue = value.toLocaleLowerCase();
  switch (lvalue) {
    case 'success':
      return Status.SUCCESS;
    case 'warning':
      return Status.WARNING;
    case 'critical':
      return Status.CRITICAL;
    default:
      return Status.UNKNOWN;
  }
};

export type ElementCategory = 'node' | 'link' | 'none';
export type LinkType = 'linked' | 'contains' | 'use' | 'implements' | 'associated';
