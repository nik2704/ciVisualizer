import { memo } from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import FlareIcon from '@mui/icons-material/Flare';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PolylineIcon from '@mui/icons-material/Polyline';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { ToolBoxProps, ViewMode } from './lib/toolBoxTypes';
import Settings from './Settings/Settings';

/**
* Компонент отображения панели инструментов.
* @returns {ReactElement}
*/
const ToolBox = ({
  viewMode = ViewMode.FORCE,
  setViewMode,
  config,
  setGraphConfig,
}: ToolBoxProps) => (
  <>
    <Box
      sx={{
        zIndex: 'tooltip',
        position: 'relative',
        top: 0,
        left: 0,
      }}
    >

      <Stack direction="row" spacing={2}>

        <IconButton
          color={viewMode !== ViewMode.FORCE ? 'primary' : 'secondary'}
          aria-label="force graph"
          disabled={false}
          onClick={() => { setViewMode(ViewMode.FORCE); }}
        >
          <FlareIcon />
        </IconButton>

        <IconButton
          color={viewMode !== ViewMode.ORTHOGONAL ? 'primary' : 'secondary'}
          aria-label="orthogonal graph"
          disabled={false}
          onClick={() => { setViewMode(ViewMode.ORTHOGONAL); }}
        >
          <PolylineIcon />
        </IconButton>

        <IconButton
          color={viewMode !== ViewMode.HIERARCHY ? 'primary' : 'secondary'}
          aria-label="hierarchical graph"
          disabled={false}
          onClick={() => { setViewMode(ViewMode.HIERARCHY); }}
        >
          <AccountTreeIcon />
        </IconButton>

        <IconButton
          color={viewMode !== ViewMode.ROUND ? 'primary' : 'secondary'}
          aria-label="round graph"
          disabled={false}
          onClick={() => { setViewMode(ViewMode.ROUND); }}
        >
          <WorkspacesIcon />
        </IconButton>

        <Settings config={config} setGraphConfig={setGraphConfig} />

      </Stack>

    </Box>
  </>
);

export default memo(ToolBox);
