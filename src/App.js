import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser)

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login" />;
    }

    return children
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
