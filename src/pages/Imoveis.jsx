import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ImovelTable from "../features/imoveis/ImovelTable";
import AddImovel from "../features/imoveis/AddImovel";
import ImovelTableOperations from "../features/imoveis/ImovelTableOperations";

function Imoveis() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Todos os Imóveis</Heading>
        <ImovelTableOperations />
      </Row>

      <Row>
        <ImovelTable />
        <AddImovel />
      </Row>
    </>
  );
}

export default Imoveis;
