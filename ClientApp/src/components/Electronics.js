import React, { Component } from 'react';

export class Electronics extends Component
{
    render() {
        const jewelryItems = [
            {
                id: 1,
                name: "",
                description: "",
                price: "",
                imageSrc: ""
            },


        ];

        return (
            <div className="electric-page">
                <h1 className="electric-title">Welcome to Our Electronic section!</h1>
                <div className="electric-items">
                    {jewelryItems.map(item => (
                        <div key={item.id} className="electric-item">
                            <img
                                src={item.imageSrc}
                                alt={item.name}
                                className="electric-image"
                            />
                            <h2 className="electric-item-title">{item.name}</h2>
                            <p className="electric-item-description">{item.description}</p>
                            <p className="electric-item-price">Price: {item.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        )

    }



}

