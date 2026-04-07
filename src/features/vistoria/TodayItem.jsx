import styled from "styled-components";
import { Link } from "react-router-dom";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, clientes, numMeses } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Assinar</Tag>}
      {status === "inicio" && <Tag type="blue">Encerrar</Tag>}

      <Flag
        src={clientes.countryFlag}
        alt={`Bandeira de ${clientes.nationality}`}
      />
      <Guest>{clientes.fullName}</Guest>
      <div>{numMeses} meses</div>

      {status === "unconfirmed" && (
        <Button size="small" variant="primary" as={Link} to={`/inicio/${id}`}>
          Assinar
        </Button>
      )}
      {status === "inicio" && (
        <Button size="small" variant="primary" as={Link} to={`/vistoria/${id}`}>
          Encerrar
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
