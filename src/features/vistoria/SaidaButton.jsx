import Button from "../../ui/Button";
import { useSaida } from "./useSaida";

function SaidaButton({ contratoId }) {
  const { saida, isIniciogOut } = useSaida();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => saida(contratoId)}
      disabled={isIniciogOut}
    >
      Check out
    </Button>
  );
}

export default SaidaButton;
