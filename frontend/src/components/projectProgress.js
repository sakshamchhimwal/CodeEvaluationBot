import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




export default function ProjectProgress(props) {
    console.log(props);
    const [est, setEst] = React.useState(0);
    const [actu, setActu] = React.useState(0);
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        let mounted = true;
        if (mounted) {
            if (props.projComp) {
                setActu(parseFloat(props?.projComp.slice(0, props?.projComp.length - 1)));
            }
            if (props.projDeadline) {
                setEst((Date.now() / Date.parse(props?.projDeadline)) * 100);
            }
        }
        return () => {
            mounted = false;
        }
    }, [props])

    React.useEffect(() => {
        console.log(actu, est);
        setData([
            { name: "Estimated", value: est },
            { name: "Actual", value: actu }
        ])
    }, [actu, est])
    return (
        <Box sx={{
            width: "80%",
            padding: "10px",
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            margin: "auto"
        }}>
            <Box sx={{
                flex: "1",
                backgroundColor: "#353535",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: '10px',
                padding: '1.5%'
            }}>
                <Typography variant="poster">Project Estimates</Typography>
                <ResponsiveContainer width="60%" height={200}>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
            <Box sx={{
                flex: "1",
                backgroundColor: "#353535",
                padding: "3%",
                borderRadius: '10px'

            }}>
                <Typography variant="poster" p={"10px"} textAlign={"center"}>AI Code Review</Typography>
                <hr />
                {props.projReview ?
                    <>
                        <Typography variant="poster">Estimated Completion: {props.projReview.EstimatedCompletion}</Typography>
                        <Typography variant="poster">Deadline: {props.projDeadline}</Typography>
                        <Typography variant="poster">Project Alignment: {props.projReview.OverallAlignment}</Typography>
                        <Typography variant="poster">Time Left to completion: {props.projReview.ETA_toCompletion}</Typography>
                    </> :
                    <Typography variant="poster" component="h5">Loading...</Typography>}
            </Box>
        </Box>
    );
}
