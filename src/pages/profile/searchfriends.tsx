import { users } from "libreres/exampleresume";
import HeadPage from '../HeaderPanel';
import SidePanel from 'components/SidePanel';
import Link from 'next/link';
import Style from '../../styles/Home.module.css';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import Image from 'next/image';
export default function Searchfriends() {
    const [User_Email] = useState(getCookie('Email'));
    const [User_Password] = useState(getCookie('Pass'));
    const [friendsUser, GetfriendsUser] = useState<users[]>([]);
    const [searchUsers, getsearchUsers] = useState('');
    useEffect(() => { fetch('../api/allFriends', { method: 'PUT', body: JSON.stringify({ User_Email, User_Password}) }).then(async (res) => { if (res.ok) { GetfriendsUser(await res.json()); } }) },[]);
    function AddFriends({ num }: any) {
        async function Elem() {
            console.log(num);
            const proID = await fetch('/../api/myProfile', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) });
            const upgradeElem = await proID.json();
            let result: { User_id: number }[][] = [upgradeElem];
            const MyID = result[0][0].User_id;
            const arr = { num, MyID };
            await fetch('/../api/editFriends', { method: 'POST', body: JSON.stringify(arr) });
            fetch('../api/allFriends', { method: 'PUT', body: JSON.stringify({ User_Email, User_Password}) }).then(async (res) => { if (res.ok) { GetfriendsUser(await res.json()); } })
        }; 
        return (<button className={Style.newBtn} onClick={Elem}>Добавить</button>);
    }
    return (<>
        <div>
            <HeadPage />
            <div className={Style.mainField}>
                <SidePanel />
                <div className={Style.mainRight}>
                    <h2 style={{paddingLeft:'10px', paddingTop:'5px'}}> Поиск друзей</h2>
                    <div className={Style.inputSearch}>
                        <div className={Style.inputSearchImg}><Image src="/img/search.svg" width={25} height={25} alt="s"/></div>
                        <div className={Style.inputSearchText}><input onChange={(e)=>{getsearchUsers(e.target.value)}} placeholder="Поиск..." type="text"/></div>
                    </div>
                    <div className={Style.mainRightFriend}>
                    {friendsUser.filter((s) =>{ 
                        return s?.User_LastName?.toLowerCase().startsWith(searchUsers?.toLowerCase())|| s?.User_FirstName.toLowerCase().startsWith(searchUsers?.toLowerCase());
                    }).map(elem => {
                        if (elem.roles_id == 2) {
                            return (<div className={Style.newFriendsElems} key={elem.User_id}><div className={Style.newFriendsElemsContent}><Image className={Style.profileIMG} src={"/Resources/" + elem.User_IMG} width={70} height={70} alt="s"></Image> <Link className={Style.newFriendsElemsLink} href={`${elem.User_id}`}>{elem.User_LastName} {elem.User_FirstName}</Link>
                            </div><div style={{display:"flex"}}><AddFriends num={elem.User_id} /></div></div>)
                        }
                    })}
                    </div>
                </div>
            </div>
        </div>
    </>);
}
