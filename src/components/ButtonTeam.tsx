type ButtonTeamProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ArrowIcon = () => (
  <svg
    width="15"
    height="14"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path d="M7 0.530334L13 6.53033L7 12.5303" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13 6.53033H0" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function ButtonTeam({ children, className = '', ...props }: ButtonTeamProps) {
  return (
    <button
      type="button"
      className={`
        group relative inline-flex items-center justify-start overflow-hidden cursor-pointer
        pl-7 pr-4 py-5 rounded-full
        bg-[#1C1C1C] text-white
        duration-400 ease-out
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3 whitespace-nowrap">
        {children}
        <span className="flex overflow-hidden w-0 group-hover:w-[15px] transition-all duration-400 ease-out shrink-0">
          <span className="opacity-0 shrink-0">
            <ArrowIcon />
          </span>
        </span>
      </span>

      <span
        className="absolute inset-0 z-10 bg-white rounded-full origin-left scale-x-0 
          group-hover:scale-x-100 transition-transform duration-400 ease-out"
        aria-hidden
      />

      <span
        className="absolute inset-0 z-20 flex items-center justify-start rounded-full pl-7 pr-7
          [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0)] 
          transition-[clip-path] duration-400 ease-out"
        aria-hidden
      >
        <span className="flex items-center gap-3 text-black whitespace-nowrap">
          {children}
          <ArrowIcon />
        </span>
      </span>
    </button>
  );
}
