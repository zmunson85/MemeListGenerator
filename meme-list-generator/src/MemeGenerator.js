import React, { useState, useEffect } from "react";


function MemeGenerator() {
    const [memes, setMemes] = useState([])
    const [memeIndex, setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);
    const [generatedMeme, setGeneratedMeme] = useState([{
        box_count: 0,
        topText: '',
        bottomText: '',
        url: ''

    }]);

    const randomMeme = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };



    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(res => {
            const memes = res.data.memes.box_count;
            console.log(memes)
            randomMeme(memes);
            setMemes(memes);
        })
    }, []);

    useEffect(() => {
        if (memes.length) {
            console.log(memes[memeIndex].box_count)