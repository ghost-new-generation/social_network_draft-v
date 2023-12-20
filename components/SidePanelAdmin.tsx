import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import Image from 'next/image'
function SidePanelAdmins() {
    const [LastSession, getLastSession] = useState('');
    const [FirstSession, getFirstSession] = useState('');
    useEffect(() => {
        getLastSession(String(getCookie('Last')));
        getFirstSession(String(getCookie('First')));
    }, []);
    const router = useRouter();

    const ExitUser = () => {
        deleteCookie('Last');
        deleteCookie('First');
        router.push('../');
    }
    return (
        <>
            <div>
                <div>
                    <h1>{LastSession} {FirstSession}</h1>
                    <h3>Добро пожаловать на административную панель социальной сети Connect</h3>
                </div>
                <button onClick={() => { router.push('../pageAdmin/PageUser') }}>Список пользователей</button>
                <button onClick={() => { router.push('') }}> Список сообщений</button>
                <button onClick={() => { router.push('') }}>Список сообществ</button>
                <button onClick={ExitUser}>Выйти</button>
            </div>
        </>
    )
}
export default SidePanelAdmins;