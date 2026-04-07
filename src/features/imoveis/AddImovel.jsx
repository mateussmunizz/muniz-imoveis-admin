import Button from "../../ui/Button";
import CreateImovelForm from "./CreateImovelForm";
import Modal from "../../ui/Modal";

function AddImovel() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="imovel-form">
          <Button>Adicionar Novo Imóvel</Button>
        </Modal.Open>
        <Modal.Window name="imovel-form">
          <CreateImovelForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddImovel;
