import axiosInstance from "./axiosInstance";

export const studentApi = {
  getAll: () => axiosInstance.get("/students"),
  create: (data) => axiosInstance.post("/students", data),
  update: (id, data) => axiosInstance.put(`/students/${id}`, data),
  delete: (id) => axiosInstance.delete(`/students/${id}`),
};

export const teacherApi = {
  getAll: () => axiosInstance.get("/teachers"),
  create: (data) => axiosInstance.post("/teachers", data),
  update: (id, data) => axiosInstance.put(`/teachers/${id}`, data),
  delete: (id) => axiosInstance.delete(`/teachers/${id}`),
};

export const classApi = {
  getAll: () => axiosInstance.get("/classes"),
  create: (data) => axiosInstance.post("/classes", data),
  update: (id, data) => axiosInstance.put(`/classes/${id}`, data),
  delete: (id) => axiosInstance.delete(`/classes/${id}`),
};
