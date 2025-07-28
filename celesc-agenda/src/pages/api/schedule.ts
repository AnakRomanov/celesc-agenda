import { PrismaClient } from "@prisma/client";
import { isDiaUtil, adicionarDiasUteis } from "../../lib/utils";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { numeroNota, nomeSolicitante, localidade, data, periodo } = req.body;
  const dataSelecionada = new Date(data);

  if (!isDiaUtil(dataSelecionada)) {
    return res.status(400).json({ error: "Escolha um dia útil." });
  }

  const hojeMais3 = adicionarDiasUteis(new Date(), 3);
  if (dataSelecionada < hojeMais3) {
    return res.status(400).json({ error: "Agende com pelo menos 3 dias úteis de antecedência." });
  }

  const count = await prisma.agendamento.count({
    where: { localidade, dataAtual: dataSelecionada, periodoAtual: periodo }
  });

  if (count >= 2) {
    return res.status(400).json({ error: "Limite de 2 agendamentos por período/localidade." });
  }

  const agendamento = await prisma.agendamento.create({
    data: {
      numeroNota,
      nomeSolicitante,
      localidade,
      dataOriginal: dataSelecionada,
      periodoOriginal: periodo,
      dataAtual: dataSelecionada,
      periodoAtual: periodo,
    },
  });

  res.json(agendamento);
}