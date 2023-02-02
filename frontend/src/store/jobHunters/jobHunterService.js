import axios from "axios";

const API_URL = "/api/v1/";

// Fetch User
const fetchJobHunters = async (filteredData) => {
  // console.log(tags);
  let url = `${API_URL}tenants?`;

  // console.log(filteredData.data);

  if (filteredData?.gender) url += `gender=${filteredData.gender}&`;
  if (filteredData?.profession) url += `profession=${filteredData.profession}&`;
  if (filteredData?.food) url += `food_preference=${filteredData.food}&`;
  if (filteredData?.religion) url += `gender=${filteredData.religion}`;

  let body = {};
  if (filteredData?.body) body = filteredData?.body;

  // console.log(body);

  const { data } = await axios.post(url, body);
  console.log(data);

  return data.data;
};

const fetchJobHunter = async (id) => {
  const { data } = await axios.get(`${API_URL}users/${id}`);

  return data.data.data;
};

const authService = {
  fetchJobHunters,
  fetchJobHunter,
};

export default authService;
