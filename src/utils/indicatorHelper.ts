import type { DirectionIndicator } from "../App";

export const parseIndicaotr = (input: string): DirectionIndicator | null => {
    const [coordinate, direction] = input.trim().split(" ");

    if (!coordinate || !direction) return null;

    const [x, y] = coordinate.split(",").map(i => Number(i.trim()));

    if (isNaN(x) || isNaN(y)) return null;

    const validDirections = ["north", "east", "south", "west"];

    if (!validDirections.includes(direction.toLocaleLowerCase())) return null;

    const newIndicator = { x, y, direction };

    return newIndicator;
}
