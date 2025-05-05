import * as React from 'react';
import { useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { SettingsProps, lineLinkType } from '../lib/toolBoxTypes';
import { LinkConfig } from '../../lib/configTypes';
import DialogBody from './DialogBody';

/**
* Компонент отображения настроек визуализатора.
* @param {GraphConfig} config - настройки графа, 
* @param {(newConfig: GraphConfig) => void} setGraphConfig - метод
*   обновления настроек графа.
* @returns {ReactElement}
*/
const Settings = ({ config, setGraphConfig }: SettingsProps) => {
  const [open, setOpen] = React.useState(false);
  const [showLinkTypeChecked, setShowLinkTypeChecked] = React.useState(config.link.renderLabel);
  const [showLinkColorChecked, setShowLinkColorChecked] = React.useState(config.link.showColorOfStatus);
  const [LinkTypeIdx, setLinkTypeIdx] = React.useState(
    config.link.type !== undefined ? lineLinkType.indexOf(config.link.type) : -1,
  );
  const [strokeWidth, setStrokeWidth] = React.useState<number>(config.link.strokeWidth ? config.link.strokeWidth : 0);

  /**
  * Открытие диалога с настройками.
  */
  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  /**
  * Закрытие диалога с настройками (без сохранения).
  */
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  /**
  * Закрытие диалога с настройками (с сохранением).
  */
  const handleSaveClose = useCallback(() => {
    const newLink: LinkConfig = {
      renderLabel: showLinkTypeChecked,
      showColorOfStatus: showLinkColorChecked,
      strokeWidth,
    };

    if (LinkTypeIdx >= 0 && LinkTypeIdx < lineLinkType.length) {
      newLink.type = lineLinkType[LinkTypeIdx];
    }

    setGraphConfig({ ...config, link: newLink });

    setOpen(false);
  }, [LinkTypeIdx, config, setGraphConfig, showLinkColorChecked, showLinkTypeChecked, strokeWidth]);

  return (
    <>
      <IconButton color="primary" aria-label="settings" disabled={false} onClick={handleClickOpen}>
        <SettingsIcon />
      </IconButton>

      <div>
        <Dialog open={open} onClose={handleClose}>

          <DialogTitle>Настройки</DialogTitle>

          <DialogBody
            showLinkTypeChecked={showLinkTypeChecked}
            showLinkColorChecked={showLinkColorChecked}
            LinkTypeIdx={LinkTypeIdx}
            strokeWidth={strokeWidth}
            setStrokeWidth={setStrokeWidth}
            setShowLinkColorChecked={setShowLinkColorChecked}
            setShowLinkTypeChecked={setShowLinkTypeChecked}
            setLinkTypeIdx={setLinkTypeIdx}
          />

          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleSaveClose}>Применить</Button>
          </DialogActions>

        </Dialog>

      </div>
    </>
  );
};

export default Settings;
