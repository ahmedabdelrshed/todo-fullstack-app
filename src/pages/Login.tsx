import { useLocation } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";

const Login = () => {
    const userdata = useLocation()
    console.log(userdata)
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4">
        <Input type="email" placeholder="Email"  required/>
        <Input type="password" placeholder="Password" />
        <Button width="w-full">Login</Button>
      </form>
    </div>
  );
};

export default Login;
