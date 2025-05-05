import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import { DiscreteSliderProps } from './lib/toolBoxTypes';

/**
* Компонент отображения слайдера.
* @param {number} defaultValue - текущее значение.
* @returns {ReactElement}
*/
export default function DiscreteSliderValues({ defaultValue, onChange }: DiscreteSliderProps) {
  return (
    <Box sx={{ width: 300, margin: '5px' }}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Толщина линии: {defaultValue}
      </InputLabel>
      <Slider
        aria-label="Temperature"
        value={defaultValue}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
        onChange={(event, newValue) => onChange(newValue as number)}
      />
    </Box>
  );
}
