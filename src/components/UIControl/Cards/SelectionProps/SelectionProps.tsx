import { memo, useCallback } from 'react';
import { Box } from '@mui/material';
import '../res/styles/selectionStyle.css';
import '../res/styles/cellStyle.css';
import { EMPTY_NAME, EMPTY_SELECTION_DATA, SelectionProps } from './lib/selectionPropsTypes';
import SelectionPropsTable from './SelectionPropsTable';
import IconsForProps from '../Icons/IconsProps';

/**
* Компонент отображения свойств выбранного элемента графа.
* @returns {ReactElement}
*/
function SelectionProperties({
  currentNode,
  currentLink,
  selectionData = EMPTY_SELECTION_DATA,
}: SelectionProps) {
  /**
  * Получение текстового названия типа объекта.
  * @returns {string}
  */
  const getObjType = useCallback((): string => {
    if (currentNode) {
      return currentNode.nodeType ? currentNode.nodeType : 'Node';
    }
    
    if (currentLink) {
      return 'Связь';
    }

    return 'ОБЪЕКТ';
  }, [currentNode, currentLink]);

  /**
  * Получение имени объекта.
  * @returns {string}
  */
  const getName = useCallback((): string => {
    if (currentNode) {
      return currentNode.name;
    }
    
    if (currentLink) {
      return currentLink.name;
    }

    return EMPTY_NAME;    
  }, [currentNode, currentLink]);

  return (
    <Box
      sx={{
        position: 'relative',
        right: 0,
      }}
    >
      <div className="ui-props" data-testid="ui-tool-selection">

        <div className="ui-props-head">

          <div className="ui-props-head-title caption">{getObjType()}</div>

          <div className="ui-props-head-title nodename">{getName()}</div>

          <IconsForProps className="ui-props-head-title pict1" desc="" />

          <IconsForProps className="ui-props-head-title pict2" desc="notification" />
          
        </div>

        <SelectionPropsTable
          currentNode={currentNode}
          currentLink={currentLink}
          selectionData={selectionData}
        />

      </div>

    </Box>
  );
}

export default memo(SelectionProperties);
