import React from 'react'
import { UserAuth} from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
const {session, signOut} = UserAuth();
const navigate = useNavigate();
console.log(session);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard