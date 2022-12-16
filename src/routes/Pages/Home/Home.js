import { Link, useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import moment from "moment";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import moment from "moment";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// import { Slider } from "@mui/material";

const allArea = ["Miền Bắc", "Miền Nam", "Miền Trung"];

const slides = [
  {
    url: "https://pbs.twimg.com/media/Fhsi8OVaMAAjiCZ?format=png&name=large",
  },
  {
    url: "https://pbs.twimg.com/media/Ff0cV0JaMAExnBF?format=jpg&name=large",
  },
  {
    url: "https://pbs.twimg.com/media/Fhsi8OVaMAAjiCZ?format=png&name=large",
  },
  {
    url: "https://pbs.twimg.com/media/Ff0cV0JaMAExnBF?format=jpg&name=large",
  },
];

const callouts = [
  {
    name: "Desk and Office",
    description: "Work from home accessories",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
  },
  {
    name: "Self-Improvement",
    description: "Journals and note-taking",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
  },
  {
    name: "Travel",
    description: "Daily commute essentials",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
  {
    name: "Travel",
    description: "Daily commute essentials",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
];

const callCards = [
  {
    title: "Khu di tích lịch sử Vàm Nhựt Tảo",
    price: "250000",
    area_slug: "thành phố hồ chí minh",
    timeStart: "2002-12-7",
    timeEnd: "2022-12-12",
    description: "Đây là nơi giao giữa sông Vàm Cỏ Đông và sông Nhựt Tảo.",
    imageTour:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "#",
  },
  {
    title: "Khu di tích lịch sử Vàm Nhựt Tảo",
    price: "250000",
    area_slug: "thành phố hồ chí minh",
    timeStart: "2002-12-7",
    timeEnd: "2022-12-12",
    description: "Đây là nơi giao giữa sông Vàm Cỏ Đông và sông Nhựt Tảo.",
    imageTour:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "#",
  },

  {
    title: "Khu di tích lịch sử Vàm Nhựt Tảo",
    price: "250000",
    area_slug: "thành phố hồ chí minh",
    timeStart: "2002-12-7",
    timeEnd: "2022-12-12",
    description: "Đây là nơi giao giữa sông Vàm Cỏ Đông và sông Nhựt Tảo.",
    imageTour:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "#",
  },
  {
    title: "Khu di tích lịch sử Vàm Nhựt Tảo",
    price: "250000",
    area_slug: "thành phố hồ chí minh",
    timeStart: "2002-12-7",
    timeEnd: "2022-12-12",
    description: "Đây là nơi giao giữa sông Vàm Cỏ Đông và sông Nhựt Tảo.",
    imageTour:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "#",
  },
  {
    title: "Khu di tích lịch sử Vàm Nhựt Tảo",
    price: "250000",
    area_slug: "thành phố hồ chí minh",
    timeStart: "2002-12-7",
    timeEnd: "2022-12-12",
    description: "Đây là nơi giao giữa sông Vàm Cỏ Đông và sông Nhựt Tảo.",
    imageTour:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "#",
  },
  {
    title: "Khu di tích lịch sử Vàm Nhựt Tảo",
    price: "250000",
    area_slug: "thành phố hồ chí minh",
    timeStart: "2002-12-7",
    timeEnd: "2022-12-12",
    description: "Đây là nơi giao giữa sông Vàm Cỏ Đông và sông Nhựt Tảo.",
    imageTour:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "#",
  },
];
const containerStyles = {
  width: "800px",
  height: "400px",
  margin: "0 auto",
  marginTop: "30px",
};

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};
function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };
  const [cartList, setCartList] = useState([]);
  const [typeSort, setTypeSort] = useState();
  const [areas, setAreas] = useState();
  useEffect(() => {
    getCartList();
  }, []);

  useEffect(() => {
    getAllArea();
  }, []);

  const getAllArea = async () => {
    axios
      .get("https://api.travels.games/api/v1/area/show/all")
      .then((res) => {
        console.log(res.data.data[0]);
        setAreas(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const getCartList = async () => {
    axios
      .get(
        "https://api.travels.games/api/v1/tour/show/all/area/thanh-pho-ha-noi"
      )
      .then((res) => {
        console.log(res.data.data[0]);
        setCartList(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const hardleOnchaneArea = (SlugArea) => {
    axios
      .get(`https://api.travels.games/api/v1/tour/show/all/area/${SlugArea}`)
      .then((res) => {
        console.log(res.data.data[0]);
        setCartList(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const [homeList, setHomeList] = useState();
  useEffect(() => {
    axios
      .get("https://api.travels.games/api/v1/tour/show/last-tour/22")
      .then((res) => {
        console.log(res.data.data[0]);
        setHomeList(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  // ten mien
  const [allAreas, setAllAreas] = useState("region");

  //     useEffect(() => {
  //       axios
  //         .get(
  //           "https://api.travels.games/api/v1/tour/show/all/area/thanh-pho-ha-noi"
  //         )
  //         .then((res) => {
  //           console.log(res.data.data[0]);
  //           setCartList(res.data.data);
  //         })
  //         .catch((err) => {
  //           console.log(err.response);
  //         });
  //     }, []);

  // };

  return (
    <div className="bg-white">
      {/* slider */}

      <div style={containerStyles}>
        <div style={sliderStyles}>
          <div>
            {/* <div onClick={goToPrevious} style={leftArrowStyles}>
              ❰
            </div>
            <div onClick={goToNext} style={rightArrowStyles}>
              ❱
            </div> */}
          </div>
          <div style={slideStylesWidthBackground}></div>
          <div style={dotsContainerStyles}>
            {slides.map((slide, slideIndex) => (
              <div
                style={dotStyle}
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
              >
                ●
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
          {homeList &&
            homeList.map((tour) => (
              <div className="mt-6 space-y-12 lg:gap-x-6 lg:space-y-0 gap-x-8 gap-y-4 ">
                {/* {callCards.map((callCard) => ( */}
                <div class="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <a onClick={() => navigate('/detail-tour', { state: { tourdata: tour } })}>
                    <img
                      class="rounded-t-lg"
                      // src={callCard.imageTour}
                      src={tour.images[0]}
                      alt="product image"
                    />
                  </a>
                  <div class="px-5 pb-5">
                    <a onClick={() => navigate('/detail-tour', { state: { tourdata: tour } })}>
                      <p class="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-400">
                        {/* {moment(homeList.time_start).format("DD-MM-yyyy")} */}
                        {moment(tour.time_start).format("DD/MM/yyyy")} -{" "}
                        {moment(tour.time_end).format("DD/MM/yyyy")}
                        {/* {tour.time_start} -{tour.time_end} */}
                        {/*  - {tour.timeEnd} */}
                      </p>
                      <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {/* {callCard.title} */}
                        {tour.title}
                      </h5>
                    </a>
                    <div class="flex items-center mt-2.5 mb-5">
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Second star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Third star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fourth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fifth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        5.0
                      </span>
                    </div>
                    <p class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {tour.area_slug}
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-3xl font-bold text-gray-900 dark:text-white">
                        {tour.price}
                        VNĐ
                      </span>
                      <a
                        href="#"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
                {/* ))} */}
              </div>
            ))}
        </div>
        <form>
          <select onChange={(e) => hardleOnchaneArea(e.target.value)}>
            {areas &&
              areas.map((area) => (
                <option value={area.slug}>{area.title}</option>
              ))}
          </select>
        </form>
        <div class="grid gap-x-8 gap-y-4 grid-rows-1 py-4">
          {cartList &&
            cartList.map((card) => (
              <div class="flex flex-row md:flex-row rounded-lg bg-white shadow-lg">
                <div>
                  <img
                    class="max-h-sm w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                    src={card.images[0]}
                    alt=""
                  />
                </div>

                <div class="p-4 flex flex-col justify-start">
                  <h5 class="text-gray-900 text-xl font-medium mb-2">
                    {card.title}
                  </h5>
                  <p class="text-gray-700 text-base mb-4">
                    {card.address_start} - {card.address_end}
                  </p>
                  <p class="text-gray-600 text-xs">Last updated 3 mins ago</p>
                  <div class="flex items-center mt-2.5 mb-5">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>First star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Second star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Third star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Fourth star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Fifth star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                      5.0
                    </span>
                  </div>
                </div>

                <div class=" content-end">
                  <p>giá chỉ từ</p>
                  <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-gray-900 dark:text-red-600">
                      {card.price} VNĐ
                    </span>
                  </div>
                  <p class="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-400">
                    {moment(card.createdAt).format("DD-MM-yyyy")}
                  </p>
                  <div class="pt-2">
                    <a
                      href="#"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
