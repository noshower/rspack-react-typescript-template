import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { Home } from './home';

const meta = {
  title: 'Pages/Home',
  component: Home,
  parameters: {
    layout: 'centered',
    msw: [
      rest.get('/api/user', (req, res, ctx) => {
        return res(
          ctx.json({
            id: '123',
            name: 'John Doe',
          }),
        );
      }),
    ],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: function Render() {
    return <Home />;
  },
};
