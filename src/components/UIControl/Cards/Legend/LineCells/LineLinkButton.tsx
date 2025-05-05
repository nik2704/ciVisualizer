import { memo, MouseEvent } from 'react';
import { getStatusColor } from 'utils/utils';
import { LineLineProps } from '../lib/legendTypes';

/**
 * Вывод индикатора статуса связи в легенде.
 * @returns {ReactElement}
 */
const LineLinkButton = ({ showStatusLink, status, handleToggleStatus }: LineLineProps) => (
  <div 
    className="ui-box-desc"
    data-testid={`ui-legend-link-btn-${status}`}
    onClick={(e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleToggleStatus(status, 'links');
    }}
  >
    <div className={`ui-legend-icon ui-cell-${getStatusColor(status)}`}>
      {showStatusLink.indexOf(status) !== -1 ? '' : <div className="ui-disable-box" />}
    </div>
  </div>
);

export default memo(LineLinkButton);
