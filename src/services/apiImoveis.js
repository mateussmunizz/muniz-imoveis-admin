import supabase, { supabaseUrl } from "./supabase";

export async function getImoveis() {
  const { data, error } = await supabase.from("imoveis").select("*");

  if (error) {
    console.error(error);
    throw new Error("Os imóveis não puderam ser carregados");
  }

  return data;
}

export async function createEditImovel(newImovel, id) {
  const hasImagePath = newImovel.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newImovel.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newImovel.image
    : `${supabaseUrl}/storage/v1/object/public/imovel-images/${imageName}`;

  let query = supabase.from("imoveis");

  // A) CRIAR
  if (!id) query = query.insert([{ ...newImovel, image: imagePath }]);

  // B) EDITAR
  if (id) query = query.update({ ...newImovel, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("O imóvel não pôde ser criado");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("imovel-images")
    .upload(imageName, newImovel.image);

  if (storageError) {
    await supabase.from("imoveis").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("A imagem não pôde ser enviada e o imóvel não foi criado");
  }

  return data;
}

export async function deleteImovel(id) {
  const { data, error } = await supabase.from("imoveis").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("O imóvel não pôde ser deletado");
  }

  return data;
}
