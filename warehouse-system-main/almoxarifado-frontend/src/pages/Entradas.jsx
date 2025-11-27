import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { isAdmin } from '../utils/authUtils';
import Footer from '../components/Footer';

// Função auxiliar para formatar data/hora no padrão brasileiro
function formatarDataHora(isoString) {
  if (!isoString) return '-';
  const data = new Date(isoString);
  return data.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Entradas() {
  const [entradas, setEntradas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [tamanhoPagina] = useState(10);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [filtro, setFiltro] = useState({
    produtoId: '',
    nome: '',
    periodo: '',
    dataInicio: '',
    dataFim: '',
  });
  const [showFiltros, setShowFiltros] = useState(false);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  // Formulário
  const [form, setForm] = useState({
    produtoId: '',
    quantidadeAdicionada: '',
    responsavel: '',
    destino: '',
  });

  // Produtos para dropdown
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    buscarEntradas();
    buscarProdutos();
  }, [pagina]);

  async function buscarEntradas() {
    const params = new URLSearchParams();

    if (filtro.produtoId) params.append('produtoId', filtro.produtoId);
    if (filtro.periodo) params.append('periodo', filtro.periodo);
    if (filtro.dataInicio && filtro.dataFim) {
      params.append('dataInicio', filtro.dataInicio);
      params.append('dataFim', filtro.dataFim);
    }

    params.append('page', pagina);
    params.append('size', tamanhoPagina);

    try {
      const response = await fetch(`http://localhost:8080/api/v1/entradas?${params.toString()}`);
      const data = await response.json();
      setEntradas(data.content || []);
      setTotalPaginas(data.totalPages || 0);
    } catch (err) {
      console.error('Erro ao buscar entradas:', err);
    }
  }

  async function buscarProdutos() {
    try {
      const response = await fetch('http://localhost:8080/api/v1/produtos');
      const data = await response.json();
      setProdutos(data.content || []);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/entradas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          produto: { id: Number(form.produtoId) },
          quantidadeAdicionada: Number(form.quantidadeAdicionada),
          responsavel: form.responsavel,
          destino: form.destino,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao registrar entrada: ${response.status} - ${errorText}`);
      }

      setForm({ produtoId: '', quantidadeAdicionada: '', responsavel: '', destino: '' });
      closeModal();
      setPagina(0);
      buscarEntradas();
    } catch (err) {
      console.error('Erro ao registrar entrada:', err);
      alert('Erro ao registrar entrada. Verifique se você está logado como ADMIN.');
    }
  }

  function closeModal() {
    setClosing(true);
  }

  function handleAnimationEnd() {
    if (closing) {
      setModalOpen(false);
      setClosing(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-cinzaEscuro flex flex-col">
      <Navbar />

      {/* Seção de cabeçalho com gradiente */}
      <div className="bg-gradient-to-r from-verde to-verde/80 text-white px-6 md:px-10 py-8 shadow-lg">
        <h1 className="text-4xl font-bold">📥 Entradas de Produtos</h1>
        <p className="text-verde/90 mt-2">Registre e acompanhe todas as entradas de produtos</p>
      </div>

      {/* Botão de filtro */}
      <div className="flex justify-end max-w-8xl mx-auto w-[95%] mt-6">
        <button
          className="flex items-center gap-2 bg-verde text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all shadow-md font-semibold"
          onClick={() => setShowFiltros(!showFiltros)}
        >
          <span>🔍</span> Filtrar
        </button>
      </div>

      {/* Painel de filtros */}
      {showFiltros && (
        <div className="max-w-8xl mx-auto w-[95%] bg-white p-6 rounded-lg shadow-lg mt-4 border-l-4 border-verde">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Filtrar por ID do produto"
              value={filtro.produtoId}
              onChange={(e) => setFiltro({ ...filtro, produtoId: e.target.value })}
              className="px-4 py-2 border-2 border-cinzaClaro rounded-lg focus:border-verde focus:ring-2 focus:ring-verde/20"
            />
            <input
              type="text"
              placeholder="Filtrar por nome do produto"
              value={filtro.nome}
              onChange={(e) => setFiltro({ ...filtro, nome: e.target.value })}
              className="px-4 py-2 border-2 border-cinzaClaro rounded-lg focus:border-verde focus:ring-2 focus:ring-verde/20"
            />
            <select
              value={filtro.periodo}
              onChange={(e) => setFiltro({ ...filtro, periodo: e.target.value })}
              className="px-4 py-2 border-2 border-cinzaClaro rounded-lg focus:border-verde focus:ring-2 focus:ring-verde/20"
            >
              <option value="">Filtrar por período</option>
              <option value="semana">Última semana</option>
              <option value="mes">Último mês</option>
              <option value="ano">Último ano</option>
            </select>
            <input
              type="date"
              value={filtro.dataInicio}
              onChange={(e) => setFiltro({ ...filtro, dataInicio: e.target.value })}
              className="px-4 py-2 border-2 border-cinzaClaro rounded-lg focus:border-verde focus:ring-2 focus:ring-verde/20"
            />
            <input
              type="date"
              value={filtro.dataFim}
              onChange={(e) => setFiltro({ ...filtro, dataFim: e.target.value })}
              className="px-4 py-2 border-2 border-cinzaClaro rounded-lg focus:border-verde focus:ring-2 focus:ring-verde/20"
            />
          </div>
          <button
            onClick={() => {
              setPagina(0);
              buscarEntradas();
            }}
            className="mt-4 bg-gradient-to-r from-verde to-verde/80 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Aplicar filtros
          </button>
        </div>
      )}

      {/* Tabela */}
      <div className="flex-grow p-4 sm:p-6 md:p-8 max-w-8xl mx-auto w-[95%] animate-fade-in bg-cinzaClaro/30">
        <div className="bg-white rounded-xl shadow-2xl border-t-4 border-verde px-4 sm:px-8 py-6 w-full min-h-[70vh]">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed text-sm border-collapse">
              <thead className="bg-gradient-to-r from-azulMarinho to-azulMarinho/90 text-white text-sm font-semibold uppercase tracking-wide shadow-md">
                <tr>
                  <th className="px-4 py-3 text-left w-16">ID</th>
                  <th className="px-4 py-3 text-left w-40">Data/Hora</th>
                  <th className="px-4 py-3 text-left w-28">Quantidade</th>
                  <th className="px-4 py-3 text-left w-48">Produto</th>
                  <th className="px-4 py-3 text-left w-40">Categoria</th>
                  <th className="px-4 py-3 text-left w-28">Prateleira</th>
                  <th className="px-4 py-3 text-left w-40">Origem</th>
                </tr>
              </thead>
              <tbody>
                {entradas.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-cinzaEscuro/60">
                      📭 Nenhuma entrada encontrada.
                    </td>
                  </tr>
                ) : (
                  entradas.map((entrada, index) => (
                    <tr
                      key={entrada.id}
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-cinzaClaro/15'
                      } hover:bg-verde/5 transition border-l-4 border-verde/30`}
                    >
                      <td className="px-4 py-4 font-semibold">{entrada.id}</td>
                      <td className="px-4 py-4">{formatarDataHora(entrada.dataHora)}</td>
                      <td className="px-4 py-4">
                        <span className="bg-verde/10 text-verde font-semibold px-3 py-1 rounded-full">
                          {entrada.quantidadeAdicionada}
                        </span>
                      </td>
                      <td className="px-4 py-4">{entrada.produtoNome}</td>
                      <td className="px-4 py-4">{entrada.produtoCategoria}</td>
                      <td className="px-4 py-4">{entrada.produtoPrateleira}</td>
                      <td className="px-4 py-4">{entrada.produtoOrigem}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="flex justify-center items-center gap-2 py-6">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                onClick={() => setPagina(i)}
                className={`px-3 py-2 rounded-lg border-2 font-semibold transition-all ${
                  pagina === i
                    ? 'bg-gradient-to-r from-verde to-verde/80 text-white border-verde shadow-md'
                    : 'bg-white text-verde border-verde/50 hover:border-verde hover:bg-verde/5'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Botão flutuante de registrar entrada (somente ADMIN) */}
      {isAdmin() && (
        <button
          onClick={() => setModalOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-verde to-verde/80 text-white p-4 rounded-full shadow-2xl hover:shadow-2xl hover:scale-110 transition-all z-50 animate-bounce-in"
        >
          <span className="text-xl">+</span>
        </button>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            onAnimationEnd={handleAnimationEnd}
            className={`relative bg-white text-cinzaEscuro rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all border-t-4 border-verde ${
              closing ? 'animate-fadeOutDown' : 'animate-fadeInUp'
            }`}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-verde hover:text-verde/70 font-bold text-2xl transition"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-verde mb-6 text-center">
              ➕ Registrar Entrada
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold mb-2 text-azulMarinho">Produto</label>
                <select
                  name="produtoId"
                  value={form.produtoId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-cinzaClaro rounded-lg bg-white text-cinzaEscuro focus:border-verde focus:ring-2 focus:ring-verde/20 shadow-sm"
                  required
                >
                  <option value="" disabled>
                    Selecione um produto
                  </option>
                  {produtos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} — {p.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-azulMarinho">Quantidade</label>
                <input
                  type="number"
                  name="quantidadeAdicionada"
                  value={form.quantidadeAdicionada}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-cinzaClaro rounded-lg focus:border-verde focus:ring-2 focus:ring-verde/20"
                  placeholder="Digite a quantidade"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-azulMarinho">Responsável</label>
                <input
                  type="text"
                  name="responsavel"
                  value={form.responsavel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-cinzaClaro rounded-lg focus:border-verde focus:ring-2 focus:ring-verde/20"
                  placeholder="Ex: Pablo - RA: 84932942"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-azulMarinho">Destino</label>
                <input
                  type="text"
                  name="destino"
                  value={form.destino}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-cinzaClaro rounded-lg focus:border-verde focus:ring-2 focus:ring-verde/20"
                  placeholder="Ex: Sala de Aula"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-verde to-verde/80 hover:shadow-lg text-white font-semibold py-2 rounded-lg transition-all"
                >
                  ✓ Salvar Entrada
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-cinzaClaro hover:bg-cinzaClaro/80 text-cinzaEscuro font-semibold py-2 rounded-lg transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
