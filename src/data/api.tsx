import { AgStudent } from "../models";
import {useEffect, useState} from "react";
import { data_host } from "../settings";

export function Fetch_api(re) {
  const [res, setResponse] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(data_host + `/get_${re}`);
      const json = await response.json();
      setResponse(json);
    }
    fetchData();
  }, []);
  return res
}

