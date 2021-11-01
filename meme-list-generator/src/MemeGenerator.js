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
    const generateMeme = (e) => {
        e.preventDefault();
        return (
            console.log('Clicked')
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
            console.log(memes[memeIndex].box_count)
            setCaptions(Array(memes[memeIndex].box_count).fill(''));
        }
    }, [memeIndex, memes]);

    const updateCaption = (e, index) => {
        const text = e.target.value || '';
        setCaptions(
            captions.map((box_count, i) => {
                if (index === i) {
                    console.log(text);
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


                <form onSubmit={generateMeme}>
                    {
                        captions.map((c, index) => (
                            <input onChange={(e) => updateCaption(e, index)} key={index} />

                        ))
                    }
                    <li className='memeCaptions'>{captions[0]}</li>
                    <li className='memeCaptions'>{captions[1]}</li>
                    <li className='memeCaptions'>{captions[2]}</li>
                    <li className='memeCaptions'>{captions[3]}</li>
                    <li className='memeCaptions'>{captions[4]}</li>
                    <img src={memes[memeIndex].url} alt='meme' />
                    <button className='generateNewMeme'>Generate</button>
                    <button onClick={() => setMemeIndex(memeIndex + 1)} className='skipButton'>Refresh</button>
                </form>


            </div> : <> test</>
    )
}

export default MemeGenerator;