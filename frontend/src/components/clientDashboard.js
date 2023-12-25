import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { fetchProjectProgress, fetchListAllClientRepo } from "../apis/client";
import { fetchProjectDetails } from "../apis/client";
import { FRONTEND_URL } from "../constants";


function calculateFontColor(score) {
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  const hue = ((100 - normalizedScore) / 100) * 120;
  const rgbColor = hslToRgb(hue, 100, 50);
  const hexColor = rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);
  return hexColor;
}
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Function to convert RGB to hex
function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export default function ClientDashboard() {
  const [currProj, setCurrProj] = React.useState(null);
  const [clientProjs, setClientProjs] = React.useState(null);
  const [isInsightOpen, setIsInsightOpen] = React.useState(false);
  const [currProjInsights, setCurrProjInsights] = React.useState(null);
  const [isReport, setIsReport] = React.useState(false);

  React.useEffect(() => {
    const getClientProjects = async () => {
      const res = await fetchListAllClientRepo();
      const projDets = await Promise.all(res.Projects.map(async (ele) => {
        return await fetchProjectDetails(ele.projectID);
      }));
      console.log(projDets);
      setClientProjs(projDets);
    }
    let mounted = true;
    if (mounted) {
      getClientProjects();
    }
    return () => {
      mounted = false;
    }
  }, [])


  const buttonClickHandler = (projectID) => {
    setCurrProj(projectID);
    setIsInsightOpen(true);
  }

  React.useEffect(() => {
    const getInsight = async () => {
      const res = await fetchProjectProgress(currProj);
      setCurrProjInsights(res);
    }
    let mounted = true;
    if (mounted) {
      if (currProj) {
        getInsight();
      }
    }
    return () => {
      mounted = false;
    }
  }, [currProj])

  return (
    <Paper
      sx={{
        padding: "10px",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "3px",
        marginBottom: "3px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          background: "#353535",
          padding: "10px",
          minHeight: "50vh"
        }}
      >
        <Box
          sx={{
            width: "30%",
            marginLeft: "20px",
            marginTop: "10px",
          }}
        >
          <Typography
            variant="poster"
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Project Posted
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              marginLeft: "10px",
            }}
          >
            {clientProjs?.length>0
              ? clientProjs.map((ele) => {
                return (
                  <Button
                    sx={{
                      display: "flex",
                      height: "100px",
                      borderRadius: "10px",
                      background: "#272727",
                      padding: "10px",
                    }}
                    key={ele.projectID}
                    onClick={() => buttonClickHandler(ele.projectID)}

                  >
                    <Typography
                      variant="poster"
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      {ele.name}
                    </Typography>
                  </Button>
                )
              })
              : <Typography variant="poster" component="h1"><hr/>No Projects To List</Typography>}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            margin: "20px",
            height: "inherit",
            width: "70%",
          }}
        >
          {isInsightOpen ?
            <Box
              sx={{
                height: "100%",
                fontSize: "14px",
                background: "#272727",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box padding={"10px"}>
                <Typography
                  variant="poster"
                  sx={{
                    fontSize: "16px",
                    background: "#272727",
                    textAlign: "center",
                    fontWeight: "600",
                    marginTop: "10px",
                  }}
                >
                  Progress Insights
                </Typography>
                <hr />
                {currProjInsights ?
                  <Box display={isReport === true ? "none" : "block"}>
                    <Typography variant="poster" component="h3" gutterBottom style={{ color: calculateFontColor(parseFloat(currProjInsights?.EstimatedCompletion?.slice(0, currProjInsights.EstimatedCompletion.length - 1))) }}>
                      Estimated Completion: {currProjInsights.EstimatedCompletion}
                    </Typography>
                    <Typography variant="poster" component="h3" gutterBottom style={{ color: calculateFontColor(parseFloat(currProjInsights?.OverallAlignment?.slice(0, currProjInsights.EstimatedCompletion.length - 1))) }}>
                      Overall Alignment: {currProjInsights.OverallAlignment}
                    </Typography>
                    <Typography variant="poster" component="h3" gutterBottom>
                      ETA To Completion: {currProjInsights.ETA_toCompletion}
                    </Typography>
                  </Box>
                  : <>
                    <Box display={isReport === true ? "none" : "block"}>
                      <Typography variant="poster" component="h3" gutterBottom >
                        Estimated Completion: Loading...
                      </Typography>
                      <Typography variant="poster" component="h3" gutterBottom >
                        Overall Alignment: Loading...
                      </Typography>
                      <Typography variant="poster" component="h3" gutterBottom>
                        ETA To Completion: Loading...
                      </Typography>
                    </Box>
                  </>}
                <Box display={isReport === true ? "block" : "none"}>
                  {clientProjs.filter((ele) => ele.projectID === currProj)[0].docs.map((ele) => {
                    console.log(ele);
                    return (
                      <>
                        <Typography variant="poster" gutterBottom>
                          Function Name : {ele.function_name} <br />
                          Fucntion Desc : {ele.function_description} <br />
                          Time Taken : {ele.time_taken} <br />
                          Devloper Name : {ele.username}
                          <hr />
                        </Typography>
                      </>
                    );
                  })}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px", // Adjust as needed for spacing
                }}
              >
                <Link to={`${FRONTEND_URL}role/client/project/${currProj !== null ? currProj : ""}`}
                  style={{
                    textDecoration: "none"
                  }}
                >
                  <Button variant="contained" sx={{ marginLeft: "10px" }}>
                    Insights
                  </Button>
                </Link>
                <Button variant="contained" sx={{ marginLeft: "10px" }} onClick={() => { console.log(!isReport); setIsReport(!isReport); }}>
                  {!isReport ? "Exhaustive Report" : "Close"}
                </Button>
              </Box>
            </Box> : <Typography variant="poster" component="h1">Select Project To Get Insights</Typography>}
        </Box>
      </Box>
    </Paper>
  );
}
