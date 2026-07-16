import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion';
import ButtonTeam from '../ButtonTeam';
import RevealParagraph from '../RevealParagraph';
import imageGroup from '../../assets/image/sectionPeople/workspace.webp';
import imagePortrait from '../../assets/image/sectionPeople/team-member.webp';
import imageObject from '../../assets/image/sectionPeople/Image Container.svg';

const QUOTE_TEXT_CLASS = 'text-xl -tracking-[0.72px] text-current leading-[26px]';
const TESTIMONIAL_TEXT_CLASS =
  'text-xl leading-[26px] -tracking-[0.72px] text-current xl:text-2xl xl:leading-7';

const QUOTE_LEADING = {
  mobile: { initial: '56px', final: '26px' },
  desktop: { initial: '64px', final: '26px' },
};

const TESTIMONIAL_LEADING = {
  mobile: { initial: '56px', final: '26px' },
  desktop: { initial: '64px', final: '28px' },
};

function getQuoteLeading() {
  if (typeof window === 'undefined') return QUOTE_LEADING.mobile;
  return window.matchMedia('(min-width: 768px)').matches
    ? QUOTE_LEADING.desktop
    : QUOTE_LEADING.mobile;
}

function getTestimonialLeading() {
  if (typeof window === 'undefined') return TESTIMONIAL_LEADING.mobile;
  return window.matchMedia('(min-width: 768px)').matches
    ? TESTIMONIAL_LEADING.desktop
    : TESTIMONIAL_LEADING.mobile;
}

function useQuoteLeading() {
  const [leading, setLeading] = useState(getQuoteLeading);

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setLeading(mq.matches ? QUOTE_LEADING.desktop : QUOTE_LEADING.mobile);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return leading;
}

function useTestimonialLeading() {
  const [leading, setLeading] = useState(getTestimonialLeading);

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () =>
      setLeading(mq.matches ? TESTIMONIAL_LEADING.desktop : TESTIMONIAL_LEADING.mobile);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return leading;
}

function QuoteRevealParagraph({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const leading = useQuoteLeading();

  return (
    <RevealParagraph
      className={className}
      textClassName={QUOTE_TEXT_CLASS}
      delay={delay}
      leading={leading}
    >
      {children}
    </RevealParagraph>
  );
}

function TestimonialRevealParagraph({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const leading = useTestimonialLeading();

  return (
    <RevealParagraph
      className={className}
      textClassName={TESTIMONIAL_TEXT_CLASS}
      delay={delay}
      leading={leading}
    >
      {children}
    </RevealParagraph>
  );
}

const IMAGE_REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const IMAGE_REVEAL_DURATION = 0.9;
/** Fire when image top has crossed ~35% into the viewport. */
const SCROLL_TRIGGER_AT = 0.35;

function RevealImage({ src, alt, aspectClass }: { src: string; alt: string; aspectClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 = image top at bottom of viewport, 1 = image top at top of viewport
    offset: ['start end', 'start start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!active && progress >= SCROLL_TRIGGER_AT) setActive(true);
  });

  useLayoutEffect(() => {
    if (!active && scrollYProgress.get() >= SCROLL_TRIGGER_AT) setActive(true);
  }, [active, scrollYProgress]);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${aspectClass}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ clipPath: 'inset(0 100% 0 0)', scale: 1.2 }}
        animate={
          active
            ? { clipPath: 'inset(0 0% 0 0)', scale: 1 }
            : { clipPath: 'inset(0 100% 0 0)', scale: 1.2 }
        }
        transition={{ duration: IMAGE_REVEAL_DURATION, ease: IMAGE_REVEAL_EASE }}
      />
    </div>
  );
}

const MARQUEE_ITEM_CLASS =
  'flex shrink-0 items-center gap-6 text-[100px] leading-[100px] -tracking-[5px] whitespace-nowrap uppercase md:gap-16 md:text-[132px] md:leading-[132px] md:-tracking-[6.6px] lg:gap-36 lg:text-[168px] lg:leading-[168px] lg:-tracking-[8.4px] xl:gap-24 xl:text-[204px] xl:leading-[168px] xl:-tracking-[10.2px]';

const MARQUEE_PHRASES = 4;
const MARQUEE_LOOPS = 0.08;
/** Extra shift so the phrase sits further left in the viewport. */
const MARQUEE_LEFT_NUDGE = 280;

function MarqueePhrase() {
  return (
    <span>
      <span className="italic">PEOPLE</span> BUILDING
    </span>
  );
}

function PeopleMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const x = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const updateWidth = () => {
      setWidthRef.current = el.scrollWidth / 2;
      const w = setWidthRef.current;
      if (!w) return;
      const offset = (scrollYProgress.get() * w * MARQUEE_LOOPS) % w;
      x.set(-w + offset - MARQUEE_LEFT_NUDGE);
    };

    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scrollYProgress, x]);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const w = setWidthRef.current;
    if (!w) return;
    const offset = (progress * w * MARQUEE_LOOPS) % w;
    x.set(-w + offset - MARQUEE_LEFT_NUDGE);
  });

  const phrases = Array.from({ length: MARQUEE_PHRASES * 2 }, (_, i) => <MarqueePhrase key={i} />);

  return (
    <div ref={containerRef} className="mb-40 w-full overflow-hidden md:mb-44 lg:mb-60">
      <motion.div
        ref={trackRef}
        className={`${MARQUEE_ITEM_CLASS} w-max will-change-transform`}
        style={{ x }}
      >
        {phrases}
      </motion.div>
    </div>
  );
}

export default function PeopleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mx-auto w-full max-w-2160 overflow-x-hidden pt-24 pb-24 text-current md:pt-24 md:pb-36 lg:pt-36 lg:pb-52 xl:pt-36 xl:pb-24"
    >
      <PeopleMarquee />

      <div className="grid grid-cols-12 gap-x-8 px-4 md:px-10">
        <div className="relative col-span-8 col-start-4 md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-6 xl:col-span-4 xl:col-start-7">
          <motion.div
            className="absolute -top-12 -left-8 md:-top-20 md:-left-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
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
          </motion.div>
          <TestimonialRevealParagraph className="mb-8">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa.
          </TestimonialRevealParagraph>
          <div className="grid gap-2 uppercase">
            <div className="overflow-hidden">
              <motion.div
                className="text-base leading-5 font-semibold tracking-[0.32px] text-current"
                initial={{ y: '100%', opacity: 0.5 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  y: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 },
                  opacity: { duration: 0.1, ease: 'easeOut', delay: 0.3 },
                }}
              >
                NAME HERE
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                className="text-base leading-5 -tracking-[0.48px] text-[#999999]"
                initial={{ y: '100%', opacity: 0.5 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  y: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
                  opacity: { duration: 0.1, ease: 'easeOut', delay: 0.38 },
                }}
              >
                CEO OR TESTIMONIAL
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-visible px-4 py-24 md:px-10 xl:pt-48 xl:pb-0">
        <div className="flex flex-col gap-10 md:grid md:auto-rows-auto md:grid-cols-12 md:items-start md:gap-x-8 md:gap-y-0">
          <div className="w-full md:col-span-8 md:col-start-3 md:row-start-1 lg:col-span-8 lg:col-start-3 xl:col-span-8 xl:col-start-3">
            <RevealImage src={imageObject} alt="Team meeting" aspectClass="aspect-5/3" />
          </div>
          <div className="relative w-[68%] self-start md:-top-10 md:col-span-3 md:col-start-1 md:row-start-2 md:w-auto md:self-start lg:top-0 lg:col-span-3 lg:col-start-2 lg:row-start-2 lg:w-full xl:-top-20">
            <RevealImage src={imagePortrait} alt="Team member" aspectClass="aspect-3/4" />
          </div>
          <div className="relative w-11/12 self-end md:-top-32 md:col-span-5 md:col-start-6 md:row-start-3 md:w-auto md:self-start lg:top-0 lg:col-span-5 lg:col-start-7 lg:row-start-3 lg:w-full xl:-top-48">
            <RevealImage src={imageGroup} alt="Workspace" aspectClass="aspect-5/3" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-10 px-4 md:grid-cols-12 md:gap-x-8 md:gap-y-10 md:px-10 xl:gap-y-0">
        <QuoteRevealParagraph className="md:col-span-8 md:col-start-2 md:row-start-1 xl:col-span-3 xl:col-start-3">
          Agile Partners was born from the encounter of passionate individuals with complementary
          profiles. Product management, creative direction and technological lead: they form a
          complete framework that passes its craft and vision to the different poles of the company.
        </QuoteRevealParagraph>
        <motion.div
          className="flex items-start justify-start md:col-span-6 md:col-start-2 md:row-start-2 xl:col-span-4 xl:col-start-7 xl:row-start-1 xl:items-end xl:justify-start"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        >
          <ButtonTeam>Become part of our team</ButtonTeam>
        </motion.div>
      </div>
    </section>
  );
}
