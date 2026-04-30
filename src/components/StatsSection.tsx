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
    <span className="inline-block w-[3.5ch] text-right tabular-nums text-4xl sm:text-6xl md:text-8xl lg:text-[168px] lg:leading-[168px] -tracking-[8.4px]">
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
    <div className="w-full border-y border-white/5 container px-4 mx-auto pt-8 md:pt-10 pb-16 md:pb-36 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
      <motion.p
        className="text-base text-white uppercase leading-7 tracking-[0.16px]"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Let us share some stats
      </motion.p>
      <motion.div
        ref={blockRef}
        className="flex items-start"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex flex-col w-full max-w-[852px]">
          <p className="text-lg md:text-2xl leading-[30px] -tracking-[0.72px] text-white">
            Fintech isn't easy. We just make it feel that way.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-[108px] sm:gap-y-[72px] mt-8">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label} className="flex items-start gap-4 text-white">
                <AnimatedNumber value={value} suffix={suffix} start={startCount} />
                <span className="text-base leading-8 -tracking-[0.48px] max-w-40 sm:max-w-32 shrink-0 text-white/90">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        className="flex justify-end"
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
