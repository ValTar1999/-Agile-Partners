import logo from '../assets/image/LOGO-dark.svg'

const navLinks = ['ABOUT', 'TEAM', 'WORK']
const socialLinks = [
  { name: 'Instagram', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Facebook', href: '#' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <a href="/">
            <img src={logo} alt="Agile Partners" className="h-11 w-auto"/>
          </a>
          <ul className="flex list-none gap-2">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="group relative cursor-pointer uppercase text-sm font-semibold leading-5 px-3 py-0.5 border border-white/60 rounded-full overflow-hidden inline-flex items-center justify-center"
                >
                  <span
                    className="absolute left-0 top-0 h-full w-0 rounded-full bg-white transition-[width] duration-300 ease-out group-hover:w-full"
                    aria-hidden
                  />
                  <span className="relative z-10 text-white transition-colors duration-300 group-hover:text-black">
                    {link}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-12 md:py-24 lg:py-64">
          <h2 className="text-3xl sm:text-5xl md:text-[68px] md:leading-[80px] -tracking-[2.72px] mb-7">
            Get in touch
          </h2>
          <a
            href="mailto:contact@agilepartners.eu"
            className="group/link relative inline-flex items-center gap-2 text-[#0AE58A] text-lg md:text-2xl leading-[30px] -tracking-[0.72px]"
          >
            <span
              className="absolute bottom-0 left-0 h-0.5 bg-[#0AE58A] w-0 transition-[width] duration-300 ease-out group-hover/link:w-full"
              aria-hidden
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5L17.5 10L10 17.5" stroke="#0AE58A"/>
              <path d="M17.5 10H1.25" stroke="#0AE58A"/>
            </svg>
            <span className="relative z-10">contact@agilepartners.eu</span>
          </a>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 md:gap-20">
            <address className="text-base md:text-xl lg:text-2xl leading-[30px] -tracking-[0.72px] text-white not-italic">
              Stefan cel Mare Str. 135<br />
              Chisinau, Moldova
            </address>
            <a href="tel:+37360869382" className="text-white text-base md:text-xl lg:text-2xl leading-[30px] -tracking-[0.72px] hover:text-[#0AE58A] transition-colors">
              (+373) 608 69 382
            </a>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-14">
            {socialLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="group/social relative inline-block text-white/90 text-base md:text-xl lg:text-2xl leading-[30px] -tracking-[0.72px] hover:text-[#0AE58A] transition-colors"
              >
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-[#0AE58A] w-0 transition-[width] duration-300 ease-out group-hover/social:w-full"
                  aria-hidden
                />
                <span className="relative z-10">{name}</span>
              </a>
            ))}
          </div>
        </div>

        <p className="text-sm md:text-base leading-5 -tracking-[0.48px] text-[#999999] mt-12 md:mt-24 lg:mt-36">
          ©Agile Partners 2026. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
