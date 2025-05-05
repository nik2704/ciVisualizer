import { ReactElement } from 'react';
import ComboBox from '../ToolBox/ComboBox';
import { BOOL_OPERATORS, NUM_OPERATORS, STRING_OPERATORS } from '../ToolBox/lib/constants';
import { ConditionProp, FieldTypes, GenericOperator } from './lib/filterTypes';

/**
* Условие для выбранного поля.
* @returns {ReactElement}
*/
export default function Condition({ field, path, onChangeValue }: ConditionProp) {
  /**
  * Получение списка вариантов сравнения.
  * @returns {ReactElement}
  */
  const getComparators = (): GenericOperator[] => {
    if (field === undefined) return [];

    const notSelected = { value: '-', title: '-', valueMandatory: false };

    switch (field.fieldType) {
      case FieldTypes.STRING:
        return [notSelected, ...STRING_OPERATORS];
      case FieldTypes.NUMBER:
        return [notSelected, ...NUM_OPERATORS];
      case FieldTypes.BOOL:
        return [notSelected, ...BOOL_OPERATORS];
      default:
        return [];
    }
  };

  /**
  * рендеринг условия.
  * @returns {ReactElement}
  */
  const renderCondition = (): ReactElement => {
    if (field === undefined || field.fieldType === FieldTypes.NONE) return <></>;

    return (
      <ComboBox
        id={`field-operator-${field.name}-${path}`}
        name="condition.joiner"
        label=""
        defaultValue={0}
        options={getComparators()}
        onChange={(newValue) => {
          onChangeValue(getComparators().find((comparator) => comparator.value === newValue));
        }}
      />
    );
  };

  return (
    <>
      { renderCondition() }
    </>
  );
}
