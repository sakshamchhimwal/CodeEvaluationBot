import * as React from "react";
import Container from "@mui/material/Container";
import { Compare } from "../../components/sourceCode";
import { useParams } from "react-router-dom"


export default function UserCodeSuggestions(props) {
    const { projID } = useParams();
    return (
        <Container
            maxWidth="xl"
            sx={{
                backgroundColor: "#1B1919",
                padding: "10px 0",
            }}
        >
            <Compare projectId={projID}  />
        </Container>
    );
}
