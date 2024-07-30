import React, { Suspense } from 'react';

const Swiper = React.lazy(() => import('swiper/react').then(module => ({ default: module.Swiper })));
const SwiperSlide = React.lazy(() => import('swiper/react').then(module => ({ default: module.SwiperSlide })));

interface LazySwiperProps {
  children: React.ReactNode;
  [key: string]: any;
}

const LazySwiper: React.FC<LazySwiperProps> = ({ children, ...props }) => (
  <Suspense fallback={<div>Loading Swiper...</div>}>
    <Swiper {...props}>{children}</Swiper>
  </Suspense>
);

export { LazySwiper, SwiperSlide };