// services/iocApi.js
import axios from "axios";

export const lookupIOC = async (ip) => {
  const res = await axios.get(`http://localhost:5000/api/ioc-lookup?ip=${ip}`);
  console.log("IOC API response:", res.data);
  return res.data;
};
