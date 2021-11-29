import {Routes, Route} from "react-router-dom";
import Home from './pages/Home'
import MainLayout from "./Layouts/MainLayout";
import History from "./pages/History";



const Router = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path={'history'} element={<History />} />
            </Route>
        </Routes>
    )
}

export default Router