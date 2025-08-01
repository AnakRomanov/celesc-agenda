
import { useState } from 'react'
import axios from 'axios'

export default function Agendar() {
  const [responsavel, setResponsavel] = useState('')
  const [numeroInstalacao, setNumeroInstalacao] = useState('')
  const [dataSelecionada, setDataSelecionada] = useState('')
  const [confirmacaoEmailSAP, setConfirmacaoEmailSAP] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensagem('')
    setErro('')

    if (!responsavel || !numeroInstalacao || !dataSelecionada || !confirmacaoEmailSAP) {
      setErro('Todos os campos são obrigatórios.')
      return
    }

    try {
      const response = await axios.post('/api/agendar', {
        responsavel,
        numeroInstalacao,
        dataSelecionada,
        confirmacaoEmailSAP
      })
      setMensagem(response.data.message)
    } catch (error: any) {
      setErro(error.response?.data?.error || 'Erro ao agendar.')
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h1>Agendamento de Inspeção</h1>
      <form onSubmit={handleSubmit}>
        <label>Responsável:</label>
        <input
          type="text"
          value={responsavel}
          onChange={(e) => setResponsavel(e.target.value)}
          required
        />

        <label>Número da Instalação:</label>
        <input
          type="text"
          value={numeroInstalacao}
          onChange={(e) => setNumeroInstalacao(e.target.value)}
          required
        />

        <label>Data da Inspeção:</label>
        <input
          type="date"
          value={dataSelecionada}
          onChange={(e) => setDataSelecionada(e.target.value)}
          required
        />

        <label>
          <input
            type="checkbox"
            checked={confirmacaoEmailSAP}
            onChange={(e) => setConfirmacaoEmailSAP(e.target.checked)}
          />
          Confirmo que atualizei o SAP CRM com o e-mail do cliente
        </label>

        <button type="submit">Agendar</button>
      </form>

      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  )
}
