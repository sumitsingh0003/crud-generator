import React from "react";
import MainBanner from "../img/banner.svg";
import APIBanner from "../img/Api_Banner.png";
import {APIContent, InnovationData} from "../Utils"

const Home = () => {
  return (
    <>
      <section
        className="mainBanner"
        style={{ backgroundImage: `url(${MainBanner})` }}
      >
        <h2>Welcome to the Crud Generator API Hub</h2>
        <h3>Discover and connect to thousands of APIs</h3>
        <p>If you want to create a simple API for testing purposes, simply go to Login page and create prefix or table name now i'l provide your own API. </p>
      </section>

      <section className="apiCont">
      <div className="container">
        {APIContent.map((val, i)=>{
          return (
            <React.Fragment key={i}>
            <h3>{val.title}</h3>
            <p>{val.dataContent}</p>
            </React.Fragment>
          )
        })}
      </div>
      </section>

      <div className="apiBannerImg">
        <img src={APIBanner} alt="API Banner" />
      </div>
      
      <section className="apiInnov">
        <div className="container">
          <div className="hdng">
            <h2>Integrated API innovation</h2>
            <p> Apidog seamlessly integrates every stage of the API development process, achieving one single truth for all.</p>
          </div>
          <div className="row">
          {InnovationData.map((val, id)=>{
            return (
              <div className="col-xl-4 col-lg-4 col-md-4" key={id}>
              <div className="innovSec">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none"><rect width="56" height="56" fill="url(#protocol_svg__a)" rx="12"></rect><rect width="55" height="55" x="0.5" y="0.5" stroke="url(#protocol_svg__b)" strokeOpacity="0.4" rx="11.5"></rect><circle cx="28" cy="23" r="11" stroke="#fff" strokeWidth="2"></circle><circle cx="33" cy="33" r="11" stroke="#fff" strokeWidth="2"></circle><circle cx="23" cy="33" r="11" stroke="#fff" strokeWidth="2"></circle><circle cx="28" cy="23" r="3" fill="#6F6EFF" stroke="#fff" strokeWidth="2"></circle><circle cx="22" cy="33" r="3" fill="#5D71FF" stroke="#fff" strokeWidth="2"></circle><circle cx="34" cy="33" r="3" fill="#5B71FF" stroke="#fff" strokeWidth="2"></circle><defs><linearGradient id="protocol_svg__a" x1="28" x2="28" y1="0" y2="56" gradientUnits="userSpaceOnUse"><stop stopColor="#96F"></stop><stop offset="1" stopColor="#37F"></stop></linearGradient><linearGradient id="protocol_svg__b" x1="28" x2="27.953" y1="56" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" stopOpacity="0.3"></stop><stop offset="1" stopColor="#fff" stopOpacity="0.6"></stop></linearGradient></defs></svg>
                <h4>{val.title}</h4>
                <p>{val.content}</p>
              </div>
            </div>
            )
          })}
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
