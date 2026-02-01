type ErrorStateProps = {
  title?: string;
  message: string;
};

export const ErrorState = ({
  title = "Algo deu errado",
  message,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
      <strong className="text-base font-semibold">{title}</strong>
      <span className="text-sm">{message}</span>
    </div>
  );
};
