export function filtrarVagas(vagas, termo) {
  const t = termo.trim().toLowerCase();
  if (t === "") return vagas;

  return vagas.filter((vaga) =>
    [vaga.titulo, vaga.tipo, vaga.departamento, vaga.descricao, vaga.modalidade]
      .filter(Boolean)
      .some((campo) => campo.toLowerCase().includes(t))
  );
}

function BarraPesquisa({ valor, onChange, placeholder }) {
  return (
    <input
      placeholder={placeholder || "pesquise por vagas"}
      value={valor}
      onChange={(e) => onChange(e.target.value)}
    ></input>
  );
}

export default BarraPesquisa;
