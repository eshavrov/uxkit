import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Select } from '@components/Select';

const options: any[] = [
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

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Select',
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onChange: fn(), onSelect: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    id: 'select',
    value: '',
    options,
  },
};



