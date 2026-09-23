
import React from "react";
import { ArrowRight, CheckCircle2, Sparkles, Users } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
  return (
    <section className="relative mx-auto mt-3 w-[94%] max-w-[1500px] overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 shadow-2xl sm:w-[92%] lg:mt-5 lg:w-[90%]">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96" />

      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl sm:h-[450px] sm:w-[450px]" />

      <div className="pointer-events-none absolute right-[35%] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

     
      <div className="relative z-10 px-5 py-10 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-20">

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-14 xl:gap-20">

          
          <div className="w-full text-center text-white lg:w-[52%] lg:text-left">

            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-indigo-50 shadow-sm backdrop-blur-md sm:px-5 sm:text-sm">
                <Sparkles
                  size={16}
                  className="text-yellow-300"
                />
                Learn. Build. Grow.
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-3xl font-black leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:mt-7 lg:text-5xl xl:text-6xl">
              Upgrade Your Skills
              <span className="block mt-2 text-yellow-300">
                with Industry-Ready Courses
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base sm:leading-8 md:text-lg lg:mx-0 lg:mt-7">
              Learn from experienced mentors, work on real-world
              projects, and get career-focused guidance designed
              to make you job-ready.
            </p>

            {/* ================= TRUSTED USERS ================= */}
            <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">

              {/* Profile Image */}
              <div className="shrink-0 rounded-full bg-white/10 p-1.5 backdrop-blur-sm">
                <img
                  className="h-14 w-14 rounded-full border-2 border-white/80 object-cover shadow-lg sm:h-16 sm:w-16"
                  src={assets.group_profiles}
                  alt="Learners"
                />
              </div>

              {/* Text */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-white sm:justify-start">
                  <Users size={15} />
                  Trusted by 500+ learners
                </div>

                <p className="mt-1 max-w-xs text-xs leading-5 text-indigo-100 sm:text-sm">
                  Learning daily with expert mentors and
                  career-focused courses.
                </p>
              </div>
            </div>

            {/* ================= FEATURES ================= */}
            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-indigo-100 sm:text-sm lg:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2
                  size={15}
                  className="text-green-300"
                />
                Real-world Projects
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2
                  size={15}
                  className="text-green-300"
                />
                Expert Mentors
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2
                  size={15}
                  className="text-green-300"
                />
                Career Focused
              </span>
            </div>

            {/* ================= BUTTONS ================= */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">

              {/* Explore Courses */}
              <a onClick={()=>navigate("/course")} 
                href="#course"
                className="group cursor-pointer inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-indigo-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:px-7"
              >
                Explore Courses

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              {/* Become Mentor */}
              <button onClick={()=>navigate("/contact")}
                type="button"
                className="inline-flex cursor-pointer min-h-[50px] items-center justify-center rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-lg sm:px-7"
              >
                Become A Mentor
              </button>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative flex w-full items-center justify-center lg:w-[48%]">

            {/* Image Glow */}
            <div className="absolute inset-0 m-auto h-56 w-56 rounded-full bg-white/15 blur-3xl sm:h-72 sm:w-72 lg:h-80 lg:w-80" />

            {/* Image Container */}
            <div className="relative w-full max-w-[520px]">

              <div className="absolute -inset-1 rounded-3xl bg-white/10 blur-sm" />

              <img
                className="relative h-auto w-full rounded-2xl border border-white/15 object-cover shadow-2xl transition duration-500 hover:scale-[1.02] sm:rounded-3xl"
                src={assets.tech_header}
                alt="Industry ready courses"
              />

              {/* Floating Card */}
              <div className="absolute -bottom-4 left-3 rounded-2xl border border-white/20 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md sm:bottom-5 sm:left-5 sm:px-5 sm:py-3.5">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <CheckCircle2 size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-900 sm:text-sm">
                      Career Ready
                    </p>

                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      Learn practical skills
                    </p>
                  </div>

                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute -right-2 -top-3 rounded-full border border-white/20 bg-white/95 px-3 py-2 shadow-xl sm:-right-3 sm:top-5 sm:px-4">
                <div className="flex items-center gap-1.5">
                  <Sparkles
                    size={14}
                    className="text-indigo-600"
                  />

                  <span className="text-xs font-bold text-slate-800">
                    Learn & Grow
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Header;

