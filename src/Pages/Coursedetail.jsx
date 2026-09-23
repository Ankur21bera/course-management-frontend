// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// import { useDispatch, useSelector } from "react-redux";

// import {
//   getPublicCourses,
//   getAllBookings,
//   BookCourse,
//   updateBooking,
// } from "../Redux/User/Userslice";

// import {
//   ArrowLeft,
//   BookOpen,
//   CalendarDays,
//   CheckCircle2,
//   Clock3,
//   GraduationCap,
//   Monitor,
//   Star,
//   User,
//   X,
// } from "lucide-react";

// const Coursedetail = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { courseId } = useParams();

//   const [openModal, setOpenModal] = useState(false);
//   const [courseSlots, setCourseSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");
//   const [selectedMode, setSelectedMode] = useState("Live Online");
//   const [holidays, setHolidays] = useState([]);

//   const { publicCourses, bookings, bookingLoading } = useSelector(
//     (state) => state.user,
//   );

//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//   useEffect(() => {
//     if (!publicCourses || publicCourses.length === 0) {
//       dispatch(getPublicCourses());
//     }
//   }, [dispatch, publicCourses]);
//   useEffect(() => {
//     dispatch(getAllBookings());
//   }, [dispatch]);

//   const courseInfo = useMemo(() => {
//     return publicCourses.find(
//       (course) => String(course._id) === String(courseId),
//     );
//   }, [publicCourses, courseId]);

//   const existingBooking = useMemo(() => {
//     if (!courseInfo || !bookings || bookings.length === 0) {
//       return null;
//     }

//     return (
//       bookings.find((booking) => {
//         const bookingCourseId =
//           typeof booking.courseId === "object"
//             ? booking.courseId?._id
//             : booking.courseId;

//         return (
//           String(bookingCourseId) === String(courseInfo._id) &&
//           !booking.cancelled &&
//           !booking.isCompleted
//         );
//       }) || null
//     );
//   }, [bookings, courseInfo]);

//   const relatedCourses = useMemo(() => {
//     if (!courseInfo) return [];

//     return publicCourses
//       .filter(
//         (course) =>
//           course.category === courseInfo.category &&
//           String(course._id) !== String(courseInfo._id),
//       )
//       .slice(0, 3);
//   }, [publicCourses, courseInfo]);

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, [courseId]);

//   useEffect(() => {
//     const fetchHolidays = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:4000/api/admin/holidays",
//         );

//         if (!response.ok) {
//           throw new Error("Failed To Fetch Holidays");
//         }

//         const data = await response.json();

//         if (data.success) {
//           setHolidays(data.holidays || []);
//         }
//       } catch (error) {
//         console.log("Failed To Fetch Data", error);
//       }
//     };

//     fetchHolidays();
//   }, []);

//   const getAvailableSlots = () => {
//     const today = new Date();

//     const slots = [];

//     const allSlots = [
//       {
//         start: 10,
//         end: 12,
//         label: "10:30 AM - 12:30 PM",
//       },
//       {
//         start: 14,
//         end: 16,
//         label: "02:00 PM - 04:00 PM",
//       },
//       {
//         start: 16,
//         end: 18,
//         label: "04:00 PM - 06:00 PM",
//       },
//       {
//         start: 18,
//         end: 20,
//         label: "06:00 PM - 08:00 PM",
//       },
//     ];

//     for (let i = 0; i < 7; i++) {
//       const currentDate = new Date(today);

//       currentDate.setDate(today.getDate() + i);

//       const formattedDate = currentDate.toISOString().split("T")[0];

//       const holiday = holidays.find((item) => item.date === formattedDate);

//       if (holiday) {
//         slots.push([
//           {
//             isHoliday: true,
//             reason: holiday.reason,
//             dateTime: currentDate,
//           },
//         ]);

//         continue;
//       }

//       if (currentDate.getDay() === 0) {
//         slots.push([
//           {
//             isOff: true,
//             dateTime: currentDate,
//           },
//         ]);

//         continue;
//       }

//       const daySlots = [];

//       const now = new Date();
//       const currentHour = now.getHours();

//       allSlots.forEach((slot) => {
//         if (i === 0 && currentHour >= slot.end) {
//           return;
//         }

//         daySlots.push({
//           dateTime: new Date(currentDate),
//           time: slot.label,
//         });
//       });

//       slots.push(daySlots);
//     }

//     setCourseSlots(slots);
//   };

//   useEffect(() => {
//     getAvailableSlots();
//   }, [holidays]);
//   useEffect(() => {
//     setSlotTime("");
//   }, [slotIndex]);
//   const selectedDay = courseSlots[slotIndex];
//   const selectedDate = selectedDay?.[0]?.dateTime
//     ? selectedDay[0].dateTime.toISOString().split("T")[0]
//     : "";


// const handleBooking = async () => {
 
//   const userToken = sessionStorage.getItem("userToken");

//   if (!userToken) {
//     toast.error("Please Login First Before Booking");

//     setTimeout(() => {
//       navigate("/login");
//     }, 800);

//     return;
//   }

  
//   if (!selectedDate) {
//     toast.error("Please Select Date");
//     return;
//   }

 
//   if (!slotTime) {
//     toast.error("Please Select Time Slot");
//     return;
//   }


//   if (!courseInfo) {
//     toast.error("Course Information Not Found");
//     return;
//   }

  
//   const bookingData = {
//     courseId: courseInfo._id,
//     slotDate: selectedDate,
//     slotTime: slotTime,
//     paymentMode: "online",
//   };

