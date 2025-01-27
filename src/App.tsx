import React from "react";
import cn from "classnames";

import { Breadcrumb } from "@components/Breadcrumb";
import { Button } from "@components/Button";
import { Autocomplete } from "@components/Autocomplete";
import { Select } from "@components/Select";
import { Fieldset } from "@components/Fieldset";
import { Field } from "@components/Field";
import { Checkbox } from "@components/Checkbox";
import { Checkboxes } from "@components/Checkboxes";
import { DatePicker } from "@components/DatePicker";
import { Group } from "@components/Group";
import { Tabs } from "@components/Tabs";
import { Tag } from "@components/Tag";
import { Radio } from "@components/Radio/Radio";
import { RadioGroup } from "@components/Radio/RadioGroup";
import { Table } from "@components/Table";
import { Kbd } from "@components/Kbd";
import { Info } from "./Examples/Autocomplete/Info";

import s from "App.module.css";
import { VoiceOver } from "./Examples/Autocomplete/VoiceOver";
import { Colors } from "./Examples/Color/Color";
import { Example1 } from "./Examples/Form1";

const _options: any[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Boysenberry", value: "boysenberry" },
  { label: "Cherry", value: "cherry" },
  { label: "Cranberry", value: "cranberry" },
  { label: "Durian", value: "durian" },
  { label: "Eggplant", value: "eggplant" },
  { label: "Fig", value: "fig" },
  { label: "Grape", value: "grape" },
  { label: "Guava", value: "guava" },
  { label: "Huckleberry", value: "huckleberry" },
];

const prefix = "opt-";

const breadcrumbItems = [
  {
    label: "App",
    path: "path1",
  },
  {
    label: "level1",
    path: "path2",
  },
  {
    label: "level2",
    path: "path3",
  },
];

const AutocompleteComponent = ({
  type,
}: {
  type: "both" | "list" | "none";
}) => {
  const [value, setValue] = React.useState("");

  return (
    <Field
      label={`Fruits (Autocomplete ${type})`}
      id={`auto-complete-test-${type}`}
    >
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
    </Field>
  );
};

const SelectComponent = () => {
  const [value, setValue] = React.useState("");

  return (
    <div>
      <label htmlFor="select">Fruits Select</label>
      <Select
        id="select"
        aria-label="Fruits"
        value={value}
        onChange={setValue}
        options={_options}
        onSelect={() => {}}
      />
    </div>
  );
};

const CheckboxComponent = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Field label={`Checkbox`} id={`one-checkbox`}>
      <Checkbox
        checked={checked}
        name="test"
        onChange={(event) => {
          console.log(event.target.checked);
          setChecked(event.target.checked);
        }}
      />
    </Field>
  );
};

const CheckboxesComponent = () => {
  const [value, setValue] = React.useState(() => ({
    apple: true,
    banana: false,
  }));

  return (
    <Checkboxes
      value={value}
      columns={[
        {
          dataIndex: "apple",
          ariaLabel: "a",
          title: "Apple",
        },
        {
          dataIndex: "banana",
          ariaLabel: "b",

          title: "Banana",
        },
      ]}
      onChange={setValue}
    />
  );
};

const RadioComponent = () => {
  const [pax, setPax] = React.useState("1");

  return (
    <>
      <label id="pax-label">PAX</label>
      <RadioGroup
        aria-labelledby="pax-label"
        tag="fieldset"
        name="pax"
        value={pax}
        onChange={(event) => {
          setPax(event.target.value);
        }}
      >
        <Radio value="0">0</Radio>
        <Radio value="1">1</Radio>
      </RadioGroup>
    </>
  );
};

const Component = ({ title, children, flex }: { title: string; children?: any; flex?: boolean }) => {
  return (
    <div className={cn(s.block, { [s.hide]: !children })}>
      <h2>{title}</h2>
      <div className={cn({[s.wrapper]: flex })}>
        {children ?? "in progress"}
      </div>
    </div>
  );
};

