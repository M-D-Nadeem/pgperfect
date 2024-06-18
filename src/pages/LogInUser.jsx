import { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { emailMatch } from '../helper/regexMatch';

import { Link, useNavigate } from 'react-router-dom';
import { loginAccount } from '../redux/slice/userSlice';

const UserLogInpage=()=>{


  const navigate=useNavigate()
  const[visible1 , setvisble1] = useState(false)

  const dispatch=useDispatch()
  const [signIpData,setSignIpData]=useState({
    loginId:"",
    loginPassword:"",
    })
    function handelSignin(e){
        const {name,value}=e.target 
        setSignIpData({
            //set all the values as it is
            ...signIpData,
            //change the fullName to new value
            [name]:value
        })
    }
    async function onSubmit(e){
        e.preventDefault()
        
        if(!signIpData.loginId || !signIpData.loginPassword){
            toast.error("Please fill all the details")
            return
          }
          if(!emailMatch(signIpData.loginId)){
            toast.error("Email not valid")
            return
          }
          const response=await dispatch(loginAccount(signIpData))
          
          if(response?.payload?.sucess){
            console.log(response);
            setSignIpData({
              loginId:"",
              loginPassword:"",
            
            })
            navigate("/studentdashboard")
    
          }
    }

    return(
        <>
        <div className='body h-screen mb-10 '>

<div className='main flex justify-center items-center h-full m-10 shadow-md  rounded-2xl'>

  <div className="leftContainer bg-blue-600 h-full w-1/2 rounded-l-2xl  ">

    <h1 className='m-5 text-white font-bold text-5xl text-center'>Join  Us and Unlock Endless Possibilities!</h1>

    <p className='text-white text-lg m-10 text-center'>Welcome to PG PERFECT! Log in to manage your PG digitally. Easily update listings, track bookings, and streamline operations with our intuitive platform. Simplify your PG management experience and stay connected with your tenants effortlessly.</p>



  </div >

  {/* ------right half---------- */}


  <div className="rightContainer bg-white  h-full w-1/2 rounded-r-2xl ">
    <div className="left_main m-5">

      <div className="upper flex justify-between ">

        <div className="uppertext text-md font-bold left-0">Sign in to <br /> <span className='text-blue-600 text-lg font-extrabold'>VIEW DASHBOARD</span></div>

        
      </div>


    </div>

    <div className="lower flex justify-center">


    <div className="form w-[60%]">

      <form noValidate onSubmit={onSubmit}>
        
        <div className='text-md mx-1 my-5'>


          <h1 className='mx-1 font-semibold'>Enter your Login Id</h1>
          <div className='   flex border border-slate-400 rounded-md p-2 text-sm'>

            <input type="text" 
            
            id='first_name' 
            name='loginId'
            required={true} 
            value={signIpData.loginId}
            onChange={handelSignin}
            placeholder='Enter loginId'
            className='mx-1   rounded-sm px-1 w-[100%] focus:outline-none' />
          </div>
        </div>
        
        <div className='text-md mx-1 my-5'>


          <h1 className='mx-1 font-semibold'>Enter your Login Password</h1>

          <div className='flex items-center border border-slate-400 rounded-md p-2 text-sm'>

            <input  
            value={signIpData.loginPassword}
            type = {visible1 ? "text" : "password"}
            
            id='password' 
            name='loginPassword'
            placeholder='Login Password'
            onChange={handelSignin}
            className='mx-1   rounded-sm px-1 w-[100%] focus:outline-none ' />

            <div className="mr-1" onClick={() => setvisble1(!visible1)}>

              {visible1 ? <FaRegEye/> : <FaRegEyeSlash/>}

            </div>

          </div>
        </div>


         <div className='bg-blue-600  rounded-md flex items-center my-1 h-10'>
          <button type='submit' className='w-full  text-sm  font-semibold  rounded-md hover:cursor-pointer hover:text-white '>Login Account</button>
         </div>
  
      </form>
          </div>
    </div>

  </div>

</div>

</div>
        </>
    )
}

export default UserLogInpage