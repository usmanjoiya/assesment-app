const API_URL = process.env.REACT_APP_API_URL;

export const ROUTESPATH = {
    FETCH_ROUTE: `${API_URL}/api/documents/`,
    DELETE_ROUTE: (id:string) => `${API_URL}/api/documents/${id}/delete/`,
    SEARCH_ROUTE: `${API_URL}/api/documents/search/`,
    CREATE_ROUTE: `${API_URL}/api/documents/create/`

};
