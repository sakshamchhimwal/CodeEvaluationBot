import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { fetchAllUserProjects, fetchProjectDetails } from "../apis/user";

function CenterPaper(props) {

  return (
    <Button
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "45%",
        alignItems: "center",
        borderRadius: "5px",
        background: "#272727",
      }}
      onClick={() => { props.setProjectId(props.projectId); props.setIsOpen(true);}}
    >
      <Typography variant="poster">
        {props.projectName}
      </Typography>
    </Button>
  );
}

export default function ProjectList(props) {

  const [userProj, setUserProj] = React.useState();

  React.useEffect(() => {
    const fetchAllProjects = async () => {
      const res = (await (await fetchAllUserProjects()).json()).Details.projects;
      const projDetails = await Promise.all(
        res.map(async (ele) => {
          return await fetchProjectDetails(ele);
        })
      );
      setUserProj(projDetails);
      props.setLoading(false);
    }
    let mounted = true;
    if (mounted) {
      fetchAllProjects();
    }
    return (() => {
      mounted = false;
    })
  }, [])

  return (
    <Paper
      sx={{
        padding: "5%",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "3px",
        marginBottom: "3px",
        minHeight: "48vh",
        height: "48vh",
        background: "#262626",
        boxShadow: "1.986px 1.986px 19.859px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          height: "100%",
          borderRadius: "5px",
          background: " #353535",
          boxShadow: "1.987px 1.987px 19.866px 0px rgba(0, 0, 0, 0.10)",
          padding: "10px"
        }}
      >
        <Typography
          align="center"
          variant="poster"
          sx={{
            fontSize: "18px",
            fontWeight: "600",
            height: "20px",
            padding: "10px",
          }}
        >
          List Of Projects
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            height: "20%",
            columnGap: "3%",
            rowGap: "3%",
            width: "100%",
            justifyContent: "center"
          }}
        >
          {
            userProj ?
              userProj.map((ele) => {
                return (
                  <CenterPaper
                    projectName={ele.name}
                    projectId={ele.projectID}
                    setProjectId={props.setProjectId}
                    setIsOpen={props.setIsOpen}
                    setProjDocs={props.setProjDocs}
                  />
                )
              })
              : <></>
          }
        </Box>
      </Box>
    </Paper>
  );
}
