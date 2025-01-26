import type { Meta, StoryObj } from '@storybook/react';

import { Kbd } from '@components/Kbd';

const meta = {
  title: 'Example/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Shift + Tab'
  },
};
