type LoadingProps = {
  label?: string;
};

export const Loading = ({ label = "Carregando..." }: LoadingProps) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-5">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-700" />
      <span className="text-sm text-slate-600">{label}</span>
    </div>
  );
};
