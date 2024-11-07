import apiInstancePublic from "../apiInstancePublic";
import { service } from "../servicePath";
import { CreateInspectionRequest, UpdateInspectionRequest } from "./types";

const getAllInspections = async (inspectionID?: string) => {
  const request = await apiInstancePublic();
  const response = await request.get(`${service.history}`, {
    params: inspectionID ? { inspectionID } : {},
  });

  return response.data;
};

// Get inspection by specific inspection id
const getInspectionById = async (inspectionID: string) => {
  const request = await apiInstancePublic();
  const response = await request.get(`${service.history}/${inspectionID}`, {});

  return response.data;
};

const createInspection = async (reqBody: CreateInspectionRequest) => {
  const request = await apiInstancePublic();
  const response = await request.post(`${service.history}`, reqBody);
  return response.data;
};

const updateInspectionById = async (
  inspectionID: string,
  reqBody: UpdateInspectionRequest,
) => {
  const request = await apiInstancePublic();
  await request.patch(`${service.history}/${inspectionID}`, reqBody);
};

const deleteInspectionById = async (inspectionID: string) => {
  const request = await apiInstancePublic();
  await request.delete(`${service.history}/${inspectionID}`);
};

const inspectionApi = {
  getAllInspections,
  getInspectionById,
  createInspection,
  updateInspectionById,
  deleteInspectionById,
};

export default inspectionApi;
