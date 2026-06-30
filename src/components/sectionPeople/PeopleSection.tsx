import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ButtonTeam from '../ButtonTeam';
import imageGroup from '../../assets/image/sectionPeople/image 8.svg';
import imagePortrait from '../../assets/image/sectionPeople/surface-4FEub7tWUzM-unsplash 1.svg';
import imageObject from '../../assets/image/sectionPeople/redd-5U_28ojjgms-unsplash 1.svg';

export default function PeopleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const textX = useTransform(scrollYProgress, [0, 0.5, 1], ['-20%', '20%', '-20%']);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mx-auto w-full max-w-2160 overflow-x-hidden pt-24 pb-24 text-white md:pt-24 md:pb-36 lg:pt-36 lg:pb-52 xl:pt-32 xl:pb-24"
    >
      <div className="mb-40 w-full overflow-hidden md:mb-44 lg:mb-60">
        <motion.div
          className="flex items-center gap-6 text-[100px] leading-[100px] -tracking-[5px] whitespace-nowrap uppercase md:gap-16 md:text-[132px] md:leading-[132px] md:-tracking-[6.6px] lg:gap-36 lg:text-[168px] lg:leading-[168px] lg:-tracking-[8.4px]"
          style={{ x: textX }}
        >
          <span className="text-white">PEOPLE BUILDING </span>
          <span className="text-white">
            <span className="italic">PEOPLE</span> BUILDING
          </span>
        </motion.div>
      </div>

      <div className="grid grid-cols-12 gap-x-8 px-4 md:px-10">
        <motion.div
          className="relative col-span-8 col-start-4 md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-6 xl:col-span-4 xl:col-start-7"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="absolute -top-12 -left-8 md:-top-20 md:-left-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="132"
              height="132"
              viewBox="0 0 132 132"
              fill="none"
              className="h-20 w-20 md:h-[132px] md:w-[132px]"
            >
              <path
                opacity="0.2"
                d="M74.4511 114.408H122.213V64.8771H101.575C101.575 53.0841 109.83 42.4704 123.392 38.6377V18C109.83 18.8845 95.3836 24.781 86.8337 34.2154C78.8735 43.0601 74.4511 54.5583 74.4511 71.9529V114.408ZM9 114.408H56.7616V64.8771H36.1239C36.1239 53.0841 44.379 42.4704 57.9409 38.6377V18C44.379 18.8845 29.9326 24.781 21.3826 34.2154C13.4224 43.0601 9 54.5583 9 71.9529V114.408Z"
                fill="white"
              />
            </svg>
          </div>
          <p className="mb-8 text-xl leading-[26px] -tracking-[0.72px] text-white md:text-2xl">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa.
          </p>
          <div className="grid gap-2 uppercase">
            <div className="text-base leading-5 font-semibold tracking-[0.32px] text-white">
              NAME HERE
            </div>
            <div className="text-base leading-5 -tracking-[0.48px] text-[#999999]">
              CEO OR TESTIMONIAL
            </div>
          </div>
        </motion.div>
      </div>

      <div className="overflow-visible px-4 py-24 md:px-10 xl:pt-48 xl:pb-0">
        <div className="flex flex-col gap-10 md:grid md:auto-rows-auto md:grid-cols-12 md:items-start md:gap-x-8 md:gap-y-0">
          <div className="w-full md:col-span-8 md:col-start-3 md:row-start-1 lg:col-span-8 lg:col-start-3 xl:col-span-8 xl:col-start-3">
            <div className="w-full overflow-hidden lg:w-full">
              <img
                src={imageObject}
                alt="Team meeting"
                className="aspect-5/3 w-full object-cover"
              />
            </div>
          </div>
          <div className="relative w-[68%] self-start md:-top-10 md:col-span-3 md:col-start-1 md:row-start-2 md:w-auto md:self-start lg:top-0 lg:col-span-3 lg:col-start-2 lg:row-start-2 lg:w-full xl:-top-20">
            <div className="w-full overflow-hidden lg:w-full">
              <img
                src={imagePortrait}
                alt="Team member"
                className="aspect-3/4 w-full object-cover"
              />
            </div>
          </div>
          <div className="relative w-11/12 self-end md:-top-32 md:col-span-5 md:col-start-6 md:row-start-3 md:w-auto md:self-start lg:top-0 lg:col-span-5 lg:col-start-7 lg:row-start-3 lg:w-full xl:-top-48">
            <div className="w-full overflow-hidden lg:w-full">
              <img src={imageGroup} alt="Workspace" className="aspect-5/3 w-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-10 px-4 md:grid-cols-12 md:gap-x-8 md:gap-y-10 md:px-10 xl:gap-y-0">
        <motion.p
          className="text-xl leading-[26px] -tracking-[0.7px] text-white md:col-span-8 md:col-start-2 md:row-start-1 xl:col-span-3 xl:col-start-3"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Agile Partners was born from the encounter of passionate individuals with complementary
          profiles. Product management, creative direction and technological lead: they form a
          complete framework that passes its craft and vision to the different poles of the company.
        </motion.p>
        <motion.div
          className="flex items-start justify-start md:col-span-6 md:col-start-2 md:row-start-2 xl:col-span-4 xl:col-start-7 xl:row-start-1 xl:items-end xl:justify-start"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <ButtonTeam>Become part of our team</ButtonTeam>
        </motion.div>
      </div>
    </section>
  );
}
