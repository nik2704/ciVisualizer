import { GraphConfig } from 'components/UIControl/lib/configTypes';

export type ToolBoxProps = {
  filter?: string[];
  viewMode: ViewMode;
  config: GraphConfig;
  setViewMode: (newMode: ViewMode) => void;
  setGraphConfig: (newConfig: GraphConfig) => void;
};

export type SettingsProps = {
  config: GraphConfig;
  setGraphConfig: (newConfig: GraphConfig) => void;
};

export enum ViewMode {
  FORCE,
  ORTHOGONAL,
  HIERARCHY,
  ROUND,
}

export const lineLinkType = [
  'STRAIGHT',
  'CURVE_SMOOTH',
  'CURVE_FULL',
];

export type ValueOption = {
  title: string;
  value: string;
};

export type ComboBoxProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: number;
  values?: string[];
  options?: ValueOption[];
  onChange: (newValue: string) => void;
};

export type DiscreteSliderProps = {
  defaultValue: number;
  onChange: (newValue: number) => void;
};
