import React from 'react'
function Meme(props) {
    return props.url ?

        <div>
            <img src={props.url} alt='oops Its Broken' />
        </div>
        : null
}

export default Meme
