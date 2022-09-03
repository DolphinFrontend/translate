import React from 'react'
import  "./index.css"

const Result = ({word , phonetics,meanings,setText}) => {
  return (
   <ul>
    <li className='world'>
        <h2>{word}</h2>
         {
         phonetics.map((phonetic , index) => (
            <span key={index}>{phonetic.text}</span>
         ))}
    </li>

           {meanings.map((meaning , index) => (
            <li key={index} className='contain'>
              <h3>noun</h3>
 
        <div className='details meaning'>
            <h3>Meaning</h3>
           
            { meaning.definitions.map((definition, index)  => (
            <p key={index}>{definition.definition}</p>
            ))}
        </div>
           
           {
            meaning.synonyms.length !== 0 &&
           
        <div className='details synonyms'>
            <h3>Synonyms</h3>
            {
                meaning.synonyms.map((synonym  , index) => (
                    <span key={index}>{synonym},</span>
                ))
            }
           
        </div>
}
    </li>
     ))
    }
   </ul>
  )}

export default Result