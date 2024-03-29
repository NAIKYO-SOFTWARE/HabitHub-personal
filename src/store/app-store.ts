import { create } from "zustand";
import auth from "../helper-plugin";
import getFetchClient from "../utils/fetchClient";
import { toast } from "react-toastify";

interface IMenu {
  key: string;
  label: string;
  path: string;
  viewable: boolean;
  creatable: boolean;
  exportable: boolean;
}

interface IAppState {
  isAuthorized: boolean;
  loading: boolean;
  menu?: Array<IMenu>;
  login: (data: any) => void;
  logout: () => void;
  setMenu?: (menu: Array<IMenu>) => void;
}

export const useAppStore = create<IAppState>((set) => ({
  isAuthorized: auth.getToken() !== null && auth.getToken() !== undefined,
  loading: false,
  login: (data) => {
    const { post } = getFetchClient();
    set({ loading: true });
    post("/auth/sign-in", data)
      .then(({ data }: any) => {
        const { token, ...userInfo } = data;
        auth.setToken(token);
        auth.setUserInfo(userInfo);
        location.replace("/");
      })
      .catch((error) => {
        toast(error.response.data.message, { type: "error" });
      })
      .finally(() => set({ loading: false }));
  },
  logout: () => {
    auth.clearToken();
    auth.setUserInfo();
  },
}));
