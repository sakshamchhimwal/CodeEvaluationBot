import * as React from "react";
import ProjectDetails from "../../components/clientProjDets";
import Container from "@mui/material/Container";
import ClientDashboard from "../../components/clientDashboard";
import { fetchListAllClientRepo, fetchProjectDetails } from "../../apis/client";
import Box from "@mui/material/Box";
import Loader from "../../components/loader";


function compareDates(dateString1, dateString2) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    if (date1 > date2) {
        return -1;
    } else if (date1 < date2) {
        return 1;
    } else {
        return 0;
    }
}



export default function ClientProfile() {
    localStorage.setItem('token', document.cookie.split("=")[1]);
    const [allClientProjs, setAllClientProjs] = React.useState();
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const res = async () => {
            let projs = await fetchListAllClientRepo();
            projs = await Promise.all(projs.Projects.map(async (ele) => {
                return await fetchProjectDetails(ele.projectID);
            }));
            projs = projs.sort((a, b) => compareDates(a.deadline, b.deadline));
            setAllClientProjs(projs);
            setLoading(false);
        }
        let mounted = true;
        if (mounted) {
            res();
        }
        return () => {
            mounted = false;
        }
    }, [])


    return (
        <Container
            maxWidth="xl"
            sx={{
                backgroundColor: "#1B1919",
                padding: "10px 0",
                minHeight:"99vh",
            }}
        >
            <Box sx={{
                display: loading ? "block" : "none"
            }}>
                <Loader />
            </Box>
            <Box sx={{
                display: !loading ? "block" : "none"
            }}>
            <ProjectDetails projDets={allClientProjs} />
                <ClientDashboard />
            </Box>
        </Container>
    );
}
