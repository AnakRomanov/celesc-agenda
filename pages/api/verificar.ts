import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { isBusinessDay } from '../../lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { data, localidade, periodo } = req.body;

  if (!data || !localidade || !periodo) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios ausentes' });
  }

  const dataAgendamento = new Date(data);

  if (!isBusinessDay(dataAgendamento)) {
    return res.status(200).json({ disponivel: false, motivo: 'A data selecionada não é um dia útil.' });
  }

  const agendamentos = await prisma.agendamento.findMany({
    where: {
      dataAtual: dataAgendamento,
      localidade,
      periodoAtual: periodo,
    },
  });

  if (agendamentos.length >= 2) {
    return res.status(200).json({ disponivel: false, motivo: 'Limite de agendamentos atingido para este período.' });
  }

  return res.status(200).json({ disponivel: true });
}
