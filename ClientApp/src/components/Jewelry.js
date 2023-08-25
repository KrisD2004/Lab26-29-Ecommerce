import { Component } from "react";


    export class Jewelry extends Component
    {

        render() {
            const jewelryItems = [
                {
                    id: 1,
                    name: "Diamond Earrings",
                    description: "Stunning diamond earrings for any occasion.",
                    price: "$999.99",
                    imageSrc: "/v81gikda.png" 
                },

                
            ];

            return (
                <div className="jewelry-page">
                    <h1 className="jewelry-title">Welcome to Our Exquisite Jewelry Collection</h1>
                    <div className="jewelry-items">
                        {jewelryItems.map(item => (
                            <div key={item.id} className="jewelry-item">
                                <img
                                    src={item.imageSrc}
                                    alt={item.name}
                                    className="jewelry-image"
                                />
                                <h2 className="jewelry-item-title">{item.name}</h2>
                                <p className="jewelry-item-description">{item.description}</p>
                                <p className="jewelry-item-price">Price: {item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
            
        }

    }

