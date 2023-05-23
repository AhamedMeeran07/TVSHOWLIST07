import s from "./style.module.css"
import { SMALL_IMG_COVER_BASE_URL } from "../../config";
const MAX_LENGTH=20;
export function TVShowListItem({tvShow,onClick}){
    const onClick_=()=>{
        onClick(tvShow);
    }
    return <div onClick={onClick_} className={s.container}>
        <img alt={tvShow.name} src={SMALL_IMG_COVER_BASE_URL+tvShow.backdrop_path}
        className={s.img}/>
        <div className={s.title}>{tvShow.name.length > MAX_LENGTH ? tvShow.name.slice(0,MAX_LENGTH)+"...":tvShow.name}</div>
    </div>;
}