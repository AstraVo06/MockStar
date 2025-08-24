import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
const [email,setEmail]= useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const {session, signUp} = UserAuth();
const navigate = useNavigate();
console.log(session);
console.log(email, password);

const handleSignUp = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
      const result = await signUp(email, password);

      if (result.success) {
        navigate('/dashboard');
      }
  } catch (err) {
       setError('an error occured');    
  } finally {
    setLoading(false);
  }
};


  return <div>
   <form onSubmit = {handleSignUp} className='max-w-md m-auto pt-24'>
    <h2 className='font-bold pb-2'>Sign up today!</h2>
    <p>Already have an account? <Link to ="/signin">Sign in!</Link>
    </p>
    <div className='flex flex-col py-4'>
      <input 
      onChange ={(e) => setEmail(e.target.value)} 
      placeholder='Email' 
      className='p-3 mt-6' 
      type="email"  
      
      />
      <input onChange ={(e) => setPassword(e.target.value)}
      placeholder='Password' 
      className='p-3 mt-6' 
      type="password"  
      />

      <button type='submit' disable={loading} className='pt-4 w-full'>Sign up</button>
      {error && <p className = 'text-red-600 text-center pt-4'>{error}</p>}
    </div>
    </form> 
    </div>


}

export default Signup