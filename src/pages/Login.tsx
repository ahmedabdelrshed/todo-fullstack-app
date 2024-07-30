import ErrorMassage from "../errors/ErrorMassage";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { Link } from "react-router-dom";

interface IFormInput {
  identifier: string;
  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/local", data);
      localStorage.setItem("userData", JSON.stringify(res.data));
      if (res.status === 200) {
        toast.success("You will navigate to the Home page after 3 seconds.", {
          duration: 1500,
        });
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }
    } catch (error) {
      const objError = error as AxiosError<IErrorResponse>;
      console.log(objError);
      toast.error(`${objError.response?.data?.error?.message}`, {
        duration: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input placeholder="Email Address" {...register("identifier")} />
          {errors.identifier && (
            <ErrorMassage msg={errors.identifier?.message} />
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <ErrorMassage msg={errors.password?.message} />}
        </div>
        <Button width="w-full" isLoading={isLoading}>
          {isLoading ? "Loading . . ." : `Login`}
        </Button>
      </form>
      <p className="text-center mt-5 ">
        Don't have an account?{" "}
        <Link className="text-blue-800" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
