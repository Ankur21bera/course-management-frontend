import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Camera,
  Check,
  Edit3,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  getUserProfile,
  updateUserProfile,
} from "../Redux/User/Userslice";

const DEFAULT_PROFILE_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const ProfileField = ({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  type = "text",
  placeholder,
  error,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={18} />
        </div>

        <input
          id={name}
          name={name}
          type={type}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            }
            ${
              disabled
                ? "cursor-not-allowed bg-slate-100 text-slate-500"
                : ""
            }`}
        />
      </div>

      {error && (
        <p className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

const ViewField = ({ label, value, icon: Icon }) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="mb-2 flex items-center gap-2">
        <div className="text-indigo-500">
          <Icon size={17} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
      </div>

      <p className="break-words text-sm font-semibold text-slate-800">
        {value || "Not Provided"}
      </p>
    </div>
  );
};


const Myprofile = () => {
  const dispatch = useDispatch();

  const {
    user,
    profileLoading,
  } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    qualification: "",
    image: DEFAULT_PROFILE_IMAGE,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    qualification: "",
    image: DEFAULT_PROFILE_IMAGE,
  });

  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);

  
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  useEffect(() => {
    if (!user) return;

    let formattedDob = "";

    if (user.dob) {
      const date = new Date(user.dob);

      if (!Number.isNaN(date.getTime())) {
        formattedDob = date.toISOString().split("T")[0];
      }
    }

    const userProfile = {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      gender: user.gender || "",
      dob: formattedDob,
      qualification: user.qualification || "",
      image: user.image || DEFAULT_PROFILE_IMAGE,
    };

    setProfile(userProfile);
    setFormData(userProfile);
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      if (!prev[name]) return prev;

      const updatedErrors = {
        ...prev,
      };

      delete updatedErrors[name];

      return updatedErrors;
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please Select A Valid Image File");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image Size Should Be Less Than 5 MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImageFile(file);

    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }));

    toast.success("Profile Image Selected");
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10 digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const formatDate = (date) => {
    if (!date) return "Not Provided";

    const dateObject = new Date(date);

    if (Number.isNaN(dateObject.getTime())) {
      return date;
    }

    return dateObject.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  const handleSave = async () => {
    const isValid = validateForm();

    if (!isValid) {
      toast.error("Please Fix Highlighted Fields.");
      return;
    }

    try {
      const data = new FormData();

      data.append("name", formData.name.trim());
      data.append("phone", formData.phone.trim());
      data.append("address", formData.address.trim());
      data.append("gender", formData.gender);
      data.append("dob", formData.dob);
      data.append(
        "qualification",
        formData.qualification.trim()
      );

      if (imageFile) {
        data.append("image", imageFile);
      }

      const result = await dispatch(
        updateUserProfile(data)
      ).unwrap();

      toast.success(
        result?.message || "Profile Updated Successfully"
      );

      setEditMode(false);
      setErrors({});
      setImageFile(null);
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed To Update Profile"
      );
    }
  };
  const handleEdit = () => {
    setFormData({
      ...profile,
    });

    setErrors({});
    setImageFile(null);
    setEditMode(true);
  };
  const handleCancel = () => {
    setFormData({
      ...profile,
    });

    setErrors({});
    setImageFile(null);
    setEditMode(false);
  };
  const profileFields = [
    profile.name,
    profile.email,
    profile.phone,
    profile.address,
    profile.gender,
    profile.dob,
    profile.qualification,
    profile.image,
  ];

  const completedFields =
    profileFields.filter(Boolean).length;

  const completionPercentage = Math.round(
    (completedFields / profileFields.length) * 100
  );
  if (profileLoading && !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>

          <p className="mt-4 text-sm font-semibold text-slate-600">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your personal information and account details
            </p>
          </div>

          {!editMode && (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Edit3 size={17} />
              Edit Profile
            </button>
          )}
        </div>
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 px-6 py-8 sm:px-8">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-white/10"></div>

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              {/* Profile Image */}

              <div className="relative mx-auto sm:mx-0">
                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white/80 bg-white shadow-lg sm:h-32 sm:w-32">
                  <img
                    src={
                      editMode
                        ? formData.image || DEFAULT_PROFILE_IMAGE
                        : profile.image || DEFAULT_PROFILE_IMAGE
                    }
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>

                {editMode && (
                  <>
                    <label
                      htmlFor="profileImage"
                      className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-white shadow-md transition hover:bg-indigo-700"
                    >
                      <Camera size={17} />
                    </label>

                    <input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>
              <div className="flex-1 text-center text-white sm:text-left">
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <h2 className="text-2xl font-bold">
                    {profile.name || "User"}
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    <ShieldCheck size={14} />
                    Verified
                  </span>
                </div>

                <div className="mt-3 flex flex-col gap-2 text-sm text-indigo-100 sm:flex-row sm:flex-wrap sm:gap-4">
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <Mail size={15} />
                    <span>{profile.email || "No Email"}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <GraduationCap size={15} />
                    <span>
                      {profile.qualification ||
                        "Qualification Not Provided"}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <MapPin size={15} />
                    <span>
                      {profile.address ||
                        "Address Not Provided"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

   
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <User size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Personal Information
                    </h3>

                    <p className="text-xs text-slate-500">
                      Your personal account information
                    </p>
                  </div>
                </div>
              </div>

          

              <div className="p-6">

                {!editMode ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <ViewField
                      label="Full Name"
                      value={profile.name}
                      icon={User}
                    />

                    <ViewField
                      label="Email Address"
                      value={profile.email}
                      icon={Mail}
                    />

                    <ViewField
                      label="Phone Number"
                      value={profile.phone}
                      icon={Phone}
                    />

                    <ViewField
                      label="Gender"
                      value={profile.gender}
                      icon={User}
                    />

                    <ViewField
                      label="Date Of Birth"
                      value={formatDate(profile.dob)}
                      icon={CalendarDays}
                    />

                    <ViewField
                      label="Qualification"
                      value={profile.qualification}
                      icon={GraduationCap}
                    />

                    <div className="sm:col-span-2">
                      <ViewField
                        label="Address"
                        value={profile.address}
                        icon={MapPin}
                      />
                    </div>

                  </div>
                ) : (
                  <div className="space-y-6">

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                      <ProfileField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        icon={User}
                        placeholder="Enter your full name"
                        error={errors.name}
                      />

                      <ProfileField
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        icon={Mail}
                        placeholder="Your email address"
                        disabled={true}
                        error={errors.email}
                      />

                      <ProfileField
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        icon={Phone}
                        placeholder="Enter 10 digit phone number"
                        error={errors.phone}
                      />
                      <div className="space-y-2">
                        <label
                          htmlFor="gender"
                          className="block text-sm font-semibold text-slate-700"
                        >
                          Gender
                        </label>

                        <div className="relative">
                          <User
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <select
                            id="gender"
                            name="gender"
                            value={formData.gender || ""}
                            onChange={handleChange}
                            className={`w-full appearance-none rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all ${
                              errors.gender
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            }`}
                          >
                            <option value="">
                              Select Gender
                            </option>
                            <option value="Male">
                              Male
                            </option>
                            <option value="Female">
                              Female
                            </option>
                            <option value="Other">
                              Other
                            </option>
                          </select>
                        </div>

                        {errors.gender && (
                          <p className="text-xs font-medium text-red-500">
                            {errors.gender}
                          </p>
                        )}
                      </div>

                      <ProfileField
                        label="Date Of Birth"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        icon={CalendarDays}
                        error={errors.dob}
                      />

                      <ProfileField
                        label="Qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        icon={GraduationCap}
                        placeholder="e.g. B.Com"
                        error={errors.qualification}
                      />
                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-slate-700"
                        >
                          Address
                        </label>
                        <div className="relative">
                          <MapPin
                            size={18}
                            className="absolute left-3 top-3 text-slate-400"
                          />
                          <textarea
                            id="address"
                            name="address"
                            value={formData.address || ""}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            rows={4}
                            className={`w-full resize-none rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all ${
                              errors.address
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            }`}
                          />
                        </div>
                        {errors.address && (
                          <p className="text-xs font-medium text-red-500">
                            {errors.address}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={profileLoading}
                        className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <X size={17} />
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleSave}
                        disabled={profileLoading}
                        className="inline-flex items-center justify-center cursor-pointer gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {profileLoading ? (
                          <>
                            <span className="h-4 w-4 cursor-pointer animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={17} />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Account Status
                  </h3>

                  <p className="text-xs text-slate-500">
                    Your account security
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
                <div>
                  <p className="text-sm font-bold text-emerald-700">
                    Active
                  </p>

                  <p className="mt-1 text-xs text-emerald-600">
                    Your account is active
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check size={17} />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h3 className="font-bold text-slate-900">
                  Profile Completion
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Keep your profile updated
                </p>
              </div>

              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">
                  Completion
                </span>

                <span className="text-sm font-bold text-indigo-600">
                  {completionPercentage}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                  style={{
                    width: `${completionPercentage}%`,
                  }}
                ></div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {completionPercentage === 100
                  ? "Your profile is complete."
                  : "Complete your profile to improve your account information."}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h3 className="font-bold text-slate-900">
                  Quick Information
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Basic account details
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Phone size={16} />
                    </div>
                    <span className="text-sm text-slate-500">
                      Phone
                    </span>
                  </div>
                  <span className="max-w-[150px] truncate text-right text-sm font-semibold text-slate-800">
                    {profile.phone || "Not Provided"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <User size={16} />
                    </div>
                    <span className="text-sm text-slate-500">
                      Gender
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {profile.gender || "Not Provided"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <CalendarDays size={16} />
                    </div>
                    <span className="text-sm text-slate-500">
                      DOB
                    </span>
                  </div>
                  <span className="text-right text-sm font-semibold text-slate-800">
                    {formatDate(profile.dob)}
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-indigo-900">
                    Your Privacy Matters
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-indigo-700">
                    Your personal information is securely
                    stored and only used for account-related
                    services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;