import React, { useState } from "react";
import { importProductsApi } from "../services/api";

export default function AddProductModal({ onClose, onProductAdded }) {
  const [step, setStep] = useState("choice"); // choice, individual, import
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [importedCount, setImportedCount] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await importProductsApi(formData);
      setImportedCount(result.importedCount);
      setErrors(result.errors);
    } catch (err) {
      alert("Erro ao importar planilha: " + err.message);
    }
  };

  const renderChoice = () => (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Novo Produto</h2>
      <button
        onClick={() => setStep("individual")}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Adicionar Produto Individual
      </button>
      <button
        onClick={() => setStep("import")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Importar Planilha
      </button>
    </div>
  );

  const renderImport = () => (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Importar Planilha Excel</h2>
      <input type="file" accept=".xlsx,.csv" onChange={handleFileChange} />
      <button
        onClick={handleImport}
        className="bg-green-600 text-white px-4 py-2 rounded mt-2"
      >
        Enviar
      </button>
      {importedCount > 0 && (
        <p className="mt-2 text-green-700">{importedCount} produtos importados!</p>
      )}
      {errors.length > 0 && (
        <div className="mt-2 text-red-700">
          <p>Erros:</p>
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => setStep("choice")}
        className="mt-4 underline text-blue-600"
      >
        Voltar
      </button>
    </div>
  );

  const renderIndividual = () => (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Adicionar Produto Individual</h2>
      {/* Aqui você pode incluir o formulário existente */}
      <p>Formulário existente vai aqui...</p>
      <button
        onClick={() => setStep("choice")}
        className="mt-4 underline text-blue-600"
      >
        Voltar
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {step === "choice" && renderChoice()}
        {step === "individual" && renderIndividual()}
        {step === "import" && renderImport()}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          X
        </button>
      </div>
    </div>
  );
}
