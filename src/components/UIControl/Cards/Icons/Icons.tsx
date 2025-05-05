import { memo, ReactElement, useCallback } from 'react';
import SVG from 'react-inlinesvg';
import { Status } from 'components/UIControl/lib/graphTypes';
import StatusSuccessIcon from '../../../../images/ok.svg';
import StatusCriticalIcon from '../../../../images/error.svg';
import StatusWarningIcon from '../../../../images/warning.svg';
import StatusUnknownIcon from '../../../../images/question.svg';
import { IconsProps } from './lib/IconsTypes';

/**
* Компонент возвращает SVG-иконку.
* @returns {ReactElement}
*/
const Icons = ({ className, status }: IconsProps): ReactElement => {
  /**
  * Отображение логотипа статуса.
  * @param {string} status - название статуса.
  * @returns {string}
  */
  const getStatusIcon = useCallback((): string => {
    switch (status) {
      case Status.SUCCESS:
        return StatusSuccessIcon;
      case Status.WARNING:
        return StatusWarningIcon;
      case Status.CRITICAL:
        return StatusCriticalIcon;
      default:
        return StatusUnknownIcon;
    }
  }, [status]);

  return (
    <SVG
      className={className}
      src={getStatusIcon()}
    />
  );
};

export default memo(Icons);
