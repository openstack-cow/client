import axios from 'axios';

import { BACKEND_URL } from "@env/index";

export const getWebsiteDetails = async (id: string) => {
    console.log(BACKEND_URL)
    const response = await axios.get(`${BACKEND_URL}/websites/${id}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });
    console.log(response.data);
    return response.data;
};
