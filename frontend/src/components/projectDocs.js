import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { fetchProjectDocumentation } from "../apis/user";
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import { v4 } from "uuid";
import axios from "axios";
import { SERVER_URL } from "../constants";
import Loader from "./loader";
const token = localStorage.getItem('token');

function HorizontalForm(props) {
    const [formData, setFormData] = React.useState({
        id: v4(),
        function_name: "",
        function_description: "",
        bugs: "",
        time_taken: "",
        username: "",
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${SERVER_URL}user/dev/docs`, { doc: formData }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { projectId: props.projectId }
            })
            console.log("Form submitted with data:", formData);
        } catch (err) {
            console.log("Form Submission failed");
            console.error(err);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <hr />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="poster">
                    Add Docs
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Function Name"
                        name="function_name"
                        value={formData.function_name}
                        onChange={handleChange}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                                borderColor: "white",
                            },
                        }}
                        FormHelperTextProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused": {
                                    "& fieldset": {
                                        borderColor: "white",
                                    },
                                },
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Function Description"
                        name="function_description"
                        value={formData.function_description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                                borderColor: "white",
                            },
                        }}
                        FormHelperTextProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused": {
                                    "& fieldset": {
                                        borderColor: "white",
                                    },
                                },
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Bugs"
                        name="bugs"
                        value={formData.bugs}
                        onChange={handleChange}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                                borderColor: "white",
                            },
                        }}
                        FormHelperTextProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused": {
                                    "& fieldset": {
                                        borderColor: "white",
                                    },
                                },
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Time Taken"
                        name="time_taken"
                        value={formData.time_taken}
                        onChange={handleChange}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                                borderColor: "white",
                            },
                        }}
                        FormHelperTextProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused": {
                                    "& fieldset": {
                                        borderColor: "white",
                                    },
                                },
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                                borderColor: "white",
                            },
                        }}
                        FormHelperTextProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused": {
                                    "& fieldset": {
                                        borderColor: "white",
                                    },
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

function ExistingDocs(props) {
    console.log(props)
    return (
        <Box
            sx={{
                display: "flex",
                gap: "10px",
                width: "100%"
            }}
        >
            <TextField
                id={`fname:${props.doc.id}`}
                label="Function Name"
                value={props.doc.function_name}
                InputProps={{
                    style: {
                        color: "white",
                    },
                }}
                InputLabelProps={{
                    style: {
                        color: "white",
                        borderColor: "white",
                    },
                }}
                FormHelperTextProps={{
                    style: {
                        color: "white",
                    },
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused": {
                            "& fieldset": {
                                borderColor: "white",
                            },
                        },
                    },
                    width: "30%",
                }}
            />
            <TextField
                id={`fdesc:${props.doc.id}`}
                label="Function Description"
                value={props.doc.function_description}
                InputProps={{
                    style: {
                        color: "white",
                    },
                }}
                InputLabelProps={{
                    style: {
                        color: "white",
                        borderColor: "white",
                    },
                }}
                FormHelperTextProps={{
                    style: {
                        color: "white",
                    },
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused": {
                            "& fieldset": {
                                borderColor: "white",
                            },
                        },
                    },
                    width: "80%",
                }}
                multiline
                rows={4}
            />
            <TextField
                id={`bugs:${props.doc.id}`}
                label="Bugs"
                value={props.doc.bugs}
                InputProps={{
                    style: {
                        color: "white",
                    },
                }}
                InputLabelProps={{
                    style: {
                        color: "white",
                        borderColor: "white",
                    },
                }}
                FormHelperTextProps={{
                    style: {
                        color: "white",
                    },
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused": {
                            "& fieldset": {
                                borderColor: "white",
                            },
                        },
                    },
                }}
            />
            <TextField
                id={`dev:${props.doc.id}`}
                label="Devlopers"
                value={props.doc.username}
                InputProps={{
                    style: {
                        color: "white",
                    },
                }}
                InputLabelProps={{
                    style: {
                        color: "white",
                        borderColor: "white",
                    },
                }}
                FormHelperTextProps={{
                    style: {
                        color: "white",
                    },
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused": {
                            "& fieldset": {
                                borderColor: "white",
                            },
                        },
                    },
                }}
            />
        </Box>
    );
}

export default function ProjectDocs(props) {
    const isOpen = props.isOpen;
    const projectId = props.projectId;
    const [projDocs, setProjDocs] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchProjDocs = async (projectId) => {
            if (projectId) {
                setLoading(true);
                const res = await fetchProjectDocumentation(projectId);
                console.log(res.Docs);
                setProjDocs(res.Docs);
                setLoading(false);
            }
        }
        let mounted = true;
        if (mounted) {
            fetchProjDocs(projectId);
        }
        return () => {
            mounted = false;
        }
    }, [projectId])
    return (

        <Paper
            sx={{
                padding: "2% 10px",
                marginLeft: "10%",
                marginRight: "10%",
                marginTop: "3px",
                marginBottom: "3px",
                minHeight: "38vh",
                backgroundColor: "#353535",
            }}
        >
            {isOpen ?
                <>
                    <Box sx={{
                        display: loading ? "block" : "none"
                    }}>
                        <Loader />
                    </Box>
                    <Box
                        sx={{
                            display: !loading ? "flex" : "none",
                            gap: "30px",
                            justifyContent: "center",
                            height: "100%",
                            flexDirection: "column",
                        }}
                    >
                        <Box sx={{
                            display: loading ? "block" : "none"
                        }}>
                            <Loader />
                        </Box>
                        <Typography
                            variant="poster"
                            align="center"
                            sx={{
                                fontSize: "18px",
                                fontWeight: "600",
                            }}
                        >
                            Selected Project - Documentation / Report
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                margin: "auto",
                                width: "98%",
                                height: "100%",
                                backgroundColor: "#272727",
                                padding: "30px 10px",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {
                                projDocs ?
                                    projDocs.map((ele) => {
                                        return <ExistingDocs doc={ele} key={ele.id} />
                                    })
                                    : <></>
                            }
                            <HorizontalForm projectId={projectId} />
                        </Box>
                    </Box></> : <><Typography
                        variant="poster"
                        fontSize={32}
                        textAlign={"center"}>
                        Select a project
                    </Typography></>
            }
        </Paper >
    );
}
