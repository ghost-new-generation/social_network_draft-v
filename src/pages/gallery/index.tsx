import HeadPage from "@/pages/HeaderPanel";
import SidePanel from "components/SidePanel";
import Style from '../../styles/Home.module.css';
import { useEffect, useState } from "react";
import Image from 'next/image';
import { gallery, users } from "libreres/exampleresume";
import axios from "axios";

export async function getServerSideProps(context: any) {
    const User_Email = context.req.cookies['Email'];
    const User_Password = context.req.cookies['Pass'];
    let dataGallery = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/myProfile', { method: 'POST', body: JSON.stringify({ User_Email, User_Password }) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    let MyGallery = await fetch(process.env.NEXT_PUBLIC_URL + '/../api/allGallery', { method: 'PUT', body: JSON.stringify({ User_Email, User_Password }) }).then((res) => { return res.json() }).then((data) => { return data[0] });
    if(MyGallery == undefined){
        fetch(process.env.NEXT_PUBLIC_URL + '/../api/editImages', { method: 'PUT', body: JSON.stringify( dataGallery.User_id ) });
    }
    return {
        props: { dataGallery, MyGallery}
    }
}
let IdUSers:number;
export default function HomeGallery({ dataGallery, MyGallery }: any) {
    const [gallery] = useState<users>(dataGallery);
    IdUSers = gallery.User_id;
    const [galleryID] =useState<gallery>(MyGallery);
    const [galleryList, getgalleryList] = useState<gallery[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [uploading, setUploading] = useState(false);
    useEffect(() => {
        fetch('/../api/allGallery', { method: "POST", body: JSON.stringify(gallery.User_id) }).then(async (res) => { return getgalleryList(await res.json()) });
    });
    const handleUpload = async () => {
        let GID = galleryID.Gallery_id;
        setUploading(true);
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("myImage", selectedFile);
        const { data } = await axios.post("../api/editImageGallery", formData);
        const info = {data, GID}
        await fetch(process.env.NEXT_PUBLIC_URL + '/../api/editImages', {
            method: 'POST',
            body: JSON.stringify(info)
        });
        setUploading(false);
    };
    return (<><div>
        <HeadPage />
        <div className={Style.mainField}>
            <SidePanel />
            <div className={Style.mainRight}>
                <div>
                    <h2>Галерея</h2>
                    <div><input type="file" onChange={({ target }) => {
                        
                                if (target.files) {
                                    if (target.files?.length > 0) {
                                        const file = target.files[0];
                                        setSelectedFile(file);
                                    }
                                }
                            }}
                           />
                            <button onClick={handleUpload}>Добавить</button></div>
                    <div className={Style.StyleGallery}>
                        {galleryList.map(elem => {
                            return (<Image key={elem.Images_id} className={Style.ImageGallery} src={"/ResourcesGallery/" + elem.Name_Image} width={100} height={100} alt="s"></Image>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)
}