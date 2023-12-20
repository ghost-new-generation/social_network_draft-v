import HeadPage from "@/pages/HeaderPanel";
import SidePanel from "components/SidePanel";
import Style from '../../styles/Home.module.css';
import { useState, useEffect } from "react";
import { getCookie } from 'cookies-next';
import { blackList } from "libreres/exampleresume";
function HomeBlackList() {
    const [User_LastName] = useState(getCookie('Last'));
    const [User_FirstName] = useState(getCookie('First'));
    const [useBlackList, getBlackList] = useState<blackList[]>([]);
    useEffect(() => {
        fetch('/../api/allblackList', { method: 'POST', body: JSON.stringify({ User_LastName, User_FirstName }) }).then(async (res) => { if (res.ok) { getBlackList(await res.json()); } })
    }, []);
    function DelUserBlackList({ id, blackUser }: any) {
        async function del() {
            await fetch('/../api/editblackList', { method: 'DELETE', body: JSON.stringify({ id, blackUser }) });
            fetch('/../api/allblackList', { method: 'POST', body: JSON.stringify({ User_LastName, User_FirstName }) }).then(async (res) => { if (res.ok) { getBlackList(await res.json()); } });
        }
        return (<button onClick={del}>Удалить из списка</button>)
    }
    return (<>
        <HeadPage />
        <div className={Style.mainField}>
            <SidePanel />
            <div className={Style.mainRight}>
                <h2>Черный список</h2>
                <div>
                    {useBlackList.map(elem => {
                        return (<div key={elem.BlackList_ID}><div><h2>{elem.User_LastName} {elem.User_FirstName}</h2></div><div><DelUserBlackList id={elem.Users_id} blackUser={elem.User_ban_id} /></div></div>)
                    })}
                </div>
            </div>
        </div>
    </>)
}
export default HomeBlackList;