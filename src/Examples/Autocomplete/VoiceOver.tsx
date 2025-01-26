import { Kbd } from "@components/Kbd";
import React from "react";

export const VoiceOver = () => {
  return (
    <div id="contentwrapper">
      <div id="pageInnerContent">
        <h1>VoiceOver Keyboard Shortcuts on a Mac</h1>
        <div className="pageToc">
          <h2 className="pageToc" id="vo-mac-pageTocHeading">
            On this page:
          </h2>
          <nav aria-labelledby="vo-mac-pageTocHeading">
            <ol>
              <li>
                <a href="#vo-mac-basics">The basics</a>
              </li>
              <li>
                <a href="#vo-mac-navigation">Navigation</a>
              </li>
              <li>
                <a href="#vo-mac-tables">Data tables</a>
              </li>
              <li>
                <a href="#vo-mac-the-rotor">The rotor</a>
              </li>
              <li>
                <a href="#vo-mac-additional">Additional resources</a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="clear"></div>
        <p>
          VoiceOver for macOS, first introduced in Mac OS X 10.4 in 2005, is a
          screen reader program that comes on new Mac computers. A variation of
          VoiceOver is also available on iPhones, iPads, and iPod touches.
        </p>
        <div className="note">
          <h2>Note:</h2>
          <p>
            VoiceOver works best with Safari. If you try to use it with any
            other browser, it may work for some things, but not as consistently
            as with Safari.
            <br />
            <img
              style={{ verticalAlign: "baseline" }}
              src="https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/images/logo-voiceover.png"
              width="30"
              height="30"
              alt="VoiceOver"
            />{" "}
            <span
              style={{
                position: "relative",
                top: "-10px",
                fontSize: "18px",
              }}
            >
              +
            </span>{" "}
            <img
              style={{ verticalAlign: "baseline" }}
              src="https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/images/logo-safari.png"
              width="30"
              height="30"
              alt="Safari"
            />
          </p>
        </div>

        <h2 id="vo-mac-basics" tabIndex={-1}>
          The basics
        </h2>
        <p>
          <Kbd>⌘ Command + F5</Kbd> starts the VoiceOver program. VoiceOver uses
          the Control and Option keys before each command. The combination is
          referred to as VO in the tables. The VO keys can be locked so that
          they do not need to be pressed to perform VoiceOver commands by
          pressing VO + ; (semicolon).
        </p>

        <table className="data">
          <caption>Getting Started</caption>
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Command</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" data-th=" Task">
                Start (or stop) VoiceOver
              </th>
              <td data-th=" Command">
                <Kbd>⌘</Kbd> + <Kbd>F5</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                VoiceOver Activation keys (or <strong>VO</strong> keys)
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> (referenced as <Kbd>⌃</Kbd> +{" "}
                <Kbd>⌥</Kbd>)
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Lock (or unlock) <strong>VO</strong> keys
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>;</Kbd> (<Kbd>semicolon</Kbd>
                )
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Repeat last spoken phrase
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>Z</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Open rotor (see explanation below)
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>U</Kbd>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="data">
          <caption>Reading</caption>
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Command</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" data-th=" Task">
                Start reading
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>A</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Pause or resume reading
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Read next item
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>Right Arrow</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Read previous item
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>Left Arrow</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Read paragraph
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>P</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Read sentence
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>S</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Read word (press multiple times to spell words alphabetically
                and phonetically)
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>W</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Read character (press twice to read a character phonetically)
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>C</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Read from top to current location
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>B</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Jump to top of page (using desktop keyboards)
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>Home</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Jump to top of page (using laptop keyboards)
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>Fn</Kbd> +{" "}
                <Kbd>Left Arrow</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Jump to bottom of page (using desktop keyboards)
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>End</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Jump to bottom of page (using laptop keyboards)
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>Fn</Kbd> +{" "}
                <Kbd>Right Arrow</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Navigate table cells
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>Arrow Keys</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Select speech setting option (speaking rate, voice, pitch, etc.)
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>⌘</Kbd> + <br />{" "}
                <Kbd>Right Arrow</Kbd> / <Kbd>Left Arrow</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Modify the selected speech setting
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>⌘</Kbd> + <Kbd>Up Arrow</Kbd>{" "}
                / <Kbd>Down Arrow</Kbd>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 id="vo-mac-navigation">Navigation</h2>

        <p>
          The following shortcuts will help you navigate common page elements.
          You can press the Shift key with these commands to move to the
          previous occurrence.
        </p>

        <table className="data">
          <caption>Page Elements</caption>
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Command</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" data-th=" Task">
                Go to next/previous focusable item (link, button, input, etc.)
              </th>
              <td data-th=" Command">
                <Kbd>Tab</Kbd> / <Kbd>Shift</Kbd> + <Kbd>Tab</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Next link
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>⌘</Kbd> + <Kbd>L</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Next <em>visited</em> link
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>⌘</Kbd> + <Kbd>V</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Next heading
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>⌘</Kbd> + <Kbd>H</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Next form element
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>⌘</Kbd> + <Kbd>J</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Next table
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>⌘</Kbd> + <Kbd>T</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Next list
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>⌘</Kbd> + <Kbd>X</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Next graphic
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>⌘</Kbd> + <Kbd>G</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Activate a link or form control
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>Space Bar</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Go to previous (heading, table, etc.)
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>Shift</Kbd> + <Kbd>⌘</Kbd> +
                (<Kbd>H</Kbd>, <Kbd>T</Kbd>, etc.)
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Interact with (go into/out of) objects (like iframes, menus,
                application regions, etc.)
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>Shift</Kbd> +{" "}
                <Kbd>Down Arrow</Kbd> / <Kbd>Up Arrow</Kbd>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 id="vo-mac-tables">Data tables</h2>

        <p>
          You can navigate tables in text areas by row and column, and sort by
          column.
        </p>

        <table className="data">
          <caption>Data Tables</caption>
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Command</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" data-th=" Task">
                Read column header
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>C</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Read row from VO cursor location to end of row
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>R</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Read column from VO cursor location to bottom of column
              </th>
              <td data-th=" Command">
                <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>R</Kbd> + <Kbd>C</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Move up or down in a column
              </th>
              <td data-th=" Command">
                <Kbd>Up Arrow</Kbd> or <Kbd>Down Arrow</Kbd>
              </td>
            </tr>
            <tr>
              <th scope="row" data-th=" Task">
                Move across a row
              </th>
              <td data-th=" Command">
                <Kbd>Left Arrow</Kbd> or <Kbd>Right Arrow</Kbd>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 id="vo-mac-the-rotor">The rotor</h2>

        <p>
          The VoiceOver "rotor" feature helps users to do some frequently
          performed navigation actions quickly and easily. You can choose which
          element types are viewable in the rotor by opening the VoiceOver
          Utility with <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>F8</Kbd>, then going
          to Web &gt; Web Rotor.
        </p>
        <p>
          Open the rotor by pressing <Kbd>⌃</Kbd> + <Kbd>⌥</Kbd> + <Kbd>U</Kbd>,
          then use the <Kbd>Left Arrow</Kbd> and <Kbd>Right Arrow</Kbd> keys to
          choose between element types (availability varies depending on the
          content of the web page, and whether the element type is enabled for
          viewing in the rotor), such as Links, Headings, Tables, Frames,
          Images, Auto Web Spots (automatically generated list of structural and
          significant items on the page), Web Spots (user-identified page
          areas), Form Controls, Landmarks, Visited Links, and Non-Visited
          Links. Once a page element type is selected, use the{" "}
          <Kbd>Up Arrow</Kbd> and <Kbd>Down Arrow</Kbd> to select a particular
          element and <Kbd>Enter</Kbd> to activate it. <Kbd>Escape</Kbd> exits
          the rotor.
        </p>
        <p>
          Within the rotor, you can begin typing to filter the available
          elements. For example, with the Headers rotor open, pressing "2" will
          filter to second level headings. Typing "nav" will filter to the
          headings that contain those characters.
        </p>
        <h2 id="vo-mac-additional">Additional resources</h2>
        <p>
          Apple provides VoiceOver user information at{" "}
          <a href="http://www.apple.com/voiceover/info/guide/">
            www.apple.com/voiceover/info/guide/
          </a>
          .
        </p>
      </div>
    </div>
  );
};
