import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiEye,
  HiOutlineArrowDownOnSquare,
  HiOutlineArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useDeleteContrato } from "./useDeleteContrato";

const Imovel = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function ContratoRow({
  contrato: {
    id: contratoId,
    startDate,
    endDate,
    numMeses,
    totalPrice,
    status,
    clientes,
    imoveis,
    // Pegando as colunas de encargos do banco
    valorCondominio,
    valorIptu,
    valorSeguro,
    valorTaxas,
  },
}) {
  const navigate = useNavigate();
  const { deleteContrato, isDeleting } = useDeleteContrato();

  const statusToTagName = {
    unconfirmed: "blue",
    inicio: "green",
    saida: "silver",
  };

  const statusToText = {
    unconfirmed: "PENDENTE",
    inicio: "ATIVO",
    saida: "ENCERRADO",
  };

  const imovelName = imoveis?.name || "Imóvel Removido";
  const clienteName = clientes?.fullName || "Inquilino Removido";
  const email = clientes?.email || "";
  const telefone = clientes?.telefone || "";

  // Somando os encargos extras
  const totalEncargos =
    (valorCondominio || 0) +
    (valorIptu || 0) +
    (valorSeguro || 0) +
    (valorTaxas || 0);

  return (
    <Table.Row>
      <Imovel>{imovelName}</Imovel>

      <Stacked>
        <span>{clienteName}</span>

        <span>
          {telefone ? `${telefone} • ` : ""}
          {email}
        </span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Hoje"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numMeses} meses
        </span>
        <span>
          {format(new Date(startDate), "dd/MM/yyyy")} &mdash;{" "}
          {format(new Date(endDate), "dd/MM/yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{statusToText[status]}</Tag>

      <Stacked>
        <Amount>{formatCurrency(totalPrice)}</Amount>

        {totalEncargos > 0 && (
          <span>+ {formatCurrency(totalEncargos)} (Taxas)</span>
        )}
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={contratoId} />
          <Menus.List id={contratoId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/contratos/${contratoId}`)}
            >
              Ver detalhes
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiOutlineArrowDownOnSquare />}
                onClick={() => navigate(`/inicio/${contratoId}`)}
              >
                Assinar
              </Menus.Button>
            )}

            {status === "inicio" && (
              <Menus.Button
                icon={<HiOutlineArrowUpOnSquare />}
                onClick={() => navigate(`/vistoria/${contratoId}`)}
              >
                Encerrar
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Deletar</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="contrato"
            disabled={isDeleting}
            onConfirm={() => deleteContrato(contratoId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ContratoRow;
