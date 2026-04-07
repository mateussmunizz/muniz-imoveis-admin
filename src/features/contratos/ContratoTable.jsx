import ContratoRow from "./ContratoRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useContratos } from "./useContratos";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function ContratoTable() {
  const { contratos, isLoading, count } = useContratos();

  if (isLoading) return <Spinner />;
  if (!contratos.length) return <Empty resourceName="contratos" />;

  return (
    <Menus>
      {/* AQUI: Alargamos as colunas mudando os valores 'fr' (frações) */}
      <Table columns="1.4fr 2.2fr 2.4fr 1.2fr 1.6fr 3.2rem">
        <Table.Header>
          <div>Imóvel</div>
          <div>Inquilino & Contato</div>
          <div>Período</div>
          <div>Status</div>
          <div>Aluguel & Encargos</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={contratos}
          render={(contrato) => (
            <ContratoRow key={contrato.id} contrato={contrato} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ContratoTable;
