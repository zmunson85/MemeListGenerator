import React, { useState, useEffect } from "react";
import Meme from './Meme';
import './App.css'
import { Card } from 'react-bootstrap';
// import EditMeme from "./EditMeme";

const MemeGenerator = () => {
    const [memes, setMemes] = useState([])
    const [generatedMemes, setGeneratedMemes] = useState([])
    const [memeIndex, setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);



    //Grab All Memes, display Random meme on start, set to an array
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(res => {
            const memes = res.data.memes;
            for (let i = memes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i);
                const temp = memes[i];
                memes[i] = memes[j];
                memes[j] = temp;
            }
            setMemes(memes);
        });
    }, []);



    const deleteMeme = (id) => {
        setGeneratedMemes(
            prevGeneratedMemes => prevGeneratedMemes.filter((meme => meme.page_url !== id))
        )
    }

    const generateMeme = (e) => {
        e.preventDefault();
        const randomId = Math.floor(Math.random() * 100) + 1
        const currentMeme = memes[memeIndex];
        const formData = new FormData();
        formData.append('username', 'VschoolTesting');
        formData.append('password', 'Testing1');
        formData.append('template_id', currentMeme.id);
        captions.map((c, index) => formData.append(`boxes[${index}][text]`, c));
        console.log(captions)
        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formData
        })
            .then(res => {
                res.json().then(res => {
                    setGeneratedMemes(prevGeneratedMemes => ([...prevGeneratedMemes,
                    { ...res.data, key: randomId, memeId: currentMeme.id }]));
                });
            });
        setCaptions(Array(memes[memeIndex].box_count).fill(''));
        console.log(captions)
    };

    // const editMeme = () => {

    // }



    useEffect(() => {
        if (memes.length) {
            setCaptions(Array(memes[memeIndex].box_count).fill(''));
        }
    }, [memeIndex, memes]);
    const updateCaption = (e, index) => {
        const text = e.target.value || '';
        setCaptions(
            captions.map((box_count, i) => {
                if (index === i) {
                    return text;
                } else {
                    return box_count;
                }
            })
        );
    };
    console.log(captions)
    const UserMemes = generatedMemes.map((meme, index) =>
        <Meme key={meme.url} rId={meme.page_url} memeId={meme?.memeId} id={index} url={meme?.url} handleDelete={deleteMeme} text={meme.captions} />
    )
    return (
        memes.length ?
            <div className='container'>
                <Card>
                    <h2>React Meme Generator- Create, Read, Update and Delete! </h2>
                    <form onSubmit={generateMeme}>
                        <img src={memes[memeIndex].url} alt='meme' />
                        <button onClick={() => setMemeIndex(memeIndex + 1)} className='skipButton'>Refresh</button>
                        {
                            captions.map((c, index) => (
                                <input value={c} onChange={(e) => updateCaption(e, index)} key={index}
                                    required />
                            ))
                        }
                        <button className='generateButton'>Generate</button>

                    </form>
                </Card>
                <Card>
                    <div className='previewMeme'>
                        <h2 style={{ textAlign: 'center', color: '#FDF0D5' }}>User Generated Memes</h2>
                        {
                            UserMemes
                        }
                    </div>
                </Card >
            </div> :
            <>
                <h2>Memes Will be shown here!</h2>
            </>
    )
}
export default MemeGenerator;
