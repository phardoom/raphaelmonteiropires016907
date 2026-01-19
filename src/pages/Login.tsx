import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField } from "../components/molecules/FormField";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../utils/errorHandler";
import { Loading } from "../components/ui/Loading";

export const Login = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/pets", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate("/pets", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Credenciais inválidas."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-10">
        <div className="grid w-full overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200 md:grid-cols-[1.1fr_1fr]">
          <section className="hidden flex-col justify-between bg-slate-900 p-8 text-white md:flex">
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-lg font-semibold">
                PM
              </div>
              <h1 className="text-2xl font-semibold">Gestão de PETs</h1>
            </div>
            <div className="text-xs text-slate-400">&nbsp;</div>
          </section>

          <form className="p-8 md:p-10" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900">Bem-vindo de volta</h2>
              <p className="text-sm text-slate-500">
                Entre com seu usuário e senha para acessar o sistema.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <FormField label="Usuário">
                <input
                  type="text"
                  name="username"
                  placeholder="admin"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </FormField>

              <FormField label="Senha">
                <input
                  type="password"
                  name="password"
                  placeholder="admin"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </FormField>
            </div>

            {error ? <span className="mt-4 block text-sm text-red-600">{error}</span> : null}

            <button
              className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loading label="Entrando..." /> : "Entrar"}
            </button>

            
          </form>
        </div>
      </div>
    </div>
  );
};
