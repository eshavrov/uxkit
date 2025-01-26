import cn from 'classnames';
import React from 'react';

import s from './DatePicker.module.css';

interface Props {
  value: any;
}

const buttonLabelChoose = 'Choose Date';

const buttonLabelChange = 'Change Date';

const dayLabels = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const monthLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const messageCursorKeys = 'Cursor keys can navigate dates';

const isSameDay = (day1: Date, day2: Date) => {
  return (
    day1.getFullYear() == day2.getFullYear() &&
    day1.getMonth() == day2.getMonth() &&
    day1.getDate() == day2.getDate()
  );
};

const isNotSameMonth = (day1: Date, day2: Date) => {
  return (
    day1.getFullYear() != day2.getFullYear() ||
    day1.getMonth() != day2.getMonth()
  );
};

const parseTextDate = (text: string) => {
  const parts = text.split('-');

  // @ts-expect-error: ...
  return new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2]);
};

const getDataDate = (day: Date) => {
  let d = day.getDate().toString();

  if (day.getDate() <= 9) {
    d = '0' + d;
  }

  let m = `${day.getMonth() + 1}`;

  if (day.getMonth() < 9) {
    m = '0' + m;
  }

  return `${day.getFullYear()}-${m}-${d}`;
};

// Day methods

const isDayDisabled = (domNode: any) => {
  return domNode.classList.contains('disabled');
};

const getDayFromDataDateAttribute = (domNode: any) => {
  return parseTextDate(domNode.getAttribute('data-date'));
};

