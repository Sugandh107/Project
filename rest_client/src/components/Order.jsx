import React, { useContext } from 'react'
import useAuth from '../hooks/useAuth'
import OrdersComponent from './OrdersComponent';
import { AuthContext } from '../context/AuthProvider';

function Order() {
  const { user } = useContext(AuthContext);
  const userEmail=user?.email;
  return (
    <div >
       <div className="min-h-screen bg-gray-100 py-8 my-24">
       <h1 className="text-3xl font-bold text-center mb-8">Orders for {user?.displayName || userEmail }</h1>
        <div className='flex flex-col gap-28 '>
        <OrdersComponent email={userEmail} />
        </div>
    </div>
    </div>
  )
}

export default Order