import { useSelector } from "react-redux";
import Login from "../../components/login/login.component";
import ErrorPage from "../error-page/error-page.component";
import { RootState } from "../../redux/store";

const LoginPage=()=>{
    const auth=useSelector((state: RootState)=> state.users.currentUser.auth)

    return (
    !auth
    ?
    <div className="flex justify-center items-center w-[100%] h-[80vh]">
        <Login />
    </div>
    :
    <ErrorPage />
)}

export default LoginPage;