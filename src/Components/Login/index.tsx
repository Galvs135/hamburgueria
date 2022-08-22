import { useAuth } from "../../Provider/auth";
import * as Yup from "yup";
import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

interface UserData {
  email: string;
  password: string;
}

export const Login = () => {
  const { signIn } = useAuth();

  const formSchema = Yup.object().shape({
    email: Yup.string().required("Email required"),
    password: Yup.string().required("Password required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({ resolver: yupResolver(formSchema) });

  const onSubmit = (data: UserData) => {
    signIn(data);
  };

  return (
    <div className="formLog">
      <section className="container">
        <h1 className="logTitle">Login</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Email"
            className="email"
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            className="password"
            {...register("password")}
          />
          <button type="submit" className="btnLog">
            Logar
          </button>
        </form>
        <p>
          Ainda não possui cadastro? <Link to="/signUp">Cadastre-se</Link>
        </p>
      </section>
    </div>
  );
};
