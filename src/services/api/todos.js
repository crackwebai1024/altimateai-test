import axios from "axios";
const baseUrl = "https://jsonplaceholder.typicode.com/todos";

const get = async () => {
  try {
    const res = await axios({
      url: baseUrl,
      method: "GET",
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const create = async (data) => {
  try {
    const res = await axios({
      url: baseUrl,
      method: "POST",
      data,
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) =>
  axios({
    method: "PUT",
    url: `${baseUrl}/${id}`,
    data,
  }).catch((err) => {
    throw new Error(err);
  });

const deleteTodo = async (id) =>
  axios({
    method: "DELETE",
    url: `${baseUrl}/${id}`,
  }).catch((err) => {
    throw new Error(err);
  });

export { get, create, update, deleteTodo };
