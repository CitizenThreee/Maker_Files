import {Routes, Route, Navigate, Outlet} from "react-router-dom"
import Home from "./pages/Home"
import User from "./pages/User"
import Login from "./pages/Login"
import { useUserContext } from "./context/UserProvider"
import MakerFile from "./pages/MakerFile"
import CreateFile from "./pages/CreateFile"

function LoginRedirect({ redirectPath = '/login', children}) {
    const { user } = useUserContext();

    if(!user.email) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet/>;
}

function UserRedirect({ redirectPath = '/user', children }) {
    const { user } = useUserContext();

    if(user.email) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet/>
}

export default function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<Home {...props}></Home>}/>
            <Route path="user" element={<LoginRedirect><User {...props}></User></LoginRedirect>}/>
            <Route path="login" element={<UserRedirect><Login {...props}></Login></UserRedirect>}/>
            <Route path="makerfile" element={<MakerFile {...props}></MakerFile>}/>
            <Route path="create" element={<LoginRedirect><CreateFile {...props}></CreateFile></LoginRedirect>}/>
        </Routes>
    )
}