import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      alert("You're not logged in.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/myorderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      });

      const result = await res.json();
      console.log("📦 My Order Response:", result);

      if (result.orderData && result.orderData.order_data) {
        setOrderData(result.orderData.order_data);
      } else {
        setOrderData([]);
      }
    } catch (error) {
      console.error("❌ Failed to fetch order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

return (
    <div>
        <Navbar />

        <div className="container my-5">
            <h2 className="text-center mb-100">My Orders</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : orderData.length === 0 ? (
                <p className="text-center text-muted">No orders found.</p>
            ) : (
<div className="row">
{orderData.slice(0).reverse().map((orderGroup, i) => (
    Array.isArray(orderGroup) ? (
        <div key={i}>
            {orderGroup.map((item, idx) =>
                item.Order_date ? (
                    <div key={idx} className="text-left mt-5 text-success">
                        <h5> {item.Order_date}</h5>
                        <hr />
                    </div>
                ) : (
                    <div key={idx} className="col-12 col-md-6 col-lg-3">
                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                            {/* <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="container w-100 p-0" style={{ height: "38px" }}>
                                    <span className="m-1">{item.qty}</span>
                                    <span className="m-1">{item.size}</span>
                                    <div className="d-inline ms-2 h-100 w-20 fs-5">
                                        ₹{item.price}/-
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    ) : null 
))}
</div>
            )}
        </div>

        <Footer />
    </div>
);
}
