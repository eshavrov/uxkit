import React from 'react';
import cn from 'classnames';

import { Breadcrumb } from './uikit/Breadcrumb';
import { Button } from './uikit/Button';
import { Autocomplete } from './uikit/Autocomplete';
import { Select } from './uikit/Select';

import s from 'App.module.css';

const _options: any[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Boysenberry', value: 'boysenberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Cranberry', value: 'cranberry' },
  { label: 'Durian', value: 'durian' },
  { label: 'Eggplant', value: 'eggplant' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
  { label: 'Guava', value: 'guava' },
  { label: 'Huckleberry', value: 'huckleberry' },
];

const prefix = 'opt-';

const breadcrumbItems = [{
  label: 'App',
  path: 'path'
},
{
  label: 'level1',
  path: 'path'
},
{
  label: 'level2',
  path: 'path'
}];


const AutocompleteComponent = ({ type }: { type: 'both' | 'list' | 'none'}) => {
  const [value, setValue] = React.useState('');

  return (
    <div className={s.block}>
    <label htmlFor="auto-complete-test">Fruits (Autocomplete {type})</label>
    <Autocomplete
      id="auto-complete-test"
      aria-label="Fruits"
      autocompleteType={type}
      value={value}
      onChange={setValue}
      options={_options}
      onSelect={() => {}}
      prefix={prefix}
    />
  </div>);
}

const SelectComponent = () => {
  const [value, setValue] = React.useState('');

  return (
    <div className={s.block}>
    <label htmlFor="auto-complete-test">Fruits Select</label>
    <Select
      id="auto-complete-test"
      aria-label="Fruits"
      value={value}
      onChange={setValue}
      options={_options}
      onSelect={() => {}}
    />
  </div>);
}

export const App = () => {
  return (
    <div className={s.root}>
      <p>Components:</p>
      <div className={s.block}>
        <Breadcrumb
          className={cn({ [s.container]: false })}
          items={breadcrumbItems}
          readonly={true}
        />
      </div>
      <AutocompleteComponent type='list' />
      <AutocompleteComponent type='both' />
      <AutocompleteComponent type='none' />
      <SelectComponent />
      <div className={s.block}>
        <Button>Ok</Button>
      </div>
    </div>
  );
}