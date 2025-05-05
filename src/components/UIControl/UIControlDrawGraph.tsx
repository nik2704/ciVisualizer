import { useMemo } from 'react';
import { forRenderingAsCircle, forRenderingAsHierarchical, forRenderingAsOrthogonal } from 'utils/calculations';
import { getNodeFocused } from 'utils/utils';
import { UIControlDrawGraphProps } from './lib/graphPropsTypes';
import { Graph } from './reactD3graph';
import { getLinksColored } from './lib/uiControlHelper';
import { ViewMode } from './ToolBox/lib/toolBoxTypes';
import { NODE_TYPE_LIST } from './lib/hierarchicalTypes';

/**
* Компонент отображения графа КЕ (силовой алгоритм).
* @param {IGraphData | null} data - данные для отображение,
* @param {GraphConfig} config - конфигурация графа,
* @param {((nodeId: string) => void) | undefined} onClickNode - обработчик события выбора узла,
* @param {((source: string, target: string) => void) | undefined} onClickLink - обработчик события выбора связи,
* @param {onClickGraph: (() => void) | undefined} onClickGraph - обработчик события "клика" на пространстве графа,
* @param {number} width - ширина,
* @param {number} height - высота,
* @returns {ReactElement}
*/
const UIControlDrawGraph = ({
  data,
  config,
  onClickNode,
  onClickLink,
  onClickGraph,
  width,
  height,
  viewMode,
}: UIControlDrawGraphProps) => {
  const showForceData = useMemo(() => {
    if (data !== null) {
      switch (viewMode) {
        case ViewMode.ROUND:
          return {
            nodes: [...forRenderingAsCircle(data.nodes, height, width, getNodeFocused(data.nodes))],
            links: config.link.showColorOfStatus === true ?
              getLinksColored([...data.links]) : [...data.links],
          };
        case ViewMode.ORTHOGONAL:
          return {
            nodes: [...forRenderingAsOrthogonal(data)],
            links: config.link.showColorOfStatus === true ?
              getLinksColored([...data.links]) : [...data.links],
          };
        case ViewMode.HIERARCHY:
          return {
            nodes: [...forRenderingAsHierarchical(data, NODE_TYPE_LIST)],
            links: config.link.showColorOfStatus === true ?
              getLinksColored([...data.links]) : [...data.links],
          };
        default:
          return ({
            nodes: [...data.nodes],
            links: config.link.showColorOfStatus === true ?
              getLinksColored([...data.links]) : [...data.links],
          });
      }
    }
    return null;
  }, [data, config.link.showColorOfStatus, viewMode, height, width]);

  if (showForceData !== null) {
    return (
      <Graph
        key={`graph-type-${viewMode}`}
        id={`graph-id-${viewMode}`}
        data={{ ...showForceData }}
        config={{
          ...config,
          staticGraphWithDragAndDrop: false,
          staticGraph: viewMode !== ViewMode.FORCE,
          width,
          height,
        }}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
        onClickGraph={onClickGraph}
      />
    );
  }

  return <></>;
};

export default UIControlDrawGraph;
