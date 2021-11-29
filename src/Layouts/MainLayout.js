import { Outlet } from 'react-router-dom'
const MainLayout = () => {
    return (
        <div className="w-96 py-4 mx-auto">
            <div className={'w-full overflow-hidden rounded border-4'}>
                <Outlet />
            </div>
        </div>

    )
}

export default MainLayout