import './select-list-item.scss'
import React from "react";
import {Options} from "./options";

export const SelectListItem = (props) => {

  let opacity
  props.selectProp.selected ? opacity = 1 : opacity = 0

  return (
    <div className={'select-list-item'}>

      <div className="form-group-style form-group">

        <label htmlFor="day" className="day-label label-unselected">{props.selectProp.id}</label>

        <select
          name={props.selectProp.name}
          className="form-control"
          onChange={props.onSelect}
          value={props.selectProp.value}
        >
          <Options selectName={props.selectProp.name}/>
        </select>

        <p style={{opacity: opacity}}>
          <img src="img/check-circle-2.png" alt="c"/>
        </p>

      </div>


    </div>

  )
}