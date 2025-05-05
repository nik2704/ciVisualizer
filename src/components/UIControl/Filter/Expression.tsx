import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Switch from '@mui/material/Switch';
import { ComboBoxValue, Field, GenericOperator, GroupProps } from './lib/filterTypes';
import ComboBox from '../ToolBox/ComboBox';
import Condition from './Condition';
import Value from './Value';

/**
 * Формирование условия.
 * @returns {ReactElement}
 */
export default function Expression({ path, fields, doDelete }: GroupProps) {
  const [selectedField, setSelectedField] = useState<Field | undefined>(undefined);
  const [selectedCondition, setSelectedCondition] = useState<GenericOperator | undefined>(undefined);

  /**
   * Форматирование входного списка полей.
   * @returns {ReactElement}
   */
  const getFieldsList = (): ComboBoxValue[] => (
    fields.map((field) => ({ value: field.name, title: field.label }))
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
      sx={{ marginLeft: '15px' }}
    >

      <Box
        m={0}
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ width: '100%' }}
      >

        <Switch defaultChecked size="small" />

        <ComboBox
          id={`field-selection-${path}`}
          name="condition.joiner"
          label=""
          defaultValue={0}
          options={getFieldsList()}
          onChange={(newValue) => { setSelectedField(fields.find((field) => field.name === newValue)); }}
        />

        <Condition field={selectedField} path={path} onChangeValue={setSelectedCondition} />
        
        <Value field={selectedField} condition={selectedCondition}/>
        
      </Box>

      <IconButton
        aria-label="delete"
        onClick={() => { doDelete(path); }}
      >
        <ClearIcon />
      </IconButton>
    </Box>

  );
}
