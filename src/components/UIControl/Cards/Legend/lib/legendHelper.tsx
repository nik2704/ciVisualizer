import { Status } from 'components/UIControl/lib/graphTypes';

/**
  * Заглушка для передачи в качестве аргумента handleToggleStatus для компонентов Legend,
  * LegendList, LineLinkButton, LineNodeButton (используется в тестах).
  * @returns {void}
  */
export const stub = (value: Status, area: string): void => { value; area; };
