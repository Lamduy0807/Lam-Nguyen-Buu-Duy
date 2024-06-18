import Axios from "axios";

export const axiosClient = Axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
  },
  timeout: 180000,
});
class Api {
  fetchCurencies = () => {
    return axiosClient.get("prices.json");
  };
}

export default new Api();
