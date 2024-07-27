import ErrorMassage from "../errors/ErrorMassage";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  console.log(errors);
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Please Enter Username",
              minLength: 5,
            })}
          />
          {errors?.username && errors.username.type === "required" && (
            <ErrorMassage msg={errors.username.message} />
          )}
          {errors?.username && errors.username.type === "minLength" && (
            <ErrorMassage msg="Username should be at least 5 characters." />
          )}
        </div>

        <div>
          <Input
            placeholder="Email"
            {...register("email", {
              required: "Please Enter Email",
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
          />
          {errors?.email && errors.email.type === "required" && (
            <ErrorMassage msg={errors.email.message} />
          )}
          {errors?.email && errors.email.type === "pattern" && (
            <ErrorMassage msg="Please Enter a valid Email." />
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Please Enter Password",
              minLength: 8,
            })}
          />
          {errors?.password && errors.password.type === "required" && (
            <ErrorMassage msg={errors.password.message} />
          )}
          {errors?.password && errors.password.type === "minLength" && (
            <ErrorMassage msg="Password should be at least 8 characters." />
          )}
        </div>
        <Button width="w-full">Register</Button>
      </form>
    </div>
  );
};

export default Register;
