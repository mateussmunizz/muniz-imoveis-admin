import Spinner from "../../ui/Spinner";
import ImovelRow from "./ImovelRow";
import { useImoveis } from "./useImoveis";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function ImovelTable() {
  const { isLoading, imoveis } = useImoveis();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const imoveisValidos = imoveis || [];

  if (!imoveisValidos.length) return <Empty resourceName="imóveis" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";
  let filteredImoveis;
  if (filterValue === "all") filteredImoveis = imoveisValidos; // Use a variável blindada
  if (filterValue === "no-discount")
    filteredImoveis = imoveisValidos.filter((imovel) => imovel.discount === 0); // Use a variável blindada
  if (filterValue === "with-discount")
    filteredImoveis = imoveisValidos.filter((imovel) => imovel.discount > 0);

  // 2) ORDENAÇÃO
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedImoveis = filteredImoveis.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Imóvel</div>
          <div>Capacidade</div>
          <div>Preço</div>
          <div>Desconto</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedImoveis}
          render={(imovel) => <ImovelRow imovel={imovel} key={imovel.id} />}
        />
      </Table>
    </Menus>
  );
}

export default ImovelTable;
