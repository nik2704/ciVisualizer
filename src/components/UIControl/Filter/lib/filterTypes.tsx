import { ReactElement } from 'react';

export type Combinator = {
  value: string;
  title: string;
};

export type GenericOperator = {
  value: string;
  title: string;
  valueMandatory: boolean;
};

export type ComboBoxValue = {
  value: string;
  title: string;
};

export type Condition = {
  field: string;
  operator: GenericOperator;
  value: string;
};

export type Rule = {
  combinator: Combinator;
  conditions: Condition[];
};

export type FilterState = {
  conditionsGroups: ReactElement[];
  conditions: ReactElement[];
  counter: number;
  conditionCounter: number;
};

export enum FieldTypes {
  NONE,
  STRING,
  NUMBER,
  BOOL,
}

export enum FieldOwnershipType {
  NONE,
  RECORD,
  LINKED_RECORD,
}

export type Field = {
  name: string;
  label: string;
  fieldType: FieldTypes;
  fieldOwnership: FieldOwnershipType;
};

export type FilterProps = {
  fields: Field[];
};

export type GroupProps = {
  path: string;
  fields: Field[];
  doDelete: (path: string) => void;
};

export type ConditionProp = {
  field?: Field;
  path: string;
  onChangeValue: (newValue: GenericOperator | undefined) => void;
};

export type ValueProp = {
  field?: Field;
  condition?: GenericOperator;
};
