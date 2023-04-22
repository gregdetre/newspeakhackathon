import { useState, useEffect, useRef, useMemo } from 'react'



export default function Home() {
  const [inputValue, setInputValue] = useState('')
  
  async function runQuestioner(input) {
    console.log("input" + input)

    const response = await fetch('/api/APIagent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({input}),
    })

    const data = await response.text()

    console.log("data" + data)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    runQuestioner(inputValue)

  }


  return (
    <>
    <div className='bg-gray-800 h-screen'>
    <div className='container mx-auto h-full w-5/6 py-3'>
    <h1 className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center font-bold text-5xl pb-4'>V2.2</h1>

    <form onSubmit={handleSubmit} className='flex-none p-1 '>
        <div className='flex rounded-lg border border-gray-700 bg gray-800'>
        <input type="text" className='flex-grow px-4 py-2 bg-transparent text-white focus:outline-none' placeholder={'Ask something'} value={inputValue} onChange={(e)=> setInputValue(e.target.value)} />
        <button type='submit' className='bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300'>Send</button>
        </div>
    </form>

      <div className='flex flex-col h-4/6 bg-gray-900 my rounded-lg h-1/4 overflow-y-scroll'>
          <div className='flex-grow p-6' >
            <div className='flex flex-col space-y-4'> 
            </div>
          </div> 
      </div>


    </div>
    </div>
    </>
  )
}

