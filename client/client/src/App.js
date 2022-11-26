import useAuth from './utils/useAuth.js'
import { useRoutes } from "./utils/useRoutes";

import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from "react-redux";

function App() {
  useAuth();
  const auth = useSelector((state) => state.auth)

  const routes = useRoutes(Boolean(auth.userId));
  return (
    <>
      {routes}
    </>
  );
}

export default App;
