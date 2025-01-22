import React from 'react';

import { act, fireEvent, render } from '@testing-library/react';

import { Autocomplete } from './Autocomplete';

jest.mock('@hooks/useSize', () => ({
    __esModule: true,
    default: () => ({ width: 600, height: 300 }),
    useElementSize: () => ({
    width: 1000,
    height: 1000,
    }),
  })
);

jest.useFakeTimers();

const progress = () =>
  act(() => {
    jest.runAllTimers();
  });

const _options: any[] = [
  { label: 'Apple', value: 'apple', test: 'apple' },
  { label: 'Banana', value: 'banana', test: 'banana' },
  { label: 'Blueberry', value: 'blueberry', test: 'blueberry' },
  { label: 'Boysenberry', value: 'boysenberry', test: 'boysenberry' },
  { label: 'Cherry', value: 'cherry', test: 'cherry' },
  { label: 'Cranberry', value: 'cranberry', test: 'cranberry' },
  { label: 'Durian', value: 'durian', test: 'durian' },
  { label: 'Eggplant', value: 'eggplant', test: 'eggplant' },
  { label: 'Fig', value: 'fig', test: 'fig' },
  { label: 'Grape', value: 'grape', test: 'grape' },
  { label: 'Guava', value: 'guava', test: 'guava' },
  { label: 'Huckleberry', value: 'huckleberry', test: 'huckleberry' },
];

const prefix = 'opt-';

const AutocompleteComponent = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <label htmlFor="auto-complete-test">AutocompleteFruits</label>
      <Autocomplete
        id="auto-complete-test"
        aria-label="Fruits"
        autocompleteType="list"
        value={value}
        onChange={setValue}
        options={_options}
        onSelect={() => {}}
        prefix={prefix}
      />
    </>
  );
};

