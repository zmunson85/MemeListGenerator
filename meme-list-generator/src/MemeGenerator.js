import React, { useState, useEffect } from "react";
import Header from "./Header";


function MemeGenerator() {
    const [memes, setMemes] = useState([])
    const [generatedMemes, setGeneratedMemes] = useState([])
    const [memeIndex, setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);
<<<<<<< HEAD

=======
>>>>>>> 594acf750f7d7337e952867957ba659ddada33bd
    const generateMeme = (e) => {
        e.preventDefault();
        const currentMeme = memes[memeIndex];
        const formData = new FormData();
<<<<<<< HEAD

=======
>>>>>>> 594acf750f7d7337e952867957ba659ddada33bd
        formData.append('username', 'VschoolTesting');
        formData.append('password', 'Testing1');
        formData.append('template_id', currentMeme.id);
        captions.map((c, index) => formData.append(`boxes[${index}][text]`, c));
        console.log(generatedMemes)
<<<<<<< HEAD

=======
>>>>>>> 594acf750f7d7337e952867957ba659ddada33bd
        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formData
        }).then(res => {
            res.json().then(res => {
                setGeneratedMemes(res.data.url);
                console.log(res.data.url)
                return generatedMemes
            });
        });
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
        }
    }, [memeIndex, memes]);
<<<<<<< HEAD


=======
>>>>>>> 594acf750f7d7337e952867957ba659ddada33bd
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
    return (
       
        memes.length ?
       <><div className="header"><h1>Meme Generator</h1></div><div className='container'>
                <form onSubmit={generateMeme}>
<<<<<<< HEAD
                    {
                        captions.map((c, index) => (
                            <input onChange={(e) => updateCaption(e, index)} key={index} required />
                        ))
                    }
                    <img src={memes[memeIndex].url} alt='meme' />
                    {captions.map((inputText, caption) => {
                        console.log(inputText)
                        return <h1 key={caption}>{inputText}</h1>
=======
                    {captions.map((c, index) => (
                        <input onChange={(e) => updateCaption(e, index)} key={index} required />
                    ))}
                    <img src={memes[memeIndex].url} alt='meme' />
                    {captions.map((inputText, caption) => {
                        console.log(inputText);
                        return <h2 key={caption}>{inputText}</h2>;
>>>>>>> 594acf750f7d7337e952867957ba659ddada33bd
                    })}
                    <button className='generateButton'>Generate</button>
                    <button onClick={() => setMemeIndex(memeIndex + 1)} className='skipButton'>Refresh</button>
                </form>
<<<<<<< HEAD
                {generatedMemes.length ?
                    <div className='previewMeme'>
                        <img src={generatedMemes} alt='test' />
                    </div>
                    : null
                }
                {console.log(generatedMemes)}
            </div> : <> </>
=======
                <div className='previewMeme'>
                    <img src={generatedMemes} alt='test' />
                </div>
            </div></> : <> </>
>>>>>>> 594acf750f7d7337e952867957ba659ddada33bd
    )
}
export default MemeGenerator;