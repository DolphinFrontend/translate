import React , {useState , useEffect,useMemo}  from "react";
import Result from "./Result";
import "./index.css"



  const synth = window.speechSynthesis;

const App = () => {
  
  const voices = useMemo(() => synth.getVoices(), [])
  const [voiceSelected, setVoiceSelected] = useState("")
  const [text, setText] = useState("")
  const [isSpeaking, setIsSpeaking] = useState("")
  const [meanings, setMeanings] = useState([])
  const [phonetics, setPhonetics] = useState([])
  const [word, setWord] = useState("")
 const [error, setError] = useState("")

  const dictionaryApi = (text) =>{
   let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
   fetch(url)
   .then(res=> res.json())
   .then(result => {
    console.log(result)
     setMeanings(result[0].meanings)
     setPhonetics(result[0].phonetics)
     setWord(result[0].word)
    
   })
  
  }


  useEffect(() => {
    if(!text.trim()) return
    const debounce = setTimeout(()=>{
            dictionaryApi(text)
    },1000)

    return ()=> clearTimeout(debounce)
  },[text])



  const startSpeech = (text) => {
    const utterance =new SpeechSynthesisUtterance(text)
    synth.speak(utterance)
  }

  const handleVoice = () =>{
    if(!text.trim()) return
    if(!synth.speaking) {
     startSpeech(text)
     setIsSpeaking("speak")
    } else{
      synth.cancel()
    }
    setInterval(() =>{
      if(!synth.speaking) {
        setIsSpeaking("")
      }
    })
  }

  return (
    <div className="container">
      <h1>English Dictionary</h1>

      <form>
        <div className="row">
          <textarea name="" id="" cols="30" rows="4" placeholder="Enter text" 
           value={text}
           onChange={e => setText(e.target.value)}
          
          />

            <div className="voices-icons">
              <div className="select-voices">
                <select value={voiceSelected}
                 onChange={(e) => setVoiceSelected(e.target.value)}
                >
                 {voices.map(voice => (
                  <option key={voice.name} values={voice.name} >{voice.name}</option>
                 ))}
                </select>

              <i  onClick={handleVoice} className={`fas fa-volume-up  ${isSpeaking} ` }/>
            
              </div>
            </div> 
        </div>
      </form>
       {
        (text.trim()  !== "" &&  !error)  &&
     
      <Result
       word={word}
       phonetics={phonetics}
       meanings={meanings}
       setText={setText}
      />
    }
    </div>
    
  );
}

export default App;
