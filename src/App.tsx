import { useState, type ChangeEvent, type KeyboardEvent, } from 'react'
import './App.css'
import MyGrid from './components/MyGrid';
import MyInput from './components/MyInput';
import { parseIndicaotr } from './utils/indicatorHelper';

export interface DirectionIndicator {
  x: number,
  y: number,
  direction: string
}

function App() {
  const [input, setInput] = useState("");
  const [indicatorMaps, setIndicatMaps] = useState(Array.from({ length: 5 }, () => Array(5).fill(null)));

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(event.target.value)
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      const parsed = parseIndicaotr(input);

      if (!parsed) {
        alert("Invalid input. Format must be 'x,y DIRECTION' with direction NORTH/EAST/SOUTH/WEST.");
        return;
      }

      if (parsed.x < 0 || parsed.x > 4 || parsed.y < 0 || parsed.y > 4) {
        alert("Coordinates must be between 0,0 and 4,4");
        setInput("");
        return;
      }

      setIndicatMaps(prev => {
        const copy = prev.map(row => [...row]);
        copy[parsed.x][parsed.y] = parsed.direction;
        return copy;
      })
      setInput("");
    }
  }

  return (
    <>
      <MyInput input={input} onChange={handleChange} onKeyDown={handleKeyDown} />

      <div style={{ marginTop: "20px" }}>
        <MyGrid indicatorMaps={indicatorMaps} />
      </div >
    </>
  )
};

export default App;
