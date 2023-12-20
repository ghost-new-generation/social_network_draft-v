import HeadPage from "@/pages/HeaderPanel";
import SidePanel from "components/SidePanel";
import Style from '../../styles/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from "react";
import { format } from 'date-fns';
import { users } from "libreres/exampleresume";
import axios from "axios";

export async function getServerSideProps(context: any) {
    const User_Email = context.req.cookies['Email'];
    const User_Password = context.req.cookies['Pass'];
    let MyDate = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/myProfile', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    return {
        props: { MyDate }
    }
}
export default function HomeGallery({ MyDate }: any) {
    const [myProfile] = useState<users>(MyDate)
    let [Photo, getPhoto] = useState(myProfile.User_IMG);
    let [PhotoURL, getPhotoURL] = useState();
    let [URLFile, getURLFile] = useState<File>();
    let [LastName, getLastName] = useState(myProfile.User_LastName);
    let [FirstName, getFirstName] = useState(myProfile.User_FirstName);
    let [Genders, getGenders] = useState<number>(myProfile.genders_id);
    let [DateBirth, getDateBirth] = useState(format(Date.parse(myProfile.Date_of_birth), 'yyyy-MM-dd'));
    let [Status, getStatus] = useState(myProfile.User_Status);
    let [User_id] = useState(myProfile.User_id)
    const editUser = async (e: any) => {
        e.preventDefault();
    }
    function ComboBoxPol() {
        function chengeSelect(event: number) {
            getGenders(event);
        }
        return (
            <select className={Style.comboBox} value={Genders} onChange={e => { chengeSelect(Number(e.target.value)) }}>
                <option value={1} >Мужской</option>
                <option value={2} >Женский</option>
            </select>
        )
    };
    const handleOnChange = async () => {
        if (URLFile === undefined) {
            let Photos = Photo;
            const info = { LastName, FirstName, Genders, Status, DateBirth, Photos, User_id }
            await fetch('/../api/editUser', {
                method: 'POST',
                body: JSON.stringify(info)
            });
            return;
        }
        else {
            const formDate = new FormData();
            formDate.append("myImage", URLFile);
            const { data } = await axios.post("../api/editImageUser", formDate);
            let Photos = data;
            const info = { LastName, FirstName, Genders, Status, DateBirth, Photos, User_id }
            await fetch('/../api/editUser', {
                method: 'POST',
                body: JSON.stringify(info)
            });
        }
    }
    const router = useRouter();
    return (<><div>
        <HeadPage />
        <div className={Style.mainField}>
            <SidePanel />
            <div className={Style.mainRight}>
                <h2>Настройки</h2>
                <div>
                    <h1>Личные данные</h1>
                    <div>
                        <form className={Style.settings} onSubmit={editUser}>
                            <div className={Style.btnImg}>
                                <Image className={Style.communityElemImage} src={PhotoURL ? PhotoURL : "/Resources/" + Photo} width={200} height={200} alt={myProfile.User_LastName}></Image> <label className={Style.inputFile}>
                                    <input type="file" onChange={({ target }) => {

                                        if (target.files) {
                                            if (target.files?.length > 0) {
                                                const file = target.files[0];
                                                const fileReader = new FileReader();
                                                fileReader.onloadend = () => {
                                                    getPhotoURL(fileReader.result);
                                                }
                                                fileReader.readAsDataURL(file);
                                                getPhoto(file.toString())
                                                getURLFile(file);
                                            }
                                        }
                                    }} />
                                    <span>Выберите фото</span>
                                </label>
                            </div>
                            <div className={Style.boxSettings}>

                                <p>Имя</p>
                                <input type="text" onChange={e => getLastName(e.target.value)} value={LastName} />
                                <p>Фамилия</p>
                                <input type="text" onChange={e => getFirstName(e.target.value)} value={FirstName} />
                                <p>Пол</p>
                                <ComboBoxPol />
                                <p>Дата рождения</p>
                                <input type="date" onChange={e => getDateBirth(e.target.value)} value={DateBirth} />
                                <p>Статус</p>
                                <input type="text" onChange={e => getStatus(e.target.value)} value={Status} />
                                <br />
                                <button onClick={handleOnChange}>Сохранить</button>
                                <button onClick={() => { router.push('settings/blackList') }}>Чёрный список</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </>)
}