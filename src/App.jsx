import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPaste,deletePaste,removeAllPaste,updatePaste } from './assets/redux/pasteSlice'

function App() {

  const dispatch = useDispatch()

  return (
    <>
      <div className='text-2xl'>
       Notes App 
       </div>
    </>
  )
}

export default App
