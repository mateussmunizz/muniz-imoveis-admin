import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateImovel } from "./useCreateImovel";
import { useEditImovel } from "./useEditImovel";

function CreateImovelForm({ imovelToEdit = {}, onCloseModal }) {
  const { isCreating, createImovel } = useCreateImovel();
  const { isEditing, editImovel } = useEditImovel();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = imovelToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editImovel(
        { newImovelData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createImovel(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
  }

  function onError(errors) {
    // Tratamento de erros pode ser feito aqui
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Nome do Imóvel" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Este campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow
        label="Capacidade Máxima (Pessoas)"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "Este campo é obrigatório",
            min: {
              value: 1,
              message: "A capacidade deve ser de pelo menos 1 pessoa",
            },
          })}
        />
      </FormRow>

      <FormRow label="Preço do Aluguel" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Este campo é obrigatório",
            min: {
              value: 1,
              message: "O preço deve ser no mínimo 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Desconto Mensal" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "Este campo é obrigatório",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "O desconto deve ser menor que o valor do aluguel",
          })}
        />
      </FormRow>

      <FormRow label="Descrição do Imóvel" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "Este campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow label="Foto do Imóvel">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Este campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancelar
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Salvar alterações" : "Cadastrar Imóvel"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateImovelForm;
