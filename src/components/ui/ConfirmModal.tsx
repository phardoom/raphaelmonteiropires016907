import { useEffect, useRef } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  details?: string[];
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  details,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "danger",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && !isLoading) {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      ),
      iconBg: "bg-red-100 text-red-600",
      button: "bg-red-600 hover:bg-red-700 shadow-red-200/50",
    },
    warning: {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      ),
      iconBg: "bg-amber-100 text-amber-600",
      button: "bg-amber-600 hover:bg-amber-700 shadow-amber-200/50",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={isLoading ? undefined : onCancel}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="relative w-full max-w-md animate-[fadeIn_0.2s_ease-out] rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${styles.iconBg}`}>
            {styles.icon}
          </div>
          <div className="flex-1">
            <h3 id="modal-title" className="text-lg font-semibold text-slate-900">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{message}</p>

            {details && details.length > 0 && (
              <div className="mt-3 rounded-xl bg-slate-50 p-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Informações relacionadas
                </p>
                <ul className="space-y-1">
                  {details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition disabled:opacity-50 ${styles.button}`}
          >
            {isLoading ? "Processando..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
