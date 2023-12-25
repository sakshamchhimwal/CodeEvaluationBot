import React, { useEffect, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import { fetchFilesFromRepo, fetchGitHubFile, fetchCompleteScore } from "../apis/client";
import axios from "axios";
import { SERVER_URL } from "../constants";

export function SourceCodeViewer(props) {
  const code = props.code;
  return (
    <CodeEditor
      value={code}
      language="js"
      placeholder="Please enter JS code."
      disabled
      padding={15}
      style={{
        // backgroundColor: "#f5f5f5",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  );
}

export function MarkdownViewer(props) {
  return <MarkdownPreview source={props.review} style={{ paddingLeft: "30px", paddingTop: "10px", paddingBottom: "10px" }} />;
}
const DropdownSelector = (props) => {
  const [selectedValue, setSelectedValue] = React.useState();
  const [allFiles, setAllFiles] = React.useState();
  const projectID = props.projectId;
  // console.log(projectID);
  useEffect(() => {
    const fetchFiles = async () => {
      const files = await fetchFilesFromRepo(projectID);
      setAllFiles(files);
    }
    let mounted = true;
    if (mounted === true) {
      fetchFiles();
    }
    return () => {
      mounted = false;
    }
  }, [projectID])

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await fetchCompleteScore(projectID);
        let formattedStr = "";
        res.forEach((ele) => {
          formattedStr += `
# Function Name: ${ele.functionName} 
## Overall Score: ${ele.score.OverallScore}/10  
## Bugs : ${ele.score.BugsScore}/10 
${ele.score.Bugs.replaceAll("\n", "<br>")}  
## Readablity Score: ${ele.score.ReadblityScore}/10
${ele.score.ReadblityIssues.replaceAll("\n", "<br>")}
                `
        })
        props.setReview(formattedStr);
      }
      catch (err) {
        console.log(err);
      }
    }
    let mounted = true;
    if (mounted === true) {
      fetchResponse();
    }
    return () => {
      mounted = false;
    }
  }, [])

  const handleChange = async (event) => {
    setSelectedValue(event.target.value);
    const code = await fetchGitHubFile(projectID, event.target.value);
    // console.log(code);
    props.setCode(code);
  };

  return (
    <TextField
      select
      label="Select File"
      value={selectedValue}
      onChange={handleChange}
      variant="outlined"
      InputProps={{
        style: {
          color: "white",
        },
      }}
      InputLabelProps={{
        style: {
          color: "white",
          borderColor: "white",
        },
      }}
      sx={{
        width: "30%",
      }}
    >
      {allFiles ? allFiles.map((ele) => {
        return <MenuItem value={ele} sx={{ color: "white" }}>{ele}</MenuItem>
      }) : <MenuItem value="" sx={{ color: "white" }}>Loading...</MenuItem>}
    </TextField>
  );
};


export function Compare(props) {
  const [code, setCode] = useState("");
  const [review, setReview] = React.useState("");
  const [clientRev, setClientRev] = useState("");

  const handleSubmitReview = () => {
    // axios.post(`${SERVER_URL}client/`)
    console.log(clientRev);
    setClientRev("");
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        height: "99vh"
      }}
    >
      <Box
        width={"50%"}
        sx={{
          maxHeight: "98vh",
          minHeight: "98vh",
          overflowY: "scroll",
        }}
      >
        <Typography variant="poster" gutterBottom={"10px"} component="h3" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          Source Code &nbsp; <DropdownSelector projectId={props.projectId} setCode={setCode} setReview={setReview} />
        </Typography>
        <SourceCodeViewer code={code} />
      </Box>
      <Box
        width={"50%"}
        sx={{
          maxHeight: "98vh",
          minHeight: "98vh",
          overflowY: "scroll",
        }}
      >
        <Typography variant="poster" gutterBottom={"10px"} component="h3" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          Suggestions
        </Typography>
        <MarkdownViewer review={review} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <TextField
            label="Give Review for the code"
            variant="outlined"
            multiline
            rows={4}
            value={clientRev}
            style={{ marginTop: "10px", width: "80%" }}
            InputProps={{
              style: {
                color: "white",
              },
            }}
            InputLabelProps={{
              style: {
                color: "white",
                borderColor: "white",
              },
            }}
            FormHelperTextProps={{
              style: {
                color: "white",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                },
              },
            }}
            onChange={(e) => { setClientRev(e.target.value) }}
          />
          <Button
            variant="contained"
            style={{ marginTop: "10px" }}
            onClick={() => { handleSubmitReview(); }}
          >
            Submit Review
          </Button>
        </Box>
      </Box>
    </Box >
  )
}
