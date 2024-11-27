import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const AddButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add');
  };

  return (
    <IconButton
      onClick={handleClick}
      color="primary"
      aria-label="add"
      sx={{
        fontSize: '2rem',
        backgroundColor: '#1976d2',
        color: 'white',
        margin: '16px',
        '&:hover': {
          backgroundColor: '#1565c0',
        },
      }}
    >
      <AddIcon />
    </IconButton>
  );
};

export default AddButton;
