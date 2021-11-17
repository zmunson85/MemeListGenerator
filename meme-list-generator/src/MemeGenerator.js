import React, { useState, useEffect } from "react";
import Meme from './Meme';
import './App.css'
import { Card } from 'react-bootstrap';

const MemeGenerator = () => {
    const [memes, setMemes] = useState([])
    const [generatedMemes, setGeneratedMemes] = useState([])
    const [memeIndex, setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);

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

    const editMeme = (id, memeId, captionsArr) => {
        const editData = new FormData();
        editData.append('username', 'VschoolTesting');
        editData.append('password', 'Testing1');
        editData.append('template_id', memeId);
        captionsArr.forEach((c, index) => editData.append(`boxes[${index}][text]`, c));

        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: editData
        })
            .then(res => {
                res.json().then(res => {
                    if (res.error_message) {
                        alert(res.error_message, + 'please complete the inputs before submitting')

                    } else {


                        console.log(res.error_message, 'res.data: coming from edit meme')
                        setGeneratedMemes(
                            prevGeneratedMemes => prevGeneratedMemes.map((meme, index) => {
                                console.log("current meme in map: ", meme)
                                if (index === id) {

                                    console.log("hey this needs to be replaced")
                                    console.log(res.data)
                                    return { ...res.data, memeId: memeId, captions, box_count: meme.box_count }
                                }
                                else {
                                    return meme
                                }
                            })
                        )
                    }
                });
                setCaptions(Array(memes[memeIndex].box_count).fill(''));
            });
    }
    const generateMeme = (e) => {
        e.preventDefault();
        const randomId = Math.floor(Math.random() * 100) + 1
        const currentMeme = memes[memeIndex];
        console.log(currentMeme)
        const formData = new FormData();
        formData.append('username', 'VschoolTesting');
        formData.append('password', 'Testing1');
        formData.append('template_id', currentMeme.id); // 
        captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));
        console.log(captions)
        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formData
        })
            .then(res => {
                res.json().then(res => {
                    setGeneratedMemes(prevGeneratedMemes => ([...prevGeneratedMemes,
                    { ...res.data, key: randomId, memeId: currentMeme.id, captions, box_count: currentMeme.box_count }]));
                });
            });
        setCaptions(Array(memes[memeIndex].box_count).fill(''));
        console.log(captions)
    };
    useEffect(() => {
        console.log("this useeffect was called")
        if (memes.length) {
            setCaptions(Array(memes[memeIndex].box_count).fill(''));
        }
    }, [memeIndex, memes]);
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
    const UserMemes = generatedMemes.map((meme, index) =>
        <Meme
            key={meme.url + meme}
            rId={meme.page_url}
            memeId={meme?.memeId}
            id={index}
            url={meme?.url}
            handleDelete={deleteMeme}
            handleEdit={editMeme}
            text={meme.captions}
            updateCaption={updateCaption}
            boxCount={meme.box_count}
        />
    )
    return (
        memes.length ?
            <div className='container'>
                <h2>Cruddy Meme Generator</h2>
                <Card className='memeHeader'>
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
                <div className='previewMeme'>
                    <Card>
                        <h2 style={{ textAlign: 'center', color: '#FDF0D5' }}>User Generated Memes</h2>
                        {
                            UserMemes
                        }
                    </Card >
                </div>
            </div> :
            <>
                <h2>Memes Will be shown here!</h2>
            </>
    )
}
export default MemeGenerator;