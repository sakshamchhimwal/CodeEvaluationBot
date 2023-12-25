import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function VariantAvatars() {
  return (
    
      <Avatar sx={{
         bgcolor: green[500], 
         height:"75%",
         width:"75%",
        
         
         }} variant="rounded" >
        <AssignmentIcon />
      </Avatar>
  );
}