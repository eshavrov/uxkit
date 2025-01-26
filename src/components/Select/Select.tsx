import cn from 'classnames';
import React from 'react';

import { useElementSize } from '@hooks/useSize';
import { Portal } from '@components/Portal';

import { getPosition } from './helpers';

import s from './Select.module.css';

export interface SelectOption {
  [key: string]: any;
  label: string;
  value: string;
  disabled?: boolean;
  key?: string;
}

export interface Props {
  'aria-label'?: string;

  className?: string;

  /** this id must be referenced by the label tag */
  id: string;

  name?: string;
  options: SelectOption[];
  placeholder?: string;
  value: string;
  disabled?: boolean;

  onChange: (el: any, value: string) => void;
  onSelect?: (value: string, option: SelectOption) => void;

  /** style */
  maxSelectHeightPx?: number;
}

const getNestedId = (rootId: string, ...nestedId: string[]) =>
  [rootId, ...nestedId].join('-');

// Save a list of named combobox actions, for future readability
const SelectActions = {
  Close: 0,
  CloseSelect: 1,
  First: 2,
  Last: 3,
  Next: 4,
  Open: 5,
  PageDown: 6,
  PageUp: 7,
  Previous: 8,
  Select: 9,
  Type: 10,
};

/*
 * Helper functions
 */

// filter an array of options against an input string
// returns an array of options that begin with the filter string, case-independent
function filterOptions(
  options: string[] = [],
  filter = '',
  exclude: string[] = [],
) {
  return options.filter((option) => {
    const matches = option.toLowerCase().startsWith(filter.toLowerCase());

    return matches && !exclude.includes(option);
  });
}

// map a key press to an action
function getActionFromKey(event: any, menuOpen: boolean) {
  const { key, altKey, ctrlKey, metaKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action

  // handle opening when closed
  if (!menuOpen && openKeys.includes(key)) {
    return SelectActions.Open;
  }

  // home and end move the selected option when open or closed
  if (key === 'Home') {
    return SelectActions.First;
  }

  if (key === 'End') {
    return SelectActions.Last;
  }

  // handle typing characters when open or closed
  if (
    key === 'Backspace' ||
    key === 'Clear' ||
    (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
  ) {
    return SelectActions.Type;
  }

  // handle keys when open
  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) {
      return SelectActions.CloseSelect;
    } else if (key === 'ArrowDown' && !altKey) {
      return SelectActions.Next;
    } else if (key === 'ArrowUp') {
      return SelectActions.Previous;
    } else if (key === 'PageUp') {
      return SelectActions.PageUp;
    } else if (key === 'PageDown') {
      return SelectActions.PageDown;
    } else if (key === 'Escape') {
      return SelectActions.Close;
    } else if (key === 'Enter' || key === ' ') {
      return SelectActions.CloseSelect;
    }
  }

  return undefined;
}

// return the index of an option from an array of options, based on a search string
// if the filter is multiple iterations of the same letter (e.g "aaa"), then cycle through first-letter matches
function getIndexByLetter(options: string[], filter: string, startIndex = 0) {
  const orderedOptions = [
    ...options.slice(startIndex),
    ...options.slice(0, startIndex),
  ];

  const firstMatch = filterOptions(orderedOptions, filter)[0];

  // first check if there is match for the typed string
  if (firstMatch != null) {
    return options.indexOf(firstMatch);
  }

  const allSameLetter = (filterString: string) =>
    Array.from(filterString).every((letter) => letter === filterString[0]);

  // if the same letter is being repeated, cycle through first-letter matches
  if (allSameLetter(filter)) {
    const matches = filterOptions(orderedOptions, filter[0]);

    return options.indexOf(matches[0]);
  }

  // if no matches, return -1
  return -1;
}

// get an updated option index after performing an action
function getUpdatedIndex(
  currentIndex: number,
  maxIndex: number,
  action: number,
) {
  const pageSize = 10; // used for pageup/pagedown

  switch (action) {
    case SelectActions.First:
      return 0;
    case SelectActions.Last:
      return maxIndex;
    case SelectActions.Previous:
      return Math.max(0, currentIndex - 1);
    case SelectActions.Next:
      return Math.min(maxIndex, currentIndex + 1);
    case SelectActions.PageUp:
      return Math.max(0, currentIndex - pageSize);
    case SelectActions.PageDown:
      return Math.min(maxIndex, currentIndex + pageSize);
    default:
      return currentIndex;
  }
}

// check if element is visible in browser view port
function isElementInView(element: HTMLElement) {
  return false;
  // TODO: Add optimization
  // const bounding = element.getBoundingClientRect();

  // return (
  //   bounding.top >= 0 &&
  //   bounding.left >= 0 &&
  //   bounding.bottom <=
  //     (window.innerHeight || document.documentElement.clientHeight) &&
  //   bounding.right <=
  //     (window.innerWidth || document.documentElement.clientWidth)
  // );
}

// check if an element is currently scrollable
function isScrollable(element?: HTMLElement) {
  return element != null && element.clientHeight < element.scrollHeight;
}

