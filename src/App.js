import { BrowserRouter } from "react-router-dom";
import Router from './Router'
import {Toaster} from "react-hot-toast";

const App = () => {

  return (
    <BrowserRouter>
        <>
            <Toaster />
            <Router />
        </>

    </BrowserRouter>
  );
}

export default App;
