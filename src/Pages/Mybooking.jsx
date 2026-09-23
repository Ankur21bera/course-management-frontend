import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  CalendarDays,
  Clock3,
  IndianRupee,
  CreditCard,
  WalletCards,
  X,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  UserRound,
  BookOpen,
  RefreshCw,
  ShieldCheck,
  Info,
} from "lucide-react";

import {
  getAllBookings,
  requestOfflinePayment,
  cancelEnrollment,
  createRazorpayOrder,
  verifyRazorpayPayment,
  createStripePayment,
} from "../Redux/User/Userslice";

const Mybookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    bookings,
    loading,
    actionLoading,
    paymentLoading,
  } = useSelector((state) => state.user);

  const [cancelModal, setCancelModal] = useState({
    open: false,
    bookingId: null,
  });

  // Cancel / other action loading
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Payment method specific loading
  // Example:
  // { bookingId: "123", method: "stripe" }
  const [paymentLoadingMethod, setPaymentLoadingMethod] = useState({
    bookingId: null,
    method: null,
  });

  // --------------------------------------------------
  // LOAD BOOKINGS
  // --------------------------------------------------
  useEffect(() => {
    const token = sessionStorage.getItem("userToken");

    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(getAllBookings());
  }, [dispatch, navigate]);

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------
  const formatDate = (date) => {
    if (!date) {
      return "Not Available";
    }

    try {
      const dateString = String(date);

      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString
          .split("-")
          .map(Number);

        return new Date(
          year,
          month - 1,
          day
        ).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      }

      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return String(date);
    }
  };

  // --------------------------------------------------
  // PAYMENT MODE
  // --------------------------------------------------
  const getPaymentMode = (mode) => {
    if (!mode) {
      return "Online";
    }

    return String(mode).toLowerCase() === "offline"
      ? "Offline"
      : "Online";
  };

  // --------------------------------------------------
  // BOOKING STATUS
  // --------------------------------------------------
  const getBookingStatus = (booking) => {
    if (booking?.cancelled === true) {
      return {
        type: "cancelled",
        title: "Booking Cancelled",
        message: "Your booking has been cancelled.",
        icon: XCircle,
        badgeClass:
          "bg-red-50 text-red-700 border-red-200",
        messageClass:
          "bg-red-50 border-red-200 text-red-700",
      };
    }

    const status = String(
      booking?.status || ""
    ).toLowerCase();

    const isPaid = booking?.payment === true;

    // Payment complete hone ke baad hi
    // Enrollment Complete hoga
    if (status === "accepted" && isPaid) {
      return {
        type: "completed",
        title: "Enrollment Complete",
        message:
          "Your enrollment is complete. You can now attend your course.",
        icon: CheckCircle2,
        badgeClass:
          "bg-green-50 text-green-700 border-green-200",
        messageClass:
          "bg-green-50 border-green-200 text-green-700",
      };
    }

    // Admin approve kar chuka hai
    // Payment abhi pending hai
    if (status === "accepted" && !isPaid) {
      return {
        type: "approved",
        title: "Booking Approved",
        message:
          "Your booking is approved. Now complete your appointment by making the payment.",
        icon: CheckCircle2,
        badgeClass:
          "bg-blue-50 text-blue-700 border-blue-200",
        messageClass:
          "bg-blue-50 border-blue-200 text-blue-700",
      };
    }

    if (status === "rejected") {
      return {
        type: "rejected",
        title: "Booking Rejected",
        message:
          "Your booking has been rejected by the admin.",
        icon: XCircle,
        badgeClass:
          "bg-red-50 text-red-700 border-red-200",
        messageClass:
          "bg-red-50 border-red-200 text-red-700",
      };
    }

    return {
      type: "pending",
      title: "Waiting for Admin Approval",
      message: "Please wait for admin approval.",
      icon: Info,
      badgeClass:
        "bg-amber-50 text-amber-700 border-amber-200",
      messageClass:
        "bg-amber-50 border-amber-200 text-amber-700",
    };
  };

  // --------------------------------------------------
  // RAZORPAY SCRIPT
  // --------------------------------------------------
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existingScript) {
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        existingScript.addEventListener(
          "load",
          () => resolve(true),
          { once: true }
        );

        existingScript.addEventListener(
          "error",
          () => resolve(false),
          { once: true }
        );

        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.async = true;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // --------------------------------------------------
  // RAZORPAY PAYMENT
  // --------------------------------------------------
  const handleRazorpayPayment = async (booking) => {
    if (!booking?._id) {
      toast.error("Booking information is missing.");
      return;
    }

    if (booking.cancelled) {
      toast.error("This booking has been cancelled.");
      return;
    }

    if (booking.payment === true) {
      toast.error("Payment is already completed.");
      return;
    }

    if (
      String(booking.status || "").toLowerCase() !==
      "accepted"
    ) {
      toast.error("Please wait for admin approval.");
      return;
    }

    try {
      setPaymentLoadingMethod({
        bookingId: booking._id,
        method: "razorpay",
      });

      const razorpayKey =
        import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        toast.error(
          "Razorpay Key ID is missing. Check your frontend .env file."
        );

        setPaymentLoadingMethod({
          bookingId: null,
          method: null,
        });

        return;
      }

      const scriptLoaded =
        await loadRazorpayScript();

      if (
        !scriptLoaded ||
        !window.Razorpay
      ) {
        toast.error(
          "Razorpay could not be loaded. Please try again."
        );

        setPaymentLoadingMethod({
          bookingId: null,
          method: null,
        });

        return;
      }

      const result = await dispatch(
        createRazorpayOrder({
          appointmentId: booking._id,
        })
      ).unwrap();

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Unable to create payment order."
        );
      }

      const order =
        result?.order || result;

      if (!order?.id) {
        throw new Error(
          "Razorpay order ID was not received."
        );
      }

      const options = {
        key: razorpayKey,

        amount:
          order.amount ||
          Number(booking.amount || 0) * 100,

        currency:
          order.currency || "INR",

        name: "Course Enrollment",

        description:
          booking?.courseData?.title ||
          "Course Payment",

        order_id: order.id,

        prefill: {
          name:
            booking?.userData?.name || "",

          email:
            booking?.userData?.email || "",

          contact:
            booking?.userData?.phone || "",
        },

        theme: {
          color: "#2563eb",
        },

        handler: async function (response) {
          try {
            const verifyResult =
              await dispatch(
                verifyRazorpayPayment({
                  appointmentId: booking._id,

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                })
              ).unwrap();

            if (!verifyResult?.success) {
              throw new Error(
                verifyResult?.message ||
                  "Payment verification failed."
              );
            }

            toast.success(
              verifyResult?.message ||
                "Payment completed successfully."
            );

            await dispatch(
              getAllBookings()
            ).unwrap();
          } catch (error) {
            toast.error(
              error?.message ||
                "Payment verification failed."
            );
          } finally {
            setPaymentLoadingMethod({
              bookingId: null,
              method: null,
            });
          }
        },

        modal: {
          ondismiss: function () {
            setPaymentLoadingMethod({
              bookingId: null,
              method: null,
            });

            toast.error(
              "Payment cancelled."
            );
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function () {
          setPaymentLoadingMethod({
            bookingId: null,
            method: null,
          });

          toast.error(
            "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay Payment Error:",
        error
      );

      toast.error(
        error?.message ||
          "Unable to start Razorpay payment."
      );

      setPaymentLoadingMethod({
        bookingId: null,
        method: null,
      });
    }
  };

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  // --------------------------------------------------
  // STRIPE PAYMENT
  // --------------------------------------------------
  const handleStripePayment = async (booking) => {
    if (!booking?._id) {
      toast.error("Booking information is missing.");
      return;
    }

    if (booking.cancelled) {
      toast.error("This booking has been cancelled.");
      return;
    }

    if (booking.payment === true) {
      toast.error("Payment is already completed.");
      return;
    }

    if (
      String(booking.status || "").toLowerCase() !==
      "accepted"
    ) {
      toast.error("Please wait for admin approval.");
      return;
    }

    try {
      setPaymentLoadingMethod({
        bookingId: booking._id,
        method: "stripe",
      });

      const result = await dispatch(
        createStripePayment({
          appointmentId: booking._id,
        })
      ).unwrap();

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Unable to create Stripe payment."
        );
      }

      if (!result?.sessionUrl) {
        throw new Error(
          "Stripe checkout URL was not received."
        );
      }

      // Stripe checkout par redirect
      window.location.href =
        result.sessionUrl;
    } catch (error) {
      console.error(
        "Stripe Payment Error:",
        error
      );

      toast.error(
        error?.message ||
          "Unable to start Stripe payment."
      );

      setPaymentLoadingMethod({
        bookingId: null,
        method: null,
      });
    }
  };

  // --------------------------------------------------
  // OFFLINE PAYMENT
  // --------------------------------------------------
  const handleOfflinePayment = async (
    booking
  ) => {
    if (!booking?._id) {
      toast.error("Booking information is missing.");
      return;
    }

    if (booking.cancelled) {
      toast.error("This booking has been cancelled.");
      return;
    }

    if (
      String(booking.status || "").toLowerCase() !==
      "accepted"
    ) {
      toast.error("Please wait for admin approval.");
      return;
    }

    if (booking.payment === true) {
      toast.error("Payment is already completed.");
      return;
    }

    try {
      setPaymentLoadingMethod({
        bookingId: booking._id,
        method: "offline",
      });

      const result = await dispatch(
        requestOfflinePayment({
          appointmentId: booking._id,
        })
      ).unwrap();

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Unable to request offline payment."
        );
      }

      toast.success(
        result?.message ||
          "Offline payment request submitted."
      );

      await dispatch(
        getAllBookings()
      ).unwrap();
    } catch (error) {
      console.error(
        "Offline Payment Error:",
        error
      );

      toast.error(
        error?.message ||
          "Unable to request offline payment."
      );
    } finally {
      setPaymentLoadingMethod({
        bookingId: null,
        method: null,
      });
    }
  };

  // --------------------------------------------------
  // CANCEL BOOKING
  // --------------------------------------------------
  const handleOpenCancelModal = (
    bookingId
  ) => {
    if (
      actionLoadingId ||
      actionLoading ||
      paymentLoading === true ||
      paymentLoadingMethod.bookingId
    ) {
      return;
    }

    setCancelModal({
      open: true,
      bookingId,
    });
  };

  const handleCloseCancelModal = () => {
    setCancelModal({
      open: false,
      bookingId: null,
    });
  };

  const handleCancelBooking = async () => {
    if (!cancelModal.bookingId) {
      return;
    }

    try {
      setActionLoadingId(
        cancelModal.bookingId
      );

      const result = await dispatch(
        cancelEnrollment({
          appointmentId:
            cancelModal.bookingId,
        })
      ).unwrap();

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Unable to cancel booking."
        );
      }

      toast.success(
        result?.message ||
          "Booking cancelled successfully."
      );

      handleCloseCancelModal();

      await dispatch(
        getAllBookings()
      ).unwrap();
    } catch (error) {
      console.error(
        "Cancel Booking Error:",
        error
      );

      toast.error(
        error?.message ||
          "Unable to cancel booking."
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  // --------------------------------------------------
  // REFRESH
  // --------------------------------------------------
  const handleRefresh = async () => {
    try {
      await dispatch(
        getAllBookings()
      ).unwrap();

      toast.success(
        "Bookings refreshed."
      );
    } catch (error) {
      toast.error(
        error?.message ||
          "Unable to refresh bookings."
      );
    }
  };

  // --------------------------------------------------
  // PAYMENT LOADING CHECK
  // --------------------------------------------------
  const isPaymentMethodLoading = (
    bookingId,
    method
  ) => {
    return (
      paymentLoadingMethod.bookingId ===
        bookingId &&
      paymentLoadingMethod.method ===
        method
    );
  };

  // Any payment action running for booking
  const isAnyPaymentLoading = (
    bookingId
  ) => {
    return (
      paymentLoadingMethod.bookingId ===
      bookingId
    );
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <BookOpen className="h-6 w-6" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                My Bookings
              </h1>
            </div>

            <p className="text-sm text-gray-500 sm:text-base">
              View your course enrollments,
              booking status and payment details.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                loading ? "animate-spin" : ""
              }`}
            />

            Refresh
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" />

              <p className="text-sm font-medium text-gray-500">
                Loading your bookings...
              </p>
            </div>
          </div>
        ) : !bookings ||
          bookings.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center shadow-sm">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No Bookings Found
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              You haven't made any course bookings yet.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/course")
              }
              className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          /* BOOKINGS */
          <div className="space-y-6">
            {bookings.map((booking) => {
              const statusInfo =
                getBookingStatus(booking);

              const StatusIcon =
                statusInfo.icon;

              const bookingStatus =
                String(
                  booking?.status || ""
                ).toLowerCase();

              const canPay =
                booking.cancelled !== true &&
                booking.payment !== true &&
                bookingStatus === "accepted";

              const razorpayLoading =
                isPaymentMethodLoading(
                  booking._id,
                  "razorpay"
                );

              const stripeLoading =
                isPaymentMethodLoading(
                  booking._id,
                  "stripe"
                );

              const offlineLoading =
                isPaymentMethodLoading(
                  booking._id,
                  "offline"
                );

              const currentLoading =
                isAnyPaymentLoading(
                  booking._id
                );

              return (
                <div
                  key={booking._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* TOP STATUS BAR */}
                  <div className="border-b border-gray-100 bg-gray-50 px-5 py-4 sm:px-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <StatusIcon
                          className={`h-5 w-5 ${
                            statusInfo.type ===
                            "completed"
                              ? "text-green-600"
                              : statusInfo.type ===
                                "approved"
                              ? "text-blue-600"
                              : statusInfo.type ===
                                "rejected"
                              ? "text-red-600"
                              : statusInfo.type ===
                                "cancelled"
                              ? "text-red-600"
                              : "text-amber-600"
                          }`}
                        />

                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {
                              statusInfo.title
                            }
                          </p>

                          <p className="text-xs text-gray-500">
                            Booking ID:{" "}
                            {booking._id}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase ${statusInfo.badgeClass}`}
                      >
                        {booking.cancelled
                          ? "Cancelled"
                          : bookingStatus ||
                            "Pending"}
                      </span>
                    </div>
                  </div>

                  {/* MAIN CONTENT */}
                  <div className="p-5 sm:p-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

                      {/* LEFT */}
                      <div>

                        {/* COURSE */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <div className="h-28 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-40">
                            {booking
                              ?.courseData
                              ?.image ? (
                              <img
                                src={
                                  booking
                                    .courseData
                                    .image
                                }
                                alt={
                                  booking
                                    ?.courseData
                                    ?.title ||
                                  "Course"
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <BookOpen className="h-10 w-10 text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
                                  {
                                    booking
                                      ?.courseData
                                      ?.category
                                  }
                                </p>

                                <h2 className="text-xl font-bold text-gray-900">
                                  {booking
                                    ?.courseData
                                    ?.title ||
                                    "Course"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                  Level:{" "}
                                  {booking
                                    ?.courseData
                                    ?.level ||
                                    "Beginner"}
                                </p>
                              </div>

                              <div className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700">
                                <IndianRupee className="h-4 w-4" />

                                {Number(
                                  booking?.amount ||
                                    0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* DETAILS */}
                        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                          {/* BOOKING DATE */}
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-5 w-5 text-blue-600" />

                              <div>
                                <p className="text-xs text-gray-500">
                                  Booking Date
                                </p>

                                <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                  {formatDate(
                                    booking.slotDate
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* TIME */}
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                            <div className="flex items-center gap-2">
                              <Clock3 className="h-5 w-5 text-purple-600" />

                              <div>
                                <p className="text-xs text-gray-500">
                                  Time Slot
                                </p>

                                <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                  {booking?.slotTime ||
                                    "Not Available"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* PAYMENT */}
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-5 w-5 text-green-600" />

                              <div>
                                <p className="text-xs text-gray-500">
                                  Payment
                                </p>

                                <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                  {booking.payment
                                    ? "Completed"
                                    : "Pending"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* PAYMENT MODE */}
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                            <div className="flex items-center gap-2">
                              <WalletCards className="h-5 w-5 text-orange-600" />

                              <div>
                                <p className="text-xs text-gray-500">
                                  Payment Mode
                                </p>

                                <p className="mt-0.5 text-sm font-semibold capitalize text-gray-800">
                                  {getPaymentMode(
                                    booking.paymentMode
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* ENROLLMENT */}
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="h-5 w-5 text-indigo-600" />

                              <div>
                                <p className="text-xs text-gray-500">
                                  Enrollment
                                </p>

                                <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                  {bookingStatus ===
                                    "accepted" &&
                                  booking.payment ===
                                    true
                                    ? "Complete"
                                    : bookingStatus ===
                                      "accepted"
                                    ? "Payment Pending"
                                    : bookingStatus ===
                                      "rejected"
                                    ? "Rejected"
                                    : bookingStatus ===
                                      "pending"
                                    ? "Pending Approval"
                                    : "Processing"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* MENTOR */}
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                            <div className="flex items-center gap-2">
                              <UserRound className="h-5 w-5 text-pink-600" />

                              <div>
                                <p className="text-xs text-gray-500">
                                  Mentor
                                </p>

                                <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                  {booking
                                    ?.courseData
                                    ?.mentor
                                    ?.name ||
                                    "Not Assigned"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* MENTOR */}
                        <div className="mt-5 rounded-xl border border-gray-100 bg-white p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-100">
                              {booking
                                ?.courseData
                                ?.mentor
                                ?.image ? (
                                <img
                                  src={
                                    booking
                                      .courseData
                                      .mentor
                                      .image
                                  }
                                  alt={
                                    booking
                                      ?.courseData
                                      ?.mentor
                                      ?.name ||
                                    "Mentor"
                                  }
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <UserRound className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="text-sm font-bold text-gray-900">
                                {booking
                                  ?.courseData
                                  ?.mentor
                                  ?.name ||
                                  "Mentor"}
                              </p>

                              <p className="text-xs text-gray-500">
                                {booking
                                  ?.courseData
                                  ?.mentor
                                  ?.role ||
                                  "Course Mentor"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* STATUS MESSAGE */}
                        <div
                          className={`mt-5 rounded-xl border p-4 ${statusInfo.messageClass}`}
                        >
                          <div className="flex items-start gap-3">
                            <StatusIcon className="mt-0.5 h-5 w-5 shrink-0" />

                            <div>
                              <p className="text-sm font-bold">
                                {
                                  statusInfo.title
                                }
                              </p>

                              <p className="mt-1 text-sm">
                                {
                                  statusInfo.message
                                }
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* PAYMENT COMPLETED */}
                        {booking.payment ===
                          true &&
                          !booking.cancelled && (
                            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                                <div>
                                  <p className="text-sm font-bold text-green-800">
                                    Payment Completed
                                  </p>

                                  <p className="mt-1 text-sm text-green-700">
                                    Your payment
                                    of ₹
                                    {Number(
                                      booking.amount ||
                                        0
                                    ).toLocaleString(
                                      "en-IN"
                                    )}{" "}
                                    has been
                                    successfully
                                    completed.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>

                      {/* RIGHT ACTION PANEL */}
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">

                        {/* SUMMARY */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Booking Summary
                          </p>

                          <div className="mt-3 flex items-end justify-between">
                            <span className="text-sm text-gray-500">
                              Total Amount
                            </span>

                            <span className="text-xl font-bold text-gray-900">
                              ₹
                              {Number(
                                booking.amount ||
                                  0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>
                        </div>

                        {/* PAYMENT STATUS */}
                        {booking.payment ===
                        true ? (
                          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />

                              <span className="text-sm font-semibold text-green-700">
                                Payment Completed
                              </span>
                            </div>
                          </div>
                        ) : booking.cancelled ? (
                          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-5 w-5 text-red-600" />

                              <span className="text-sm font-semibold text-red-700">
                                Booking Cancelled
                              </span>
                            </div>
                          </div>
                        ) : canPay ? (
                          <>
                            <p className="mb-3 text-xs text-gray-500">
                              Choose your preferred
                              payment method.
                            </p>

                            {/* RAZORPAY */}
                            <button
                              type="button"
                              onClick={() =>
                                handleRazorpayPayment(
                                  booking
                                )
                              }
                              disabled={
                                currentLoading
                              }
                              className="mb-3 flex w-full cursor-pointer items-center cursor-pointer justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {razorpayLoading ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <CreditCard className="h-4 w-4" />
                                  Pay with Razorpay
                                </>
                              )}
                            </button>

                            {/* STRIPE */}
                            <button
                              type="button"
                              onClick={() =>
                                handleStripePayment(
                                  booking
                                )
                              }
                              disabled={
                                currentLoading
                              }
                              className="mb-3 flex w-full items-center cursor-pointer justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {stripeLoading ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <CreditCard className="h-4 w-4" />
                                  Pay with Stripe
                                </>
                              )}
                            </button>

                            {/* OFFLINE */}
                            <button
                              type="button"
                              onClick={() =>
                                handleOfflinePayment(
                                  booking
                                )
                              }
                              disabled={
                                currentLoading
                              }
                              className="flex w-full items-center justify-center gap-2 cursor-pointer rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {offlineLoading ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <WalletCards className="h-4 w-4" />
                                  Offline Payment
                                </>
                              )}
                            </button>
                          </>
                        ) : bookingStatus ===
                          "rejected" ? (
                          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                            <XCircle className="mx-auto h-7 w-7 text-red-600" />

                            <p className="mt-2 text-sm font-bold text-red-800">
                              Booking Rejected
                            </p>

                            <p className="mt-1 text-xs text-red-700">
                              Your booking is rejected.
                            </p>
                          </div>
                        ) : (
                          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                            <Info className="mx-auto h-7 w-7 text-amber-600" />

                            <p className="mt-2 text-sm font-bold text-amber-800">
                              Waiting for Approval
                            </p>

                            <p className="mt-1 text-xs text-amber-700">
                              Wait for admin approval.
                            </p>
                          </div>
                        )}

                        {/* CANCEL BUTTON */}
                        {!booking.cancelled &&
                          bookingStatus !==
                            "rejected" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenCancelModal(
                                  booking._id
                                )
                              }
                              disabled={
                                currentLoading ||
                                actionLoading
                              }
                              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl cursor-pointer border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <X className="h-4 w-4" />

                              Cancel Booking
                            </button>
                          )}

                        {/* INFO */}
                        <div className="mt-5 flex items-start gap-2 border-t border-gray-200 pt-4">
                          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                          <p className="text-xs leading-5 text-gray-500">
                            Your booking information
                            is securely stored. Payment
                            can only be completed after
                            admin approval.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CANCEL MODAL */}
      {cancelModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Cancel Booking
                  </h3>

                  <p className="text-sm text-gray-500">
                    Are you sure?
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleCloseCancelModal
                }
                className="rounded-lg p-2 cursor-pointer text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm leading-6 text-red-700">
                Cancelling this booking may affect
                your enrollment. Please confirm only
                if you really want to cancel this
                booking.
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={
                  handleCloseCancelModal
                }
                disabled={
                  Boolean(actionLoadingId)
                }
                className="rounded-xl border border-gray-200 cursor-pointer bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={
                  handleCancelBooking
                }
                disabled={
                  Boolean(actionLoadingId)
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {actionLoadingId ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4" />
                    Yes, Cancel
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mybookings;