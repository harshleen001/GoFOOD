import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
//import Carousal from '../components/Carousal'
export default function Home() {
    const [search, setSearch] = useState("");
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        //console.log(response[0],response[1]);
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    }

    useEffect(() => {
        loadData();
    }, [])




    return (
        <div>

            <div><Navbar /> </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "10" }} >
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
                                {/* <button className="btn btn-outline-success " type="submit">Search</button> */}
                            </div>
                        </div>


                        <div className="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=akEIJdrYnU1_iDZjvZyNdQ7CsYLuz8NTYnjCxT3UA4g=" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>


            <div className="container">
                {
                    foodCat.length > 0
                        ? foodCat.map((data) => {
                            return (
                                <div className="row mb-3">
                                    <div key={data._id} className="fs-3 m-3">
                                        {data.CategoryName}
                                    </div>
                                    <hr></hr>
                                    {foodItem.length > 0 ? foodItem.filter((item) =>
                                        item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())
                                    ).map((filterItems) => {
                                            return (
                                                <div key={filterItems._id} className="col-12 md-6 col-lg-3" style={{ cursor: "pointer" }}>
                                                    <Card foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                       
                                                    ></Card>
                                                </div>
                                            );
                                        }




                                        ) : <div>No food items available</div>}

                                </div>
                            );
                        })
                        : <div>No categories available</div>
                }


            </div>
            <div><Footer /></div>
        </div>
    )
}
