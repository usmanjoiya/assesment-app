import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button, CircularProgress, Box } from '@mui/material';

import { ERROR_MESSAGES } from '../../constants/ErrorMessages';
import { deleteDocument } from '../../services/handleDelete';

interface DocumentRow {
  id: string;
  name: string;
  content: string;
  createdDate: string;
  fileSize: string;
  fileUrl: string;
}

interface DocumentTableProps {
  rows: DocumentRow[];
  setRows: React.Dispatch<React.SetStateAction<DocumentRow[]>>;
  loading: boolean;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ rows, setRows, loading }) => {

  const handleView = (fileUrl: string): void => {
    window.open(fileUrl, '_blank');
  };

  const handleDelete = async (id: string): Promise<void> => {
    const confirmDelete = window.confirm(`${ERROR_MESSAGES.CONFIRM_DELETE} : '${id}'?`);
    if (!confirmDelete) return;

    try {
      const success = await deleteDocument(id);
      if (success) {
        alert(`${ERROR_MESSAGES.DELETE_WITH_ID} : ${id}`);
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      } else {
        alert(`${ERROR_MESSAGES.FAILED_DELETE_WITH_ID} : ${id}.`);
      }
    } catch (error) {
      alert(`${ERROR_MESSAGES.ERROR_DELETE_WITH_ID}`);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    rows && rows.length > 0 ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Document Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Content</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Created Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">File Size</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">VIEW</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.content}</TableCell>
                <TableCell align="right">{row.createdDate}</TableCell>
                <TableCell align="right">{row.fileSize}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleView(row.fileUrl)}
                  >
                    VIEW
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(row.id)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="body1" color="textSecondary">
          No data found.
        </Typography>
      </Box>
    )
  );
};

export default DocumentTable;
