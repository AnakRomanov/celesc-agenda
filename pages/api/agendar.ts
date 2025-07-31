
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import { isDiaUtil, calcularDiasUteis } from '../../lib/diasUteis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' })
  }

  const {
    responsavel,
    email,
    localidade,
    data,
    periodo,
    numeroInstalacao,
    confirmacaoEmailSAP
  } = req.body

  if (!responsavel || !email || !localidade || !data || !periodo || !numeroInstalacao || confirmacaoEmailSAP !== true) {
    return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos e a confirmação do SAP deve ser marcada.' })
  }

  const dataAgendamento = new Date(data)
  const hoje = new Date()

  if (isNaN(dataAgendamento.getTime())) {
    return res.status(400).json({ erro: 'Data inválida.' })
  }

  if (!isDiaUtil(dataAgendamento)) {
    return res.status(400).json({ erro: 'A data selecionada não é um dia útil.' })
  }

  if (calcularDiasUteis(hoje, dataAgendamento) < 3) {
    return res.status(400).json({ erro: 'O agendamento deve ser feito com pelo menos 3 dias úteis de antecedência.' })
  }

  const agendamentosExistentes = await prisma.agendamento.findMany({
    where: {
      data,
      localidade,
      periodo
    }
  })

  if (agendamentosExistentes.length >= 2) {
    return res.status(400).json({ erro: 'Limite de agendamentos atingido para essa data, localidade e período.' })
  }

  const novoAgendamento = await prisma.agendamento.create({
    data: {
      responsavel,
      email,
      localidade,
      data,
      periodo,
      numeroInstalacao
    }
  })

  return res.status(200).json({ mensagem: 'Agendamento realizado com sucesso.', agendamento: novoAgendamento })
}
