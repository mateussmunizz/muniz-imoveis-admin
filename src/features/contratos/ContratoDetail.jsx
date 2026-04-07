import styled from "styled-components";
import ContratoDataBox from "./ContratoDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

import { useContrato } from "./useContrato";
import { useDeleteContrato } from "./useDeleteContrato";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useSaida } from "../vistoria/useSaida";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function ContratoDetail() {
  const { contrato, isLoading } = useContrato();
  const { saida, isIniciogOut } = useSaida();
  const { deleteContrato, isDeleting } = useDeleteContrato();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!contrato) return <Empty resourceName="contrato" />;

  const { status, id: contratoId } = contrato;

  const statusToTagName = {
    unconfirmed: "blue",
    inicio: "green",
    saida: "silver",
  };

  const statusToPortuguese = {
    unconfirmed: "Pendente",
    inicio: "Ativo",
    saida: "Encerrado",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Contrato #{contratoId}</Heading>
          <Tag type={statusToTagName[status]}>
            {statusToPortuguese[status].toUpperCase()}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Voltar</ButtonText>
      </Row>

      <ContratoDataBox contrato={contrato} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/inicio/${contratoId}`)}>
            Assinar Contrato
          </Button>
        )}

        {status === "inicio" && (
          <Button onClick={() => saida(contratoId)} disabled={isIniciogOut}>
            Encerrar Contrato
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Excluir Contrato</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`contrato #${contratoId}`}
              disabled={isDeleting}
              onConfirm={() => {
                deleteContrato(contratoId, {
                  onSettled: () => navigate(-1),
                });
              }}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Voltar
        </Button>
      </ButtonGroup>
    </>
  );
}

export default ContratoDetail;
