import React, { ReactElement } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import ComboBox from '../ToolBox/ComboBox';
import { GroupProps, FilterState, Field } from './lib/filterTypes';
import Expression from './Expression';
import { COMBINATORS } from '../ToolBox/lib/constants';

/**
* Контейнер для группы условий.
* @returns {ReactElement}
*/
class Group extends React.Component<GroupProps> {
  state: FilterState = {
    conditionsGroups: [],
    conditions: [],
    counter: 10,
    conditionCounter: 100,
  };

  path: string;
  fields: Field[];

  constructor(props: GroupProps) {
    super(props);

    this.path = props.path;
    this.fields = props.fields;
  }

  /**
  * Рендеринг групп условий.
  * @returns {ReactElement}
  */
  renderGroups = (): ReactElement => {
    if (this.state.conditionsGroups.length === 0) return <></>;

    return (
      <CardContent sx={{ padding: '1px', margin: '1px' }}>
        { this.state.conditionsGroups }
      </CardContent>
    );
  };

  /**
  * Рендеринг условий.
  * @returns {ReactElement}
  */
  renderConditions = (): ReactElement => {
    if (this.state.conditions.length === 0) return <></>;

    return (
      <CardContent sx={{ padding: '1px', margin: '1px' }}>
        { this.state.conditions }
      </CardContent>
    );
  };

  /**
  * Удаление группы.
  * @returns {void}
  */
  doDeleteGroup = (groupKey: string): void => {
    const newState = { ...this.state };
    newState.conditionsGroups = [...this.state.conditionsGroups.filter((cGroup) => cGroup.key !== groupKey)];

    this.setState(newState);
  };
    
  /**
  * Удаление правила.
  * @returns {void}
  */
  doDeleteCondition = (conditionKey: string): void => {
    const newState = { ...this.state };
    newState.conditions = [...this.state.conditions.filter((cond) => cond.key !== conditionKey)];

    this.setState(newState);
  };

  /**
  * Добавление группы.
  * @returns {void}
  */
  addGroup = (): void => {
    const newCounterValue = this.state.counter + 10;
    const newPath = `${this.path}.${newCounterValue}`;

    const newState = {
      ...this.state,
      conditionsGroups: [
        ...this.state.conditionsGroups,
        <Group
          path={newPath}
          key={newPath}
          fields={this.fields}
          doDelete={this.doDeleteGroup}
        />,
      ],
      counter: newCounterValue,
    };

    this.setState(newState);
  };

  /**
  * Добавление правила.
  * @returns {void}
  */
  addCondition = (): void => {
    const newCounterValue = this.state.conditionCounter + 10;
    const newKey = `${this.path}-${newCounterValue}`;

    const newState = {
      ...this.state,
      conditions: [
        ...this.state.conditions,
        <Expression
          key={newKey}
          path={newKey}
          fields={this.fields}
          doDelete={this.doDeleteCondition}
        />,
      ],
      conditionCounter: newCounterValue,
    };

    this.setState(newState);
  };

  render() {
    return (
      <Card sx={{ padding: '5px', margin: '10px' }} style={{ background: 'rgba(0,75,183,.08)' }}>
    
        <Box
          m={0}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Stack spacing={1} direction="row">
            <Switch defaultChecked size="small" />

            <ComboBox
              id={`condition-joiner-${this.path}`}
              name="condition.joiner"
              label=""
              defaultValue={0}
              options={COMBINATORS}
              onChange={(newValue) => { newValue; }}
            />
  
            <Button variant="contained" onClick={this.addCondition}>+Правило</Button>
  
            <Button variant="contained" onClick={this.addGroup}>+Группа</Button>
          </Stack>
  
          <IconButton
            aria-label="delete"
            onClick={() => {
              this.props.doDelete(this.path);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        {this.renderConditions()}
        {this.renderGroups()}
      </Card>
    );
  }
}

export default Group;
