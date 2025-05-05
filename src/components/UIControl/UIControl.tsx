import { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import { getGraphData, getLinksDescriptionDataObject, getNodeDescriptionDataObject,
  getGraphNode } from 'utils/utils';
import { applyFilters, updateStatusLinkFilters, updateStatusNodeFilters } from 'utils/filter';
import { Filters } from 'utils/lib/filterTypes';
import SelectionProperties from './Cards/SelectionProps/SelectionProps';
import Legend from './Cards/Legend/Legend';
import ToolBox from './ToolBox/ToolBox';
import { IGraphData, NodeGraph, LinkGraph,
  CurrentElement, Status, getFullStatusList } from './lib/graphTypes';
import { GraphConfig } from './lib/configTypes';
import TEMPLATE_CONFIG from './lib/TemplateConfig';
import { ViewMode } from './ToolBox/lib/toolBoxTypes';
import { UIProps } from './lib/uiControlTypes';
import UIControlDrawGraph from './UIControlDrawGraph';

/**
* Компонент отображения графа по входным данным.
* @param {UIProps} props - объект, содержащий настройки и данные для отображения.
* @returns {void}
*/
function UIControl({ sourceData } : UIProps) {
  const LEGEND_NODE_AREA = 'legend-node-area';
  const [data, setData] = useState<IGraphData | null>(null);
  const [graphConfig, setGraphConfig] = useState<GraphConfig>(TEMPLATE_CONFIG);
  const [clickedElement, setClickedElement] = useState<CurrentElement>({ currentElementCategory: 'none' });
  const [showStatusLink, setShowStatusLink] = useState<Status[]>(getFullStatusList());
  const [showStatusNodes, setShowStatusNodes] = useState<Status[]>(getFullStatusList());
  const divBlock = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.FORCE);
  const [graphFilter, setGraphFilter] = useState<Filters | null>(null);

  useEffect(() => {
    const newData = getGraphData(sourceData);
    setData({ ...newData });

    const selectedNodes = sourceData.nodes.filter((node) => node.selected === true);
    if (selectedNodes.length > 0) {
      setClickedElement({
        currentElementCategory: 'node',
        currentNode: getGraphNode(selectedNodes[0]),
      });
    }

    return () => {
      setData(null);
    };
  }, [sourceData]);

  useEffect(() => {
    if (graphFilter !== null) {
      setData(applyFilters(getGraphData(sourceData), graphFilter));
    }
  }, [graphFilter, sourceData]);

  /**
  * Обработчик события выбора опций отображения (фильтрация по статусу для связей, или узлов).
  * @returns {void}
  */
  const handleToggleStatus = (value: Status, area: string | undefined) => {
    if (area !== undefined) {
      const currentIndex = area === 'links' ? showStatusLink.indexOf(value) : showStatusNodes.indexOf(value);
      const newChecked = area === 'links' ? [...showStatusLink] : [...showStatusNodes];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      if (area === 'links') setShowStatusLink(newChecked);
      else if (area === 'nodes') setShowStatusNodes(newChecked);

      let newFilters = graphFilter !== null ? { ...graphFilter } : { nodeFilters: [], linkFilters: [] };

      if (area === 'nodes') {
        newFilters = updateStatusNodeFilters(
          newFilters,
          newChecked,
          LEGEND_NODE_AREA,
        );

        setGraphFilter(newFilters);
      } else if (area === 'links') {
        newFilters = updateStatusLinkFilters(
          newFilters,
          newChecked,
          LEGEND_NODE_AREA,
        );

        setGraphFilter(newFilters);
      }
    }
  };
  
  /**
  * Обработчик события выбора элемента (onMouseClick для узлов).
  * @returns {void}
  */
  const onClickNode = useCallback((nodeId: string) => {
    if (data !== null) {
      const currentNode:NodeGraph | undefined = data.nodes.find((node) => node.id === nodeId);

      const newNodesArray = [...data.nodes].map((node) => {
        const tmpNode = { ...node, selected: false };
        if (node.id === nodeId) tmpNode.selected = true;
        return tmpNode;
      });
  
      if (currentNode !== undefined) {
        setClickedElement({
          currentElementCategory: 'node',
          currentNode,
        });
      } else {
        setClickedElement({ currentElementCategory: 'none' });
      }
  
      setData({ nodes: newNodesArray, links: data.links });
    }
  }, [data]);

  /**
  * Обработчик события - сброс выбора элемента (onMouseClick для всего пространства графа).
  * @returns {void}
  */
  const onClickGraph = useCallback(() => {
    if (data !== null) {
      setClickedElement({ currentElementCategory: 'none' });
      const newNodesArray = [...data.nodes].map((node) => ({ ...node, selected: false }));
      setData({ nodes: newNodesArray, links: data.links });
  
      if (graphConfig.node.mouseCursor !== 'crosshair' || graphConfig.link.mouseCursor !== 'crosshair') {
        const newGraphConfig = { ...graphConfig };
        newGraphConfig.node.mouseCursor = 'crosshair';
        newGraphConfig.link.mouseCursor = 'crosshair';
        setGraphConfig(newGraphConfig);
      }
    }
  }, [data, graphConfig]);

  /**
  * Обработчик события выбора элемента (onMouseClick для связей).
  * @param {string} source - узел-источник выбранной связи.
  * @param {string} target - целевой узел выбранной связи.
  * @returns {void}
  */
  const onClickLink = (source: string, target: string) => {
    if (data !== null) {
      const currentLink:LinkGraph | undefined =
      data.links.find((link) => link.source === source && link.target === target);

      if (currentLink !== undefined) {
        setClickedElement({
          currentElementCategory: 'link',
          currentLink,
        });
      } else {
        setClickedElement({ currentElementCategory: 'none' });
      }
    }
  };

  /**
  * Вывод свойств выбранного элемента графа (узел, или связь).
  * @returns {ReactElement}
  */
  const renderPropertiesBox = () => {
    if (clickedElement.currentElementCategory !== 'none') {
      switch (clickedElement.currentElementCategory) {
        case 'link':
          return (        
            <SelectionProperties
              currentLink={clickedElement.currentLink}
              selectionData={getLinksDescriptionDataObject(clickedElement.currentLink)}
            />
          );
        default:
          return (
            <SelectionProperties
              currentNode={clickedElement.currentNode}
              selectionData={getNodeDescriptionDataObject(clickedElement.currentNode)}
            />
          );
      }
    }

    return <></>;
  };

  /**
  * Вывод компонента "легенда".
  * @returns {ReactElement}
  */
  const renderLegend = () => (
    <Box
      sx={{
        display: 'inline-block',
        width: '100%',
        marginRight: '-100%',
        verticalAlign: 'bottom',
      }}
    >
      <Legend
        showStatusLink={showStatusLink}
        showStatusNodes={showStatusNodes}
        statuses={getFullStatusList()}
        handleToggleStatus={handleToggleStatus}
      />
    </Box>
  );

  /**
  * Вывод компонента "отрисовка графа".
  * @returns {ReactElement}
  */
  const renderGraph = () => {
    if (divBlock !== null && divBlock.current !== null) {
      return (<UIControlDrawGraph
        data={data}
        config={graphConfig}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
        onClickGraph={onClickGraph}
        width={divBlock.current.getBoundingClientRect().width}
        height={divBlock.current.getBoundingClientRect().height}
        viewMode={viewMode}
      />);
    }

    return <></>;
  };

  return (
    <>
    
      <div
        ref={divBlock}
        style={{
          position: 'absolute', 
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
        }}
        data-testid="ui-main-graph-container"
      >

        <ToolBox
          viewMode={viewMode}
          setViewMode={setViewMode}
          config={graphConfig}
          setGraphConfig={setGraphConfig}
        />

        <div style={{
          position: 'absolute', 
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
        }}
        >

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1em',
              boxSizing: 'border-box',
              position: 'absolute',
              bottom: '0',
              opacity: '1', 
            }}
            id="graph-container"
          >
            {renderGraph()}
          </div>
          
          <div
            style={{ 
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1em',
              boxSizing: 'border-box',
              position: 'absolute',
              bottom: '0',
              zIndex: 9,
            }}
            id="legend-property-container"
          >
            {renderLegend()}

            {renderPropertiesBox()}
          </div>

        </div>

      </div>

    </>
  );
}
  
export default UIControl;
