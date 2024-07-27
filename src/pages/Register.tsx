import Button from "../ui/Button";
import Input from "../ui/Input";

const Register = () => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4">
        <Input type="text" placeholder="Username" required />
        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" />
        <Button width="w-full">Register</Button>
      </form>
    </div>
  );
};

export default Register;
