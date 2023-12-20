import SidePanel from 'components/SidePanel';
import HeadPage from '../HeaderPanel';
import Style from '../../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { comment, post, users } from 'libreres/exampleresume';
import Image from 'next/image';
import { format } from 'date-fns';

export async function getServerSideProps(context: any) {
    const newsId = context.params.newsId;
    const User_Email = context.req.cookies['Email'];
    const User_Password = context.req.cookies['Pass'];
    let dataUser = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/myProfile', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    let ProfileCommunity = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/allPost', { method: 'PUT', body: JSON.stringify(newsId) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    return {
        props: {
            ProfileCommunity,dataUser
        }
    }
}
const HomeCommunity = ({ ProfileCommunity,dataUser}: any) => {
    const [profileCommunity] = useState<post>(ProfileCommunity);
    const [MyUser] = useState<users>(dataUser);
    const [PostContent, getinputContent] = useState('')
    const [commentList,getcommentList] = useState<comment[]>([]);
    useEffect (()=>{
        fetch('/../api/allComment',{method:'PUT',body:JSON.stringify(profileCommunity.Post_id)}).then(async (res)=>{return getcommentList(await res.json())})
    },[])
    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const dateCreate = new Date(ProfileCommunity.Date_of_create);
    let date = format(new Date(dateCreate), 'dd') + " " + monthNames[dateCreate.getMonth()] + " " + dateCreate.getFullYear() + " " + format(new Date(dateCreate), 'HH:mm');
    async function addComment(){
        let UserID = MyUser.User_id;
        let PostID = profileCommunity.Post_id;
        await fetch('/../api/editNotification',{method:'POST',body:JSON.stringify({UserID,PostContent,PostID})});
        fetch('/../api/allComment',{method:'PUT',body:JSON.stringify(profileCommunity.Post_id)}).then(async (res)=>{return getcommentList(await res.json())})
    }
    return (<>
        <div>
            <HeadPage />
            <div className={Style.mainField}>
                <SidePanel />
                <div className={Style.mainRight}>
                    <div>
                        <div className={Style.PostUser} >
                            <Image className={Style.profileIMG} src={"/Resources/" + profileCommunity.User_IMG} width={50} height={50} alt={profileCommunity.User_IMG}></Image>
                            <div>
                            <h3>{profileCommunity.User_LastName} {profileCommunity.User_FirstName}</h3>
                            <p>{date}</p>
                            </div>
                            
                        </div>
                        <p className={Style.contentP}>{profileCommunity.Content_post}</p>
                        <div style={{margin:"20px 0px 0 0"}} className={Style.inputMessages}>
                            <input placeholder='Оставьте комментарий...' type='text' value={PostContent} onChange={e=>{getinputContent(e.target.value)}}></input>
                            <button onClick={addComment}>Отправить</button>
                        </div>
                        <div className={Style.commentList}>
                            {commentList.map(elem =>{
                                  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
                                  const dateCreate = new Date(elem.Date_of_create);
                                  let date = format(new Date(dateCreate), 'dd') + " " + monthNames[dateCreate.getMonth()] + " " + dateCreate.getFullYear() + " " + format(new Date(dateCreate), 'HH:mm');
                                return(<div key={elem.CommentPost_id} className={Style.commentElem} ><div className={Style.PostUser}><Image className={Style.profileIMG} src={"/Resources/"+elem.User_IMG} width={50} height={50} alt={profileCommunity.User_IMG}></Image><div><h4>{elem.User_LastName} {elem.User_FirstName}</h4><div>{date}</div></div></div>
                                <div>{elem.Content}</div></div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default HomeCommunity;