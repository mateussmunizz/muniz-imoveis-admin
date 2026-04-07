import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import ButtonGroup from "../../ui/ButtonGroup";
import Spinner from "../../ui/Spinner";
import { useCreateContrato } from "./useCreateContrato";
import { useImoveis } from "../imoveis/useImoveis";
import { useClientes } from "../clientes/useClientes";

const Select = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function CreateContratoForm({ onCloseModal }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      cabinId: "",
      guestId: "",
      numMeses: "",
      startDate: "",
      endDate: "",
      totalPrice: "",
      valorCondominio: 0,
      valorIptu: 0,
      valorSeguro: 0,
      valorTaxas: 0,
      tipoGarantia: "deposito",
      valorGarantia: 0,
    },
  });

  const { isCreating, createContrato } = useCreateContrato();
  const { imoveis, isLoading: isLoadingImoveis } = useImoveis();
  const { clientes, isLoading: isLoadingClientes } = useClientes();

  const numMesesWatch = watch("numMeses");
  const startDateWatch = watch("startDate");

  // Automação: Calcula a Data Final automaticamente
  useEffect(() => {
    if (startDateWatch && numMesesWatch) {
      const date = new Date(startDateWatch);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

      adjustedDate.setMonth(adjustedDate.getMonth() + Number(numMesesWatch));
      adjustedDate.setDate(adjustedDate.getDate() - 1);

      const formattedEndDate = adjustedDate.toISOString().split("T")[0];
      setValue("endDate", formattedEndDate);
    }
  }, [startDateWatch, numMesesWatch, setValue]);

  if (isLoadingImoveis || isLoadingClientes) return <Spinner />;

  function onSubmit(data) {
    const contratoData = {
      cabinId: Number(data.cabinId),
      guestId: Number(data.guestId),
      startDate: data.startDate,
      endDate: data.endDate,
      numMeses: Number(data.numMeses),
      totalPrice: Number(data.totalPrice),
      valorCondominio: Number(data.valorCondominio),
      valorIptu: Number(data.valorIptu),
      valorSeguro: Number(data.valorSeguro),
      valorTaxas: Number(data.valorTaxas),
      tipoGarantia: data.tipoGarantia,
      valorGarantia: Number(data.valorGarantia),
      numGuests: 1,
      hasBreakfast: false,
      extrasPrice: 0,
      observations: data.observations || "",
    };

    createContrato(contratoData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Imóvel">
        <Select
          id="cabinId"
          disabled={isCreating}
          {...register("cabinId", { required: true })}
        >
          <option value="">Selecione um imóvel...</option>
          {imoveis?.map((imovel) => (
            <option key={imovel.id} value={imovel.id}>
              {imovel.name} - {imovel.endereco}
            </option>
          ))}
        </Select>
      </FormRow>

      <FormRow label="Inquilino">
        <Select
          id="guestId"
          disabled={isCreating}
          {...register("guestId", { required: true })}
        >
          <option value="">Selecione um inquilino...</option>
          {clientes?.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.fullName} ({cliente.nationalID})
            </option>
          ))}
        </Select>
      </FormRow>

      <FormRow label="Duração (Meses)">
        <Select
          id="numMeses"
          disabled={isCreating}
          {...register("numMeses", { required: true })}
        >
          <option value="">Selecione o prazo...</option>
          <option value="12">12 Meses</option>
          <option value="24">24 Meses</option>
          <option value="30">30 Meses</option>
          <option value="36">36 Meses</option>
          <option value="48">48 Meses</option>
          <option value="60">60 Meses</option>
        </Select>
      </FormRow>

      <FormRow label="Data de Início">
        <Input
          type="date"
          id="startDate"
          disabled={isCreating}
          {...register("startDate", { required: true })}
        />
      </FormRow>

      <FormRow label="Data de Fim (Calculada)">
        <Input
          type="date"
          id="endDate"
          disabled={isCreating}
          {...register("endDate", { required: true })}
        />
      </FormRow>

      <FormRow label="Valor do Aluguel (R$)">
        <Input
          type="number"
          step="0.01"
          id="totalPrice"
          disabled={isCreating}
          {...register("totalPrice", { required: true })}
        />
      </FormRow>

      <FormRow label="Condomínio (R$)">
        <Input
          type="number"
          step="0.01"
          id="valorCondominio"
          disabled={isCreating}
          {...register("valorCondominio")}
        />
      </FormRow>

      <FormRow label="IPTU (R$)">
        <Input
          type="number"
          step="0.01"
          id="valorIptu"
          disabled={isCreating}
          {...register("valorIptu")}
        />
      </FormRow>

      <FormRow label="Seguro Fiança (R$)">
        <Input
          type="number"
          step="0.01"
          id="valorSeguro"
          disabled={isCreating}
          {...register("valorSeguro")}
        />
      </FormRow>

      <FormRow label="Taxas (Água/Luz) (R$)">
        <Input
          type="number"
          step="0.01"
          id="valorTaxas"
          disabled={isCreating}
          {...register("valorTaxas")}
        />
      </FormRow>

      <FormRow label="Forma de Garantia">
        <Select
          id="tipoGarantia"
          disabled={isCreating}
          {...register("tipoGarantia")}
        >
          <option value="deposito">Depósito Caução</option>
          <option value="fiador">Fiador</option>
          <option value="seguro">Seguro Fiança</option>
        </Select>
      </FormRow>

      <FormRow label="Valor da Garantia (R$)">
        <Input
          type="number"
          step="0.01"
          id="valorGarantia"
          disabled={isCreating}
          {...register("valorGarantia")}
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
        <Button disabled={isCreating}>Salvar Contrato</Button>
      </ButtonGroup>
    </Form>
  );
}

export default CreateContratoForm;
