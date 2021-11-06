import React, { useState, useEffect } from "react";
import "./App.css"
function MemeGenerator() {
    const [userInput, setUserInput] = useState(
        {
            topText: "",
            bottomText: "",
            image: "",
        }
    )
    const [randomImg, setRandomImg] = useState("http://i.imgflip.com/1bij.jpg")
    const [memes, setMemes] = useState([])
    const [generatedMemes, setGeneratedMemes] = useState([{}])
    // const [memeIndex, setMemeIndex]= useState(0)
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                setMemes([...memes]);
            })
    }, [])
    function handleChange(event) {
        const { name, value } = event.target
        setUserInput({
            ...userInput,
            [name]: value
        })
    }
    function getRandomMeme(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * memes.length)
        const randMemeImg = memes[randNum].url
        return setRandomImg(randMemeImg)


    }
    const handleGenerator = (e) => {
        e.preventDefault()
        const generatedMemes = {
            topText: userInput.topText,
            bottomText: userInput.bottomText,
            image: randomImg,
        }

        setGeneratedMemes(prevGeneratedMemes => [
            ...prevGeneratedMemes, {
                topText: userInput.topText,
                bottomText: userInput.bottomText,
                image: randomImg,
            }])

        return console.log(generatedMemes)

    }
    return (
        <div>
            <form className="memeForm" onSubmit={handleGenerator}>
                <input
                    type="text"
                    name="topText"
                    placeholder="Top Text"
                    value={userInput.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bottomText"
                    placeholder="Bottom Text"
                    value={userInput.bottomText}
                    onChange={handleChange}
                />
                <button onClick={getRandomMeme}>Refresh Generator</button>
                <button >Generate your Meme </button>
            </form>
            <div className="meme">
                {userInput.topText}
                {userInput.bottomText}
                <img className="memeImg" src={randomImg} alt={userInput} />
            </div>
            <div>
                {generatedMemes.map(meme => (

                    <div key={userInput.topText} />
                ))}
            </div>
        </div>
    )
}
export default MemeGenerator;