import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',       
      }}
    >
      <Paper elevation={0} sx={{
        background: '#1B1919',
        height: '100vh',
        width: '100vw'      
      }} />
      <Paper sx={{
        background: '#262626'
      }}/>
      <Paper elevation={3} sx={{
        background: '#353535'
      }}/>
    </Box>
  );
}