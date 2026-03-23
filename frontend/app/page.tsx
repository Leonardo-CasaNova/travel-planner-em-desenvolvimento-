import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50 text-stone-800">
      <div className="relative overflow-hidden border-b border-amber-200/60 bg-[radial-gradient(circle_at_20%_10%,#fde68a_0%,transparent_30%),radial-gradient(circle_at_85%_0%,#bfdbfe_0%,transparent_30%),linear-gradient(180deg,#fffdf7_0%,#f9f5ec_100%)]">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 font-black text-white">
                TP
              </div>
              <div>
                <p className="text-lg font-black tracking-tight">Travel Planner</p>
                <p className="text-xs text-stone-600">roteiro inteligente em segundos</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/login" className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold hover:bg-stone-100">
                Entrar
              </Link>
              <Link href="/login" className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800">
                Começar
              </Link>
            </div>
          </header>

          <section className="mb-12 grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                simples e automático
              </span>
              <h1 className="mt-4 text-4xl font-black leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
                Você informa origem, destino e data. O resto a plataforma monta.
              </h1>
              <p className="mt-4 max-w-2xl text-stone-600 sm:text-lg">
                Menos telas, menos escolhas manuais. Um fluxo direto para planejar viagem com praticidade.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-sm text-stone-600">
                <span className="rounded-full bg-white px-3 py-1 border border-stone-200">✅ Sugestão de roteiro</span>
                <span className="rounded-full bg-white px-3 py-1 border border-stone-200">✅ Organização automática</span>
                <span className="rounded-full bg-white px-3 py-1 border border-stone-200">✅ Tudo em um painel</span>
              </div>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xl sm:p-6">
              <h2 className="mb-4 text-xl font-black text-stone-900">Monte sua viagem</h2>
              <div className="grid gap-3">
                <input
                  placeholder="Origem"
                  className="rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none placeholder:text-stone-400 focus:border-emerald-500"
                />
                <input
                  placeholder="Destino"
                  className="rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none placeholder:text-stone-400 focus:border-emerald-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    className="rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  />
                  <input
                    type="date"
                    className="rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  />
                </div>
                <Link href="/login" className="rounded-xl bg-emerald-700 px-4 py-3 text-center text-sm font-black uppercase tracking-wide text-white hover:bg-emerald-800">
                  Gerar viagem
                </Link>
              </div>
              <p className="mt-3 text-xs text-stone-500">Você só preenche os campos principais. A plataforma organiza o plano para você.</p>
            </div>
          </section>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <h3 className="text-xl font-black text-stone-900 sm:text-2xl">Como funciona</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs text-emerald-700">PASSO 1</p>
              <p className="mt-2 font-bold text-stone-900">Informe origem e destino</p>
              <p className="text-sm text-stone-600">Apenas os dados essenciais para começar.</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs text-sky-700">PASSO 2</p>
              <p className="mt-2 font-bold text-stone-900">Escolha as datas</p>
              <p className="text-sm text-stone-600">Ida e volta para montar o plano ideal.</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs text-amber-700">PASSO 3</p>
              <p className="mt-2 font-bold text-stone-900">Receba o plano pronto</p>
              <p className="text-sm text-stone-600">A plataforma organiza tudo automaticamente.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
