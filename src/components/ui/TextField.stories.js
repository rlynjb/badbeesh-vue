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

const Template = args => ({
  components: { TextField },
  setup() {
    return { args };
  },
  template: `
    <TextField
      :placeholder="args.placeholder"
    />
    `,
})

export const Default = Template.bind({
  args: {
    placeholder: 'kirby',
  }
})