import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

interface User {
  email: string;
  password: string;
}

interface Users {
  email: string;
  password: string;
  firstname: string;
}

interface AuthProps {
  children: ReactNode;
}

interface AuthProviderData {
  Logout: () => void;
  signIn: (userData: User) => void;
  signUp: (userData: Users) => void;
  authToken: string;
  userName: string;
}

export const AuthProvider = ({ children }: AuthProps) => {
  const history = useNavigate();

  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const [userName, setUserName] = useState("");

  console.log(userName);

  const signIn = (userData: User) => {
    axios
      .post("https://hamburgueria-kenzi.herokuapp.com/login", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        setAuthToken(response.data.accessToken);
        setUserName(response.data.user.firstname);
        history("/vitrine");
      })
      .catch((err) => console.log(err));
  };

  const signUp = (userData: Users) => {
    axios
      .post("https://hamburgueria-kenzi.herokuapp.com/register", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        setAuthToken(response.data.accessToken);
        setUserName(response.data.user.firstname);
        history("/vitrine");
      })
      .catch((err) => console.log(err));
  };

  const Logout = () => {
    localStorage.clear();
    setAuthToken("");
    history("/");
  };

  return (
    <AuthContext.Provider
      value={{ authToken, userName, Logout, signUp, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
