import React from "react";
import image from "../../public/assets/images/image.png"
const OutletDetails = () => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between rounded-lg p-6"
      style={{
        backgroundColor: "#ff7043", // لون برتقالي هادئ
        margin: "30px auto",
        maxWidth: "1200px",
        gap: "20px",
      }}
    >
      {/* النص على الشمال */}
      <div className="w-full md:w-1/2 text-white px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Outlet Store discount up to 70%
        </h2>
        <p className="text-base md:text-lg">
          here is our clearance section with highest discount ever
        </p>
      </div>

      {/* الصورة على اليمين */}
      <div className="w-full md:w-1/2 px-4">
        <img
          src={image}
          alt="Outlet Sale"
          className="w-full h-auto rounded-md object-cover"
          style={{ maxHeight: "280px" }}
        />
      </div>
    </div>
  );
};

export default OutletDetails;
