import React, { useState, useEffect } from "react";
import Meme from './Meme';
function MemeGenerator() {
    const [memes, setMemes] = useState([])
    const [generatedMemes, setGeneratedMemes] = useState([{ data: '' }])
    const [memeIndex, setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);
    const [generatedMeme, setGeneratedMeme] = useState([{
        box_count: 0,
        topText: '',
        bottomText: '',
        url: ''

    }]);


    const generateMeme = (e) => {
        e.preventDefault();
        const currentMeme = memes[memeIndex];
        const formData = new FormData();
        formData.append('username', 'VschoolTesting');
        formData.append('password', 'Testing1');
        formData.append('template_id', currentMeme.id);
        captions.map((c, index) => formData.append(`boxes[${index}][text]`, c));
        console.log(generatedMemes)
        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formData
        })
            .then(res => {
                res.json().then(res => {
                    setGeneratedMemes(prevGeneratedMemes => ([...prevGeneratedMemes,
                    { data: res.data }]));
                    console.log(res.data.url)
                    // return generatedMemes
                });
            });

        console.log(generatedMemes)

    };
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
    useEffect(() => {
        if (memes.length) {
            setCaptions(Array(memes[memeIndex].box_count).fill(''));
            console.log(memeIndex)
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
    console.log(generatedMemes)
    const mappedMemes = generatedMemes.map(meme =>

        <Meme url={meme.data.url} />

    )

    return (
        memes.length ?
            <div className='container'>
                <form onSubmit={generateMeme}>
                    {
                        captions.map((c, index) => (
                            <input onChange={(e) => updateCaption(e, index)} key={index} required />
                        ))

                    }
                    <img src={memes[memeIndex].url} alt='meme' />

                    <button className='generateButton'>Generate</button>
                    <button onClick={() => setMemeIndex(memeIndex + 1)} className='skipButton'>Refresh</button>
                </form>

                <div className='previewMeme'>
                    <h1>Meme Preview</h1>
                    {
                        mappedMemes
                    }
                </div>

            </div> :
            <>
                <h2>Memes Will be shown here!</h2>
            </>
    )
}
export default MemeGenerator;
