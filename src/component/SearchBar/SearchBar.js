import s from "./style.module.css";

import {Search as SearchIcon} from "react-bootstrap-icons";
import { useState } from "react";
export function SearchBar({onSubmit}){
    const[value,setValue]=useState("");
    function submit(e){
        if (e.key === "Enter" && e.target.value.trim()!=="") {
           onSubmit(e.target.value)
           setValue("");
          // console.log(e.target.value);
          }
    }
    function handle(e){
       // console.log("typed"+e.target.value)
        setValue(e.target.value)
    }
    return <>
    <SearchIcon size={27} className={s.icon}/>
    <input 
    onKeyUp={submit}
    onChange={handle}
    className={s.input}
     type="text"
     value={value}
    placeholder={"Search a tv show you may like"}
    />
    </>
}