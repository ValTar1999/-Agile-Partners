import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import p1 from '../assets/image/project/p-1.svg'
import p2 from '../assets/image/project/p-2.svg'
import p3 from '../assets/image/project/p-3.svg'
import p4 from '../assets/image/project/p-4.svg'
import p5 from '../assets/image/project/p-5.svg'
import p6 from '../assets/image/project/p-6.svg'
import p7 from '../assets/image/project/p-7.svg'
import p8 from '../assets/image/project/p-8.svg'
import p9 from '../assets/image/project/p-9.svg'


const PROJECTS = [
  { image: p1, title: 'WEBSITES', description: 'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.' },
  { image: p2, title: 'INVOICING PLATFORM', description: 'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.' },
  { image: p3, title: 'PAYMENT PROCESSING PLATFORM', description: 'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.' },
  { image: p4, title: 'Reconciliation flows', description: 'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.' },
  { image: p5, title: 'Backend office operations', description: 'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.' },
  { image: p6, title: 'Card payment operations', description: null },
  { image: p7, title: 'AI-powered insights', description: null },
  { image: p8, title: 'Enrollment and onboarding portal', description: 'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.' },
  { image: p9, title: 'Accounts Payable and Accounts Receivable payment operations', description: null },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const textX = useTransform(scrollYProgress, [0, 0.5, 1], ['-20%', '20%', '-20%'])

  return (
    <section
      ref={sectionRef}
      className="w-full pt-16 md:pt-24 lg:pt-40 pb-24 md:pb-60 overflow-x-hidden"
    >
      <div className="w-full overflow-hidden mb-16 md:mb-32 lg:mb-72">
        <motion.div
          className="text-5xl md:text-7xl lg:text-[168px] lg:leading-[168px] font-medium uppercase -tracking-[2px] md:-tracking-[4px] lg:-tracking-[8.4px] whitespace-nowrap px-4 flex items-center gap-8 md:gap-16 lg:gap-36"
          style={{ x: textX }}
        >
          <span className="text-black">WHAT WE DO </span>
          <span className="text-black"><span className="italic">BEST</span> WHAT WE DO </span>
          <span className="text-black"><span className="italic">BEST</span></span>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 flex flex-col gap-12 md:gap-20 lg:gap-32">

        <motion.div
          className="w-full max-w-[1040px]"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img className='w-full h-full max-h-[600px] object-cover' src={p1} alt="" />
          <motion.div className="h-px w-full bg-black mt-8 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} />
          <div className="text-black pt-4 flex items-start justify-between">
            <p className='text-base leading-5 tracking-[0.32px] uppercase font-semibold'>
            {PROJECTS[0].title}
            </p>
            <span className='text-base leading-5 -tracking-[0.48px] w-full max-w-[372px]'>
            {PROJECTS[0].description}
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-0">

          <motion.div
            className="w-full max-w-lg mt-0 lg:mt-[452px] mx-auto"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img className='w-full h-full max-h-[680px] object-cover' src={p3} alt="" />
            <motion.div className="h-px w-full bg-black mt-8 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} />
            <div className="text-black pt-4 flex items-start justify-between">
              <p className='text-base leading-5 tracking-[0.32px] uppercase font-semibold w-full max-w-[108px]'>
              {PROJECTS[1].title}
              </p>
              <span className='text-base leading-5 -tracking-[0.48px] w-full max-w-[372px]'>
              {PROJECTS[1].description}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="w-full max-w-[648px]"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img className='w-full h-full max-h-[648px] object-cover' src={p2} alt="" />
            <motion.div className="h-px w-full bg-black mt-8 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} />
            <div className="text-black pt-4 flex items-start justify-between">
              <p className='text-base leading-5 tracking-[0.32px] uppercase font-semibold w-full max-w-60'>
                {PROJECTS[2].title}
              </p>
              <span className='text-base leading-5 -tracking-[0.48px] w-full max-w-[372px]'>
                {PROJECTS[2].description}
              </span>
            </div>
          </motion.div>

        </div>

        <motion.div
          className="w-full max-w-[784px]"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img className='w-full h-full max-h-[500px] object-cover' src={p4} alt="" />
          <motion.div className="h-px w-full bg-black mt-8 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} />
          <div className="text-black pt-4 flex items-start justify-between">
            <p className='text-base leading-5 tracking-[0.32px] uppercase font-semibold'>
            {PROJECTS[3].title}
            </p>
            <span className='text-base leading-5 -tracking-[0.48px] w-full max-w-[372px]'>
            {PROJECTS[3].description}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-[648px] ml-auto"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img className='w-full h-full max-h-[500px] object-cover' src={p5} alt="" />
          <motion.div className="h-px w-full bg-black mt-8 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} />
          <div className="text-black pt-4 flex items-start justify-between">
            <p className='text-base leading-5 tracking-[0.32px] uppercase font-semibold w-full max-w-60'>
            {PROJECTS[4].title}
            </p>
            <span className='text-base leading-5 -tracking-[0.48px] w-full max-w-[372px]'>
            {PROJECTS[4].description}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-96"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img className='w-full h-full max-h-60 object-cover' src={p6} alt="" />
          <motion.div className="h-px w-full bg-black mt-8 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} />
          <div className="text-black pt-4 flex items-start justify-between">
            <p className='text-base leading-5 tracking-[0.32px] uppercase font-semibold'>
            {PROJECTS[5].title}
            </p>
            {PROJECTS[5].description && (
              <span className='text-base leading-5 -tracking-[0.48px] w-full max-w-[372px]'>
                {PROJECTS[5].description}
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-96 mx-auto"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img className='w-full h-full max-h-[480px] object-cover' src={p7} alt="" />
          <motion.div className="h-px w-full bg-black mt-8 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} />
          <div className="text-black pt-4 flex items-start justify-between">
            <p className='text-base leading-5 tracking-[0.32px] uppercase font-semibold'>
            {PROJECTS[6].title}
            </p>
            {PROJECTS[6].description && (
              <span className='text-base leading-5 -tracking-[0.48px] w-full max-w-[372px]'>
                {PROJECTS[6].description}
              </span>
            )}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-0">
          <motion.div
            className="w-full max-w-[648px]"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img className='w-full h-full max-h-[400px] md:max-h-[648px] object-cover' src={p8} alt="" />
            <motion.div className="h-px w-full bg-black mt-8 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} />
            <div className="text-black pt-4 flex items-start justify-between">
              <p className='text-base leading-5 tracking-[0.32px] uppercase font-semibold w-full max-w-60'>
                {PROJECTS[7].title}
              </p>
              <span className='text-base leading-5 -tracking-[0.48px] w-full max-w-[372px]'>
                {PROJECTS[7].description}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="w-full max-w-[648px] mt-0 lg:mt-[557px]"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img className='w-full h-full max-h-[412px] object-cover' src={p9} alt="" />
            <motion.div className="h-px w-full bg-black mt-8 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} />
            <div className="text-black pt-4 flex items-start justify-between">
              <p className='text-base leading-5 tracking-[0.32px] uppercase font-semibold'>
              {PROJECTS[8].title}
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
