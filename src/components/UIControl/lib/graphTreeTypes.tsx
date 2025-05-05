import { LinkGraph } from './graphTypes';

export type MatrixLink = {
  sourceIndex: number;
  targetIndex: number;
  linkGraph: LinkGraph;
};

export type MatrixLinkStruct = {
  nodeId: string;
  targetIds?: string[];
};

export type MatrixCoordinates = {
  line: number;
  column: number;
};
