import { createSlice } from '@reduxjs/toolkit'
const initialState={
    paste:localStorage.getItem('paste')
    ?JSON.parse(localStorage.getItem('paste'))
    :[]
}
export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addPaste: (state,action) => {
     
    },
    updatePaste: (state,action) => {
      
    },
    deletePaste: (state, action) => {
     
    },
    removeAllPaste:(state,action)=>{

    },
  },
})

export const { addPaste,deletePaste,updatePaste,removeAllPaste } = pasteSlice.actions

export default pasteSlice.reducer