import TextField from './TextField.vue'

import { action } from '@storybook/addon-actions';

export default {
  component: TextField,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'TextField',
  //👇 Our events will be mapped in Storybook UI
  argTypes: {
  },
}

const Template = placeholder => ({
  components: { TextField },
  setup() {
    return { placeholder };
  },
  template: `
    <TextField
      :placeholder="placeholder"
    />
    `,
})

export const Default = Template.bind({})
Default.placeholder = 'kirby'