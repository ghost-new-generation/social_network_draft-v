import { dialog, users } from "libreres/exampleresume";
import { ChangeEvent, useState, useEffect } from "react";
import HeadPage from '../HeaderPanel';
import SidePanel from 'components/SidePanel';
import { getCookie } from 'cookies-next';
import { format } from 'date-fns';
import Style from '../../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link';

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
function HomeDialog({dataUser}:any) {
    const [MyProfileList] = useState<users>(dataUser);
    const monthNames = ["янв", "февр", "март", "апр", "мая", "июня", "июля", "авг", "сент", "окт", "нояб", "дек"];
    const [User_Email] = useState(getCookie('Email'));
    const [User_Password] = useState(getCookie('Pass'));
    const [messageList, getMessageList] = useState<dialog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => { fetch('/../api/allDialog', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then(async (res) => { if (res.ok) { getMessageList(await res.json()); } }) }, []);
    const SearchFunction = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.maxLength = 100;
        return setSearchTerm(e.target.value)
    }
    return (<>
        <div>
            <HeadPage />
            <div className={Style.mainField}>
                <SidePanel />
                <div className={Style.mainRight}>
                    <div className={Style.mainDialog}>
                        <div className={Style.inputSearch}>
                            <div className={Style.inputSearchImg}><Image src="/img/search.svg" width={25} height={25} alt="" /></div>
                            <div className={Style.inputSearchText}><input placeholder="Поиск" type="text" onChange={SearchFunction} /></div>
                        </div>
                        <div className={Style.DialogForm}>
                            {messageList.filter((s) => { return s?.User_LastName?.toLowerCase().startsWith(searchTerm?.toLowerCase()) || s?.User_FirstName?.toLowerCase().startsWith(searchTerm?.toLowerCase()) }).map((elem) => {
                                console.log();
                                if (format(new Date(), "yyyy") == format(Date.parse(elem.Time_of_create), "yyyy")) {
                                    if (format(new Date(), "dd") == format(Date.parse(elem.Time_of_create), "dd")) {
                                        if (elem.Viewed_Messages == 0) {
                                            return (<div key={elem.CodeDialog} className={Style.Dialog}>
                                                <Link className={Style.DialogFormElem} href={`/dialog/${elem.DialogID}`}><div>
                                                    <div className={Style.DialogFormElemIMG}><Image className={Style.profileIMG} src={"/Resources/" + elem.User_IMG} width={50} height={50} alt="" /></div>
                                                    <div className={Style.DialogFormElemText}><div className={Style.DialogFormElemUser}><div><h3>{elem.User_LastName} {elem.User_FirstName}</h3></div><div><b>{format(Date.parse(elem.Time_of_create), 'HH:mm')}</b></div></div><div className={Style.MessContent}><code>{elem.Content}</code></div></div>
                                                </div></Link></div>)
                                        }
                                        else{
                                        
                                            return (<div key={elem.CodeDialog} className={Style.Dialog}>
                                                <Link className={Style.DialogFormElemNew} href={`/dialog/${elem.DialogID}`}><div>
                                                    <div className={Style.DialogFormElemIMG}><Image className={Style.profileIMG} src={"/Resources/" + elem.User_IMG} width={50} height={50} alt="" /></div>
                                                    <div className={Style.DialogFormElemText}><div className={Style.DialogFormElemUser}><div><h3>{elem.User_LastName} {elem.User_FirstName}</h3></div><div><b>{format(Date.parse(elem.Time_of_create), 'HH:mm')}</b></div></div><div className={Style.MessContent}><code>{elem.Content}</code></div></div>
                                                </div></Link><div className={Style.newMessages}>a</div></div>)
                                        }
                                       
                                    }
                                    else {
                                        if (elem.Viewed_Messages == 0) {
                                            return (<div key={elem.CodeDialog} className={Style.Dialog}>
                                                <Link className={Style.DialogFormElem} href={`/dialog/${elem.DialogID}`}><div>
                                                    <div className={Style.DialogFormElemIMG}><Image className={Style.profileIMG} src={"/Resources/" + elem.User_IMG} width={50} height={50} alt="" /></div>
                                                    <div className={Style.DialogFormElemText}><div className={Style.DialogFormElemUser}><div><h3>{elem.User_LastName} {elem.User_FirstName}</h3></div><div><b>{format(Date.parse(elem.Time_of_create), 'dd') + " " + monthNames[Number(format(Date.parse(elem.Time_of_create), 'MM')) - 1]}</b></div></div><div className={Style.MessContent}><code>{elem.Content}</code></div></div>
                                                </div></Link></div>)
                                           
                                        }
                                        else{
                                            return (<div key={elem.CodeDialog} className={Style.Dialog}>
                                                <Link className={Style.DialogFormElemNew} href={`/dialog/${elem.DialogID}`}><div>
                                                    <div className={Style.DialogFormElemIMG}><Image className={Style.profileIMG} src={"/Resources/" + elem.User_IMG} width={50} height={50} alt="" /></div>
                                                    <div className={Style.DialogFormElemText}><div className={Style.DialogFormElemUser}><div><h3>{elem.User_LastName} {elem.User_FirstName}</h3></div><div><b>{format(Date.parse(elem.Time_of_create), 'HH:mm')}</b></div></div><div className={Style.MessContent}><code>{elem.Content}</code></div></div>
                                                </div></Link><div className={Style.newMessages}>a</div></div>)
                                        }
                                    }
                                }
                                else {
                                    if (elem.Viewed_Messages == 0) {
                                    return (<div key={elem.CodeDialog} className={Style.Dialog} >
                                        <Link className={Style.DialogFormElem} href={`/dialog/${elem.DialogID}`}><div>
                                            <div className={Style.DialogFormElemIMG}><Image className={Style.profileIMG} src={"/Resources/" + elem.User_IMG} width={50} height={50} alt="" /></div>
                                            <div className={Style.DialogFormElemText}><div className={Style.DialogFormElemUser}><div><h3>{elem.User_LastName} {elem.User_FirstName}</h3></div><div><b>{format(Date.parse(elem.Time_of_create), 'dd') + " " + monthNames[Number(format(Date.parse(elem.Time_of_create), 'MM')) - 1] + " " + format(Date.parse(elem.Time_of_create), 'yyyy')}</b></div></div><div className={Style.MessContent}><code>{elem.Content}</code></div></div>
                                        </div></Link></div>)
                                    }
                                    else{
                                        return (<div key={elem.CodeDialog} className={Style.Dialog}>
                                            <Link className={Style.DialogFormElemNew} href={`/dialog/${elem.DialogID}`}><div>
                                                <div className={Style.DialogFormElemIMG}><Image className={Style.profileIMG} src={"/Resources/" + elem.User_IMG} width={50} height={50} alt="" /></div>
                                                <div className={Style.DialogFormElemText}><div className={Style.DialogFormElemUser}><div><h3>{elem.User_LastName} {elem.User_FirstName}</h3></div><div><b>{format(Date.parse(elem.Time_of_create), 'HH:mm')}</b></div></div><div className={Style.MessContent}><code>{elem.Content}</code></div></div>
                                            </div></Link><div className={Style.newMessages}>a</div></div>)
                                    }
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default HomeDialog;