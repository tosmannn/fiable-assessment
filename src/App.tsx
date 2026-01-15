import { useEffect, useState, type ChangeEvent, type JSX, type KeyboardEvent, } from 'react'
import './App.css'
import { Paper, styled, TextField } from '@mui/material'
import Grid from "@mui/material/Grid";
import { ArrowForward, ArrowBack, ArrowUpward, ArrowDownward } from "@mui/icons-material"

interface DirectionIndicator {
  x: number,
  y: number,
  direction: string
}


function App() {
  const [input, setInput] = useState("");
  const [indicator, setIndicator] = useState<DirectionIndicator | undefined>(undefined);
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
    const [coordinate, direction] = input.split(" ")
    const [x, y] = coordinate.split(",").map(i => Number(i.trim()));

    const newIndicator = { x, y, direction };

    setIndicator(newIndicator);
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
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown} />

      <br />
      <br />
      <MyGrid indicatorMaps={indicatorMaps} />
    </>
  )
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  aspectRatio: "1/1",
  padding: theme.spacing(2),
  textAlign: 'center',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const directionIcons: Record<string, JSX.Element> = {
  north: <ArrowUpward />,
  south: <ArrowDownward />,
  east: <ArrowForward />,
  west: <ArrowBack />
}

function MyGrid({ indicatorMaps }: { indicatorMaps: (string | null)[][] }) {
  const size = 5;
  return (<>
    <div>
      <Grid container spacing={2} columns={size} sx={{ width: "50%", margin: "0 auto" }}>
        {indicatorMaps
          .slice()
          .reverse()
          .flat().map((cell, index) => (
            <Grid key={index} size={{ xs: 1, sm: 1, md: 1 }}>
              <Item>{cell ? directionIcons[cell.toLocaleLowerCase()] : ""}</Item>
            </Grid>
          ))}
      </Grid>
    </div>
  </>)
}

export default App
