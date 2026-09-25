import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Services/Api";
import axios  from "axios";

export const registerUser = createAsyncThunk("user/registerUser",async(userData,{rejectWithValue})=>{
    try {
        const response = await api.post("/register",userData);
        if(response.data.success){
            if(response.data.token){
                sessionStorage.setItem("userToken",response.data.token)
            }
            if(response.data.user){
                sessionStorage.setItem("userData",JSON.stringify(response.data.user))
            }
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Registration Failed Please Try Again Later")
    }
})

export const loginUser = createAsyncThunk("user/loginUser",async(loginData,{rejectWithValue})=>{
    try {
        const response = await api.post("/login",loginData);
        if(response.data.success){
            if(response.data.token){
                sessionStorage.setItem("userToken",response.data.token)
            }
            if(response.data.user){
                sessionStorage.setItem("userData",JSON.stringify(response.data.user))
            }
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login Failed Try Again Later") 
    }
})

export const forgotPassword = createAsyncThunk("user/forgotPassword",async(emailData,{rejectWithValue})=>{
    try {
        const response = await api.post("/forgot",emailData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed To Send Otp")
    }
})

export const verifyOtp = createAsyncThunk("user/verifyOtp",async(otpData,{rejectWithValue})=>{
    try {
        const response = await api.post("/verify-otp",otpData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed To Verify Otp")
    }
})

export const resendOtp = createAsyncThunk("user/resendOtp",async(emailData,{rejectWithValue})=>{
    try {
        const response = await api.post("/resend-otp",emailData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed To Resend Otp")
    }
})

export const resetPassword = createAsyncThunk("user/resetPassword",async(passwordData,{rejectWithValue})=>{
    try {
        const response = await api.post("/reset-password",passwordData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed To Reset Password")
    }
})

export const getUserProfile = createAsyncThunk("user/getUserProfile",async(_,{rejectWithValue})=>{
    try {
        const response = await api.get("/user-profile");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed To Fetch Profile")
    }
})

export const updateUserProfile = createAsyncThunk("user/updateUserProfile",async(formData,{rejectWithValue})=>{
    try {
        const response = await api.put("/update-profile",formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed To Update Profile")
    }
})

export const BookCourse = createAsyncThunk("user/bookCourse",async(bookingData,{rejectWithValue})=>{
    try {
        const response = await api.post("/book-course",bookingData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed To Book The Course")
    }
})

export const getAllBookings = createAsyncThunk("user/getAllBookings",async(_,{rejectWithValue})=>{
    try {
        const response = await api.get("/all-bookings");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed To Fetch The Course")
    }
})

export const requestOfflinePayment = createAsyncThunk("user/requestOfflinePayment",async(paymentData,{rejectWithValue})=>{
    try {
        const response = await api.post("/request-offline-payment",paymentData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Offline Payment Request Failed")
    }
})

export const cancelEnrollment = createAsyncThunk("user/cancelEnrollment",async(appointmentData,{rejectWithValue})=>{
    try {
        const response = await api.post("/cancel-enrollment",appointmentData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed To Cancel Enrollment")
    }
})

export const updateBooking = createAsyncThunk("user/updateBooking",async(bookingData,{rejectWithValue})=>{
    try {
        const response = await api.put("/update-booking",bookingData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed To Update Booking")
    }
})

export const createRazorpayOrder = createAsyncThunk(
  "user/createRazorpayOrder",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/create-booking",
        appointmentData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed To Create Razorpay Order."
      );
    }
  }
);

export const verifyRazorpayPayment = createAsyncThunk(
  "user/verifyRazorpayPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/verify-payment",
        paymentData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Razorpay Payment Verification Failed."
      );
    }
  }
);

export const createStripePayment = createAsyncThunk(
  "user/createStripePayment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/create-payment",
        appointmentData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed To Create Stripe Payment."
      );
    }
  }
);

export const verifyStripePayment = createAsyncThunk(
  "user/verifyStripePayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/verify-stripe",
        paymentData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Stripe Payment Verification Failed."
      );
    }
  }
);

