import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import CreateImovelForm from "./CreateImovelForm";
import { useDeleteImovel } from "./useDeleteImovel";
import { formatCurrency } from "../../utils/helpers";
import { useCreateImovel } from "./useCreateImovel";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Imovel = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Capacity = styled.div`
  font-size: 1.4rem;
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

function ImovelRow({ imovel }) {
  const { isDeleting, deleteImovel } = useDeleteImovel();
  const { isCreating, createImovel } = useCreateImovel();

  const {
    id: imovelId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = imovel;

  function handleDuplicate() {
    createImovel({
      name: `Cópia de ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Imovel>{name}</Imovel>
      {/* ALTERAÇÃO AQUI: Mudado para 'Até X moradores' */}
      <Capacity>Até {maxCapacity} moradores</Capacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={imovelId} />

            <Menus.List id={imovelId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicar
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Editar</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Eliminar</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateImovelForm imovelToEdit={imovel} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="imóveis"
                disabled={isDeleting}
                onConfirm={() => deleteImovel(imovelId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ImovelRow;
