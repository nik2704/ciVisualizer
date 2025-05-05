import '../res/styles/legendStyle.css';
import '../res/styles/cellStyle.css';

import LinksIcon from '../res/images/links.svg';
import ServerIcon from '../res/images/server.svg';
import { LegendProps } from './lib/legendTypes';
import LegendList from './LegendList';

/**
* Компонент отображения фильтра по статусам.
* @returns {ReactElement}
*/
const Legend = ({
  showStatusLink,
  showStatusNodes,
  statuses,
  handleToggleStatus,
}: LegendProps) => (
  <div className="ui-legend" data-testid="ui-tool-legend">

    <div className="ui-box-line ui-box-line-head">
      
      <div className="ui-box-title">
        <div className="ui-box-head">Статус</div>
      </div>

      <div className="ui-box-desc">
        <div className="ui-box-icon">
          <img src={LinksIcon} alt=""/>
        </div>
      </div>

      <div className="ui-box-desc">
        <div className="ui-box-icon">
          <img src={ServerIcon} alt=""/>
        </div>
      </div>

    </div>

    <div className="ui-box-line ui-box-line-line"/>

    <LegendList
      showStatusLink={showStatusLink}
      showStatusNodes={showStatusNodes}
      statuses={statuses}
      handleToggleStatus={handleToggleStatus}
    />

  </div>
);

export default Legend;
