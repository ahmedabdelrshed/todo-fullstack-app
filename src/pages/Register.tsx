import toast from "react-hot-toast";
import ErrorMassage from "../errors/ErrorMassage";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

    toast.success(
      "You will navigate to the login page after 2 seconds to login.",
      {
        style: {
          backgroundColor: "black",
          color: "white",
        },
        duration: 1500,
      }
    );
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  console.log(errors);
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
        <Button width="w-full">Register</Button>
      </form>
    </div>
  );
};

export default Register;
