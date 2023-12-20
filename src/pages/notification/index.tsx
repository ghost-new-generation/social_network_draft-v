import HeadPage from "@/pages/HeaderPanel";
import SidePanel from "components/SidePanel";
import Style from '../../styles/Home.module.css';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import { notification, users } from "libreres/exampleresume";
import Link from 'next/link';
import Image from 'next/image';

export async function getServerSideProps(context: any) {
    const User_Email = context.req.cookies['Email'];
    const User_Password = context.req.cookies['Pass'];
    let dataUser = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/myProfile', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    return {
        props: { dataUser }
    }
}
export default function HomeGallery({ dataUser }: any) {
    const [User_Email] = useState(String(getCookie('Email')));
    const [User_Password] = useState(String(getCookie('Pass')));
    const [notificationList, setnotificationList] = useState<notification[]>([]);
    const [User] = useState<users>(dataUser);
    useEffect(() => {
        setTimeout(() => {
            const notificationWord = async () => {
                await fetch('/../api/allNotification', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then(async (res) => setnotificationList(await res.json()))
            }; notificationWord();

        }, 2000);
    }, []);
    useEffect(() => {
        fetch('/../api/allNotification', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then(async (res) => setnotificationList(await res.json()));
    }, []);
    async function CleareNotificationList() {
        await fetch('/../api/editNotification', { method: 'PUT', body: JSON.stringify(User?.User_id) });
        fetch('/../api/allNotification', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then(async (res) => setnotificationList(await res.json()));
    }
    function AddUserFriends({ num }: any) {
        async function addUserFriends() {
            console.log(num);
        }
        return (<button onClick={addUserFriends}>Добавить в друзья</button>);
    }
    function RejectRequestUser({ num }: any) {
        async function rejectRequestUser() {
            console.log(num);
            await fetch('/../api/editNotification', { method: 'DELETE', body: JSON.stringify(num) });
            fetch('/../api/allNotification', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then(async (res) => setnotificationList(await res.json()));
        }
        return (<button onClick={rejectRequestUser}><Image className={Style.PhotoMyGallery} src={"/img/delete.svg"} width={30} height={30} alt="s"></Image></button>)
    }
    return (<><div>
        <HeadPage />
        <div className={Style.mainField}>
            <SidePanel />
            <div className={Style.mainRight}>
                <div>
                    <div className={Style.notificationTitle}><h2>Уведомление</h2><button onClick={CleareNotificationList}>Очистить список</button></div>
                    <div>
                        {notificationList.map(elem => {
                                return (<div className={Style.notification} key={elem.Notification_id}><Image className={Style.profileIMG} src={"/Resources/" + elem.User_IMG} width={50} height={50} alt=""></Image>
                                <div className={Style.notificationContent}><p><Link href={'../profile/' + elem.User_id}><big>{elem.User_FirstName} {elem.User_LastName}</big></Link></p>{elem.Notification_content}</div>
                                <div className={Style.notificationBtn}><RejectRequestUser num={elem.Notification_id} /></div></div>)
                        
                           
                        })}
                    </div>
                </div>


            </div>
        </div>
    </div>
    </>)
}