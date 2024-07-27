interface IProps {
  msg: string | undefined;
}

const ErrorMassage = ({ msg }: IProps) => {
  return msg ? (
    <span className="block text-red-600 font-semibold text-sm">{msg}</span>
  ) : null;
};

export default ErrorMassage;
