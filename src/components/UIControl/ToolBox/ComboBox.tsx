import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { ComboBoxProps, ValueOption } from './lib/toolBoxTypes';

/**
* Компонент отображения выпадающего списка.
* @returns {ReactElement}
*/
const ComboBox = ({ id, name, label, defaultValue, values, options, onChange }: ComboBoxProps) => {
  /**
  * Формирование списка значений из массива values.
  * @param {string[]} valuesList - список значений.
  * @returns {ReactElement}
  */
  const renderValuesList = (valuesList: string[]) => (
    <>
      {valuesList.map((value, index) => <option value={index} key={`gr-settings-combo-${index}`}>{value}</option>)}
    </>
  );

  /**
  * Формирование списка значений из массива values.
  * @param {ValueOption[]} valuesList - список значений.
  * @returns {ReactElement}
  */
  const renderValuesObject = (valuesList: ValueOption[]) => (
    <>
      {valuesList.map((value) => (
        <option value={value.value} key={`gr-settings-combo-${value.value}`}>{value.title}</option>
      ))}
    </>
  );

  return (
    <Box sx={{ minWidth: 120, margin: '5px' }}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {label}
      </InputLabel>
      <FormControl fullWidth>
        <NativeSelect
          defaultValue={defaultValue}
          inputProps={{
            name,
            id,
          }}
          onChange={(event) => onChange(event.target.value)}
        >
          {values !== undefined ? renderValuesList(values) : ''}
          {options !== undefined ? renderValuesObject(options) : ''}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default ComboBox;
