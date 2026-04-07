import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nome Completo" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "Este campo é obrigatório" })}
        />
      </FormRow>

      <FormRow label="Endereço de E-mail" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Este campo é obrigatório",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Por favor, insira um e-mail válido",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Senha (mínimo de 8 caracteres)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "Este campo é obrigatório",
            minLength: {
              value: 8,
              message: "A senha precisa ter pelo menos 8 caracteres",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repetir Senha" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Este campo é obrigatório",
            validate: (value) =>
              value === getValues().password || "As senhas não coincidem",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancelar
        </Button>
        <Button disabled={isLoading}>Cadastrar Corretor</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
