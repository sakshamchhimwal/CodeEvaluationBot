import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import { fetchAllUserProjects, fetchProjectDetails } from "../apis/user";

export default function ProfilePage(props) {
  const [userDetails, setUserDetails] = React.useState();
  const [completedProjs, setCompletedProjs] = React.useState(null);
  const [ongoingProjs, setOngoingProjs] = React.useState(null);
  React.useEffect(() => {
    try {
      const fetchUserDetails = async () => {
        let res = await fetchAllUserProjects();
        res = await res.json();
        console.log(res);
        setUserDetails(res);
      }
      let mounted = true;
      if (mounted) {
        fetchUserDetails();
      }
      return () => {
        mounted = false;
      }
    } catch (err) {
      console.log(err);
    }
  }, [])
  React.useEffect(() => {
    try {
      const projDets = async () => {
        let ongDets = await Promise.all(userDetails.Details.projects.map(async (ele) => {
          return await fetchProjectDetails(ele);
        }))
        setOngoingProjs(ongDets);
        let compDets = await Promise.all(userDetails.Details.completedProjects.map(async (ele) => {
          return await fetchProjectDetails(ele);
        }))
        setCompletedProjs(compDets);
        props.setLoading(false);
      }
      let mounted = true;
      if (mounted) {
        if (userDetails) {
          projDets();
        }
      }
      return () => {
        mounted = false;
      }
    } catch (err) {
      console.log(err);
    }
  }, [userDetails,props])
  return (
    <>
      <Paper
        sx={{
          padding: "10px",
          marginLeft: "10%",
          marginRight: "10%",
          marginTop: "3px",
          background: "#262626",
          boxShadow: "1.985px 1.985px 19.847px 0px rgba(0, 0, 0, 0.10)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
          }}
        >

          <Box
            sx={{
              display: "flex",
              gap: "10px",
              // border: "3px solid black",
              minHeight: "20vh",
              alignItems: "center",
              padding: "3px",
              marginBottom: "5%"
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: "30%",
                padding: "20px",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: "3rem",
                }}
              >
                {userDetails ? userDetails.Details.userGithubUserName[0].toUpperCase() : "-"}
              </Avatar>
              <Typography variant="poster">{userDetails ? userDetails.Details.userGithubUserName : "-"}</Typography>
            </Box>
            <Box
              sx={{
                borderRadius: "5px",
                background: "#353535",
                boxShadow: "1.985px 1.985px 19.854px 0px rgba(0, 0, 0, 0.10)",
                flex: "40%",
                padding: "20px",
              }}
            >
              <Typography variant="poster" gutterBottom={"10px"}>Skills & Technologies</Typography>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                marginBottom="10px"
              >
                <Chip
                  label="HTML5"
                  color="primary"
                  sx={{
                    color: "white",
                    backgroundColor: "#4D4D4D",
                    borderRadius: "5px",
                  }}
                />
                <Chip
                  label="CSS3"
                  color="primary"
                  sx={{
                    color: "white",
                    backgroundColor: "#4D4D4D",
                    borderRadius: "5px",
                  }}
                />
                <Chip
                  label="Javascript"
                  color="primary"
                  sx={{
                    color: "white",
                    backgroundColor: "#4D4D4D",
                    borderRadius: "5px",
                  }}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                marginBottom="10px"
              >
                <Chip
                  label="React"
                  color="primary"
                  sx={{
                    color: "white",
                    backgroundColor: "#4D4D4D",
                    borderRadius: "5px",
                  }}
                />
                <Chip
                  label="Figma/ Adobe XD"
                  color="primary"
                  sx={{
                    color: "white",
                    backgroundColor: "#4D4D4D",
                    borderRadius: "5px",
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  label="Responsive Design"
                  color="primary"
                  sx={{
                    color: "white",
                    backgroundColor: "#4D4D4D",
                    borderRadius: "5px",
                  }}
                />
                <Chip
                  label="Python"
                  color="primary"
                  sx={{
                    color: "white",
                    backgroundColor: "#4D4D4D",
                    borderRadius: "5px",
                  }}
                />
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "20px",
              }}
            >
              <Box
                width={"50%"}
                sx={{
                  minHeight: "80vh",
                  maxHeight: "80vh",
                  background: "#353535",
                  paddingTop: "10px"
                }}
              >
                <Typography
                  variant="poster"
                  textAlign="center"
                  gutterBottom="10px"
                >
                  Completed Projects
                  <hr marginLeft={"10px"} marginRight={"10px"} />
                  {(completedProjs?.length > 0) ? completedProjs.map((ele) => {
                    return <Typography variant="poster" component="h3" textAlign={"center"} gutterBottom>
                      {ele.name}
                    </Typography>
                  })
                    : <Typography variant="poster" component="h3" textAlign={"center"}>
                      No Project Completed Till Now
                    </Typography>}
                </Typography>
              </Box>
              <Box
                width={"50%"}
                sx={{
                  minHeight: "80vh",
                  maxHeight: "80vh",
                  background: "#353535",
                  paddingTop: "10px"

                }}
              >
                <Typography
                  variant="poster"
                  textAlign={"center"}
                  gutterBottom={"10px"}
                >
                  Ongoing Projects
                  <hr marginLeft={"10px"} marginRight={"10px"} />
                  {ongoingProjs?.length > 0 ? ongoingProjs.map((ele) => {
                    return <Typography variant="poster" component="h3" textAlign={"center"} gutterBottom>
                      {ele.name}
                    </Typography>
                  })
                    : <Typography variant="poster" component="h3" textAlign={"center"}>
                      No Ongoing Projects
                    </Typography>}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
