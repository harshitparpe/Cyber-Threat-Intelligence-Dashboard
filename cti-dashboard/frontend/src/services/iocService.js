import axios from "axios";

export const saveIocHistory = async (iocData) => {
  try {
    await axios.post("http://localhost:5000/api/ioc-history", iocData);
  } catch (err) {
    console.error("Failed to save IOC history:", err.message);
  }
};

export const getIocHistory = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/ioc-history");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch IOC history:", err.message);
    return [];
  }
};
