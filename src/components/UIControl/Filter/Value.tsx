import { ReactElement } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ValueProp } from './lib/filterTypes';

/**
* Значение поля.
* @returns {ReactElement}
*/
export default function Value({ field, condition }: ValueProp) {
  /**
  * рендеринг условия.
  * @returns {ReactElement}
  */
  const renderValue = (): ReactElement => {
    if (field === undefined || condition === undefined || condition.valueMandatory === false) return <></>;

    return (
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField id="standard-basic" variant="standard" />
      </FormControl>
    );
  };

  return (
    <>
      { renderValue() }
    </>
  );
}
