import React from 'react';

export type CalendarioProps = {
  onSelectDate: (date: string) => void;
};

const Calendario: React.FC<CalendarioProps> = ({ onSelectDate }) => {
  const handleDateClick = () => {
    const today = new Date().toISOString().split('T')[0];
    onSelectDate(today);
  };

  return (
    <div>
      <button onClick={handleDateClick}>Selecionar data de hoje</button>
    </div>
  );
};

export default Calendario;
