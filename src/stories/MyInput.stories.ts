import type { Meta, StoryObj } from "@storybook/react";
import MyInput from "../components/MyInput";
import { parseIndicaotr } from "../utils/indicatorHelper";

const meta = {
    title: 'Stories/MyInput',
    component: MyInput,
} satisfies Meta<typeof MyInput>

export default meta;

type Story = StoryObj<typeof meta>;

export const InvalidFormat: Story = {
    args: {
        input: "test 123",
        onChange: () => { },
        onKeyDown: function (event) {
            if (event.key === "Enter") {
                const parsed = parseIndicaotr("test 123");
                if (!parsed) {
                    alert("Invalid input. Format must be 'x,y DIRECTION' with direction NORTH/EAST/SOUTH/WEST.");
                    return;
                }

            }
        }
    },
};

export const OutOfBounds: Story = {
    args: {
        input: "5,5 SOUTH",
        onChange: () => { },
        onKeyDown: function (event) {
            if (event.key === "Enter") {
                const parsed = parseIndicaotr("5,5 SOUTH");

                if (!parsed) {
                    alert("Invalid input. Format must be 'x,y DIRECTION' with direction NORTH/EAST/SOUTH/WEST.");
                    return;
                }

                if (parsed.x < 0 || parsed.x > 4 || parsed.y < 0 || parsed.y > 4) {
                    alert("Coordinates must be between 0,0 and 4,4");
                    return;
                }
            }
        }
    },
};