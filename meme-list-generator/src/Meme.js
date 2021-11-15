import React from 'react'
import './App.css'

import { Card } from 'react-bootstrap';

function Meme(props) {

    return props.url ?
        <>
            <Card className="text-center" style={{ display: 'inline' }}>
                <img src={props.url} alt='oops Its Broken' />
                <button style={{ backgroundColor: '#fdf0d5', color: '#c1121f' }} onClick={() => props.editMeme(props.rId)}>EDIT MEME</button>
                <button style={{ backgroundColor: '#c1121f', color: '#fdf0d5' }} onClick={() => props.handleDelete(props.rId)} >DELETE THIS MEME</button>
            </Card>
        </>
        : null
}

export default Meme
