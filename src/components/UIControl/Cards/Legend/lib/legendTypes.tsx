import { Status } from 'components/UIControl/lib/graphTypes';

interface ToggleFunc {
  handleToggleStatus: (value: Status, area: string) => void;
}

interface ToggleFuncStatus extends ToggleFunc {
  status: Status;
}

export interface LegendProps extends ToggleFunc {
  showStatusLink: Status[];
  showStatusNodes: Status[];
  statuses: Status[];
}

export interface TitleProps {
  status: Status;
}

export interface LineLineProps extends ToggleFuncStatus {
  showStatusLink: Status[];
}

export interface NodeLineProps extends ToggleFuncStatus {
  showStatusNodes: Status[];
}
