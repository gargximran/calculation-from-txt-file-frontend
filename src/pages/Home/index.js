import SubInputFields from "./SubInputFields";
import SubDNDList from "./SubDNDList";


const Home = () => {


    return (
        <>
            <div className="h-64 overflow-y-scroll">
                <SubDNDList />
            </div>
            <div>
                <SubInputFields />
            </div>
        </>
    )
}

export default Home