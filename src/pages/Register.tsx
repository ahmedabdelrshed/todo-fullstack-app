import toast from "react-hot-toast";
import ErrorMassage from "../errors/ErrorMassage";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        toast.success(
          "You will navigate to the login page after 3 seconds to login.",
          {
            style: {
              backgroundColor: "black",
              color: "white",
            },
            duration: 3000,
          }
        );
      }
    } catch (error) {
      const objError = error as AxiosError<IErrorResponse>;
      console.log(objError);
      toast.error(`${objError.response?.data?.error?.message}`);
    } finally {
      setIsLoading(false);
    }

    // setTimeout(() => {
    //   navigate("/login");
    // }, 2000);
  };
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input type="text" placeholder="Username" {...register("username")} />
          {errors.username && <ErrorMassage msg={errors.username?.message} />}
        </div>

        <div>
          <Input placeholder="Email" {...register("email")} />
          {errors.email && <ErrorMassage msg={errors.email?.message} />}
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
          {isLoading ? "Loading. . ." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
