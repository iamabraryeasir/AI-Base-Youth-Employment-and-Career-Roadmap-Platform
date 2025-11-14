import Navbar from "@/components/home/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className=" flex flex-col justify-center">
      <div
        className="w-full h-screen  relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #d2eefc 0%, #fff 48.95%)",
        }}
      >
        {/* Background SVG */}
        <svg
          width="1440"
          height="1276"
          viewBox="0 0 1440 1276"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[1576px] h-[934px] absolute left-[-191px] top-28"
          preserveAspectRatio="none"
        >
          <g filter="url(#filter0_f_12_8885)">
            <circle cx="1160" cy="337" r="225" fill="#F5FBFE" />
          </g>
          <g filter="url(#filter1_f_12_8885)">
            <circle cx="34" cy="602" r="225" fill="#F5FBFE" />
          </g>
          <g filter="url(#filter2_f_12_8885)">
            <circle cx="809" cy="821" r="225" fill="#F5FBFE" />
          </g>

          <defs>
            <filter
              id="filter0_f_12_8885"
              x="705"
              y="-118"
              width="910"
              height="910"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="115"
                result="effect1_foregroundBlur_12_8885"
              />
            </filter>

            <filter
              id="filter1_f_12_8885"
              x="-421"
              y="147"
              width="910"
              height="910"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="115"
                result="effect1_foregroundBlur_12_8885"
              />
            </filter>

            <filter
              id="filter2_f_12_8885"
              x="354"
              y="366"
              width="910"
              height="910"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="115"
                result="effect1_foregroundBlur_12_8885"
              />
            </filter>
          </defs>
        </svg>

        {/* Navbar */}
        <div className="flex justify-between items-center w-[1001px] absolute left-[220px] top-[42px] overflow-hidden pl-6 pr-3 py-3 rounded-[99px] bg-white border border-white">
          <div className="flex justify-start items-center gap-[9px]">
            {/* Logo SVG */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M10 10C10 15.5228 5.52284 20 2.27581e-05 20C2.27581e-05 14.4772 4.47716 10 10 10ZM10 0C4.47716 0 0 4.47716 0 10C5.52284 10 10 5.52284 10 0ZM10 20C15.5228 20 20 15.5228 20 10C14.4771 10 10 14.4772 10 20ZM20 0C14.4772 0 10 4.47716 10 10C15.5228 10 20 5.52284 20 0Z"
                fill="#2B7CED"
              />
            </svg>

            {/* Logo Text SVG */}
            {/* … Keeping the long SVG text exactly the same … */}
          </div>

          {/* Nav Links */}

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <div className="px-4 py-2  bg-white ">
              <Link
                href="/signup"
                className="text-sm font-medium text-[#1a1a1a]"
              >
                Sign Up
              </Link>
            </div>
            <div className="px-4 py-2 text-white  rounded-[20px] bg-black border border-neutral-300">
              <Link
                href="/login"
                className="text-sm font-medium text-[#ffffff]"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="flex flex-col items-center w-[787px] absolute left-[327px] top-[206px] gap-[38px]">
          <div className="flex flex-col items-center gap-6">
            <p className="w-[787px] text-6xl text-center text-[#090a15]">
              <span className="font-medium">
                Empower Your Career Path with{" "}
              </span>
              <span className="italic">AI </span>
              <span className="font-medium">Guidance</span>
            </p>

            <p className="w-[613px] text-lg text-center text-neutral-600">
              Discover jobs that match your skills, learn new ones, and take the
              next step toward your dream career.”
            </p>
          </div>

          {/* Email Box */}
        </div>

        {/* Bottom Boxes */}
        <div className="w-[428px] h-[400px] absolute left-[82px] top-[781px] rounded-[22px] bg-white" />
        <div className="w-[428px] h-[400px] absolute left-[900px] top-[765px] rounded-[22px] bg-white" />
        <div className="w-[595px] h-[566px] absolute left-[469px] top-[739px] rounded-[22px] bg-white" />
        <div className="w-6 h-6 absolute left-[421px] top-[623px]" />
      </div>
     
    </section>
  );
}
