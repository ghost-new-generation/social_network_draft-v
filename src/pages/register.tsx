import { GetServerSideProps } from "next";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Style from '../styles/Home.module.css';

export default function RegisterHome() {
    const router = useRouter();
    const [User_LastName, setUser_LastName] = useState('');
    const [User_FirstName, setUser_FirstName] = useState('');
    const [User_Password, setUser_Password] = useState('');
    const [User_Email, setUser_Email] = useState('');
    const [Date_of_birth, getDate_of_birth] = useState('');
    const [genders_id, setgenders_id] = useState<number>(0);
    function ComboBoxPol() {
        function chengeSelect(event: number) {
            setgenders_id(event);
        }
        return (
            <select value={genders_id} onChange={e => { chengeSelect(Number(e.target.value)) }}>
                <option value={0} >Выберите пол</option>
                <option value={1} >Мужской</option>
                <option value={2} >Женский</option>
            </select>
        )
    };
    const InsertResume = (e: any) => {
        e.preventDefault();
        console.log(Date_of_birth)
        const data = { User_LastName, User_FirstName, User_Password, User_Email, genders_id, Date_of_birth };
        fetch(process.env.NEXT_PUBLIC_URL +'/api/editUser', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        router.push('../');
    };
    return (<>
        <div  className={Style.autoblock}>
            <h1>Регистрация</h1>
 
                <form className={Style.autorize}  onSubmit={InsertResume}>
                    <br />
                    <br />
                    <div>
                        <label htmlFor="LastName">Имя</label>
                        <input 
                            id="LastName"
                            type="text"
                            onChange={e => setUser_LastName(e.target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="FirstName">Фамилия</label>
                        <input
                            id="FirstName"
                            type="text"
                            onChange={e => setUser_FirstName(e.target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="FirstName">Дата рождения</label>
                        <input
                            id="FirstName"
                            type="date"
                            onChange={e => getDate_of_birth(e.target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="Password">Пароль</label>
                        <input
                            id="Password"
                            type="text"
                            onChange={e => setUser_Password(e.target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="Email">Почта</label>
                        <input
                            id="Email"
                            type="mail"
                            onChange={e => setUser_Email(e.target.value)}
                        />
                    </div>
                    
                    <br />
                    
                    <label htmlFor="Role">Пол</label>
                    <ComboBoxPol />
                    <br /><br />
                    <button type="submit" >Зарегистрироваться</button>
                    <div className="description">
                        <p>Если вы уже зарегестрированны <a className="underline" onClick={() => { router.push('/register') }}>авторизуйтесь</a></p>
                    </div>
                </form>
          
        </div>
    </>)
}