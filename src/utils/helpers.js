import { formatDistance, parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDistanceFromNow = (dateStr) =>
  formatDistanceToNow(parseISO(dateStr), {
    addSuffix: true,
    locale: ptBR,
  });

export const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const getToday = function (options = {}) {
  const today = new Date();
  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};
