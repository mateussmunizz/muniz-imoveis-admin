import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function ImovelTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "Todos" },
          { value: "no-discount", label: "Sem desconto" },
          { value: "with-discount", label: "Com desconto" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Ordenar por nome (A-Z)" },
          { value: "name-desc", label: "Ordenar por nome (Z-A)" },
          {
            value: "regularPrice-asc",
            label: "Ordenar por preço (menor primeiro)",
          },
          {
            value: "regularPrice-desc",
            label: "Ordenar por preço (maior primeiro)",
          },
          {
            value: "maxCapacity-asc",
            label: "Ordenar por capacidade (menor primeiro)",
          },
          {
            value: "maxCapacity-desc",
            label: "Ordenar por capacidade (maior primeiro)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default ImovelTableOperations;
