import React from 'react';

import { Kbd } from '@components/Kbd';

export const Info = () => {
  return (

    <section tabIndex={-1}>
      <h2>Keyboard Interaction</h2>
      <ul>
        <li><Kbd>Tab</Kbd>: The combobox is in the page <Kbd>Tab</Kbd> sequence.</li>
        <li>Note: The popup indicator icon or button (if present), the popup, and the popup descendants are excluded from the page <Kbd>Tab</Kbd> sequence.</li>
      </ul>
      <h3>Combobox Keyboard Interaction</h3>
      <p>When focus is in the combobox:</p>
      <ul>
        <li>
          <Kbd>Down Arrow</Kbd>: If the popup is available, moves focus into the popup:
          <ul>
            <li>If the autocomplete behavior automatically selected a suggestion before <Kbd>Down Arrow</Kbd> was pressed, focus is placed on the suggestion following the automatically selected suggestion.</li>
            <li>Otherwise, places focus on the first focusable element in the popup.</li>
          </ul>
        </li>
        <li><Kbd>Up Arrow</Kbd> (Optional): If the popup is available, places focus on the last focusable element in the popup.</li>
        <li>
          <Kbd>Escape</Kbd>: Dismisses the popup if it is visible.
          Optionally, if the popup is hidden before <Kbd>Escape</Kbd> is pressed, clears the combobox.
        </li>
        <li>
          <Kbd>Enter</Kbd>: If the combobox is editable and an autocomplete suggestion is selected in the popup, accepts the suggestion either by placing the input cursor at the end of the accepted value in the combobox or by performing a default action on the value.
          For example, in a messaging application, the default action may be to add the accepted value to a list of message recipients and then clear the combobox so the user can add another recipient.
        </li>
        <li>
          Printable Characters:
          <ul>
            <li>
              If the combobox is editable, type characters in the combobox.
              Note that some implementations may regard certain characters as invalid and prevent their input.
            </li>
            <li>If the combobox is not editable, optionally moves focus to a value that starts with the typed characters.</li>
          </ul>
        </li>
        <li>If the combobox is editable, it supports standard single line text editing keys appropriate for the device platform (see note below).</li>
        <li><Kbd>Alt</Kbd> + <Kbd>Down Arrow</Kbd> (Optional): If the popup is available but not displayed, displays the popup without moving focus.</li>
        <li>
          <Kbd>Alt</Kbd> + <Kbd>Up Arrow</Kbd> (Optional): If the popup is displayed:
          <ul>
            <li>If the popup contains focus, returns focus to the combobox.</li>
            <li>Closes the popup.</li>
          </ul>
        </li>
      </ul>
      <div className="note">
        <h4>Note</h4>
        <p>Standard single line text editing keys appropriate for the device platform:</p>
        <ol>
          <li>include keys for input, cursor movement, selection, and text manipulation.</li>
          <li>Standard key assignments for editing functions depend on the device operating system.</li>
          <li>The most robust approach for providing text editing functions is to rely on browsers, which supply them for HTML inputs with type text and for elements with the <code>contenteditable</code> HTML attribute.</li>
          <li><strong>IMPORTANT:</strong> Ensure JavaScript does not interfere with browser-provided text editing functions by capturing key events for the keys used to perform them.</li>
        </ol>
      </div>
      <h3>Listbox Popup Keyboard Interaction</h3>
      <p>When focus is in a listbox popup:</p>
      <ul>
        <li><Kbd>Enter</Kbd>: Accepts the focused option in the listbox by closing the popup, placing the accepted value in the combobox, and if the combobox is editable, placing the input cursor at the end of the value.</li>
        <li>
          <Kbd>Escape</Kbd>: Closes the popup and returns focus to the combobox.
          Optionally, if the combobox is editable, clears the contents of the combobox.
        </li>
        <li>
          <Kbd>Down Arrow</Kbd>: Moves focus to and selects the next option.
          If focus is on the last option, either returns focus to the combobox or does nothing.
        </li>
        <li>
          <Kbd>Up Arrow</Kbd>: Moves focus to and selects the previous option.
          If focus is on the first option, either returns focus to the combobox or does nothing.
        </li>
        <li>
          <Kbd>Right Arrow</Kbd>: If the combobox is editable, returns focus to the combobox without closing the popup and moves the input cursor one character to the right.
          If the input cursor is on the right-most character, the cursor does not move.
        </li>
        <li>
          <Kbd>Left Arrow</Kbd>: If the combobox is editable, returns focus to the combobox without closing the popup and moves the input cursor one character to the left.
          If the input cursor is on the left-most character, the cursor does not move.
        </li>
        <li><Kbd>Home</Kbd> (Optional): Either moves focus to and selects the first option or, if the combobox is editable, returns focus to the combobox and places the cursor on the first character.</li>
        <li><Kbd>End</Kbd> (Optional): Either moves focus to the last option or, if the combobox is editable, returns focus to the combobox and places the cursor after the last character.</li>
        <li>
          Any printable character:
          <ul>
            <li>If the combobox is editable, returns the focus to the combobox without closing the popup and types the character.</li>
            <li>Otherwise, moves focus to the next option with a name that starts with the characters typed.</li>
          </ul>
        </li>
        <li><Kbd>Backspace</Kbd> (Optional): If the combobox is editable, returns focus to the combobox and deletes the character prior to the cursor.</li>
        <li><Kbd>Delete</Kbd> (Optional): If the combobox is editable, returns focus to the combobox, removes the selected state if a suggestion was selected, and removes the inline autocomplete string if present.</li>
      </ul>
      <div className="note">
        <h4>Note</h4>
        <ol>
          <li>
            DOM Focus is maintained on the combobox and the assistive technology focus is moved within the listbox using <code>aria-activedescendant</code> as described in
            <a href="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_activedescendant">Managing Focus in Composites Using aria-activedescendant</a>.
          </li>
          <li>Selection follows focus in the listbox; the listbox allows only one suggested value to be selected at a time for the combobox value.</li>
        </ol>
      </div>
    </section>
  )
}