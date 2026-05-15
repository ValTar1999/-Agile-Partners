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

export default function PartnersSection() {
  return (
    <section className="container mx-auto flex w-full flex-col gap-8 px-4 pt-10 pb-24 md:px-10 lg:items-start lg:gap-20 xl:flex-row xl:gap-0">
      <motion.p
        className="mb-6 text-sm leading-4 tracking-[0.14px] text-white uppercase md:mb-8 xl:mb-0 2xl:min-w-[560px]"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Our Partners
      </motion.p>

      <motion.div
        className="flex w-full max-w-[952px] flex-col gap-8 md:gap-16 lg:gap-[100px]"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      >
        <p className="text-xl leading-[26px] -tracking-[0.7px] text-white">
          We work and create with ambitious businesses and people.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-start md:gap-12 lg:gap-[100px]">
          {PARTNERS.map(({ name, logo }) => (
            <img key={name} src={logo} alt={name} className="h-9 w-auto object-contain" />
          ))}
        </div>
        <div className="flex">
          <ButtonTeam>Become a partner</ButtonTeam>
        </div>
      </motion.div>
    </section>
  );
}
