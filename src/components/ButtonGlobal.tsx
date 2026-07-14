export default function ButtonGlobal() {
  return (
    <a
      href="#hiring"
      className="inline-flex cursor-pointer items-center gap-2.5 rounded-full px-5 py-2.5 text-xl leading-[26px] -tracking-[0.7px] transition-transform duration-200 select-none"
      style={{
        backgroundColor: '#ffffff',
        color: '#000000',
      }}
    >
      <span className="h-3 w-3 shrink-0 rounded-full bg-black" />
      We're Hiring
    </a>
  );
}
