import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Input, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGES } from '../constants/ErrorMessages';
import { submitDocument } from '../services/submitDocument';

interface Errors {
  name?: string;
  content?: string;
  file?: string;
}

const AddDocument: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
    if (e.target.value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
    if (file) {
      setErrors((prevErrors) => ({ ...prevErrors, file: '' }));
    }
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setContent(e.target.value);
    if (e.target.value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, content: '' }));
    }
  };

  const validateFields = (): Errors => {
    const validationErrors: Errors = {};
    if (!name.trim()) validationErrors.name = ERROR_MESSAGES.NAME_REQUIRED;
    if (!content.trim()) validationErrors.content = ERROR_MESSAGES.CONTENT_REQUIRED;
    if (!file) validationErrors.file = ERROR_MESSAGES.FILE_REQUIRED;
    return validationErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('file', file as Blob); // File is guaranteed to be non-null here
    formData.append('content', content);

    try {
      const success = await submitDocument(formData);
      if (success) {
        alert(`${ERROR_MESSAGES.DOCUMENT_ADDED_SUCCESS}`);
        navigate('/');
      } else {
        alert(`${ERROR_MESSAGES.ERROR_ADDING_DOCUMENT}`);
      }
    } catch (error) {
      alert(`${ERROR_MESSAGES.ERROR_SUBMITTING_FORM}`);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add Document
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={handleContentChange}
            margin="normal"
            error={!!errors.content}
            helperText={errors.content}
          />

          <Input
            type="file"
            inputProps={{ accept: '.txt' }}
            onChange={handleFileChange}
            fullWidth
            margin="dense"
          />
          {errors.file && (
            <Typography variant="caption" color="error">
              {errors.file}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: '16px' }}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddDocument;
