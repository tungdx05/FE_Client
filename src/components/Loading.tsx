import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading: React.FC = () => (
  <Box display="flex" justifyContent="center" mt={4}>
    <CircularProgress />
  </Box>
);

export default Loading;
