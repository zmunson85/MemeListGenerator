import React, { useState } from 'react'
import './App.css'



function Meme(props) {

    const [showEdit, setShowEdit] = useState(false)
    // const [generatedMemes, setGeneratedMemes] = useState({})

    // const handleSubmit = (e) => {
    //     const { name, value } = e.target
    //     props.handleEdit()
    // }

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
                            props.text.map((c, index) => (
                                <input value={c} onChange={(e) => props.updateCaption(e, index)} key={index}
                                    required />
                            ))

                        }
                        <button onClick={() => props.handleEdit(props.id, props.memeId)}>Submit Changes</button>
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
