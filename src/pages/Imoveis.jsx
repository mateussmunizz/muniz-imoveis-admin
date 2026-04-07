import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ImovelTable from "../features/Imoveis/ImovelTable";
import AddImovel from "../features/Imoveis/AddImovel";
import ImovelTableOperations from "../features/Imoveis/ImovelTableOperations";

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
