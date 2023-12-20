import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeadPage from '../HeaderPanel';
import SidePanel from 'components/SidePanel';
import Style from '../../styles/Home.module.css';
import { blackList, dialog, users } from 'libreres/exampleresume';
import Image from 'next/image';
import { format } from 'date-fns';

export async function getServerSideProps(context: any) {
    const User_id = context.params.User_id;
    const User_Email = context.req.cookies['Email'];
    const User_Password = context.req.cookies['Pass'];
    let dataUser = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/myProfile', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    let profile = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/profileSetFriend', { method: 'post', body: JSON.stringify(User_id) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    let dialogdata = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/allTest', { method: "POST" }).then((res) => { return res.json() }).then((data) => { return data });
    return {
        props: {
            profile, dialogdata, dataUser
        }
    }
}
const Components = ({ profile, dialogdata, dataUser}: any) => {
    const [dialogHome, getdialogHome] = useState<dialog[]>();
    const [dialogList] = useState<dialog[]>(dialogdata);
    const [profileUser] = useState<users>(profile);
    const [MyUserList] = useState<users>(dataUser);
    let num = MyUserList.User_id;
    let MyID = profileUser.User_id;
    const router = useRouter();
    const dateBirth = new Date(profileUser.Date_of_birth);
    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let MyLastName = MyUserList.User_Email;
    let MyFirstName = MyUserList.User_Password;
    let MyUserID = MyUserList.User_id;
    let UserID = profileUser.User_id;
    let countDialog = 0;
    const date = format(new Date(dateBirth), 'dd') + " " + monthNames[dateBirth.getMonth()] + " " + dateBirth.getFullYear();
    for (let dat of dialogList) { countDialog = dat.DialogID + 1 }
    useEffect(() => {fetch('/../api/editDialog', { method: 'POST', body: JSON.stringify({ UserID, MyLastName, MyFirstName }) }).then(async (res) => { if (res.ok) { getdialogHome(await res.json()) } });}, [UserID, MyLastName, MyFirstName]);
    function EnterTheDialog() {
        async function enterTheDialog() {
            if (dialogHome && dialogHome[0] == undefined) {
                fetch('/api/editDialog', { method: 'PUT', body: JSON.stringify({ UserID, countDialog, MyUserID }) });
                router.push(`/../dialog/${countDialog}`);
            }
            else {
                router.push(`/../dialog/${dialogHome && dialogHome[0].DialogID}`);
            }
        }
        return (<button onClick={enterTheDialog}>Написать</button>)
    }
    function AddFriends(){
        async function addFriends(){
            await fetch('/../api/editFriends',{method: "POST", body: JSON.stringify({num,MyID})});
        }
        return (<button onClick={addFriends}>Добавить в друзья</button>)
    }
     function AddUserBlackList(){
        let blackListCheck = fetch(process.env.NEXT_PUBLIC_URL+ '../api/allblackList',{ method: 'PUT', body: JSON.stringify({MyUserID, UserID}) }).then(async (res) => await res.json() ).then(data=>{return data[0]});
        const addUserBlackList = async(event:any) =>{
        }
        return (<button onClick={addUserBlackList}>Добавить в черный список</button>)
    }
    return (
        <div>
            <HeadPage />
            <div className={Style.mainField}>
                <SidePanel />
                <div className={Style.mainRight}>
                    <Image className={Style.profileIMG} src={"/Resources/" + profileUser.User_IMG} width={200} height={200} alt=""></Image>
                    <h2>{profileUser.User_LastName} {profileUser.User_FirstName}</h2>
                    <p>{profileUser.User_Status}</p>
                    <p>Дата рождения: {date}</p>
                    <AddFriends/>
                    <EnterTheDialog />
                    <AddUserBlackList />
                </div>
            </div>
        </div>
    )
}
export default Components;
