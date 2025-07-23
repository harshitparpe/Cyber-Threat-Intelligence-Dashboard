import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchThreats = async (page = 1, limit = 10) => {
  const res = await API.get(`/threats?page=${page}&limit=${limit}`);
  return res.data;
};

export const postThreat = async (data) => {
  const res = await API.post(`/threats`, data);
  return res.data;
};

export const lookupIOC = async (indicator) => {
  const res = await API.post("/ioc/lookup", { indicator });
  return res.data;
};

export const getThreatFeed = async () => {
  const res = await API.get("/threats/feed");
  return res.data;
};
