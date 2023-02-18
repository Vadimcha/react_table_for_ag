import React, { useState , KeyboardEvent } from 'react'
import './style/style.css'
import { Student } from '../studentComp/Student'
// import { students } from '../../data/students'
import { Return_db } from '../../data/students'
import { AgStudent } from '../../models'
import 'bootstrap-icons/font/bootstrap-icons.css';



export function Table() {
  var data:any = Return_db("database")
  var users:any = Return_db("users")
  var sts:any = {}
  for (var item in users){
    sts[users[item]["st"].toString()] = {
      "name": users[item]["name"],
      "surname": users[item]["surname"],
      "room": users[item]["room"]
    }
  }
  // console.log(JSON.stringify(sts))
  var students: AgStudent[] = []
  for(var item in data){
    // if (data[item.toString()]["KEY"] in users) {
    var name = `${sts[data[item.toString()]["KEY"]]["name"]} ${sts[data[item.toString()]["KEY"]]["surname"]}` 
    let name_arr = name.split(' ')
    name = name_arr[1] + " " + name_arr[0]
    students[item]={
      st: name,
      exit_date: data[item.toString()]["exit_date"],
      exit_time: data[item.toString()]["exit_time"],
      entrance_date: data[item.toString()]["entrance_date"],
      entrance_time: data[item.toString()]["entrance_time"],
      reason: data[item.toString()]["reason"],
      status: 0,
    // }
  }
  }

  let students_data = students;
  const [comp, SetComp] = useState(0)
  // Name Comparator
  if(comp === 0) {
    students.sort(function(a, b) {
      let ans = 0;
      if(a["st"] < b["st"]) ans = -1;
      else ans = 1;
      return ans;
    })
  }
  // Time Comparator
  else if(comp === 1 || comp === 2) {
    students.sort(function(a, b) {
      let keyp = (comp == 2 ? "entrance_" : "exit_")

      let ans = 0;
      let Adate = a[(keyp+"date")].split('.') // день, месяц, год
      let Atime = a[(keyp+"time")].split(':') // час(24ч), минуты
      let ADate = Adate.map((x) => parseInt(x))
      let ATime = Atime.map((x) => parseInt(x))

      let Bdate = b[(keyp+"date")].split('.') // день, месяц, год
      let Btime = b[(keyp+"time")].split(':') // час(24ч), минуты
      let BDate = Bdate.map((x) => parseInt(x))
      let BTime = Btime.map((x) => parseInt(x))
      
      // Сравнение годов
      if(ADate[2] < BDate[2]) ans = -1;
      else if(ADate[2] > BDate[2]) ans = 1;
      
      // Сравнение месяцев
      else if(ADate[1] < BDate[1]) ans = -1;
      else if(ADate[1] > BDate[1]) ans = 1;

      // Сравнение дней
      else if(ADate[0] < BDate[0]) ans = -1;
      else if(ADate[0] > BDate[0]) ans = 1;

      // Сравнение часов
      else if(ATime[0] < BTime[0]) ans = -1;
      else if(ATime[0] > BTime[0]) ans = 1;

      // Сравнение минут
      else if(ATime[1] < BTime[1]) ans = -1;
      else if(ATime[1] > BTime[1]) ans = 1;
      // console.log(keyp)
      // console.log(a[keyp+"time"] + " " + a[keyp+"date"] + "   vs   "  + b[keyp+"time"] + " " + b[keyp+"date"] + "     equal: " + ans.toString());
      return ans;
    })
  }
  // Status Comparator
  else {
    students.sort(function(a, b) {
      let ans = 0;
      if(a["status"] < b["status"]) ans = -1;
      else ans = 1;
      return ans;
    })
  }


  const [zapros, setZapros] = useState("")
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZapros(event.target.value)
  }

  return (
    <>
      <input className="form-control" type="search" placeholder="Enter the student" id="search-text" onChange={changeHandler}></input>
      <table>
        <thead className='headerContainer'>
          <tr className='header'>
            <th>
              <div className="header_item">
                <p>Фамилия Имя</p>
                <a className='filter' onClick={ () => SetComp(0) }><i className="bi bi-sort-alpha-down"></i></a>
              </div>
            </th>
            <th>
              <div className="header_item">
                <p>Время выхода</p>
                <a className='filter' onClick={ () => SetComp(1) }><i className="bi bi-sort-alpha-down"></i></a>
              </div>
            </th>
            <th>
              <div className="header_item">
                <p>Время возвращения</p>
                <a className='filter' onClick={ () => SetComp(2) }><i className="bi bi-sort-alpha-down"></i></a>
              </div>
            </th>
            <th>
              <div className="header_item">
                <p>Причина</p>
              </div>
            </th>
            <th>
              <div className="header_item">
                <p>Статус</p>
                <a className='filter' onClick={ () => SetComp(3) }><i className="bi bi-sort-alpha-down"></i></a>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          { students_data.map(student => <Student children={student} search={zapros} />) }
        </tbody>
      </table>
    </>
  )


}