import styled from "styled-components";
import ContratoDataBox from "../contratos/ContratoDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useContrato } from "../contratos/useContrato";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useInicio } from "./useInicio";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function InicioContrato() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addAdminFee, setAddAdminFee] = useState(false);

  const { contrato, isLoading } = useContrato();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => setConfirmPaid(contrato?.isPaid ?? false), [contrato]);

  const moveBack = useMoveBack();
  const { inicio, isIniciogIn } = useInicio();

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (!contrato) return <p>Contrato não encontrado.</p>;

  const { id: contratoId, clientes, totalPrice, hasBreakfast } = contrato;

  const inquilinoName = clientes?.fullName || "Inquilino não identificado";

  const taxaAdministracao = settings?.taxaAdministracao || 8;
  const valorAluguel = totalPrice;
  const comissaoCorretagem = valorAluguel;

  function handleInicio() {
    if (!confirmPaid) return;

    if (addAdminFee) {
      inicio({
        contratoId,
        breakfast: {
          hasBreakfast: true,

          extrasPrice: comissaoCorretagem,

          totalPrice: valorAluguel,
        },
      });
    } else {
      inicio({ contratoId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Assinar contrato #{contratoId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Voltar</ButtonText>
      </Row>

      <ContratoDataBox contrato={contrato} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addAdminFee}
            onChange={() => {
              setAddAdminFee((add) => !add);
              setConfirmPaid(false);
            }}
            id="admin-fee"
          >
            Reter 100% do 1º aluguel como Comissão de Corretagem da Imobiliária
            ({formatCurrency(comissaoCorretagem)})? (A taxa de{" "}
            {taxaAdministracao}% será aplicada apenas aos repasses dos meses
            seguintes).
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isIniciogIn}
          id="confirm"
        >
          Confirmo que {inquilinoName} realizou o pagamento inicial do 1º
          aluguel no valor total de {formatCurrency(valorAluguel)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleInicio} disabled={!confirmPaid || isIniciogIn}>
          Confirmar Início de Contrato #{contratoId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Voltar
        </Button>
      </ButtonGroup>
    </>
  );
}

export default InicioContrato;
