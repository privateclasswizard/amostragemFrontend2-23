import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "../../assets/css/Calendar.css";
import { Collapse } from "bootstrap";

function Calendar() {
  const daysOfWeek = [
    "Domigo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [materias, setMaterias] = useState([]);
  useEffect(() => {
    const storedMaterias = JSON.parse(localStorage.getItem("materia")) || [];
    setMaterias(storedMaterias);

    return () => {};
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };
  const events = {};

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const endDay = lastDay.getDate();

    const days = [];
    let currentWeek = [];

    for (let i = 0; i < startDay; i++) {
      currentWeek.push("");
    }

    for (let day = 1; day <= endDay; day++) {
      const currentDate = new Date(year, month, day);
      currentWeek.push(
        `${year}-${(month + 1).toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`
      );
      if (currentWeek.length === 7) {
        days.push([...currentWeek]);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push("");
      }
      days.push([...currentWeek]);
    }

    return days;
  };

  getDaysInMonth(currentDate).forEach((week) => {
    week.forEach((currentDateString) => {
      const currentDate = new Date(currentDateString);
      const diaSemana = daysOfWeek[currentDate.getDay()];

      if (!events[diaSemana]) {
        events[diaSemana] = [];
      }

      // Verifica se a data está dentro do intervalo de alguma matéria
      materias.forEach((materia) => {
        const dataInicio = new Date(materia.dataInicioMateria);
        const dataFim = new Date(materia.dataFimMateria);
        const diaSemanaMateria = materia.diaSemanaMateria;

        // Verifica se a data está dentro do intervalo da matéria e se é um dia útil
        if (
          currentDate >= dataInicio &&
          currentDate <= dataFim &&
          diaSemana !== "Domingo" &&
          currentDateString !== "" // Adiciona esta verificação
        ) {
          if (diaSemana === diaSemanaMateria) {
            // Adiciona a matéria apenas se o dia da semana coincidir
            if (!events[diaSemana].some((event) => event.id === materia.id)) {
              events[diaSemana].push(materia);
            }
          }
        }
      });
    });
  });

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody className="calendarHome">
          {getDaysInMonth(currentDate).map((week, rowIndex) => (
            <tr key={rowIndex}>
              {week.map((day, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() =>
                    handleDayClick(
                      `${format(currentDate, "dd/MM/yyyy")}-${day}`
                    )
                  }
                >
                  <div className="dayContainer">{day}</div>
                  <div className="materiasContainer">
                    {day !== '' && // Verifica se o dia não está vazio
                    events[daysOfWeek[colIndex]] &&
                    events[daysOfWeek[colIndex]].map((materia, index) => {
                      const dataInicio = new Date(materia.dataInicioMateria);
                      const dataFim = new Date(materia.dataFimMateria);
                  
                      // Verifica se o dia está dentro do intervalo de datas
                      if (currentDate >= dataInicio && currentDate <= dataFim) {
                        return (
                          <div key={index}>
                            {materia.nomeMateria} - {materia.horarioMateria} -
                            {materia.professorMateria} - {materia.salaMateria}
                          </div>
                        );
                      }
                  
                      return null; // Retorna null se o dia não estiver no intervalo de datas
                    })}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar