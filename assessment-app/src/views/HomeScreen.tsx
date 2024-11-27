import React, { useState, useEffect } from 'react';
import { Pagination, Box } from '@mui/material';

import { AddButton, DocumentTable, SearchAppBar } from '../components/home/index';
import { ERROR_MESSAGES } from '../constants/ErrorMessages';
import { formatDocument } from '../utill/utills';
import { fetchDocuments } from '../services/FetchDocument';
import { searchDocuments } from '../services/searchDocuments';

interface DocumentRow {
  id: string;
  name: string;
  content: string;
  createdDate: string;
  fileSize: string;
  fileUrl: string;
}

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [rows, setRows] = useState<DocumentRow[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true);
      try {
        const data = await fetchDocuments(page, 10);
        const formattedRows = data.results.map(formatDocument);
        setRows(formattedRows);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error) {
        alert(ERROR_MESSAGES.FAILED_TO_GET_DATA);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  const handleSearch = async (name: string): Promise<void> => {
    setLoading(true);
    try {
      const data = await searchDocuments(name, page, 10);
      if (data) {
        const formattedRows = data.results.map(formatDocument);
        setRows(formattedRows);
        setTotalPages(Math.ceil(data.count / 10));
  
        if (data.count === 0) {
          setTotalPages(0);
        }
      } else {
        alert(ERROR_MESSAGES.FAILED_TO_GET_DATA);
      }
    } catch (error) {
      alert(ERROR_MESSAGES.FAILED_TO_GET_DATA);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <SearchAppBar onSearch={handleSearch} />
      <AddButton />
      <DocumentTable rows={rows} setRows={setRows} loading={loading} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          mb: 2,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
};

export default HomeScreen;
