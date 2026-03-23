"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, login, register } from "../services/api";

export default function LoginPage() {
  const router = useRouter();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getToken()) {
      router.replace("/");
    }
  }, [router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegisterMode) {
        const registerResponse = await register({ name, email, password });
        if (!registerResponse.ok) {
          setError("Não foi possível cadastrar.");
          return;
        }
      }

      const loginResponse = await login({ email, password });
      if (!loginResponse.ok) {
        setError("E-mail ou senha inválidos.");
        return;
      }

      router.replace("/");
    } catch {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: "1s"}}></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Floating card with border glow */}
        <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-blue-500/30 overflow-hidden group">
          {/* Animated border glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-10 blur transition-opacity duration-500"></div>
          
          <div className="relative">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-emerald-500 to-cyan-500 rounded-3xl mb-4 shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Travel Planner
              </h1>
              <p className="mt-3 text-blue-200 text-sm font-medium">
                {isRegisterMode ? "🌍 Comece sua próxima aventura" : "✈️ Bem-vindo explorador!"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegisterMode && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Nome completo</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-3 w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="João Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border-2 border-slate-600 rounded-xl focus:border-emerald-500 focus:bg-slate-700 transition-all outline-none text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/30"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider">E-mail</label>
                <div className="relative">
                  <svg className="absolute left-3 top-3 w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    placeholder="viajante@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border-2 border-slate-600 rounded-xl focus:border-blue-500 focus:bg-slate-700 transition-all outline-none text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Senha</label>
                <div className="relative">
                  <svg className="absolute left-3 top-3 w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border-2 border-slate-600 rounded-xl focus:border-cyan-500 focus:bg-slate-700 transition-all outline-none text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500/30"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border-l-4 border-red-500 p-4 rounded-lg backdrop-blur">
                  <p className="text-sm text-red-200 font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Conectando...
                  </>
                ) : (
                  <>
                    {isRegisterMode ? "✍️ Criar Conta" : "🚀 Entrar"}
                  </>
                )}
              </button>
            </form>

            {/* Toggle mode */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setIsRegisterMode((prev) => !prev);
                }}
                className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
              >
                {isRegisterMode ? (
                  <>Já tem uma conta? <span className="text-cyan-400 font-bold">Faça login</span></>
                ) : (
                  <>Novo por aqui? <span className="text-cyan-400 font-bold">Cadastre-se</span></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Floating info */}
        <div className="mt-8 text-center text-slate-400 text-xs">
          <p>✨ Organize suas viagens com segurança e facilidade</p>
        </div>
      </div>
    </main>
  );
}
