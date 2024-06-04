import {React,useContext} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaFontAwesomeLogoFull, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import AuthProvider, { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';

function LoginUser() {
  
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) =>{
        const email = data.email;
    const password = data.password;
 
    login(email, password).then((result) => {
      const user = result.user;
      toast.success('Login Sucess')
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }).catch((error) => {
      const errorMessage = error.message;
     toast.error("Provide a correct gmail and password!")
      
    })
      }

      const  {signUpWithGmail,login}=useContext(AuthContext)
        

     const handlelogin=()=>{
        signUpWithGmail().then((result)=>{
          toast.success('Login Sucessfull')
          const user =result.user
          window.location.href='/';
                }).catch((error)=>{
          console.log(error)
          toast.error("Invalid gmail and password")
        }
        )
      }
  return (
    <div>
        <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error */}

            {/* login btn */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-green text-white"
              />
            </div>

            <p className="text-center my-2">
            Donot have an account?{" "}
            <Link to="/signup" className="underline text-red ml-1">
              Signup Now
            </Link>{""}
          </p>
           

            <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >✕</Link>
          </form>

          {/* social sign in */}
          <div className="text-center space-x-3 mb-5">
            <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handlelogin}>
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
            </button>
          </div>
        </div>
       
       
    </div>
    </div>
  )
}

export default LoginUser