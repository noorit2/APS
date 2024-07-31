import { useSelector } from "react-redux";


export function getProfile(){
    let profile = useSelector((state)=> state.profile.profile);
    return profile;
} 
