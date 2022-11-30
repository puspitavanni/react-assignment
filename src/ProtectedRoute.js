import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //Check URL params for password
  const [searchParams] = useSearchParams();

  if (!searchParams.get('password') || searchParams.get('password') !== 'secret') {
    return <Navigate to={'/unauthorized'} replace />
  }

  return children; // TODO: replace this
};

export default ProtectedRoute;
