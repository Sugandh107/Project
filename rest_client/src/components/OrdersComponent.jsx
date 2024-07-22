import React, { useState, useEffect } from "react";

const OrdersComponent = ({ email }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/payment", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  function goback(){
    window.location.href="/"
  }
  const calculateTotalPrice = (orders) => {
    return orders.reduce((total, order) => {
      if (order.price) {
        return total + order.price;
      }
      return total;
    }, 0);
  };
  orders.map(order=>order.price )
  const totalPrice = calculateTotalPrice(orders);
  console.log( totalPrice);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error fetching data: {error}
      </div>
    );

  const filteredOrders = orders.filter((order) => order.email === email);
  console.log(orders);

  if(filteredOrders.length!==0){
    return ( <div className="container mx-auto p-4">
      {filteredOrders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-lg p-4 mb-4 shadow-lg my-14"
        >
          <h2 className="text-xl font-bold mb-2">Order ID: {order._id}</h2>
          <p className="text-gray-600">
            Date: {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-600">Status: {order.status}</p>
          <p className="text-gray-600">PaymentID: {order.transactionId}</p>
          <p className="text-gray-600">No of Items :{order.itemName.length}</p>
          <p className="text-gray-800 font-semibold">
            Total Price: ${order.price}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {order.itemName.map((name, index) => (
              <div
                key={index}
                className="item border border-gray-300 rounded-lg p-2"
              >
                <img
                  className="w-full h-32 object-contain rounded"
                  src={order.itemImage[index]}
                  alt={name}
                />
                <p className="mt-2 text-center">{name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>)
  }else{
  return (

    <> 
    <div className="md:w-1/2 px-4 space-y-7 mx-[520px]">
      <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug my-14 mx-14 ">
        Empty <span className="text-yellow-500">Cart</span>  </h2>
        <button 
          onClick={goback}
          className="btn bg-red text-Black hover:bg-orange-500 mx-40"
        >
          Back to Menu
        </button>
    
    </div>
    </>




   
  );
};
}
export default OrdersComponent;
