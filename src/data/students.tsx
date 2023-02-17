import { AgStudent } from "../models";
import {useEffect, useState} from "react";

export function Return_db() {
  const [res, setResponse] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8001/get_db",);
      const json = await response.json();
      setResponse(json);
    }
    fetchData();
  }, []);
  return res
}

export const students: AgStudent[] = [  {
  "st": "st085529",
  "exit_date": "16.02.23",
  "exit_time": "13:00",
  "entrance_date": "17.02.23",
  "entrance_time": "13:00",
  "reason": "Гулять",
  "status": 3
},
{
  "st": "st085329",
  "exit_date": "16.02.23",
  "exit_time": "13:00",
  "entrance_date": "17.02.23",
  "entrance_time": "13:00",
  "reason": "Гулять",
  "status": 0
},
{
  "st": "st0853",
  "exit_date": "16.02.23",
  "exit_time": "13:00",
  "entrance_date": "17.02.23",
  "entrance_time": "13:00",
  "reason": "Гулять",
  "status": 1
},
{
  "st": "st0853",
  "exit_date": "16.02.23",
  "exit_time": "13:00",
  "entrance_date": "17.02.23",
  "entrance_time": "13:00",
  "reason": "Гулять",
  "status": 1
},
{
  "st": "ABOBA",
  "exit_date": "16.02.23",
  "exit_time": "13:00",
  "entrance_date": "17.02.23",
  "entrance_time": "13:00",
  "reason": "Гулять",
  "status": 0
},
{
  "st": "ABOBA",
  "exit_date": "16.02.23",
  "exit_time": "13:00",
  "entrance_date": "17.02.23",
  "entrance_time": "13:00",
  "reason": "Гулять",
  "status": 0
}]
