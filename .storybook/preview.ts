import type { Preview } from "@storybook/react";

import '../static/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        // 👇 Default values
        { name: 'Dark', value: '#333' },
        { name: 'Light', value: '#eee' },
        // 👇 Add your own
        { name: 'Maroon', value: 'MediumTurquoise' },
      ],
      // 👇 Specify which background is shown by default
      default: 'Light',
    },
  },
};

export default preview;
