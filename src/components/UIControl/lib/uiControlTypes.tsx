import { IGraph, NodeGraph } from "./graphTypes";

export type UIProps = {
    sourceData: IGraph;
};

export type FilteredNodes = {
    filteredIds: string[];
    currentNodes: NodeGraph[];
}