import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';

const STATS = [
  { value: 98, suffix: '+', label: 'people in our team' },
  { value: 5, suffix: '', label: 'countries across the globe' },
  { value: 37, suffix: '+', label: 'projects launched' },
  { value: 7, suffix: '', label: 'years rocking the fintech world' },
];

function AnimatedNumber({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
  start: boolean;
}) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    const unsub = motionValue.on('change', (v) => setDisplay(`${Math.round(v)}${suffix}`));
    return unsub;
  }, [motionValue, suffix]);

  useEffect(() => {
    if (start) {
      const controls = animate(motionValue, value, { duration: 1.8, ease: [0.22, 0.61, 0.36, 1] });
      return () => controls.stop();
    }
  }, [start, value, motionValue]);

  return (
    <span className="inline-block w-auto text-left text-8xl leading-[82px] -tracking-[4.8px] tabular-nums sm:w-[3.5ch] sm:text-right lg:text-[168px] lg:leading-[168px] lg:-tracking-[8.4px]">
      {display}
    </span>
  );
}

export default function StatsSection() {
  const blockRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(blockRef, { once: true, margin: '-60px' });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (isInView) setStartCount(true);
  }, [isInView]);

  return (
    <div className="container mx-auto flex w-full flex-col gap-20 border-y border-white/5 px-4 pt-8 pb-24 md:items-start md:justify-between md:px-10 md:pt-10 xl:flex-row xl:gap-0 xl:gap-20 2xl:gap-0">
      <motion.p
        className="hidden text-sm leading-4 tracking-[0.14px] text-nowrap text-white uppercase xl:block 2xl:min-w-[560px]"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Let us share some stats
      </motion.p>

      <div className="w-full">
        <div className="flex w-full items-center justify-between gap-6 xl:mb-16">
          <div className="flex flex-col gap-6">
            <motion.p
              className="text-sm leading-4 tracking-[0.14px] text-white uppercase xl:hidden"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Let us share some stats
            </motion.p>
            <motion.p
              className="text-xl leading-[26px] -tracking-[0.7px] text-white"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Fintech isn't easy. We just make it feel that way.
            </motion.p>
          </div>
          <motion.div
            className="flex justify-end xl:hidden"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
            >
              <g className="stats-svg-lines">
                <path d="M50.0078 1.16602V97.3811" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M41.543 1.91406L58.2291 96.7179" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M33.3242 4.07129L66.2814 94.5583" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M25.6016 7.72461L73.7506 91.0723" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M18.7129 12.54L80.5595 86.2579" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M12.6523 18.6006L86.3702 80.4472" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M7.83789 25.4902L91.1856 73.6393" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M4.18555 33.2109L94.6726 66.1681" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M2.02539 41.4287L96.8292 58.1148" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M1.2793 49.8975H97.4944" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M2.02539 58.3629L96.8292 41.6768" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M4.18555 66.5822L94.6726 33.625" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M7.83789 74.2194L91.1856 26.1533" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M12.6523 81.1923L86.3702 19.3457" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M18.7129 87.254L80.5595 13.5361" stroke="#0AE58A" strokeMiterlimit="10" />
                <path d="M25.6016 92.0674L73.7506 8.71973" stroke="#0AE58A" strokeMiterlimit="10" />
              </g>

              <path
                d="M1.30078 99.1053V50.3906H49.5005V99.1053H1.30078Z"
                fill="url(#paint0_linear)"
              />
              <path
                d="M98.7227 1.16699L98.7227 49.4219L50.5015 49.4219L50.5015 1.16699L98.7227 1.16699Z"
                fill="url(#paint1_linear)"
              />

              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="42.4367"
                  y1="64.0142"
                  x2="6.66487"
                  y2="50.059"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear"
                  x1="57.5684"
                  y1="35.9269"
                  x2="93.2616"
                  y2="49.9904"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        <motion.div
          ref={blockRef}
          className="flex items-start pt-20 xl:pt-0"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="inline-flex w-full max-w-[852px] flex-col">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-y-10">
              {STATS.map(({ value, suffix, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-start gap-3 text-white sm:flex-row sm:items-start sm:gap-4"
                >
                  <AnimatedNumber value={value} suffix={suffix} start={startCount} />
                  <span className="max-w-[280px] text-left text-base leading-5 -tracking-[0.48px] text-white sm:max-w-32 sm:shrink-0 sm:leading-8 sm:text-white/90">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hidden justify-end xl:flex 2xl:ml-20"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
        >
          <g className="stats-svg-lines">
            <path d="M50.0078 1.16602V97.3811" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M41.543 1.91406L58.2291 96.7179" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M33.3242 4.07129L66.2814 94.5583" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M25.6016 7.72461L73.7506 91.0723" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M18.7129 12.54L80.5595 86.2579" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M12.6523 18.6006L86.3702 80.4472" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M7.83789 25.4902L91.1856 73.6393" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M4.18555 33.2109L94.6726 66.1681" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M2.02539 41.4287L96.8292 58.1148" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M1.2793 49.8975H97.4944" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M2.02539 58.3629L96.8292 41.6768" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M4.18555 66.5822L94.6726 33.625" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M7.83789 74.2194L91.1856 26.1533" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M12.6523 81.1923L86.3702 19.3457" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M18.7129 87.254L80.5595 13.5361" stroke="#0AE58A" strokeMiterlimit="10" />
            <path d="M25.6016 92.0674L73.7506 8.71973" stroke="#0AE58A" strokeMiterlimit="10" />
          </g>

          <path d="M1.30078 99.1053V50.3906H49.5005V99.1053H1.30078Z" fill="url(#paint0_linear)" />
          <path
            d="M98.7227 1.16699L98.7227 49.4219L50.5015 49.4219L50.5015 1.16699L98.7227 1.16699Z"
            fill="url(#paint1_linear)"
          />

          <defs>
            <linearGradient
              id="paint0_linear"
              x1="42.4367"
              y1="64.0142"
              x2="6.66487"
              y2="50.059"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="1" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="57.5684"
              y1="35.9269"
              x2="93.2616"
              y2="49.9904"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
