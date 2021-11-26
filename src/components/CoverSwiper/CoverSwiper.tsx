import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow } from 'swiper';
import styles from './CoverSwiper.module.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

SwiperCore.use([EffectCoverflow]);

export default function CoverSwiper(): JSX.Element {
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
        loop={true}
        touchEventsTarget={'wrapper'}
        preloadImages={true}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <img
            className={styles.cover}
            src="https://img.discogs.com/EmDGo32O6ztSqu4FzxorvQMd6m8=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-10664595-1501967339-8298.jpeg.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className={styles.cover}
            src="https://img.discogs.com/ScWMZVVNTc3z4qz90QRptFgcoHE=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-9955667-1489180771-5548.jpeg.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className={styles.cover}
            src="https://img.discogs.com/RG-vvORBfcg8ukyIAMEvPIulMV4=/fit-in/600x595/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-10847600-1505290417-5886.jpeg.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className={styles.cover}
            src="https://img.discogs.com/lhXjrxNOXgCSOtQNmL1JSTPEASc=/fit-in/600x561/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-5399035-1392396119-1236.jpeg.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className={styles.cover}
            src="https://img.discogs.com/Lr2e69R15XdXLQs_YZVIH9M-oRc=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-9042866-1473776350-3407.jpeg.jpg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
