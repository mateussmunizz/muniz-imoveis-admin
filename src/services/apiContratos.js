import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getContratos({ filter, sortBy, page }) {
  let query = supabase
    .from("contratos")
    .select(
      "id, created_at, startDate, endDate, numMeses, numGuests, status, totalPrice, imoveis(name), clientes(fullName, email)",
      { count: "exact" },
    );

  // FILTER
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Contratos não puderam ser carregados");
  }

  return { data, count };
}

export async function getContrato(id) {
  const { data, error } = await supabase
    .from("contratos")
    .select("*, imoveis(*), clientes(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Contrato não encontrado");
  }

  return data;
}

export async function getContratosAfterDate(date) {
  const { data, error } = await supabase
    .from("contratos")
    .select("created_at, totalPrice, extrasPrice, startDate")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Contratos não puderam ser carregados");
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("contratos")
    .select("*, clientes(fullName)")
    .gte("endDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Contratos não puderam ser carregados");
  }

  return data;
}

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("contratos")
    .select("*, clientes(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.inicio,endDate.eq.${getToday()})`,
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Atividades de hoje não puderam ser carregadas");
  }
  return data;
}

export async function updateContrato(id, obj) {
  const { data, error } = await supabase
    .from("contratos")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Contrato não pôde ser atualizado");
  }
  return data;
}

export async function deleteContrato(id) {
  const { data, error } = await supabase
    .from("contratos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Contrato não pôde ser deletado");
  }

  return data;
}

export async function createContrato(newContrato) {
  const { data, error } = await supabase
    .from("contratos")
    .insert([{ ...newContrato, status: "unconfirmed", isPaid: false }])
    .select()
    .single();

  if (error) throw new Error("A locação não pôde ser registrada");
  return data;
}