export const App = () => {

  // if (!false) {
  //   return (
  //     <div className={s.root}>
  //       <Example1 />
  //     </div>
  //   );
  // }


  return (
    <div className={s.root}>
      <h1>Components:</h1>
      <Component title="Color Tokens">
        <Colors />
      </Component>

      <Component title="Autocomplete">
        <AutocompleteComponent type="list" />
        <AutocompleteComponent type="both" />
        <AutocompleteComponent type="none" />
        <Info />
      </Component>

      <Component title="Breadcrumb">
        <Breadcrumb
          className={cn({ [s.container]: false })}
          items={breadcrumbItems}
          readonly={true}
        />
      </Component>

      <Component title="Button" flex>
        <Button>Ok</Button>
        <Button type="primary">Primary</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="default">Default</Button>
        <Button type="link">Link</Button>
        <Button type="text">Text button</Button>
      </Component>

      <Component title="Radio">
        <RadioComponent />
      </Component>

      <Component title="Select">
        <SelectComponent />
      </Component>

      <Component title="Checkbox">
        <CheckboxComponent />
        <CheckboxesComponent />
      </Component>

      <Component title="DatePicker">
        <DatePicker value="" />
      </Component>

      <Component title="Fieldset, Field">
        <Fieldset legend="Settings">
          <Field id="filed1" label="Visibled">
            <Checkbox
              checked
              name="filed1-checkbox"
              onChange={(event) => {
                console.log(event.target.checked);
              }}
            />
          </Field>
          <Field id="field-2-select" label="Fruits">
            {/* @ts-ignore */}
            <Select
              aria-label="Fruits"
              value={""}
              onChange={() => {}}
              options={_options}
              onSelect={() => {}}
            />
          </Field>
        </Fieldset>
        <Group>
          <Field id="group-select" label="Fruits 2">
            {/* @ts-ignore */}
            <Select
              aria-label="Fruits 2"
              value={""}
              onChange={() => {}}
              options={_options}
              onSelect={() => {}}
            />
          </Field>
        </Group>
      </Component>

      <Component title="Kbd">
        <Kbd>Shift + Tab</Kbd> <Kbd>Ctrl + Alt + Delete</Kbd>
        <VoiceOver />
      </Component>

      <Component title="Tabs">
        <Tabs
          className={s.root}
          defaultActiveKey="tab2"
          destroyInactiveTabPanel
          items={[
            {
              label: "Tab 1",
              key: "tab1",
              children: <p>content 1</p>,
            },
            {
              label: "Tab 2",
              key: "tab2",
              children: <p>content 2</p>,
            },
            {
              label: "Tab 3",
              key: "tab3",
              children: <p>content 3</p>,
            },
          ]}
        />
      </Component>

      <Component title="Tag">
        <Tag color="green">Green</Tag>
        <Tag color="default">Default</Tag>
        <Tag color="blue">Blue</Tag>
      </Component>

      <Component title="Table">
        <Table 
          columns={[{
            dataIndex: 'c1',
            title: 'Col 1'
          },
          {
            dataIndex: 'c2',
            title: 'Col 2',
            children: [
              {
                dataIndex: 'c3',
                title: 'Col 3',
              },
              {
                dataIndex: 'c4',
                title: 'Col 4',
              }
            ]
          },
          {
            dataIndex: 'c5',
            title: 'Col 5'
          }]}

          dataSource={[
            { c1: 'Boysenberry'},
            { c2: 'Huckleberry', c1: 'Guava'},
            { c4: 'Fig'},
            { c3: 'Eggplant'},
            { c5: 'Boysenberry', c2: 'Cranberry'},
            { c1: 'Grape'},
          ]}
        />
      </Component>

      <Component title="Alert" />
      <Component title="Avatar" />
      <Component title="Badge" />
      <Component title="Card" />
      <Component title="Cascader" />
      <Component title="Col" />
      <Component title="Collapse" />
      <Component title="ContentEditable" />
      <Component title="Descriptions" />
      <Component title="Divider" />
      <Component title="FileUploader" />
      <Component title="Form" />
      <Component title="FormInfoField" />
      <Component title="Image" />
      <Component title="Input" />
      <Component title="InputNumber" />
      <Component title="Layout" />
      <Component title="List" />
      <Component title="LongText" />
      <Component title="MaskedInput" />
      <Component title="Menu" />
      <Component title="Modal" />
      <Component title="Pagination" />
      <Component title="Popover" />
      <Component title="Row" />
      <Component title="Slider" />
      <Component title="Space" />
      <Component title="Spacing" />
      <Component title="Spin" />
      <Component title="StatusBar" />
      <Component title="Title" />
      <Component title="Toolbar" />
      <Component title="TreeSelect" />
      <Component title="Typography" />
      <Component title="Form">
        <Example1 />
      </Component>
    </div>
  );
};
