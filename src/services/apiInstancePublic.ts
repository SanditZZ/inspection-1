import axios, { AxiosInstance } from "axios";

const apiInstancePublic = async (
  contentType = "application/json"
): Promise<AxiosInstance> => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_SERVICE_URL,
    headers: {
      "content-type": contentType,
    },
  });
};

export default apiInstancePublic;
