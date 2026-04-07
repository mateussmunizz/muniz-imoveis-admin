import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import ButtonGroup from "../../ui/ButtonGroup";
import { useCreateCliente } from "./useCreateCliente";

function CreateClienteForm({ onCloseModal }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      dataNascimento: "",
      nationalID: "",
      rg: "",
      email: "",
      telefone: "",
    },
  });

  const { isCreating, createCliente } = useCreateCliente();

  function onSubmit(data) {
    createCliente(
      {
        ...data,
        countryFlag: "https://flagcdn.com/br.svg",
        nationality: "Brasil",
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Nome Completo">
        <Input
          type="text"
          id="fullName"
          disabled={isCreating}
          {...register("fullName", { required: true })}
        />
      </FormRow>

      <FormRow label="E-mail">
        <Input
          type="email"
          id="email"
          disabled={isCreating}
          {...register("email", { required: true })}
        />
      </FormRow>

      <FormRow label="Telefone / WhatsApp">
        <Input
          type="tel"
          id="telefone"
          disabled={isCreating}
          {...register("telefone", { required: true })}
        />
      </FormRow>

      <FormRow label="Data de Nascimento">
        <Input
          type="date"
          id="dataNascimento"
          disabled={isCreating}
          {...register("dataNascimento", { required: true })}
        />
      </FormRow>

      <FormRow label="CPF">
        <Input
          type="text"
          id="nationalID"
          placeholder="000.000.000-00"
          disabled={isCreating}
          {...register("nationalID", { required: true })}
        />
      </FormRow>

      <FormRow label="RG">
        <Input
          type="text"
          id="rg"
          disabled={isCreating}
          {...register("rg", { required: true })}
        />
      </FormRow>

      <ButtonGroup>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancelar
        </Button>
        <Button disabled={isCreating}>Cadastrar Inquilino</Button>
      </ButtonGroup>
    </Form>
  );
}

export default CreateClienteForm;