// ensure a given child element is within the parent's visible scroll area
// if the child is not visible, scroll the parent
function maintainScrollVisibility(
  activeElement: HTMLElement, // Element,
  scrollParent: HTMLElement, // Element,
) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
}

export const Select = React.memo((props: Props) => {
  const {
    id: idBase,
    value,
    options,
    onChange,
    onSelect,
    disabled,
    maxSelectHeightPx,
  } = props;

  const comboboxContainerNode = React.useRef<HTMLDivElement>(null);
  const comboboxNode = React.useRef<HTMLInputElement>(null);

  const listboxNodeContainer = React.useRef<HTMLDivElement>(null);
  const listboxNodeScroll = React.useRef<HTMLDivElement>(null);
  const listboxNode = React.useRef<HTMLDivElement>(null);

  const t = React.useRef<{
    ignoreBlur?: boolean;
    searchString: string;
    searchTimeout?: number;
  }>({ searchString: '' });

  // state
  const initialOptionIndex = React.useMemo(() => {
    const realOptionIndex = options.findIndex(
      (option) => option.value === value,
    );

    return realOptionIndex === -1 ? 0 : realOptionIndex;
  }, [options]);

  const [activeIndex, setActiveIndex] = React.useState(initialOptionIndex);
  const [comboActiveIndex, setComboActiveIndex] =
    React.useState(initialOptionIndex);
  const [isOpened, setIsOpened] = React.useState(false);

  const selectOption = (index: number) => {
    // update state
    setActiveIndex(index);
    setComboActiveIndex(index);

    // update displayed value
    // const selected = options[index];
    // this.comboboxNode.innerHTML = selected;

    // update aria-selected
    if (listboxNode.current != null) {
      const optionElements =
        listboxNode.current.querySelectorAll('[role=option]');

      optionElements.forEach((optionEl) => {
        optionEl.setAttribute('aria-selected', 'false');
      });

      optionElements[index].setAttribute('aria-selected', 'true');
    }
  };

  const updateMenuState = (_open: boolean, callFocus = true) => {
    if (isOpened === _open) {
      return;
    }

    // update state
    setIsOpened(_open);

    if (comboboxNode.current != null) {
      // update aria-expanded and styles
      comboboxNode.current.setAttribute('aria-expanded', `${_open}`);
      // _open ? this.el.classList.add('open') : this.el.classList.remove('open');

      // update activedescendant
      const activeId = _open ? getNestedId(idBase, `${activeIndex}`) : '';

      comboboxNode.current.setAttribute('aria-activedescendant', activeId);

      if (activeId === '' && !isElementInView(comboboxNode.current)) {
        comboboxNode.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }

      // move focus back to the combobox, if needed
      if (callFocus) {
        comboboxNode.current.focus();
      }
    }
  };

  const onOptionChange = (index: number) => {
    // update state
    setActiveIndex(index);

    // update aria-activedescendant
    comboboxNode.current?.setAttribute(
      'aria-activedescendant',
      getNestedId(idBase, `${index}`),
    );

    if (listboxNode.current != null) {
      // update active option styles
      const optionElements =
        listboxNode.current.querySelectorAll<HTMLElement>('[role=option]');

      // ensure the new option is in view
      if (isScrollable(listboxNode.current)) {
        maintainScrollVisibility(optionElements[index], listboxNode.current);
      }

      // ensure the new option is visible on screen
      // ensure the new option is in view
      if (!isElementInView(optionElements[index])) {
        optionElements[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }

      // @ts-expect-error: ...
      // TODO: onSelect
      onChange(optionElements[index], index);
    }
  };

  const addToSearchString = (char: string) => {
    // reset typing timeout and start new timeout
    // this allows us to make multiple-letter matches, like a native select
    if (t.current.searchTimeout != null) {
      window.clearTimeout(t.current.searchTimeout);
    }

    t.current.searchTimeout = window.setTimeout(() => {
      t.current.searchString = '';
    }, 500);

    // add most recent letter to saved search string
    t.current.searchString += char;

    return t.current.searchString;
  };

  const onComboType = (letter: string) => {
    // open the listbox if it is closed
    updateMenuState(true);

    // find the index of the first matching option
    const searchString = addToSearchString(letter);

    const searchIndex = getIndexByLetter(
      options.map(({ label }) => label),
      searchString,
      activeIndex + 1,
    );

    // if a match was found, go to it
    if (searchIndex >= 0) {
      onOptionChange(searchIndex);
    }
    // if no matches, clear the timeout and search string
    else {
      window.clearTimeout(t.current.searchTimeout);
      t.current.searchString = '';
    }
  };

  const onComboBlur = () => {
    // do not do blur action if ignoreBlur flag has been set
    if (t.current.ignoreBlur) {
      t.current.ignoreBlur = false;

      return;
    }

    // select current option and close
    if (isOpened) {
      // TODO: not always
      selectOption(activeIndex);
      updateMenuState(false, false);
    }
  };

  const onComboClick = () => {
    updateMenuState(!isOpened, false);
  };

  const onComboKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    const max = options.length - 1;

    const action = getActionFromKey(event, isOpened);

    if (action == null) {
      return;
    }

    switch (action) {
      case SelectActions.Last:
      // @ts-expect-error: ...
      case SelectActions.First:
        // TODO: check: need return

        updateMenuState(true);

      // intentional fallthrough
      case SelectActions.Next:
      case SelectActions.Previous:
      case SelectActions.PageUp:
      case SelectActions.PageDown: {
        event.preventDefault();

        onOptionChange(getUpdatedIndex(activeIndex, max, action));

        return;
      }

      // @ts-expect-error: ...
      case SelectActions.CloseSelect:
        // TODO: check: need return
        event.preventDefault();
        selectOption(activeIndex);

      // intentional fallthrough
      case SelectActions.Close: {
        event.preventDefault();

        updateMenuState(false);

        return;
      }

      case SelectActions.Type: {
        onComboType(key);

        return;
      }

      case SelectActions.Open: {
        event.preventDefault();

        updateMenuState(true);

        return;
      }
    }
  };

  const onOptionMouseDown = () => {
    // Clicking an option will cause a blur event,
    // but we don't want to perform the default keyboard blur action
    t.current.ignoreBlur = true;
  };

  const onOptionClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    // @ts-expect-error: ...
    const index = event.target.dataset.index;

    onOptionChange(index);
    selectOption(index);
    updateMenuState(false);
  };

  const optionList = options.map(
    ({ label, value: altKey, key, disabled: optionDisabled }, index) => {
      return (
        <div
          key={key ?? altKey}
          role="option"
          aria-disabled={optionDisabled}
          tabIndex={0} // ?
          id={getNestedId(idBase, `${index}`)}
          className={cn(s.comboOption, {
            [s.optionCurrent]: index === activeIndex,
          })}
          data-index={index}
          aria-selected={`${index === initialOptionIndex}`}
          onMouseDown={onOptionMouseDown}
          onClick={onOptionClick}
        >
          {label}
        </div>
      );
    },
  );

  const [listboxContainerStyle, setListboxContainerStyle] = React.useState<
    React.CSSProperties | undefined
  >(undefined);
  const [listboxScrollStyle, setListboxScrollStyle] = React.useState<
    React.CSSProperties | undefined
  >(undefined);

  const containerSize = useElementSize(document.body);
  const comboboxSize = useElementSize(comboboxContainerNode.current);

  React.useEffect(() => {
    if (
      comboboxNode.current == null ||
      listboxNode.current == null ||
      listboxNodeContainer.current == null
    ) {
      return;
    }

    const styles = getPosition(
      comboboxNode.current,
      listboxNodeContainer.current,
      listboxNode.current.offsetWidth,
      listboxNode.current.clientHeight,
    );

    setListboxContainerStyle(styles);

    if (styles.maxHeight != null) {
      const listBoxScrollVerticalPadding = 0;

      const listboxMaxHeight =
        styles.maxHeight - 2 * listBoxScrollVerticalPadding;

      setListboxScrollStyle({
        paddingTop: listBoxScrollVerticalPadding,
        paddingBottom: listBoxScrollVerticalPadding,
        maxHeight:
          maxSelectHeightPx != null && maxSelectHeightPx > 0
            ? Math.min(listboxMaxHeight, maxSelectHeightPx)
            : listboxMaxHeight,
        overflow: 'auto',
      });
    }
  }, [
    options.length,
    containerSize?.width,
    containerSize?.height,
    comboboxSize?.width,
    isOpened,
    maxSelectHeightPx,
  ]);

  return (
    <div
      ref={comboboxContainerNode}
      className={cn(s.combo, {
        [s.open]: isOpened,
        [s.disabled]: disabled,
      })}
    >
      <input
        ref={comboboxNode}
        aria-controls={getNestedId(idBase, 'listbox')}
        aria-expanded="false"
        aria-haspopup="listbox"
        aria-labelledby={getNestedId(idBase, 'label')}
        id={idBase}
        className={s.comboInput}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        onBlur={onComboBlur}
        onClick={onComboClick}
        onKeyDown={onComboKeyDown}
        value={options[comboActiveIndex]?.label}
        disabled={disabled}
      />
      {<Portal>
        <div
          ref={listboxNodeContainer}
          className={cn(s.comboMenuContainer, {
            [s.open]: isOpened,
          })}
          style={isOpened ? listboxContainerStyle : undefined}
        >
          <div ref={listboxNodeScroll} style={listboxScrollStyle}>
            <div
              ref={listboxNode}
              className={s.comboMenu}
              role="listbox"
              id={getNestedId(idBase, 'listbox')}
              aria-labelledby={getNestedId(idBase, 'label')}
              tabIndex={-1}
            >
              {optionList}
            </div>
          </div>
        </div>
      </Portal>}
    </div>
  );
});

Select.displayName = 'Select';
