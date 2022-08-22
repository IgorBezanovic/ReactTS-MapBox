import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../../App.css';

export default function ComboBox({
    addresses,
    onChange 
  }: {
    addresses : string[],
    onChange : (event: React.SyntheticEvent<Element, Event>, value: string | null) => Promise<void>
  }) {
    
  return (
    <Stack 
      sx={{ width: '80%' }} 
      spacing={1} 
      className="maxWidth"
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={addresses}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Addresses" />}
          onChange={onChange}
        />
    </Stack>
  );
}
