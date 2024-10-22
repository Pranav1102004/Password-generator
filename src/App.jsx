import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length,setLength] = useState(8);
  const [numAllowed,setNumAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");
  const pswdRef = useRef(null);//ref hook
  //password Generator function
  //1 hook used -> useCallback(fun,dependencies in form of array)
  //2 fun ->take two var pswd and str str will hold abc...zABC...Z
  //3 if numAllowed is true if so add 012...9 num in str
  //4 if charAllowed is true if so add special character to str
  //5 iterate over the str and generate a random index using math.random
  //6 add it in pswd
  //7 after the iteration call setPassword(pswd)
  const pswdGenerator = useCallback(()=>{
    let pswd = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "`~!@#$%^&*(){}?|<>";
    for (let i = 1; i <= length; i++) {
      let char_indx = Math.floor(Math.random()*str.length+1);
      pswd+= str[char_indx]
      
    }
    setPassword(pswd);
  }
    
    ,[length,numAllowed,charAllowed,setPassword]);
  //copyt to clipboard
  const copyToClipboard = ()=>{
    pswdRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }

  useEffect(()=>pswdGenerator(),[length,numAllowed,charAllowed,setPassword])
  return (
    <>
     <div className='flex  min-h-screen justify-center items-center'>
     <div className='sm:w-full sm:max-w-md  mx-auto overflow-hidden  shadow-xl rounded-xl px-4 py-6   bg-white/10'>
      <h1 className='text-white text-2xl text-center my-3'>Password Generator</h1>
      <div className=' sm:flex sm:flex-row flex sm:justify-center flex-col items-center sm:rounded-xl gap-5 overflow-hidden mb-4 '>
        <input
         type="text"
         value={password}
         className='w-full outline-none px-4 py-2 rounded-xl'
         placeholder='password' 
         ref={pswdRef}
        />
        <div className='bg-blue-700 hover:bg-blue-500 cursor-pointer w-28 rounded-xl  flex justify-center text-white'>
          <button onClick={copyToClipboard} className='outline-none shrink-0 '>copy</button>
        </div>
      </div>
      <div className='sm:flex sm:flex-row sm:gap-x-2 flex flex-col  gap-y-2 text-sm text-white whitespace-nowrap'>
        <div className='flex gap-x-1'>
          <input
           type="range"
           min={6}
           max={100}
           value={length}
           className='cursor-pointer'
           onChange={(e)=>{
            setLength(e.target.value);
           }}
           />
           <label className='whitespace-nowrap'>Length : {length}</label>
        </div>
        <div className='flex gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked = {numAllowed}
          value={numAllowed}
          onChange={()=>setNumAllowed((prev)=>!prev)}
          />
           <label>Number</label>
        </div>
        <div className='flex gap-x-1'>
          
          <input 
            type="checkbox"
            defaultChecked = {charAllowed}
            value={charAllowed}
            onChange={()=>setCharAllowed((prev)=>!prev)}
          />
           <label>Special Characters </label>
        </div>
      </div>

    </div>
     </div>
     <div className='text-white fixed bottom-4 w-full'>
      <footer className='flex flex-row justify-center items-center'>Made by Pranav</footer>
     </div>
    
    </>
  )
}

export default App
