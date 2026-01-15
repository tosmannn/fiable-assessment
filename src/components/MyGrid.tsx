import { Grid, Paper, styled } from '@mui/material'
import { ArrowBack, ArrowDownward, ArrowForward, ArrowUpward } from "@mui/icons-material";
import type { JSX } from "react";


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
const MyGrid = ({ indicatorMaps }: { indicatorMaps: (string | null)[][] }) => {
    const size = 5;

    return (
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
    )
};

export default MyGrid;