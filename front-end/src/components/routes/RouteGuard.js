import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
 
const RouteGuard = ({children }) => {
 
   return isAuthenticated() ?
                children
                :
                <Navigate to={{ pathname: '/login' }} />;
};
 
export default RouteGuard;