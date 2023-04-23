import { useState, useEffect, useRef, useMemo } from 'react'



export default function Home() {
    const [inputValue, setInputValue] = useState('https://danielmiessler.com/blog/spqa-ai-architecture-replace-existing-software/')
    const [questions, setQuestions] = useState('')

    const [inputSummary, setInputSummary] = useState('')
    const [studentAnswer, setStudentAnswer] = useState('')

    const [score, setScore] = useState('')
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
        const final = JSON.parse(data).output
        // const dataJSON = JSON.parse(final)
        // return dataJSON
        return final
    }
    // ------ SCRAPER ---------


    // ------ QUESTIONER ---------
    async function runQuestioner(article) {
        // console.log('in runQuestioner', article.substring(0, 100))
        const response = await fetch('/api/APIagent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: article }),
        })

        const data = await response.text()
        const final = JSON.parse(data).output
        const dataJSON = JSON.parse(final)

        dataJSON.questions.forEach(element => {
            runStudent(inputSummary, element)
        });
        setQuestions(final)
    }
    // ------ QUESTIONER ---------

    // ------ STUDENT ---------
    async function runStudent(input, question) {
        const response = await fetch('/api/APIstudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: input, question: question }),
        })

        const data = await response.text()
        const final = JSON.parse(data).output

        runGrader(inputValue, question, final)

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

        setScore((prev) => prev + final)

        setGradingComponent((prev) => [...prev, { question: question, answer: answer, score: final }])

    }
    // ------ GRADER ---------





    async function handleSubmitDownload(e) {
        e.preventDefault()
        var article = await runScraper(inputValue)
        // console.log('article', article)
        runQuestioner(article)
    }

    async function handleSubmitStudent(e) {
        e.preventDefault()
        setScore('')
        setGradingComponent([])
    }

    function GradingReact({ question, answer, score }) {
        return (
            <div className='flex flex-col h-1/4 bg-gray-900 my rounded-lg mt-5'>
                <div className='flex-grow p-6' >
                    <div className='flex flex-col space-y-4'>
                        <p className='text-white'>{question}</p>
                        <p className='text-white'>{answer}</p>
                        <p className='text-white'>{score}</p>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            <div className='bg-gray-800 h-full'>
                <div className='container mx-auto h-full w-5/6 py-3'>
                    <h1 className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center font-bold text-5xl pb-4'>Socraitic</h1>

                    <div className='flex items-center justify-center h-full'>
                        <form onSubmit={handleSubmitDownload} className='flex-grow p-1'>
                            <h2 className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center font-bold pb-2'>Input Text</h2>
                            <div className='flex rounded-lg border border-gray-700 bg gray-800'>
                                <textarea type="text" className='flex-grow px-4 py-2 bg-transparent text-white focus:outline-none overflow-y-scroll' placeholder={'Ask something'} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                                <button type='submit' className='bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300'>Download</button>
                            </div>
                        </form>

                        <form onSubmit={handleSubmitStudent} className=' flex-grow p-1' visibility='hidden'>
                            <h2 className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center font-bold pb-2 mt-4'>User Explanation</h2>
                            <div className='flex rounded-lg border border-gray-700 bg gray-800 h-1/2'>
                                <textarea type="text" className='flex-grow px-4 py-2 bg-transparent text-white focus:outline-none overflow-y-scroll' placeholder={'Ask something'} value={inputSummary} onChange={(e) => setInputSummary(e.target.value)} />
                                <button type='submit' className='bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300'>Send</button>
                            </div>
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

