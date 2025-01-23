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

/* See https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-list.html#kbd_label_textbox */
describe('autocomplete[aria-autocomplete="list"] textbox trigger', () => {
  describe('Textbox. keyboard interaction', () => {
    describe('down arrow', () => {
      test('If the textbox is not empty and the listbox is displayed, moves visual focus to the first suggested value. DOM focus remains on the textbox.', () => {
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

      test('If the textbox is empty and the listbox is not displayed, opens the listbox and moves visual focus to the first option. DOM focus remains on the textbox.', () => {
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
      test('If the textbox is not empty and the listbox is displayed, moves visual focus to the last suggested value. DOM focus remains on the textbox.', () => {
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

      test('If the textbox is empty, first opens the listbox if it is not already displayed and then moves visual focus to the last option. DOM focus remains on the textbox.', () => {
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

/* See https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-list.html#kbd_label_listbox */
describe('autocomplete[aria-autocomplete="list"] listbox trigger', () => {
  describe('Listbox Popup. keyboard interaction', () => {
    describe('enter', () => {
      test.todo('Sets the textbox value to the content of the focused option in the listbox.');
      test.todo('Closes the listbox.');
      test.todo('Sets visual focus on the textbox.');
    });

    describe('escape', () => {
      test.todo('Closes the listbox.');
      test.todo('Sets visual focus on the textbox.');
    });

    describe('down arrow', () => {
      test.todo('Moves visual focus to the next option.');
      test.todo('If visual focus is on the last option, moves visual focus to the first option.');
      test.todo('Note: This wrapping behavior is useful when [Home] and [End] move the editing cursor as described below.');
    });

    describe('up arrow', () => {
      test.todo('Moves visual focus to the previous option.');
      test.todo('If visual focus is on the first option, moves visual focus to the last option.');
      test.todo('Note: This wrapping behavior is useful when [Home] and [End] move the editing cursor as described below.');
    });

    describe('right arrow', () => {
      test.todo('Moves visual focus to the textbox and moves the editing cursor one character to the right.');
    });

    describe('left arrow', () => {
      test.todo('Moves visual focus to the textbox and moves the editing cursor one character to the left.');
    });

    describe('home', () => {
      test.todo('Moves visual focus to the textbox and places the editing cursor at the beginning of the field.');
    });

    describe('end', () => {
      test.todo('Moves visual focus to the textbox and places the editing cursor at the end of the field.');
    });

    describe('printable characters', () => {
      test.todo('Moves visual focus to the textbox.');
      test.todo('Types the character in the textbox.');
      test.todo('Options in the listbox are filtered based on characters in the textbox.');
    });
  });
});