export const DatePicker = React.memo(
  React.forwardRef((props: Props, ref: any) => {
    const textboxNode =
      React.useRef(undefined) as unknown as React.MutableRefObject<HTMLInputElement>;

    const buttonNode =
      React.useRef(undefined) as unknown as React.MutableRefObject<HTMLButtonElement>;

    const dialogNode = React.useRef(undefined) as unknown as React.MutableRefObject<HTMLDivElement>;

    const messageNode =
      React.useRef(undefined) as unknown as React.MutableRefObject<HTMLInputElement>;

    const monthYearNode =
      React.useRef(undefined) as unknown as React.MutableRefObject<HTMLHeadingElement>;

    const prevYearNode =
      React.useRef(undefined) as unknown as React.MutableRefObject<HTMLButtonElement>;

    const prevMonthNode =
      React.useRef(undefined) as unknown as React.MutableRefObject<HTMLButtonElement>;

    const nextMonthNode =
      React.useRef(undefined) as unknown as React.MutableRefObject<HTMLButtonElement>;

    const nextYearNode =
      React.useRef(undefined) as unknown as React.MutableRefObject<HTMLButtonElement>;

    const okButtonNode =
      React.useRef(undefined) as unknown as React.MutableRefObject<HTMLButtonElement>;

    const cancelButtonNode =
      React.useRef(undefined) as unknown as React.MutableRefObject<HTMLButtonElement>;

    const tbodyNode =
      React.useRef(undefined) as unknown as React.MutableRefObject<HTMLTableSectionElement>;

    // let lastRowNode = null;
    // React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const [focusDay, setFocusDay] = React.useState(new Date());
    const [selectedDay, setSelectedDay] = React.useState(new Date(0, 0, 1));
    const [textValue, setTextValue] = React.useState('');

    const isMouseDownOnBackground = false;

    const t = React.useRef<{
      lastMessage: string;
      lastRowNode?: any;
      isMouseDownOnBackground: boolean;
    }>({ lastMessage: '', isMouseDownOnBackground: false });

    const setDateForButtonLabel = () => {
      const parts = textboxNode.current.value.split('/');

      if (
        parts.length === 3 &&
        Number.isInteger(parseInt(parts[0], 10)) &&
        Number.isInteger(parseInt(parts[1], 10)) &&
        Number.isInteger(parseInt(parts[2], 10))
      ) {
        const day = new Date(
          parseInt(parts[2], 10),
          parseInt(parts[0], 10) - 1,
          parseInt(parts[1], 10),
        );

        let label = buttonLabelChange;

        label += ', ' + dayLabels[day.getDay()];
        label += ' ' + monthLabels[day.getMonth()];
        label += ' ' + day.getDate();
        label += ', ' + day.getFullYear();
        buttonNode.current.setAttribute('aria-label', label);
      } else {
        // If not a valid date, initialize with "Choose Date"
        buttonNode.current.setAttribute('aria-label', buttonLabelChoose);
      }
    };

    const getCellDateProps = (
      disable: boolean,
      day: Date,
      selected: boolean,
      focused: boolean,
    ) => {
      const domNode: Record<string, any> = {};

      domNode.tabIndex = -1;
      domNode.ariaSelected = undefined;
      domNode.dataDate = getDataDate(day);

      if (disable) {
        domNode.date = day.getDate();
      } else {
        domNode.date = day.getDate();

        if (selected) {
          domNode.ariaSelected = 'true';
        }

        if (focused) {
          domNode.tabIndex = 0;
        }
      }

      return domNode;
    };

    const [currentMessage, setCurrentMessage] = React.useState('');

    const setTextboxDate = (domNode?: any) => {
      let _focusDay = focusDay;

      if (domNode) {
        _focusDay = getDayFromDataDateAttribute(domNode);
        // setFocusDay(_focusDay);
        // setSelectedDay(_focusDay);

        // updated aria-selected
        // this.days.forEach((day) =>
        //   day === domNode
        //     ? day.setAttribute('aria-selected', 'true')
        //     : day.removeAttribute('aria-selected')
        // );
      }

      setFocusDay(_focusDay);
      setSelectedDay(_focusDay);

      setTextValue(
        `${
          _focusDay.getMonth() + 1
        }/${_focusDay.getDate()}/${_focusDay.getFullYear()}`,
      );

      setDateForButtonLabel();
    };

    const setMessage = (str: string) => {
      function setMessageDelayed() {
        // this.messageNode.textContent = str;
        setCurrentMessage(str);
      }

      if (str !== t.current.lastMessage) {
        setTimeout(setMessageDelayed, 200);
        t.current.lastMessage = str;
      }
    };

    const _setFocusDay = (flag = true, day?: Date) => {
      if (flag) {
        // dayNode.focus();
        const dataDate = getDataDate(day ?? focusDay);

        setTimeout(() => {
          tbodyNode.current
            .querySelector(`td[data-date="${dataDate}"]`)
            // @ts-expect-error: ...
            ?.focus();
        });
      }

      // setTimeout(() => {
      //   setSelectedDay(focusDay);
      // });
      // setSelectedDay(focusDay);

      // for (let i = 0; i < this.days.length; i++) {
      //   const dayNode = this.days[i];
      //   const day = getDayFromDataDateAttribute(dayNode);

      //   dayNode.tabIndex = -1;
      //   if (this.isSameDay(day, this.focusDay)) {
      //     dayNode.tabIndex = 0;

      //     if (flag) {
      //       dayNode.focus();
      //     }
      //   }
      // }
    };

    const moveFocusToDay = (day: any) => {
      // const d = this.focusDay;

      // this.focusDay = day;

      // if (
      //   d.getMonth() != this.focusDay.getMonth() ||
      //   d.getFullYear() != this.focusDay.getFullYear()
      // ) {
      //   this.updateGrid();
      // }

      setFocusDay(day);
      _setFocusDay(true, day);
    };

    const getDateFromTextbox = () => {
      const parts = textboxNode.current.value.split('/');
      const month = parseInt(parts[0], 10);
      const day = parseInt(parts[1], 10);

      let year = parseInt(parts[2], 10);

      if (
        parts.length === 3 &&
        Number.isInteger(month) &&
        Number.isInteger(day) &&
        Number.isInteger(year)
      ) {
        if (year < 100) {
          year = 2000 + year;
        }

        const _focusDay = new Date(year, month - 1, day);

        setFocusDay(_focusDay);
        setSelectedDay(new Date(focusDay));
      } else {
        // If not a valid date (MM/DD/YY) initialize with todays date
        setFocusDay(new Date());
        setSelectedDay(new Date(0, 0, 1));
      }
    };

    const isOpen = () => {
      return window.getComputedStyle(dialogNode.current).display !== 'none';
    };

    const open = () => {
      dialogNode.current.style.display = 'block';
      dialogNode.current.style.zIndex = '2';

      getDateFromTextbox();
    };

    const close = (flag = true) => {
      setMessage('');
      dialogNode.current.style.display = 'none';

      setSelectedDay((prevSelectedDay) => {
        if (prevSelectedDay) {
          setFocusDay(prevSelectedDay);
        }

        return prevSelectedDay;
      });

      if (flag) {
        textboxNode.current.focus();
      }
    };

    const moveToNextYear = () => {
      setFocusDay(
        (prevFocusDay) =>
          new Date(prevFocusDay.setFullYear(prevFocusDay.getFullYear() + 1)),
      );
      // this.focusDay.setFullYear(this.focusDay.getFullYear() + 1);
      // this.updateGrid();
    };

    const moveToPreviousYear = () => {
      setFocusDay(
        (prevFocusDay) =>
          new Date(prevFocusDay.setFullYear(prevFocusDay.getFullYear() - 1)),
      );
      // this.focusDay.setFullYear(this.focusDay.getFullYear() - 1);
      // this.updateGrid();
    };

    const moveToNextMonth = () => {
      setFocusDay(
        (prevFocusDay) =>
          new Date(prevFocusDay.setMonth(prevFocusDay.getMonth() + 1)),
      );
      // this.focusDay.setMonth(this.focusDay.getMonth() + 1);
      // this.updateGrid();
    };

    const moveToPreviousMonth = () => {
      setFocusDay(
        (prevFocusDay) =>
          new Date(prevFocusDay.setMonth(prevFocusDay.getMonth() - 1)),
      );
      // this.focusDay.setMonth(this.focusDay.getMonth() - 1);
      // this.updateGrid();
    };

    const moveFocusToNextDay = () => {
      const d = new Date(focusDay);

      d.setDate(d.getDate() + 1);
      moveFocusToDay(d);
    };

    const moveFocusToNextWeek = () => {
      const d = new Date(focusDay);

      d.setDate(d.getDate() + 7);
      moveFocusToDay(d);
    };

    const moveFocusToPreviousDay = () => {
      const d = new Date(focusDay);

      d.setDate(d.getDate() - 1);
      moveFocusToDay(d);
    };

    const moveFocusToPreviousWeek = () => {
      const d = new Date(focusDay);

      d.setDate(d.getDate() - 7);
      moveFocusToDay(d);
    };

    const moveFocusToFirstDayOfWeek = () => {
      const d = new Date(focusDay);

      d.setDate(d.getDate() - d.getDay());
      moveFocusToDay(d);
    };

    const moveFocusToLastDayOfWeek = () => {
      const d = new Date(focusDay);

      d.setDate(d.getDate() + (6 - d.getDay()));
      moveFocusToDay(d);
    };

    const onInputKeyDown = (event: any) => {
      if (event.key === 'Down' || event.key === 'ArrowDown') {
        open();
        _setFocusDay();

        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handleButtonKeydown = (event: any) => {
      if (event.key === 'Enter' || event.key === ' ') {
        open();
        _setFocusDay();

        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handleButtonClick = (event: any) => {
      if (isOpen()) {
        close();
      } else {
        open();
        _setFocusDay();
      }

      event.stopPropagation();
      event.preventDefault();
    };

    const handleCancelButton = (event: any) => {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Esc':
            case 'Escape':
              close();
              flag = true;
              break;

            default:
              break;
          }

          break;

        case 'click':
          close();
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handleOkButton = (event: any) => {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Tab':
              if (!event.shiftKey) {
                prevYearNode.current.focus();
                flag = true;
              }

              break;

            case 'Esc':
            case 'Escape':
              close();
              flag = true;
              break;

            default:
              break;
          }

          break;

        case 'click':
          setTextboxDate();
          close();
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handlePreviousMonthButton = (event: any) => {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Esc':
            case 'Escape':
              close();
              flag = true;
              break;

            case 'Enter':
              moveToPreviousMonth();
              _setFocusDay(false);
              flag = true;
              break;
          }

          break;

        case 'click':
          moveToPreviousMonth();
          _setFocusDay(false);
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handleNextMonthButton = (event: any) => {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Esc':
            case 'Escape':
              close();
              flag = true;
              break;

            case 'Enter':
              moveToNextMonth();
              _setFocusDay(false);
              flag = true;
              break;
          }

          break;

        case 'click':
          moveToNextMonth();
          _setFocusDay(false);
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handlePreviousYearButton = (event: any) => {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Enter':
              moveToPreviousYear();
              _setFocusDay(false);
              flag = true;
              break;

            case 'Tab':
              if (event.shiftKey) {
                okButtonNode.current.focus();
                flag = true;
              }

              break;

            case 'Esc':
            case 'Escape':
              close();
              flag = true;
              break;

            default:
              break;
          }

          break;

        case 'click':
          moveToPreviousYear();
          _setFocusDay(false);
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handleNextYearButton = (event: any) => {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Esc':
            case 'Escape':
              close();
              flag = true;
              break;

            case 'Enter':
              moveToNextYear();
              _setFocusDay(false);
              flag = true;
              break;
          }

          break;

        case 'click':
          moveToNextYear();
          _setFocusDay(false);
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handleDayClick = (event: any) => {
      // if (!isDayDisabled(event.currentTarget) && event.which !== 3) {
      setTextboxDate(event.currentTarget);
      close();
      // }

      event.stopPropagation();
      event.preventDefault();
    };

    const handleDayKeyDown = (event: any) => {
      let flag = false;

      switch (event.key) {
        case 'Esc':
        case 'Escape':
          close();
          break;

        case ' ':
          setTextboxDate(event.currentTarget);
          flag = true;
          break;

        case 'Enter':
          setTextboxDate(event.currentTarget);
          close();
          flag = true;
          break;

        case 'Tab':
          cancelButtonNode.current.focus();

          if (event.shiftKey) {
            nextYearNode.current.focus();
          }

          setMessage('');
          flag = true;
          break;

        case 'Right':
        case 'ArrowRight':
          moveFocusToNextDay();
          flag = true;
          break;

        case 'Left':
        case 'ArrowLeft':
          moveFocusToPreviousDay();
          flag = true;
          break;

        case 'Down':
        case 'ArrowDown':
          moveFocusToNextWeek();
          flag = true;
          break;

        case 'Up':
        case 'ArrowUp':
          moveFocusToPreviousWeek();
          flag = true;
          break;

        case 'PageUp':
          if (event.shiftKey) {
            moveToPreviousYear();
          } else {
            moveToPreviousMonth();
          }

          _setFocusDay();
          flag = true;
          break;

        case 'PageDown':
          if (event.shiftKey) {
            moveToNextYear();
          } else {
            moveToNextMonth();
          }

          _setFocusDay();
          flag = true;
          break;

        case 'Home':
          moveFocusToFirstDayOfWeek();
          flag = true;
          break;

        case 'End':
          moveFocusToLastDayOfWeek();
          flag = true;
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handleDayFocus = () => {
      setMessage(messageCursorKeys);
    };

    React.useEffect(() => {
      // init
      close(false);
      setDateForButtonLabel();
    }, []);

    const grid = React.useMemo(() => {
      let flag = false;
      let prevFlag = false;

      // monthYearNode.current.textContent = `${
      //   monthLabels[focusDay.getMonth()]
      // } ${focusDay.getFullYear()}`;

      const firstDayOfMonth = new Date(
        focusDay.getFullYear(),
        focusDay.getMonth(),
        1,
      );
      const dayOfWeek = firstDayOfMonth.getDay();

      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);

      const d = new Date(firstDayOfMonth);

      const rows = Array.from({ length: 6 }, (_, rowIndex) => {
        prevFlag = flag;

        const cells = Array.from({ length: 7 }, (_, cellIndex) => {
          flag = d.getMonth() != focusDay.getMonth();

          const cellProps = getCellDateProps(
            flag,
            d,
            isSameDay(d, selectedDay),
            isSameDay(d, focusDay),
          );
          const { tabIndex, ariaSelected, dataDate, date } = cellProps;
          // isSameDay(parseTextDate(props[data-date]), focusDay)

          d.setDate(d.getDate() + 1);

          return (
            <td
              key={cellIndex}
              className={cn({ [s.disabled]: flag })}
              data-date={dataDate}
              tabIndex={tabIndex}
              aria-selected={ariaSelected}
              role="gridcell"
              onClick={handleDayClick}
              onKeyDown={handleDayKeyDown}
              onFocus={handleDayFocus}
            >
              <span className={s.cellInner}>{date}</span>
            </td>
          );
        });

        return (
          <tr key={rowIndex} className={cn({ [s.rowHidden]: prevFlag })}>
            {cells}
          </tr>
        );
      });

      return rows;
    }, [
      focusDay,
      handleDayClick,
      handleDayFocus,
      handleDayKeyDown,
      selectedDay,
    ]);

    React.useEffect(() => {
      const onBackgroundPointerUp = (event: any) => {
        if (
          !buttonNode.current.contains(event.target) &&
          !dialogNode.current.contains(event.target)
        ) {
          if (isOpen()) {
            close(false);
            event.stopPropagation();
            event.preventDefault();
          }
        }
      };

      document.body.addEventListener('pointerup', onBackgroundPointerUp, true);

      return () => {
        document.body.removeEventListener(
          'pointerup',
          onBackgroundPointerUp,
          true,
        );
      };
    }, []);

    return (
      <div id="myDatepicker" className={s.datepicker}>
        <div className={s.date}>
          <label htmlFor="id-textbox-1">Date</label>

          <div className={s.group}>
            <input
              ref={textboxNode}
              type="text"
              placeholder="mm/dd/yyyy"
              id="id-textbox-1"
              // aria-describedby="id-description-1"
              onKeyDown={onInputKeyDown}
              onBlur={setDateForButtonLabel}
              value={textValue}
              // required props
              onChange={()=>{}}
            />
            {/* <span className={s.desc} id="id-description-1">
              (<span className={s.srOnly}>date format: </span>mm/dd/yyyy)
            </span> */}
            <button
              ref={buttonNode}
              type="button"
              className={s.icon}
              aria-label="Choose Date"
              onKeyDown={handleButtonKeydown}
              onClick={handleButtonClick}
            >
              <span role="img" aria-label="calendar" className={s.anticon}>
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="calendar"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div
          ref={dialogNode}
          id="id-datepicker-1"
          className={s.datepickerDialog}
          role="dialog"
          aria-modal="true"
          aria-label="Choose Date"
        >
          <div className={s.header}>
            <button
              ref={prevYearNode}
              type="button"
              className={s.prevYear}
              aria-label="previous year"
              onKeyDown={handlePreviousYearButton}
              onClick={handlePreviousYearButton}
            >
              <span className={cn(s.pickerSuperNavIcon, s.prev)} />
            </button>

            <button
              ref={prevMonthNode}
              type="button"
              className={s.prevMonth}
              aria-label="previous month"
              onKeyDown={handlePreviousMonthButton}
              onClick={handlePreviousMonthButton}
            >
              <span className={cn(s.pickerNavIcon, s.prev)} />
            </button>

            <h2
              ref={monthYearNode}
              id="id-grid-label"
              className={s.monthYear}
              aria-live="polite"
            >
              {`${monthLabels[focusDay.getMonth()]} ${focusDay.getFullYear()}`}
            </h2>

            <button
              ref={nextMonthNode}
              type="button"
              className={s.nextMonth}
              aria-label="next month"
              onKeyDown={handleNextMonthButton}
              onClick={handleNextMonthButton}
            >
              <span className={cn(s.pickerNavIcon, s.next)} />
            </button>

            <button
              ref={nextYearNode}
              type="button"
              className={s.nextYear}
              aria-label="next year"
              onKeyDown={handleNextYearButton}
              onClick={handleNextYearButton}
            >
              <span className={cn(s.pickerSuperNavIcon, s.next)} />
            </button>
          </div>

          <div className={s.tableWrap}>
            <table
              className={s.dates}
              role="grid"
              aria-labelledby="id-grid-label"
            >
              <thead>
                <tr>
                  <th scope="col" abbr="Sunday">
                    Su
                  </th>
                  <th scope="col" abbr="Monday">
                    Mo
                  </th>
                  <th scope="col" abbr="Tuesday">
                    Tu
                  </th>
                  <th scope="col" abbr="Wednesday">
                    We
                  </th>
                  <th scope="col" abbr="Thursday">
                    Th
                  </th>
                  <th scope="col" abbr="Friday">
                    Fr
                  </th>
                  <th scope="col" abbr="Saturday">
                    Sa
                  </th>
                </tr>
              </thead>

              <tbody ref={tbodyNode}>{grid}</tbody>
            </table>
          </div>

          <div className={s.dialogOkCancelGroup}>
            <button
              ref={cancelButtonNode}
              className={s.dialogButton}
              type="button"
              value="cancel"
              onKeyDown={handleCancelButton}
              onClick={handleCancelButton}
            >
              Cancel
            </button>
            <button
              ref={okButtonNode}
              className={s.dialogButton}
              type="button"
              value="ok"
              onKeyDown={handleOkButton}
              onClick={handleOkButton}
            >
              OK
            </button>
          </div>
          <div
            ref={messageNode}
            className={cn(s.dialogMessage, {
              [s.dialogMessage_Hide]: !currentMessage,
            })}
            aria-live="polite"
          >
            {currentMessage}
          </div>
        </div>
      </div>
    );
  }),
);

DatePicker.displayName = 'DatePicker';
