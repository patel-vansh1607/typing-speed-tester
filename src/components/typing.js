import { use, useEffect, useState } from 'react'
import '../styles/typing.css'


const paragraph = `The golden sun dipped behind the hills, casting a warm glow across the open fields. A gentle breeze stirred the tall grass, making it dance in waves like a green ocean. Birds soared high above, their songs filling the evening air with sweet melodies. Somewhere in the distance, a river murmured softly as it wound its way through the valley, reflecting the last light of day. It was a moment of peace, a reminder that even in a busy world, nature always finds a way to slow things down.`

const TypingTester = () => {


    const maxTime =  60
    const [timeLeft, setTimeLeft] = useState(maxTime)
    const [mistakes, setMistakes] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [WPM, setWPM] = useState(0)
    const [CPM, setCPM] = useState(0)
    const inputRef = useRef(null)
    const charRefs = useRef([])

    useEffect(() =>{
        inputRef.current.focus()
    }, [])

    const handleChange = (e) => {
        const characters = charRefs.current
        let currentChar = charRefs.current[charIndex]
        let typedChar = e.target.value.slice(-1)
        if (charIndex < characters.length && timeLeft > 0) {
            if(!isTyping){
                setIsTyping(true)
            }
             if(typedChar === currentChar.textContent){
                setCharIndex(charIndex + 1)
             } else {
                setCharIndex(charIndex + 1)
                setMistakes(mistakes + 1)
             }
             if (charIndex === characters.length -1) setIsTyping(false)
        }
    }
    return(
        <div className='main-div'>
            <div className='test'>
                <input type='text' className='input-field' ref={inputRef} onChange={handleChange}/>
            {
                paragraph.split("").map((char, index) => (
                    <span key={index} className='char' ref={(e) => charRefs.current[index] = e}> 
                        {char}
                    </span>
                ))
            }

            </div>
            <div className='result'>
                <p>Time Left: <strong>{timeLeft}</strong></p>
                <p>Mistakes: <strong>{mistakes}</strong></p>
                <p>WPM: <strong>{WPM}</strong></p>
                <p>CPM: <strong>{CPM}</strong></p>
                <button>Try Again</button>
            </div>
        </div>
    )
}

export default TypingTester