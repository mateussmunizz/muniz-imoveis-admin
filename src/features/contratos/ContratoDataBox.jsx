import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledContratoDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Inquilino = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function ContratoDataBox({ contrato }) {
  if (!contrato) return null;

  const {
    created_at,
    startDate,
    endDate,
    numMeses,
    numGuests,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    clientes,
    imoveis,
    // EXTRAINDO AS NOVAS COLUNAS DO BANCO:
    valorCondominio,
    valorIptu,
    valorSeguro,
    valorTaxas,
  } = contrato;

  const imovelName = imoveis?.name || "Imóvel Removido";
  const imovelEndereco = imoveis?.endereco || "Endereço não cadastrado";
  const clienteName = clientes?.fullName || "Inquilino Removido";
  const email = clientes?.email || "";
  const telefone = clientes?.telefone || "Sem telefone"; // <-- Novo
  const nationality = clientes?.nationality || "";
  const countryFlag = clientes?.countryFlag || "";
  const nationalID = clientes?.nationalID || "";

  // Somando os encargos
  const totalEncargos =
    (valorCondominio || 0) +
    (valorIptu || 0) +
    (valorSeguro || 0) +
    (valorTaxas || 0);

  return (
    <StyledContratoDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <div>
            <p>
              {numMeses} meses de contrato em <span>{imovelName}</span>
            </p>
            <p
              style={{
                fontSize: "1.4rem",
                color: "#e0e7ff",
                marginTop: "4px",
                fontWeight: "400",
              }}
            >
              📍 {imovelEndereco}
            </p>
          </div>
        </div>
        <p>
          {format(new Date(startDate), "EEE, dd/MM/yyyy")} &mdash;{" "}
          {format(new Date(endDate), "EEE, dd/MM/yyyy")}
        </p>
      </Header>

      <Section>
        <Inquilino>
          {countryFlag && (
            <Flag src={countryFlag} alt={`Bandeira de ${nationality}`} />
          )}
          <p>{clienteName}</p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>{telefone}</p>
          <span>&bull;</span>
          <p>CPF/RG: {nationalID}</p>
        </Inquilino>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observações"
          >
            {observations}
          </DataItem>
        )}

        {totalEncargos > 0 && (
          <DataItem
            icon={<HiOutlineCurrencyDollar />}
            label="Encargos Mensais Extras"
          >
            Condomínio: {formatCurrency(valorCondominio)} | IPTU:{" "}
            {formatCurrency(valorIptu)} | Seguro: {formatCurrency(valorSeguro)}{" "}
            | Água/Luz: {formatCurrency(valorTaxas)}
          </DataItem>
        )}

        <Price isPaid={isPaid}>
          <DataItem
            icon={<HiOutlineCurrencyDollar />}
            label={`Valor do Aluguel`}
          >
            {formatCurrency(totalPrice)}
          </DataItem>
          <p>{isPaid ? "Pago" : "Pagamento Pendente"}</p>
        </Price>
      </Section>

      <Footer>
        <p>
          Contrato gerado em {format(new Date(created_at), "dd/MM/yyyy HH:mm")}
        </p>
      </Footer>
    </StyledContratoDataBox>
  );
}

export default ContratoDataBox;
