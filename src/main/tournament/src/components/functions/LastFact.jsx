import React, { useCallback, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/css/autoplay";
import "./swiper-bundle.css";

SwiperCore.use([Navigation, Autoplay]);

async function getFact() {
  const token = sessionStorage.getItem("token");
  const req = await fetch("https://alihan-myproject.azurewebsites.net/api/v1/app/tablo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const res = await req.json();
  return res;
}

export default function LastFact() {
  const [fact, setFacts] = useState("");

  const randmFact = useCallback(async () => {
    const res = await getFact();
    setFacts(res);
  }, []);

  useEffect(() => {
    randmFact();
  }, [randmFact]);

  // console.log(fact);
  if (fact) {
    return (
      <div className="slider">
        <Swiper slidesPerView={2} spaceBetween={20} navigation autoplay={true}>
          {fact.map((elem, index) => {
            return (
              <SwiperSlide key={index} className="slide">
                <div className="slideContent">
                  <div className="factUserName">
                    Name: {elem.name} {elem.surname}
                  </div>
                  <div className="fact">Fact: {elem.fact}</div>
                  <div className="done">Done: {elem.done}</div>
                  <div className="factAuthorName">
                    (c) {elem.authorName} {elem.authorSurname}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      // <div className="factsOfTheDay">
      //   {fact.map(() => {
      //     return (
      //       <div className="">
      //         <div className="factTitle">
      //           RANDOM FACT ABOUT {fact.name} {fact.surname}
      //         </div>
      //         <div className="factBody">
      //           {"1)"} {fact.fact}
      //           {"2)"} {fact.done}
      //         </div>
      //         <div className="author">
      //           {fact.authorName} {fact.authorSurname}
      //         </div>
      //       </div>
      //     );
      //   })}
      // </div>
    );
  }
  return <ReactLoading color={"orange"} className="center" />;
}
