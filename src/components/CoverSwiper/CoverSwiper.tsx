import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow } from 'swiper';
import styles from './CoverSwiper.module.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { CoverSwiperProps } from '../../lib/types';

SwiperCore.use([EffectCoverflow]);

export default function CoverSwiper({
  collection,
  changeActiveSlide,
}: CoverSwiperProps): JSX.Element {
  return (
    <div className={styles.coverflow__wrapper}>
      <Swiper
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 0,
          stretch: 50,
          slideShadows: false,
          depth: 200,
          modifier: 3,
        }}
        lazy={true}
        mousewheel={true}
        centerInsufficientSlides={true}
        slidesPerView={1}
        loop={false}
        touchEventsTarget={'wrapper'}
        preloadImages={true}
        onSlideChange={(slide) => changeActiveSlide(slide.activeIndex)}
      >
        {collection.map((album) => (
          <SwiperSlide key={album.id}>
            <img className={styles.cover} src={album.cover} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
