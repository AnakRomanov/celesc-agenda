import React from 'react';

type CalendarioProps = {
  localidade: string;
  onDataSelecionada: (data: Date) => void;
};

export default function Calendario({ localidade, onDataSelecionada }: CalendarioProps) {
  return (
    <div>
      <p>Calendário para: {localidade}</p>
      <button onClick={() => onDataSelecionada(new Date())}>
        Selecionar hoje
      </button>
    </div>
  );
}
