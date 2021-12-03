import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow } from 'swiper';
import styles from './CoverSwiper.module.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { ChangeEvent, useState } from 'react';

SwiperCore.use([EffectCoverflow]);

type AlbumProps = {
  title: string;
  artist: string;
  labels: [];
  genres: [];
  styles: [];
  tracklist: [];
  release: string;
  id: number;
  sales_history: object;
  cover: string;
};

type CoverSwiperProps = {
  collection: AlbumProps[];
  changeActiveSlide: (index: number) => void;
};

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
  console.log(onchange);
}