export const submitCourseEnquiry = createAsyncThunk(
  "user/submitCourseEnquiry",
  async (enquiryData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/course-enquiry",
        enquiryData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed To Submit Course Enquiry."
      );
    }
  }
);

export const applyJob = createAsyncThunk(
  "user/applyJob",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/apply-job",
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Job Application Failed."
      );
    }
  }
);

export const getPublicCourses = createAsyncThunk(
  "user/getPublicCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://course-management-backend-pink.vercel.app/api/admin/public-course"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed To Fetch Public Courses"
      );
    }
  }
);

const initialState = {
    user:JSON.parse(sessionStorage.getItem("userData") || "null"),
    userToken:sessionStorage.getItem("userToken") || null,
    isAuthenticated: Boolean(sessionStorage.getItem("userToken")),
    publicCourses: [],
    publicCoursesLoading: false,
    publicCoursesError: null,
    bookings: [],
    currentBooking: null,
    razorpayOrder:null,
    stripeSession:null,
    enquiry:null,
    jobApplication:null,
    loading:false,
    profileLoading:false,
    bookingLoading:false,
    paymentLoading:false,
    enquiryLoading:false,
    jobApplicationLoading:false,
    error:null,
    message:null,
    otpVerified:false,
    passwordReset:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logoutUser:(state) => {
            state.user = null;
            state.userToken = null;
            state.isAuthenticated = false;
            state.bookings = [];
            state.currentBooking = null;
            state.razorpayOrder = null;
            state.stripeSession = null;
            state.enquiry = null;
            state.jobApplication = null;
            state.error = null;
            state.message = null;
            state.otpVerified = false;
            state.passwordReset = false;
            sessionStorage.removeItem("userToken");
            sessionStorage.removeItem("userData");
        },

        clearUserError: (state) => {
            state.error = null;
        },
        clearUserMessage: (state) => {
            state.message = null;
        },
        clearOtpVerified: (state) => {
            state.otpVerified = false;
        },
        clearPasswordReset: (state) => {
            state.passwordReset = false;
        },
        clearRazorpayOrder: (state) => {
            state.razorpayOrder = null;
        },
        clearStripeSession: (state) => {
            state.stripeSession = null;
        },
        clearCurrentBooking: (state) => {
            state.currentBooking = null;
        },
        clearEnquiry:(state) => {
            state.enquiry = null;
        },
        clearJobApplication: (state) => {
            state.jobApplication = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.message = action.payload.message || null;
            if(action.payload.token){
                state.userToken = action.payload.token;
                state.isAuthenticated = true;
            }
            if(action.payload.user){
                state.user = action.payload.user;
            }
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.message = action.payload.message || null;
            if(action.payload.token){
                state.userToken = action.payload.token;
                state.isAuthenticated = true;
            }
            if(action.payload.user){
                state.user = action.payload.user;
            }
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(forgotPassword.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        })
        .addCase(forgotPassword.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.message = action.payload.message || null
        })
        .addCase(forgotPassword.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(verifyOtp.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        })
        .addCase(verifyOtp.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.otpVerified = true;
            state.message = action.payload.message || null;
        })
        .addCase(verifyOtp.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.otpVerified = false;
        })

        builder.addCase(resendOtp.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        })
        .addCase(resendOtp.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.message = action.payload.message || null;
        })
        .addCase(resendOtp.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(resetPassword.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
            state.passwordReset = false;
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.passwordReset = true;
            state.otpVerified = false;
            state.message = action.payload.message || null;
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.passwordReset = false;
        });

        builder.addCase(getUserProfile.pending,(state)=>{
            state.profileLoading = true;
            state.error = null;
        })
        .addCase(getUserProfile.fulfilled,(state,action)=>{
            state.profileLoading = false;
            state.error = null;
            state.user = action.payload.user || null;
            state.message = action.payload.message || null;
            if(action.payload.user){
                sessionStorage.setItem("userData",JSON.stringify(action.payload.user));
            }
        })
        .addCase(getUserProfile.rejected,(state,action)=>{
            state.profileLoading = false;
            state.error = action.payload;
        })

        builder.addCase(updateUserProfile.pending,(state)=>{
            state.profileLoading = true;
            state.error = null;
            state.message = null;
        })

        .addCase(updateUserProfile.fulfilled,(state,action)=>{
            state.profileLoading = false;
            state.error = null;

            state.user = action.payload.user || null;
            state.message = action.payload.message || null;
            if(action.payload.user){
                sessionStorage.setItem("userData",JSON.stringify(action.payload.user))
            }
        })
        .addCase(updateUserProfile.rejected,(state,action)=>{
            state.profileLoading = false;
            state.error = action.payload;
        })

        builder.addCase(BookCourse.pending,(state)=>{
            state.bookingLoading = true;
            state.error = null;
            state.message = null;
        })
        .addCase(BookCourse.fulfilled,(state,action)=>{
            state.bookingLoading = false;
            state.error = null;
            state.currentBooking = action.payload.appointment || null;
            state.message = action.payload.message || null;
            if(action.payload.appointment){
                state.bookings = [action.payload.appointment,...state.bookings];
            }
        })
        .addCase(BookCourse.rejected,(state,action)=>{
            state.bookingLoading = false;
            state.error = action.payload;
        });

        builder.addCase(getAllBookings.pending,(state)=>{
            state.bookingLoading = true;
            state.error = null;
        })
        .addCase(getAllBookings.fulfilled,(state,action)=>{
            state.bookingLoading = false;
            state.error = null;
            state.bookings = action.payload.enrollments || [];
        })
        .addCase(getAllBookings.rejected,(state,action)=>{
            state.bookingLoading = false;
            state.error = action.payload;
        })

        builder.addCase(requestOfflinePayment.pending,(state)=>{
            state.paymentLoading = true;
            state.error = null;
            state.message = null;
        })
        .addCase(requestOfflinePayment.fulfilled,(state,action)=>{
            state.paymentLoading = false;
            state.error = null;
            state.currentBooking = action.payload.appointment || null;
            state.message = action.payload.message || null;

            const appointment = action.payload.appointment;
            if(appointment?._id){
                state.bookings = state.bookings.map((booking)=>booking._id === appointment._id ? appointment : booking);
            }
        })

        .addCase(requestOfflinePayment.rejected,(state,action)=>{
            state.paymentLoading = false;
            state.error = action.payload;
        })

        builder.addCase(cancelEnrollment.pending,(state)=>{
            state.bookingLoading = true;
            state.error = null;
            state.message = null;
        })
        .addCase(cancelEnrollment.fulfilled,(state,action)=>{
            state.bookingLoading = false;
            state.error = null;
            state.message = action.payload.message || null;

            const appointment = action.payload.appointment;
            if(appointment?._id){
                state.currentBooking = appointment;
                state.bookings = state.bookings.map((booking)=>booking._id === appointment._id ? appointment : booking)
            }
        })
        .addCase(cancelEnrollment.rejected,(state,action)=>{
            state.bookingLoading = false;
            state.error = action.payload;
        })

        builder.addCase(updateBooking.pending,(state)=>{
            state.bookingLoading = true;
            state.error = null;
            state.message = null;
        })
        .addCase(updateBooking.fulfilled,(state,action)=>{
            state.bookingLoading = false;
            state.error = null;
            state.message = action.payload.message || null;

            const appointment = action.payload.appointment;
            if(appointment?._id){
                state.currentBooking = appointment;
                state.bookings = state.bookings.map((booking)=>booking._id === appointment._id ? appointment : booking)
            }
        })
        .addCase(updateBooking.rejected,(state,action)=>{
            state.bookingLoading = false;
            state.error = action.payload;
        })

        builder.addCase(createRazorpayOrder.pending,(state)=>{
            state.paymentLoading = true;
            state.error = null;
            state.razorpayOrder = null;
        })
        .addCase(createRazorpayOrder.fulfilled,(state,action)=>{
            state.paymentLoading = false;
            state.error = null;
            state.razorpayOrder = action.payload.order || null;
            state.message = action.payload.message || null;
        })
        .addCase(createRazorpayOrder.rejected,(state,action)=>{
            state.paymentLoading = false;
            state.error = action.payload;
        });

        builder.addCase(verifyRazorpayPayment.pending,(state)=>{
            state.paymentLoading = true;
            state.error = null;
        })
        .addCase(verifyRazorpayPayment.fulfilled,(state,action)=>{
            state.paymentLoading = false;
            state.error = null;
            state.message = action.payload.message || null;
            const appointment = action.payload.appointment;
            if(appointment?._id){
                state.currentBooking = appointment;
                state.bookings = state.bookings.map((booking)=>booking._id === appointment._id ? appointment : booking)
            }
            state.razorpayOrder = null;
        })

        .addCase(verifyRazorpayPayment.rejected,(state,action)=>{
            state.paymentLoading = false;
            state.error = action.payload;
        })

        builder.addCase(createStripePayment.pending,(state)=>{
            state.paymentLoading = true;
            state.error = null;
            state.stripeSession = null;
        })
        .addCase(createStripePayment.fulfilled,(state,action)=>{
            state.paymentLoading = false;
            state.error = null;
            state.stripeSession = {sessionId:action.payload.sessionId,sessionUrl:action.payload.sessionUrl};
            state.message = action.payload.message || null;
        })
        .addCase(createStripePayment.rejected,(state,action)=>{
            state.paymentLoading = false;
            state.error = action.payload;
        })

        builder.addCase(verifyStripePayment.pending,(state)=>{
            state.paymentLoading = true;
            state.error = null;
        })
        .addCase(verifyStripePayment.fulfilled,(state,action)=>{
            state.paymentLoading = false;
            state.error = null;
            state.message = action.payload.message || null;

            const appointment = action.payload.appointment;
            if(appointment?._id){
                state.currentBooking = appointment;
                state.bookings = state.bookings.map((booking)=>booking._id === appointment._id ? appointment : booking);
            }
            state.stripeSession = null;
        })
        .addCase(verifyStripePayment.rejected,(state,action)=>{
            state.paymentLoading = false;
            state.error = action.payload;
        })

        builder
      .addCase(
        submitCourseEnquiry.pending,
        (state) => {
          state.enquiryLoading = true;
          state.error = null;
          state.message = null;
        }
      )

      .addCase(
        submitCourseEnquiry.fulfilled,
        (state, action) => {
          state.enquiryLoading = false;
          state.error = null;

          state.enquiry =
            action.payload.enquiry || null;

          state.message =
            action.payload.message || null;
        }
      )

      .addCase(
        submitCourseEnquiry.rejected,
        (state, action) => {
          state.enquiryLoading = false;
          state.error = action.payload;
        }
      );

      builder
      .addCase(applyJob.pending, (state) => {
        state.jobApplicationLoading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(applyJob.fulfilled, (state, action) => {
        state.jobApplicationLoading = false;
        state.error = null;

        state.jobApplication =
          action.payload.application || null;

        state.message =
          action.payload.message || null;
      })

      .addCase(applyJob.rejected, (state, action) => {
        state.jobApplicationLoading = false;
        state.error = action.payload;
      });

      builder
  .addCase(getPublicCourses.pending, (state) => {
    state.publicCoursesLoading = true;
    state.publicCoursesError = null;
  })

  .addCase(getPublicCourses.fulfilled, (state, action) => {
    state.publicCoursesLoading = false;
    state.publicCoursesError = null;

    state.publicCourses = action.payload.courses || [];
  })

  .addCase(getPublicCourses.rejected, (state, action) => {
    state.publicCoursesLoading = false;
    state.publicCoursesError = action.payload;
  });
    }
})

export const {logoutUser,clearUserError,clearUserMessage,clearOtpVerified,clearPasswordReset,clearRazorpayOrder,clearStripeSession,clearCurrentBooking,clearEnquiry,clearJobApplication} = userSlice.actions;

export default userSlice.reducer;