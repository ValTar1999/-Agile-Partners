import { motion } from 'framer-motion';

const services = [
  'UX/UI design',
  'Product management',
  'Website and mobile development',
  'Platform architecture',
];

const phases = [
  {
    title: 'Strategy and Planning',
    number: '01',
    description:
      'We focus on generating ideas and strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'circle',
  },
  {
    title: 'Create and Build',
    number: '02',
    description:
      'We focus on generating ideas and strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'sphere',
    twoColumns: true,
  },
  {
    title: 'Promote and Grow',
    number: '03',
    description:
      'We focus on generating ideas & strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'target',
  },
];

const serviceItemClass =
  'text-xl leading-7 font-normal -tracking-[0.7px] text-black xl:text-2xl xl:leading-7 xl:-tracking-[0.72px]';

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
              className="animate-ring h-[192px] w-[192px] rounded-full"
              style={{
                transformOrigin: '96px 96px',
                background:
                  'conic-gradient(from 0deg, rgba(17,220,154,0.0844) 0deg, rgba(27,207,178,0.4) 57.6449deg, rgba(37,194,203,1) 100.5deg, rgba(55,172,243,1) 169.419deg, rgba(41,189,211,1) 237.469deg, rgba(34,197,195,0.4) 270.953deg, rgba(14,223,148,0) 344.591deg, rgba(17,220,154,0.0844) 360deg)',
              }}
            />
          </foreignObject>
        </g>
      </svg>
    );
  }

  if (type === 'sphere') {
    return (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="shrink-0">
        <defs>
          <clipPath id="globe-clip">
            <circle cx="80" cy="80" r="78" />
          </clipPath>
          <linearGradient
            id="ring-grad"
            x1="80"
            y1="2"
            x2="80"
            y2="158"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3AA9FA" />
            <stop offset="1" stopColor="#0AE58A" />
          </linearGradient>
          <linearGradient
            id="m-grad"
            x1="80"
            y1="2"
            x2="80"
            y2="158"
            gradientUnits="userSpaceOnUse"
          >
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
        <g
          className="animate-book-flip"
          style={{ transformOrigin: '80px 80px' }}
          clipPath="url(#globe-clip)"
        >
          <rect x="79" y="2" width="2" height="156" fill="url(#m-grad)" />
          <path
            d="M80 2C92 2 102 37.8 102 80C102 122.2 92 158 80 158V156C91.2 156 100 122 100 80C100 38 91.2 4 80 4V2Z"
            fill="url(#m-grad)"
          />
          <path
            d="M80 2C101 2 118 37.8 118 80C118 122.2 101 158 80 158V156C100.2 156 116 122 116 80C116 38 100.2 4 80 4V2Z"
            fill="url(#m-grad)"
          />
          <path
            d="M80 2C116 2 140 37.8 140 80C140 122.2 116 158 80 158V156C114.8 156 138 122 138 80C138 38 114.8 4 80 4V2Z"
            fill="url(#m-grad)"
          />
          <path
            d="M80 2C68 2 58 37.8 58 80C58 122.2 68 158 80 158V156C68.8 156 60 122 60 80C60 38 68.8 4 80 4V2Z"
            fill="url(#m-grad)"
          />
          <path
            d="M80 2C59 2 42 37.8 42 80C42 122.2 59 158 80 158V156C59.8 156 44 122 44 80C44 38 59.8 4 80 4V2Z"
            fill="url(#m-grad)"
          />
          <path
            d="M80 2C44 2 20 37.8 20 80C20 122.2 44 158 80 158V156C45.2 156 22 122 22 80C22 38 45.2 4 80 4V2Z"
            fill="url(#m-grad)"
          />
        </g>
      </svg>
    );
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
    ];
    return (
      <svg width="192" height="192" viewBox="0 0 192 192" fill="none" className="shrink-0">
        <defs>
          <linearGradient
            id="g-outer"
            x1="96"
            y1="16"
            x2="96"
            y2="176"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3AA9FA" />
            <stop offset="1" stopColor="#0AE58A" />
          </linearGradient>
          <linearGradient
            id="g-mid"
            x1="96"
            y1="43"
            x2="96"
            y2="149"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3AA9FA" />
            <stop offset="1" stopColor="#0AE58A" />
          </linearGradient>
          <linearGradient id="g-r1" x1="96" y1="61" x2="96" y2="131" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" />
            <stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r2" x1="96" y1="65" x2="96" y2="127" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" />
            <stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r3" x1="96" y1="68" x2="96" y2="124" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" />
            <stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r4" x1="96" y1="72" x2="96" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" />
            <stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r5" x1="96" y1="75" x2="96" y2="117" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" />
            <stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r6" x1="96" y1="78" x2="96" y2="114" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" />
            <stop offset="1" stopColor="#0EE292" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-r7" x1="96" y1="82" x2="96" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EE292" />
            <stop offset="1" stopColor="#0EE292" stopOpacity="0" />
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
    );
  }

  return null;
}

