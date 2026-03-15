import { motion } from 'framer-motion'

const services = [
  'UX/UI design',
  'Product management',
  'Website and mobile development',
  'Platform architecture',
]

const phases = [
  {
    title: 'Strategy and Planning',
    number: '01',
    description: 'We focus on generating ideas and strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'circle',
  },
  {
    title: 'Create and Build',
    number: '02',
    description: 'We focus on generating ideas and strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'sphere',
    twoColumns: true,
  },
  {
    title: 'Promote and Grow',
    number: '03',
    description: 'We focus on generating ideas & strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'target',
  },
]

function PhaseGraphic({ type }: { type: string }) {

  if (type === 'circle') {
    return (
      <svg width="192" height="192" viewBox="0 0 192 192" fill="none" className="shrink-0">
        <defs>
          <clipPath id="ring-clip">
            <path d="M176 96C176 140.183 140.183 176 96 176C51.8172 176 16 140.183 16 96C16 51.8172 51.8172 16 96 16C140.183 16 176 51.8172 176 96ZM16.9999 96C16.9999 139.631 52.3694 175 96 175C139.631 175 175 139.631 175 96C175 52.3694 139.631 16.9999 96 16.9999C52.3694 16.9999 16.9999 52.3694 16.9999 96Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#ring-clip)">
          <foreignObject x="0" y="0" width="192" height="192">
            <div
              className="animate-ring w-[192px] h-[192px] rounded-full"
              style={{
                transformOrigin: '96px 96px',
                background: 'conic-gradient(from 0deg, rgba(17,220,154,0.0844) 0deg, rgba(27,207,178,0.4) 57.6449deg, rgba(37,194,203,1) 100.5deg, rgba(55,172,243,1) 169.419deg, rgba(41,189,211,1) 237.469deg, rgba(34,197,195,0.4) 270.953deg, rgba(14,223,148,0) 344.591deg, rgba(17,220,154,0.0844) 360deg)',
              }}
            />
          </foreignObject>
        </g>
      </svg>
    )
  }

  if (type === 'sphere') {
    return (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="shrink-0">
        <defs>
          <clipPath id="globe-clip">
            <circle cx="80" cy="80" r="78" />
          </clipPath>
          <linearGradient id="ring-grad" x1="80" y1="2" x2="80" y2="158" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3AA9FA" />
            <stop offset="1" stopColor="#0AE58A" />
          </linearGradient>
          <linearGradient id="m-grad" x1="80" y1="2" x2="80" y2="158" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3AA9FA" />
            <stop offset="1" stopColor="#0AE58A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M80 2C37.1 2 2 37.1 2 80C2 122.9 37.1 158 80 158C122.9 158 158 122.9 158 80C158 37.1 122.9 2 80 2ZM4 80C4 38.2 38.2 4 80 4C121.8 4 156 38.2 156 80C156 121.8 121.8 156 80 156C38.2 156 4 121.8 4 80Z"
          fill="url(#ring-grad)"
        />
        <g className="animate-book-flip" style={{ transformOrigin: '80px 80px' }} clipPath="url(#globe-clip)">
          <rect x="79" y="2" width="2" height="156" fill="url(#m-grad)" />
          <path d="M80 2C92 2 102 37.8 102 80C102 122.2 92 158 80 158V156C91.2 156 100 122 100 80C100 38 91.2 4 80 4V2Z" fill="url(#m-grad)" />
          <path d="M80 2C101 2 118 37.8 118 80C118 122.2 101 158 80 158V156C100.2 156 116 122 116 80C116 38 100.2 4 80 4V2Z" fill="url(#m-grad)" />
          <path d="M80 2C116 2 140 37.8 140 80C140 122.2 116 158 80 158V156C114.8 156 138 122 138 80C138 38 114.8 4 80 4V2Z" fill="url(#m-grad)" />
          <path d="M80 2C68 2 58 37.8 58 80C58 122.2 68 158 80 158V156C68.8 156 60 122 60 80C60 38 68.8 4 80 4V2Z" fill="url(#m-grad)" />
          <path d="M80 2C59 2 42 37.8 42 80C42 122.2 59 158 80 158V156C59.8 156 44 122 44 80C44 38 59.8 4 80 4V2Z" fill="url(#m-grad)" />
          <path d="M80 2C44 2 20 37.8 20 80C20 122.2 44 158 80 158V156C45.2 156 22 122 22 80C22 38 45.2 4 80 4V2Z" fill="url(#m-grad)" />
        </g>
      </svg>
    )
  }

  if (type === 'target') {
    const spinArcs = [
      { r: 34.3571, dash: '129.52 86.35', grad: 'g-r1', anim: 'animate-target-1', delay: '0s' },
      { r: 30.9286, dash: '116.60 77.73', grad: 'g-r2', anim: 'animate-target-2', delay: '-0.3s' },
      { r: 27.5, dash: '103.67 69.12', grad: 'g-r3', anim: 'animate-target-3', delay: '-0.6s' },
      { r: 24.0714, dash: '90.75 60.50', grad: 'g-r4', anim: 'animate-target-4', delay: '-0.9s' },
      { r: 20.6429, dash: '77.82 51.88', grad: 'g-r5', anim: 'animate-target-5', delay: '-1.2s' },
      { r: 17.2143, dash: '64.90 43.26', grad: 'g-r6', anim: 'animate-target-6', delay: '-1.5s' },
      { r: 13.7857, dash: '51.97 34.65', grad: 'g-r7', anim: 'animate-target-7', delay: '-1.8s' },
    ]
    return (
      <svg width="192" height="192" viewBox="0 0 192 192" fill="none" className="shrink-0">
        <defs>
          <linearGradient id="g-outer" x1="96" y1="16" x2="96" y2="176" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3AA9FA" /><stop offset="1" stopColor="#0AE58A" />
          </linearGradient>
          <linearGradient id="g-mid" x1="96" y1="43" x2="96" y2="149" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3AA9FA" /><stop offset="1" stopColor="#0AE58A" />
          </linearGradient>
          <linearGradient id="g-r1" x1="96" y1="61" x2="96" y2="131" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" /><stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r2" x1="96" y1="65" x2="96" y2="127" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" /><stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r3" x1="96" y1="68" x2="96" y2="124" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" /><stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r4" x1="96" y1="72" x2="96" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" /><stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r5" x1="96" y1="75" x2="96" y2="117" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" /><stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r6" x1="96" y1="78" x2="96" y2="114" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" /><stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r7" x1="96" y1="82" x2="96" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" /><stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="96" cy="96" r="79.5" stroke="url(#g-outer)" fill="none" />
        <circle cx="96" cy="96" r="52.071" stroke="url(#g-mid)" fill="none" />
        {spinArcs.map((arc) => (
          <circle
            key={arc.grad}
            className={arc.anim}
            cx="96"
            cy="96"
            r={arc.r}
            stroke={`url(#${arc.grad})`}
            strokeDasharray={arc.dash}
            fill="none"
            style={{ transformOrigin: '96px 96px', animationDelay: arc.delay }}
          />
        ))}
      </svg>
    )
  }

  return null
}

export default function WhatWeDo({ id }: { id?: string }) {
  return (
    <section id={id} className="relative z-10 py-12 md:py-24 scroll-mt-20">
      <div className="container px-4 mx-auto max-w-[1330px]">
        <div className="w-full max-w-[784px]">
          <p className="text-sm leading-5 tracking-[0.96px] uppercase text-black mb-5">WHAT WE DO</p>
          <h2 className="text-2xl sm:text-4xl md:text-[52px] md:leading-[60px] -tracking-[2.34px] text-black">
            We thrive at the intersection of{' '}
            <span className="text-primary">technology, data, design, and marketing.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-12 md:gap-24 lg:gap-36 mt-12 md:mt-24 lg:mt-36">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              className="grid grid-cols-1 lg:grid-cols-[512px_1fr] gap-8 md:gap-16 lg:gap-40 items-start"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 }}
            >
              <div className="flex flex-col">
                <motion.div
                  className="w-full h-px bg-black mb-6 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 + 0.15 }}
                />
                <div className="flex items-baseline justify-between gap-4 mb-8 md:mb-24 text-lg md:text-2xl leading-8 tracking-[0.12px] text-black">
                  <h3 className="font-semibold">{phase.title}</h3>
                  <span className="tabular-nums shrink-0">{phase.number}</span>
                </div>
                <div className="flex justify-center">
                  <PhaseGraphic type={phase.graphic} />
                </div>
              </div>

              <div className="flex flex-col">
                <motion.div
                  className="w-full h-px bg-black mb-6 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 + 0.15 }}
                />
                <p className="text-base md:text-xl text-black leading-7 tracking-[0.2px] mb-10">{phase.description}</p>
                {phase.twoColumns ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                    <ul className="space-y-1">
                      {phase.services.map((s) => (
                        <li key={s} className="text-lg md:text-2xl leading-8 tracking-[0.12px] text-black">
                           {s}
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-1">
                      {phase.services.map((s) => (
                        <li key={`${s}-2`} className="text-lg md:text-2xl leading-8 tracking-[0.12px] text-black">
                           {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {phase.services.map((s) => (
                      <li key={s} className="text-lg md:text-2xl leading-8 tracking-[0.12px] text-black">
                         {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
