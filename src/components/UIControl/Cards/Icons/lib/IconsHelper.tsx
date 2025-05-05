import NotificationIcon from '../../res/images/email.svg';
import ObjectLinkIcon from '../../res/images/card.svg';

/**
  * Отображение логотипа.
  * @param {string} desc - вид логотипа.
  * @returns {string}
  */
export const getIcon = (desc: string | undefined): string => {
  switch (desc) {
    case 'notification':
      return NotificationIcon;
    default:
      return ObjectLinkIcon;
  }
};
