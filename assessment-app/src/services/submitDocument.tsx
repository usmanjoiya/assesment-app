import { ROUTESPATH } from '../constants/RoutesPath';
import axios from 'axios';

export const submitDocument = async (formData: FormData): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${ROUTESPATH.CREATE_ROUTE}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.success === true;
  } catch (error) {
    return false;
  }
};
