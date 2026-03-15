import { useEffect } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Auth from "./Auth";
import Journal from "./Journal";
import ProtectedRoute from "./ProtectedRoute";
import API from "./api";
import { useDispatch } from "react-redux";
import { logout, setUser } from "./authSlice";

function App(){

  const dispatch = useDispatch();
  useEffect(()=>{

    checkAuth();

  },[]);

  const checkAuth = async ()=>{

    try{

      const res = await API.get("/auth/check");

      dispatch(setUser(res.data.data));

    }catch{
      dispatch(logout());
    }

  };

return(

<BrowserRouter>

  <Routes>

    <Route
      path="/login"
      element={<Auth setUser={setUser}/>}
    />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute >
        <Journal />
        </ProtectedRoute>
      }
    />

    <Route
      path="*"
      element={<Auth setUser={setUser}/>}
    />

  </Routes>

</BrowserRouter>

);

}

export default App;