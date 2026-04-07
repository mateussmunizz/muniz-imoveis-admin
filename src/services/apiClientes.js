import supabase from "./supabase";

export async function createCliente(newCliente) {
  const { data, error } = await supabase
    .from("clientes")
    .insert([{ ...newCliente }])
    .select()
    .single();

  if (error) throw new Error("O inquilino não pôde ser cadastrado");
  return data;
}

export async function getClientes() {
  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .order("fullName");

  if (error) throw new Error("Inquilinos não puderam ser carregados");
  return data;
}