export default function WhatWeDo({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="relative z-10 scroll-pt-20 px-4 pt-24 pb-16 md:px-10 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24 xl:pt-60"
    >
      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-12">
        <div className="col-span-12 xl:col-span-6 xl:col-start-2">
          <p className="mb-5 text-sm leading-4 tracking-[0.14px] text-black uppercase md:text-base md:leading-5 md:tracking-[0.16px]">
            WHAT WE DO
          </p>
          <h2 className="text-[32px] leading-[34px] -tracking-[1.28px] text-black md:text-[52px] md:leading-[60px] md:-tracking-[2.34px]">
            We thrive at the intersection of{' '}
            <span className="text-primary">technology, data, design, and marketing.</span>
          </h2>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-20 md:mt-[100px] md:gap-24 lg:gap-[100px]">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.number}
            className="grid grid-cols-1 items-start md:grid-cols-12 md:gap-x-8 md:gap-y-0"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 }}
          >
            <motion.div
              className="mb-5 hidden h-px w-full origin-left bg-black md:col-span-4 md:col-start-1 md:row-start-1 md:block xl:col-span-4 xl:col-start-2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 + 0.15 }}
            />
            <motion.div
              className="mb-5 hidden h-px w-full origin-left bg-black md:col-span-8 md:col-start-5 md:row-start-1 md:block xl:col-span-5 xl:col-start-7"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 + 0.15 }}
            />
            <motion.div
              className="mb-5 h-px w-full origin-left bg-black md:hidden"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 + 0.15 }}
            />

            <div className="mb-8 flex w-full items-baseline justify-between gap-4 md:mb-0 md:contents">
              <h3 className="min-w-0 text-2xl leading-7 font-medium -tracking-[0.72px] text-black md:col-span-3 md:col-start-1 md:row-start-2 md:mb-0 xl:col-span-3 xl:col-start-2">
                {phase.title}
              </h3>
              <span className="font-inter shrink-0 text-2xl leading-7 -tracking-[0.72px] text-black md:col-span-1 md:col-start-4 md:row-start-2 md:mb-0 md:text-right xl:col-start-5">
                {phase.number}
              </span>
            </div>

            <div className="col-span-full flex justify-center py-12 md:col-span-4 md:col-start-1 md:row-start-3 md:py-0 md:pt-8 xl:col-span-2 xl:col-start-3 xl:pt-20">
              <PhaseGraphic type={phase.graphic} />
            </div>

            <div className="col-span-full flex flex-col md:col-span-8 md:col-start-5 md:row-span-2 md:row-start-2 xl:col-span-5 xl:col-start-7">
              <p className="mb-8 text-xl leading-[26px] -tracking-[0.7px] text-black">
                {phase.description}
              </p>
              {phase.twoColumns ? (
                <div className="grid grid-cols-2 gap-x-5 gap-y-1">
                  <ul className="space-y-1">
                    {phase.services.map((s) => (
                      <li key={s} className={serviceItemClass}>
                        {s}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1">
                    {phase.services.map((s) => (
                      <li key={`${s}-2`} className={serviceItemClass}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className="space-y-1">
                  {phase.services.map((s) => (
                    <li key={s} className={serviceItemClass}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
