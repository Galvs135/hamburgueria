import { useAuth } from "../../Provider/auth";
import * as Yup from "yup";
import "../Login/style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

interface UserData {
  email: string;
  password: string;
  firstname: string;
}

export const SignUp = () => {
  const { signUp } = useAuth();

  const formSchema = Yup.object().shape({
    email: Yup.string().required("Email required"),
    password: Yup.string().required("Password required"),
    firstname: Yup.string().required("Username required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({ resolver: yupResolver(formSchema) });

  const onSubmit = (data: UserData) => {
    signUp(data);
  };

  return (
    <div className="formLog">
      <section className="container">
        <h1 className="logTitle">Cadastro</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Email"
            className="email"
            {...register("email")}
          />
          <input
            type="text"
            placeholder="Password"
            className="password"
            {...register("password")}
          />
          <input
            type="text"
            placeholder="UserName"
            className="username"
            {...register("firstname")}
          />

          <button type="submit" className="btnLog">
            Finalizar
          </button>
        </form>
        <p>
          Já possui cadastro? <Link to="/">Entrar</Link>
        </p>
      </section>
    </div>
  );
};
