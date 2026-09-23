import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import techHeader from "../assets/tech_header.jpg";

import { useDispatch, useSelector } from "react-redux";

import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resendOtp,
  resetPassword,
} from "../Redux/User/Userslice";

const InputField = ({
  name,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  error,
  rightElement,
  autoComplete = "off",
}) => {
  return (
    <div className="w-full">
      <div
        className={`relative flex items-center rounded-2xl border bg-white transition-all duration-200 ${
          error
            ? "border-red-300 ring-4 ring-red-50"
            : "border-slate-200 hover:border-slate-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"
        }`}
      >
        <Icon
          size={19}
          className={`ml-4 shrink-0 ${
            error ? "text-red-400" : "text-slate-400"
          }`}
        />

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="min-w-0 w-full bg-transparent px-3 py-4 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
        />

        {rightElement}
      </div>

      {error && (
        <p className="mt-1.5 ml-1 text-xs font-semibold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

const PasswordField = ({
  name,
  placeholder,
  value,
  onChange,
  error,
  showPassword,
  setShowPassword,
  autoComplete = "new-password",
}) => {
  return (
    <InputField
      name={name}
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      icon={LockKeyhole}
      value={value}
      onChange={onChange}
      error={error}
      autoComplete={autoComplete}
      rightElement={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="mr-4 shrink-0 text-slate-400 transition hover:text-slate-700 cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
};

const SubmitButton = ({ loading, text, loadingText }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group flex cursor-pointer w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          {loadingText}
        </>
      ) : (
        <>
          {text}
          <ArrowRight
            size={17}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </>
      )}
    </button>
  );
};

const Divider = () => {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-slate-200" />

      <span className="whitespace-nowrap text-xs font-semibold text-slate-400">
        Secure access
      </span>

      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [screen, setScreen] = useState("login");

  const [otpTimer, setOtpTimer] = useState(60);

  const otpRefs = useRef([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    qualification: "",
    age: "",
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [errors, setErrors] = useState({});

  /*
   * Redux loading state
   *
   * Your userSlice already has one common loading state
   * for register/login/forgot/OTP/reset.

   */

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (screen !== "otp" || otpTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, otpTimer]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (screen === "login") {
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!validateEmail(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      }
    }

    if (screen === "register") {
      if (!formData.name.trim()) {
        newErrors.name = "Full name is required";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Name must contain at least 2 characters";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!validateEmail(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
        newErrors.phone = "Enter a valid 10-digit phone number";
      }

      if (!formData.age) {
        newErrors.age = "Age is required";
      } else if (Number(formData.age) < 18 || Number(formData.age) > 100) {
        newErrors.age = "Enter a valid age";
      }

      if (!formData.qualification.trim()) {
        newErrors.qualification = "Qualification is required";
      }

      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must contain at least 6 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (screen === "forgot") {
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!validateEmail(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (screen === "otp") {
      if (otp.join("").length !== 6) {
        newErrors.otp = "Please enter the complete 6-digit OTP";
      }
    }

    if (screen === "reset") {
      if (!formData.password) {
        newErrors.password = "New password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must contain at least 6 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your new password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    setOtp((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

    setErrors((prev) => ({
      ...prev,
      otp: "",
    }));

    if (value && index < 5) {
      requestAnimationFrame(() => {
        otpRefs.current[index + 1]?.focus();
      });
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      requestAnimationFrame(() => {
        otpRefs.current[index - 1]?.focus();
      });
    }

    if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const updatedOtp = ["", "", "", "", "", ""];

    pasted.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);

    setErrors((prev) => ({
      ...prev,
      otp: "",
    }));

    const focusIndex = Math.min(pasted.length, 5);

    requestAnimationFrame(() => {
      otpRefs.current[focusIndex]?.focus();
    });
  };

  const switchScreen = (nextScreen) => {
    setErrors({});
    setScreen(nextScreen);

    if (nextScreen === "otp") {
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    }
  };

  /*
   * MAIN FORM SUBMIT
   *
   * Every screen is now connected with Redux.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    try {
      if (screen === "login") {
        const result = await dispatch(
          loginUser({
            email: formData.email.trim(),
            password: formData.password,
          }),
        );

        if (loginUser.fulfilled.match(result)) {
          toast.success(result.payload?.message || "Login successful");

          navigate("/");
        } else {
          toast.error(result.payload || "Login failed. Please try again.");
        }

        return;
      }
      if (screen === "register") {
        const result = await dispatch(
          registerUser({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            phone: formData.phone.trim(),
            address: formData.address.trim(),
            qualification: formData.qualification.trim(),
            age: Number(formData.age),
          }),
        );

        if (registerUser.fulfilled.match(result)) {
          toast.success(
            result.payload?.message || "Account created successfully",
          );
          navigate("/");

          setFormData((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
          }));

          setErrors({});
          setScreen("login");
        } else {
          toast.error(
            result.payload || "Registration failed. Please try again.",
          );
        }

        return;
      }
      if (screen === "forgot") {
        const result = await dispatch(
          forgotPassword({
            email: formData.email.trim(),
          }),
        );

        if (forgotPassword.fulfilled.match(result)) {
          toast.success(
            result.payload?.message || "Verification code sent successfully",
          );

          setOtp(["", "", "", "", "", ""]);
          setOtpTimer(60);
          setErrors({});
          setScreen("otp");

          setTimeout(() => {
            otpRefs.current[0]?.focus();
          }, 150);
        } else {
          toast.error(result.payload || "Failed to send verification code");
        }

        return;
      }
      if (screen === "otp") {
        const otpValue = otp.join("");

        const result = await dispatch(
          verifyOtp({
            email: formData.email.trim(),
            otp: otpValue,
          }),
        );

        if (verifyOtp.fulfilled.match(result)) {
          toast.success(result.payload?.message || "OTP verified successfully");

          setErrors({});
          setScreen("reset");
        } else {
          toast.error(result.payload || "Invalid or expired OTP");
        }

        return;
      }


      if (screen === "reset") {
  const result = await dispatch(
    resetPassword({
      email: formData.email.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    })
  ).unwrap();

  toast.success(
    result?.message || "Password updated successfully"
  );

  setFormData((prev) => ({
    ...prev,
    password: "",
    confirmPassword: "",
  }));

  setOtp(["", "", "", "", "", ""]);
  setErrors({});
  setScreen("login");

  return;
}
    } catch (error) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (otpTimer > 0 || loading) return;

    try {
      const result = await dispatch(
        resendOtp({
          email: formData.email.trim(),
        }),
      );

      if (resendOtp.fulfilled.match(result)) {
        setOtp(["", "", "", "", "", ""]);
        setOtpTimer(60);
        setErrors({});

        toast.success(result.payload?.message || "New verification code sent");

        setTimeout(() => {
          otpRefs.current[0]?.focus();
        }, 100);
      } else {
        toast.error(result.payload || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const getHeading = () => {
    switch (screen) {
      case "register":
        return {
          title: "Create your account",
          subtitle:
            "Join our learning community and start building your future.",
          icon: User,
        };

      case "forgot":
        return {
          title: "Forgot your password?",
          subtitle:
            "Enter your registered email and we'll help you recover your account.",
          icon: Mail,
        };

      case "otp":
        return {
          title: "Verify your email",
          subtitle: `Enter the 6-digit verification code sent to ${formData.email}.`,
          icon: ShieldCheck,
        };

      case "reset":
        return {
          title: "Create new password",
          subtitle: "Set a strong password to keep your account secure.",
          icon: LockKeyhole,
        };

      default:
        return {
          title: "Welcome back",
          subtitle: "Sign in to continue your learning journey with us.",
          icon: LockKeyhole,
        };
    }
  };

  const heading = getHeading();
  const HeadingIcon = heading.icon;

  return (
    <div className="min-h-screen bg-slate-950 lg:flex">
      <section className="relative hidden overflow-hidden lg:flex lg:w-[46%]">
        <img
          src={techHeader}
          alt="Learning platform"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950" />

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative z-10 flex min-h-screen w-full flex-col justify-between p-10 xl:p-16">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md">
              <Sparkles size={22} className="text-indigo-300" />
            </div>

            <div>
              <p className="text-xl font-black text-white">
                Learn<span className="text-indigo-400">Pro</span>
              </p>

              <p className="text-xs text-slate-400">Learn. Build. Grow.</p>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-indigo-200 backdrop-blur-md">
              <ShieldCheck size={15} />
              Trusted Learning Platform
            </div>

            <h1 className="mt-7 text-4xl font-black leading-[1.08] text-white xl:text-6xl">
              Build skills that
              <span className="mt-2 block text-indigo-400">
                move your career forward.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
              Learn practical skills, work on real-world projects and prepare
              yourself for the modern job market.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Industry-focused courses",
                "Experienced mentors",
                "Hands-on projects",
                "Career-ready skills",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm font-medium text-slate-300"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-indigo-400"
                  />

                  {feature}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} LearnPro. All rights reserved.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen flex-1 items-center justify-center bg-slate-50 px-4 py-8 sm:px-8 lg:px-10">
        <div className="w-full max-w-2xl">
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
              <Sparkles size={21} className="text-white" />
            </div>

            <div>
              <p className="text-xl font-black text-slate-900">
                Learn<span className="text-indigo-600">Pro</span>
              </p>

              <p className="text-xs text-slate-500">Learn. Build. Grow.</p>
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">
            {screen !== "login" && (
              <button
                type="button"
                onClick={() => switchScreen("login")}
                className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-indigo-600"
              >
                <ArrowLeft size={17} />
                Back to login
              </button>
            )}

            <div className="mb-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                <HeadingIcon size={22} className="text-indigo-600" />
              </div>

              <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                {heading.title}
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                {heading.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {screen === "login" && (
                <>
                  <InputField
                    name="email"
                    type="email"
                    placeholder="Email address"
                    icon={Mail}
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                  />

                  <PasswordField
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    autoComplete="current-password"
                  />

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => switchScreen("forgot")}
                      className="cursor-pointer text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <SubmitButton
                    loading={loading}
                    text="Sign in"
                    loadingText="Signing in..."
                  />

                  <Divider />

                  <p className="text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchScreen("register")}
                      className="cursor-pointer font-bold text-indigo-600 transition hover:text-indigo-700"
                    >
                      Create account
                    </button>
                  </p>
                </>
              )}

              {screen === "register" && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InputField
                      name="name"
                      placeholder="Full name"
                      icon={User}
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                    />

                    <InputField
                      name="email"
                      type="email"
                      placeholder="Email address"
                      icon={Mail}
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      autoComplete="email"
                    />

                    <InputField
                      name="phone"
                      type="tel"
                      placeholder="Phone number"
                      icon={Phone}
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      autoComplete="tel"
                    />

                    <InputField
                      name="age"
                      type="number"
                      placeholder="Age"
                      icon={User}
                      value={formData.age}
                      onChange={handleChange}
                      error={errors.age}
                    />

                    <InputField
                      name="qualification"
                      placeholder="Qualification"
                      icon={GraduationCap}
                      value={formData.qualification}
                      onChange={handleChange}
                      error={errors.qualification}
                    />

                    <InputField
                      name="address"
                      placeholder="City / Address"
                      icon={MapPin}
                      value={formData.address}
                      onChange={handleChange}
                      error={errors.address}
                    />
                  </div>

                  <PasswordField
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />

                  <PasswordField
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    showPassword={showConfirmPassword}
                    setShowPassword={setShowConfirmPassword}
                  />

                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-indigo-600"
                    />

                    <p className="text-xs leading-5 text-slate-500">
                      By creating an account, you agree to our terms and privacy
                      policy.
                    </p>
                  </div>

                  <SubmitButton
                    loading={loading}
                    text="Create account"
                    loadingText="Creating account..."
                  />

                  <p className="pt-1 text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchScreen("login")}
                      className="cursor-pointer font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      Sign in
                    </button>
                  </p>
                </>
              )}

              {screen === "forgot" && (
                <>
                  <InputField
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    icon={Mail}
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                  />

                  <SubmitButton
                    loading={loading}
                    text="Send verification code"
                    loadingText="Sending code..."
                  />
                </>
              )}

              {screen === "otp" && (
                <>
                  <div className="rounded-2xl bg-indigo-50 p-4 text-center">
                    <p className="text-xs font-medium text-slate-500">
                      Verification code sent to
                    </p>

                    <p className="mt-1 break-all text-sm font-bold text-indigo-700">
                      {formData.email}
                    </p>
                  </div>

                  <div className="py-2">
                    <div className="flex justify-center gap-2 sm:gap-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(element) => {
                            otpRefs.current[index] = element;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(e.target.value, index)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          onPaste={index === 0 ? handleOtpPaste : undefined}
                          className={`h-12 w-10 rounded-xl border text-center text-lg font-black outline-none transition sm:h-14 sm:w-12 ${
                            errors.otp
                              ? "border-red-300 bg-red-50"
                              : digit
                                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                : "border-slate-200 bg-white text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                          }`}
                        />
                      ))}
                    </div>

                    {errors.otp && (
                      <p className="mt-3 text-center text-xs font-semibold text-red-500">
                        {errors.otp}
                      </p>
                    )}
                  </div>

                  <div className="text-center">
                    {otpTimer > 0 ? (
                      <p className="text-sm text-slate-500">
                        Resend code in{" "}
                        <span className="font-bold text-indigo-600">
                          {otpTimer}s
                        </span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="cursor-pointer text-sm font-bold text-indigo-600 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Resend verification code
                      </button>
                    )}
                  </div>

                  <SubmitButton
                    loading={loading}
                    text="Verify OTP"
                    loadingText="Verifying..."
                  />
                </>
              )}

              {screen === "reset" && (
                <>
                  <PasswordField
                    name="password"
                    placeholder="New password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />

                  <PasswordField
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    showPassword={showConfirmPassword}
                    setShowPassword={setShowConfirmPassword}
                  />

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-700">
                      Password requirements
                    </p>

                    <div className="mt-2 space-y-1">
                      <p
                        className={`text-xs ${
                          formData.password.length >= 6
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        • At least 6 characters
                      </p>

                      <p
                        className={`text-xs ${
                          formData.password === formData.confirmPassword &&
                          formData.confirmPassword.length > 0
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        • Passwords must match
                      </p>
                    </div>
                  </div>

                  <SubmitButton
                    loading={loading}
                    text="Update password"
                    loadingText="Updating password..."
                  />
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
