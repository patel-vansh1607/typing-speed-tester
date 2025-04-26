import '../styles/typing.css'


const paragraph = `The golden sun dipped behind the hills, casting a warm glow across the open fields. A gentle breeze stirred the tall grass, making it dance in waves like a green ocean. Birds soared high above, their songs filling the evening air with sweet melodies. Somewhere in the distance, a river murmured softly as it wound its way through the valley, reflecting the last light of day. It was a moment of peace, a reminder that even in a busy world, nature always finds a way to slow things down.`

const TypingTester = () => {



    return(
        <div className='main-div'>
            <div className='test'>
            {
                paragraph.split("").map((char, index) => (
                    <span key={index} className='char'> 
                        {char}
                    </span>
                ))
            }

            </div>
            <div className='result'>
                <p>Time Left</p>
                <p>Mistakes</p>
                <p>WPM</p>
                <p>CPM</p>
                <button>Try Again</button>
            </div>
        </div>
    )
}

export default TypingTester