//   try {
//     const result = await dispatch(
//       BookCourse(bookingData)
//     ).unwrap();

//     setOpenModal(false);

//     toast.success(
//       result?.message || "Course Booked Successfully"
//     );

//     navigate("/my-booking");
//   } catch (error) {
//     toast.error(
//       error || "Failed To Book The Course"
//     );
//   }
// };



//   const handleUpdateBooking = async () => {
//     if (!existingBooking?._id) {
//       toast.error("Existing Booking Not Found");
//       return;
//     }

//     if (!selectedDate) {
//       toast.error("Please Select Date");
//       return;
//     }

//     if (!slotTime) {
//       toast.error("Please Select Time Slot");
//       return;
//     }

//     const bookingData = {
//       appointmentId: existingBooking._id,
//       slotDate: selectedDate,
//       slotTime: slotTime,
//     };

//     try {
//       const result = await dispatch(updateBooking(bookingData)).unwrap();

//       setOpenModal(false);

//       toast.success(result?.message || "Booking Updated Successfully");

//       navigate("/my-booking");
//     } catch (error) {
//       toast.error(error || "Failed To Update Booking");
//     }
//   };

//   const handleOpenBookingModal = () => {
//     if (!selectedDate) {
//       toast.error("Please Select Date");
//       return;
//     }

//     if (!slotTime) {
//       toast.error("Please Select Time Slot");
//       return;
//     }

//     setOpenModal(true);
//   };
//   if (!courseInfo) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
//         <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-5">
//           <BookOpen className="w-10 h-10 text-indigo-600" />
//         </div>

//         <h2 className="text-2xl font-bold text-slate-900">Course Not Found</h2>

//         <p className="text-slate-500 mt-2 text-center">
//           The course you are looking for does not exist.
//         </p>

//         <button
//           onClick={() => navigate("/course")}
//           className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
//         >
//           <ArrowLeft size={18} />
//           Back To Course
//         </button>
//       </div>
//     );
//   }

//   const courseImage = courseInfo.image;

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
//         <button
//           onClick={() => navigate("/course")}
//           className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition mb-6 cursor-pointer"
//         >
//           <ArrowLeft size={18} />
//           Back To Courses
//         </button>

//         <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
//           <div className="relative h-[260px] sm:h-[360px] lg:h-[430px]">
//             <img
//               className="w-full h-full object-cover"
//               src={courseImage}
//               alt=""
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

//             <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
//               <div className="flex flex-wrap gap-2 mb-4">
//                 <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold cursor-pointer">
//                   {courseInfo.category}
//                 </span>

//                 <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold cursor-pointer">
//                   {courseInfo.level}
//                 </span>
//               </div>

//               <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-4xl leading-tight">
//                 {courseInfo.title}
//               </h1>

//               <div className="flex flex-wrap items-center gap-4 mt-5 text-white/90 text-sm">
//                 <div className="flex items-center gap-2">
//                   <Star size={17} className="fill-yellow-400 text-yellow-400" />
//                   <span>4.9 Rating</span>
//                 </div>

//                 <div className="w-1 h-1 rounded-full bg-white/50" />

//                 <div className="flex items-center gap-2">
//                   <GraduationCap size={17} />
//                   <span>Industry Ready</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-8">
//             <div className="rounded-2xl bg-green-50 border border-green-100 p-5">
//               <p className="text-xs uppercase tracking-wide font-semibold text-green-700">
//                 Course Fees
//               </p>

//               <p className="text-3xl font-extrabold text-green-600 mt-2">
//                 ₹{courseInfo.price}
//               </p>
//             </div>

//             <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-5">
//               <p className="text-xs uppercase tracking-wide font-semibold text-indigo-700">
//                 Duration
//               </p>

//               <div className="flex items-center gap-2 mt-2">
//                 <Clock3 className="text-indigo-600" size={20} />

//                 <p className="text-lg font-bold text-slate-900">
//                   {courseInfo.duration}
//                 </p>
//               </div>
//             </div>

//             <div className="rounded-2xl bg-orange-50 border border-orange-100 p-5">
//               <p className="text-xs uppercase tracking-wide font-semibold text-orange-700">
//                 Level
//               </p>

//               <div className="flex items-center gap-2 mt-2">
//                 <GraduationCap size={20} className="text-orange-600" />

//                 <p className="text-sm sm:text-base font-bold text-slate-900">
//                   {courseInfo.level}
//                 </p>
//               </div>
//             </div>

//             <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
//               <p className="text-xs uppercase tracking-wide font-semibold text-blue-700">
//                 Learning Mode
//               </p>

//               <div className="flex items-center gap-2 mt-2">
//                 <Monitor className="text-blue-500" size={20} />

//                 <select
//                   className="bg-transparent outline-none text-sm sm:text-base font-bold text-slate-900 cursor-pointer w-full"
//                   value={selectedMode}
//                   onChange={(e) => setSelectedMode(e.target.value)}
//                 >
//                   <option>Live Online</option>
//                   <option>Offline Class</option>
//                   <option>Hybrid</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
//               <div className="flex items-center gap-3 mb-5">
//                 <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
//                   <BookOpen className="text-indigo-600" size={22} />
//                 </div>

//                 <div>
//                   <p className="text-xs uppercase tracking-wide text-indigo-600 font-bold">
//                     About Course
//                   </p>

//                   <p className="text-2xl font-extrabold text-slate-900">
//                     What Will You Learn
//                   </p>
//                 </div>
//               </div>

//               <p className="text-slate-600 leading-7">{courseInfo.about}</p>
//             </div>

