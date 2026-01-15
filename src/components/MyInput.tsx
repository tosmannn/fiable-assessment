import { TextField } from "@mui/material";
import type { ChangeEvent, KeyboardEvent } from "react";

interface MyInputProps {
    input: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

const MyInput = ({ input, onChange, onKeyDown }: MyInputProps) => {
    return (
        <TextField
            id="outlined-basic"
            variant="outlined"
            value={input}
            onChange={onChange}
            onKeyDown={onKeyDown} 
            placeholder="e.g. 1,1 NORTH"
            />
            
    )
};

export default MyInput;