import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Example from "./piechart";
import VariantAvatars from "./avatar1";
import Button from "@mui/material/Button"
import { Link } from "react-router-dom";
import { FRONTEND_URL } from "../constants";

export default function ProjectDetails(props) {
  console.log(props);
  return (
    <>
      {props.projDets?.length <= 0 && <Typography variant="poster" component="h1" textAlign={"center"} gutterBottom> No Projects To Show</Typography >}
      {props.projDets?.length > 0 &&
        <Paper
          sx={{
            padding: "10px",
            marginLeft: "10%",
            marginRight: "10%",
            marginTop: "3px",
            marginBottom: "3px",
            background: "primary"
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "4px",
              height: "300px",
            }}
          >
            <Box
              sx={{
                width: "60%",
              }}
            >
              <Typography
                variant="poster"
                sx={{
                  // fontFamily: "Inter",
                  fontSize: "25px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  marginBottom: "10px",
                  marginTop: "20px",
                  marginLeft: "20px"
                }}
              >
                Upcoming Deadline
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  height: "70%",
                  alignItems: "center",

                }}
              >
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <VariantAvatars></VariantAvatars>
                </Box>
                <Box>
                  <Typography
                    variant="poster"
                    sx={{
                      // fontFamily: "Inter",
                      fontSize: "22px",
                      fontStyle: "normal",
                      fontWeight: "600",
                    }}
                  >
                    {props.projDets !== null ? props.projDets[0].name : "Loading..."}
                  </Typography>
                  <Typography variant="poster" sx={{
                    color: " #A1A1A1"
                  }}>
                    Team: Mem1,Mem2
                  </Typography>
                  <Typography
                    variant="poster"
                    sx={{
                      paddingTop: "10px",
                      fontWeight: '600'
                    }}
                  >
                    <span className="part1">Submission On:</span>
                    <span className="part2" style={{ color: "red" }}>
                      &nbsp;{props.projDets != null ? props.projDets[0].deadline : "Loading..."}

                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "40%",
              }}
            >
              {/* <Example projectID={props.projDets != null ? props.projDets[0]?.projectID : null} /> */}
            </Box>
          </Box>
          <Link style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textDecoration: "none"
          }} to={`${FRONTEND_URL}role/client/req`}><Button variant="filled" sx={{
            color: "white"
          }}>Requirements</Button></Link>
        </Paper>}
    </>
  );
}
