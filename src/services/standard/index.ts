import apiInstancePublic from "../apiInstancePublic";
import { service } from "../servicePath";

const getStandards = async () => {
  const request = await apiInstancePublic();
  const response = await request.get(`${service.standard}`, {});

  return response.data;
};

const standardApi = {
  getStandards,
};

export default standardApi;
