import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase
    .from("configuracoes") // <-- Tabela traduzida
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("As configurações não puderam ser carregadas");
  }
  return data;
}

// Passamos um objeto de nova configuração, por exemplo { minBookingLength: 3 }
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("configuracoes")
    .update(newSetting)

    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("As configurações não puderam ser atualizadas");
  }
  return data;
}
