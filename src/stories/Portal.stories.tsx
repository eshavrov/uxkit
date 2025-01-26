import React from 'react';
import { Portal } from '@components/Portal';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Portal',
  component: Portal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Portal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: <>
      <h1>This content is rendered in a portal (another DOM tree)</h1>
      <p>
        This child is placed in the document body or container.
      </p>
    </>
  }
};
