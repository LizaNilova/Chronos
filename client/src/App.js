import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom"
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { VerifyEmailPage } from "./pages/VerifyEmailPage";

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    // <Layout>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='home-page' element={<MainPage/>}/>
        <Route path='registration' element={<RegistrationPage/>}/>
        <Route path='verify/:token' element={<VerifyEmailPage/>}/>
      </Routes>
    // </Layout>
  );
}

export default App;
