
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CheckCircle2,
  Loader2,
  XCircle,
} from "lucide-react";

import {
  verifyStripePayment,
  getAllBookings,
} from "../Redux/User/Userslice";

const Paymentsuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("loading");

  // Prevent duplicate Stripe verification
  const verificationStarted = useRef(false);

  useEffect(() => {
    const verifyPayment = async () => {
      // React StrictMode ke wajah se API 2 baar call hone se bachayega
      if (verificationStarted.current) {
        return;
      }

      verificationStarted.current = true;

      const sessionId = searchParams.get("session_id");
      const appointmentId = searchParams.get("appointmentId");

      console.log("Stripe Session ID:", sessionId);
      console.log("Appointment ID:", appointmentId);

      // Check Stripe parameters
      if (!sessionId || !appointmentId) {
        console.error("Stripe payment parameters missing");

        setStatus("failed");

        toast.error("Payment information is missing.");

        return;
      }

      // Check login token
      const token = sessionStorage.getItem("userToken");

      if (!token) {
        toast.error("Please login to continue.");

        navigate("/login", {
          replace: true,
        });

        return;
      }

      try {
        setStatus("loading");

        // Verify payment from backend
        const result = await dispatch(
          verifyStripePayment({
            sessionId,
            appointmentId,
          })
        ).unwrap();

        console.log(
          "Stripe Verification Result:",
          result
        );

        if (!result?.success) {
          throw new Error(
            result?.message ||
              "Stripe payment verification failed"
          );
        }

        // Payment successfully verified
        setStatus("success");

        toast.success(
          result?.message ||
            "Payment Successful"
        );

        // Get latest bookings from backend
        await dispatch(
          getAllBookings()
        ).unwrap();

        // Redirect to My Bookings
        setTimeout(() => {
          navigate("/my-booking", {
            replace: true,
          });
        }, 1200);

      } catch (error) {
        console.error(
          "Stripe Payment Verification Error:",
          error
        );

        setStatus("failed");

        toast.error(
          error?.message ||
            error?.payload?.message ||
            "Payment verification failed."
        );
      }
    };

    verifyPayment();

  }, [dispatch, navigate, searchParams]);

  // =========================
  // LOADING SCREEN
  // =========================

  if (status === "loading") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center">

          <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
            <Loader2 className="w-9 h-9 text-blue-600 animate-spin" />
          </div>

          <h1 className="mt-5 text-xl sm:text-2xl font-bold text-gray-900">
            Verifying Payment
          </h1>

          <p className="mt-2 text-sm text-gray-500 leading-6">
            Please wait while we verify your Stripe
            payment. Do not close this page.
          </p>

        </div>
      </div>
    );
  }

  // =========================
  // SUCCESS SCREEN
  // =========================

  if (status === "success") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center">

          <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="mt-5 text-xl sm:text-2xl font-bold text-gray-900">
            Payment Successful
          </h1>

          <p className="mt-2 text-sm text-gray-500 leading-6">
            Your payment has been successfully verified.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-green-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            Redirecting to My Bookings...
          </div>

        </div>
      </div>
    );
  }

  // =========================
  // FAILED SCREEN
  // =========================

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center">

        <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>

        <h1 className="mt-5 text-xl sm:text-2xl font-bold text-gray-900">
          Payment Verification Failed
        </h1>

        <p className="mt-2 text-sm text-gray-500 leading-6">
          We could not verify your payment.
          Please check your booking or try again.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/my-booking", {
              replace: true,
            })
          }
          className="
            mt-6
            w-full
            px-5
            py-3
            rounded-xl
            bg-blue-600
            text-white
            text-sm
            font-semibold
            hover:bg-blue-700
            transition
          "
        >
          Go to My Bookings
        </button>

      </div>
    </div>
  );
};

export default Paymentsuccess;

