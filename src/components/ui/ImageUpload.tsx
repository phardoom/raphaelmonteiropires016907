import { useRef, useState, type ChangeEvent } from "react";

type ImageUploadProps = {
  label: string;
  currentImageUrl?: string;
  onFileChange: (file: File | null) => void;
};

export const ImageUpload = ({
  label,
  currentImageUrl,
  onFileChange,
}: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Cria URL para preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setFileName(file.name);
      onFileChange(file);
    } else {
      setPreviewUrl(null);
      setFileName(null);
      onFileChange(null);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setFileName(null);
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const displayUrl = previewUrl || currentImageUrl;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>

      <div className="flex flex-wrap items-start gap-4">
        {/* Preview da imagem */}
        <div className="relative">
          {displayUrl ? (
            <div className="group relative">
              <img
                src={displayUrl}
                alt="Preview"
                className="h-24 w-24 rounded-xl border border-slate-200 object-cover shadow-sm"
              />
              {previewUrl && (
                <div className="absolute -right-2 -top-2">
                  <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow">
                    NOVA
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
              <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
          )}
        </div>

        {/* Área de upload */}
        <div className="flex flex-1 flex-col gap-2">
          <label
            className="inline-flex cursor-pointer items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            {previewUrl ? "Trocar imagem" : "Selecionar imagem"}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="sr-only"
            />
          </label>

          {fileName && (
            <div className="flex items-center gap-2">
              <span className="max-w-[200px] truncate text-xs text-slate-500">
                {fileName}
              </span>
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1 text-xs text-red-500 transition hover:text-red-700"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                Remover
              </button>
            </div>
          )}

          <p className="text-xs text-slate-400">
            PNG, JPG ou GIF. Máximo 5MB.
          </p>
        </div>
      </div>
    </div>
  );
};
