"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  buscarViagens,
  clearToken,
  criarViagem,
  getToken,
  atualizarViagem,
  deletarViagem,
  Viagem,
} from "../services/api";

export default function DashboardViagens() {
  const router = useRouter();
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [nome, setNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [erro, setErro] = useState("");

  const fetchViagens = useCallback(async () => {
    try {
      const res = await buscarViagens();
      if (res.status === 401) {
        router.replace("/login");
        return;
      }
      if (!res.ok) throw new Error("Erro ao buscar viagens");
      const data: Viagem[] = await res.json();
      setViagens(data);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Não foi possível carregar as viagens.");
    }
  }, [router]);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    fetchViagens();
  }, [router, fetchViagens]);

  async function deleteViagem(id: string) {
    const res = await deletarViagem(id);
    if (res.status === 401) {
      router.replace("/login");
      return;
    }
    fetchViagens();
  }

  function iniciarEdicao(viagem: Viagem) {
    setNome(viagem.nome);
    setDataInicio(viagem.dataInicio.slice(0, 10));
    setDataFim(viagem.dataFim.slice(0, 10));
    setEditandoId(viagem.id);
  }

  function cancelarEdicao() {
    setNome("");
    setDataInicio("");
    setDataFim("");
    setEditandoId(null);
    setErro("");
  }

  async function salvarViagem() {
    const dados = { nome, dataInicio, dataFim };

    try {
      let res: Response;

      if (editandoId) {
        res = await atualizarViagem(editandoId, dados);
        if (res.status === 401) {
          router.replace("/login");
          return;
        }
      } else {
        res = await criarViagem(dados);
        if (res.status === 401) {
          router.replace("/login");
          return;
        }
      }

      if (!res.ok) {
        const errorData = await res.json();
        setErro(errorData.message + " " + errorData.error || "Erro ao salvar viagem");
        return;
      }

      setNome("");
      setDataInicio("");
      setDataFim("");
      setEditandoId(null);
      setErro("");

      fetchViagens();
    } catch (err) {
      console.error(err);
      setErro("Erro ao processar solicitação");
    }
  }

  function sair() {
    clearToken();
    router.replace("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Minhas Viagens
              </h1>
              <p className="text-sm text-gray-600">Planeje suas próximas aventuras</p>
            </div>
          </div>
          <button
            onClick={sair}
            className="px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Formulário de criação/edição */}
        <div className="mb-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {editandoId ? "Editar Viagem" : "Nova Viagem"}
          </h3>
          
          {erro && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-pulse">
              <p className="text-sm text-red-700">{erro}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Destino</label>
              <input
                type="text"
                placeholder="Ex: Paris, França"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Data de Início</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Data de Fim</label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={salvarViagem}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {editandoId ? "Salvar Alterações" : "Criar Viagem"}
            </button>
            {editandoId && (
              <button
                onClick={cancelarEdicao}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-300 hover:scale-105 active:scale-95 transition-all"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Lista de viagens */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Viagens Planejadas ({viagens.length})
          </h3>

          {viagens.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-12 text-center border border-purple-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma viagem ainda</h4>
              <p className="text-gray-500">Comece planejando sua primeira aventura!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {viagens.map((v) => (
                <div
                  key={v.id}
                  className="group bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-purple-100 hover:border-purple-300"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                          {v.nome}
                        </h4>
                        <div className="flex items-center text-gray-600 text-sm space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{v.dataInicio.slice(0, 10)}</span>
                          <span>→</span>
                          <span>{v.dataFim.slice(0, 10)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => iniciarEdicao(v)}
                        className="flex-1 py-2.5 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                      <button
                        onClick={() => deleteViagem(v.id)}
                        className="flex-1 py-2.5 px-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}