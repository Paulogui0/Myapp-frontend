import axios from "axios";
const api = axios.create({
baseURl: "http://localhost:8080"
});
export default api;