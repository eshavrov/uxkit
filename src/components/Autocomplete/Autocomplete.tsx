import cn from 'classnames';
import React from 'react';
import { createPortal } from 'react-dom';

import useSize, { useElementSize } from '@hooks/useSize';
import { getPosition } from './helpers';

import s from './Autocomplete.module.css';

// todo: fixed field disabled

const MS = 120;

// list autocomplete with manual selection
type AutocompleteType = 'both' | 'list' | 'none'; // 'inline'

export interface AutocompleteOption<T = any> {
  label: string;
  value: T;
}

export interface AutocompleteInputRef {
  focus: () => void;
  clear: () => void;
  open: () => void;
}

interface Props<Option extends AutocompleteOption> {
  'aria-label'?: string;

  /** `both`, `list` or `none` */
  autocompleteType?: AutocompleteType;

  className?: string;

  /** this id must be referenced by the label tag */
  id?: string;

  name?: string;
  options: Option[];
  placeholder?: string;
  title?: string;
  value: string;
  prefix?: string;
  disabled?: boolean;

  openOnChange?: boolean;
  status?: React.ReactNode;
  assistiveStatus?: string;

  render?: (option: Option) => React.ReactNode;

  onChange: (value: string) => void;
  onEnter?: (value: string) => void;
  onSelect?: (value: string, option: Option) => void;
}

const generateOptionIndex = (id: any, prefix = 'opt-') => `${prefix}${id}`;

const getOption = (
  listboxNode: HTMLUListElement | null,
  id: string,
  prefix?: string,
) =>
  listboxNode?.querySelector<HTMLLIElement>(
    `li#${generateOptionIndex(id, prefix)}`,
  ) ?? undefined;

const getLowercaseContent = (node: HTMLLIElement) => {
  return node.textContent?.toLowerCase() ?? '';
};

const isPrintableCharacter = (str: string) => {
  return str.length === 1 && /\S| /.exec(str);
};

const getNestedId = (rootId: string, ...nestedId: string[]) =>
  [rootId, ...nestedId].join('-');

const filterOptions = <Option extends AutocompleteOption>(
  options: Option[],
  _filter: string,
  isNone?: boolean,
  _option?: HTMLLIElement,
  cb?: (state: {
    filteredOptions: Option[];
    firstOption?: Option;
    option?: Option;
    lastOption?: Option;
  }) => void,
) => {
  let option = null;
  let firstOption = null;
  let lastOption = null;

  const currentOption = options.find(
    ({ value }) => value == _option?.dataset.id,
  );

  const filter = _filter.toLowerCase();

  const filteredOptions = isNone
    ? // do not filter any options if autocomplete is none
    options
    : options.filter(
      (opt) =>
        filter.length === 0 || opt.label.toLowerCase().startsWith(filter),
    );

  // Use populated options array to initialize firstOption and lastOption.
  const numItems = filteredOptions.length;

  if (numItems > 0) {
    firstOption = filteredOptions[0];
    lastOption = filteredOptions[numItems - 1];

    if (currentOption && filteredOptions.includes(currentOption)) {
      option = currentOption;
    } else {
      option = firstOption;
    }
  } else {
    firstOption = undefined;
    option = undefined;
    lastOption = undefined;
  }

  if (cb) {
    cb({ filteredOptions, firstOption, option, lastOption });
  }

  return { filteredOptions, firstOption, option, lastOption };
};

