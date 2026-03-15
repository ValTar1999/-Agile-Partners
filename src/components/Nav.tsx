import logo from '../assets/image/header/LOGO.svg'

const navLinks = ['ABOUT', 'TEAM', 'WORK']

export default function Nav() {
  return (
    <nav className="w-full flex justify-center">
      <div className="w-full container flex items-center justify-between px-4 py-6 md:py-10">
      <a href="/" className="flex items-center no-underline">
        <img src={logo} alt="Agile Partners" className="h-8 md:h-11 w-auto" />
      </a>
      <ul className="flex list-none gap-2 sm:gap-3">
        {navLinks.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="group relative cursor-pointer uppercase text-sm font-semibold leading-5 px-3 py-0.5 border border-black rounded-full overflow-hidden inline-flex items-center justify-center"
            >
              <span
                className="absolute left-0 top-0 h-full w-0 rounded-full bg-black transition-[width] duration-300 ease-out group-hover:w-full"
                aria-hidden
              />
              <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
                {link}
              </span>
            </a>
          </li>
        ))}
      </ul>
      </div>
    </nav>
  )
}
