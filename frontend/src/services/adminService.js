// filename: frontend/src/services/adminService.js
import api from "./api";

export const getStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data;
};

export const getUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};

export const getLogs = async (limit = 100) => {
  const { data } = await api.get("/admin/logs", { params: { limit } });
  return data;
};
