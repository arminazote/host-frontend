import React from 'react';

const languages = [
    {code : "en", lang : "English"},
    {code : "bn", lang : "Bangla"},
    {code : "hi", lang : "Hindi"},
]

const LanguageSelector = () => {

    const handleLanguage = ()=>{
        
    }

    return (
        <div>
            {
                languages.map((language, index) => {
                    return <button key={index} onClick={()=> handleLanguage()}>{language.lang}</button>
                })
            }
        </div>
    );
};

export default LanguageSelector;