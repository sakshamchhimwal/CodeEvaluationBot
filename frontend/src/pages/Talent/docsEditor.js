import * as React from "react";
import Box from "@mui/material/Box";
import ProjectList from "../../components/projectList";
import Container from "@mui/material/Container";
import ProjectDocs from "../../components/projectDocs";
import Loader from "../../components/loader";

export default function UserDocsEditor(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [projectId, setProjectId] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    return (
        <Container
            maxWidth="xl"
            sx={{
                backgroundColor: "#1B1919",
                padding: "10px 0",
            }}
        >
            <Box sx={{
                display: loading ? "block" : "none"
            }}>
                <Loader />
            </Box>
            <Box sx={{
                display: loading ? "none" : "block"
            }}>
                <ProjectList
                    setIsOpen={setIsOpen}
                    setProjectId={setProjectId}
                    setLoading={setLoading}
                />
                <ProjectDocs isOpen={isOpen} projectId={projectId} />
            </Box>
        </Container>
    );
}
