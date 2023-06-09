
import { useWhisper } from '@chengsokdara/use-whisper'
import { useState, useEffect, useRef, useMemo } from 'react'
import OPENAI_API_KEY from '../.env.local'


export default function Home() {
    const [inputValue, setInputValue] = useState('https://danielmiessler.com/blog/spqa-ai-architecture-replace-existing-software/')
    const [questions, setQuestions] = useState('')

    const [inputSummary, setInputSummary] = useState('')
    const [studentAnswer, setStudentAnswer] = useState('')

    const [article, setArticle] = useState('')
    
    const [gradingComponent, setGradingComponent] = useState([])

    


    // ------ SCRAPER ---------
    async function runScraper(input) {

        const response = await fetch('/api/APIscraper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input }),
        })

        const data = await response.text()
        const final = await JSON.parse(data).output

        // const dataJSON = JSON.parse(final)
        // return dataJSON
        return final
    }

   
    // ------ SCRAPER ---------

    // ------ SUMMARIZER -------
/*
    async function runSummarizer(article) {
        const response = await fetch('/api/APIsummarizer', {
            methode: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ article })
        })

        const data = await response.text()
        const final = JSON.parse(data).output

        return final

    }

*/


    // ------ SUMMARIZER --------

    // ------ QUESTIONER ---------
    async function runQuestioner(article) {
        console.log('in runQuestioner', article.substring(0, 100))
        const response = await fetch('/api/APIagent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: article }),
        })
        console.log('after APIagent has been run')

        const data = await response.text()
        const final = JSON.parse(data).output
        const dataJSON = JSON.parse(final)

        dataJSON.questions.forEach(element => {
            runStudent(inputSummary, element, article)
        });
  
    }
    // ------ QUESTIONER ---------

    // ------ STUDENT ---------
    async function runStudent(input, question, article) {
        const response = await fetch('/api/APIstudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: input, question: question }),
        })

        const data = await response.text()
        console.log(input)
        const final = JSON.parse(data).output



        runGrader(article, question, final)

        setStudentAnswer(final)
    }
    // ------ STUDENT ---------

    // ------ GRADER ---------
    async function runGrader(input, question, answer) {
        const response = await fetch('/api/APIgrader', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: input, question: question, answer: answer }),
        })

        const data = await response.text()
        const final = JSON.parse(data).output

        const parsed = JSON.parse(final)

        setGradingComponent((prev) => [...prev, { question: question, answer: answer, score: parsed.grade, feedback: parsed.feedback }])

    }
    // ------ GRADER ---------





    async function handleSubmitDownload(e) {
        e.preventDefault()
        const art = await runScraper(inputValue)
        // console.log('article', article)

        await setArticle(art)
        

        document.getElementById("form-student").style.visibility = "visible"
        //article = await runSummarizer(article)
        //runQuestioner(article)
    }

    async function handleSubmitStudent(e) {
        e.preventDefault()
        const article = await runScraper(inputValue)
        // console.log('article', article)

      
        document.getElementById("form-student").style.visibility = "visible"
        //article = await runSummarizer(article)
        runQuestioner(article)
        setGradingComponent([])
    }

    function GradingReact({ question, answer, score, feedback }) {
        return (
            <div className='flex flex-col h-1/4 bg-gray-900 my rounded-lg mt-5'>
                <div className='flex-grow p-6' >
                    <div className='flex items-center gap-x-8'>
                        <div>
                            <p className='text-white font-bold ext-lg'>{score}%</p>
                        </div>
                        <div className='space-y-4'>
                            <p className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-black text-lg'>{question}</p>
                            <p className='text-white'> <span className='font-bold'> Answer: </span>{answer}</p>
                            <p className='text-white'><span className='font-bold'> Feedback: </span>{feedback}</p>
                        </div>

                    </div>
                </div>
            </div>

    )
  }

  //VOICE TO TEXT

 
 
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: "",
    streaming: true,
    timeSlice: 1_000,
    whisperConfig: {
      language: "en"
    }})

    //VOICE TO TEXT

    useEffect(() => {
        setInputSummary(transcript.text)
    }, [transcript])

    return (
        <>
            <div className='bg-gray-800 h-full'>
                <div className='container mx-auto h-full w-5/6 py-3'>
                    <h1 className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center font-bold text-5xl pb-4'>Socraitic</h1>



    <div className=' h-full'>
    <form onSubmit={handleSubmitDownload} className='flex-grow p-1'>
    <h2 className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center font-bold pb-2'>URL</h2>
        <div className='flex rounded-lg border border-gray-700 bg gray-800'>
        <textarea type="text" className='flex-grow px-4 py-2 bg-transparent text-white focus:outline-none overflow-y-scroll' placeholder={'Ask something'} value={inputValue} onChange={(e)=> setInputValue(e.target.value)} />
        <button type='submit' className='bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300'>Download</button>
        </div>
    </form>

                        <form id="form-student" onSubmit={handleSubmitStudent} className=' flex-grow p-1' style={{ visibility: 'hidden' }}>
                            <h2 className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center font-bold pb-2 mt-4'>User Explanation</h2>
                            <div className='flex rounded-lg border border-gray-700 bg gray-800 '>
                                <textarea type="text" className='flex-grow px-4 py-2 bg-transparent text-white focus:outline-none overflow-y-scroll' placeholder={'Ask something'} value={inputSummary} onChange={(e) => setInputSummary(e.target.value)} />
                                <button type='submit' className='bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300'>Send</button>
                            </div>

                            {recording ? (<button id='voice' type='submit' onClick={() => stopRecording()} className='bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300'>stop</button>) :<button id='voice' type='submit' onClick={() => startRecording()} className='bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300'>record</button>}

                            

                        </form>
                    </div>

                    {gradingComponent.length > 0 ? (
                        gradingComponent.map((item, index) => (
                            <GradingReact key={index} {...item} />
                        ))
                    ) : (
                        <div className='h-screen'></div>
                    )}


                </div>
            </div >
        </>
    )
}


