import React from 'react'
import { UserAuth} from '../context/AuthContext';


const Dashboard = () => {
const {session, signOut} = UserAuth();
const navigate = useNavigate();
console.log(session);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard