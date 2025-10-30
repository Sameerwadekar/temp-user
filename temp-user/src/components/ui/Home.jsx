import React from "react";
import staw from "../../assets/home-bowl.png";

const Home = () => {
  return (
    <section className="relative w-full h-auto md:h-[60vh] overflow-visible bg-[#71CA9A] py-10 md:py-0">
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full px-6 md:px-16 lg:px-24">
        {/* Text Section */}
        <div className="text-white w-full md:w-[45%] flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            100% Natural
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold">All You Want!</h2>
          <p className="text-base md:text-lg">Smooth and refreshing</p>
          <p className="text-base md:text-lg">Flavours 100% dairy free</p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-[40%] flex justify-center md:justify-start mt-8 md:mt-0">
          <img
            src={staw}
            alt="bowl-home"
            className="w-[65vw] sm:w-[55vw] md:w-[35vw] lg:w-[30vw] xl:w-[28vw] drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