/* See https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-list.html#kbd_label */
describe('autocomplete[aria-autocomplete="list"] textbox trigger', () => {
  describe('keyboard interaction', () => {
    describe('down arrow', () => {
      test('If the textbox is not empty and the listbox is displayed, moves visual focus to the first suggested value.', () => {
        const { getByLabelText } = render(<AutocompleteComponent />);

        const textbox = getByLabelText('AutocompleteFruits');

        fireEvent.click(textbox);
        progress();

        // check opens listbox
        expect(textbox.getAttribute('aria-expanded')).toEqual('true');

        // navigate to the first item in the autocomplete box
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        progress();

        // check the first item
        expect(textbox.getAttribute('aria-activedescendant')).toEqual(
          prefix + _options[0].value,
        );

        // check DOM focus remains on the textbox
        expect(textbox).toHaveFocus();
      });

      test('If the textbox is empty and the listbox is not displayed, opens the listbox and moves visual focus to the first option.', () => {
        const { getByLabelText, debug } = render(<AutocompleteComponent />);

        const textbox = getByLabelText('AutocompleteFruits');

        fireEvent.click(textbox);
        progress();

        // closes listbox
        fireEvent.keyDown(textbox, { key: 'Esc' });
        progress();

        // check closes listbox
        expect(textbox.getAttribute('aria-expanded')).toEqual('false');

        // navigate to the first item in the autocomplete box
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        progress();

        // check the first item
        expect(textbox.getAttribute('aria-activedescendant')).toEqual(
          prefix + _options[0].value,
        );

        // check DOM focus remains on the textbox
        expect(textbox).toHaveFocus();
      });
    });

    describe('alt + down arrow', () => {
      test('Opens the listbox without moving focus or changing selection.', () => {
        const { getByLabelText } = render(<AutocompleteComponent />);

        const textbox = getByLabelText('AutocompleteFruits');

        fireEvent.click(textbox);
        progress();

        // closes listbox
        fireEvent.keyDown(textbox, { key: 'Esc' });
        progress();

        // check closes listbox
        expect(textbox.getAttribute('aria-expanded')).toEqual('false');

        // navigate to the last item in the autocomplete box
        fireEvent.keyDown(textbox, { key: 'ArrowDown', altKey: true });
        progress();

        // check opens listbox
        expect(textbox.getAttribute('aria-expanded')).toEqual('true');

        // check the last item
        expect(textbox.getAttribute('aria-activedescendant')).toEqual('');

        // check DOM focus remains on the textbox
        expect(textbox).toHaveFocus();
      });
    });

    describe('up arrow', () => {
      test('If the textbox is not empty and the listbox is displayed, moves visual focus to the last suggested value.', () => {
        const { getByLabelText } = render(<AutocompleteComponent />);

        const textbox = getByLabelText('AutocompleteFruits');

        fireEvent.click(textbox);
        progress();

        // check opens listbox
        expect(textbox.getAttribute('aria-expanded')).toEqual('true');

        // navigate to the last item in the autocomplete box
        fireEvent.keyDown(textbox, { key: 'ArrowUp' });
        progress();

        // check the last item
        expect(textbox.getAttribute('aria-activedescendant')).toEqual(
          prefix + _options[_options.length - 1].value,
        );

        // check DOM focus remains on the textbox
        expect(textbox).toHaveFocus();
      });

      test('If the textbox is empty, first opens the listbox if it is not already displayed and then moves visual focus to the last option.', () => {
        const { getByLabelText, debug } = render(<AutocompleteComponent />);

        const textbox = getByLabelText('AutocompleteFruits');

        fireEvent.click(textbox);
        progress();

        // closes listbox
        fireEvent.keyDown(textbox, { key: 'Esc' });
        progress();

        // check closes listbox
        expect(textbox.getAttribute('aria-expanded')).toEqual('false');

        // navigate to the last item in the autocomplete box
        fireEvent.keyDown(textbox, { key: 'ArrowUp' });
        progress();

        // check the last item
        expect(textbox.getAttribute('aria-activedescendant')).toEqual(
          prefix + _options[_options.length - 1].value,
        );

        // check DOM focus remains on the textbox
        expect(textbox).toHaveFocus();
      });
    });

    describe('enter', () => {
      test('Closes the listbox if it is displayed.', () => {
        const { getByLabelText } = render(<AutocompleteComponent />);

        const textbox = getByLabelText('AutocompleteFruits');

        fireEvent.click(textbox);
        progress();

        // check opens listbox
        expect(textbox.getAttribute('aria-expanded')).toEqual('true');

        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'Enter' });
        progress();

        // check closes listbox
        expect(textbox.getAttribute('aria-expanded')).toEqual('false');

        // check the textbox is  empty
        expect(textbox.value).toEqual(_options[1].label);
      });
    });

    describe('escape', () => {
      test('If the listbox is displayed, closes it.', () => {
        const { getByLabelText } = render(<AutocompleteComponent />);

        const textbox = getByLabelText('AutocompleteFruits');

        fireEvent.click(textbox);
        progress();

        // check opens
        expect(textbox.getAttribute('aria-expanded')).toEqual('true');

        // closes listbox
        fireEvent.keyDown(textbox, { key: 'Esc' });
        progress();

        // check closes
        expect(textbox.getAttribute('aria-expanded')).toEqual('false');
      });

      test('If the listbox is not displayed, clears the textbox.', () => {
        const { getByLabelText } = render(<AutocompleteComponent />);

        const textbox = getByLabelText('AutocompleteFruits');

        fireEvent.click(textbox);
        progress();

        // assign value to textbox field
        fireEvent.change(textbox, { target: { value: 'apple' } });
        progress();

        // check opens
        expect(textbox.getAttribute('aria-expanded')).toEqual('true');

        // closes listbox
        fireEvent.keyDown(textbox, { key: 'Esc' });
        progress();

        // check closes listbox
        expect(textbox.getAttribute('aria-expanded')).toEqual('false');

        // check the textbox is not empty
        expect(textbox.value).not.toEqual('');

        // clears the textbox
        fireEvent.keyDown(textbox, { key: 'Esc' });
        progress();

        // check the textbox is  empty
        expect(textbox.value).toEqual('');
      });
    });
  });
});
