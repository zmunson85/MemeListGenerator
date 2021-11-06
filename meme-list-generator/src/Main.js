import React, { useState, useEffect } from "react";
import "./App.css";
import MemeList from './MemeList';
function Main() {
    const [userInput, setUserInput] = useState(
        {
            topText: "",
            bottomText: "",
            image: "",
        }
    )
    const [randomImg, setRandomImg] = useState("http://i.imgflip.com/1bij.jpg");
    const [allMemes, setAllMemes] = useState([]);
    const [generatedMemes, setGeneratedMemes] = useState([]);

    function fetchRandomMeme(e) {
        e.preventDefault();
        const randomNum = Math.floor(Math.random() * allMemes.length);
        const randomImage = allMemes[randomNum].url
        console.log(randomImage)
        setRandomImg(randomImage);
    };
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                setAllMemes([...memes]);
            })
    }, [])
    function handleChange(event) {
        const { name, value } = event.target;
        setUserInput(prevUserInput => ({
            ...prevUserInput,
            [name]: value
        }))

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setGeneratedMemes((prevGeneratedMemes) => ({
            ...prevGeneratedMemes,

            topText: userInput.topText,
            bottomText: userInput.bottomText,
            image: userInput.image,

        }));
        console.log(generatedMemes);
    };
    const userMeme = generatedMemes.map(meme =>
        <div>
            <h2>{generatedMemes.topText}</h2>
            <h2>{generatedMemes.bottomText}</h2>
            <img src={generatedMemes.image} alt="text"></img>
        </div>
    )
    return (
        <>
            <div>
                <h2>Create your meme</h2>
                <form className="memeForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={generatedMemes.topText}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={generatedMemes.bottomText}
                        onChange={handleChange}
                    />
                    <button onClick={fetchRandomMeme}>Refresh/New Meme</button>
                    <button type="submit">Generate your Meme </button>
                    <img className="memeImg" src={randomImg} alt="" />
                </form>
                <MemeList />
            </div>
        </>
    );
}
export default Main;