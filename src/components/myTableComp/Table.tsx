import React, { useState , KeyboardEvent } from 'react'
import './style/style.css'
import { Student } from '../studentComp/Student'
import { students } from '../../data/students'

let students_data = students;




export function Table() {
  // ST Comparator
  students.sort(function(a, b) {
    let ans = 0;
    if(a["st"] < b["st"]) ans = -1;
    else ans = 1;
    return ans;
  })


  const [zapros, setZapros] = useState("")
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZapros(event.target.value)
  }

  return (
    <>
      <input className="form-control" type="search" placeholder="Enter the student" id="search-text" onChange={changeHandler}></input>
      <table>
        <thead>
          <tr>
            <th>st</th>
            <th>Exit_time</th>
            <th>Entrance_time</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          { students_data.map(student => <Student children={student} search={zapros} />) }
        </tbody>
      </table>
    </>
  )


}