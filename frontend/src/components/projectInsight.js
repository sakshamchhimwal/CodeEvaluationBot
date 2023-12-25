import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { Link,useParams } from "react-router-dom";
import { FRONTEND_URL } from "../constants";

export default function ProjectInsights(props) {
    const { projID } = useParams();
    console.log(props);
    return (
        <Paper
            sx={{
                padding: "10px",
                marginLeft: "10%",
                marginRight: "10%",
                marginTop: "3px",
                background: "#262626",
                boxShadow: "1.985px 1.985px 19.847px 0px rgba(0, 0, 0, 0.10)",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    margin: "10px",
                    display: "flex",
                }}>
                <Box
                    sx={{
                        flex: "1",
                        display: "flex",
                        justifyContent: "center",
                        margin: "10px"
                    }}>
                    <Box sx={{
                        borderRadius: "100%",
                        height: "200px",
                        aspectRatio: "1/1",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#353535"
                    }}>
                        <Typography variant="poster">
                            Project Logo
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    backgroundColor: "#353535",
                    flex: "4",
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    maxHeight: "30vh",
                    overflowY: "scroll"
                }}>
                    <Box>
                        <Typography variant="poster" gutterBottom="10px" sx={{
                            fontSize: "30px"
                        }}>
                            {props ? props.projDets?.name : <Typography variant="poster" component="h3">Loading ...</Typography>}
                        </Typography>
                        <hr />
                        {props.projDets ?
                            props.projDets.docs.map((ele) => {
                                console.log(ele);
                                return (
                                    <>
                                        <Typography variant="poster" gutterBottom>
                                            Function Name : {ele.function_name} <br />
                                            Fucntion Desc : {ele.function_description} <br />
                                            Time Taken : {ele.time_taken} <br />
                                            Devloper Name : {ele.username}
                                            <hr />
                                        </Typography>
                                    </>
                                );
                            }) : <Typography variant="poster" component="h3">Loading ...</Typography>}
                    </Box>
                </Box>
            </Box>
            <Link to={`${FRONTEND_URL}role/client/suggest/${projID}`} style={{
                textDecoration: "none",
                display: "flex",
                width: "100%",
                justifyContent: "center"
            }}>
                <Button variant="contained" color="primary">
                    Code Report
                </Button>
            </Link>
        </Paper>
    );
}
