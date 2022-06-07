import { useState, useEffect } from "react";
import classNames from "classnames";
import { format, isSameDay, isSameMonth, add } from "date-fns";
import { takeMonth } from "./calendar";
import style from "./calendar.module.css";

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [currenteDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState(takeMonth(currenteDate)());

  useEffect(() => {
    setDate(takeMonth(currenteDate)());
  }, [currenteDate]);

  const dayColor = (day) => {
    if (!isSameMonth(day, currenteDate)) return style.dayBlur;
    if (isSameDay(day, selectedDay)) return style.dayFocus;
    return "";
  };

  const removeZero = (day) => {
    //  Tira o zero da esquerda do dia
    //  ex: 01 ~> 1
    if (day < 10) return day.toString().slice(1);
    return day;
  };

  return (
    <div className={style.calendar}>
      <div className={style.monthArea}>
        <button
          disabled={isSameMonth(new Date(), currenteDate)}
          onClick={() => setCurrentDate(add(currenteDate, { months: -1 }))}
        >
          <span className='material-icons'>arrow_back_ios</span>
        </button>
        <h3>
          {`${toPortugues[format(currenteDate, "MMMM")]} ${format(
            currenteDate,
            "yyyy"
          )}`}
        </h3>
        <button onClick={() => setCurrentDate(add(currenteDate, { months: 1 }))}>
          <span className='material-icons'>arrow_forward_ios</span>
        </button>
      </div>
      <div className={style.focus}>
        <WeekNames />
        {date.map((week, wi) => (
          <div className={style.week} key={week[0].toString()}>
            {week.map((day, di) => (
              <button
                key={format(day, "dd/mm/yyyy")}
                className={classNames(style.day, dayColor(day))}
                onClick={() => {
                  // Se clicar em um dia que não pertence ao mês selecionado,
                  // o mês é alterado para o mês do dia clicado e foco é colocado no dia clicado.
                  if (!isSameMonth(day, currenteDate)) {
                    if (wi === 0 && di <= 5) {
                      setCurrentDate(add(currenteDate, { months: -1 }));
                    } else {
                      setCurrentDate(add(currenteDate, { months: 1 }));
                    }
                  }
                  setSelectedDay(day);
                }}
              >
                <span>{removeZero(format(day, "dd"))}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const toPortugues = {
  January: "Janeiro",
  February: "Fevereiro",
  March: "Março",
  April: "Abril",
  May: "Maio",
  June: "Junho",
  July: "Julho",
  August: "Agosto",
  September: "Setembro",
  October: "Outubro",
  November: "Novembro",
  December: "Dezembro",
};

const WeekNames = () => {
  return (
    <div className={classNames(style.week, style.weekNames)}>
      {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
        <div className={style.day} key={day + i}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
