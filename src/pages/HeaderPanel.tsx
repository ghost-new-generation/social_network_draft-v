import Image from 'next/image'
import Style from '../styles/Home.module.css';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { notification } from "libreres/exampleresume";
import { useEffect, useState } from "react";


function HeadPage() {
    const router = useRouter();
    const [User_Email] = useState(String(getCookie('Last')));
    const [User_Password] = useState(String(getCookie('First')));
    const [Counts, setCounts] = useState<notification[]>([]);
    const ExitUser = () => {
        deleteCookie('Last');
        deleteCookie('First');
        router.push('../');
    }
 
    return (<>
        <div className={Style.HeaderPanel}>
            <div className={Style.headerLogo}>
                <div><Image src={"/img/logo.svg"} width={50} height={50} alt="description of image" /></div><div className={Style.headerLogoTitle}><h2>Connect</h2></div>
            </div>
            <div className={Style.headerLogoB}>
                <button data-count="" className={Style.HeaderNotification} onClick={() => { router.push('/notification/') }}><Image className={Style.imgSelect} src="/img/notification.svg" width={30} height={30} alt="" /></button>
                <button onClick={() => { router.push('/settings/') }}><Image className={Style.imgSelect} src="/img/seating.svg" width={30} height={30} alt="" /></button>
                <button onClick={ExitUser}><Image className={Style.imgSelect} src="/img/exit.svg" width={30} height={30} alt="" /></button>
            </div>
        </div>
    </>)
}
export default HeadPage;