//             <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
//                   <GraduationCap className="text-purple-600" size={22} />
//                 </div>

//                 <div>
//                   <p className="text-xs uppercase tracking-wide text-purple-600 font-bold">
//                     Course Curriculum
//                   </p>

//                   <h2 className="text-2xl font-extrabold text-slate-900">
//                     Course Modules
//                   </h2>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 {(courseInfo.subjects || []).map((module, index) => (
//                   <div
//                     className="flex items-center cursor-pointer gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition"
//                     key={index}
//                   >
//                     <div className="w-9 h-9 cursor-pointer shrink-0 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
//                       {index + 1}
//                     </div>

//                     <p className="font-semibold text-slate-800">{module}</p>

//                     <CheckCircle2
//                       className="ml-auto text-green-500 shrink-0"
//                       size={19}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
//                   <User className="text-emerald-600" size={22} />
//                 </div>

//                 <div>
//                   <p className="text-xs uppercase tracking-wide text-emerald-600 font-bold">
//                     Your Instructor
//                   </p>

//                   <h2 className="text-2xl font-extrabold text-slate-900">
//                     Meet Your Mentor
//                   </h2>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
//                 <img
//                   className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md"
//                   src={courseInfo.mentor?.image}
//                   alt=""
//                 />

//                 <div className="text-center sm:text-left">
//                   <h3 className="text-xl font-extrabold text-slate-900">
//                     {courseInfo.mentor?.name}
//                   </h3>

//                   <p className="text-indigo-600 font-semibold mt-1">
//                     {courseInfo.mentor?.role}
//                   </p>

//                   <p className="text-sm text-slate-500 mt-3 max-w-xl">
//                     Learn directly from an experienced industry professional
//                     with practical knowledge and real-world experience.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="lg:sticky lg:top-24">
//               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
//                 <div className="p-6 bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
//                   <p className="text-sm text-indigo-100 font-medium">
//                     {existingBooking
//                       ? "Manage Your Booking"
//                       : "Start Learning Today"}
//                   </p>

//                   <h2 className="text-2xl font-extrabold mt-1">
//                     {existingBooking ? "Update Your Batch" : "Book Your Batch"}
//                   </h2>

//                   <div className="flex items-center gap-2 mt-4">
//                     <CalendarDays size={18} />

//                     <span className="text-sm">Choose Your Preferred Date</span>
//                   </div>
//                 </div>

//                 <div className="p-5 sm:p-6">
//                   {existingBooking && (
//                     <div className="mb-5 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
//                       <div className="flex items-center gap-2">
//                         <CheckCircle2 size={18} className="text-indigo-600" />

//                         <p className="font-bold text-indigo-700">
//                           You Already Have a Booking
//                         </p>
//                       </div>

//                       <p className="text-xs text-indigo-600 mt-2">
//                         Select a new date and time below to update your booking.
//                       </p>

//                       <div className="mt-3 space-y-1 text-xs text-slate-600">
//                         <p>
//                           Current Date:{" "}
//                           <span className="font-bold">
//                             {existingBooking.slotDate}
//                           </span>
//                         </p>

//                         <p>
//                           Current Time:{" "}
//                           <span className="font-bold">
//                             {existingBooking.slotTime}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//                     {courseSlots.map((item, index) => {
//                       const day = item?.[0];

//                       if (!day) return null;

//                       return (
//                         <button
//                           className={`min-w-[68px] rounded-2xl border px-3 py-3 text-center transition cursor-pointer ${
//                             day.isHoliday
//                               ? "bg-red-50 border-red-200 text-red-600"
//                               : slotIndex === index
//                                 ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
//                                 : "bg-white border-slate-200 text-slate-700 hover:border-indigo-300"
//                           }`}
//                           key={index}
//                           onClick={() => {
//                             setSlotIndex(index);
//                             setSlotTime("");
//                           }}
//                         >
//                           <p className="text-[11px] font-bold">
//                             {daysOfWeek[day.dateTime.getDay()]}
//                           </p>

//                           <p className="text-xl font-extrabold mt-1">
//                             {day.dateTime.getDate()}
//                           </p>

