import { memo } from 'react';
import LineNodeButton from './LineCells/LineNodeButton';
import { LegendProps } from './lib/legendTypes';
import LineLinkButton from './LineCells/LineLinkButton';
import LineTitle from './LineCells/LineTitle';

/**
* Выбор класса CSS в зависимости от статуса.
* @returns {ReactElement}
*/
const LegendList = ({
  showStatusLink,
  showStatusNodes,
  statuses,
  handleToggleStatus,
}: LegendProps) => (
  <>
    {statuses.map((status, idx) => (
      <div className="ui-box-line ui-box-line-body" key={`ui-legend-line_${idx}`}>

        <LineTitle status={status}/>

        <LineLinkButton
          showStatusLink={showStatusLink}
          status={status}
          handleToggleStatus={handleToggleStatus}
        />

        <LineNodeButton
          showStatusNodes={showStatusNodes}
          status={status}
          handleToggleStatus={handleToggleStatus}
        />
        
      </div>
    ))}
  </>
);

export default memo(LegendList);