const isOptionInView = (option: HTMLElement) => {
  const bounding = option.getBoundingClientRect();

  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const Autocomplete = React.memo(
  React.forwardRef(
    <T extends AutocompleteOption>(
      props: Props<T>,
      ref: React.ForwardedRef<AutocompleteInputRef>,
    ) => {
      const {
        autocompleteType = 'none',
        className,
        id: inputId = 'autocomplete-id',
        name,
        options,
        placeholder,
        title,
        value: inputValue = '',
        prefix = 'opt-',
        disabled = false,
        openOnChange = false,
        status,
        assistiveStatus,
        render,
        onChange,
        onEnter,
        onSelect,
      } = props;

      const comboboxContainerNode = React.useRef<HTMLDivElement>(null);
      const comboboxNode =
        React.useRef<HTMLInputElement>(undefined) as unknown as React.MutableRefObject<HTMLInputElement>;

      const buttonNode =
        React.useRef<HTMLButtonElement>(undefined) as unknown as React.MutableRefObject<HTMLButtonElement>;

      const listboxContainerNode = React.useRef<HTMLDivElement>(null);
      const listboxScrollNode = React.useRef<HTMLDivElement>(null);
      const listboxNode = React.useRef<HTMLUListElement>(null);

      const isNone = autocompleteType === 'none';
      const isList = autocompleteType === 'list';
      const isBoth = autocompleteType === 'both';

      const t = React.useRef<{
        hasHover: boolean;
        option?: HTMLLIElement;
        firstOption?: HTMLLIElement;
        lastOption?: HTMLLIElement;
        listboxStyle?: React.CSSProperties;
      }>({ hasHover: false });

      const [listboxContainerStyle, setListboxContainerStyle] = React.useState<
        React.CSSProperties | undefined
      >(undefined);
      const [listboxScrollStyle, setListboxScrollStyle] = React.useState<
        React.CSSProperties | undefined
      >(undefined);

      const [isListboxOpened, setIsListboxOpened] = React.useState(false);

      const [comboboxHasVisualFocus, setComboboxHasVisualFocus] =
        React.useState(false);

      const [listboxHasVisualFocus, setListboxHasVisualFocus] =
        React.useState(false);

      const [activedescendant, setActivedescendant] =
        React.useState<string>('');

      const setActiveDescendant = React.useCallback(
        (
          option?: HTMLLIElement,
          _listboxHasVisualFocus: boolean = listboxHasVisualFocus,
        ) => {
          if (option && _listboxHasVisualFocus) {
            setActivedescendant(option.id);

            // TODO: Add optimization?
            // if (!isOptionInView(option, listboxNode.current)) {
            option.scrollIntoView?.({
              behavior: 'auto',
              block: 'center',
            });
            // }
          } else {
            setActivedescendant('');
          }
        },
        [listboxHasVisualFocus],
      );

      React.useEffect(() => {
        comboboxNode.current.setSelectionRange(
          inputValue.length,
          inputValue.length,
        );
      }, [inputValue]);

      const setValue = (value: string) => {
        onChange(value);

        comboboxNode.current.setSelectionRange(value.length, value.length);
      };

      const setOption = (
        option?: HTMLLIElement,
        flag?: boolean,
        forceVisualFocusListbox?: boolean,
      ) => {
        if (typeof flag !== 'boolean') {
          flag = false;
        }

        if (option) {
          t.current.option = option;
          setCurrentOptionStyle(option);
          setActiveDescendant(option, forceVisualFocusListbox);

          if (isBoth) {
            const textContent = option.textContent ?? '';

            // TODO: Use onChange ???
            comboboxNode.current.value = textContent;

            if (flag) {
              comboboxNode.current.setSelectionRange(
                textContent.length,
                textContent.length,
              );
            } else {
              comboboxNode.current.setSelectionRange(
                inputValue.length,
                textContent.length,
              );
            }
          }
        }
      };

      const setVisualFocusCombobox = () => {
        // set the focus class to the parent for easier styling
        setComboboxHasVisualFocus(true);

        setListboxHasVisualFocus(false);

        setActiveDescendant();
      };

      const setVisualFocusListbox = () => {
        setListboxHasVisualFocus(true);
        setComboboxHasVisualFocus(false);

        setActiveDescendant(t.current.option);
      };

      const removeVisualFocusAll = React.useCallback(() => {
        setListboxHasVisualFocus(false);
        setComboboxHasVisualFocus(false);

        t.current.option = undefined;
        setActiveDescendant();
      }, [setActiveDescendant]);

      const { filteredOptions } = React.useMemo(
        () =>
          filterOptions(
            options,
            inputValue,
            isNone,
            t.current.option,
            ({ firstOption, option, lastOption }) => {
              setTimeout(() => {
                if (option) {
                  t.current.option = getOption(
                    listboxNode.current,
                    option.value,
                    prefix,
                  );
                }

                if (firstOption) {
                  t.current.firstOption = getOption(
                    listboxNode.current,
                    firstOption.value,
                    prefix,
                  );
                }

                if (lastOption) {
                  t.current.lastOption = getOption(
                    listboxNode.current,
                    lastOption.value,
                    prefix,
                  );
                }
              });
            },
          ),
        [options, inputValue, isNone, prefix],
      );

      const setCurrentOptionStyle = React.useCallback(
        (option?: HTMLLIElement) => {
          for (const _opt of filteredOptions) {
            const opt = getOption(listboxNode.current, _opt.value, prefix);

            if (!opt) {
              continue;
            }

            if (opt.id === option?.id) {
              opt.setAttribute('aria-selected', 'true');

              if (listboxNode.current != null) {
                if (
                  listboxNode.current.scrollTop +
                    listboxNode.current.offsetHeight <
                  opt.offsetTop + opt.offsetHeight
                ) {
                  listboxNode.current.scrollTop =
                    opt.offsetTop +
                    opt.offsetHeight -
                    listboxNode.current.offsetHeight;
                } else if (listboxNode.current.scrollTop > opt.offsetTop) {
                  listboxNode.current.scrollTop =
                    opt.offsetTop - listboxNode.current.offsetTop;
                }
              }
            } else {
              opt.removeAttribute('aria-selected');
            }
          }
        },
        [filteredOptions, prefix],
      );

      // MENU DISPLAY METHODS

      const isOpen = () =>
        listboxContainerNode.current?.style.display === 'block';

      const isClosed = () =>
        listboxContainerNode.current?.style.display !== 'block';

      const hasOptions = () => filteredOptions.length > 0;

      const open = () => {
        if (listboxContainerNode.current != null) {
          listboxContainerNode.current.style.display = 'block';
        }

        comboboxNode.current.setAttribute('aria-expanded', 'true');
        buttonNode.current.setAttribute('aria-expanded', 'true');
        setIsListboxOpened(true);
      };

      const close = React.useCallback(
        (force?: boolean, autoFocus = true) => {
          if (typeof force !== 'boolean') {
            force = false;
          }

          if (!comboboxNode.current) {
            return;
          }

          if (
            force ||
            (!comboboxHasVisualFocus &&
              !listboxHasVisualFocus &&
              !t.current.hasHover)
          ) {
            setCurrentOptionStyle();

            if (listboxContainerNode.current != null) {
              listboxContainerNode.current.style.display = 'none';
            }

            comboboxNode.current.setAttribute('aria-expanded', 'false');
            buttonNode.current.setAttribute('aria-expanded', 'false');

            setActiveDescendant();
            setComboboxHasVisualFocus(autoFocus);
            setIsListboxOpened(false);
          }
        },
        [
          comboboxHasVisualFocus,
          listboxHasVisualFocus,
          setActiveDescendant,
          setCurrentOptionStyle,
        ],
      );

      const getPreviousOption = (currentOption?: HTMLLIElement) => {
        if (currentOption !== t.current.firstOption) {
          const index = filteredOptions.findIndex(
            ({ value }) => value == currentOption?.dataset.id,
          );

          return getOption(
            listboxNode.current,
            filteredOptions[index - 1]?.value,
            prefix,
          );
        }

        return t.current.lastOption;
      };

      const getNextOption = (currentOption?: HTMLLIElement) => {
        if (currentOption !== t.current.lastOption) {
          const index = filteredOptions.findIndex(
            ({ value }) => value == currentOption?.dataset.id,
          );

          return getOption(
            listboxNode.current,
            filteredOptions[index + 1]?.value,
            prefix,
          );
        }

        return t.current.firstOption;
      };

      // COMBOBOX EVENTS

      const onComboboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);

        if (openOnChange && isClosed()) {
          open();
        }
      };

      const onComboboxKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
      ) => {
        const { altKey, ctrlKey, shiftKey, key } = event;

        let flag = false;

        if (ctrlKey || shiftKey) {
          return;
        }

        switch (key) {
          case 'Enter':
          case 'Tab': {
            const _id = t.current.option?.dataset.id ?? '';
            const optionSelected = options.find(({ value }) => value == _id)!;
            const _value = optionSelected?.label.trim() ?? '';

            if (key === 'Enter') {
              if (listboxHasVisualFocus) {
                setValue(_value);

                onSelect?.(_id, optionSelected);
              } else {
                onEnter?.(inputValue);
              }

              close(true);
              setVisualFocusCombobox();

              flag = true;
            } else {
              // key === 'Tab'
              if (listboxHasVisualFocus) {
                if (t.current.option) {
                  setValue(_value);

                  onSelect?.(_id, optionSelected);
                }
              } else {
                onEnter?.(inputValue);
              }

              close(true);
            }

            break;
          }

          case 'Down':
          case 'ArrowDown': {
            if (filteredOptions.length > 0 || status) {
              if (altKey) {
                open();
              } else {
                open();

                if (
                  listboxHasVisualFocus ||
                  (isBoth && filteredOptions.length > 1)
                ) {
                  setVisualFocusListbox();
                  setOption(getNextOption(t.current.option), true, true);
                } else {
                  setVisualFocusListbox();
                  setOption(t.current.firstOption, true, true);
                }
              }
            }

            flag = true;

            break;
          }

          case 'Up':
          case 'ArrowUp': {
            if (hasOptions()) {
              if (listboxHasVisualFocus) {
                setVisualFocusListbox();
                setOption(getPreviousOption(t.current.option), true, true);
              } else {
                open();

                if (!altKey) {
                  setVisualFocusListbox();
                  setOption(t.current.lastOption, true, true);
                }
              }
            }

            flag = true;

            break;
          }

          case 'Esc':
          case 'Escape': {
            if (isOpen()) {
              close(true);
              setVisualFocusCombobox();
            } else {
              setValue('');
            }

            t.current.option = undefined;

            flag = true;

            break;
          }

          case 'Home': {
            comboboxNode.current.setSelectionRange(0, 0);

            flag = true;

            break;
          }

          case 'End': {
            const length = comboboxNode.current.value.length;

            comboboxNode.current.setSelectionRange(length, length);

            flag = true;

            break;
          }

          default:
            break;
        }

        if (flag) {
          event.stopPropagation();
          event.preventDefault();
        }
      };

      const onComboboxKeyUp = (
        event: React.KeyboardEvent<HTMLInputElement>,
      ) => {
        const { key, key: char } = event;

        let flag = false;
        let option = null;
        let filter = inputValue;

        if (isPrintableCharacter(char)) {
          filter += char;
        }

        // this is for the case when a selection in the textbox has been deleted
        if (inputValue.length < filter.length) {
          filter = inputValue;
          t.current.option = undefined;
        }

        if (key === 'Escape' || key === 'Esc') {
          return;
        }

        switch (key) {
          case 'Backspace': {
            setVisualFocusCombobox();
            setCurrentOptionStyle();

            filter = inputValue;
            t.current.option = undefined;
            flag = true;

            break;
          }

          case 'Left':
          case 'ArrowLeft':
          case 'Right':
          case 'ArrowRight':
          case 'Home':
          case 'End': {
            if (isBoth) {
              filter = inputValue;
            } else {
              t.current.option = undefined;
              setCurrentOptionStyle();
            }

            setVisualFocusCombobox();

            flag = true;

            break;
          }

          default: {
            if (isPrintableCharacter(char)) {
              setVisualFocusCombobox();
              setCurrentOptionStyle();

              flag = true;

              if (isList || isBoth) {
                option = t.current.option;

                if (option) {
                  if (isClosed() && inputValue.length) {
                    open();
                  }

                  if (
                    getLowercaseContent(option).startsWith(
                      inputValue.toLowerCase(),
                    )
                  ) {
                    if (isBoth || listboxHasVisualFocus) {
                      setCurrentOptionStyle(option);

                      if (isBoth) {
                        setOption(option);
                      }
                    }
                  } else {
                    t.current.option = undefined;
                    setCurrentOptionStyle();
                  }
                } else {
                  close();

                  t.current.option = undefined;

                  setActiveDescendant();
                }
              } else if (inputValue.length) {
                open();
              }
            }

            break;
          }
        }

        if (flag) {
          event.stopPropagation();
          event.preventDefault();
        }
      };

      const onComboboxClick = () => {
        comboboxNode.current.focus();

        if (isOpen()) {
          close(true);
        } else {
          open();
        }
      };

      const onComboboxFocus = () => {
        setVisualFocusCombobox();

        t.current.option = undefined;

        setCurrentOptionStyle();
      };

      const onComboboxBlur = () => {
        removeVisualFocusAll();
      };

      const onButtonClick = () => {
        if (isOpen()) {
          close(true);
        } else {
          open();
        }

        comboboxNode.current.focus();

        setVisualFocusCombobox();
      };

      // LISTBOX EVENTS

      const onListboxPointerover = () => {
        t.current.hasHover = true;
      };

      const onListboxPointerout = () => {
        t.current.hasHover = true;

        setTimeout(() => {
          close(false);
        }, MS);
      };

      // LISTBOX OPTION EVENTS

      const onOptionClick = (
        event: React.ChangeEvent<HTMLLIElement> &
          React.MouseEvent<HTMLLIElement>,
      ) => {
        const _id = event.currentTarget.dataset.id ?? '';
        const optionSelected = options.find(({ value }) => value == _id)!;
        const _value = optionSelected?.label.trim() ?? '';

        setValue(_value);

        onSelect?.(_id, optionSelected);

        close(true);
        comboboxNode.current.focus();
      };

      const onOptionPointerover = () => {
        t.current.hasHover = true;

        open();
      };

      const onOptionPointerout = () => {
        t.current.hasHover = false;

        setTimeout(() => {
          close(false);
        }, MS);
      };

      React.useEffect(() => {
        const onBackgroundPointerUp = (event: PointerEvent) => {
          if (
            !comboboxNode.current.contains(event.target as Node) &&
            !listboxNode.current?.contains(event.target as Node) &&
            !buttonNode.current.contains(event.target as Node)
          ) {
            setComboboxHasVisualFocus(false);
            setCurrentOptionStyle();
            removeVisualFocusAll();

            setTimeout(() => {
              close(true, false);
            }, MS);
          }
        };

        document.body.addEventListener(
          'pointerup',
          onBackgroundPointerUp,
          true,
        );

        return () => {
          document.body.removeEventListener(
            'pointerup',
            onBackgroundPointerUp,
            true,
          );
        };
      }, [close, inputId, removeVisualFocusAll, setCurrentOptionStyle]);

      React.useImperativeHandle(ref, () => ({
        focus: () => {
          comboboxNode.current.focus();
        },
        clear: () => {
          setValue('');
        },
        open: () => {
          open();

          if (listboxHasVisualFocus || (isBoth && filteredOptions.length > 1)) {
            setVisualFocusListbox();
            setOption(getNextOption(t.current.option), true, true);
          } else {
            setVisualFocusListbox();
            setOption(t.current.firstOption, true, true);
          }
        },
      }));

      const allOptions = filteredOptions.map((option) => {
        const { value, label } = option;
        const _label = render ? render(option) : label;

        return (
          <li
            className={s.li}
            key={value}
            id={generateOptionIndex(value, prefix)}
            data-id={value}
            role="option"
            onClick={onOptionClick}
            onPointerOver={onOptionPointerover}
            onPointerOut={onOptionPointerout}
          >
            {_label}
          </li>
        );
      });

      const containerSize = useElementSize(document.body);
      // @ts-expect-error: ...
      const listboxSize = useSize(listboxScrollNode);

      React.useEffect(() => {
        if (
          listboxScrollNode?.current == null ||
          comboboxContainerNode.current == null ||
          listboxContainerNode.current == null
        ) {
          return;
        }

        const styles = getPosition(
          comboboxContainerNode.current,
          listboxContainerNode.current,
          listboxScrollNode.current.offsetWidth,
        );

        setListboxContainerStyle(styles);

        if (styles.maxHeight != null) {
          const listBoxScrollVerticalPadding = 4;

          setListboxScrollStyle({
            paddingTop: listBoxScrollVerticalPadding,
            paddingBottom: listBoxScrollVerticalPadding,
            maxHeight: styles.maxHeight - 2 * listBoxScrollVerticalPadding,
            overflow: 'auto',
          });
        }
      }, [
        options?.length,
        containerSize?.width,
        containerSize?.height,
        listboxSize?.width,
        isListboxOpened,
      ]);

      React.useEffect(() => {
        // No blur event fired when button is disabled/removed
        if (!disabled) {
          setListboxHasVisualFocus(false);
          setComboboxHasVisualFocus(false);
          t.current.option = undefined;
          setActivedescendant('');
        }
      }, [disabled]);

      const assistiveText = assistiveStatus ?? status;

      return (
        <div className={cn(s.combobox, s.comboboxList, className)}>
          <div
            className={cn(s.group, {
              [s.focus]: !disabled && comboboxHasVisualFocus,
              [s.disabled]: disabled,
            })}
            ref={comboboxContainerNode}
          >
            <input
              className={s.input}
              ref={comboboxNode}
              id={inputId}
              value={inputValue}
              type="search"
              name={name}
              role="combobox"
              autoComplete="off"
              aria-autocomplete={autocompleteType}
              aria-expanded="false"
              aria-controls={getNestedId(inputId, 'listbox')}
              aria-activedescendant={activedescendant}
              onKeyDown={onComboboxKeyDown}
              onKeyUp={onComboboxKeyUp}
              onClick={onComboboxClick}
              onFocus={onComboboxFocus}
              onBlur={onComboboxBlur}
              onChange={onComboboxChange}
              placeholder={placeholder}
              title={title}
              disabled={disabled}
            />
            <button
              className={s.button}
              type="button"
              ref={buttonNode}
              id={getNestedId(inputId, 'btn')}
              tabIndex={-1}
              aria-label={props['aria-label']}
              aria-expanded="false"
              aria-controls={getNestedId(inputId, 'listbox')}
              onClick={onButtonClick}
              disabled={disabled}
            >
              <svg width="18" height="16" aria-hidden="true" focusable="false">
                <polyline
                  strokeWidth="1.75"
                  strokeOpacity="0.75"
                  fill="none"
                  stroke="currentcolor"
                  points="3,7 9,13 15,7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {createPortal(
            <div
              ref={listboxContainerNode}
              className={s.listboxContainer}
              style={isListboxOpened ? listboxContainerStyle : undefined}
            >
              <div ref={listboxScrollNode} style={listboxScrollStyle}>
                <ul
                  ref={listboxNode}
                  className={cn(s.listbox, {
                    [s.focus]: listboxHasVisualFocus,
                  })}
                  id={getNestedId(inputId, 'listbox')}
                  role="listbox"
                  aria-label={props['aria-label']}
                  onPointerOver={onListboxPointerover}
                  onPointerOut={onListboxPointerout}
                >
                  {allOptions}
                  {Boolean(status) && (
                    <li key="status" className={s.status}>
                      {status}
                    </li>
                  )}
                </ul>
                <div
                  id={getNestedId(inputId, 'status')}
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className={s.assistiveText}
                >
                  {assistiveText}
                </div>
              </div>
            </div>,
            document.body,
          )}
        </div>
      );
    },
  ),
);
