import React from "react";

export const Options = ({selectName}) => {

  const days = []
  for (let i = 1; i <= 31; i++) {
    days.push(i)
  }

  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]

  const years = []
  for (let i = (new Date()).getFullYear(); i >= 1930; i--) {
    years.push(i)
  }

  if (selectName === 'day') {
    return (
      <React.Fragment>
        <option value="">Выберите число</option>
        {days.map((item, index) => {
          return <option key={index} value={index + 1}>{item}</option>
        })}
      </React.Fragment>

    )
  } else if (selectName === 'month') {
    return (
      <React.Fragment>
        <option value="">Выберите месяц</option>
        {months.map((item, index) => {
          return <option key={index} value={index + 1}>{item}</option>
        })}
      </React.Fragment>
    )

  } else if (selectName === 'year') {
    return (
      <React.Fragment>
        <option value="">Выберите год</option>
        {years.map((item, index) => {
          return <option key={index} value={item}>{item}</option>
        })}
      </React.Fragment>
    )
  }
}