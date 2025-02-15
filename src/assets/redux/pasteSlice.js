import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';

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
     const paste=action.payload;
     const existingPaste = state.paste.find((item) => item.title === paste.title);

     if (existingPaste) {
       toast.error("Title already exists!"); 
       return; 
     }
     state.paste.push(paste);
     localStorage.setItem("paste",JSON.stringify(state.paste))
     toast("Created successfully!")
    
    },
    updatePaste: (state,action) => {
      const paste=action.payload;
      const index=state.paste.findIndex((item)=>
        item._id===paste._id
      )
      if(index>=0){
        state.paste[index]=paste;
        localStorage.setItem("paste",JSON.stringify(state.paste))
         toast("Paste successfully!")
      }
      
    },
    deletePaste: (state, action) => {
      const pasteID = action.payload;
      console.log(pasteID);
    
      
      let storedPastes = JSON.parse(localStorage.getItem("paste")) || [];
    
      
      const index = storedPastes.findIndex((item) => item._id === pasteID);
    
      if (index >= 0) {
        
        state.paste.splice(index, 1);
    
        
        storedPastes.splice(index, 1);
        localStorage.setItem("paste", JSON.stringify(storedPastes));
    
        toast("Deleted successfully!");
      } else {
        toast("Paste not found!");
      }
    },
    
    removeAllPaste:(state,action)=>{
      state.paste=[];
      localStorage.removeItem("paste");

    },
  },
})

export const { addPaste,deletePaste,updatePaste,removeAllPaste } = pasteSlice.actions

export default pasteSlice.reducer