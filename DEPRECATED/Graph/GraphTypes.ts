import { index, SimulationLinkDatum, SimulationNodeDatum } from "d3";
import { CSSProperties } from "react";
import { threadId } from "worker_threads";

export interface Props {
    className?: string;
    style?: CSSProperties;
}
  
export interface IGraph extends Props {
      itemProps?: ItemProps;
      links: Link[],
      nodes: Node[],
  }
  
export type ItemProps = { [key: string]: Props }
  
export type Node = {
      code: string;
      name: string;
      type: string;
}
  
export type Link = {
    code: string;
    name: string;
    type: LinkType;
    primary: string;
    secondary: string;
}

export class  IGraphNode implements SimulationNodeDatum {
    id: number;
    vx: number;
    vy: number;
    x: number;
    y: number;
    node: Node;

    constructor(idx: number, nodeValue: Node) {
        this.node = nodeValue;
        this.id = idx;

        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
    }
}

export class IGraphLink implements SimulationLinkDatum<IGraphNode>  {
    index: number;
    source: number;
    sourceNode: IGraphNode;
    target: number;
    targetNode: IGraphNode;
    link: Link;
    left: boolean;
    right: boolean;

    // constructor(idx: number, l: Link, src: number = -1, dst: number = -1) {
    constructor(idx: number, l: Link, src: IGraphNode, dst: IGraphNode) {
        this.link = l;
        this.index = idx;

        this.source = src.id;
        this.target = dst.id;
        this.sourceNode = src;
        this.targetNode = dst;
        this.left = false;
        this.right = true;
    }
}

export type LinkType = 'linked' | 'contains' | 'use' | 'implements' | 'associated';