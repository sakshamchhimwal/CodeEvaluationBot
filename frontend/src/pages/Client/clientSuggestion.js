import * as React from "react";
import Container from "@mui/material/Container";
import {useParams} from "react-router-dom";
import { Compare } from "../../components/clientReviews";

export default function ClientSuggestions(props) {
    const { projID } = useParams();
    return (

        <Container
            maxWidth="xl"
            sx={{
                backgroundColor: "#1B1919",
                padding: "10px 0",
            }}
        >
            <Compare projectId={projID} />
        </Container>
    );
}
