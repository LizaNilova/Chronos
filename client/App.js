import useAuth from './utils/useAuth.js'
import { useRoutes } from "./utils/useRoutes";

import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from "react-redux";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  useAuth();
  const auth = useSelector((state) => state.auth)

  const routes = useRoutes(Boolean(auth.userId));
  return (
    <>
      {routes}
      <ToastContainer position='bottom-right'/>
    </>
  );
}

export default App;
