import { friends } from "libreres/exampleresume";
import { useState, useEffect } from "react";
import HeadPage from '../HeaderPanel';
import SidePanel from 'components/SidePanel';
import { getCookie } from 'cookies-next';
import { useRouter } from "next/router";
import Link from 'next/link';
import Style from '../../styles/Home.module.css';
import Image from 'next/image';

function FriendsPadges() {
   const router = useRouter();
   const [User_Email] = useState(String(getCookie('Email')));
   const [User_Password] = useState(String(getCookie('Pass')));
   const [friendList, GetfriendList] = useState<friends[]>([]);
   const [searchUsers, getsearchUsers] = useState('');
   useEffect(() => { fetch('/../api/allFriends', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then(async (res) => { if (res.ok) { GetfriendList(await res.json()); } }); }, []);
   function DelFriends({num}:any){
      async function delFriends(){

      }
      return (<button className={Style.delFriends} onClick={delFriends}>Удалить</button>)
   }
   return (<>
      <div>
         <HeadPage />
         <div className={Style.mainField}>
            <SidePanel />
            <div  className={Style.mainRight}>
               <div style={{display:"flex", justifyContent:"space-between"}}>
               <h2 style={{paddingLeft:'10px', paddingTop:'5px'}}>Друзья</h2>
            <div className={Style.friendTitle}><div><input className={Style.newFriends} type="button" value="Найти друзей" onClick={() => router.push('../profile/searchfriends')} /></div></div>
               </div>
                           <div className={Style.friendPage}>
                  <div className={Style.inputSearch}>
                        <div className={Style.inputSearchImg}><Image src="/img/search.svg" width={25} height={25} alt="s"/></div>
                        <div className={Style.inputSearchText}><input onChange={(e)=>{getsearchUsers(e.target.value)}} placeholder="Поиск..." type="text"/></div>
                    </div>
                  
                  <div className={Style.friendList}>
                     {friendList.filter((f)=>{return f?.User_LastName?.toLowerCase().startsWith(searchUsers?.toLowerCase()) || f?.User_FirstName?.toLowerCase().startsWith(searchUsers?.toLowerCase()) }).map(elem => (<div className={Style.friendPageElem} key={elem.Friend_id}><Image className={Style.profileIMG} src={"/Resources/" + elem.User_IMG} width={70} height={70} alt={elem.User_LastName + " " + elem.User_FirstName}></Image><Link className={Style.Link} href={`${elem.Friend_id}`}>{elem.User_FirstName} {elem.User_LastName}</Link><div><DelFriends num={elem.Friend_id}/></div></div>))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   </>
   )

}
export default FriendsPadges;
