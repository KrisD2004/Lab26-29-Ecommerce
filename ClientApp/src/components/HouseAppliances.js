import React, { Component } from 'react';

    export class HouseAppliances extends Component
    {
        render() {
            const houseApplianceItems = [
                {
                    id: 1,
                    name: "Kitchen Appliances",
                    description: "Full Kitchen set",
                    price: "$2,500.00",
                    imageSrc: "/Kitchen.png"
                },
                {
                    id: 2,
                    name: "Washer",
                    description: "Silver Washer",
                    price: "$250.00",
                    imageSrc: "/Washer.png"
                },
                {
                    id: 3,
                    name: "Microwave",
                    description: "Nice red colored microwave.",
                    price: "$100.00",
                    imageSrc: "/Microwave.png"
                },
            ];

            return (
                <div className="house-appliances-page">
                    <h1 className="house-appliances-title">Welcome to Our Exquisite House Appliances section!</h1>
                    <div className="house-appliances-items">
                        {houseApplianceItems.map(item => (
                            <div key={item.id} className="house-appliances-item">
                                <img
                                    src={item.imageSrc}
                                    alt={item.name}
                                    className="house-appliances-image"
                                />
                                <h2 className="house-appliances-item-title">{item.name}</h2>
                                <p className="house-appliances-item-description">{item.description}</p>
                                <p className="house-appliances-item-price">Price: {item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }

