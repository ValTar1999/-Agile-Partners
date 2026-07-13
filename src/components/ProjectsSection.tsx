import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const LINE_DURATION = 0.5;
const TEXT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function RevealText({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ y: '100%', opacity: 0.5 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          y: { duration: 0.8, ease: TEXT_EASE, delay },
          opacity: { duration: 0.1, ease: 'easeOut', delay: delay + 0.18 },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function ProjectCard({
  image,
  imageClassName,
  title,
  titleClassName,
  description,
  descriptionClassName,
  className,
}: {
  image: string;
  imageClassName: string;
  title: string;
  titleClassName?: string;
  description?: string | null;
  descriptionClassName?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <motion.img
        className={imageClassName}
        src={image}
        alt=""
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <motion.div
        className="my-6 h-px w-full origin-left bg-current"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: LINE_DURATION, ease: 'easeOut', delay: 0.1 }}
      />
      <div className="flex flex-col items-start justify-between gap-3 text-current xl:flex-row">
        <RevealText
          className={`text-base leading-5 font-semibold tracking-[0.32px] uppercase ${titleClassName ?? ''}`}
          delay={0.1 + LINE_DURATION}
        >
          {title}
        </RevealText>
        {description ? (
          <RevealParagraph
            className={descriptionClassName ?? 'w-full lg:max-w-[372px]'}
            textClassName="text-base -tracking-[0.48px] text-current"
            delay={0.18 + LINE_DURATION}
            leading={{ initial: '36px', final: '20px' }}
          >
            {description}
          </RevealParagraph>
        ) : null}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const textX = useTransform(scrollYProgress, [0, 0.5, 1], ['-20%', '20%', '-20%']);

  return (
    <section ref={sectionRef} className="w-full py-24 md:pt-24 md:pb-60 lg:pt-40 xl:pb-48">
      <div className="mb-16 w-full overflow-hidden md:mb-32 lg:mb-72">
        <motion.div
          className="flex items-center gap-8 px-4 text-[100px] leading-[100px] font-normal -tracking-[5px] whitespace-nowrap uppercase md:gap-16 md:text-7xl md:-tracking-[4px] lg:gap-36 lg:text-[168px] lg:leading-[168px] lg:-tracking-[8.4px]"
          style={{ x: textX }}
        >
          <span className="text-current">WHAT WE DO </span>
          <span className="text-current">
            <span className="italic">BEST</span> WHAT WE DO{' '}
          </span>
          <span className="text-current">
            <span className="italic">BEST</span>
          </span>
        </motion.div>
      </div>

      <div className="flex flex-col gap-14 px-4 md:gap-20 md:px-10 lg:gap-32 xl:gap-0">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:mb-48">
          <ProjectCard
            className="lg:col-span-8 xl:col-span-8"
            image={p1}
            imageClassName="aspect-5/3 w-full object-cover"
            title={PROJECTS[0].title}
            description={PROJECTS[0].description}
            descriptionClassName="w-full text-base leading-5 -tracking-[0.48px] lg:max-w-[372px]"
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <ProjectCard
            className="lg:col-span-5 lg:col-start-8 xl:col-span-5 xl:col-start-8"
            image={p2}
            imageClassName="aspect-square w-full object-cover"
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
            imageClassName="aspect-3/4 w-full object-cover"
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
            imageClassName="aspect-5/3 w-full object-cover"
            title={PROJECTS[3].title}
            description={PROJECTS[3].description}
            descriptionClassName="w-full lg:max-w-[372px]"
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <ProjectCard
            className="lg:col-span-5 lg:col-start-8"
            image={p5}
            imageClassName="aspect-4/3 w-full object-cover"
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
            imageClassName="aspect-5/3 w-full object-cover"
            title={PROJECTS[5].title}
            description={PROJECTS[5].description}
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:mb-48">
          <ProjectCard
            className="lg:col-span-4 lg:col-start-5 xl:col-span-4 xl:col-start-5"
            image={p7}
            imageClassName="aspect-3/4 w-full object-cover"
            title={PROJECTS[6].title}
            description={PROJECTS[6].description}
          />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:mb-48">
          <ProjectCard
            className="lg:col-span-5"
            image={p8}
            imageClassName="aspect-square w-full object-cover"
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
            imageClassName="aspect-5/3 w-full object-cover"
            title={PROJECTS[8].title}
            description={PROJECTS[8].description}
          />
        </div>
      </div>
    </section>
  );
}
