import axios from "axios";
import { API_URL } from "@/shared/config";
import type { AxiosPromise } from "axios";

export const apiInstance = axios.create({
  baseURL: API_URL,
});

const BASE_URL = "/roles";

export const getRoles = (): AxiosPromise<any[]> => {
  return apiInstance.get(BASE_URL);
};

export const getRole = (roleId: number): AxiosPromise<any> => {
  return apiInstance.get(`${BASE_URL}/${roleId}`);
};

export const updateRole = (
  roleId: number,
  roleData: any
): AxiosPromise<any> => {
  return apiInstance.put(`${BASE_URL}/${roleId}`, roleData);
};

export const addRole = (roleData: any): AxiosPromise<any> => {
  return apiInstance.post(BASE_URL, roleData);
};
