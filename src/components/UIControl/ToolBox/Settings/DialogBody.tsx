import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ComboBox from '../ComboBox';
import { lineLinkType } from '../lib/toolBoxTypes';
import DiscreteSliderValues from '../DiscreteSliderValues';
import { DialogContentProps } from './lib/dialogContentTypes';

/**
* Компонент отображения настроек визуализатора.
* @param {boolean|undefined} showLinkTypeChecked - флаг отображения на схеме типа связей,
* @param {boolean|undefined} showLinkColorChecked - флаг отображения на схеме цвета связей,
* @param {number} LinkTypeIdx - индекс типа связей,
* @param {number} strokeWidth - значение толщины линии,
* @param {(newWidth: number) => void} setStrokeWidth - функция изменения толщины линии,
* @param {(isChecked: boolean) => void} setShowLinkColorChecked - функция изменения флага отображения цвета,
* @param {(isChecked: boolean) => void} setShowLinkTypeChecked - функция изменения флага отображения типа связей,
* @param {(newLinkType: number) => void} setLinkTypeIdx - функция выбора типа связи.
* @returns {ReactElement}
*/
const DialogBody = ({
  showLinkTypeChecked,
  showLinkColorChecked,
  LinkTypeIdx,
  strokeWidth,
  setStrokeWidth,
  setShowLinkColorChecked,
  setShowLinkTypeChecked,
  setLinkTypeIdx,
}: DialogContentProps) => (
  <DialogContent>

    <FormGroup>

      <FormControlLabel
        control={
          <Checkbox
            checked={showLinkTypeChecked}
            onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => setShowLinkTypeChecked(event.target.checked)
            }
            inputProps={{ 'aria-label': 'show-link-type' }}
          />
        }                
        label="Отображать тип связей"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={showLinkColorChecked}
            onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => setShowLinkColorChecked(event.target.checked)
            }
            inputProps={{ 'aria-label': 'show-link-color' }}
          />
        }                
        label="Отображать цвет связей (статус)"
      />

      <br />
      <br />
        
      <ComboBox
        id="uncontrolled-native"
        name="link.type"
        label="Тип линии связи"
        defaultValue={LinkTypeIdx}
        values={lineLinkType}
        onChange={(newValue) => setLinkTypeIdx(Number(newValue))}
      />

      <br />
      <DiscreteSliderValues
        defaultValue={strokeWidth}
        onChange={setStrokeWidth}
      />
        
    </FormGroup>

  </DialogContent>
);

export default DialogBody;
