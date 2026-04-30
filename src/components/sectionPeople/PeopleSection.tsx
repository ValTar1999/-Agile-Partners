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
  const img1Y = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, -200]);
  const img2Y = useTransform(scrollYProgress, [0, 0.5, 1], [-160, 0, 160]);
  const img3Y = useTransform(scrollYProgress, [0, 0.5, 1], [440, 0, -440]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 text-white pt-16 md:pt-24 lg:pt-36 pb-24 md:pb-36 lg:pb-52 overflow-x-hidden"
    >
      <div className="w-full overflow-hidden mb-16 md:mb-32 lg:mb-60">
        <motion.div
          className="text-5xl md:text-7xl lg:text-[168px] lg:leading-[168px] font-medium uppercase -tracking-[2px] md:-tracking-[4px] lg:-tracking-[8.4px] whitespace-nowrap px-4 flex items-center gap-8 md:gap-16 lg:gap-36"
          style={{ x: textX }}
        >
          <span className="text-white">PEOPLE BUILDING </span>
          <span className="text-white">
            <span className="italic">PEOPLE</span> BUILDING
          </span>
        </motion.div>
      </div>

      <div className="container px-4 mx-auto">
        <motion.div
          className="w-full max-w-lg relative ml-0 lg:ml-auto lg:mr-20"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="absolute -top-20 -left-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="132"
              height="132"
              viewBox="0 0 132 132"
              fill="none"
            >
              <path
                opacity="0.2"
                d="M74.4511 114.408H122.213V64.8771H101.575C101.575 53.0841 109.83 42.4704 123.392 38.6377V18C109.83 18.8845 95.3836 24.781 86.8337 34.2154C78.8735 43.0601 74.4511 54.5583 74.4511 71.9529V114.408ZM9 114.408H56.7616V64.8771H36.1239C36.1239 53.0841 44.379 42.4704 57.9409 38.6377V18C44.379 18.8845 29.9326 24.781 21.3826 34.2154C13.4224 43.0601 9 54.5583 9 71.9529V114.408Z"
                fill="white"
              />
            </svg>
          </div>
          <p className="text-lg md:text-2xl text-white leading-[30px] -tracking-[0.72px] mb-8">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa.
          </p>
          <div className="grid gap-2 uppercase">
            <div className="font-semibold text-base leading-7 tracking-[0.32px] text-white">
              NAME HERE
            </div>
            <div className="text-base leading-7 -tracking-[0.48px] text-[#999999]">
              CEO OR TESTIMONIAL
            </div>
          </div>
        </motion.div>

        <div className="py-12 md:py-32 lg:py-60 overflow-visible">
          <div className="">
            <motion.div className="w-full h-full" style={{ y: img1Y }}>
              <img
                src={imageObject}
                alt="Team meeting"
                className="w-full object-cover h-[664px] max-w-5xl mx-auto"
                style={{ aspectRatio: '16/9' }}
              />
            </motion.div>
            <div className="w-full -mt-40 ml-20">
              <motion.div className="w-full max-w-80 h-[460px]" style={{ y: img2Y }}>
                <img
                  src={imagePortrait}
                  alt="Team member"
                  className="w-full h-full aspect-square object-cover"
                />
              </motion.div>
            </div>
            <div className="w-full flex justify-end">
              <motion.div className="w-full max-w-[648px] h-[416px]" style={{ y: img3Y }}>
                <img
                  src={imageGroup}
                  alt="Workspace"
                  className="w-full object-cover"
                  style={{ aspectRatio: '4/3' }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-[168px] items-end">
          <motion.p
            className="text-base md:text-xl leading-[26px] -tracking-[0.7px] text-white max-w-[376px]"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Agile Partners was born from the encounter of passionate individuals with complementary
            profiles. Product management, creative direction and technological lead: they form a
            complete framework that passes its craft and vision to the different poles of the
            company.
          </motion.p>
          <motion.div
            className="flex items-center justify-start"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ButtonTeam>Become part of our team</ButtonTeam>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
