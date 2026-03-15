import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import bgImage from '../assets/image/header/bg-header.svg'

const TYPING_WORDS = ['ideate', 'design', 'develop', 'launch']
const TYPE_DELAY = 120
const HOLD_MS = 2000
const ERASE_DELAY = 60

export default function Header() {
  const [wordIndex, setWordIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [isErasing, setIsErasing] = useState(false)

  useEffect(() => {
    const word = TYPING_WORDS[wordIndex]

    if (isErasing) {
      if (charCount === 0) {
        setIsErasing(false)
        setWordIndex((i) => (i + 1) % TYPING_WORDS.length)
        return
      }
      const id = setTimeout(() => setCharCount((c) => c - 1), ERASE_DELAY)
      return () => clearTimeout(id)
    }

    if (charCount >= word.length) {
      const id = setTimeout(() => setIsErasing(true), HOLD_MS)
      return () => clearTimeout(id)
    }

    const id = setTimeout(() => setCharCount((c) => c + 1), TYPE_DELAY)
    return () => clearTimeout(id)
  }, [wordIndex, charCount, isErasing])

  const word = TYPING_WORDS[wordIndex]
  const displayed = word.slice(0, charCount)

  return (
    <header className="relative w-full h-full overflow-visible">
      <div className="absolute left-0 -bottom-1/2 w-full h-dvh pointer-events-none overflow-visible">
        <svg
          className="w-full h-full object-cover overflow-visible"
          viewBox="0 0 1341 1045"
          preserveAspectRatio="xMinYMax meet"
          fill="none"
        >
          <defs>
            <filter id="blob-blur" x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="120" />
            </filter>
          </defs>
          <circle
            className="animate-blob-a"
            style={{ transformOrigin: '432px 515px' }}
            cx="432"
            cy="515"
            r="239"
            fill="#0AE58A"
            filter="url(#blob-blur)"
          />
          <circle
            className="animate-blob-b"
            style={{ transformOrigin: '864px 454px', animationDelay: '-2s' }}
            cx="864"
            cy="454"
            r="255"
            fill="#3AA9FA"
            filter="url(#blob-blur)"
          />
          <circle
            className="animate-blob-c"
            style={{ transformOrigin: '548px 571px', animationDelay: '-5s' }}
            cx="548"
            cy="571"
            r="208"
            fill="#3AA9FA"
            filter="url(#blob-blur)"
          />
        </svg>
      </div>

      <div className="relative z-10 container px-4 flex flex-col md:flex-row items-start mx-auto mt-12 md:mt-20">
        <div className="hidden md:inline-flex items-center gap-2 -rotate-90 -translate-x-1/2 mt-18 shrink-0">
          <div className="w-10 overflow-hidden shrink-0">
            <motion.span
              className="block w-full h-px bg-black"
              initial={{ x: '100%' }}
              animate={{
                x: ['100%', '0%', '-100%'],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                },
              }}
            />
          </div>
          <div className="text-xs text-black uppercase text-nowrap whitespace-nowrap">SCROLL DOWN</div>
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-[68px] leading-tight md:leading-normal lg:leading-20 text-black -tracking-[2.72px] w-full max-w-5xl mx-auto min-h-0 sm:min-h-[60px] md:min-h-[100px] lg:min-h-[180px]">
            We <span className="inline-flex items-center gap-1 italic">{displayed}<span className="w-px h-5 sm:h-12 md:h-20 bg-black animate-blink shrink-0 inline-block align-middle" /></span> <span className="text-primary">fintech</span> solutions that power seamless digital payments.
          </h1>
          <p className='text-base md:text-xl leading-relaxed text-black -tracking-[0.7px] mt-4 sm:mt-6 md:mt-16 lg:mt-28 mb-6 md:mb-16 w-full max-w-[376px] ml-0 lg:ml-auto lg:mr-[330px]'>
            Agile Partners transform and support every aspect of a fintech business at every phase - from start-up to large-scale platform — across the world.
          </p>
          <div className="flex justify-start">
            <img src={bgImage} alt="" className="w-full md:w-auto h-full max-h-36 sm:max-h-44 md:max-h-72 object-cover" />
          </div>
        </div>
      </div>
    </header>
  )
}
