import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

const user = useSelector((state)=>state.auth.user);
const loading = useSelector((state)=>state.auth.loading);

if(loading) return <p>Loading...</p>;

if(!user){
  return <Navigate to="/login" replace />;
}

return children;

}

export default ProtectedRoute;