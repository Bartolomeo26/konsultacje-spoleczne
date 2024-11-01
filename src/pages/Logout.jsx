import { redirect } from "react-router-dom";
import { useAuth } from "../util/AuthContext";


export function action()
{
    
    localStorage.removeItem('token');
    return redirect('/');
}