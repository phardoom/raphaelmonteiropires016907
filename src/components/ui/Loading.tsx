type LoadingProps = {
  label?: string;
};

export const Loading = ({ label = "Carregando..." }: LoadingProps) => {
  return (
    <div className="state state-loading">
      <div className="spinner" />
      <span>{label}</span>
    </div>
  );
};
