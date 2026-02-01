import type { ReactNode } from "react";

type EmptyStateProps = {
  title?: string;
  message: string;
  action?: ReactNode;
};

export const EmptyState = ({
  title = "Nenhum dado encontrado",
  message,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl border border-dashed border-slate-300 bg-white p-6">
      <strong className="text-base font-semibold text-slate-900">{title}</strong>
      <span className="text-sm text-slate-500">{message}</span>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
};
