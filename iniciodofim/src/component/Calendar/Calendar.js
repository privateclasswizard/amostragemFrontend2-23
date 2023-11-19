import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import '../../assets/css/Calendar.css';
import { Collapse } from 'bootstrap';

function Calendar() {
  const daysOfWeek = ['Domigo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [materias, setMaterias] = useState([]);
  useEffect(() => {
    const storedMaterias = JSON.parse(localStorage.getItem('materia')) || [];
    setMaterias(storedMaterias);
  
    return () => {
    };
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null); 

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

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
      currentWeek.push('');
    }
  
    for (let day = 1; day <= endDay; day++) {
      const currentDate = new Date(year, month, day);
      currentWeek.push(`${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
      if (currentWeek.length === 7) {
        days.push([...currentWeek]);
        currentWeek = [];
      }
    }
  
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push('');
      }
      days.push([...currentWeek]);
    }
  
    return days;
  };
  
  const events = {};
  
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
          diaSemana !== 'Sábado' &&
          diaSemana !== 'Domingo'
        ) {
          if (diaSemana === diaSemanaMateria) {
            if (!events[diaSemana].some((event) => event.id === materia.id)) {
              events[diaSemana].push(materia);
            }
          }
        }
      });
    });
  });

  // const getDaysInMonth = (date) => {
  //   const year = date.getFullYear();
  //   const month = date.getMonth();
  //   const firstDay = new Date(year, month, 1);
  //   const lastDay = new Date(year, month + 1, 0);
  //   const startDay = firstDay.getDay();
  //   const endDay = lastDay.getDate();

  //   const days = [];
  //   let currentWeek = [];

  //   for (let i = 0; i < startDay; i++) {
  //     currentWeek.push('');
  //   }

  //   for (let day = 1; day <= endDay; day++) {
  //     currentWeek.push(day);
  //     if (currentWeek.length === 7) {
  //       days.push(currentWeek);
  //       currentWeek = [];
  //     }
  //   }

  //   if (currentWeek.length > 0) {
  //     while (currentWeek.length < 7) {
  //       currentWeek.push('');
  //     }
  //     days.push(currentWeek);
  //   }

  //   return days;
  // };



  // const events = {};

  // materias.map((materia) => {
  //   const dataInicio = new Date(materia.dataInicioMateria);
  //   const dataFim = new Date(materia.dataFimMateria);
  //   const diaSemanaMateria = materia.diaSemanaMateria;
  
  //   for (let date = new Date(dataInicio); date <= dataFim; date.setDate(date.getDate() + 1)) {
  //     const diaSemana = daysOfWeek[date.getDay()];
  
  //     if (!events[diaSemana]) {
  //       events[diaSemana] = [];
  //     }
   
  //     console.log(currentDate>= dataInicio && date <= dataFim);
  //     // Verifica se a data está dentro do intervalo da matéria
  //     if (date>= dataInicio && date <= dataFim) {
  //       if (diaSemana === diaSemanaMateria) {
  //         if (!events[diaSemana].some((event) => event.id === materia.id)) {
  //           events[diaSemana].push(materia);
  //         }
  //       }
  //     }
  //   }
  //   return null;
  // });


  // materias.map((materia) => {
  //   const dataInicio = new Date(materia.dataInicioMateria);
  //   const dataFim = new Date(materia.dataFimMateria);
  //   const diaSemanaMateria = materia.diaSemanaMateria;

  //   for (let date = dataInicio; date <= dataFim; date.setDate(date.getDate() + 1)) {
  //     const diaSemana = daysOfWeek[date.getDay()];
      
  //     if (!events[diaSemana]) {
  //       events[diaSemana] = [];
  //     }
  //     console.log("passou aqui");
  //     console.log(diaSemanaMateria);
  //     console.log(`Dia da semana atual: ${diaSemana}`);
  //     console.log(`Dia da semana esperado: ${diaSemana == diaSemanaMateria}`);
  //     console.log(`________________________`);
  //     console.log(`1 ${date >= dataInicio}`);
  //     console.log(` 2${date <= dataFim}`);
  //     console.log(`________________________`);
  //     // if(handleDayClick > dataInicio && handleDayClick < dataFim ) {
  //       if (diaSemana == diaSemanaMateria) {
  //         console.log("passou aqui");
  //         if (!events[diaSemana].some((event) => event.id == materia.id)) {
  //           events[diaSemana].push(materia);
  //         }
  //       }
  //     // }
  //   }
  
  //   return null;
  // });



  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
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
        <tbody className='calendarHome'>
          {getDaysInMonth(currentDate).map((week, rowIndex) => (
            <tr key={rowIndex}>
              {week.map((day, colIndex) => (
                <td key={colIndex} onClick={() => handleDayClick(`${format(currentDate, 'dd/MM/yyyy')}-${day}`)}>
                  <div className='dayContainer' >
                    {day}
                  </div>
                  <div className='materiasContainer'>
                    {events[daysOfWeek[colIndex]] && events[daysOfWeek[colIndex]].map((materia, index) => (
                      <div key={index}>
                      {materia.nomeMateria} - {materia.horarioMateria} -{materia.professorMateria}
                      </div>
                    ))}
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

export default Calendar;