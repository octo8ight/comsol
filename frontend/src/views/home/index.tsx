// Next, React
import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';

// import './styles.css';
import { EffectCards, Autoplay } from 'swiper/modules';

import img1 from '../../assets/intro/1(1).jpg';
import img2 from '../../assets/intro/1 (1).png';
import img3 from '../../assets/intro/1 (1).webp';
import img4 from '../../assets/intro/1 (2).jpg';
import img5 from '../../assets/intro/1 (2).png';
import img6 from '../../assets/intro/1 (2).webp';
import img7 from '../../assets/intro/1 (3).jpg';
import img8 from '../../assets/intro/1 (3).webp';
import img9 from '../../assets/intro/1 (4).jpg';
import { Card } from 'components/Card';

const cardData = [
  {name: "Module1", desc: "this is KOENIG module", imgPath: "/public/data/uploads/17117468023291 (1).jpg", _id: "66072ef2a0f9ce56a50fd580", price: 100},
  {name: "Module2", desc: "this is Sap module", imgPath: "/public/data/uploads/17117468351761 (1).png", _id: "66072f13a0f9ce56a50fd585", price: 200},
  {name: "Module3", desc: "this is ICAI module", imgPath: "/public/data/uploads/17117468535131 (1).webp", _id: "66072f25a0f9ce56a50fd58a", price: 35},
  {name: "Module4", desc: "this is python module", imgPath: "/public/data/uploads/17117468752091 (2).jpg", _id: "66072f3ba0f9ce56a50fd58f", price: 56},
  {name: "Module5", desc: "this is KOENIG module", imgPath: "/public/data/uploads/17117468948251 (2).png", _id: "66072f4ea0f9ce56a50fd594", price: 300},
  {name: "Module6", desc: "this is Sap module", imgPath: "/public/data/uploads/17117469140881 (2).webp", _id: "66072f62a0f9ce56a50fd599", price: 90},
  {name: "Module7", desc: "this is ICAI module", imgPath: "/public/data/uploads/17117469336631 (3).jpg", _id: "66072f75a0f9ce56a50fd59e", price: 900},
  {name: "Module8", desc: "this is python module", imgPath: "/public/data/uploads/17117469517261 (3).webp", _id: "66072f87a0f9ce56a50fd5a3", price: 899},
]

export const HomeView: FC = ({ }) => {

  return (
    <div className='overflow-x-hidden'>
      <div className="block px-10">
        <div className='block sm:flex my-10'>
          <div className='w-2/5 block my-auto px-10'>
            <div className="text-7xl my-3 grays">Commune</div>
            <div className="text-7xl my-3 text-center purples">Module</div>
            <div className="text-7xl my-3 text-end mint">Market</div>
          </div>
          <div className='w-3/5 p-4'>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              className="mySwiper"
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
            >
              <SwiperSlide>
                <img className='w-full h-full' src={img1.src} alt="img1" />
              </SwiperSlide>
              <SwiperSlide>
                <img className='w-full h-full' src={img2.src} alt="img1" />
              </SwiperSlide>
              <SwiperSlide>
                <img className='w-full h-full' src={img3.src} alt="img1" />
              </SwiperSlide>
              <SwiperSlide>
                <img className='w-full h-full' src={img4.src} alt="img1" />
              </SwiperSlide>
              <SwiperSlide>
                <img className='w-full h-full' src={img5.src} alt="img1" />            
              </SwiperSlide>
              <SwiperSlide>
                <img className='w-full h-full' src={img6.src} alt="img1" />            
              </SwiperSlide>
              <SwiperSlide>
                <img className='w-full h-full' src={img7.src} alt="img1" />            
              </SwiperSlide>
              <SwiperSlide>
                <img className='w-full h-full' src={img8.src} alt="img1" />            
              </SwiperSlide>
              <SwiperSlide>
                <img className='w-full h-full' src={img9.src} alt="img1" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className='text-center my-10'>
          <div className="wrapper">
            <div className="bg"> Module </div>
            <div className="fg"> Module </div>
          </div>
          <div className="block">
            <div className="grid-cols-1 sm:grid md:grid-cols-2 lg:grid-cols-4 px-8">
              {
                cardData.map((item, index) => <Card card={item} key={"card_"+index} />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