//                           <p>
//                             {day.dateTime.toLocaleString("default", {
//                               month: "short",
//                             })}
//                           </p>
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {selectedDay?.[0]?.isHoliday ? (
//                     <div className="mt-5 p-5 rounded-2xl bg-red-50 border border-red-100 text-center">
//                       <div className="w-10 h-10 mx-auto rounded-full bg-red-100 flex items-center justify-center">
//                         <X className="text-red-600 cursor-pointer" size={20} />
//                       </div>

//                       <p className="font-bold text-red-700 mt-3">
//                         Booking Closed
//                       </p>

//                       <p className="text-sm text-red-500 mt-1">
//                         {selectedDay[0].reason}
//                       </p>
//                     </div>
//                   ) : selectedDay?.[0]?.isOff ? (
//                     <div className="mt-5 p-5 rounded-2xl bg-slate-100 border border-slate-200 text-center">
//                       <p className="font-bold text-slate-700">Sunday Is Off</p>

//                       <p className="text-sm text-slate-500 mt-1">
//                         Please Select Another Date
//                       </p>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="mt-6">
//                         <div className="flex items-center justify-between mb-3">
//                           <p className="font-bold text-slate-900">
//                             Available Time
//                           </p>

//                           <Clock3 className="text-slate-400" size={17} />
//                         </div>

//                         <div className="grid grid-cols-1 gap-2">
//                           {selectedDay?.map((item, index) => (
//                             <button
//                               className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold transition cursor-pointer ${
//                                 slotTime === item.time
//                                   ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
//                                   : "bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600"
//                               }`}
//                               onClick={() => setSlotTime(item.time)}
//                               key={index}
//                             >
//                               {item.time}
//                             </button>
//                           ))}
//                         </div>
//                       </div>

//                       {slotTime && (
//                         <div className="mt-5 rounded-2xl bg-indigo-50 border border-indigo-100 p-4">
//                           <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
//                             Your Selection
//                           </p>

//                           <div className="mt-3 space-y-2 text-sm">
//                             <div className="flex justify-between gap-3">
//                               <span className="text-slate-500">Date</span>

//                               <span className="font-bold text-slate-800">
//                                 {selectedDate}
//                               </span>
//                             </div>

//                             <div className="flex justify-between gap-3">
//                               <span className="text-slate-500">Time</span>

//                               <span className="font-bold text-slate-800 text-right">
//                                 {slotTime}
//                               </span>
//                             </div>

//                             <div className="flex justify-between gap-3">
//                               <span className="text-slate-500">Mode</span>

//                               <span className="font-bold text-slate-800">
//                                 {selectedMode}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       )}

                
//                       <button
//                         onClick={handleOpenBookingModal}
//                         disabled={!slotTime || bookingLoading}
//                         className={`w-full mt-6 py-4 rounded-2xl font-bold text-white transition ${
//                           slotTime && !bookingLoading
//                             ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 cursor-pointer"
//                             : "bg-slate-300 cursor-not-allowed"
//                         }`}
//                       >
//                         {bookingLoading
//                           ? existingBooking
//                             ? "Updating..."
//                             : "Booking..."
//                           : slotTime
//                             ? existingBooking
//                               ? "Update Your Booking"
//                               : "Book Your Course"
//                             : "Select Time Slot"}
//                       </button>

//                       <p className="text-center text-xs text-slate-400 mt-4">
//                         {existingBooking
//                           ? "Change your preferred date or time slot."
//                           : "Secure your seat before slots fill up."}
//                       </p>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {relatedCourses.length > 0 && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
//           <div className="mb-6">
//             <p className="text-sm font-bold text-indigo-600 uppercase tracking-wide">
//               You May Also Like
//             </p>

//             <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
//               Related Courses
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {relatedCourses.map((course) => (
//               <div
//                 className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
//                 key={course._id}
//               >
//                 <img
//                   className="w-full h-48 object-cover cursor-pointer"
//                   src={course.image}
//                   alt=""
//                 />

//                 <div className="p-5">
//                   <div className="flex items-center justify-between gap-3">
//                     <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
//                       {course.category}
//                     </span>

//                     <span className="font-extrabold text-green-600">
//                       ₹{course.price}
//                     </span>
//                   </div>

//                   <h3 className="font-extrabold text-lg text-slate-900 mt-4 line-clamp-2">
//                     {course.title}
//                   </h3>

//                   <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
//                     <span className="flex items-center gap-1">
//                       <Clock3 size={15} />
//                       {course.duration}
//                     </span>

//                     <span className="flex items-center gap-1">
//                       <GraduationCap size={15} />
//                       {course.level}
//                     </span>
//                   </div>

//                   <button
//                     className="w-full mt-5 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition cursor-pointer"
//                     onClick={() => navigate(`/booking/${course._id}`)}
//                   >
//                     View Course
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//       {openModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div
//             onClick={() => {
//               if (!bookingLoading) {
//                 setOpenModal(false);
//               }
//             }}
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//           />

//           <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
//             {/* MODAL HEADER */}

//             <div className="flex items-center justify-between p-6 border-b border-slate-100">
//               <div>
//                 <p className="text-xs uppercase tracking-wide text-indigo-600 font-bold">
//                   {existingBooking ? "Update Booking" : "Confirm Booking"}
//                 </p>

//                 <h2 className="text-xl font-extrabold text-slate-900 mt-1">
//                   {existingBooking
//                     ? "Review Booking Changes"
//                     : "Review Your Booking"}
//                 </h2>
//               </div>

//               <button
//                 className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
//                 onClick={() => setOpenModal(false)}
//                 disabled={bookingLoading}
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* MODAL CONTENT */}

//             <div className="p-6">
//               <div className="flex items-center gap-4 mb-6">
//                 <img
//                   className="w-20 h-20 rounded-2xl object-cover"
//                   src={courseInfo.image}
//                   alt=""
//                 />

//                 <div>
//                   <h3 className="font-extrabold text-slate-900">
//                     {courseInfo.title}
//                   </h3>

//                   <p className="text-sm text-slate-500 mt-1">
//                     {courseInfo.mentor?.name}
//                   </p>

//                   {existingBooking && (
//                     <p className="text-xs text-indigo-600 font-semibold mt-2">
//                       Existing Booking
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex justify-between gap-4 p-4 rounded-2xl bg-slate-50">
//                   <span className="text-slate-500">Date</span>

//                   <span className="font-bold text-slate-900">
//                     {selectedDate}
//                   </span>
//                 </div>

//                 <div className="flex justify-between gap-4 p-4 rounded-2xl bg-slate-50">
//                   <span className="text-slate-500">Time</span>

//                   <span className="font-bold text-slate-900 text-right">
//                     {slotTime}
//                   </span>
//                 </div>

//                 <div className="flex justify-between gap-4 p-4 rounded-2xl bg-slate-50">
//                   <span className="text-slate-500">Mode</span>

//                   <span className="font-bold text-slate-900">
//                     {selectedMode}
//                   </span>
//                 </div>

//                 <div className="flex justify-between gap-4 p-4 rounded-2xl bg-green-50 border border-green-100">
//                   <span className="font-semibold text-green-700">
//                     Course Fees
//                   </span>

//                   <span className="font-extrabold text-green-600">
//                     ₹{courseInfo.price}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* MODAL FOOTER */}

//             <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-slate-100">
//               <button
//                 className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition cursor-pointer"
//                 onClick={() => setOpenModal(false)}
//                 disabled={bookingLoading}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="flex-1 py-3.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition cursor-pointer disabled:bg-indigo-400 disabled:cursor-not-allowed"
//                 onClick={existingBooking ? handleUpdateBooking : handleBooking}
//                 disabled={bookingLoading}
//               >
//                 {bookingLoading
//                   ? existingBooking
//                     ? "Updating..."
//                     : "Confirming..."
//                   : existingBooking
//                     ? "Confirm Update"
//                     : "Confirm Booking"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Coursedetail;

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";

import {
  getPublicCourses,
  getAllBookings,
  BookCourse,
  updateBooking,
} from "../Redux/User/Userslice";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Monitor,
  Star,
  User,
  X,
} from "lucide-react";

const Coursedetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseId } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [courseSlots, setCourseSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [selectedMode, setSelectedMode] = useState("Live Online");
  const [holidays, setHolidays] = useState([]);

  const { publicCourses, bookings, bookingLoading } = useSelector(
    (state) => state.user,
  );

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  /* =========================================================
     NORMALIZE DATE
  ========================================================= */

  const normalizeDate = (dateValue) => {
    if (!dateValue) return "";

    if (dateValue instanceof Date) {
      if (Number.isNaN(dateValue.getTime())) {
        return "";
      }

      const year = dateValue.getFullYear();
      const month = String(dateValue.getMonth() + 1).padStart(2, "0");
      const day = String(dateValue.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    const value = String(dateValue).trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }

    const match = value.match(/^(\d{4}-\d{2}-\d{2})/);

    if (match) {
      return match[1];
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* =========================================================
     GET PUBLIC COURSES
  ========================================================= */

  useEffect(() => {
    if (!publicCourses || publicCourses.length === 0) {
      dispatch(getPublicCourses());
    }
  }, [dispatch, publicCourses]);

  /* =========================================================
     GET ALL BOOKINGS
  ========================================================= */

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  /* =========================================================
     COURSE INFO
  ========================================================= */

  const courseInfo = useMemo(() => {
    return publicCourses.find(
      (course) => String(course._id) === String(courseId),
    );
  }, [publicCourses, courseId]);

  /* =========================================================
     EXISTING BOOKING
  ========================================================= */

  const existingBooking = useMemo(() => {
    if (!courseInfo || !bookings || bookings.length === 0) {
      return null;
    }

    return (
      bookings.find((booking) => {
        const bookingCourseId =
          typeof booking.courseId === "object"
            ? booking.courseId?._id
            : booking.courseId;

        return (
          String(bookingCourseId) === String(courseInfo._id) &&
          !booking.cancelled &&
          !booking.isCompleted
        );
      }) || null
    );
  }, [bookings, courseInfo]);

  /* =========================================================
     RELATED COURSES
  ========================================================= */

  const relatedCourses = useMemo(() => {
    if (!courseInfo) return [];

    return publicCourses
      .filter(
        (course) =>
          course.category === courseInfo.category &&
          String(course._id) !== String(courseInfo._id),
      )
      .slice(0, 3);
  }, [publicCourses, courseInfo]);

  /* =========================================================
     SCROLL TOP
  ========================================================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [courseId]);

  /* =========================================================
     GET HOLIDAYS
  ========================================================= */

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/user/holidays",
        );

        if (!response.ok) {
          throw new Error("Failed To Fetch Holidays");
        }

        const data = await response.json();

        if (data.success) {
          setHolidays(data.holidays || []);
        }
      } catch (error) {
        console.log("Failed To Fetch Holidays", error);
      }
    };

    fetchHolidays();
  }, []);

  /* =========================================================
     GET AVAILABLE SLOTS
  ========================================================= */

  const getAvailableSlots = () => {
    const today = new Date();

    const slots = [];

    const allSlots = [
      {
        start: 10,
        end: 12,
        label: "10:30 AM - 12:30 PM",
      },
      {
        start: 14,
        end: 16,
        label: "02:00 PM - 04:00 PM",
      },
      {
        start: 16,
        end: 18,
        label: "04:00 PM - 06:00 PM",
      },
      {
        start: 18,
        end: 20,
        label: "06:00 PM - 08:00 PM",
      },
    ];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);

      currentDate.setHours(0, 0, 0, 0);
      currentDate.setDate(today.getDate() + i);

      const formattedDate = normalizeDate(currentDate);

      const holiday = holidays.find(
        (item) => normalizeDate(item?.date) === formattedDate,
      );

      /* =====================================================
         HOLIDAY
      ===================================================== */

      if (holiday) {
        slots.push([
          {
            isHoliday: true,
            reason: holiday.reason || "Holiday",
            dateTime: new Date(currentDate),
          },
        ]);

        continue;
      }

      /* =====================================================
         SUNDAY
      ===================================================== */

      if (currentDate.getDay() === 0) {
        slots.push([
          {
            isOff: true,
            dateTime: new Date(currentDate),
          },
        ]);

        continue;
      }

      /* =====================================================
         NORMAL DAY
      ===================================================== */

      const daySlots = [];

      const now = new Date();
      const currentHour = now.getHours();

      allSlots.forEach((slot) => {
        if (i === 0 && currentHour >= slot.end) {
          return;
        }

        daySlots.push({
          dateTime: new Date(currentDate),
          time: slot.label,
        });
      });

      slots.push(daySlots);
    }

    setCourseSlots(slots);
  };

  useEffect(() => {
    getAvailableSlots();
  }, [holidays]);

  /* =========================================================
     RESET SLOT TIME WHEN DATE CHANGES
  ========================================================= */

  useEffect(() => {
    setSlotTime("");
  }, [slotIndex]);

  /* =========================================================
     SELECTED DAY
  ========================================================= */

  const selectedDay = courseSlots[slotIndex];

  /* =========================================================
     SELECTED DATE
  ========================================================= */

  const selectedDate = selectedDay?.[0]?.dateTime
    ? normalizeDate(selectedDay[0].dateTime)
    : "";

  /* =========================================================
     SELECTED HOLIDAY
  ========================================================= */

  const selectedHoliday = useMemo(() => {
    if (!selectedDate || !Array.isArray(holidays)) {
      return null;
    }

    return (
      holidays.find(
        (holiday) => normalizeDate(holiday?.date) === selectedDate,
      ) || null
    );
  }, [holidays, selectedDate]);

  const isSelectedDateHoliday =
    Boolean(selectedDay?.[0]?.isHoliday) || Boolean(selectedHoliday);

  const selectedHolidayReason =
    selectedDay?.[0]?.reason ||
    selectedHoliday?.reason ||
    "Holiday";

  /* =========================================================
     HANDLE BOOKING
  ========================================================= */

  const handleBooking = async () => {
    const userToken = sessionStorage.getItem("userToken");

    if (!userToken) {
      toast.error("Please Login First Before Booking");

      setTimeout(() => {
        navigate("/login");
      }, 800);

      return;
    }

    if (isSelectedDateHoliday) {
      toast.error(`Booking Closed Due To ${selectedHolidayReason}`);
      return;
    }

    if (!selectedDate) {
      toast.error("Please Select Date");
      return;
    }

    if (!slotTime) {
      toast.error("Please Select Time Slot");
      return;
    }

    if (!courseInfo) {
      toast.error("Course Information Not Found");
      return;
    }

    const bookingData = {
      courseId: courseInfo._id,
      slotDate: selectedDate,
      slotTime: slotTime,
      paymentMode: "online",
    };

    try {
      const result = await dispatch(
        BookCourse(bookingData),
      ).unwrap();

      setOpenModal(false);

      toast.success(
        result?.message || "Course Booked Successfully",
      );

      navigate("/my-booking");
    } catch (error) {
      toast.error(
        error || "Failed To Book The Course",
      );
    }
  };

  /* =========================================================
     HANDLE UPDATE BOOKING
  ========================================================= */

  const handleUpdateBooking = async () => {
    if (isSelectedDateHoliday) {
      toast.error(`Booking Closed Due To ${selectedHolidayReason}`);
      return;
    }

    if (!existingBooking?._id) {
      toast.error("Existing Booking Not Found");
      return;
    }

    if (!selectedDate) {
      toast.error("Please Select Date");
      return;
    }

    if (!slotTime) {
      toast.error("Please Select Time Slot");
      return;
    }

    const bookingData = {
      appointmentId: existingBooking._id,
      slotDate: selectedDate,
      slotTime: slotTime,
    };

    try {
      const result = await dispatch(
        updateBooking(bookingData),
      ).unwrap();

      setOpenModal(false);

      toast.success(
        result?.message || "Booking Updated Successfully",
      );

      navigate("/my-booking");
    } catch (error) {
      toast.error(
        error || "Failed To Update Booking",
      );
    }
  };

  /* =========================================================
     OPEN BOOKING MODAL
  ========================================================= */

  const handleOpenBookingModal = () => {
    if (isSelectedDateHoliday) {
      toast.error(`Booking Closed Due To ${selectedHolidayReason}`);
      return;
    }

    if (!selectedDate) {
      toast.error("Please Select Date");
      return;
    }

    if (!slotTime) {
      toast.error("Please Select Time Slot");
      return;
    }

    setOpenModal(true);
  };

  /* =========================================================
     COURSE NOT FOUND
  ========================================================= */

  if (!courseInfo) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-5">
          <BookOpen className="w-10 h-10 text-indigo-600" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          Course Not Found
        </h2>

        <p className="text-slate-500 mt-2 text-center">
          The course you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/course")}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back To Course
        </button>
      </div>
    );
  }

  const courseImage = courseInfo.image;

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <button
          onClick={() => navigate("/course")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition mb-6 cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back To Courses
        </button>

        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="relative h-[260px] sm:h-[360px] lg:h-[430px]">
            <img
              className="w-full h-full object-cover"
              src={courseImage}
              alt=""
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold cursor-pointer">
                  {courseInfo.category}
                </span>

                <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold cursor-pointer">
                  {courseInfo.level}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-4xl leading-tight">
                {courseInfo.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-5 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Star
                    size={17}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span>4.9 Rating</span>
                </div>

                <div className="w-1 h-1 rounded-full bg-white/50" />

                <div className="flex items-center gap-2">
                  <GraduationCap size={17} />

                  <span>Industry Ready</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-8">
            <div className="rounded-2xl bg-green-50 border border-green-100 p-5">
              <p className="text-xs uppercase tracking-wide font-semibold text-green-700">
                Course Fees
              </p>

              <p className="text-3xl font-extrabold text-green-600 mt-2">
                ₹{courseInfo.price}
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-5">
              <p className="text-xs uppercase tracking-wide font-semibold text-indigo-700">
                Duration
              </p>

              <div className="flex items-center gap-2 mt-2">
                <Clock3
                  className="text-indigo-600"
                  size={20}
                />

                <p className="text-lg font-bold text-slate-900">
                  {courseInfo.duration}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-orange-50 border border-orange-100 p-5">
              <p className="text-xs uppercase tracking-wide font-semibold text-orange-700">
                Level
              </p>

              <div className="flex items-center gap-2 mt-2">
                <GraduationCap
                  size={20}
                  className="text-orange-600"
                />

                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {courseInfo.level}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
              <p className="text-xs uppercase tracking-wide font-semibold text-blue-700">
                Learning Mode
              </p>

              <div className="flex items-center gap-2 mt-2">
                <Monitor
                  className="text-blue-500"
                  size={20}
                />

                <select
                  className="bg-transparent outline-none text-sm sm:text-base font-bold text-slate-900 cursor-pointer w-full"
                  value={selectedMode}
                  onChange={(e) =>
                    setSelectedMode(e.target.value)
                  }
                >
                  <option>Live Online</option>
                  <option>Offline Class</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <BookOpen
                    className="text-indigo-600"
                    size={22}
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-indigo-600 font-bold">
                    About Course
                  </p>

                  <p className="text-2xl font-extrabold text-slate-900">
                    What Will You Learn
                  </p>
                </div>
              </div>

              <p className="text-slate-600 leading-7">
                {courseInfo.about}
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                  <GraduationCap
                    className="text-purple-600"
                    size={22}
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-purple-600 font-bold">
                    Course Curriculum
                  </p>

                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Course Modules
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                {(courseInfo.subjects || []).map(
                  (module, index) => (
                    <div
                      className="flex items-center cursor-pointer gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition"
                      key={index}
                    >
                      <div className="w-9 h-9 cursor-pointer shrink-0 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>

                      <p className="font-semibold text-slate-800">
                        {module}
                      </p>

                      <CheckCircle2
                        className="ml-auto text-green-500 shrink-0"
                        size={19}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <User
                    className="text-emerald-600"
                    size={22}
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-600 font-bold">
                    Your Instructor
                  </p>

                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Meet Your Mentor
                  </h2>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md"
                  src={courseInfo.mentor?.image}
                  alt=""
                />

                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {courseInfo.mentor?.name}
                  </h3>

                  <p className="text-indigo-600 font-semibold mt-1">
                    {courseInfo.mentor?.role}
                  </p>

                  <p className="text-sm text-slate-500 mt-3 max-w-xl">
                    Learn directly from an experienced industry
                    professional with practical knowledge and
                    real-world experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                  <p className="text-sm text-indigo-100 font-medium">
                    {existingBooking
                      ? "Manage Your Booking"
                      : "Start Learning Today"}
                  </p>

                  <h2 className="text-2xl font-extrabold mt-1">
                    {existingBooking
                      ? "Update Your Batch"
                      : "Book Your Batch"}
                  </h2>

                  <div className="flex items-center gap-2 mt-4">
                    <CalendarDays size={18} />

                    <span className="text-sm">
                      Choose Your Preferred Date
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  {existingBooking && (
                    <div className="mb-5 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          size={18}
                          className="text-indigo-600"
                        />

                        <p className="font-bold text-indigo-700">
                          You Already Have a Booking
                        </p>
                      </div>

                      <p className="text-xs text-indigo-600 mt-2">
                        Select a new date and time below to
                        update your booking.
                      </p>

                      <div className="mt-3 space-y-1 text-xs text-slate-600">
                        <p>
                          Current Date:{" "}
                          <span className="font-bold">
                            {existingBooking.slotDate}
                          </span>
                        </p>

                        <p>
                          Current Time:{" "}
                          <span className="font-bold">
                            {existingBooking.slotTime}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {courseSlots.map((item, index) => {
                      const day = item?.[0];

                      if (!day) return null;

                      return (
                        <button
                          className={`min-w-[68px] rounded-2xl border px-3 py-3 text-center transition cursor-pointer ${
                            day.isHoliday
                              ? "bg-red-50 border-red-200 text-red-600"
                              : slotIndex === index
                                ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                                : "bg-white border-slate-200 text-slate-700 hover:border-indigo-300"
                          }`}
                          key={index}
                          onClick={() => {
                            setSlotIndex(index);
                            setSlotTime("");
                          }}
                        >
                          <p className="text-[11px] font-bold">
                            {daysOfWeek[day.dateTime.getDay()]}
                          </p>

                          <p className="text-xl font-extrabold mt-1">
                            {day.dateTime.getDate()}
                          </p>

                          <p>
                            {day.dateTime.toLocaleString(
                              "default",
                              {
                                month: "short",
                              },
                            )}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {isSelectedDateHoliday ? (
                    <div className="mt-5 p-5 rounded-2xl bg-red-50 border border-red-100 text-center">
                      <div className="w-10 h-10 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                        <X
                          className="text-red-600 cursor-pointer"
                          size={20}
                        />
                      </div>

                      <p className="font-bold text-red-700 mt-3">
                        Booking Closed
                      </p>

                      <p className="text-sm text-red-500 mt-1">
                        {selectedHolidayReason}
                      </p>

                      <p className="text-xs text-red-400 mt-2">
                        Please Select Another Date
                      </p>
                    </div>
                  ) : selectedDay?.[0]?.isOff ? (
                    <div className="mt-5 p-5 rounded-2xl bg-slate-100 border border-slate-200 text-center">
                      <p className="font-bold text-slate-700">
                        Sunday Is Off
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        Please Select Another Date
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-bold text-slate-900">
                            Available Time
                          </p>

                          <Clock3
                            className="text-slate-400"
                            size={17}
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {selectedDay?.map((item, index) => (
                            <button
                              className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold transition cursor-pointer ${
                                slotTime === item.time
                                  ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                                  : "bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600"
                              }`}
                              onClick={() =>
                                setSlotTime(item.time)
                              }
                              key={index}
                            >
                              {item.time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {slotTime && (
                        <div className="mt-5 rounded-2xl bg-indigo-50 border border-indigo-100 p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                            Your Selection
                          </p>

                          <div className="mt-3 space-y-2 text-sm">
                            <div className="flex justify-between gap-3">
                              <span className="text-slate-500">
                                Date
                              </span>

                              <span className="font-bold text-slate-800">
                                {selectedDate}
                              </span>
                            </div>

                            <div className="flex justify-between gap-3">
                              <span className="text-slate-500">
                                Time
                              </span>

                              <span className="font-bold text-slate-800 text-right">
                                {slotTime}
                              </span>
                            </div>

                            <div className="flex justify-between gap-3">
                              <span className="text-slate-500">
                                Mode
                              </span>

                              <span className="font-bold text-slate-800">
                                {selectedMode}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleOpenBookingModal}
                        disabled={!slotTime || bookingLoading}
                        className={`w-full mt-6 py-4 rounded-2xl font-bold text-white transition ${
                          slotTime && !bookingLoading
                            ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 cursor-pointer"
                            : "bg-slate-300 cursor-not-allowed"
                        }`}
                      >
                        {bookingLoading
                          ? existingBooking
                            ? "Updating..."
                            : "Booking..."
                          : slotTime
                            ? existingBooking
                              ? "Update Your Booking"
                              : "Book Your Course"
                            : "Select Time Slot"}
                      </button>

                      <p className="text-center text-xs text-slate-400 mt-4">
                        {existingBooking
                          ? "Change your preferred date or time slot."
                          : "Secure your seat before slots fill up."}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="mb-6">
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wide">
              You May Also Like
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Related Courses
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((course) => (
              <div
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
                key={course._id}
              >
                <img
                  className="w-full h-48 object-cover cursor-pointer"
                  src={course.image}
                  alt=""
                />

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                      {course.category}
                    </span>

                    <span className="font-extrabold text-green-600">
                      ₹{course.price}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-900 mt-4 line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock3 size={15} />
                      {course.duration}
                    </span>

                    <span className="flex items-center gap-1">
                      <GraduationCap size={15} />
                      {course.level}
                    </span>
                  </div>

                  <button
                    className="w-full mt-5 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition cursor-pointer"
                    onClick={() =>
                      navigate(`/booking/${course._id}`)
                    }
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => {
              if (!bookingLoading) {
                setOpenModal(false);
              }
            }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <p className="text-xs uppercase tracking-wide text-indigo-600 font-bold">
                  {existingBooking
                    ? "Update Booking"
                    : "Confirm Booking"}
                </p>

                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  {existingBooking
                    ? "Review Booking Changes"
                    : "Review Your Booking"}
                </h2>
              </div>

              <button
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
                onClick={() => setOpenModal(false)}
                disabled={bookingLoading}
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL CONTENT */}

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  className="w-20 h-20 rounded-2xl object-cover"
                  src={courseInfo.image}
                  alt=""
                />

                <div>
                  <h3 className="font-extrabold text-slate-900">
                    {courseInfo.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {courseInfo.mentor?.name}
                  </p>

                  {existingBooking && (
                    <p className="text-xs text-indigo-600 font-semibold mt-2">
                      Existing Booking
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between gap-4 p-4 rounded-2xl bg-slate-50">
                  <span className="text-slate-500">
                    Date
                  </span>

                  <span className="font-bold text-slate-900">
                    {selectedDate}
                  </span>
                </div>

                <div className="flex justify-between gap-4 p-4 rounded-2xl bg-slate-50">
                  <span className="text-slate-500">
                    Time
                  </span>

                  <span className="font-bold text-slate-900 text-right">
                    {slotTime}
                  </span>
                </div>

                <div className="flex justify-between gap-4 p-4 rounded-2xl bg-slate-50">
                  <span className="text-slate-500">
                    Mode
                  </span>

                  <span className="font-bold text-slate-900">
                    {selectedMode}
                  </span>
                </div>

                <div className="flex justify-between gap-4 p-4 rounded-2xl bg-green-50 border border-green-100">
                  <span className="font-semibold text-green-700">
                    Course Fees
                  </span>

                  <span className="font-extrabold text-green-600">
                    ₹{courseInfo.price}
                  </span>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-slate-100">
              <button
                className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition cursor-pointer"
                onClick={() => setOpenModal(false)}
                disabled={bookingLoading}
              >
                Cancel
              </button>

              <button
                className="flex-1 py-3.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition cursor-pointer disabled:bg-indigo-400 disabled:cursor-not-allowed"
                onClick={
                  existingBooking
                    ? handleUpdateBooking
                    : handleBooking
                }
                disabled={
                  bookingLoading || isSelectedDateHoliday
                }
              >
                {bookingLoading
                  ? existingBooking
                    ? "Updating..."
                    : "Confirming..."
                  : existingBooking
                    ? "Confirm Update"
                    : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coursedetail;