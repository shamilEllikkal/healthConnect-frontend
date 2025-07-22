import React, { useEffect, useState,useRef } from "react";
import DashboardNav from "./DashboardNav";
import { faUser, faCamera } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../axiosInstance";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "*Name must be atleast 2 character")
    .required("*Name is required"),
  email: yup.string().email("*Invalid email").required("*Email is required"),
  dob: yup.string().required("*field is Required"),
  phone: yup
    .string()
    .min(10, "*Must be atleast 10 numbers")
    .required("*Phone number is required"),
  gender: yup.string().required("*Gender is required"),
  address: yup
    .string()
    .min(10, "*Must be atleast 10 characters")
    .required("*This field is required"),
  bloodGroup: yup.string().required("*Blood Type is required"),
});

const UserProfile = () => {

  const [profileLoading, setProfileLoading] = useState(false);
  const [saveLoading,setSaveLoading] = useState(false);
  const [loading,setLoading] = useState(false)
  const hasRun = useRef(false)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

     setProfileLoading(true)

    const profile = new FormData();
    profile.append("file", file);
    profile.append("upload_preset", "profile_picture");
    profile.append("cloud_name", "druyim69w");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/druyim69w/image/upload",
      {
        method: "POST",
        body: profile,
      }
    );

    const uploadedImageURL = await res.json();
    const URL = uploadedImageURL.url;

   
    const profilePic = await axios.patch(`/user/update/${user.id}`, {
      profilePicture: URL,
    });
    const updatedUser = { ...user, profile: profilePic.data.profilePicture };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
   await setProfileLoading(false)
    toast.success("Profile Picture Updated");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const getProfile = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/user/profile/${user.id}`);
      const data = res.data;

      reset({
        name: data.name, // or data.fullname based on backend
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        address: data.address,
        gender: data.gender,
        bloodGroup: data.bloodGroup,
        emergencyContact: data.emergencyContact,
        allergies: data.allergies,
        currentMedications: data.currentMedications,
        medicalHistory: data.medicalHistory,
      });
    } catch (error) {
      console.log(error, "error");
       if (hasRun.current) return;
    hasRun.current = true;
      toast.error("Network Error")
    }
    setLoading(false)
  };

  const editProfile = async (data) => {
setSaveLoading(true)
    try {
      const res = await axios.patch(`/user/update/${user.id}`, data);
      const updatedUser = { ...user, name: data.name };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      await getProfile();
      toast.success("Profile Updated");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    setSaveLoading(false)
  };
  useEffect(() => {
    getProfile();
    
  }, []);

  return (
    <>
      <div className="pl-64 max-sm:pl-0">
        <div className=" w-full flex flex-col">
          <DashboardNav />

          <div className="pt-16">
            <form onSubmit={handleSubmit(editProfile)} noValidate>
              <div className="bg-bg min-h-dvh space-y-6 max-sm:p-6 p-8 ">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Profile Settings
                  </h1>
                  <h1 className="text-gray-600 pt-2">
                    Manage your personal information and preferences
                  </h1>
                </div>

                <div className="flex max-lg:flex-col gap-6">
                  <div className="bg-white w-[500px] max-lg:w-full max-sm:w-full rounded-2xl shadow-xl ">
                    <div className="font-semibold text-text flex items-center gap-2 text-2xl p-6">
                      <div className="w-8 h-8 flex items-center justify-center rounded-xl text-xl text-text   ">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      <h1>Profile Picture</h1>
                    </div>
                    <div className="p-6 max-sm:p-4 pt-0 text-center flex flex-col items-center justify-center gap-3  ">
                      <div className="relative">
                        <div className="relative">
                          {profileLoading && (<div className="w-9 h-9 absolute top-[50%] left-[50%] z-6 -translate-1/2 border-4 border-gray-300 border-t-teal rounded-full animate-spin"></div>)}
                          
                          <img
                            loading="lazy"
                            className="w-32 relative h-32 rounded-full object-cover border-4 border-gray-200"
                           src={user.profile === "" ? "/defaultprofile.jpg" : user.profile  }
                            alt=""
                          />
                        </div>
                        <div>
                          <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileUpload}
                            className="w-8 h-8 flex items-center justify-center rounded-full text-md text-white/0 absolute bottom-0 right-0 bg-teal-500 "
                          />

                          <label
                            htmlFor="fileInput"
                            className="text-white absolute bottom-1 right-2"
                          >
                            {" "}
                            <FontAwesomeIcon icon={faCamera} />
                          </label>
                        </div>
                      </div>
                      <h1 className="font-semibold text-gray-900">
                        {user.name}
                      </h1>
                      <h1 className="text-sm text-gray-600">
                        Patient ID: #12345
                      </h1>
                    </div>
                  </div>
                  <div className="bg-white w-full rounded-2xl  shadow-xl ">
                    
                    {loading ?  (  <div className="space-y-6 p-8">
                <div>
                    <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                </div>
                <div className="grid max-md:grid-cols-1 grid-cols-2 gap-6">
                  <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                  <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                  <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                  <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                  <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                  <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                </div>
                <div>
                  <div className="h-30 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                </div>
              </div>) : ( <div>
                <div>
                      <h1 className="text-2xl font-semibold leading-none max-sm:p-4 p-6 text-text">
                        Personal Information
                      </h1>
                    </div> <div className="p-6 max-sm:p-4 pt-0">
                      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                        <div>
                          <label
                            htmlFor="fullName"
                            className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Full Name
                          </label>
                          <input
                            placeholder="Full Name"
                            {...register("name")}
                            className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                            type="text"
                            id="fullName"
                          />
                          <p className=" text-red-600 text-sm p-0.5 ">
                            {errors.name?.message}
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="emailAddress"
                            className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Email Address
                          </label>
                          <input
                            placeholder="Email Address"
                            {...register("email")}
                            className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                            type="text"
                            id="emailAddress"
                          />
                          <p className=" text-red-600 text-sm p-0.5 ">
                            {errors.email?.message}
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="phoneNumber"
                            className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {" "}
                            Phone Number
                          </label>
                          <input
                            {...register("phone")}
                            placeholder=" Phone Number"
                            className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                            type="text"
                            id="phoneNumber"
                          />
                          <p className=" text-red-600 text-sm p-0.5 ">
                            {errors.phone?.message}
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="dateOfBirth"
                            className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {" "}
                            Date Of Birth
                          </label>
                          <input
                            {...register("dob")}
                            className="flex h-10 w-full rounded-xl border border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                            type="date"
                            id="dateOfBirth"
                          />
                          <p className=" text-red-600 text-sm p-0.5 ">
                            {errors.dob?.message}
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="gender"
                            className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {" "}
                            Gender
                          </label>
                          <input
                            placeholder="eg: Male"
                            {...register("gender")}
                            className="flex h-10 w-full rounded-xl border border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal  disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                            type="text"
                            id="gender"
                          />
                          <p className=" text-red-600 text-sm p-0.5 ">
                            {errors.gender?.message}
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="hobbies"
                            className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {" "}
                            Hobbies
                          </label>
                          <input
                            className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                            type="text"
                            id="hobbies"
                          />
                        </div>
                      </div>
                      <div className="pt-6">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="address"
                        >
                          Address
                        </label>
                        <textarea
                          {...register("address")}
                          name="address"
                          id="address"
                          placeholder="Address"
                          className="flex min-h-[80px] w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                        ></textarea>
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.address?.message}
                        </p>
                      </div>
                    </div>
                    </div>)}
                  
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl">
                  {loading ? (  <div className="space-y-6 p-8">
                <div >
                  <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>

                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                  <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="h-30 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                  <div className="h-30 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                  <div className="h-30 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                </div>
             
             
              </div>):(
                      <div>
                  <div className="p-6 max-sm:p-4 ">
                    <h1 className="text-2xl font-semibold leading-none text-text">
                      Medical Information
                    </h1>
                  </div>
                  <div className="pt-0 max-sm:p-4 p-6">
                    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor="hobbies"
                          className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {" "}
                          Blood Type
                        </label>
                        <input
                          placeholder="eg: O+"
                          {...register("bloodGroup")}
                          className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                          type="text"
                          id="hobbies"
                        />
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.bloodGroup?.message}
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="hobbies"
                          className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {" "}
                          Emergency Contact
                        </label>
                        <input
                          {...register("emergencyContact")}
                          className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                          type="text"
                          id="hobbies"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="pt-6">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="allergies"
                        >
                          Allergies
                        </label>
                        <textarea
                          {...register("allergies")}
                          name="allergies"
                          id="allergies"
                          placeholder="Allergies"
                          className="flex min-h-[80px] w-full rounded-xl border border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                        ></textarea>
                      </div>
                      <div className="pt-6">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="currentMedications"
                        >
                          Current Medications
                        </label>
                        <textarea
                          {...register("currentMedications")}
                          name="currentMedications"
                          id="currentMedications"
                          placeholder="Current Medications"
                          className="flex min-h-[80px] w-full rounded-xl border border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                        ></textarea>
                      </div>
                      <div className="pt-6">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="history"
                        >
                          Medical History
                        </label>
                        <textarea
                          {...register("medicalHistory")}
                          name="history"
                          id="history"
                          placeholder="Medical History"
                          className="flex min-h-[80px] w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            
                 </div>
                <div className="bg-white rounded-2xl shadow-xl">
                  <div className="flex justify-end items-center gap-4 p-6">
                    {/* <button onClick={onCancel} className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-text-muted bg-white hover:bg-bg hover:text-text h-10 px-4 py-2">
                        Cancel
                      </button> */}
                    <div
                      type="submit"
                      className="inline-flex  gap-2 items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2 bg-teal-500 hover:bg-teal-600"
                    >
                    {saveLoading ? (<div className="w-5 h-5 border-4 border-white border-t-teal-700 rounded-full animate-spin"></div>) : (<FontAwesomeIcon icon={faFloppyDisk} />) }  
                      <button>Save Changes</button>
                    </div>
                    
                  </div>
                </div>
                </div>
             
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
