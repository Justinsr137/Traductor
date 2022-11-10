let translateFrom = document.querySelector('#form');
let translateTo = document.querySelector('#to');


const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
const optionsa = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'bde6df33f1mshc88137c1d9a1b57p1991aejsnd19574413f42',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
};

let source_language = 'es';
let target_language = 'af';

fetch(url, optionsa)
.then(res => res.json())
.then(objeto => {
    let lenguages = objeto.data.languages;
    console.log(lenguages)
    lenguages.forEach(element => {
        translateFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`
        translateTo.innerHTML += `<option value="${element.code}">${element.name}</option>`

        
    })
    translateFrom.addEventListener('click', ()=>{
        source_language = translateFrom.value;      
    })
    translateTo.addEventListener('click', ()=>{
        target_language = translateTo.value;
    })
})
.catch(err => console.log(err));


let translate = document.querySelector('#translate');
let translateTo2 = document.querySelector('#outputTranslate');


translate.addEventListener('click', ()=>{
    let inputTranslate = document.querySelector('#inputTranslate');
    let textToTranslate = inputTranslate.value;
    


        
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", source_language);
    encodedParams.append("target_language", target_language);
    encodedParams.append("text", textToTranslate);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'bde6df33f1mshc88137c1d9a1b57p1991aejsnd19574413f42',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
        .then(response => response.json())
        .then(response => translateTo2.value = response.data.translatedText )
        .catch(err => console.error(err));
})
