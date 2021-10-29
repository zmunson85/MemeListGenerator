import React, { useState, useEffect } from "react";

function MemeGenerator() {
    const [upperText, setUpperText] = useState("")
    const [lowerText, setLowerText] = useState("")
    const [allMemes, setAllMemes] = useState("")
    const [randomMeme, setRandomMeme] = useState(
        "http://i.imgflip.com/2fm6x.jpg"
    );

    const fetchMeme = () => {
        fetch("https://api.imgflip.com/get_memes")
            .then((response) => response.json())
            .then((response) => setAllMemes(response.data.memes))
            .catch()
    };

    useEffect(() => {
        fetchMeme()
    }, [])

    const getRandomMeme = (event) => {
        event.preventDefault()
        const randomNum = Math.floor(Math.random() * Math.floor(allMemes.length));
        setRandomMeme(allMemes[randomNum].url);
    };

    const handleTop = (event) => {
        setUpperText(event.target.value)
    };
    const handleBottom = (event) => {
        setLowerText(event.target.value)
    };
    return (
        <div>
            <form onSubmit={getRandomMeme} className="meme-form">
                <input
                    type="text"
                    name="upperText"
                    placeholder="top text"
                    value={upperText}
                    onChange={handleTop}
                />
                <input
                    type="text"
                    name="lowerText"
                    placeholder="bottom text"
                    value={lowerText}
                    onChange={handleBottom}
                />
                <button>Next Meme</button>
                <button>Generate Meme</button>
            </form>
            <div className="meme">
                <img src={randomMeme} alt="" />
                <h2 className="top">{upperText}</h2>
                <h2 className="bottom">{lowerText}</h2>
            </div>
        </div>
    );
}

export default MemeGenerator;