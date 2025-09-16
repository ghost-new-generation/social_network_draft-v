import { dialog, messages } from "libreres/exampleresume";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getCookie } from 'cookies-next';
import HeadPage from '../HeaderPanel';
import SidePanel from 'components/SidePanel';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import Style from '../../styles/Home.module.css';

export async function getServerSideProps(context: any) {
    const User_Email = context.req.cookies['Email'];
    const User_Password = context.req.cookies['Pass'];
    const myDialog = context.params.dialogID;
    let dataMessFromUser = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/allDialog', { method: 'DELETE', body: JSON.stringify({ myDialog, User_Email, User_Password }) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    let messageLists = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/allDialog', { method: 'PUT', body: JSON.stringify(myDialog) }).then((res) => { return res.json() });
    return {
        props: { dataMessFromUser, messageLists }
    }
}

function Home(){
    const elem = useState()
}
function HomeMessages({ dataMessFromUser, messageLists }: any) {
    const router = useRouter();
    const [numMessages, getnumMessages] = useState(0);
    const [rt, getrt] = useState(false);
    const [Content, getMessagesContent] = useState('');
    const [User_Email] = useState(String(getCookie('Email')));
    const [User_Password] = useState(String(getCookie('Pass')));
    const [From_User_id, getFrom_User_id] = useState(0);
    const [messageList, getMessageList] = useState<messages[]>(messageLists);
    const [dialogList] = useState<dialog>(dataMessFromUser);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const [EditButton, getEditButton] = useState('Отправить');
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    scrollToBottom();
    useEffect(() => {
        let FromUserid = dialogList.UserID;
        let dialogIDs = dialogList.DialogID;
        fetch('/../api/editUser', { method: 'DELETE', body: JSON.stringify({ dialogIDs, FromUserid }) });

    }, []);
    useEffect(() => {
        fetch('/../api/allDialog', { method: 'PUT', body: JSON.stringify(router.query) }).then(async (res) => { if (res.ok) { getMessageList(await res.json()); } });
        const messagesElem = async () => {
            const userID = await fetch('/../api/myProfile', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) });
            const UserAddMess = await userID.json();
            let result: { Usear_LastName: string, Usear_FirstName: string, User_id: number }[][] = [UserAddMess];
            getFrom_User_id(result[0][0].User_id);

        };
        messagesElem();
    }, []);
    const addMessages = async (e: any) => {
        e.preventDefault();
        if (Content != "") {
            if (rt == false) {
                const To_User_id = dialogList.UserID;
                let { dialogID } = router.query;
                const data = { To_User_id, Content, From_User_id, dialogID };
                await fetch('/../api/editMessages', { method: 'POST', body: JSON.stringify(data) });
                fetch('/../api/allDialog', { method: 'PUT', body: JSON.stringify(router.query) }).then(async (res) => { if (res.ok) { getMessageList(await res.json()); } });
                getMessagesContent('');
                scrollToBottom();
            }
            else {
                await fetch('/../api/editMessages', { method: 'PUT', body: JSON.stringify({ Content, numMessages }) });
                fetch('/../api/allDialog', { method: 'PUT', body: JSON.stringify(router.query) }).then(async (res) => { if (res.ok) { getMessageList(await res.json()); } });
                getEditButton("Отправить");
                getrt(false);
                getMessagesContent('');
                scrollToBottom();
            }
        }
    }
    function DelMessages({ num }: any) {
        async function delMessages() {
            const res = await fetch('../api/editMessages', {
                method: 'DELETE',
                body: JSON.stringify(num),
            });
            fetch('/../api/allDialog', { method: 'PUT', body: JSON.stringify(router.query) }).then(async (res) => { if (res.ok) { getMessageList(await res.json()); } });
        };
        return (<button className={Style.buttonMessages} onClick={delMessages}><Image className={Style.PhotoMyGallery} src={"/img/delete.svg"} width={25} height={25} alt="s"></Image></button>);
    }
    function EditMessages({ num, contents }: any) {
        async function editMessages() {
            getMessagesContent(contents);
            getrt(true);
            getEditButton("Сохранить");
            getnumMessages(num);
        }
        return (<button className={Style.buttonMessages} onClick={editMessages}><Image className={Style.PhotoMyGallery} src={"/img/pen.svg"} width={25} height={25} alt="s"></Image></button>)
    }
    let prevdate = "";
    function Redate(newDate: any) {
        if (prevdate == "") {
            prevdate = newDate;
            return (<div className={Style.ContentDate}><big>{newDate}</big></div>)
        }
        else {
            if (newDate.toString() != prevdate.toString()) {
                prevdate = newDate;
                return (<div className={Style.ContentDate}><big>{newDate}</big></div>)
            }
        }
    }
    return (<>
        <div >
            <HeadPage />
            <div className={Style.mainField}>
                <SidePanel />
                <div className={Style.mainRight}>
                    <div className={Style.mainRightDialog}>
                        <div className={Style.dialogToUser}>
                            <div></div><Image className={Style.profileIMG} src={"/Resources/" + dialogList.User_IMG} width={50} height={50} alt="s"></Image><h1><Link className={Style.LinkText} href={'../profile/' + dialogList.UserID}>{dialogList.User_LastName} {dialogList.User_FirstName}</Link></h1>
                        </div>
                        <div className={Style.TableStyle}>
                            {messageList.filter(lets => lets).map(elem => {
                                let DateTime = format(new Date(elem.Time_of_create), 'HH:mm');
                                if (elem.To_User_id == dialogList.UserID) {
                                    if (elem.Edit_Messages != 1) {
                                        if (elem.Viewed_Messages == 1) {
                                            return (<><div>{Redate(format(new Date(elem.Time_of_create), "dd.MM.yyyy"))}</div>
                                                <div className={Style.FromUserMessages} key={elem.Messages_id}><div className={Style.ContentMessages}>
                                                    <a>Вы: {DateTime} <Image src={"/img/singleCheck.svg"} width={10} height={10} alt="s"></Image></a>
                                                    <h3>{elem.Content}</h3>
                                                </div>
                                                    <div><DelMessages num={elem.Messages_id} /><EditMessages num={elem.Messages_id} contents={elem.Content} /></div></div></>);
                                        }
                                        else {
                                            return (<><div>{Redate(format(new Date(elem.Time_of_create), "dd.MM.yyyy"))}</div>
                                                <div className={Style.FromUserMessages} key={elem.Messages_id}><div className={Style.ContentMessages}>
                                                    <a>Вы: {DateTime} <Image src={"/img/doubleCheck.svg"} width={15} height={15} alt="s"></Image></a>
                                                    <h3>{elem.Content}</h3>
                                                </div>
                                            <div><DelMessages num={elem.Messages_id} /><EditMessages num={elem.Messages_id} contents={elem.Content} /></div></div></>);
                                        }
                                    }
                                    else {
                                        if (elem.Viewed_Messages == 1) {
                                            return (<><div>{Redate(format(new Date(elem.Time_of_create), "dd.MM.yyyy"))}</div>
                                                <div className={Style.FromUserMessages} key={elem.Messages_id}><div className={Style.ContentMessages}>
                                                    <a>Вы: {DateTime} <Image src={"/img/singleCheck.svg"} width={10} height={10} alt="s"></Image></a>
                                                    <h3>{elem.Content}</h3>
                                                    <div style={{ color: "#004752", marginTop: "2px" }}>сообщение отредактированно</div>
                                                </div>
                                                    <div><DelMessages num={elem.Messages_id} /><EditMessages num={elem.Messages_id} contents={elem.Content} /></div></div></>);
                                        }
                                        else {
                                            return (<><div>{Redate(format(new Date(elem.Time_of_create), "dd.MM.yyyy"))}</div>
                                                <div className={Style.FromUserMessages} key={elem.Messages_id}><div className={Style.ContentMessages}>
                                                    <a>Вы: {DateTime} <Image src={"/img/doubleCheck.svg"} width={15} height={15} alt="s"></Image></a>
                                                    <h3>{elem.Content}</h3>
                                                    <div style={{ color: "#004752", marginTop: "2px" }}>сообщение отредактированно</div>
                                                </div>
                                            <div><DelMessages num={elem.Messages_id} /><EditMessages num={elem.Messages_id} contents={elem.Content} /></div></div></>);
                                        }
                                    }
                                }
                                if (elem.To_User_id != dialogList.UserID) {
                                    if (elem.Edit_Messages != 1) {
                                        if (elem.Viewed_Messages == 1) {
                                            return (<><div>{Redate(format(new Date(elem.Time_of_create), "dd.MM.yyyy"))}</div><div className={Style.ToUserMessage} key={elem.Messages_id}><div><a>{elem.User_LastName} {DateTime} <Image src={"/img/singleCheck.svg"} width={10} height={10} alt="s"></Image></a></div><div>
                                                <h3>{elem.Content}</h3></div></div></>);
                                        }
                                        else {
                                            return (<><div>{Redate(format(new Date(elem.Time_of_create), "dd.MM.yyyy"))}</div><div className={Style.ToUserMessage} key={elem.Messages_id}><div><a>{elem.User_LastName} {DateTime} <Image src={"/img/doubleCheck.svg"} width={15} height={15} alt="s"></Image></a></div><div>
                                                <h3>{elem.Content}</h3></div></div></>);
                                        }
                                    }
                                    else {
                                        if (elem.Viewed_Messages == 1) {
                                            return (<><div>{Redate(format(new Date(elem.Time_of_create), "dd.MM.yyyy"))}</div><div className={Style.ToUserMessage} key={elem.Messages_id}><div><a>{elem.User_LastName} {DateTime} <Image src={"/img/singleCheck.svg"} width={10} height={10} alt="s"></Image></a></div><div>
                                                <h3>{elem.Content}</h3>
                                            </div>
                                                <div style={{ color: "#004752", marginTop: "2px" }}>сообщение отредактированно</div></div></>);
                                        }
                                        else {
                                            return (<><div>{Redate(format(new Date(elem.Time_of_create), "dd.MM.yyyy"))}</div><div className={Style.ToUserMessage} key={elem.Messages_id}><div><a>{elem.User_LastName} {DateTime} <Image src={"/img/doubleCheck.svg"} width={15} height={15} alt="s"></Image></a></div><div>
                                                <h3>{elem.Content}</h3>
                                            </div>
                                                <div style={{ color: "#004752", marginTop: "2px" }}>сообщение отредактированно</div></div></>);

                                        }
                                    }
                                }
                            })}
                            <div ref={messagesEndRef} style={{ height: "5px", flex: "0 0 5px" }}></div>
                        </div>
                        <form className={Style.inputMessages} onSubmit={addMessages}>
                            <input type="text" id="Content" value={Content}
                                onChange={e => getMessagesContent(e.target.value)} />
                            <button>{EditButton}</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default HomeMessages;
