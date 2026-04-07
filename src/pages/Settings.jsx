import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Configurações Gerais da Imobiliária</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
