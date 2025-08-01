import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { isDiaUtil, calcularDiasUteis } from '@/lib/diasUteis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { responsavel, numeroInstalacao, dataSelecionada, confirmacaoEmailSAP } = req.body

  if (!responsavel || !numeroInstalacao || !dataSelecionada || !confirmacaoEmailSAP) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
  }

  const data = new Date(dataSelecionada)
  const hoje = new Date()

  if (!isDiaUtil(data)) {
    return res.status(400).json({ error: 'A data selecionada não é um dia útil' })
  }

  const diasUteisAntecedencia = calcularDiasUteis(hoje, data)
  if (diasUteisAntecedencia < 3) {
    return res.status(400).json({ error: 'A data deve ter pelo menos 3 dias úteis de antecedência' })
  }

  const agendamentosNoDia = await prisma.agendamento.findMany({
    where: {
      data: data,
      numeroInstalacao: numeroInstalacao
    }
  })

  if (agendamentosNoDia.length >= 2) {
    return res.status(400).json({ error: 'Limite de agendamentos atingido para essa data e instalação' })
  }

  const novoAgendamento = await prisma.agendamento.create({
    data: {
      responsavel,
      numeroInstalacao,
      data: data,
      confirmacaoEmailSAP
    }
  })

  return res.status(200).json({ message: 'Agendamento realizado com sucesso', agendamento: novoAgendamento })
}
