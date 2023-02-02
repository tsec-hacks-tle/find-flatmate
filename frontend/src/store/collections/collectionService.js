import axios from "axios";

const API_URL = "/api/v1/";

const fetchCollections = async () => {
  let role = JSON.parse(localStorage.getItem("user")).role;
  if (role === "job hunter") role = "users";
  if (role === "recruiter") role = "recruiters";

  const { data } = await axios.get(`${API_URL}${role}/collections`);

  return data.data.collections;
};

const addToCollections = async (project) => {
  let role = JSON.parse(localStorage.getItem("user")).role;
  if (role === "job hunter") role = "users";
  if (role === "recruiter") role = "recruiters";

  const { data } = await axios.post(
    `${API_URL}${role}/collections/${project._id}`
  );

  if (data) return project;
};

const deleteFromCollection = async (id) => {
  let role = JSON.parse(localStorage.getItem("user")).role;
  if (role === "job hunter") role = "users";
  if (role === "recruiter") role = "recruiters";

  const { data } = await axios.delete(`${API_URL}${role}/collections/${id}`);

  if (data) return id;
};

const collectionService = {
  fetchCollections,
  addToCollections,
  deleteFromCollection,
};

export default collectionService;
