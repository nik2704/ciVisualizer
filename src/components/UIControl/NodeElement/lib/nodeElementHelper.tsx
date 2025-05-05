import ServerIcon from '../res/images/server.svg';
import ClusterIcon from '../res/images/cluster.svg';
import ComputerIcon from '../res/images/computer.svg';
import DbServerIcon from '../res/images/dbserver.svg';
import FileServerIcon from '../res/images/fileserver.svg';
import RouterIcon from '../res/images/router.svg';
import WebServerIcon from '../res/images/webserver.svg';

/**
* Получение иконки, соответствующей типу узла.
* @param {string|undefined} nodeType - тип узла.
* @returns {ReactElement}
*/
export const getIcon = (nodeType: string | undefined): string => {
  switch (nodeType) {
    case 'Server':
      return ServerIcon;
    case 'File server':
      return FileServerIcon;
    case 'Web server':
      return WebServerIcon;
    case 'Host':
      return ServerIcon;
    case 'Database server':
      return DbServerIcon;
    case 'Cluster':
      return ClusterIcon;
    case 'Router':
      return RouterIcon;
    default:
      return ComputerIcon;
  }
};
