import './select-list.scss'
import React, {Component} from "react";
import {NavLink} from 'react-router-dom'
import {SelectListItem} from "./components/select-list-item";

export default class SelectList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selects: [
        {name: 'day', selected: false, value: '', id: 1},
        {name: 'month', selected: false, value: '', id: 2},
        {name: 'year', selected: false, value: '', id: 3}
      ]
    }
    this.onSelect = this.onSelect.bind(this)
  }

  newArrFunc(selects, index, value, newItem, old) {
    selects = [...selects.slice(0, index), newItem, ...selects.slice(index + 1)]

    old = selects[index]
    newItem = {...old, value: value}

    const newArr = [...selects.slice(0, index), newItem, ...selects.slice(index + 1)]

    return {
      selects: newArr
    }
  }

  onSelect(e) {
    const value = e.target.value
    const name = e.target.name

    this.setState(({selects}) => {
      const index = selects.findIndex(elem => elem.name === name)

      if (value) {
        let old = selects[index]
        let newItem = {...old, selected: true}

        return this.newArrFunc(selects, index, value, newItem, old)

      } else {
        let old = selects[index]
        let newItem = {...old, selected: false}

        return this.newArrFunc(selects, index, value, newItem, old)
      }
    })
  }

  render() {

    const {selects} = this.state
    const {onSaveDate} = this.props

    let isSelected = selects.map((select) => {
      return select.selected
    })

    let isSelectedAll = isSelected.every((element) => element === true)

    const selectElements = selects.map((select) => {

      return (
        <SelectListItem
          key={select.name}
          selectProp={select}
          onSelect={this.onSelect}
        />
      )
    })


    return (
      <div className={'select-list'}>
        <h2>Укажите дату рождения</h2>
        <p>чтобы получить нумерологический анализ личности</p>

        <div className="style-form">

          {selectElements}

          <button
            className="submit-form-first"
            onClick={() => onSaveDate(selects)}
            disabled={!isSelectedAll}
          >
            Расчитать карту судьбы
          </button>
          <div className={'for-registered'}>
            <p>Уже зарегистрированы?</p>
            <NavLink to="/login">
              Войти
            </NavLink>
          </div>

        </div>
      </div>
    )
  }
}