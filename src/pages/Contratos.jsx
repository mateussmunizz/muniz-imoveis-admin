import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ContratoTable from "../features/contratos/ContratoTable";
import ContratoTableOperations from "../features/contratos/ContratoTableOperations";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CreateClienteForm from "../features/clientes/CreateClienteForm";
import CreateContratoForm from "../features/contratos/CreateContratoForm";

function Contratos() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Todos os Contratos</Heading>
        <ContratoTableOperations />
      </Row>

      <Row>
        <ContratoTable />

        <div style={{ display: "flex", gap: "1.6rem" }}>
          <Modal>
            <Modal.Open opens="novo-inquilino">
              <Button>+ Cadastrar Inquilino</Button>
            </Modal.Open>
            <Modal.Window name="novo-inquilino">
              <CreateClienteForm />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="novo-contrato">
              <Button>+ Novo Contrato (Locação)</Button>
            </Modal.Open>
            <Modal.Window name="novo-contrato">
              <CreateContratoForm />
            </Modal.Window>
          </Modal>
        </div>
      </Row>
    </>
  );
}

export default Contratos;
