import React, { useState } from "react";
import { FaPhoneAlt, FaFacebookF, FaPinterestP, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { BsMessenger } from "react-icons/bs";

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-10 px-4 lg:px-16">
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[1, 2].map((branch) => (
          <div key={branch} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-black mb-1">DownTown Cairo {branch > 1 ? '2' : ''}</h2>
            <p className="text-gray-700 text-sm">2 Sherif Basha, As Sahah, Abdeen, Cairo Governorate 4280141</p>
            <p className="text-sm mt-1"><span className="font-semibold text-black">Phone:</span> <span className="text-red-600">{branch > 1 ? '+201069904177' : '+20023924362'}</span></p>
            <p className="text-sm"><span className="font-semibold text-black">Email:</span> <span className="text-red-600">info@camerashop.com.eg</span></p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
          <h2 className="text-lg font-bold text-black mb-4">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First name" className="border border-gray-300 rounded px-4 py-2 text-sm" />
              <input type="text" placeholder="Last name" className="border border-gray-300 rounded px-4 py-2 text-sm" />
            </div>
            <input type="email" placeholder="Email" className="border border-gray-300 rounded px-4 py-2 w-full text-sm" />
            <textarea placeholder="Your Message" rows="5" className="border border-gray-300 rounded px-4 py-2 w-full text-sm"></textarea>
            <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 text-sm">Send Message</button>
            {success && <p className="text-green-600 text-sm pt-2">Message sent successfully!</p>}
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md p-3 w-full">
          <h2 className="text-sm font-bold text-gray-800 mb-2">Need a Help?</h2>
          <div className="space-y-3 text-sm font-semibold text-gray-800">
            {[
              {icon: <FaPhoneAlt className="text-[14px] font-bold" />, bg: "bg-blue-100", color: "text-blue-700", text: "+20023924362"},
              {icon: <BsMessenger className="text-[14px] font-bold" />, bg: "bg-blue-200", color: "text-blue-600", text: "Messenger"},
              {icon: <MdEmail className="text-[14px] font-bold" />, bg: "bg-orange-100", color: "text-orange-500", text: "info@camerashop.com.eg"}
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`${item.bg} ${item.color} p-2 rounded-full`}>{item.icon}</div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h2 className="text-sm font-bold text-gray-800 mb-2">Subscribe us</h2>
            <div className="flex gap-2 flex-wrap">
              {[
                {icon: <FaFacebookF className="text-[14px] font-bold" />, bg: "bg-blue-800"},
                {icon: <FaXTwitter className="text-[14px] font-bold" />, bg: "bg-black"},
                {icon: <FaPinterestP className="text-[14px] font-bold" />, bg: "bg-red-600"},
                {icon: <FaLinkedinIn className="text-[14px] font-bold" />, bg: "bg-blue-700"},
                {icon: <FaTelegramPlane className="text-[14px] font-bold" />, bg: "bg-sky-500"}
              ].map((item, i) => (
                <a key={i} href="#" className={`${item.bg} text-white p-2 rounded-full hover:scale-110 transition`}>{item.icon}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
