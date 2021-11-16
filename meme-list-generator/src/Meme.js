import React, { useState, useEffect } from 'react'
import './App.css'
function Meme(props) {
    const [showEdit, setShowEdit] = useState(false)
    const [captions, setCaptions] = useState([])
    // const [generatedMemes, setGeneratedMemes] = useState({})
    // const handleSubmit = (e) => {
    //     const { name, value } = e.target
    //     props.handleEdit()
    // }
    const updateCaption = (e, index) => {
        console.log("Current value: ", e.target.value)
        const text = e.target.value || '';
        const { value } = e.target
        setCaptions(prevCaptions => {
            return prevCaptions.map((text, i) => {
                if (index === i)
                    return value
                else
                    return text
            })
        })
        // console.log(captions)
    };
    useEffect(() => {
        setCaptions(Array(props.boxCount).fill(''));
    }, [])
    return props.url ?
        <>
            <div className="text-center" style={{ display: 'inline' }}>
                <img src={props.url} alt='oops Its Broken' />
                <button style={{ backgroundColor: '#fdf0d5', color: '#c1121f' }} onClick={
                    () => setShowEdit(prevShowEdit => !prevShowEdit)
                }>EDIT MEME</button>
                <button style={{ backgroundColor: '#c1121f', color: '#fdf0d5' }} onClick={() => props.handleDelete(props.rId)} >DELETE THIS MEME</button>
                {showEdit &&
                    <form>
                        {
                            captions.map((c, index) => (
                                <input value={c} onChange={(e) => updateCaption(e, index)} key={index}
                                    required />
                            ))
                        }
                        <button onClick={(e) => {
                            e.preventDefault()
                            props.handleEdit(props.id, props.memeId, captions)
                        }
                        }>Submit Changes</button>
                    </form>
                }
            </div>
        </>
        : null
}
// function Meme(props) {
//     const [showEdit, setShowEdit] = useState(false)
//     return props.url ?
//         <>
//             <div className="text-center" style={{ display: 'inline' }}>
//                 <img src={props.url} alt='oops Its Broken' />
//                 <button style={{ backgroundColor: '#fdf0d5', color: '#c1121f' }} onClick={() => props.handleEdit(() =>
//                     <>
//                         <form>
//                             {
//                                 props.text.map((c, index) => (
//                                     <input value={c} onChange={(e) => props.updateCaption(e, index)} key={index}
//                                         required />
//                                 ))
//                             }
//                         </form>
//                     </>
//                 )}>EDIT MEME</button>
//                 <button style={{ backgroundColor: '#c1121f', color: '#fdf0d5' }} onClick={() => props.handleDelete(props.rId)} >DELETE THIS MEME</button>
//             </div>
//         </>
//         : null
// }
export default Meme