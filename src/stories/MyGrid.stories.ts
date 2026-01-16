import type { Meta, StoryObj } from '@storybook/react-vite'
import MyGrid from '../components/MyGrid';


const meta = {
    title: 'Stories/MyGrid',
    component: MyGrid,
} satisfies Meta<typeof MyGrid>

export default meta;

type Story = StoryObj<typeof meta>;

const test = (x: number, y: number, direction: string) => {
   const grid = Array.from({ length: 5 }, () => Array(5).fill(null));
   grid[x][y] = direction;
   return grid;
}

export const South: Story = {
  args: {
    indicatorMaps: test(0,0, "SOUTH"),
  },
};

export const North: Story = {
  args: {
    indicatorMaps: test(4,2,"north"),
  },
};

export const East: Story = {
  args: {
    indicatorMaps: test(2,4, "east"),
  },
};

export const West: Story = {
  args: {
    indicatorMaps: test(2,0, "west"),
  },
};