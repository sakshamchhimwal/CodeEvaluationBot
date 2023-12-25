import * as React from "react";
import Container from '@mui/material/Container';


export default function Loader() {
    return (
        <Container sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <span class="loader"></span>
        </Container>
    )
}