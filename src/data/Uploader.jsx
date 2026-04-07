import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { contratos } from "./data-contratos";
import { Imoveis } from "./data-Imoveis";
import { clientes } from "./data-clientes";

// const originalSettings = {
//   minContratoLength: 3,
//   maxContratoLength: 30,
//   maxClientesPerContrato: 10,
//   breakfastPrice: 15,
// };

async function deleteClientes() {
  const { error } = await supabase.from("clientes").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteImoveis() {
  const { error } = await supabase.from("Imoveis").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteContratos() {
  const { error } = await supabase.from("contratos").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createClientes() {
  const { error } = await supabase.from("clientes").insert(clientes);
  if (error) console.log(error.message);
}

async function createImoveis() {
  const { error } = await supabase.from("Imoveis").insert(Imoveis);
  if (error) console.log(error.message);
}

async function createContratos() {
  // Contratos need a clienteId and a imovelId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all clienteIds and imovelIds, and then replace the original IDs in the contrato data with the actual ones from the DB
  const { data: clientesIds } = await supabase
    .from("clientes")
    .select("id")
    .order("id");
  const allClienteIds = clientesIds.map((imovel) => imovel.id);
  const { data: ImoveisIds } = await supabase
    .from("Imoveis")
    .select("id")
    .order("id");
  const allImovelIds = ImoveisIds.map((imovel) => imovel.id);

  const finalContratos = contratos.map((contrato) => {
    // Here relying on the order of Imoveis, as they don't have and ID yet
    const imovel = Imoveis.at(contrato.imovelId - 1);
    const numNights = subtractDates(contrato.endDate, contrato.startDate);
    const imovelPrice = numNights * (imovel.regularPrice - imovel.discount);
    const extrasPrice = contrato.hasBreakfast
      ? numNights * 15 * contrato.numClientes
      : 0; // hardcoded breakfast price
    const totalPrice = imovelPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(contrato.endDate)) &&
      !isToday(new Date(contrato.endDate))
    )
      status = "saida";
    if (
      isFuture(new Date(contrato.startDate)) ||
      isToday(new Date(contrato.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(contrato.endDate)) ||
        isToday(new Date(contrato.endDate))) &&
      isPast(new Date(contrato.startDate)) &&
      !isToday(new Date(contrato.startDate))
    )
      status = "inicio";

    return {
      ...contrato,
      numNights,
      imovelPrice,
      extrasPrice,
      totalPrice,
      clienteId: allClienteIds.at(contrato.clienteId - 1),
      imovelId: allImovelIds.at(contrato.imovelId - 1),
      status,
    };
  });

  console.log(finalContratos);

  const { error } = await supabase.from("contratos").insert(finalContratos);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Contratos need to be deleted FIRST
    await deleteContratos();
    await deleteClientes();
    await deleteImoveis();

    // Contratos need to be created LAST
    await createClientes();
    await createImoveis();
    await createContratos();

    setIsLoading(false);
  }

  async function uploadContratos() {
    setIsLoading(true);
    await deleteContratos();
    await createContratos();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadContratos} disabled={isLoading}>
        Upload contratos ONLY
      </Button>
    </div>
  );
}

export default Uploader;
