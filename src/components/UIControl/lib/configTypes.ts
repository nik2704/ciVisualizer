import { NodeGraph } from "./graphTypes";

export type LinkConfig = {
    color?: string,
    showColorOfStatus?: boolean,
    directed?: boolean,
    fontColor?: string,
    fontSize?: number,
    fontWeight?: string,
    highlightColor?: string,
    highlightFontSize?: number,
    highlightFontWeight?: string,
    labelProperty?: string,
    mouseCursor?: string,
    opacity?: number,
    renderLabel?: boolean,
    semanticStrokeWidth?: boolean,
    strokeWidth?: number,
    markerHeight?: number,
    markerWidth?: number,
    type?: string,
    selfLinkDirection?: string,
    strokeDasharray?: number,
    strokeDashoffset?: number,
    strokeLinecap?: string
}

export type NodeConfig = {
    color?: string,
    fontColor?: string,
    fontSize?: number,
    fontWeight?: string,
    highlightColor?: string,
    highlightFontSize?: number,
    highlightFontWeight?: string,
    highlightStrokeColor?: string,
    highlightStrokeWidth?: number,
    labelProperty?: string,
    labelPosition?: any,
    labelClass?: string,
    mouseCursor?: string,
    opacity?: number,
    renderLabel?: boolean,
    size?: number,
    strokeColor?: string,
    strokeWidth?: number,
    svg?: string,
    symbolType?: string,
    viewGenerator?: (node: NodeGraph) => JSX.Element
}

export type D3Config = {
    alphaTarget: number;
    gravity: number;
    linkLength: number;
    linkStrength: number;
    disableLinkForce: boolean;
}

export type GraphConfig = {
    automaticRearrangeAfterDropNode?: boolean,
    collapsible?: boolean,
    directed?: boolean,
    focusAnimationDuration?: number,
    focusZoom?: number,
    freezeAllDragEvents?: boolean,
    height?: number,
    highlightDegree?: number,
    highlightOpacity?: number,
    linkHighlightBehavior?: boolean,
    maxZoom?: number,
    minZoom?: number,
    initialZoom?: number | null,
    nodeHighlightBehavior?: boolean,
    panAndZoom?: boolean,
    staticGraph?: boolean,
    staticGraphWithDragAndDrop?: boolean,
    bounded?: boolean,
    width?: number,
    d3: D3Config;
    node: NodeConfig;
    link: LinkConfig;
}
