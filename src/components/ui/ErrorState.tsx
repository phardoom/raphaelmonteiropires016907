type ErrorStateProps = {
  title?: string;
  message: string;
};

export const ErrorState = ({
  title = "Algo deu errado",
  message,
}: ErrorStateProps) => {
  return (
    <div className="state state-error">
      <strong>{title}</strong>
      <span>{message}</span>
    </div>
  );
};
