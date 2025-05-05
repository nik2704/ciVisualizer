import { memo } from 'react';
import SVG from 'react-inlinesvg';
import { NodeIconsProps } from './lib/nodeElementTypes';
import { getIcon } from './lib/nodeElementHelper';

/**
* Компонент возвращает SVG-иконку узла.
* @returns {ReactElement}
*/
const NodeIcons = ({ className, nodeType }: NodeIconsProps) => (
  <SVG
    className={className}
    src={getIcon(nodeType)}
  />
);

export default memo(NodeIcons);
