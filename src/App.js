import { ToastContainer, toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberallow] = useState(false)
  const [charcterAllow, setCharcterAllow] = useState(false)
  const [password, setPassword] = useState("")



  //ref
  const passwordRef = useRef(null)

  const passwordGenrator = useMemo(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllow) str += "0123456789"
    if (charcterAllow) str += "!@#$%&*?_"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      console.log(str.charAt(char))
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllow, charcterAllow])

  const copyPassword = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    toast.success("Password Copied", {
      position: toast.POSITION.TOP_RIGHT
    },);
  }
  useEffect(() => {
    passwordGenrator()
  }, [numberAllow, charcterAllow, length, passwordGenrator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-gray-300 bg-gray-700'>
        <ToastContainer autoClose={2000} />
        <h1 className='text-white text-center my-3'>Password Genrator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-orange-400"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className='outline-none text-white bg-blue-700 px-2 py-2 shrink-0'>copy</button>
        </div>
        <div className='flex flex-wrap text-sm mb-3 gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range'
              min={8}
              max={24}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />
            <label>(Length : {length})</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
              defaultValue={numberAllow}
              onChange={() => setNumberallow((prev) => !prev)} />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
              defaultValue={charcterAllow}
              onChange={() => setCharcterAllow((prev) => !prev)} />
            <label>Charcters</label>
          </div>
        </div>
        <div className='text-center'>
          <button
            onClick={() => passwordGenrator()}
            className='outline-none text-sm text-center hover:bg-blue-800 rounded-lg text-white bg-blue-700 px-2 py-2 shrink-0'>Genrator</button>
        </div>
      </div>
    </>
  );
}

export default App;
