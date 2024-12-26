import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { unusedNumbersAtom, usedNumbersAtom } from './states/bingoNumbers'
import BingoTable from './components/BingoTable'
// import ModalWithButton from "./components/Modal";
import RandomNumberModal from './components/RandomNumberModal'
import Snowflake from './components/snowflake'
import './App.scss'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC6CgMb10ILbFggZpLsBuQ4SoFosjavO4I',
  authDomain: 'yebingo-dbb6d.firebaseapp.com',
  projectId: 'yebingo-dbb6d',
  storageBucket: 'yebingo-dbb6d.firebasestorage.app',
  messagingSenderId: '194131798463',
  appId: '1:194131798463:web:572d73dbbf65e829bf590a',
}

initializeApp(firebaseConfig)

function App() {
  const [isOpenRndom, setIsOpenRandom] = useState(false)
  const [authorized, setAuthorized] = useState<boolean | null>(null)

  const [unusedNumbers, setUnusedNumbers] = useRecoilState(unusedNumbersAtom)
  const [usedNumbers, setUsedNumbers] = useRecoilState(usedNumbersAtom)

  const handleNumberFixed = (num: number) => {
    setUnusedNumbers(unusedNumbers.filter((n) => n !== num))
    setUsedNumbers([...usedNumbers, num])
  }

  const handleOpenRandom = () => {
    setIsOpenRandom(true)
  }

  const handleCloseRandom = () => {
    setIsOpenRandom(false)
  }

  const auth = getAuth()
  auth.onAuthStateChanged(async (user) => {
    function getHashedDomain(value: string): Promise<string> {
      const encoder = new TextEncoder()
      const data = encoder.encode(value)
      return window.crypto.subtle.digest('SHA-256', data).then((buff) => {
        const hashArray = Array.from(new Uint8Array(buff))
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
      })
    }
    if (user) {
      const email = user?.email ?? ''
      const domain = email.split('@')[1] ?? ''

      const hashedDomain = await getHashedDomain(domain)

      // 下準備: crypto.createHash('sha256').update(domain).digest('hex');
      if (
        // hashedDomain === '591bfe88c880df9685d3e298cac2271681a78e017441426ae3d5bd6c73cd3db7' || // gmail.com
        hashedDomain === 'a3e777966e6ca2bfb1441f29930a7fe14b01f5aa18f8987de199e6112fa99d1b'
      ) {
        setAuthorized(true)
      } else {
        setAuthorized(false)
      }
    } else {
      setAuthorized(false)
    }
  })
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const email = result.user.email || ''
    console.log(email)
    // 例: if (!email.endsWith("@yourdomain.com")) return;
    setAuthorized(true)
  }

  if (authorized === null) {
    return <div>Loading...</div>
  }

  return authorized ? (
    <div className="App">
      <Snowflake />
      <main>
        <BingoTable />
        <div className="card">
          <div className="inset-0">
            <button
              type="button"
              onClick={handleOpenRandom}
              className="rounded-md bg-black/60 px-4 py-2 text-sm font-medium text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              Generate next number
            </button>
          </div>
          <RandomNumberModal isOpen={isOpenRndom} onClose={handleCloseRandom} onFixed={handleNumberFixed} />
        </div>
      </main>
    </div>
  ) : (
    <button
      className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
      onClick={signInWithGoogle}
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Sign in with Google</span>
    </button>
  )
}

export default App
