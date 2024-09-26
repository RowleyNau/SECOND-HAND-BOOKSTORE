// import './Pages1.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";
// import CardProduct from '../components/cardProduct/CardProduct';
import './CustomScroll.css'
import 'swiper/css';
// import { Swiper, SwiperSlide } from "swiper/react";
import Swiper from 'react-id-swiper';
const CustomScroll = (props) => {
    const {slideContent} = props;
    const params = {
        slidesPerView: 'auto',
        // centeredSlides: true,
        spaceBetween: 10,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            1024: {
              slidesPerView: 4,
              spaceBetween: 40
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            }
          }
      }
  


    return(
    <>

            <div className="ComScroll">
            <Swiper {...params}>
                {
                    slideContent.map((content, index) => (
                        <div>{content}</div>
                    ))
                }
                
            </Swiper>
            </div>

    </>
    )
}
export default CustomScroll