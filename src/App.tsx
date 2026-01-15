import { useEffect, useState, type ChangeEvent, type KeyboardEvent, } from 'react'
import './App.css'
import MyGrid from './components/MyGrid';
import MyInput from './components/MyInput';

interface DirectionIndicator {
  x: number,
  y: number,
  direction: string
}


function App() {
  const [input, setInput] = useState("");
  const [userIndicators, setUserIndicators] = useState<DirectionIndicator[]>([]);

  const [indicatorMaps, setIndicatMaps] = useState(Array.from({ length: 5 }, () => Array(5).fill(null)));

  useEffect(() => {
    //delete this after
    console.log({ indicatorMaps })
  }, [userIndicators]);
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(event.target.value)
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      console.log("Current input:", input);
      indicatorHelper(input)
    }
  }

  const indicatorHelper = (input: string) => {
    const [coordinate, direction] = input.trim().split(" ")
    const [x, y] = coordinate.split(",").map(i => Number(i.trim()));

    const newIndicator = { x, y, direction };

    setUserIndicators(prev => (
      [...prev, newIndicator]
    ));
    setInput("");

    setIndicatMaps(prev => {
      const copy = prev.map(row => [...row]);
      copy[x][y] = direction;
      return copy;
    })
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
