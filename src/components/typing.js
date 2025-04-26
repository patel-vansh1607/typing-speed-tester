import '../styles/typing.css'

const TypingTester = () => {
    return(
        <div className='main-div'>
            <div className='test'>

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