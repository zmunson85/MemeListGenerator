import React, { useState, useEffect } from "react";


function MemeGenerator() {
    const [memes, setMemes] = useState([])
    const [memeIndex, setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);

    const randomMeme = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };
    const generateMeme = () => {
        return (
            <>
                <h1 style={{ color: 'red' }}>{captions}</h1>
            </>
        )
    };


    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(res => {
            const memes = res.data.memes;
            randomMeme(memes);
            setMemes(memes);
        })
    }, []);

    useEffect(() => {
        if (memes.length) {
            console.log(memes[memeIndex].box_count.value)
            setCaptions(Array(memes[memeIndex].box_count).fill(''));
        }
    }, [memeIndex, memes]);

    const updateCaption = (e, index) => {
        const text = e.target.value || '';
        setCaptions(
            captions.map((box_count, i) => {
                if (index === i) {
                    console.log(text)
                    return text;
                } else {
                    console.log(box_count.value)
                    return box_count;
                }
            })
        );
    };

    return (
        memes.length ?
            <div className='container'>
                <button onClick={(generateMeme)} className='generateNewMeme'>Generate</button>
                <button onClick={() => setMemeIndex(memeIndex + 1)} className='skipButton'>Refresh</button>
                {
                    captions.map((c, index) => (
                        <input onChange={(e) => updateCaption(e, index)} key={index} />
                    ))
                }

                <img src={memes[memeIndex].url} alt={{ captions }} />

            </div> : <></>
    )
}

export default MemeGenerator;