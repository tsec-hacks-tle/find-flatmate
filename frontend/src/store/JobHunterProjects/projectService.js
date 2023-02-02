import axios from "axios";

const API_URL = "/api/v1/";

const fetchMyProjects = async (projectId) => {
  const { data } = await axios.get(`${API_URL}projects/me`);
  return data.data.data;
};

const updateMyProject = async (projectData) => {
  const id = projectData.id;

  delete projectData.id;

  const { data } = await axios.patch(`${API_URL}projects/${id}`, projectData);

  return data.data.project;
};

const deleteProject = async (projectData) => {
  const id = projectData._id;

  const { data } = await axios.delete(`${API_URL}projects/${id}`, projectData);

  if (data) return id;
};

const authService = {
  fetchMyProjects,
  updateMyProject,
  deleteProject,
};

export default authService;
