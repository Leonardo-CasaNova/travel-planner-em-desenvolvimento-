export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-3 text-3xl font-bold">Travel Planner</h1>
        <p className="mb-6 text-gray-600">Organize suas viagens com autenticação JWT.</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href="/login" className="rounded bg-blue-600 px-4 py-2 text-white">
            Entrar
          </a>
          <a href="/dashboard" className="rounded border border-gray-300 px-4 py-2">
            Ir para dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
