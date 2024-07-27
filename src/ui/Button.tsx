import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, width = "w-full", ...rest }: IProps) => {
  return (
    <button
      className={`${width}  bg-blue-500 p-2  rounded-lg font-medium text-white`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
