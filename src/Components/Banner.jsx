
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20 lg:py-24">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-indigo-600/25 blur-[120px] sm:h-[500px] sm:w-[500px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[130px] sm:h-[550px] sm:w-[550px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* ================= CONTAINER ================= */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-20">

          {/* ===================================================== */}
          {/* LEFT CONTENT */}
          {/* ===================================================== */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-4 py-2 text-xs font-semibold text-indigo-200 backdrop-blur-md sm:px-5 sm:text-sm">
                <Sparkles
                  size={15}
                  className="text-cyan-300"
                />

                Join India's Fastest Growing Coding Platform
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:mt-8 xl:text-7xl">

              Start Your

              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Developer Journey
              </span>

              <span className="mt-2 block">
                Today.
              </span>

            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 md:text-lg lg:mx-0 lg:mt-8">
              Learn React, MERN Stack, JavaScript, Node.js and
              Full Stack Development through industry-level
              projects, live classes and expert mentorship.
            </p>

            {/* ================= BUTTONS ================= */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:mt-10 lg:justify-start">

              <button
                type="button"
                onClick={() => navigate("/course")}
                className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-2xl sm:px-7"
              >
                Explore Courses

                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-600 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-500 hover:bg-white/10 sm:px-7"
              >
                <PlayCircle
                  size={21}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                Watch Demo
              </button>

            </div>

            {/* ================= FEATURES ================= */}
            <div className="mx-auto mt-9 grid max-w-xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:mx-0 lg:mt-11">

              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <CheckCircle2
                  size={19}
                  className="shrink-0 text-green-400"
                />

                <span className="text-sm text-slate-300">
                  Live Coding Classes
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <CheckCircle2
                  size={19}
                  className="shrink-0 text-green-400"
                />

                <span className="text-sm text-slate-300">
                  Real World Projects
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <CheckCircle2
                  size={19}
                  className="shrink-0 text-green-400"
                />

                <span className="text-sm text-slate-300">
                  Placement Assistance
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <CheckCircle2
                  size={19}
                  className="shrink-0 text-green-400"
                />

                <span className="text-sm text-slate-300">
                  Lifetime Access
                </span>
              </div>

            </div>

            {/* ================= STATS ================= */}
            <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 divide-x divide-slate-700/70 lg:mx-0 lg:mt-12">

              <div className="px-3 text-center sm:px-5 lg:text-left">
                <h3 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                  10K+
                </h3>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Students
                </p>
              </div>

              <div className="px-3 text-center sm:px-5 lg:text-left">
                <h3 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                  120+
                </h3>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Courses
                </p>
              </div>

              <div className="px-3 text-center sm:px-5 lg:text-left">
                <h3 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                  95%
                </h3>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Placement
                </p>
              </div>

            </div>
          </div>

          {/* ===================================================== */}
          {/* RIGHT VISUAL */}
          {/* ===================================================== */}
          <div className="relative flex min-h-[400px] items-center justify-center sm:min-h-[500px] lg:min-h-[600px]">

            {/* Main Glow */}
            <div className="absolute h-[260px] w-[260px] rounded-full bg-indigo-500/20 blur-[90px] sm:h-[400px] sm:w-[400px] sm:blur-[120px]" />

            <div className="absolute right-5 top-10 h-32 w-32 rounded-full bg-cyan-400/15 blur-3xl sm:right-10 sm:h-40 sm:w-40" />

            {/* Main Image */}
            <div className="relative z-20 w-full max-w-[520px]">

              <img
                src={assets.tech_banner}
                alt="Programming Academy"
                className="mx-auto w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)] transition duration-500 hover:scale-[1.02]"
              />

              {/* ================= TOP LEFT CARD ================= */}
              <div className="absolute left-0 top-0 rounded-2xl border border-slate-200/20 bg-white px-3 py-3 shadow-2xl sm:-left-4 sm:top-4 sm:px-5 sm:py-4 lg:-left-8">

                <div className="flex items-center gap-2.5 sm:gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg sm:h-12 sm:w-12 sm:text-xl">
                    🚀
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      Live Courses
                    </p>

                    <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
                      120+ Available
                    </h3>
                  </div>

                </div>
              </div>

              {/* ================= TOP RIGHT RATING ================= */}
              <div className="absolute right-0 top-16 rounded-2xl border border-slate-200/20 bg-white px-3 py-3 shadow-2xl sm:-right-3 sm:top-20 sm:px-5 sm:py-4 lg:-right-8">

                <div className="flex items-center gap-2.5 sm:gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-500 sm:h-12 sm:w-12">
                    <Star
                      size={20}
                      fill="currentColor"
                    />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
                      4.9 / 5
                    </h3>

                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      Student Rating
                    </p>
                  </div>

                </div>
              </div>

              {/* ================= BOTTOM LEFT ================= */}
              <div className="absolute bottom-3 left-0 rounded-2xl border border-slate-200/20 bg-white px-3 py-3 shadow-2xl sm:bottom-8 sm:-left-4 sm:px-5 sm:py-4 lg:-left-8">

                <div className="flex items-center gap-2.5 sm:gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-indigo-50 sm:h-12 sm:w-12">
                    <Users
                      size={21}
                      className="text-indigo-600"
                    />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
                      10,000+
                    </h3>

                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      Happy Students
                    </p>
                  </div>

                </div>
              </div>

              {/* ================= BOTTOM RIGHT ================= */}
              <div className="absolute bottom-4 right-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-white shadow-2xl sm:bottom-10 sm:-right-3 sm:px-5 sm:py-4 lg:-right-8">

                <p className="text-[10px] text-indigo-100 sm:text-xs">
                  Placement Success
                </p>

                <h2 className="mt-0.5 text-2xl font-black sm:text-3xl">
                  95%
                </h2>

                <p className="text-[10px] text-indigo-100 sm:text-xs">
                  Students Placed
                </p>

              </div>

              {/* ================= LIVE BADGE ================= */}
              <div className="absolute bottom-[-18px] left-1/2 z-40 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-xl sm:bottom-[-20px] sm:px-6 sm:py-3">

                <div className="flex items-center gap-2 whitespace-nowrap">

                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500 sm:h-3 sm:w-3" />

                  <span className="text-xs font-bold text-slate-800 sm:text-sm">
                    Live Classes Running
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

export default Banner;

