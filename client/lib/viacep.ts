export async function consultarCep(cep: string) {
  const cepLimpo = cep.replace(/\D/g, "");
  if (cepLimpo.length !== 8) throw new Error("CEP inválido");
  const resp = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  const data = await resp.json();
  if (data.erro) throw new Error("CEP não encontrado");
  return {
    estado: data.uf,
    cidade: data.localidade,
    bairro: data.bairro,
    rua: data.logradouro,
  };
}