import { motion } from 'framer-motion';
import ButtonTeam from './ButtonTeam';
import payallLogo from '../assets/image/payall.svg';
import transcardLogo from '../assets/image/transcard.svg';
import prysymLogo from '../assets/image/prysym.svg';
import artymysLogo from '../assets/image/artymys.svg';

const PARTNERS = [
  { name: 'Payall', logo: payallLogo },
  { name: 'Transcard', logo: transcardLogo },
  { name: 'Prysym', logo: prysymLogo },
  { name: 'ARTYMYS', logo: artymysLogo },
];

const fadeIn = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

export default function PartnersSection() {
  return (
    <section className="flex flex-col gap-12 border-y border-white/5 px-4 pt-8 pb-24 md:gap-16 md:px-10 md:pt-10 xl:gap-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-x-8">
        <div className="flex min-w-0 flex-col gap-6 md:col-span-8 lg:contents">
          <motion.p
            className="text-sm leading-4 font-normal tracking-[0.14px] text-white uppercase lg:col-span-2 xl:text-base xl:leading-5 xl:tracking-[0.16px] xl:text-nowrap"
            {...fadeIn}
          >
            Our Partners
          </motion.p>

          <motion.p
            className="text-xl leading-[26px] font-normal -tracking-[0.7px] text-white lg:col-span-5 lg:col-start-5 xl:text-2xl xl:leading-7 xl:-tracking-[0.72px]"
            {...fadeIn}
          >
            We work and create with ambitious businesses and people.
          </motion.p>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 md:gap-x-8"
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.1 }}
      >
        <div className="flex flex-wrap items-center gap-6 md:col-span-8 md:col-start-5 md:gap-8 lg:gap-12 xl:gap-[100px]">
          {PARTNERS.map(({ name, logo }) => (
            <img key={name} src={logo} alt={name} className="h-9 w-auto shrink-0 object-contain" />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 md:gap-x-8"
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        <div className="md:col-span-8 md:col-start-5">
          <ButtonTeam>Become part of our team</ButtonTeam>
        </div>
      </motion.div>
    </section>
  );
}
