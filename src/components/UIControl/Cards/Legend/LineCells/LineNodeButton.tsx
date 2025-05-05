import { memo, MouseEvent } from 'react';
import Icons from '../../Icons/Icons';
import { NodeLineProps } from '../lib/legendTypes';

/**
 * Вывод иконки статуса узла в легенде.
 * @returns {ReactElement}
 */
const LineNodeButton = ({ status, showStatusNodes, handleToggleStatus }: NodeLineProps) => (
  <div
    className="ui-box-desc"
    data-testid={`ui-legend-node-btn-${status}`}
    onClick={(e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleToggleStatus(status, 'nodes');
    }} 
  >
    <div className="ui-box-icon">
      <Icons
        className={showStatusNodes.indexOf(status) !== -1 ? 'ui-node-status-pict' :
          'ui-node-status-pict img-disabled'}
        status={status}
      />
    </div>
  </div>
);

export default memo(LineNodeButton);
