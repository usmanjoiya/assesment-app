import { ROUTESPATH } from '../constants/RoutesPath';
import axios from 'axios';

interface DocumentResponse {
  results: Array<any>;
  count: number;
}

export const fetchDocuments = async (page: number, limit: number = 10): Promise<DocumentResponse> => {
  try {
    const response = await axios.get(`${ROUTESPATH.FETCH_ROUTE}`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    return { results: [], count: 0 };
  }
};
