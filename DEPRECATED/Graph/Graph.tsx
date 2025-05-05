import * as d3 from 'd3';
import { select } from "d3-selection";
import { drag } from "d3-drag";

import { Simulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import { CSSProperties, useState, useEffect, useRef } from 'react';
import { IGraph, Link, Node, ItemProps, IGraphNode, IGraphLink } from './GraphTypes';
import { on } from 'stream';

function Graph(props: IGraph) {
  const [drawNodes, setDrawNodes] = useState(props.nodes);
  const [drawLinks, setDrawLinks] = useState(props.links);

  const svgDraw = useRef(null);

  useEffect(() => {
    setDrawNodes(props.nodes);
  }, [props.nodes]);

  useEffect(() => {
    setDrawLinks(props.links);
  }, [props.links]);

  useEffect(() => {
    if (drawNodes.length > 0) {
      buildGraph(drawNodes, drawLinks, props.itemProps);
    }
  }, [drawNodes, drawLinks]);

  function buildGraph(nodes: Node[], links: Link[], itemProps: ItemProps | undefined ): void {

    function getGraphByCode (code: string, arr: IGraphNode[]): IGraphNode {
      let result: IGraphNode | undefined = arr.find( e => e.node.code === code);

      if (result != undefined) return result;
      return new IGraphNode(-1, { code: '', name: '', type: ''});
    }

    let graphNodes: IGraphNode[] = d3.map(nodes, (_, i) => ( new IGraphNode(i, _) ));
    let graphLinks: IGraphLink[] = d3.map(links, (_, i) => (
      new IGraphLink(i, _, getGraphByCode(_.primary, graphNodes), getGraphByCode(_.secondary, graphNodes))  
    ));

    let height = 300;
    let width = 200;
    let colors = d3.scaleOrdinal(d3.schemeCategory10);

    let simulation: Simulation<IGraphNode, IGraphLink> = d3.forceSimulation<IGraphNode, IGraphLink>()
      .nodes(graphNodes)
      // .alphaTarget(0.3) // stay hot
      // .velocityDecay(0.1)
      .force('link', d3.forceLink().id((d: any) => d.id).distance(150)) //id
      .force('charge', d3.forceManyBody().strength(-700))
      .force('x', d3.forceX(width))
      .force('y', d3.forceY(height))
      .force("collide", d3.forceCollide().radius(30).iterations(3))
      .on('tick', () => ticked());

    const graph = d3.select(svgDraw.current);
    graph.selectAll("*").remove();

    const svg = d3.select(svgDraw.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .on('contextmenu', (event, d) => { event.preventDefault(); });
    
    const link = svg.append("g")
      .attr("stroke", "black")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5)
      .attr("stroke-linecap", "round")
      .selectAll("line")
      .data(graphLinks)
      .join("line");

    const node = svg.append("g")
      .attr("fill", "green")
      .attr("stroke", "green")
      .attr("stroke-opacity", 1)
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(graphNodes)
      .join("circle")
        .attr("r", 15)
        .attr("fill", 'red');


    // ---- ZOOOM ----------
    svg.call(d3.zoom<SVGSVGElement, unknown>()
      .extent([[0, 0], [width, height]])
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        node.attr("transform", event.transform);
        link.attr("transform", event.transform);
      }));
//-------ZOOM END--------

//------ CLICK ----------
    // function click(event: d3.D3DragEvent<SVGElement, IGraphNode, any>, d: IGraphNode) {
    //   console.log(d);
      // d3.select(d).classed("fixed", false);
      // simulation.alpha(1).restart();
    // }
//--------DRAG ----------
    // const drag = d3
    //   .drag()
    //   .on("start", dragstart)
    //   .on("drag", dragged);

    // function dragstart() {
    //   svg.classed("fixed", true);
    // }

    // function dragged(event: d3.D3DragEvent<SVGElement, IGraphNode, any>, d: IGraphNode) {
    //   d.x = clamp(event.x, 0, width);
    //   d.y = clamp(event.y, 0, height);
    //   simulation.alpha(1).restart();
    // }

    // let nodeDrag = d3.drag();
    // initDragHandlers();

    // function initDragHandlers() { //)(simulation: Simulation<IGraphNode, IGraphLink>   
    //   nodeDrag
    //     .on("start", function (event: d3.D3DragEvent<SVGElement, IGraphNode, any>) {
    //       console.log("STARTED");
    //       if (!event.active) simulation.alphaTarget(0.3).restart();
    //       event.subject.fx = event.subject.x;
    //       event.subject.fy = event.subject.y;
    //     })
      
    //     .on("drag", function (event: d3.D3DragEvent<SVGElement, IGraphNode, any>) {
    //       event.subject.fx = event.x;
    //       event.subject.fy = event.y;
    //     })

    //     .on("end", function (event: d3.D3DragEvent<SVGElement, IGraphNode, any>) {
    //       if (!event.active) simulation.alphaTarget(0);
    //       event.subject.fx = null;
    //       event.subject.fy = null;
    //       simulation.stop(); // STOP ANIMATION
    //     });
    // }
//--------DRAG END------

    function ticked() {
      link
        .attr("x1", d => d.sourceNode.x)
        .attr("y1", d => d.sourceNode.y)
        .attr("x2", d => d.targetNode.x)
        .attr("y2", d => d.targetNode.y);
  
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    }
  }

  function getStyle(tagNme: string, className: string): CSSProperties {

    let result: CSSProperties = { width: '100%' };

    if (props.itemProps !== undefined) {
      let tag: keyof ItemProps;
      for (tag in props.itemProps) {
        if (tag === tagNme) {
          if (props.itemProps[tagNme].className === className) {
            if (props.itemProps[tagNme].style !== undefined) {
              result = { ...props.itemProps[tagNme].style };
            }
            break;
          }
        }
      }
    }

    return result;
  }

  return (
    <div className="svgUiVisualizer" ref={svgDraw} style={getStyle('div', 'svgUiVisualizer')} >
    </div>
  );
}
  
  export default Graph;

function force(arg0: string, arg1: d3.ForceManyBody<d3.SimulationNodeDatum>) {
  throw new Error('Function not implemented.');
}
