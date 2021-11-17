import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import './App.css'
function Meme(props) {
    const [showEdit, setShowEdit] = useState(false)
    const [captions, setCaptions] = useState([])

    const updateCaption = (e, index) => {
        console.log("Current value: ", e.target.value)
        const { value } = e.target
        setCaptions(prevCaptions => {
            return prevCaptions.map((text, i) => {
                if (index === i)
                    return value
                else
                    return text
            })
        })
    };
    useEffect(() => {
        setCaptions(Array(props.boxCount).fill(''));
    }, [props.boxCount])
    return props.url ?
        <>
            <Card>
                <div className="text-center" >
                    <div style={{ display: 'inline-block' }}>
                        <img src={props.url} alt='oops Its Broken' />
                        <button style={{ margin: 'auto', justifyContent: 'center', backgroundColor: '#fdf0d5', color: '#c1121f' }} onClick={
                            () => setShowEdit(prevShowEdit => !prevShowEdit)
                        }>EDIT MEME</button>
                        <button style={{ margin: 'auto', backgroundColor: '#c1121f', color: '#fdf0d5' }} onClick={() => props.handleDelete(props.rId)} >DELETE THIS MEME</button>
                        {showEdit &&
                            <form>
                                {
                                    captions.map((c, index) => (
                                        <input className='renderInputs' value={c} onChange={(e) => updateCaption(e, index)} key={index}
                                        />
                                    ))
                                }
                                <button style={{ backgroundColor: '#e76f51', color: '#fefae0' }} onClick={(e) => {
                                    e.preventDefault()
                                    props.handleEdit(props.id, props.memeId, captions)
                                }


                                }>Submit Changes</button>
                            </form>
                        }
                    </div>
                </div>
            </Card>
        </>
        : null
}

export default Meme