import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minMesesContrato,
      maxMesesContrato,
      maxMoradores,
      taxaAdministracao,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Período mínimo de contrato (meses)">
        <Input
          type="number"
          id="min-meses"
          defaultValue={minMesesContrato}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minMesesContrato")}
        />
      </FormRow>

      <FormRow label="Período máximo de contrato (meses)">
        <Input
          type="number"
          id="max-meses"
          defaultValue={maxMesesContrato}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxMesesContrato")}
        />
      </FormRow>

      <FormRow label="Número máximo de moradores">
        <Input
          type="number"
          id="max-moradores"
          defaultValue={maxMoradores}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxMoradores")}
        />
      </FormRow>

      <FormRow label="Taxa de administração (%)">
        <Input
          type="number"
          id="taxa-adm"
          defaultValue={taxaAdministracao}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "taxaAdministracao")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
