import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import Style from '../styles/Home.module.css'

export default function HomeAuto() {
  const [Email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  const [ErrorTxt, setErrorTxt] = useState('');
  const router = useRouter();
  const LoginAccount = (e: any) => {
    e.preventDefault();
    setErrorTxt("")
    const data = { Email, Pass };
    async function LogIn() {
      const res = await fetch('/api/loginaccount', { method: 'post', body: JSON.stringify(data) });
      const inform = await res.json()
      .then((date) => { return date[0] })
      if (inform != undefined) { 
        setCookie('Email', inform.User_Email);
        setCookie('Pass', inform.User_Password);
        if (inform.roles_id == 1) {
          router.push('/pageAdmin');
        }
        else if (inform.roles_id == 2) {
          router.push('/profile')
        }
      }
      else {
        setErrorTxt("Вы не вошли")
      }
    }
    LogIn();
  };
  const inputEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.minLength = 2;
    setEmail(e.target.value);
  }
  const inputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.minLength = 3;
    setPass(e.target.value);
  }
  return (<>
    <div className={Style.autoblock}>
      <title>Connect</title>
      <div className={Style.hText}>
        <h1>Connect</h1>
      </div>
      <form className={Style.autorize} onSubmit={LoginAccount}>
        <label htmlFor="mail">Почта</label>
        <input name='mail' id="mail" type="text" onChange={inputEmail} />
        <br />
        <label htmlFor="pass">Пароль</label>
        <input name='pass' id="pass" type="text" onChange={inputPassword} />
        <br />
        <div>{ErrorTxt}</div>
        <button type="submit">Войти</button>
      </form>
      <div className={Style.Authdescription}>
        <p>Если вы по какой то причине не зарегестрированны в нашем сайте<br /><a className="underline" onClick={() => { router.push('/register') }}>Зарегистрируйтесь</a></p>
      </div>
    </div>
  </>)
}
