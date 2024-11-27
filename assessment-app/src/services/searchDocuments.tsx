import { ROUTESPATH } from '../constants/RoutesPath';
import axios from 'axios';

interface Document {
  id: string;
  name: string;
  content: string;
  createdDate: string;
  fileSize: string;
  fileUrl: string;
}

interface SearchDocumentsResponse {
  results: Document[];
  count: number;
}

export const searchDocuments = async (
  name: string,
  page: number,
  limit: number = 10
): Promise<SearchDocumentsResponse | null> => {
  try {
    const response = await axios.get(`${ROUTESPATH.SEARCH_ROUTE}`, {
      params: { name, page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    return null; // return null or an empty response
  }
};
