import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom"
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
function App() {
  return (
    // <Layout>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home-page' element={<MainPage/>}/>
        <Route path='/registration' element={<RegistrationPage/>}/>
      </Routes>
    // </Layout>
  );
}

export default App;
