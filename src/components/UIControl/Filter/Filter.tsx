import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from '@mui/material';
import Group from './Group';
import { FilterProps } from './lib/filterTypes';

/**
* Компонент работы с фильтром.
* @returns {ReactElement}
*/
const Filter = ({ fields }: FilterProps): React.ReactElement => {
  const [open, setOpen] = React.useState(false);

  /**
  * Открытие диалога с настройками.
  */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
  * Закрытие диалога с настройками (без сохранения).
  */
  const handleClose = () => {
    setOpen(false);
  };

  /**
  * Закрытие диалога с настройками (с сохранением).
  */
  const handleSaveClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton color="primary" aria-label="filter" disabled={false} onClick={handleClickOpen}>
        <FilterAltIcon />
      </IconButton>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="lg"
        >

          <DialogTitle>Фильтрация</DialogTitle>

          <DialogContent>
            <Group
              path="0"
              fields={fields}
              doDelete={(currentPath) => { currentPath; }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleSaveClose}>Применить</Button>
          </DialogActions>

        </Dialog>

      </div>
    </>
  );
};

export default Filter;
