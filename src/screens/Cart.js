import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 text-center fs-3 w-100'>The cart is empty!</div>
            </div>


        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            alert("Please login to continue");
            return;
        }
        // console.log(data,localStorage.getItem("userEmail"),new Date())
        let response = await fetch("http://localhost:5000/api/orderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        };

    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    return (
        <div> <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md ">
            <table className="table table-hover text-center">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Food Item</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Options</th>
                        <th scope="col">Price</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn p-0"
                                    onClick={() => dispatch({ type: "REMOVE", index })}
                                >
                                    ❌
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
            <div>
                <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
            </div>

        </div></div>
    )
}
