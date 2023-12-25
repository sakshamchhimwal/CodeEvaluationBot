import * as React from "react";
import ProfilePage from "../../components/profilepage";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Loader from "../../components/loader";


export default function UserProfile(props) {
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
                <ProfilePage setLoading={setLoading} />
            </Box>
        </Container >
    );
}
