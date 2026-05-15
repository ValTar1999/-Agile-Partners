import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ButtonTeam from '../ButtonTeam';
import imageGroup from '../../assets/image/sectionPeople/image 8.svg';
import imagePortrait from '../../assets/image/sectionPeople/surface-4FEub7tWUzM-unsplash 1.svg';
import imageObject from '../../assets/image/sectionPeople/redd-5U_28ojjgms-unsplash 1.svg';

const imageReveal = {
  initial: { opacity: 0, scale: 0.98 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: 'easeOut' as const },
};

export default function PeopleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxLg, setParallaxLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setParallaxLg(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

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
      className="relative z-10 overflow-x-hidden pt-24 pb-24 text-white md:pb-36 lg:pt-36 lg:pb-52 xl:pt-32"
    >
      <div className="mb-40 w-full overflow-hidden md:mb-44 lg:mb-60">
        <motion.div
          className="flex items-center gap-8 px-4 text-[100px] leading-[100px] -tracking-[5px] whitespace-nowrap uppercase md:gap-16 md:text-[132px] md:leading-[132px] md:-tracking-[6.6px] lg:gap-36 lg:text-[168px] lg:leading-[168px] lg:-tracking-[8.4px]"
          style={parallaxLg ? { x: textX } : undefined}
        >
          <span className="text-white">PEOPLE BUILDING </span>
          <span className="text-white">
            <span className="italic">PEOPLE</span> BUILDING
          </span>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-10">
        <motion.div
          className="relative ml-auto w-full max-w-56 md:max-w-lg lg:mr-20"
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
          <p className="mb-8 text-xl leading-[26px] -tracking-[0.7px] text-white md:text-2xl">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa.
          </p>
          <div className="grid gap-2 uppercase">
            <div className="text-base leading-7 font-semibold tracking-[0.32px] text-white">
              NAME HERE
            </div>
            <div className="text-base leading-7 -tracking-[0.48px] text-[#999999]">
              CEO OR TESTIMONIAL
            </div>
          </div>
        </motion.div>

        <div className="overflow-visible py-24 xl:py-48">
          <div className="flex flex-col gap-8 md:gap-10 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:gap-y-14 xl:gap-x-0 xl:gap-y-0">
            <motion.div
              className="h-full w-full lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3"
              style={parallaxLg ? { y: img1Y } : undefined}
            >
              <motion.div
                className="h-full w-full overflow-hidden"
                {...imageReveal}
                transition={{ ...imageReveal.transition, delay: 0 }}
              >
                <img
                  src={imageObject}
                  alt="Team meeting"
                  className="aspect-video w-full object-cover lg:aspect-auto lg:h-[587px]"
                />
              </motion.div>
            </motion.div>
            <div className="self-start lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:w-full lg:self-auto">
              <motion.div
                className="aspect-square w-[min(100%,17rem)] max-w-[272px] lg:aspect-auto lg:h-[406px] lg:w-[290px] lg:max-w-none"
                style={parallaxLg ? { y: img2Y } : undefined}
              >
                <motion.div
                  className="h-full w-full overflow-hidden"
                  {...imageReveal}
                  transition={{ ...imageReveal.transition, delay: 0.1 }}
                >
                  <img
                    src={imagePortrait}
                    alt="Team member"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
            <div className="flex w-full justify-center lg:col-span-5 lg:col-start-8 lg:row-start-3 lg:justify-end xl:col-span-5 xl:col-start-8">
              <motion.div
                className="aspect-4/3 w-full max-w-md lg:ml-0 lg:aspect-auto lg:h-[367px] lg:w-[590px] lg:max-w-none"
                style={parallaxLg ? { y: img3Y } : undefined}
              >
                <motion.div
                  className="h-full w-full overflow-hidden"
                  {...imageReveal}
                  transition={{ ...imageReveal.transition, delay: 0.2 }}
                >
                  <img src={imageGroup} alt="Workspace" className="h-full w-full object-cover" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-end gap-14 lg:grid-cols-2 lg:gap-44">
          <motion.p
            className="max-w-[376px] text-xl leading-[26px] -tracking-[0.7px] text-white"
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
