import { memo } from 'react';
import Icons from '../Cards/Icons/Icons';
import './res/styles/styles.css';
import { NodeElementProps } from './lib/nodeElementTypes';
import NodeIcons from './NodeIcons';

/**
* Компонент отображения узла графа.
* @returns {ReactElement}
*/
function NodeElement({ node }: NodeElementProps) {
  return (
    <div
      className={node.selected ? 'gr-node-parent gr-node-child-selected' : 'gr-node-parent'}
      data-testid={`ui-map-node-${node.id.replace(' ', '-')}`}
    >

      <div className={node.focused ? 'gr-node-child gr-node-child-focused' : 'gr-node-child'} >
        
        <NodeIcons className="gr-node-pict" nodeType={node.nodeType}/>

        {node.hasevents ? <div className="gr-node-ind-events" /> : ''}

        <div className="gr-node-ind-status">
          <Icons className="gr-node-status-pict" status={node.status}/>
        </div>

      </div>

    </div>
  );
}

export default memo(NodeElement);
