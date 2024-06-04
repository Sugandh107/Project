import React, { useContext, useState } from "react";
import OrderItems from "../../components/OrderItems";
import Usecart from "../../hooks/Usecart";
import { FaTrash } from "react-icons/fa";
import { FiMinus, FiMinusCircle, FiPlus, FiPlusCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
function Cartpage() {

  const { user, UserName, setUserName } = useContext(AuthContext);
  const [cart, refetch] = Usecart();
  const [cartItems, setcartItems] = useState([]);


  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/cart/${item._id}`, {
          method: "DELETE", // Specify DELETE method in the headers
        })
          .then((res) => res.json()) // Corrected syntax: added parentheses for .json()
          .then((data) => {
            refetch();
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            // Handle error if fetch fails
          });
      }
    });
  };
  
  const handleMinus=(item)=>{
    if(item.quantity>1){
    refetch()
    fetch(`http://localhost:3000/cart/${item._id}`,{
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({quantity:item.quantity-1})
    })
      .then((res) => res.json())
      .then((data) => {
        const updateCart = cartItems.map((cartitem) => {
          if (cartitem.id ===  item.id) {
            return { ...cartitem, quantity: cartitem.quantity-1};
          }
          return cartitem;
        });
        refetch()
        setcartItems(updateCart);
      });
      refetch()
    } 
  }

  const CartTotal=cart.reduce((total,item)=>{
    return total+calclulate(item);
  },0)
  const Total=CartTotal.toFixed(2);
  function calclulate(item){
    return item.price * item.quantity;
  }

  function handlePlus(item) {
    refetch()
    fetch(`http://localhost:3000/cart/${item._id}`,{
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({quantity:item.quantity+1})
    })
      .then((res) => res.json())
      .then((data) => {
        const updateCart = cartItems.map((cartitem) => {
          if (cartitem.id ===  item.id) {
            return { ...cartitem, quantity: cartitem.quantity+1};
          }
          return cartitem;
        });
        refetch()
        setcartItems(updateCart);
      });
      refetch()
  };

  
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%  z-50">
      <div className="py-32 px-8 flex flex-col  items-center justify-between gap-8">
        <div className="md:w-1/2 px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Items Added to the <span className="text-green">Cart</span>
          </h2>
        </div>
        <div className="overflow-x-auto ">
          <table className="table w-[1000px]">
            <thead>
              <tr className="bg-green text-white">
                <th className="text-lg">#</th>
                <th className="text-lg">Food</th>
                <th className="text-lg"> Item Name</th>
                <th className="text-lg">Quantity</th>
                <th className="text-lg">Price</th>
                <th className="text-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-8">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td className="flex gap-4 items-center ">
                    <button className="py-1 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-xl" onClick={()=>handleMinus(item)}>
                      -
                    </button>
                    <input
                    onChange={()=>console.log()}
                      type="number"
                      value={item.quantity}
                      className="w-8 text-center overflow-hidden appearance-none "
                    />
                    <button className="py-1 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-xl " onClick={()=>handlePlus(item)}>
                      + 
                    </button>
                  </td>
                  <td>${calclulate(item).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-m "
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
      <div className="my-12 flex flex-col md:flex-row justify-center gap-60  ">
        <div className="space-y-3">
          <h1 className="font-medium"> Customer Details</h1>
          <p>Name : {UserName}</p>
          <p>Email :{user.email}</p>
          <p>UserID :{user.uid}</p>
        </div>
        <div className=" space-y-3">
          <h1 className="font-medium"> Shopping Details</h1>
          <p>Total Items {cart.length}</p>
          <p>Total Price {Total}</p>
          <button className="btn bg-green text-white">Proceed Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cartpage;
