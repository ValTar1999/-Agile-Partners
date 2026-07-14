import { motion } from 'framer-motion';
import circle1 from '../assets/whatWeDo/Circle 1.svg';
import circle2 from '../assets/whatWeDo/Circle 2.svg';
import circle3 from '../assets/whatWeDo/Circle 3.svg';
import RevealLine from './RevealLine';

const services = [
  'UX/UI design',
  'Product management',
  'Website and mobile development',
  'Platform architecture',
];

const PHASE_GRAPHICS = {
  circle: circle1,
  sphere: circle2,
  target: circle3,
} as const;

const phases = [
  {
    title: 'Strategy and Planning',
    number: '01',
    description:
      'We focus on generating ideas and strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'circle' as const,
  },
  {
    title: 'Create and Build',
    number: '02',
    description:
      'We focus on generating ideas and strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'sphere' as const,
    twoColumns: true,
  },
  {
    title: 'Promote and Grow',
    number: '03',
    description:
      'We focus on generating ideas & strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'target' as const,
  },
];

const serviceItemClass =
  'text-xl leading-7 font-normal -tracking-[0.7px] text-current xl:text-2xl xl:leading-7 xl:-tracking-[0.72px]';
const PHASE_STAGGER = 0.15;
const LINE_REVEAL_DURATION = 0.5;
const TEXT_REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function PhaseGraphic({ type, delay = 0 }: { type: keyof typeof PHASE_GRAPHICS; delay?: number }) {
  return (
    <motion.div
      className="inline-flex shrink-0"
      initial={{ opacity: 0, scale: 0.72 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.85,
        ease: TEXT_REVEAL_EASE,
        delay,
      }}
    >
      <img
        src={PHASE_GRAPHICS[type]}
        alt=""
        className="h-40 w-40 shrink-0 object-contain"
        draggable={false}
      />
    </motion.div>
  );
}

export default function WhatWeDo({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="relative z-10 mx-auto w-full max-w-2160 scroll-pt-20 px-4 pt-24 pb-16 md:px-10 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24 xl:pt-96"
    >
      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-12">
        <div className="col-span-12 xl:col-span-6 xl:col-start-2">
          <RevealLine className="mb-5 text-sm leading-4 tracking-[0.14px] text-current uppercase md:text-base md:leading-5 md:tracking-[0.16px]">
            WHAT WE DO
          </RevealLine>
          <h2 className="text-[32px] leading-[34px] -tracking-[1.28px] text-current md:text-[52px] md:leading-[60px] md:-tracking-[2.34px]">
            <RevealLine delay={0.15}>We thrive at the intersection of</RevealLine>
            <RevealLine delay={0.3} className="xl:-mt-1">
              <span className="text-primary">technology, data, design, and marketing.</span>
            </RevealLine>
          </h2>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-20 md:mt-[100px] md:gap-24 lg:gap-[100px]">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.number}
            className="grid grid-cols-1 items-start md:grid-cols-12 md:gap-x-8 md:gap-y-0"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div
              className="mb-5 hidden h-px w-full origin-left bg-current md:col-span-4 md:col-start-1 md:row-start-1 md:block xl:col-span-4 xl:col-start-2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: LINE_REVEAL_DURATION,
                ease: 'easeOut',
                delay: index * PHASE_STAGGER + 0.15,
              }}
            />
            <motion.div
              className="mb-5 hidden h-px w-full origin-left bg-current md:col-span-8 md:col-start-5 md:row-start-1 md:block xl:col-span-5 xl:col-start-7"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: LINE_REVEAL_DURATION,
                ease: 'easeOut',
                delay: index * PHASE_STAGGER + 0.15,
              }}
            />
            <motion.div
              className="mb-5 h-px w-full origin-left bg-current md:hidden"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: LINE_REVEAL_DURATION,
                ease: 'easeOut',
                delay: index * PHASE_STAGGER + 0.15,
              }}
            />

            <div className="mb-8 flex w-full items-baseline justify-between gap-4 md:mb-0 md:contents">
              <div className="overflow-hidden md:col-span-3 md:col-start-1 md:row-start-2 md:mb-0 xl:col-span-3 xl:col-start-2">
                <motion.h3
                  className="min-w-0 text-2xl leading-7 font-medium -tracking-[0.72px] text-current"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.55,
                    ease: TEXT_REVEAL_EASE,
                    delay: index * PHASE_STAGGER + 0.15 + LINE_REVEAL_DURATION,
                  }}
                >
                  {phase.title}
                </motion.h3>
              </div>
              <div className="overflow-hidden md:col-span-1 md:col-start-4 md:row-start-2 md:mb-0 md:text-right xl:col-start-5">
                <motion.span
                  className="font-inter shrink-0 text-2xl leading-7 -tracking-[0.72px] text-current"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.5,
                    ease: TEXT_REVEAL_EASE,
                    delay: index * PHASE_STAGGER + 0.21 + LINE_REVEAL_DURATION,
                  }}
                >
                  {phase.number}
                </motion.span>
              </div>
            </div>

            <div className="col-span-full flex justify-center py-12 md:col-span-4 md:col-start-1 md:row-start-3 md:py-0 md:pt-8 xl:col-span-2 xl:col-start-3 xl:pt-20">
              <PhaseGraphic
                type={phase.graphic}
                delay={index * PHASE_STAGGER + 0.28 + LINE_REVEAL_DURATION}
              />
            </div>

            <div className="col-span-full flex flex-col md:col-span-8 md:col-start-5 md:row-span-2 md:row-start-2 xl:col-span-5 xl:col-start-7">
              <motion.p
                className="mb-8 text-xl leading-[26px] -tracking-[0.7px] text-current"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  ease: TEXT_REVEAL_EASE,
                  delay: index * PHASE_STAGGER + 0.22 + LINE_REVEAL_DURATION,
                }}
              >
                {phase.description}
              </motion.p>
              {phase.twoColumns ? (
                <div className="grid grid-cols-2 gap-x-5 gap-y-1">
                  <ul className="space-y-1">
                    {phase.services.map((s, serviceIndex) => (
                      <motion.li
                        key={s}
                        className={serviceItemClass}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{
                          duration: 0.45,
                          ease: TEXT_REVEAL_EASE,
                          delay:
                            index * PHASE_STAGGER +
                            0.34 +
                            LINE_REVEAL_DURATION +
                            serviceIndex * 0.06,
                        }}
                      >
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                  <ul className="space-y-1">
                    {phase.services.map((s, serviceIndex) => (
                      <motion.li
                        key={`${s}-2`}
                        className={serviceItemClass}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{
                          duration: 0.45,
                          ease: TEXT_REVEAL_EASE,
                          delay:
                            index * PHASE_STAGGER +
                            0.34 +
                            LINE_REVEAL_DURATION +
                            (serviceIndex + phase.services.length) * 0.06,
                        }}
                      >
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className="space-y-1">
                  {phase.services.map((s, serviceIndex) => (
                    <motion.li
                      key={s}
                      className={serviceItemClass}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{
                        duration: 0.45,
                        ease: TEXT_REVEAL_EASE,
                        delay:
                          index * PHASE_STAGGER + 0.34 + LINE_REVEAL_DURATION + serviceIndex * 0.06,
                      }}
                    >
                      {s}
                    </motion.li>
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
