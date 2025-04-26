import { useRef, useEffect, useState } from 'react';
import '../styles/typing.css';

const paragraph = `The golden sun dipped behind the hills, casting a warm glow across the open fields. A gentle breeze stirred the tall grass, making it dance in waves like a green ocean. Birds soared high above, their songs filling the evening air with sweet melodies. Somewhere in the distance, a river murmured softly as it wound its way through the valley, reflecting the last light of day. It was a moment of peace, a reminder that even in a busy world, nature always finds a way to slow things down.`;

const TypingTester = () => {
    const maxTime = 60;
    const [timeLeft, setTimeLeft] = useState(maxTime);
    const [mistakes, setMistakes] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [WPM, setWPM] = useState(0);
    const [CPM, setCPM] = useState(0);
    const inputRef = useRef(null);
    const charRefs = useRef([]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        let timer;
        if (isTyping && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTyping(false);
        }

        return () => clearInterval(timer);
    }, [isTyping, timeLeft]);

    useEffect(() => {
        if (isTyping) {
            const correctChars = charIndex - mistakes;
            const words = correctChars / 5;
            setWPM(Math.round((words / (maxTime - timeLeft)) * 60));
            setCPM(Math.round((correctChars / (maxTime - timeLeft)) * 60));
        }
    }, [charIndex, mistakes, timeLeft, isTyping]);

    const handleChange = (e) => {
        const characters = charRefs.current;
        let currentChar = characters[charIndex];
        let typedChar = e.target.value.slice(-1);

        if (charIndex < characters.length && timeLeft > 0) {
            if (!isTyping) {
                setIsTyping(true);
            }
            if (typedChar === currentChar.textContent) {
                currentChar.classList.add('correct');
            } else {
                currentChar.classList.add('incorrect');
                setMistakes(prevMistakes => prevMistakes + 1);
            }
            setCharIndex(prevIndex => prevIndex + 1);
        } else {
            setIsTyping(false);
        }
    };

    const resetTest = () => {
        setTimeLeft(maxTime);
        setMistakes(0);
        setCharIndex(0);
        setIsTyping(false);
        setWPM(0);
        setCPM(0);
        inputRef.current.value = "";
        charRefs.current.forEach(span => {
            span.classList.remove('correct', 'incorrect');
        });
    };

    return (
        <div className='main-div'>
            <div className='test'>
                <input 
                    type='text' 
                    className='input-field' 
                    ref={inputRef} 
                    onChange={handleChange} 
                    disabled={timeLeft === 0}
                />
                <div className="paragraph">
                    {paragraph.split("").map((char, index) => (
                        <span key={index} className='char' ref={(el) => charRefs.current[index] = el}>
                            {char}
                        </span>
                    ))}
                </div>
            </div>

            <div className='result'>
                <p>Time Left: <strong>{timeLeft}</strong>s</p>
                <p>Mistakes: <strong>{mistakes}</strong></p>
                <p>WPM: <strong>{WPM}</strong></p>
                <p>CPM: <strong>{CPM}</strong></p>
                <button onClick={resetTest}>Try Again</button>
            </div>
        </div>
    );
};

export default TypingTester;
