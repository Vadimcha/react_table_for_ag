import React, { useState, useEffect } from 'react'
import './style/style.css'
import { Student } from '../studentComp/Student'
// import { students } from '../../data/students'
import { Fetch_api } from '../../data/api'
import { AgStudent } from '../../models'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { compare_date, compare_time } from '../../compare_date'
import { checkStatus } from '../../checkStatus'
import axios from "axios";
import { data_host } from "../../settings";

var students: AgStudent[] = []

export function Table() {
  const [data, setData] = useState({});
  const [users, setUsers] = useState({})

  useEffect(() => {
    const init = async () => {
      const promises = await Promise.all([
        await axios.get(data_host + '/get_database'),
        await axios.get(data_host + '/get_users'),
        // .then(function (response) {}).catch(function (error) { console.log(error); }),
      ])
      setData(promises[0]["data"])
      setUsers(promises[1]["data"])
    }

    init()
  })

  var sts: any = {}
  for (var item in users) {
    sts[users[item]["st"].toString()] = {
      "name": users[item]["name"],
      "surname": users[item]["surname"],
      "room": users[item]["room"]
    }
  }
  console.log(sts)
  for (item in data) {

    var name = `${sts[data[item.toString()].KEY]["surname"]} ${sts[data[item.toString()]["KEY"]]["name"]}`

    let status = checkStatus(data[item.toString()]["entrance_date"], data[item.toString()]["entrance_time"], data[item.toString()]["flag"]);
    students[item] = {
      st: name,
      exit_date: data[item.toString()]["exit_date"],
      exit_time: data[item.toString()]["exit_time"],
      entrance_date: data[item.toString()]["entrance_date"],
      entrance_time: data[item.toString()]["entrance_time"],
      reason: data[item.toString()]["reason"],
      status: status,
      // }
    }
  }
  // var data:any = Fetch_api("database")
  // var users:any = Fetch_api("users")

  // init()
  console.log(students)
  let students_data = students;
  const [comp, SetComp] = useState(0)
  // Name Comparator
  if (comp === 0) {
    students.sort(function (a, b) {
      let ans = 0;
      if (a["st"] < b["st"]) ans = -1;
      else ans = 1;
      return ans;
    })
  }
  // Time Comparator
  else if (comp === 1 || comp === 2) {
    students.sort(function (a, b) {
      let keyp = (comp === 2 ? "entrance_" : "exit_")
      let ans = compare_date(a[keyp + "date"], b[keyp + "date"])
      if (ans !== 0) return ans;
      ans = compare_time(a[keyp + "time"], b[keyp + "time"])
      return ans
    })
  }
  // Status Comparator
  else {
    students.sort(function (a, b) {
      let ans = 0;
      if (a["status"] < b["status"]) ans = -1;
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
                <a className='filter' onClick={() => SetComp(0)}><i className="bi bi-sort-alpha-down"></i></a>
              </div>
            </th>
            <th>
              <div className="header_item">
                <p>Время выхода</p>
                <a className='filter' onClick={() => SetComp(1)}><i className="bi bi-sort-alpha-down"></i></a>
              </div>
            </th>
            <th>
              <div className="header_item">
                <p>Время возвращения</p>
                <a className='filter' onClick={() => SetComp(2)}><i className="bi bi-sort-alpha-down"></i></a>
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
                <a className='filter' onClick={() => SetComp(3)}><i className="bi bi-sort-alpha-down"></i></a>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {students_data.map(student => <Student children={student} search={zapros} />)}
        </tbody>
      </table>
    </>
  )


}