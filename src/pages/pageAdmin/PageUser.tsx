import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { users } from 'libreres/exampleresume';
import HeadPage from '@/pages/HeaderPanel';
import Style from '../../styles/Home.module.css';
import SidePanelAdmins from "components/SidePanelAdmin";
import { useRouter } from 'next/router';

export default function MainList() {
    const router = useRouter();
    const [User_LastName, setUser_LastName] = useState('');
    const [User_FirstName, setUser_FirstName] = useState('');
    const [User_Password, setUser_Password] = useState('');
    const [User_Email, setUser_Email] = useState('');
    const [genders_id, setgenders_id] = useState<number>(0);
    const [roles_id, setroles_id] = useState<number>(0);
    let [dannie, dannieGet] = useState<users[]>([]);
    useEffect(() => {
        fetch('/api/allUser', { method: 'POST' }).then(async (res) => {
            if (res.ok) {
                dannieGet(await res.json());
            }
        })
    } ,[]);
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
    function ComboBoxRole() {
        function chengeSelect(event: number) {
            setroles_id(event);
        }
        return (
            <select value={roles_id} onChange={e => { chengeSelect(Number(e.target.value)) }}>
                <option value={0}>Выберите роль</option>
                <option value={1}>Администратор</option>
                <option value={2}>Пользователь</option>
            </select>
        )
    }

    function OtclickBtn({ num }: any) {
        async function Otclick() {
            const res = await fetch('../api/allUser', {
                method: 'DELETE',
                body: JSON.stringify(num),
            });
            const abc = await res.json();
            console.log(num);
        };

        return (<button onClick={Otclick}>Удаление</button>);
    };

    const InsertResume = (e: any) => {
        e.preventDefault();
        const data = { User_LastName, User_FirstName, User_Password, User_Email, genders_id, roles_id };
        fetch('/api/allUser', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        router.push('/pageAdmin/PageUser');
    };
    return (
        <div className={Style.UserPadeStyle}>
            <SidePanelAdmins />
            <HeadPage />
            <div className={Style.AddElem}>
                <div>
                    <form onSubmit={InsertResume}>

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
                            <label htmlFor="Password">Пароль</label>
                            <input
                                id="Password"
                                type="text"
                                onChange={e => setUser_Password(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="Email">Логин</label>
                            <input
                                id="Email"
                                type="mail"
                                onChange={e => setUser_Email(e.target.value)}
                            />
                        </div>
                        <br />
                        <label htmlFor="Pol">Роль</label>
                        <ComboBoxRole />
                        <br /><br />
                        <label htmlFor="Role">Пол</label>
                        <ComboBoxPol />
                        <br /><br />
                        <button type="submit" onClick={() => alert("Вы добавили пользователя")}>Добавить</button>
                    </form>
                </div>
                <div className={Style.TableStyle}>
                    <table>
                        <thead>
                            <tr>
                                <th>Номер</th>
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Почта</th>
                                <th>Пароль</th>
                                <th>Дата регистриции</th>
                                <th>Пол</th>
                                <th>Роль</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dannie.map(elem => (
                                    <tr key={elem.User_id}>
                                        <td>{elem.User_id}</td>
                                        <td>{elem.User_LastName}</td>
                                        <td>{elem.User_FirstName}</td>
                                        <td>{elem.User_Email}</td>
                                        <td>{elem.User_Password}</td>
                                        <td>{format(Date.parse(elem.Date_of_creation), 'yyyy-MM-dd')}</td>
                                        <td>{elem.genders_title}</td>
                                        <td>{elem.roles_title}</td>
                                        <td><OtclickBtn num={elem.User_id} /></td>
                                        <td><button>Редактировать</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}
