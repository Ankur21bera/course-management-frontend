import React from "react";
import { assets } from "../assets/assets";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Laptop,
  Target,
  Users,
  Zap,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Expert Mentors",
      description:
        "Learn from experienced industry professionals who provide practical knowledge and real-world guidance.",
    },
    {
      icon: Laptop,
      title: "Flexible Learning",
      description:
        "Access learning resources anytime and learn at your own pace according to your schedule.",
    },
    {
      icon: Briefcase,
      title: "Career Growth",
      description:
        "Build practical skills, create projects and prepare yourself for real-world career opportunities.",
    },
    {
      icon: Award,
      title: "Industry Relevant",
      description:
        "Learn technologies and concepts that are relevant to today's modern software development industry.",
    },
  ];

  const stats = [
    {
      icon: Users,
      number: "10K+",
      title: "Learners",
    },
    {
      icon: BookOpen,
      number: "50+",
      title: "Courses",
    },
    {
      icon: GraduationCap,
      number: "20+",
      title: "Expert Mentors",
    },
    {
      icon: Target,
      number: "95%",
      title: "Career Focus",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <section className="relative overflow-hidden bg-slate-950">

        {/* Background Decorations */}

        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 lg:py-28">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-indigo-300 text-sm font-semibold">
                <GraduationCap size={17} />
                About Programming Academy
              </div>

              <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                Learn today.
                <span className="block text-indigo-400">
                  Build tomorrow.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-400 leading-8 max-w-xl">
                Welcome to Programming Academy, a learning platform
                designed to help students develop practical technology
                skills and prepare for modern career opportunities.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-indigo-400"
                  />
                  Practical Learning
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-indigo-400"
                  />
                  Expert Guidance
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-indigo-400"
                  />
                  Career Focused
                </div>

              </div>

            </div>
            <div className="relative">

              <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />

              <div className="relative bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-3 shadow-2xl">

                <img
                  src={assets.tech_about}
                  alt="Programming Academy"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[460px] object-cover rounded-2xl"
                />

              </div>

            </div>

          </div>

        </div>
      </section>
      <section className="relative -mt-8 z-10">

        <div className="max-w-6xl mx-auto px-6 sm:px-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

            {stats.map((item, index) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`p-6 sm:p-8 text-center ${
                    index !== stats.length - 1
                      ? "border-b sm:border-b-0 sm:border-r border-slate-200"
                      : ""
                  }`}
                >

                  <div className="mx-auto w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Icon
                      size={21}
                      className="text-indigo-600"
                    />
                  </div>

                  <h3 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900">
                    {item.number}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.title}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          <div className="relative order-2 lg:order-1">

            <div className="absolute -top-5 -left-5 w-24 h-24 bg-indigo-100 rounded-3xl" />

            <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-violet-100 rounded-full" />

            <div className="relative bg-white rounded-3xl p-3 border border-slate-200 shadow-xl">

              <img
                src={assets.tech_about}
                alt="Learning at Programming Academy"
                className="w-full h-[350px] sm:h-[430px] object-cover rounded-2xl"
              />

            </div>

          </div>
          <div className="order-1 lg:order-2">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wide">
              <Zap size={14} />
              Who We Are
            </div>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              Education that helps you
              <span className="block text-indigo-600">
                move forward.
              </span>
            </h2>

            <div className="mt-6 space-y-5 text-slate-500 leading-8">

              <p>
                Welcome to{" "}
                <span className="font-bold text-slate-800">
                  Programming Academy
                </span>
                , your trusted platform for learning and professional
                growth. We believe that quality education should be
                accessible, flexible and focused on practical skills.
              </p>

              <p>
                Our platform is designed for learners of different
                experience levels. Whether you are taking your first
                steps into technology or looking to improve your existing
                skills, our learning resources can help you move forward.
              </p>
              <p>
                We focus on practical learning, industry-relevant
                technologies and career-oriented development so that
                learners can gain knowledge that can be applied to
                real-world projects.
              </p>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <BookOpen
                    size={19}
                    className="text-indigo-600"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Practical Skills
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 leading-5">
                    Focus on knowledge that can be applied in real projects.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Target
                    size={19}
                    className="text-indigo-600"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Career Focus
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 leading-5">
                    Develop skills with your career goals in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wide">
              <Target size={14} />
              Our Vision
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
              Making quality education
              <span className="block text-indigo-600">
                accessible to everyone.
              </span>
            </h2>
            <p className="mt-6 text-slate-500 leading-8">
              Our vision is to make high-quality education accessible
              to learners everywhere. We aim to bridge the gap between
              education and industry by helping students develop the
              knowledge, practical skills and confidence required to
              succeed in today's competitive technology environment.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <GraduationCap
                  size={23}
                  className="text-indigo-600"
                />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Learn
              </h3>
              <p className="mt-3 text-sm text-slate-500 leading-6">
                Build a strong foundation with structured and
                practical learning resources.
              </p>
            </div>
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <Laptop
                  size={23}
                  className="text-indigo-600"
                />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Practice
              </h3>
              <p className="mt-3 text-sm text-slate-500 leading-6">
                Apply your knowledge through practical projects
                and hands-on development.
              </p>
            </div>
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <Briefcase
                  size={23}
                  className="text-indigo-600"
                />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Grow
              </h3>
              <p className="mt-3 text-sm text-slate-500 leading-6">
                Turn your skills into meaningful career and
                professional opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 lg:py-28">

        <div className="text-center max-w-3xl mx-auto">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wide">
            <CheckCircle2 size={14} />
            Why Choose Us
          </div>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
            Everything you need to
            <span className="block text-indigo-600">
              grow your skills.
            </span>
          </h2>

          <p className="mt-5 text-slate-500 leading-7">
            We combine practical learning, flexible access and
            career-focused guidance to create a better learning
            experience.
          </p>

        </div>


        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  p-7
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  hover:border-indigo-200
                  transition-all
                  duration-300
                "
              >

                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-300">

                  <Icon
                    size={25}
                    className="text-indigo-600 group-hover:text-white transition-all duration-300"
                  />

                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm text-slate-500 leading-6">
                  {feature.description}
                </p>

              </div>
            );

          })}

        </div>

      </section>
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 lg:pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-7 sm:px-12 lg:px-16 py-14 lg:py-16">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Ready to start learning?
              </h2>
              <p className="mt-4 text-slate-400 max-w-2xl leading-7">
                Explore our courses and start building the skills
                you need for your technology career.
              </p>
            </div>
            <a
              href="/course"
              className="
                shrink-0
                inline-flex
                items-center
                justify-center
                px-7
                h-13
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-500
                text-white
                font-bold
                text-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                shadow-lg
                shadow-indigo-900/30
              "
            >
              Explore Courses
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;