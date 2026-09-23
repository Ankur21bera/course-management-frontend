
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Mail,
  MapPin,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Send,
  Upload,
  User,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Clock3,
  Users,
  FileText,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Headphones,
  GraduationCap,
  X,
} from "lucide-react";

import {
  submitCourseEnquiry,
  applyJob,
} from "../Redux/User/Userslice";

/* =========================================================
   INPUT FIELD
========================================================= */

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  error,
  maxLength,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-2.5 block text-sm font-bold text-slate-800"
      >
        {label}
      </label>

      <div className="group relative">
        <Icon
          size={18}
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition ${
            error
              ? "text-red-400"
              : "text-slate-400 group-focus-within:text-indigo-600"
          }`}
        />

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete="off"
          className={`h-14 w-full rounded-2xl border bg-white pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 ${
            error
              ? "border-red-400 ring-4 ring-red-50"
              : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
          }`}
        />
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-500">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
};

/* =========================================================
   TEXTAREA
========================================================= */

const TextareaField = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-full md:col-span-2">
      <label
        htmlFor={name}
        className="mb-2.5 block text-sm font-bold text-slate-800"
      >
        {label}
      </label>

      <div className="group relative">
        <MessageSquare
          size={18}
          className={`pointer-events-none absolute left-4 top-5 ${
            error
              ? "text-red-400"
              : "text-slate-400 group-focus-within:text-indigo-600"
          }`}
        />

        <textarea
          id={name}
          name={name}
          rows={6}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={500}
          className={`min-h-[155px] w-full resize-none rounded-2xl border bg-white py-4 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 ${
            error
              ? "border-red-400 ring-4 ring-red-50"
              : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
          }`}
        />
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-500">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      <div className="mt-1.5 text-right text-xs font-medium text-slate-400">
        {value.length}/500
      </div>
    </div>
  );
};

/* =========================================================
   VALIDATION
========================================================= */

const validateName = (name) => {
  const value = name.trim();

  if (!value) return "Name is required";

  if (value.length < 2) {
    return "Name must contain at least 2 characters";
  }

  if (!/^[A-Za-z\s]+$/.test(value)) {
    return "Name should contain only letters";
  }

  return "";
};

const validateEmail = (email) => {
  const value = email.trim();

  if (!value) return "Email is required";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Please enter a valid email address";
  }

  return "";
};

const validatePhone = (phone) => {
  const value = phone.trim();

  if (!value) return "Phone number is required";

  if (!/^[6-9]\d{9}$/.test(value)) {
    return "Enter a valid 10-digit Indian mobile number";
  }

  return "";
};

/* =========================================================
   CONTACT
========================================================= */

const Contact = () => {
  const dispatch = useDispatch();

  const {
    enquiryLoading = false,
    jobApplicationLoading = false,
    error = null,
  } = useSelector((state) => state.user);

  /* =======================================================
     CONTACT STATE
  ======================================================= */

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    question: "",
  });

  const [contactErrors, setContactErrors] = useState({});

  /* =======================================================
     CAREER STATE
  ======================================================= */

  const [careerData, setCareerData] = useState({
    name: "",
    email: "",
    phone: "",
    jobType: "",
    resume: null,
  });

  const [careerErrors, setCareerErrors] = useState({});

  const [openIndex, setOpenIndex] = useState(null);

  /* =======================================================
     FAQ
  ======================================================= */

  const faqData = [
    {
      question: "What courses does Programming Academy offer?",
      answer:
        "We offer MERN Stack, Full Stack Development, React JS, Node JS, Express JS and Backend Development courses.",
    },
    {
      question: "Do you provide placement assistance?",
      answer:
        "Yes, we provide placement assistance including resume building, interview preparation, mock interviews and career guidance.",
    },
    {
      question: "Are demo classes available?",
      answer:
        "Yes, students can request a free demo class before enrolling in a course.",
    },
    {
      question: "Are the courses beginner friendly?",
      answer:
        "Yes. Our courses are designed for beginners as well as students who already have basic programming knowledge.",
    },
    {
      question: "Do you provide practical projects?",
      answer:
        "Yes. Students work on practical real-world projects that can be added to their portfolio.",
    },
  ];

  /* =======================================================
     CONTACT CHANGE
  ======================================================= */

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setContactErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =======================================================
     CAREER CHANGE
  ======================================================= */

  const handleCareerChange = (e) => {
    const { name, value } = e.target;

    setCareerData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setCareerErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =======================================================
     CONTACT VALIDATION
  ======================================================= */

  const validateContactForm = () => {
    const errors = {};

    const nameError = validateName(contactData.name);
    const emailError = validateEmail(contactData.email);
    const phoneError = validatePhone(contactData.phone);

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (phoneError) errors.phone = phoneError;

    if (!contactData.question.trim()) {
      errors.question = "Please enter your question";
    } else if (contactData.question.trim().length < 10) {
      errors.question = "Question must contain at least 10 characters";
    }

    setContactErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /* =======================================================
     CONTACT SUBMIT — REDUX
  ======================================================= */

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateContactForm();

    if (!isValid) {
      toast.error("Please correct the highlighted fields");
      return;
    }

    try {
      const result = await dispatch(
        submitCourseEnquiry({
          name: contactData.name.trim(),
          email: contactData.email.trim(),
          phone: contactData.phone.trim(),
          question: contactData.question.trim(),
        })
      );

      if (submitCourseEnquiry.fulfilled.match(result)) {
        toast.success(
          result.payload?.message ||
            "Your enquiry has been submitted successfully!"
        );

        setContactData({
          name: "",
          email: "",
          phone: "",
          question: "",
        });

        setContactErrors({});
      } else {
        toast.error(
          result.payload || "Failed to submit your enquiry. Please try again."
        );
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  /* =======================================================
     RESUME CHANGE
  ======================================================= */

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      e.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("Resume size must be less than 5MB");
      e.target.value = "";
      return;
    }

    setCareerData((prev) => ({
      ...prev,
      resume: file,
    }));

    setCareerErrors((prev) => ({
      ...prev,
      resume: "",
    }));
  };

  /* =======================================================
     CAREER VALIDATION
  ======================================================= */

  const validateCareerForm = () => {
    const errors = {};

    const nameError = validateName(careerData.name);
    const emailError = validateEmail(careerData.email);
    const phoneError = validatePhone(careerData.phone);

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (phoneError) errors.phone = phoneError;

    if (!careerData.jobType) {
      errors.jobType = "Please select a position";
    }

    if (!careerData.resume) {
      errors.resume = "Please upload your resume";
    }

    setCareerErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /* =======================================================
     CAREER SUBMIT — REDUX
  ======================================================= */

  const handleCareerSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateCareerForm();

    if (!isValid) {
      toast.error("Please correct the highlighted fields");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", careerData.name.trim());
      formData.append("email", careerData.email.trim());
      formData.append("phone", careerData.phone.trim());
      formData.append("jobType", careerData.jobType);
      formData.append("resume", careerData.resume);

      const result = await dispatch(applyJob(formData));

      if (applyJob.fulfilled.match(result)) {
        toast.success(
          result.payload?.message ||
            "Your application has been submitted successfully!"
        );

        setCareerData({
          name: "",
          email: "",
          phone: "",
          jobType: "",
          resume: null,
        });

        setCareerErrors({});

        const fileInput = document.getElementById("resume");

        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        toast.error(
          result.payload || "Failed to submit application. Please try again."
        );
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-48 -right-40 h-[550px] w-[550px] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute left-1/2 top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-indigo-300 backdrop-blur">
              <Sparkles size={16} />
              Let's connect
            </div>

            <h1 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Have a question?
              <span className="mt-2 block text-indigo-400">
                Let's talk.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Whether you want to know more about our courses, need career
              guidance or want to join our team, our support team is ready
              to help.
            </p>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
              <a
                href="mailto:support@programmingacademy.com"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
                  <Mail size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </p>
                  <p className="mt-1 truncate text-sm font-bold text-slate-200">
                    support@programmingacademy.com
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="ml-auto text-slate-500 transition group-hover:translate-x-1 group-hover:text-white"
                />
              </a>

              <a
                href="tel:+919876543210"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-200">
                    +91 98765 43210
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="ml-auto text-slate-500 transition group-hover:translate-x-1 group-hover:text-white"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-24">

        {/* =================================================
            CONTACT SECTION
        ================================================= */}

        <section className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

          <div className="lg:sticky lg:top-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-indigo-600">
              <Headphones size={14} />
              Course Support
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Need help choosing
              <span className="block text-indigo-600">
                the right course?
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-500">
              Send us your question and our team can help you understand
              courses, curriculum, projects, fees and career opportunities.
            </p>

            <div className="mt-9 space-y-4">
              {[
                {
                  icon: GraduationCap,
                  title: "Course Guidance",
                  text: "Understand the right learning path.",
                },
                {
                  icon: Users,
                  title: "Learning Support",
                  text: "Get help from our support team.",
                },
                {
                  icon: Briefcase,
                  title: "Career Guidance",
                  text: "Understand your next career step.",
                },
                {
                  icon: ShieldCheck,
                  title: "Reliable Support",
                  text: "Get proper information before enrolling.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-slate-800">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.text}
                      </p>
                    </div>

                    <CheckCircle2
                      size={18}
                      className="ml-auto shrink-0 text-emerald-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* CONTACT FORM */}

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">

            <div className="border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 sm:p-8 lg:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                  <MessageSquare size={24} />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-indigo-600">
                    Send a message
                  </p>

                  <h3 className="mt-1 text-2xl font-black text-slate-900">
                    Ask About Our Courses
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Fill in the details and send your enquiry.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleContactSubmit}
              className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:p-10"
            >
              <InputField
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
                icon={User}
                value={contactData.name}
                onChange={handleContactChange}
                error={contactErrors.name}
                maxLength={50}
              />

              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
                icon={Mail}
                value={contactData.email}
                onChange={handleContactChange}
                error={contactErrors.email}
                maxLength={100}
              />

              <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                icon={Phone}
                value={contactData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  if (value.length <= 10) {
                    setContactData((prev) => ({
                      ...prev,
                      phone: value,
                    }));

                    setContactErrors((prev) => ({
                      ...prev,
                      phone: "",
                    }));
                  }
                }}
                error={contactErrors.phone}
                maxLength={10}
              />

              <TextareaField
                label="Your Question"
                name="question"
                placeholder="Tell us what you would like to know..."
                value={contactData.question}
                onChange={handleContactChange}
                error={contactErrors.question}
              />

              {error && enquiryLoading === false && (
                <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-semibold text-red-600 lg:col-span-2">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={enquiryLoading}
                className="group flex h-14 items-center justify-center gap-2 rounded-2xl bg-indigo-600 text-sm font-black text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 lg:col-span-2"
              >
                {enquiryLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending Enquiry...
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <Send
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* =================================================
            SUPPORT CARDS
        ================================================= */}

        <section className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {[
            {
              icon: Clock3,
              title: "Quick Response",
              text: "We aim to respond to student enquiries promptly.",
            },
            {
              icon: Users,
              title: "Student First",
              text: "Our support is focused on student needs.",
            },
            {
              icon: ShieldCheck,
              title: "Trusted Support",
              text: "Get clear information before making decisions.",
            },
            {
              icon: GraduationCap,
              title: "Career Focused",
              text: "Learn about courses and career pathways.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={21} />
                </div>

                <h3 className="mt-5 font-black text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.text}
                </p>
              </div>
            );
          })}
        </section>

        {/* =================================================
            FAQ
        ================================================= */}

        <section className="mt-20 lg:mt-28">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-indigo-600">
              <MessageSquare size={14} />
              FAQ
            </div>

            <h2 className="mt-5 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              Find quick answers to common questions students ask before
              joining a course.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl space-y-3">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.question}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-indigo-200 shadow-lg shadow-indigo-100/50"
                      : "border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full cursor-pointer items-center justify-between gap-5 p-5 text-left sm:p-6"
                  >
                    <span className="text-sm font-black text-slate-800 sm:text-base">
                      {item.question}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                        isOpen
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isOpen ? (
                        <Minus size={18} />
                      ) : (
                        <Plus size={18} />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6">
                      <div className="mb-5 h-px bg-slate-100" />

                      <p className="text-sm leading-7 text-slate-500">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================
            CAREER SECTION
        ================================================= */}

        <section className="mt-20 lg:mt-28">
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

            {/* CAREER INTRO */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-emerald-600">
                <Briefcase size={14} />
                Careers
              </div>

              <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Build your
                <span className="block text-emerald-600">
                  career with us.
                </span>
              </h2>

              <p className="mt-5 leading-7 text-slate-500">
                Interested in working with Programming Academy? Submit your
                details and resume for available opportunities.
              </p>

              <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Sparkles size={20} />
                  </div>

                  <div>
                    <p className="font-black">Why join us?</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Grow while helping students learn.
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-4">
                  {[
                    "Growth-focused environment",
                    "Collaborative team",
                    "Learning opportunities",
                    "Career development",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <CheckCircle2
                        size={17}
                        className="shrink-0 text-emerald-400"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CAREER FORM */}

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">

              <div className="border-b border-slate-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 sm:p-8 lg:p-10">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
                    <Briefcase size={24} />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-600">
                      Join the team
                    </p>

                    <h3 className="mt-1 text-2xl font-black text-slate-900">
                      Apply for a Position
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Submit your details and resume.
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleCareerSubmit}
                className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:p-10"
              >
                <InputField
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  icon={User}
                  value={careerData.name}
                  onChange={handleCareerChange}
                  error={careerErrors.name}
                  maxLength={50}
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  icon={Mail}
                  value={careerData.email}
                  onChange={handleCareerChange}
                  error={careerErrors.email}
                  maxLength={100}
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  icon={Phone}
                  value={careerData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 10) {
                      setCareerData((prev) => ({
                        ...prev,
                        phone: value,
                      }));

                      setCareerErrors((prev) => ({
                        ...prev,
                        phone: "",
                      }));
                    }
                  }}
                  error={careerErrors.phone}
                  maxLength={10}
                />

                {/* POSITION */}

                <div>
                  <label
                    htmlFor="jobType"
                    className="mb-2.5 block text-sm font-bold text-slate-800"
                  >
                    Position
                  </label>

                  <div className="relative">
                    <Briefcase
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      id="jobType"
                      name="jobType"
                      value={careerData.jobType}
                      onChange={handleCareerChange}
                      className={`h-14 w-full appearance-none rounded-2xl border bg-white pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:ring-4 ${
                        careerErrors.jobType
                          ? "border-red-400 ring-4 ring-red-50"
                          : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-50"
                      }`}
                    >
                      <option value="">Select a position</option>
                      <option value="Frontend Developer">
                        Frontend Developer
                      </option>
                      <option value="Backend Developer">
                        Backend Developer
                      </option>
                      <option value="Full Stack Developer">
                        Full Stack Developer
                      </option>
                      <option value="Instructor">Instructor</option>
                    </select>
                  </div>

                  {careerErrors.jobType && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-500">
                      <AlertCircle size={14} />
                      {careerErrors.jobType}
                    </div>
                  )}
                </div>

                {/* RESUME */}

                <div className="lg:col-span-2">
                  <label className="mb-2.5 block text-sm font-bold text-slate-800">
                    Resume
                  </label>

                  <label
                    htmlFor="resume"
                    className={`group flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-7 text-center transition-all ${
                      careerErrors.resume
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-200 bg-slate-50/50 hover:border-emerald-400 hover:bg-emerald-50/30"
                    }`}
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                        careerData.resume
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                      }`}
                    >
                      {careerData.resume ? (
                        <FileText size={25} />
                      ) : (
                        <Upload size={25} />
                      )}
                    </div>

                    <p className="mt-4 max-w-full break-all text-sm font-black text-slate-700">
                      {careerData.resume
                        ? careerData.resume.name
                        : "Upload your resume"}
                    </p>

                    <p className="mt-2 text-xs font-medium text-slate-400">
                      PDF only • Maximum 5MB
                    </p>

                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handleResumeChange}
                    />
                  </label>

                  {careerErrors.resume && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-500">
                      <AlertCircle size={14} />
                      {careerErrors.resume}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={jobApplicationLoading}
                  className="group flex h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-lg shadow-emerald-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 lg:col-span-2"
                >
                  {jobApplicationLoading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Apply Now
                      <Send
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* =================================================
            CONTACT INFO
        ================================================= */}

        <section className="mt-16 lg:mt-20">
          <div className="grid gap-5 md:grid-cols-3">

            <a
              href="mailto:support@programmingacademy.com"
              className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <Mail size={21} />
              </div>

              <h4 className="mt-5 font-black text-slate-900">
                Email Us
              </h4>

              <p className="mt-2 break-all text-sm text-slate-500">
                support@programmingacademy.com
              </p>
            </a>

            <a
              href="tel:+919876543210"
              className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <Phone size={21} />
              </div>

              <h4 className="mt-5 font-black text-slate-900">
                Call Us
              </h4>

              <p className="mt-2 text-sm text-slate-500">
                +91 98765 43210
              </p>
            </a>

            <div className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                <MapPin size={21} />
              </div>

              <h4 className="mt-5 font-black text-slate-900">
                Visit Us
              </h4>

              <p className="mt-2 text-sm text-slate-500">
                New Delhi, India
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;

