// import React from "react";
// import homeBg from "../../assets/Home-ice-cream--bg.png";
// import bowl from "../../assets/bowl-ice-cream.png";

// const Home = () => {
//   return (
//     <>
//       <div className="w-full h-[70vh] border-amber-600 overflow-hidden object-contain relative">
//         <img
//           src={homeBg}
//           alt="home-bg"
//           className="h-full w-full object-cover"
//         />
//         <img
//           src={bowl}
//           alt="bowl-home"
//           className="absolute top-1/2 right-0 -translate-y-1/2 z-10 w-[35vw]"
//         />
//         <div className="absolute z-10 top-1 left-1 w-1/2 flex justify-center items-center flex-col">
//             <h1>100% Natural</h1>
//             <h1>All You Want!</h1>
//             <p>Smooth and refreshing</p>
//             <p>flavours 100% dairy free</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

import React from "react";
import homeBg from "../../assets/Home-ice-cream--bg.png";
import bowl from "../../assets/bowl-ice-cream.png";

const Home = () => {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Background */}
      <img
        src={homeBg}
        alt="home background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full gap-8 md:gap-16 px-8">
        {/* Text Section */}
        <div className="text-white md:w-1/2 flex flex-col justify-center items-center text-left space-y-2 h-1/2 border border-amber-700">
          <h1 className="text-4xl font-bold">100% Natural</h1>
          <h1 className="text-3xl font-semibold">All You Want!</h1>
          <p className="text-lg">Smooth and refreshing</p>
          <p className="text-lg">Flavours 100% dairy free</p>
        </div>

        {/* Image Section */}
        <div className="md:w-auto flex justify-center w-full ">
          <img
            src={bowl}
            alt="bowl-home"
            className="w-[60vw] md:w-[40vw] lg:w-[35vw]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
