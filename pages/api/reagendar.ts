import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import { isBusinessDay, countBusinessDays } from '../../lib/utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { numeroNota, novaData, novoPeriodo } = req.body

  if (!numeroNota || !novaData || !novoPeriodo) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
  }

  try {
    const agendamento = await prisma.agendamento.findUnique({
      where: { numeroNota }
    })

    if (!agendamento) {
      return res.status(404).json({ error: 'Agendamento não encontrado' })
    }

    if (agendamento.quantidadeReagendamentos >= 1) {
      return res.status(400).json({ error: 'Reagendamento já realizado (1/1)' })
    }

    const hoje = new Date()
    const dataOriginal = new Date(agendamento.dataOriginal)
    const novaDataObj = new Date(novaData)

    const diasUteis = countBusinessDays(hoje, dataOriginal)
    if (diasUteis < 3) {
      return res.status(400).json({ error: 'Reagendamento não permitido: faltam menos de 3 dias úteis para a data original' })
    }

    if (!isBusinessDay(novaDataObj)) {
      return res.status(400).json({ error: 'Nova data deve ser um dia útil' })
    }

    const agendamentosNoMesmoHorario = await prisma.agendamento.count({
      where: {
        dataAtual: novaDataObj,
        periodoAtual: novoPeriodo,
        localidade: agendamento.localidade
      }
    })

    if (agendamentosNoMesmoHorario >= 2) {
      return res.status(400).json({ error: 'Período indisponível para a nova data e localidade' })
    }

    const atualizado = await prisma.agendamento.update({
      where: { numeroNota },
      data: {
        dataAtual: novaDataObj,
        periodoAtual: novoPeriodo,
        status: 'REAGENDADO',
        reagendadoEm: new Date(),
        quantidadeReagendamentos: 1
      }
    })

    return res.status(200).json({ message: 'Reagendamento realizado com sucesso', agendamento: atualizado })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
