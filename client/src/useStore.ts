import create from "zustand";
import axios from "axios";

interface AppState {
  username: string | null;
  page: string;
  setPage: (page: string) => void;
  register: (username: string, password: string) => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const logInRequest = (username: string, password: string) =>
  axios.post(`${process.env.API_URL || ""}/login`, {
    username,
    password,
  });

const useStore = create<AppState>((set) => ({
  username: localStorage.getItem("username"),
  page: "upload",
  setPage: (page: string) => set({ page }),
  login: async (username: string, password: string) => {
    const res = await logInRequest(username, password);
    if (res.data.success) {
      localStorage.setItem("jwtToken", res.data.data.token);
      localStorage.setItem("username", username);
      set({ username });
    } else {
      alert("Error loggin in");
    }
    return res.data.success;
  },
  register: async (username: string, password: string) => {
    const res = await axios.post("/createUser", {
      username,
      password,
    });
    if (res.data.success) {
      logInRequest(username, password).then((res) => {
        if (res.data.success) {
          localStorage.setItem("jwtToken", res.data.data.token);
          localStorage.setItem("username", username);
          set({ username });
        } else {
          alert("Error loggin in");
        }
        return res.data.success;
      });
    } else {
      alert("Error creating user");
    }
    return res.data.success;
  },
  logout() {
    set({ username: null });
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
  },
}));

export default useStore;
