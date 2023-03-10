import React from 'react'
import {AgStudent} from '../../models'
import './style/style.css'

interface StudentProps {
  children: AgStudent
  search: string
}

export function Student({ children, search }: StudentProps) {
  let color = "", text = "";
  if (children["status"] === 1) {
    color = "red";
    text = "Опаздывает";
  }
  else if (children["status"] === 2) {
    color = "yellow";
    text = "Не в АГ";
  }
  else if (children["status"] === 3) {
    color = "green";
    text = "Вернулся АГ";
  }

  let pos = children["st"].indexOf(search)
  if(!pos) {
    return (
      <tr>
         <td>{ children["st"] }</td>
         <td>{ children["exit_date"] + " " + children["exit_time"] }</td>
         <td>{ children["entrance_date"] + " " + children["entrance_time"] }</td>
         <td>{ children["reason"] }</td>
         <td className={color+"-status"}>{ text }</td>
       </tr> 
   )
  }
  else return (
    <></>
  )
  
}