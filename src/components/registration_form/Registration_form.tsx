import './css/style.css'
import { host } from '../../settings'
import { useCookies } from "react-cookie";
import {useEffect, useState} from "react";
import { data_host } from "../../settings";
import axios from "axios";

export function Registration_form(){
  const [Codeform, SetCodeform] = useState(0)
  const [Code, SetCode] = useState(0)
  const [formData, setFormData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData); // вывод данных на консоль для демонстрации
    
    await axios
    .post(data_host + '/send_code',{ user: formData["user"], email: formData["email"] })
    .then(function (response) { console.log(response); SetCodeform(1); SetCode(response["data"])}).catch(function (error) { console.log(error); });
  };

  const handleChange = (event) => {
    if (event.target.name === "user"){
      setFormData({email:formData["email"], [event.target.name]:event.target.value});
    } else if (event.target.name === "email")
    setFormData({email:formData["user"], [event.target.name]:event.target.value});
  };

  if(!Codeform) {
    return (
      <>
        <div className="forma">
          <h1>Регистрация</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="field name_field">
              <label id="icon" htmlFor="user"><i className="icon-user "></i></label>
              <input type="text" name="user" className="user" placeholder='Введите ФИ' onChange={handleChange}/>
            </div>
            <div className="field email_field">
              <label id="icon" htmlFor="email"><i className="icon-envelope "></i></label>
              <input type="email" name="email" className="email" placeholder='Введите свой stxxxxxx@.spbu.ru' onChange={handleChange}/>
            </div>
            <hr />
            <button type='submit' className="button" >Зарегистрироваться</button>
          </form>
          <a href="/login">Уже есть аккаунт. Войти?</a>
        </div>
      </>
    )
  }
  else { 
    return (
      <>
        <div className="forma">
          <h1>Регистрация</h1>
          <hr />
          <form action="">
            <p>Введите код отправленный на вашу st почту</p>
            <input type="text" id="in" className="code" placeholder='Введите код подтверждения'/>
            <hr />
            <button type='button' className="button" onClick={() => {if ((document.getElementById("in") as HTMLInputElement).value === Code.toString()){ window.location.href = "/";}}}>Подтвердить</button>
          </form>
        </div>
      </>
    )
  }
}