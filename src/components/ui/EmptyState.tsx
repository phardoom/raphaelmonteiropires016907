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
    <div className="state state-empty">
      <strong>{title}</strong>
      <span>{message}</span>
      {action ? <div className="state-action">{action}</div> : null}
    </div>
  );
};
