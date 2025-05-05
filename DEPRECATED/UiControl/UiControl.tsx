import { useState, useEffect } from 'react';
import { IGraph } from '../DEPRECATED/Graph/GraphTypes';
import Graph from './Graph';

function UiControl() {

  const [data, setData] = useState<IGraph>({ nodes:[], links:[] });
  const [loadData, seLoadData] = useState(true);


  useEffect(() => {
    if (loadData === true) {
      seLoadData(false);

      setData({
        nodes: [
          {
            "code": "foo",
            "name": "node 1",
            "type": "Host"
          },
          {
            "code": "bar",
            "name": "node 2",
            "type": "Web server"
          },
          {
            "code": "beer",
            "name": "node 3",
            "type": "File server"
          },
          {
            "code": "bred",
            "name": "node 4",
            "type": "Any server"
          },
          {
            "code": "boss",
            "name": "node 5",
            "type": "Database server"
          }
        ],
        links: [
          {
            "code": "link-foo",
            "type": "linked",
            "name": "view name",
            "primary": "foo",
            "secondary": "bar"
          },
          {
            "code": "link-foo-bred",
            "type": "linked",
            "name": "view name1",
            "primary": "foo",
            "secondary": "bred"
          },
          {
            "code": "link-db-file",
            "type": "linked",
            "name": "view name2",
            "primary": "boss",
            "secondary": "beer"
          },
          {
            "code": "link-boss",
            "type": "linked",
            "name": "view name3",
            "primary": "boss",
            "secondary": "bar"
          },
          {
            "code": "link-bar-beer",
            "type": "linked",
            "name": "view name4",
            "primary": "bar",
            "secondary": "beer"
          },
          {
            "code": "link-bred-boss",
            "type": "linked",
            "name": "view name5",
            "primary": "bred",
            "secondary": "boss"
          }
        ]
      });
    }
  }, [data, loadData]);

    return (
      <Graph
        itemProps={{
          'div': {
            'className': 'svgUiVisualizer',
            'style': {height: '600px',width: '50%', border: '1px solid black', padding: '10px'}
          },
          'svg': {
            'className': 'container',
            'style': {width: '100%', height: '100%'}
          },
          'circle': {
            'className': 'circle',
            'style': {fill: 'none', stroke: 'green', strokeWidth: '2'}
          }
        }}
        links={data.links}
        nodes={data.nodes} />
    );
  }
  
  export default UiControl;
