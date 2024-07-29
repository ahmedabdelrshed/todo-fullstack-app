import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: "w-full" | "w-fit";
  isLoading?: boolean;
}

const Button = ({ children, width = "w-full", isLoading, ...rest }: IProps) => {
  return (
    <button
      disabled={isLoading}
      className={`${width} disabled:hover:bg-blue-400, disabled:cursor-not-allowed disabled:bg-blue-400 transition bg-blue-600 p-2  rounded-lg font-medium text-white`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
