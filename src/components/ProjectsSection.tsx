import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion';
import RevealParagraph from './RevealParagraph';
import p1 from '../assets/image/project/p-1 (1).png';
import p2 from '../assets/image/project/p-2 (1).png';
import p3 from '../assets/image/project/p-3 (1).png';
import p4 from '../assets/image/project/p-4 (1).png';
import p5 from '../assets/image/project/p-5 (1).png';
import p6 from '../assets/image/project/p-6 (1).png';
import p7 from '../assets/image/project/p-7 (1).png';
import p8 from '../assets/image/project/p-8 (1).png';
import p9 from '../assets/image/project/p-9 (1).png';
import Simbols from '../assets/image/project/Simbolds.svg';

const PROJECTS = [
  {
    image: p1,
    title: 'WEBSITES',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  {
    image: p2,
    title: 'INVOICING PLATFORM',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  {
    image: p3,
    title: 'PAYMENT PROCESSING PLATFORM',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  {
    image: p4,
    title: 'Reconciliation flows',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  {
    image: p5,
    title: 'Backend office operations',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  { image: p6, title: 'Card payment operations', description: null },
  { image: p7, title: 'AI-powered insights', description: null },
  {
    image: p8,
    title: 'Enrollment and onboarding portal',
    description:
      'From sleek marketing sites to complex platforms, we create fast, responsive, and scalable digital experiences that look great and drive results.',
  },
  {
    image: p9,
    title: 'Accounts Payable and Accounts Receivable payment operations',
    description: null,
  },
];

const TEXT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const IMAGE_REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MEDIA_REVEAL_DURATION = 0.9;
const TEXT_REVEAL_DURATION = 0.5;
/** Relative delay after scroll-trigger fires (image/line first, then text). */
const TEXT_AFTER_MEDIA_DELAY = 0.35;
/** Fire when card top has crossed ~35% into the viewport. */
const SCROLL_TRIGGER_AT = 0.35;

function RevealImage({
  src,
  alt,
  aspectClass,
  active,
}: {
  src: string;
  alt: string;
  aspectClass: string;
  active: boolean;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${aspectClass}`}>
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
        transition={{ duration: MEDIA_REVEAL_DURATION, ease: IMAGE_REVEAL_EASE }}
      />
    </div>
  );
}

function RevealText({
  children,
  className,
  delay = 0,
  active,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  active: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ y: '100%', opacity: 0.5 }}
        animate={active ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0.5 }}
        transition={{
          y: { duration: TEXT_REVEAL_DURATION, ease: TEXT_EASE, delay },
          opacity: { duration: 0.1, ease: 'easeOut', delay: delay + 0.1 },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function ProjectCard({
  image,
  aspectClass,
  title,
  titleClassName,
  description,
  descriptionClassName,
  className,
}: {
  image: string;
  aspectClass: string;
  title: string;
  titleClassName?: string;
  description?: string | null;
  descriptionClassName?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 = card top at bottom of viewport, 1 = card top at top of viewport
    offset: ['start end', 'start start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!active && progress >= SCROLL_TRIGGER_AT) setActive(true);
  });

  useLayoutEffect(() => {
    if (!active && scrollYProgress.get() >= SCROLL_TRIGGER_AT) setActive(true);
  }, [active, scrollYProgress]);

  return (
    <div ref={ref} className={className}>
      <RevealImage src={image} alt="" aspectClass={aspectClass} active={active} />
      <motion.div
        className="my-6 h-px w-full origin-left bg-current"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{
          duration: MEDIA_REVEAL_DURATION,
          ease: IMAGE_REVEAL_EASE,
        }}
      />
      <div className="flex flex-col items-start justify-between gap-3 text-current xl:flex-row">
        <RevealText
          active={active}
          className={`text-base leading-5 font-semibold tracking-[0.32px] uppercase ${titleClassName ?? ''}`}
          delay={TEXT_AFTER_MEDIA_DELAY}
        >
          {title}
        </RevealText>
        {description ? (
          <RevealParagraph
            active={active}
            className={descriptionClassName ?? 'w-full lg:max-w-[372px]'}
            textClassName="text-base -tracking-[0.48px] text-current"
            delay={TEXT_AFTER_MEDIA_DELAY + 0.06}
            duration={TEXT_REVEAL_DURATION}
            leading={{ initial: '36px', final: '20px' }}
          >
            {description}
          </RevealParagraph>
        ) : null}
      </div>
    </div>
  );
}

const MARQUEE_ITEM_CLASS =
  'flex shrink-0 items-center gap-8 text-[100px] leading-[100px] font-normal -tracking-[5px] whitespace-nowrap uppercase md:gap-16 md:text-7xl md:-tracking-[4px] lg:gap-36 lg:text-[168px] lg:leading-[168px] xl:gap-40 lg:-tracking-[8.4px] xl:text-[204px] xl:leading-[168px] xl:-tracking-[10.2px]';

const MARQUEE_PHRASES = 4;
const MARQUEE_LOOPS = 0.08;
/** Extra shift so the phrase sits further left in the viewport. */
const MARQUEE_LEFT_NUDGE = 280;

function MarqueePhrase() {
  return (
    <span>
      <span className="text-current">WHAT WE DO</span>
      <span className="text-current italic">BEST</span>
    </span>
  );
}

function ProjectsMarquee() {
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
    <div ref={containerRef} className="mb-16 w-full overflow-hidden md:mb-32 lg:mb-72">
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

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="w-full py-24 md:pt-24 md:pb-60 lg:pt-40 xl:pb-48">
      <ProjectsMarquee />

      <div className="flex flex-col gap-14 px-4 md:gap-20 md:px-10 lg:gap-32 xl:gap-0">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:mb-48">
          <ProjectCard
            className="lg:col-span-8 xl:col-span-8"
            image={p1}
            aspectClass="aspect-5/3"
            title={PROJECTS[0].title}
            description={PROJECTS[0].description}
            descriptionClassName="w-full text-base leading-5 -tracking-[0.48px] lg:max-w-[372px]"
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <ProjectCard
            className="lg:col-span-5 lg:col-start-8 xl:col-span-5 xl:col-start-8"
            image={p2}
            aspectClass="aspect-square"
            title={PROJECTS[2].title}
            titleClassName="w-full lg:max-w-60"
            description={PROJECTS[2].description}
            descriptionClassName="w-full lg:max-w-[372px]"
          />
        </div>

        <div className="flex justify-center py-2 lg:hidden">
          <img className="h-8 w-fit object-contain" src={Simbols} alt="" />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:-mt-48 xl:mb-48">
          <ProjectCard
            className="lg:col-span-4 lg:col-start-2"
            image={p3}
            aspectClass="aspect-3/4"
            title={PROJECTS[1].title}
            titleClassName="w-full lg:max-w-[108px]"
            description={PROJECTS[1].description}
            descriptionClassName="w-full lg:max-w-[372px]"
          />
          <img
            className="hidden h-8 w-fit object-contain lg:col-span-3 lg:col-start-9 lg:my-auto lg:block xl:col-span-3 xl:col-start-9"
            src={Simbols}
            alt=""
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <ProjectCard
            className="lg:col-span-6"
            image={p4}
            aspectClass="aspect-5/3"
            title={PROJECTS[3].title}
            description={PROJECTS[3].description}
            descriptionClassName="w-full lg:max-w-[372px]"
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <ProjectCard
            className="lg:col-span-5 lg:col-start-8"
            image={p5}
            aspectClass="aspect-4/3"
            title={PROJECTS[4].title}
            titleClassName="w-full lg:max-w-60"
            description={PROJECTS[4].description}
            descriptionClassName="w-full lg:max-w-[372px]"
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:mb-24">
          <ProjectCard
            className="lg:col-span-3 lg:col-start-2"
            image={p6}
            aspectClass="aspect-5/3"
            title={PROJECTS[5].title}
            description={PROJECTS[5].description}
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:mb-48">
          <ProjectCard
            className="lg:col-span-4 lg:col-start-5 xl:col-span-4 xl:col-start-5"
            image={p7}
            aspectClass="aspect-3/4"
            title={PROJECTS[6].title}
            description={PROJECTS[6].description}
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:mb-48">
          <ProjectCard
            className="lg:col-span-5"
            image={p8}
            aspectClass="aspect-square"
            title={PROJECTS[7].title}
            titleClassName="w-full lg:max-w-60"
            description={PROJECTS[7].description}
            descriptionClassName="w-full lg:max-w-[372px]"
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <ProjectCard
            className="lg:col-span-5 lg:col-start-7"
            image={p9}
            aspectClass="aspect-5/3"
            title={PROJECTS[8].title}
            description={PROJECTS[8].description}
          />
        </div>
      </div>
    </section>
  );
}
