// Funções de API do frontend

export async function importProductsApi(formData) {
  const token = localStorage.getItem("token"); // se você usa JWT
  const response = await fetch("/api/products/import", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Falha ao importar produtos");
  }

  return await response.json(); // { importedCount, errors }
}
