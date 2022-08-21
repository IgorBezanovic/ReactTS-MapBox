import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ErrorMessage } from "../../types/errorMessage.model";
import '../../App.css';

export default function AlertBox({
    error 
  }: {
    error : ErrorMessage
  }) {
    
  return (
    <Stack 
      sx={{ width: '80%' }} 
      spacing={1} 
      className="maxWidth topRightCorner"
      >
        <Alert 
          variant="outlined" 
          severity={error.code !== 204 ? "error" : "info"}>
            `{error.message}: {error.code}`
        </Alert>  
    </Stack>
  );
}
