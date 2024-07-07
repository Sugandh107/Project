import React, { useContext, useState } from "react";
import Usecart from "../../hooks/Usecart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

function Cartpage() {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = Usecart();
  const [cartItems, setcartItems] = useState([]);

  const goback=()=>{
    window.location.href="/menu"
  }
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
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
          });
      }
    });
  };

  const handleMinus = (item) => {
    if (item.quantity > 1) {
      refetch();
      fetch(`http://localhost:3000/cart/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updateCart = cartItems.map((cartitem) => {
            if (cartitem.id === item.id) {
              return { ...cartitem, quantity: cartitem.quantity - 1 };
            }
            return cartitem;
          });
          refetch();
          setcartItems(updateCart);
        });
      refetch();
    }
  };

  const handlePlus = (item) => {
    refetch();
    fetch(`http://localhost:3000/cart/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updateCart = cartItems.map((cartitem) => {
          if (cartitem.id === item.id) {
            return { ...cartitem, quantity: cartitem.quantity + 1 };
          }
          return cartitem;
        });
        refetch();
        setcartItems(updateCart);
      });
    refetch();
  };

  const CartTotal = cart.reduce((total, item) => {
    return total + calculate(item);
  }, 0);
  const Total = CartTotal.toFixed(2);

  function calculate(item) {
    return item.price * item.quantity;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-red-200 text-Black">
      <div className="py-32 px-8 flex flex-col items-center justify-between gap-8">
        {cart.length === 0 ? (
          <div className="md:w-1/2 px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug my-14 mx-14">
              Add Items to the <span className="text-yellow-500">Cart</span>
              <button onClick={goback} className="btn bg-red text-Black hover:bg-orange-500">Back to Menu</button>
            </h2>
          </div>
        ) : (
          <div className="md:w-1/2 px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to the <span className="text-yellow-500">Cart</span>
            </h2>
          </div>
        )}

        <div className="flex flex-col items-center w-4/5 gap-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="cart-item flex flex-col w-[500px] md:flex-row items-center bg-white shadow-lg p-2 md:p-11 transition-transform transform hover:scale-105 rounded-lg"
            >
              <div className="flex items-center mb-4 mr-8 md:mb-0 md:w-1/3 justify-center md:justify-start">
                <div className="avatar">
                  <div className="mask mask-squircle w-24 h-24 md:w-32 md:h-32">
                    <img
                      src={item.image}
                      alt="Item"
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-2/3">
                <div className="flex flex-col gap-2 mb-2 md:mb-0 text-left">
                  <h3 className="text-lg md:text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-500">
                    Rs.{calculate(item).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 md:gap-4">
                    <button
                      className="py-1 px-3 md:px-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 font-bold text-lg md:text-xl"
                      onClick={() => handleMinus(item)}
                    >
                      -
                    </button>
                    <input
                      onChange={() => console.log()}
                      type="number"
                      value={item.quantity}
                      className="w-8 md:w-4 text-center overflow-hidden appearance-none"
                    />
                    <button
                      className="py-1 px-3 md:px-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 font-bold text-lg md:text-xl"
                      onClick={() => handlePlus(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-ghost btn-xs self-start md:self-end mt-2 md:mt-0 text-red-500"
                  onClick={() => handleDelete(item)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="my-12 flex flex-col md:flex-row justify-center gap-60">
          <div className="space-y-3">
            <h1 className="font-medium">Customer Details</h1>
            <p>Name: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
            <p>UserID: {user?.uid}</p>
          </div>
          <div className="space-y-3">
            <h1 className="font-medium">Shopping Details</h1>
            <p className="font-bold">Total Items {cart.length}</p>
            <p className="font-bold">Total Price: Rs.{Total}</p>
            <button className="btn bg-yellow-500 text-Black hover:bg-yellow-600">Proceed Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartpage;
