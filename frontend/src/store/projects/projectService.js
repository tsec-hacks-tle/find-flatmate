import axios from "axios";
import isEmpty from "../../utils/utils";

const API_URL = "/api/v1/";

// Fetch User
// perpage = 12
const fetchProjects = async ({ page = "1", perPage = "100", price, body }) => {
  let url = `${API_URL}rooms`;

  if (price && price.length === 2) {
    url += `?price[lte]=${price[1]}&price[gte]=${price[0]}`;
  }

  const { data } = await axios.post(url, body);
  console.log(data);

  return data.data;
};

const fetchProject = async (projectId) => {
  const { data } = await axios.get(`${API_URL}projects/${projectId}`);

  return data.data.data;
};

const authService = {
  fetchProjects,
  fetchProject,
};

export default authService;
