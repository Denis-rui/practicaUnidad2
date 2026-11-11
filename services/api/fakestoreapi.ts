import axios from "axios";

export const configuracionComunApi = axios.create({
  baseURL: "https://fakestoreapi.com",
});
