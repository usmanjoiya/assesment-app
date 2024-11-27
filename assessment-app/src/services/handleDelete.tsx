import { ROUTESPATH } from '../constants/RoutesPath';

import axios from 'axios';

export const deleteDocument = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${ROUTESPATH.DELETE_ROUTE(id)}`);
    return response.data.success === true;
  } catch (error) {
    return false;
  }
};
