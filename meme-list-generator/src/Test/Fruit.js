import React, {useState} from 'react';

function Fruit(props) {

    const [isEdit, setIsEdit] = useState(false)
    const [fruit, setFruit] = useState({
        title: props.fruit.title, 
        color: props.fruit.color
    })

    const handleChange = (e) => { 
        const {name, value} = e.target
        setFruit(prevFruit => ({
            ...prevFruit, 
            [name]: value
        }))
    }

    return (
        <div>
            {isEdit ? 
                <form onSubmit={(e) => { 
                    e.preventDefault()
                    props.edit(props.id, {title: fruit.title, color: fruit.color})
                    setIsEdit(prevEdit => !prevEdit)
                }}>
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
                    <button type="submit">Update Item</button>
                </form> 
                : 
                <div>
                    <h2>{props.fruit.title}</h2>
                    <p>{props.fruit.color}</p>
                </div>
            }

            <button onClick={() => setIsEdit(prevEdit => !prevEdit)}>{isEdit ? "Cancel" : "Edit"}</button> 
            <button onClick={() => props.delete(props.id)}>Delete</button>
        </div>
    );
}

export default Fruit;