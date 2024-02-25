import { default as axiosLib } from "axios";

const axios = axiosLib.create({ baseURL: "api" });

export default axios;
