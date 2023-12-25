import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

export default function ProjectRepositories() {
    return (
      <Box
        sx={{
          borderRadius: "6px",
          background: "#353535",
          padding: "20px", // Add padding for better spacing
        }}
        maxWidth="sx"
      >
        <Typography
          variant="poster"
          sx={{
            color: "#FFF",
            fontSize: "17px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            marginBottom: "10px", // Add margin at the bottom for spacing
          }}
        >
          Repository 1
        </Typography>
        <Typography
          variant="poster"
          sx={{
            color: "#B5B5B5",
            fontSize: "15px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            marginBottom: "20px", // Add more margin at the bottom for spacing
          }}
        >
          Brief description - fewilfkj skfbs asdfhjsfn
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'none', // Prevent uppercase transformation
            color: '#2196F3', // Set the text color to blue
          }}
        >
          Analyse
        </Button>
      </Box>
    );
  }

