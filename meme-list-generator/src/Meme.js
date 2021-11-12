import React from 'react'
function Meme(props) {

    return props.url ?

        //get same image as well as the form to match box_count
        //manage own version of caption state, need to target the specific image 
        <>

            <div>
                <img src={props.url} alt='oops Its Broken' />
                <button style={{ marginTop: '10px', backgroundColor: 'orange' }}>UPDATE THIS MEME</button>
                {/* filter for delete */}
                <button onClick={() => props.handleDelete(props.rId)} style={{ backgroundColor: 'red' }}>DELETE THIS MEME</button>
            </div>
        </>
        : null
}

export default Meme
