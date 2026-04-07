import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function ContratoTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "Tudo" },
          { value: "saida", label: "Encerrado" },
          { value: "inicio", label: "Ativo" },
          { value: "unconfirmed", label: "Pendente" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Ordenar por data (mais recente)" },
          { value: "startDate-asc", label: "Ordenar por data (mais antiga)" },
          {
            value: "totalPrice-desc",
            label: "Ordenar por valor (maior primeiro)",
          },
          {
            value: "totalPrice-asc",
            label: "Ordenar por valor (menor primeiro)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default ContratoTableOperations;
