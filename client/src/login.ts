import axios from "axios";

const login = (username: string, password: string) =>
  axios.post(`${process.env.API_URL || ""}/login`, {
    username,
    password,
  });

export default login;
