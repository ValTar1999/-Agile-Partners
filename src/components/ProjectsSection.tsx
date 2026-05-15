import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import p1 from '../assets/image/project/p-1.svg';
import p2 from '../assets/image/project/p-2.svg';
import p3 from '../assets/image/project/p-3.svg';
import p4 from '../assets/image/project/p-4.svg';
import p5 from '../assets/image/project/p-5.svg';
import p6 from '../assets/image/project/p-6.svg';
import p7 from '../assets/image/project/p-7.svg';
import p8 from '../assets/image/project/p-8.svg';
import p9 from '../assets/image/project/p-9.svg';
import Simbols from '../assets/image/project/Simbolds.svg';

const PROJECTS = [
  {
    image: p1,
    title: 'WEBSITES',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  {
    image: p2,
    title: 'INVOICING PLATFORM',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  {
    image: p3,
    title: 'PAYMENT PROCESSING PLATFORM',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  {
    image: p4,
    title: 'Reconciliation flows',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  {
    image: p5,
    title: 'Backend office operations',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  { image: p6, title: 'Card payment operations', description: null },
  { image: p7, title: 'AI-powered insights', description: null },
  {
    image: p8,
    title: 'Enrollment and onboarding portal',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  {
    image: p9,
    title: 'Accounts Payable and Accounts Receivable payment operations',
    description: null,
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const textX = useTransform(scrollYProgress, [0, 0.5, 1], ['-20%', '20%', '-20%']);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-x-hidden pt-16 pb-24 md:pt-24 md:pb-60 lg:pt-40"
    >
      <div className="mb-16 w-full overflow-hidden md:mb-32 lg:mb-72">
        <motion.div
          className="flex items-center gap-8 px-4 text-5xl font-medium -tracking-[2px] whitespace-nowrap uppercase md:gap-16 md:text-7xl md:-tracking-[4px] lg:gap-36 lg:text-[168px] lg:leading-[168px] lg:-tracking-[8.4px]"
          style={{ x: textX }}
        >
          <span className="text-black">WHAT WE DO </span>
          <span className="text-black">
            <span className="italic">BEST</span> WHAT WE DO{' '}
          </span>
          <span className="text-black">
            <span className="italic">BEST</span>
          </span>
        </motion.div>
      </div>

      <div className="container mx-auto flex flex-col gap-14 px-4 md:gap-20 lg:gap-32">
        <motion.div
          className="w-full max-w-[1040px]"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img className="h-full max-h-[600px] w-full object-cover" src={p1} alt="" />
          <motion.div
            className="my-6 h-px w-full origin-left bg-black"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          />
          <div className="flex flex-col items-start justify-between gap-3 text-black xl:flex-row">
            <p className="text-base leading-5 font-semibold tracking-[0.32px] uppercase">
              {PROJECTS[0].title}
            </p>
            <span className="w-full max-w-[372px] text-base leading-5 -tracking-[0.48px]">
              {PROJECTS[0].description}
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between lg:gap-0">
          <motion.div
            className="mx-auto mt-0 w-full max-w-lg lg:mt-[452px]"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img className="h-full max-h-[680px] w-full object-cover" src={p3} alt="" />
            <motion.div
              className="my-6 h-px w-full origin-left bg-black"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            />
            <div className="flex flex-col items-start justify-between gap-3 text-black xl:flex-row">
              <p className="w-full max-w-[108px] text-base leading-5 font-semibold tracking-[0.32px] uppercase">
                {PROJECTS[1].title}
              </p>
              <span className="w-full max-w-[372px] text-base leading-5 -tracking-[0.48px]">
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
            <img className="h-full max-h-[648px] w-full object-cover" src={p2} alt="" />
            <motion.div
              className="my-6 h-px w-full origin-left bg-black"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            />
            <div className="flex flex-col items-start justify-between gap-3 text-black xl:flex-row">
              <p className="w-full max-w-60 text-base leading-5 font-semibold tracking-[0.32px] uppercase">
                {PROJECTS[2].title}
              </p>
              <span className="w-full max-w-[372px] text-base leading-5 -tracking-[0.48px]">
                {PROJECTS[2].description}
              </span>
            </div>
          </motion.div>
        </div>

        <img className="ml-auto h-8 w-fit object-cover" src={Simbols} alt="" />

        <motion.div
          className="w-full max-w-[784px]"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img className="h-full max-h-[500px] w-full object-cover" src={p4} alt="" />
          <motion.div
            className="my-6 h-px w-full origin-left bg-black"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          />
          <div className="flex flex-col items-start justify-between gap-3 text-black xl:flex-row">
            <p className="text-base leading-5 font-semibold tracking-[0.32px] uppercase">
              {PROJECTS[3].title}
            </p>
            <span className="w-full max-w-[372px] text-base leading-5 -tracking-[0.48px]">
              {PROJECTS[3].description}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="ml-auto w-full max-w-[648px]"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img className="h-full max-h-[500px] w-full object-cover" src={p5} alt="" />
          <motion.div
            className="my-6 h-px w-full origin-left bg-black"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          />
          <div className="flex flex-col items-start justify-between gap-3 text-black xl:flex-row">
            <p className="w-full max-w-60 text-base leading-5 font-semibold tracking-[0.32px] uppercase">
              {PROJECTS[4].title}
            </p>
            <span className="w-full max-w-[372px] text-base leading-5 -tracking-[0.48px]">
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
          <img className="h-full max-h-60 w-full object-cover" src={p6} alt="" />
          <motion.div
            className="my-6 h-px w-full origin-left bg-black"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          />
          <div className="flex flex-col items-start justify-between gap-3 text-black xl:flex-row">
            <p className="text-base leading-5 font-semibold tracking-[0.32px] uppercase">
              {PROJECTS[5].title}
            </p>
            {PROJECTS[5].description && (
              <span className="w-full max-w-[372px] text-base leading-5 -tracking-[0.48px]">
                {PROJECTS[5].description}
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-96"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img className="h-full max-h-[480px] w-full object-cover" src={p7} alt="" />
          <motion.div
            className="my-6 h-px w-full origin-left bg-black"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          />
          <div className="flex flex-col items-start justify-between gap-3 text-black xl:flex-row">
            <p className="text-base leading-5 font-semibold tracking-[0.32px] uppercase">
              {PROJECTS[6].title}
            </p>
            {PROJECTS[6].description && (
              <span className="w-full max-w-[372px] text-base leading-5 -tracking-[0.48px]">
                {PROJECTS[6].description}
              </span>
            )}
          </div>
        </motion.div>

        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between lg:gap-0">
          <motion.div
            className="w-full max-w-[648px]"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img
              className="h-full max-h-[400px] w-full object-cover md:max-h-[648px]"
              src={p8}
              alt=""
            />
            <motion.div
              className="my-6 h-px w-full origin-left bg-black"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            />
            <div className="flex flex-col items-start justify-between gap-3 text-black xl:flex-row">
              <p className="w-full max-w-60 text-base leading-5 font-semibold tracking-[0.32px] uppercase">
                {PROJECTS[7].title}
              </p>
              <span className="w-full max-w-[372px] text-base leading-5 -tracking-[0.48px]">
                {PROJECTS[7].description}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="mt-0 w-full max-w-[648px] lg:mt-[557px]"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img className="h-full max-h-[412px] w-full object-cover" src={p9} alt="" />
            <motion.div
              className="my-6 h-px w-full origin-left bg-black"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            />
            <div className="flex flex-col items-start justify-between gap-3 text-black xl:flex-row">
              <p className="text-base leading-5 font-semibold tracking-[0.32px] uppercase">
                {PROJECTS[8].title}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
