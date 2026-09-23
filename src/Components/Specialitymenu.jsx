import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Specialitymenu = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-16 sm:py-20 lg:py-24">

      {/* ================= BACKGROUND DECORATIONS ================= */}
      <div className="pointer-events-none absolute -left-28 -top-24 h-72 w-72 rounded-full bg-indigo-100/70 blur-3xl sm:h-96 sm:w-96" />

      <div className="pointer-events-none absolute -bottom-24 -right-28 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl sm:h-96 sm:w-96" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50/40 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm sm:px-5 sm:text-sm">
            <Sparkles size={16} />
            Explore Learning Paths
          </span>

          <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:mt-6 sm:text-4xl md:text-5xl">
            Choose Your
            <span className="block text-indigo-600 sm:inline">
              {" "}Programming Journey
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
            Learn the most in-demand technologies with industry-focused
            courses designed to help you build projects, improve your
            skills and get hired.
          </p>
        </div>

        {/* ================= SPECIALITY GRID ================= */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-7">

          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/course/${item.speciality}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-2xl sm:min-h-[315px] sm:p-6 lg:min-h-[325px]"
            >

              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-600 to-blue-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Decorative Circle */}
              <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-white/10 opacity-0 transition-all duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col">

                {/* ================= ICON ================= */}
                <div className="mx-auto flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 p-4 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:bg-white sm:h-24 sm:w-24 sm:p-5">

                  <img
                    src={item.image}
                    alt={item.speciality}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />

                </div>

                {/* ================= TITLE ================= */}
                <h3 className="mt-5 min-h-[48px] text-center text-sm font-bold leading-6 text-slate-800 transition-colors duration-300 group-hover:text-white sm:mt-6 sm:text-base lg:text-lg">
                  {item.speciality}
                </h3>

                {/* ================= DESCRIPTION ================= */}
                <p className="mt-2 line-clamp-3 text-center text-xs leading-5 text-slate-500 transition-colors duration-300 group-hover:text-indigo-100 sm:mt-3 sm:text-sm sm:leading-6">
                  Start learning from beginner to advanced with real
                  projects.
                </p>

                {/* ================= EXPLORE ================= */}
                <div className="mt-auto flex justify-center pt-5 sm:pt-6">

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 transition-colors duration-300 group-hover:text-white sm:gap-2 sm:text-sm">

                    Explore

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1 sm:h-[18px] sm:w-[18px]"
                    />

                  </span>

                </div>

              </div>
            </Link>
          ))}

        </div>

        {/* ================= BOTTOM NOTE ================= */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <p className="text-center text-xs text-slate-400 sm:text-sm">
            Choose a learning path and start building real-world skills.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Specialitymenu;

