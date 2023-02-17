import React, { useState , KeyboardEvent } from 'react'
import './style/style.css'
import { Student } from '../studentComp/Student'
// import { students } from '../../data/students'
import { Return_db } from '../../data/students'
import { AgStudent } from '../../models'



export function Table() {
  var data:any = Return_db()
  console.log(JSON.stringify(data))
  var students: AgStudent[] = []
  for(var item in data){
    students[item]={
      st: data[item.toString()]["KEY"],
      exit_date: data[item.toString()]["exit_date"],
      exit_time: data[item.toString()]["exit_time"],
      entrance_date: data[item.toString()]["entrance_date"],
      entrance_time: data[item.toString()]["entarnce_time"],
      reason: data[item.toString()]["reason"],
      status: 3,
    }
  }
  console.log(students)

  let students_data = students;
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