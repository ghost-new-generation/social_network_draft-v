import { useRouter } from 'next/router';
import HeadPage from '../HeaderPanel';
import { FormEvent ,useEffect, useState } from 'react'
import SidePanel from 'components/SidePanel';
import Image from 'next/image';

import { format } from 'date-fns';
import Link from 'next/link';
import Style from '../../styles/Home.module.css';
import { gallery, post, users } from 'libreres/exampleresume';
export async function getServerSideProps(context: any) {
    const User_Email = context.req.cookies['Email'];
    const User_Password = context.req.cookies['Pass'];
    let dataUser = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/myProfile', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    let dataFriend = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/myProfile', { method: 'PUT', body: JSON.stringify({ User_Email, User_Password }) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    return {
        props: {
            dataUser, dataFriend
        }
    }
}
function HomeProfile({ dataUser, dataFriend }: any) {
    const [messageList] = useState<users>(dataUser);
    const [FriendList] = useState<users>(dataFriend);
    const [User_Email] = useState(messageList.User_Email);
    const [User_Password] = useState(messageList.User_Password);
    const [IDs] = useState(messageList.User_id);
    const [MyPost, getMyPost] = useState<post[]>([]);
    const [MyFriends, getMyFriends] = useState<users[]>([]);
    const [MyGallery, getMyGallety] = useState<gallery[]>([]);
    const [MyContentPost, getMyContentPost] = useState('')
    const router = useRouter();
    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const dateBirth = new Date(messageList.Date_of_birth);
    let date = format(new Date(dateBirth), 'dd') + " " + monthNames[dateBirth.getMonth()] + " " + dateBirth.getFullYear();
    function CountFriends() {
        if (FriendList.CountFriend == 1) {
            return <a>{FriendList.CountFriend} друг</a>
        }
        if (FriendList.CountFriend == 2 || FriendList.CountFriend == 3) {
            return <a>{FriendList.CountFriend} друга</a>
        }
        if (FriendList.CountFriend > 4) {
            return <a>{FriendList.CountFriend} друзей</a>
        }
        if (FriendList.CountFriend == 4) {
            return <a>{FriendList.CountFriend} друга</a>
        }
        else {
            return <a>0 друзей</a>
        }
    }
    function LikePost() {
        const like = '';
        return (<div className={Style.PostBtn}><button>Нравится</button><button>Комментарий</button></div>)
    }

    useEffect(() => {
        fetch('/../api/allFriends', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then(async (res) => { if (res.ok) { getMyFriends(await res.json()); } });
    }, []);
    useEffect(() => {
        fetch('/../api/allPost', { method: 'POST', body: JSON.stringify(IDs) }).then(async (res) => { getMyPost(await res.json()) });
        fetch('/../api/allGallery',{method:'POST',body:JSON.stringify(IDs)}).then(async (res) =>{getMyGallety(await res.json())});
    }, []);
    const AddPost = async(e : FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(MyContentPost){
            await fetch('/../api/editPost',{method:'POST', body: JSON.stringify({MyContentPost, IDs})});
            fetch('/../api/allPost', { method: 'POST', body: JSON.stringify(IDs) }).then(async (res) => { getMyPost(await res.json()) });
        }
        getMyContentPost("");
    }
    return (<>
        <div>
            <HeadPage />
            <div className={Style.mainField}>
                <SidePanel />
                <div className={Style.profileSet}>
                    <div className={Style.profile}>
                        <div>
                            <div className={Style.profileMain}>
                                <div className={Style.ProfileIMGs}><Image className={Style.IMG} src={"/Resources/" + messageList.User_IMG} width={200} height={200} alt="s"></Image></div>
                                <div className={Style.profileElem}>
                                    <div> <h2> {messageList.User_FirstName} {messageList.User_LastName}</h2></div>
                                    <div> <a><b>День рождения:</b> {date}</a></div>
                                    <div className={Style.ProfileStatus}>{messageList.User_Status}</div>

                                </div>
                            </div>
                            <div className={Style.profileFriend}> <h2><CountFriends /></h2>
                                <div>
                                    {MyFriends.slice(0, 6).map(elem => {
                                        return (<Link className={Style.MyFriends} href={`/profile/${elem.User_id}`} key={elem.User_id}><div> <Image className={Style.IMG} src={"/Resources/" + elem.User_IMG} width={65} height={65} alt="s"></Image><p>{elem.User_LastName} </p></div></Link>)
                                    })}
                                </div>
                            </div>
                            <div className={Style.profileGallery}> <h2>Галерея</h2>
                            <div className={Style.GalleryMyProfile}>
                                {MyGallery.slice(0, 8).map((elem)=>{
                                    return (<Image className={Style.PhotoMyGallery} key={elem.Images_id} src={"/ResourcesGallery/" + elem.Name_Image} width={90} height={90} alt="s"></Image>)
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Style.profilePost}>
                        <form className={Style.inputSearchText} onSubmit={AddPost}>
                            <input type='text' placeholder="Что у вас нового?" onChange={e => getMyContentPost(e.target.value)} value={MyContentPost}></input>
                        </form>
                    </div>
                    <div>
                        {MyPost.map(((elem) => {
                            return (<div className={Style.PostNewsElem} key={elem.Post_id}>
                                <div>
                                    <div className={Style.PostUser}>
                                        <div className={Style.PostNameUser}><Image className={Style.profileIMG} src={"/Resources/" + elem.User_IMG} width={50} height={50} alt=""></Image></div><div><h3>{elem.User_FirstName} {elem.User_LastName}</h3><div>{format(new Date(elem.Date_of_create), 'dd.MM.yyyy HH:mm')}</div></div> 
                                    </div>
                                    <div className={Style.PostContent}>
                                        <Link className={Style.NewsContex}  href={`../news/${elem.Post_id}`}>{elem.Content_post}</Link>
                                    </div>
                                    <div>
                                        <LikePost />
                                    </div>
                                </div>
                            </div>)
                        }))}
                    </div>
                </div>
            </div>
        </div>

    </>)
}
export default HomeProfile;