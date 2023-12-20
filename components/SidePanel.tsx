import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Style from '../src/styles/Home.module.css';
import { deleteCookie, getCookie } from 'cookies-next';
function SidePanel() {
    const router = useRouter();
    const ExitUser = () => {
        deleteCookie('Last');
        deleteCookie('First');
        router.push('../');
    }
    return (
        <div className={Style.SidePanel}>
            <button onClick={() => { router.push('/profile/')}}><Image className={Style.imgSelect} src="/img/profile.svg" width={30} height={30} alt="s"/><a>Профиль</a>  </button>
            <button onClick={() => { router.push('/news/')}}><Image className={Style.imgSelect} src="/img/news.svg" width={30} height={30} alt="s"/><a>Новости</a>  </button>
            <button onClick={() => { router.push('/dialog/')}}><Image className={Style.imgSelect} src="/img/messages.svg" width={30} height={30} alt="s"/><a>Мессенджер</a>  </button>
            <button onClick={() => { router.push('/profile/friendsPage') }}><Image className={Style.imgSelect} src="/img/friends.svg" width={30} height={30} alt="s"/><a>Друзья</a>  </button>
            <button onClick={() => { router.push('/gallery/') }}><Image className={Style.imgSelect} src="/img/gallery.svg" width={30} height={30} alt="s"/><a>Фотографии</a>  </button>
        </div>
    )
}
export default SidePanel;
