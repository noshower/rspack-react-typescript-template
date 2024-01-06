import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Checkbox } from './checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    checked: false,
    label: 'Try Me!',
  },
  render: function Render(args) {
    const [{ isChecked }, updateArgs] = useArgs();

    const onChange = (res: boolean) => {
      updateArgs({ isChecked: res });
    };

    return <Checkbox {...args} onChange={onChange} checked={isChecked} />;
  },
};
