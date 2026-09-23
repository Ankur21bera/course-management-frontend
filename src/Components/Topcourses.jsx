import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Clock3,
  Users,
  Star,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { getPublicCourses } from "../Redux/User/Userslice";

const Topcourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { publicCourses, publicCoursesLoading, publicCoursesError } =
    useSelector((state) => state.user);

  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    dispatch(getPublicCourses());
  }, [dispatch]);

  const toggleCourses = () => {
    setVisibleCount((prev) => (prev === 8 ? publicCourses.length : 8));
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl sm:h-[450px] sm:w-[450px]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm sm:px-5 sm:text-sm">
            <Sparkles size={16} />
            Most Popular Courses
          </span>

          <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Learn Skills That
            <span className="block text-indigo-600 sm:inline">
              {" "}
              Companies Hire For
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
            Learn directly from experienced industry mentors, build real-world
            projects, earn certificates, and become job-ready with our premium
            online courses.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          <div className="flex items-center justify-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <BookOpen size={23} />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-black text-indigo-600">
                {publicCourses.length}+
              </h3>
              <p className="text-sm text-slate-500">Tech Courses</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <Users size={23} />
            </div>

            <div className="text-left">
              <h3 className="text-2xl font-black text-indigo-600">10k+</h3>
              <p className="text-sm text-slate-500">Happy Students</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-500">
              <Star size={23} fill="currentColor" />
            </div>

            <div className="text-left">
              <h3 className="text-2xl font-black text-indigo-600">4.9</h3>
              <p className="text-sm text-slate-500">Average Rating</p>
            </div>
          </div>
        </div>
        {publicCoursesLoading && (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-52 animate-pulse bg-slate-200" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />

                  <div className="flex gap-3">
                    <div className="h-9 w-24 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-9 w-20 animate-pulse rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!publicCoursesLoading && publicCoursesError && (
          <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-red-100 bg-red-50 px-6 py-8 text-center">
            <h3 className="text-lg font-bold text-red-700">
              Unable to Load Courses
            </h3>

            <p className="mt-2 text-sm text-red-600">{publicCoursesError}</p>

            <button
              onClick={() => dispatch(getPublicCourses())}
              className="mt-5 rounded-xl cursor-pointer bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}
        {!publicCoursesLoading &&
          !publicCoursesError &&
          publicCourses.length === 0 && (
            <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <BookOpen size={25} />
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                No Courses Available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                New courses will appear here when they become available.
              </p>
            </div>
          )}
        {!publicCoursesLoading &&
          !publicCoursesError &&
          publicCourses.length > 0 && (
            <>
              <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 xl:grid-cols-4">
                {publicCourses.slice(0, visibleCount).map((course) => (
                  <div
                    key={course._id}
                    onClick={() => navigate(`/booking/${course._id}`)}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl"
                  >
                    <div className="relative h-52 overflow-hidden bg-slate-100 sm:h-56">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                   
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <span className="absolute left-4 top-4 max-w-[65%] truncate rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-indigo-700 shadow-md backdrop-blur-sm">
                        {course.category || "Programming"}
                      </span>
                      <span className="absolute right-4 top-4 rounded-full bg-indigo-600 px-3.5 py-1.5 text-sm font-bold text-white shadow-lg">
                        ₹{course.price}
                      </span>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-white sm:text-xl">
                          {course.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-600">
                        {course.about ||
                          "Learn practical skills through industry-focused training and real-world projects."}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 sm:text-sm">
                          <Clock3 size={14} />
                          {course.duration || "Flexible"}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 sm:text-sm">
                          <CheckCircle2 size={14} />
                          {course.level || "All Levels"}
                        </span>
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-3">
                        {/* Mentor */}
                        <div className="flex min-w-0 items-center gap-3">
                          <img
                            src={course.mentor?.image || "/default-mentor.png"}
                            alt={course.mentor?.name || "Mentor"}
                            className="h-11 w-11 shrink-0 rounded-full border-2 border-indigo-100 object-cover"
                          />

                          <div className="min-w-0">
                            <h4 className="truncate text-sm font-bold text-slate-900">
                              {course.mentor?.name || "Expert Mentor"}
                            </h4>

                            <p className="truncate text-xs text-slate-500">
                              {course.mentor?.role || "Industry Mentor"}
                            </p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="shrink-0 text-right">
                          <div className="flex items-center justify-end gap-1 text-sm text-yellow-500">
                            <Star size={15} fill="currentColor" />
                            <span className="font-bold">4.9</span>
                          </div>

                          <span className="text-[11px] text-slate-400">
                            2.1k reviews
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="my-5 h-px bg-slate-100" />

                      {/* Bottom Action */}
                      <div className="mt-auto flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-medium text-slate-400">
                            Enrolled Students
                          </p>

                          <h4 className="mt-0.5 text-sm font-bold text-slate-900">
                            1,200+
                          </h4>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/booking/${course._id}`);
                          }}
                          className="group/button cursor-pointer inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg sm:px-5"
                        >
                          <span>View Details</span>

                          <ArrowRight
                            size={17}
                            className="transition-transform duration-300 group-hover/button:translate-x-1"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ================= EXPLORE MORE ================= */}
              {publicCourses.length > 8 && (
                <div className="mt-12 flex justify-center sm:mt-14">
                  <button
                    onClick={toggleCourses}
                    className="group inline-flex items-center gap-2 rounded-xl border border-indigo-600 bg-white px-6 py-3 text-sm font-bold text-indigo-600 shadow-sm transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-lg sm:px-7 sm:py-3.5"
                  >
                    {visibleCount === 8 ? "Explore More Courses" : "Show Less"}

                    <ArrowRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        visibleCount === 8
                          ? "group-hover:translate-x-1"
                          : "rotate-180 group-hover:-translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              )}
            </>
          )}
      </div>
    </section>
  );
};

export default Topcourses;
