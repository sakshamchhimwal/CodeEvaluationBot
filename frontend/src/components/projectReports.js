import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { FRONTEND_URL } from "../constants";

export default function ProjectReport(props) {
  const userProjs = props.userProjs;
  const projDets = props.projDets;
  const [currProj, setCurrProj] = React.useState(null);
  const [isRepOpen, setIsRepOpen] = React.useState(false);


  const buttonClickHandler = (projectID) => {
    setCurrProj(projDets.filter((ele) => {
      return ele.projectID === projectID
    }));
    setIsRepOpen(true);
  }

  return (
    <Paper
      sx={{
        padding: "10px",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "3px",
        marginBottom: "3px",
        background: '#353535'
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            width: "30%",
            marginLeft: "10px",
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
            Your Projects
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              marginLeft: "10px",
            }}
          >
            {projDets ?
              projDets.map((ele) => {
                return (
                  <Button
                    sx={{
                      display: "flex",
                      height: "100px",
                      background: "#272727",
                      borderRadius: "10px",
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
              : <Typography variant="poster" textAlign={"center"}>No Projects Found</Typography>}
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
          {isRepOpen ? <>
            <Box
              sx={{
                height: "70%",
                fontSize: "14px",
                background: "#272727",
                borderRadius: "10px",
                overflowY: "auto",
              }}
            >
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
                Exhaustive Project Report: {currProj[0].name} <hr style={{ margin: "5px" }} />
              </Typography>
              <Box
                sx={{
                  marginLeft: "10px",
                }}
              >
                {currProj[0].docs.map((ele) => {
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
            <Box sx={{ height: "30%", width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: "30px",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Link style={{
                  width: "45%",
                  height: "inherit",
                  textDecoration: "none"
                }} to={`${FRONTEND_URL}role/talent/code/${currProj[0].projectID}`}>
                  <Button
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      fontSize: "14px",
                      background: "#272727",
                      display: "flex",
                      padding: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="poster"
                      sx={{
                        fontSize: "14px",
                        fontWeight: '600',
                        textDecoration: "none"
                      }}
                    >
                      AI Suggestions
                    </Typography>
                  </Button>
                </Link>
                <Link style={{
                  width: "45%",
                  height: "inherit",
                  textDecoration: "none"
                }} to={`${FRONTEND_URL}role/talent/code/${currProj[0].projectID}`}>
                  <Button
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      fontSize: "14px",
                      background: "#272727",
                      display: "flex",
                      padding: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="poster"
                      sx={{
                        fontSize: "14px",
                        fontWeight: '600'
                      }}
                    >
                      Client Reviews
                    </Typography>
                  </Button>
                </Link>
              </Box>
            </Box></> : <Typography variant="poster" textAlign={"center"}>Select a project to view</Typography>}
        </Box>
      </Box>
    </Paper>
  );
}
