import axios from "axios";

export const saveIocHistory = async (iocData) => {
  try {
    await axios.post("http://localhost:5000/api/ioc-history", iocData);
  } catch (err) {
    console.error("Failed to save IOC history:", err.message);
  }
};
