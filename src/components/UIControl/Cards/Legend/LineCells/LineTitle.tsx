import { statusToString } from 'components/UIControl/lib/graphTypes';
import { memo } from 'react';
import { TitleProps } from '../lib/legendTypes';

/**
 * Вывод названия статуса в легенде.
 * @returns {ReactElement}
 */
const LineTitle = ({ status }: TitleProps) => (
  <div className="ui-box-title">
    <div className="ui-box-head ui-status-txt">{statusToString(status)}</div>
  </div>
);

export default memo(LineTitle);
