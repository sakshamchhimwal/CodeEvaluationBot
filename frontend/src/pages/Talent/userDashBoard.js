import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ProjectDetails from "../../components/projectDetails";
import Container from "@mui/material/Container";
import ProjectReport from "../../components/projectReports";
import { fetchAllUserProjects, fetchProjectDetails } from "../../apis/user";
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

export default function UserDashboard(props) {
    localStorage.setItem('token', document.cookie.split("=")[1]);
    const [userProjs, setUserProjs] = useState(null);
    const [projDets, setProjDets] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchAllUserProjects();
                const userData = await res.json();
                setUserProjs(userData.Details.projects);
            } catch (error) {
                console.error("Error fetching user projects:", error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (userProjs) {
            const fetchProjectDetailsData = async () => {
                try {
                    let projDetails = await Promise.all(
                        userProjs.map(async (ele) => {
                            return await fetchProjectDetails(ele);
                        })
                    );
                    projDetails = projDetails.sort((a, b) => compareDates(a.deadline, b.deadline))
                    setProjDets(projDetails);
                } catch (error) {
                    console.error("Error fetching project details:", error);
                }
            };
            fetchProjectDetailsData();
            setLoading(false);
        }
    }, [userProjs]);
    return (
        <Container
            maxWidth="xl"
            sx={{
                backgroundColor: "#1B1919",
                padding: "10px 0",
                minHeight: "100vh",
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
                <ProjectDetails userProjs={userProjs} projDets={projDets} />
                <ProjectReport userProjs={userProjs} projDets={projDets} />
            </Box>
        </Container>
    );
}
