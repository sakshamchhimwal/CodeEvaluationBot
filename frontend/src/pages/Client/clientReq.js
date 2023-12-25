import * as React from "react";
import Container from "@mui/material/Container";
import ClientProjectList from "../../components/clientProjList";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { fetchClientDocs, postClientDocs } from "../../apis/client";
import Loader from "../../components/loader";


export default function ClientRequirements(props) {
    const [projectId, setProjectId] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(null);
    const [projReq, setProjReq] = React.useState(null);
    // const [loading, setLoading] = React.useState(true);
    const [isUpdate, setIsUpdate] = React.useState(true);


    React.useEffect(() => {
        const getDoc = async (projectId) => {
            const data = await fetchClientDocs(projectId);
            setProjReq(data.ClientRequirements);
        }
        let mounted = true;
        if (mounted) {
            if (projectId) {
                getDoc(projectId);
            }
        }
        return () => {
            mounted = false;
        }
    }, [projectId, isUpdate])

    const handleSubmitReview = async () => {
        await postClientDocs(projectId, projReq);
        setIsUpdate(!isUpdate);
    }

    return (
        <Container
            maxWidth="xl"
            sx={{
                backgroundColor: "#1B1919",
                padding: "10px 0",
                minHeight: "99vh"
            }}
        >
            {/* <Box sx={{
                display: loading ? "block" : "none"
            }}>
                <Loader />
            </Box> */}
            <ClientProjectList setProjectId={setProjectId} setIsOpen={setIsOpen} setProjReqs={setProjReq} />
            {isOpen ?
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "20px",
                    }}
                >
                    <TextField
                        variant="outlined"
                        multiline
                        rows={8}
                        value={projReq}
                        style={{ marginTop: "10px", width: "80%" }}
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
                        onChange={(e) => { setProjReq(e.target.value) }}
                    />
                    <Button
                        variant="contained"
                        style={{ marginTop: "10px" }}
                        onClick={() => { handleSubmitReview(); }}
                    >
                        Update Requirement
                    </Button>
                </Box> : <Typography variant="poster" component="h1" textAlign={"center"}>Select Project</Typography>}
        </Container>
    );
}
