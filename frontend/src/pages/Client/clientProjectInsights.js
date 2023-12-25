import * as React from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Loader from "../../components/loader";
import ProjectInsights from "../../components/projectInsight";
import ProjectRepositories from "../../components/projectrepositories";
import ProjectProgress from "../../components/projectProgress";
import { fetchProjectDetails, fetchProjectProgress } from "../../apis/client";

export default function ClientProjectInsights(props) {
    const { projID } = useParams();
    const [projDets, setProjDets] = React.useState();
    const [completionDets, setCompletionDets] = React.useState();
    const [loading, setLoading] = React.useState(true);


    React.useEffect(() => {
        const res = async () => {
            const dets = await fetchProjectDetails(projID);
            const compnDets = await fetchProjectProgress(projID);
            // console.log(dets);
            setProjDets(dets);
            setCompletionDets(compnDets);
            setLoading(false);
        }
        let mounted = true;
        if (mounted) {
            res();
        }
        return () => {
            mounted = false;
        }
    }, [projID]);




    return (
        <Container
            maxWidth="xl"
            sx={{
                backgroundColor: "#1B1919",
                padding: "10px 0",
                minHeight: "99vh"
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
                <ProjectInsights projDets={projDets} />
                <ProjectProgress projDeadline={projDets?.deadline} projComp={completionDets?.EstimatedCompletion} projReview={completionDets} />
            </Box>
        </Container>
    );
}
