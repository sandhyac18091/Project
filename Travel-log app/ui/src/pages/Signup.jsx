import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import mountImage from '../assets/mount.png';


const Signup = () => {
 const [firstname, setFirstname] = useState('');
 const [lastname, setLastname] = useState('');
 const [username, setUsername] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
//  const [role, setRole] = useState('User');
 const [error, setError] = useState('');


 const navigate = useNavigate();


 const handleSignup = async (e) => {
   e.preventDefault();


   try {
     const response = await fetch('http://localhost:7005/Signup', {
       method: 'POST',
       credentials: 'include',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         Firstname: firstname,
         Lastname: lastname,
         Username: username,
         Email: email,
         Password: password,
        //  Userrole: role,
       }),
     });


     if (!response.ok) {
       const errData = await response.json();
       throw new Error(errData.msg || 'Signup failed');
     }


     navigate('/login');
   } catch (err) {
     setError(err.message || 'Signup failed: Please try again!');
   }
 };


 return (
<div className="min-h-screen flex items-center justify-center bg-gray-800">
     <div className="w-[900px] bg-gray-900 rounded-xl overflow-hidden flex shadow-lg">
      
       <div className="w-1/2">
         <img src={mountImage} alt="Signup" className="h-full w-full" />
       </div>


       <div className="w-1/2 p-8">
         <h2 className="text-3xl font-bold text-white mb-2">Sign Up</h2>
         <p className="text-gray-400 mb-6">
           Already have an account?
           <Link to="/login" className="text-purple-400 hover:underline"> Log in</Link>
         </p>
         {error && <p className="text-red-500 text-center mt-2">{error}</p>}


         <form onSubmit={handleSignup}>
           <div className="flex gap-4 mb-4">
             <input
               type="text"
               placeholder="First Name"
               className="w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
               value={firstname}
               onChange={(e) => setFirstname(e.target.value)}
               required
             />
             <input
               type="text"
               placeholder="Last Name"
               className="w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
               value={lastname}
               onChange={(e) => setLastname(e.target.value)}
               required
             />
           </div>
           <input
             type="text"
             placeholder="Username"
             className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             required
           />
           <input
             type="email"
             placeholder="Email"
             className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
           <input
             type="password"
             placeholder="Enter your password"
             className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />


          
           {/* <select
             className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white"
             value={role}
             onChange={(e) => setRole(e.target.value)}
           >
             <option value="User">User</option>
             <option value="Admin">Admin</option>
           </select> */}


           <div className="flex items-center mb-6">
             <input type="checkbox" id="terms" className="mr-2" required />
             <label htmlFor="terms" className="text-gray-400 text-sm">
               I agree to the
               <Link to="" className="text-purple-400 hover:underline"> terms & conditions</Link>
             </label>
           </div>


           <button
             type="submit"
             className="w-full py-3 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 text-center"
           >
             Sign Up
           </button>
         </form>
       </div>


     </div>
   </div>
 );
};


export default Signup;


