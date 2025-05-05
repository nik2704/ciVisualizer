import {
  Combinator,
  Field,
  FieldOwnershipType,
  FieldTypes,
  GenericOperator,
} from 'components/UIControl/Filter/lib/filterTypes';

export const COMBINATORS: Combinator[] = [
  {
    value: 'AND',
    title: 'И',
  },
  {
    value: 'OR',
    title: 'ИЛИ',
  },
];

export const STRING_OPERATORS: GenericOperator[] = [
  { 
    value: 'Contains',
    title: 'содержит',
    valueMandatory: true,
  },
  { 
    value: 'Equals',
    title: 'равно',
    valueMandatory: true,
  },
  { 
    value: 'StartsWith',
    title: 'Начинается',
    valueMandatory: true,
  },
  { 
    value: 'EndsWith',
    title: 'Заканчивается',
    valueMandatory: true,
  },
  { 
    value: 'IsEmpty',
    title: 'Пусто',
    valueMandatory: false,
  },
  { 
    value: 'IsNotEmpty',
    title: 'Не пусто',
    valueMandatory: false,
  },
];
  
export const NUM_OPERATORS: GenericOperator[] = [
  { 
    value: '>',
    title: '>',
    valueMandatory: true,
  },
  { 
    value: '>=',
    title: '>=',
    valueMandatory: true,
  },
  { 
    value: '<',
    title: '<',
    valueMandatory: true,
  },
  { 
    value: '<=',
    title: '<=',
    valueMandatory: true,
  },
  { 
    value: '==',
    title: '==',
    valueMandatory: true,
  },
  { 
    value: '!=',
    title: '!=',
    valueMandatory: true,
  },
  { 
    value: 'IsEmpty',
    title: 'Пусто',
    valueMandatory: false,
  },
  { 
    value: 'IsNotEmpty',
    title: 'Не пусто',
    valueMandatory: false,
  },
];

export const BOOL_OPERATORS: GenericOperator[] = [
  { 
    value: 'true',
    title: 'TRUE',
    valueMandatory: false,
  },
  { 
    value: 'false',
    title: 'FALSE',
    valueMandatory: false,
  },
];
