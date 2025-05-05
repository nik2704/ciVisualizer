import { memo, ReactElement } from 'react';
import SVG from 'react-inlinesvg';
import { getIcon } from './lib/IconsHelper';
import { IconsProps } from './lib/IconsTypes';

/**
* Компонент возвращает SVG-иконку.
* @returns {ReactElement}
*/
const IconsForProps = ({ className, desc }: IconsProps): ReactElement => (
  <div className={className}>
    <SVG
      src={getIcon(desc)}
    />
  </div>

);

export default memo(IconsForProps);
