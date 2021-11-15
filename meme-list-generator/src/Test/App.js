import React, { useState } from 'react';
import Fruit from './Fruit';

function App(props) {

    const [fruits, setFruits] = useState([{
        title: "Kiwi",
        color: "Green"
    }])

    const [fruit, setFruit] = useState({
        title: "",
        color: ""
    })


    const editFruit = (id, updatedFruitItem) => {
        setFruits(prevFruits => {
            let newFruits = prevFruits.map((fruit, index) => {
                if (id === index)
                    return updatedFruitItem
                else
                    return fruit
            })
            return [...newFruits]
        })
    }

    const deleteFruit = (id) => {
        // slice 

        // find => return the found item 

        // filter =>
        setFruits(prevFruits => {
            let newFruits = prevFruits.filter((fruit, index) => {
                if (id !== index) return fruit
            })
            // let newFruits = prevFruits.filter((fruit, index) => id !== index )
            return [...newFruits]
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFruit(prevFruit => ({
            ...prevFruit,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFruits(prevFruits => [...prevFruits, { title: fruit.title, color: fruit.color }])
        setFruit({
            title: "",
            color: ""
        })
    }

    return (
        <div>
            <h2>Add New Fruit: </h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    onChange={handleChange}
                    value={fruit.title}
                />
                <input
                    name="color"
                    onChange={handleChange}
                    value={fruit.color}
                />
                <button type="submit">Add New Fruit</button>
            </form>

            <h2>My List of Fruit: </h2>
            {fruits.map((fruit, index) => <Fruit
                key={fruit + index}
                fruit={fruit}
                id={index}
                delete={deleteFruit}
                edit={editFruit}
            />)}
        </div>
    );
}

export default App;

