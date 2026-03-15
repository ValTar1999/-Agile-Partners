import { motion } from 'framer-motion'
import ButtonTeam from './ButtonTeam'
import payallLogo from '../assets/image/payall.svg'
import transcardLogo from '../assets/image/transcard.svg'
import prysymLogo from '../assets/image/prysym.svg'
import artymysLogo from '../assets/image/artymys.svg'

const PARTNERS = [
  { name: 'Payall', logo: payallLogo },
  { name: 'Transcard', logo: transcardLogo },
  { name: 'Prysym', logo: prysymLogo },
  { name: 'ARTYMYS', logo: artymysLogo },
]

export default function PartnersSection() {
  return (
    <section className="w-full container mx-auto px-4 pt-10 pb-16 md:pb-32 lg:pb-52 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0">
      <motion.p
        className="text-base text-white uppercase leading-5 tracking-[0.16px]"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Our Partners
      </motion.p>

      <motion.div
        className="flex flex-col gap-8 md:gap-16 lg:gap-[100px] w-full max-w-[952px]"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      >
        <p className="text-lg md:text-2xl leading-[30px] -tracking-[0.72px] text-white">
          We work and create with ambitious businesses and people.
        </p>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 md:gap-12 lg:gap-[100px]">
          {PARTNERS.map(({ name, logo }) => (
            <img key={name} src={logo} alt={name} className="h-9 w-auto object-contain" />
          ))}
        </div>
        <div className="flex">
          <ButtonTeam>Become a partner</ButtonTeam>
        </div>
      </motion.div>
    </section>
  )
}
