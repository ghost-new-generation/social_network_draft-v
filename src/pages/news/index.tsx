import HeadPage from "@/pages/HeaderPanel";
import SidePanel from "components/SidePanel";
import Style from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { post } from "libreres/exampleresume";
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { users } from 'libreres/exampleresume';

export async function getServerSideProps(context: any) {
    const User_Email = context.req.cookies['Email'];
    const User_Password = context.req.cookies['Pass'];
    let dataUser = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/myProfile', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    return {
        props: {
            dataUser
        }
    }
}
export default function HomeNews({ dataUser }: any) {
    const [MyUser] = useState<users>(dataUser);
    const [NewsList, getNewsList] = useState<post[]>([]);
    const router = useRouter();
    useEffect(() => {
        fetch('/../api/allNews', { method: 'POST' }).then(async (res) => { getNewsList(await res.json()) });
    }, []);
    function LikePost({ num, post }: any) {
        async function AddLike() {      
            const PostID = post;
            const MyId = MyUser.User_id;
            await fetch('/../api/editblackList', { method: 'PUT', body: JSON.stringify({ PostID, MyId }) });
              fetch('/../api/allNews', { method: 'POST' }).then(async (res) => { getNewsList(await res.json()) });
        }
        return (<button onClick={AddLike}>{num} Нравится</button>)
    }
    return (<><div>
        <HeadPage />
        <div className={Style.mainField}>
            <SidePanel />
            <div className={Style.PostNews}>
                <div>
                    {NewsList.map(elem => {
                        const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
                        const dateCreate = new Date(elem.Date_of_create);
                        let date = format(new Date(dateCreate), 'dd') + " " + monthNames[dateCreate.getMonth()] + " " + dateCreate.getFullYear() + " " + format(new Date(dateCreate), 'HH:mm');
                        if (!elem.Post_IMG) {
                            return (<div className={Style.PostNewsElem} key={elem.Post_id}>
                                <div>
                                    <div className={Style.PostUser}>
                                        <div className={Style.PostNameUser}><Image className={Style.profileIMG} src={"/Resources/" + elem.User_IMG} width={50} height={50} alt=""></Image></div><div><h3>{elem.User_FirstName} {elem.User_LastName}</h3><div>{date}</div></div>
                                    </div>
                                    <div className={Style.PostContent}>
                                        <Link className={Style.NewsContex} href={`../news/${elem.Post_id}`}>{elem.Content_post}</Link>
                                        <div>
                                            <LikePost num={elem.countLike} post={elem.Post_id}/><button onClick={()=>{router.push("/news/"+elem.Post_id)}}>Комментарий</button>
                                        </div>
                                    </div>

                                </div>
                            </div>)
                        }
                        else {
                            return (<div className={Style.PostNewsElem} key={elem.Post_id}>
                                <div>
                                    <div>
                                        <h3>{elem.User_FirstName} {elem.User_LastName}</h3> <div>{elem.Date_of_create}</div>
                                    </div>
                                    <div>
                                        <a>{elem.Content_post}</a>
                                    </div>
                                    <div className={Style.PostBtn}>
                                        <button onClick={() => { return LikePost(elem.Post_id) }}>{elem.countLike} Нравится</button><button>Комментарий</button>
                                    </div>
                                </div>
                            </div>)
                        }
                    })}
                </div>
            </div>
        </div>
    </div>
    </>)
}