import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

function Profile() {
  const {UserName,setUserName}=useContext(AuthContext)
  function handleusername(e){
    setUserName(e.target.value)
   
  }
  console.log(UserName);
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" >
        <h3 className='font-bold'>Update Your Profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input  type="text" placeholder="your name" className="input input-bordered" required onChange={handleusername} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>

          <input type="text"  placeholder="photoURL" className="input input-bordered"  />
          
          {/* TODO: Uplodaing image will be later */}
          {/* <input type="file" className="file-input w-full max-w-xs" /> */}
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-green text-white" onClick={()=>{
              
          }}>Update</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Profile