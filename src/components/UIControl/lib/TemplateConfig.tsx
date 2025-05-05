import { NodeGraph } from './graphTypes';
import NodeElement from '../NodeElement/NodeElement';

export default {
  directed: true,
  height: 700,
  highlightOpacity: 0.15,
  linkHighlightBehavior: true,
  nodeHighlightBehavior: true,
  width: 800,
  d3: {
    alphaTarget: 0.05,
    gravity: -500,
    linkLength: 150,
    linkStrength: 1,
    disableLinkForce: false,
  },
  node: {
    fontSize: 12,
    highlightColor: 'red',
    highlightFontSize: 12,
    highlightFontWeight: 'bold',
    highlightStrokeWidth: 1.5,
    labelProperty: 'name',
    size: 420,
    symbolType: 'circle',
    viewGenerator: (node: NodeGraph) => <NodeElement node={node} />,
  },
  link: {
    fontColor: 'gray',
    fontSize: 12,
    highlightColor: 'SAME',
    highlightFontSize: 14,
    highlightFontWeight: 'bolder',
    semanticStrokeWidth: true,
    strokeWidth: 1,
    showColorOfStatus: true,
    labelProperty: 'name',
    renderLabel: true,
    type: 'CURVE_SMOOTH',
  },
};
