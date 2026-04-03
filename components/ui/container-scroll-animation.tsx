"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    checkMobile();
    const mq = window.matchMedia("(max-width: 767px)");
    mq.addEventListener("change", checkMobile);
    return () => mq.removeEventListener("change", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.92, 1] : [1.02, 1]);
  const rotateFrom = isMobile ? 7 : 14;
  const translateEnd = isMobile ? -32 : -56;

  const rotate = useTransform(scrollYProgress, [0, 1], [rotateFrom, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, translateEnd]);

  return (
    <div
      ref={containerRef}
      className="relative w-full px-3 pb-2 pt-0 sm:px-4 md:px-8 md:pb-0"
    >
      <div
        className="relative w-full pt-0 pb-0"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ y: translate }}
      className="mx-auto max-w-5xl px-1 pt-0 text-center sm:px-2"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformStyle: "preserve-3d",
        transformOrigin: "center bottom",
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto -mt-6 h-[min(20rem,52vh)] w-full max-w-5xl rounded-[20px] border-[2px] border-zinc-600/90 bg-zinc-800 p-1 sm:-mt-8 sm:h-[22rem] sm:rounded-[24px] sm:border-[3px] sm:p-1.5 md:-mt-11 md:h-[30rem] md:p-5 lg:h-[34rem]"
    >
      <div className="h-full w-full overflow-hidden rounded-[14px] bg-gray-100 p-1 dark:bg-zinc-900 sm:rounded-2xl md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
