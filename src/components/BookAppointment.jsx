import React, { useEffect, useState, useRef } from "react";
import DashboardNav from "./DashboardNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChevronDown,
  Check,
  MapPin,
  Stethoscope,
  Building2,
} from "lucide-react";
import {
  faCalendar,
  faUser,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faXmark,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../axiosInstance.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  useEffect(() => {
    setDays(generate5Days());
  }, []);

  const [days, setDays] = useState([]);

  const [selected, setSelected] = useState(null);

  const [activeDay, setActiveDay] = useState(null);

  const [atTime, setAtTime] = useState(null);

  const [Time, setTime] = useState(null);

  const [appointment, setAppointment] = useState(false);

  const [Doctor, setDoctor] = useState(null);

  const [doctorData, setDoctorData] = useState([]);

  const [toPayment, setToPayment] = useState(true);

  const [doctorLoading, setDoctorLoading] = useState(false);

  // const [isDisabled, setIsDisabled] = useState(false);

  const [location, setLocation] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [hospital, setHospital] = useState(null);

  const hasRun = useRef(false);

  const locations = [
    { id: 1, label: "New York, NY", value: "new-york" },
    { id: 2, label: "Los Angeles, CA", value: "los-angeles" },
    { id: 3, label: "Chicago, IL", value: "chicago" },
    { id: 4, label: "Houston, TX", value: "houston" },
  ];

  const specialties = [
    { id: 1, label: "Cardiology", value: "cardiology" },
    { id: 2, label: "Dermatology", value: "dermatology" },
    { id: 3, label: "Emergency Medicine", value: "emergency-medicine" },
  ];

  const hospitals = [
    { id: 1, label: "Mayo Clinic", value: "mayo-clinic" },
    { id: 2, label: "Cleveland Clinic", value: "cleveland-clinic" },
    { id: 3, label: "Johns Hopkins Hospital", value: "johns-hopkins" },
  ];

  const CustomSelect = ({
    label,
    placeholder,
    options,
    value,
    onChange,
    icon: Icon,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
      onChange(option);
      setIsOpen(false);
    };

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="relative" ref={dropdownRef}>
        <label className="block text-sm font-semibold text-text mb-3">
          {label}
        </label>

        <button
          onClick={toggleDropdown}
          className={`
            w-full px-4 py-4 text-left bg-white border-2 rounded-xl
            shadow-sm hover:shadow-md transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-blue-100
            ${
              isOpen
                ? "border-blue-500 shadow-lg ring-4 ring-blue-100"
                : "border-gray-200 hover:border-gray-300"
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {Icon && <Icon className="w-5 h-5 text-text-muted" />}
              <span
                className={`
                ${value ? "text-gray-900 font-medium" : "text-gray-500"}
              `}
              >
                {value ? value.label : placeholder}
              </span>
            </div>
            <ChevronDown
              className={`
                w-5 h-5 text-gray-400 transition-transform duration-200
                ${isOpen ? "transform rotate-180" : ""}
              `}
            />
          </div>
        </button>

        <div
          className={`
          absolute z-50 w-full mt-2 bg-white border border-gray-200 
          rounded-xl shadow-xl transition-all duration-200 origin-top
          ${
            isOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }
        `}
        >
          <div className="py-2 max-h-64 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-4 py-3 text-left flex items-center justify-between
                  transition-colors duration-150 hover:bg-blue-50
                  ${
                    value?.id === option.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:text-blue-600"
                  }
                `}
              >
                <span className="font-medium">{option.label}</span>
                {value?.id === option.id && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const handleClick = (day) => {
    setSelected(day.fullDate);
    setActiveDay(day);
    setAtTime(null);
  };

  const handleProceed = () => {
    const { doctor, hospital, speciality, user_id, price } = Doctor;
    const { time } = Time;

    const data = {
      doctor: doctor,
      hospital: hospital,
      speciality: speciality,
      user_id: user_id,
      fee: price,
      time: time,
      date: selected,
    };
    axios
      .post("/appointments/book", data)
      .then((res) => {
        console.log(res.data);
        toast.success("Appointment booked.");
        setActiveDay(null);
        setAppointment(false);
        setToPayment(true);
        setAtTime(null);
      })
      .catch((err) => {
        // console.log(err.response.data.message)

        toast.error("already booked");
        console.log("an error occured", err);
      });
  };

  const handleClose = () => {
    setActiveDay(null);
    setAppointment(false);
    setToPayment(true);
    setAtTime(null);
  };

  const times = [
    {
      time: "9:00 AM",
    },
    {
      time: "10:30 AM",
    },
    {
      time: "2:00 PM",
    },
    {
      time: "4:00 PM",
    },
  ];

  const handleTimeSelect = (time, timeIndex) => {
    setAtTime(timeIndex);
    setTime(time);
  };

  const navigate = useNavigate();

  const handleConfirm = async (id) => {
    const res = await axios.get(`/user/profile/${user.id}`);
    const { phone, dob, address, gender, bloodGroup } = res.data;
    if (!phone || !dob || !address || !gender || !bloodGroup) {
      toast.error("Please Fill your details");
      navigate("/dashboard/profile");
    }
    const data = doctorData.find((d) => d._id === id);
    if (data) {
      setDoctor(data);
    }
    setAppointment(true);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const dataOfDoctor = async () => {
    setDoctorLoading(true);
    await axios
      .get("/doctors")
      .then((res) => {
        setDoctorData(res.data);
      })
      .catch(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        toast.error("Network Error");
      });
    setDoctorLoading(false);
  };

  useEffect(() => {
    dataOfDoctor();
  }, [user.id]);

  return (
    <>
      <div className="">
        <div className=" w-full flex flex-col pl-64 max-sm:pl-0">
          <DashboardNav />
          <div className="pt-16">
            <div className="bg-bg   min-h-dvh p-8 max-sm:p-4">
              <div className="w-full bg-gradient-to-r from-teal-500 to-teal-600 max-lg:flex-col max-lg:gap-3 flex justify-between p-8 max-sm:p-4 items-center rounded-3xl ">
                <div className="max-lg:order-2">
                  <h1 className="text-4xl max-md:text-3xl font-bold pb-3 text-white">
                    Welcome back, {user.name}! 👋
                  </h1>
                  <h1 className="text-white/90 text-lg">
                    Ready to take care of your health today?
                  </h1>
                </div>
                <div>
                  <img
                    className=" w-20 h-20 rounded-full max-lg:order-1 border-4 border-teal-500"
                    src={user.profile}
                    alt=""
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-6 pt-8">
                <div className=" flex max-sm:p-4 justify-between items-center bg-white rounded-2xl  p-6 transform hover:-translate-y-1.5 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out ">
                  <div>
                    <p className="text-sm text-text-muted pb-1">
                      Total Appointments
                    </p>
                    <h1 className="text-3xl font-bold text-text">12</h1>
                    <h2 className="text-sm text-green-600 pt-1">
                      +2 this month
                    </h2>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-2xl text-3xl text-white  ">
                    <FontAwesomeIcon icon={faCalendar} />
                  </div>
                </div>
                <div className=" flex justify-between items-center bg-white rounded-2xl max-sm:p-4  p-6  transform hover:-translate-y-1.5 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out">
                  <div>
                    <p className="text-sm text-text-muted pb-1">Upcoming</p>
                    <h1 className="text-3xl font-bold text-text">2</h1>
                    <h2 className="text-sm text-blue-400 pt-1">
                      Next: Tomorrow
                    </h2>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-2xl text-3xl text-white  ">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                </div>
                <div className=" flex max-sm:p-4 justify-between items-center bg-white rounded-2xl p-6  transform hover:-translate-y-1.5 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out">
                  <div>
                    <p className="text-sm text-text-muted pb-1">
                      Doctors Visited
                    </p>
                    <h1 className="text-3xl font-bold text-text">8</h1>
                    <h2 className="text-sm text-green-600 pt-1">
                      All specialists
                    </h2>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-2xl text-3xl text-white  ">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                </div>
              </div>
              <div className="bg-white mt-8 rounded-2xl">
                <div className="p-6 max-sm:p-4 ">
                  <div className="font-semibold text-text flex items-center gap-3 text-2xl">
                    <div className="w-8 h-8  bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-xl text-xl max-sm:text-lg max-sm:rounded-md text-white  ">
                      <FontAwesomeIcon icon={faCalendar} />
                    </div>
                    <h1>Find Your Perfect Doctor</h1>
                  </div>
                  <h1 className="text-lg max-sm:text-md text-text-muted pt-1.5">
                    Browse our network of certified healthcare professionals
                  </h1>
                </div>
                <div className="px-6 max-sm:px-4 pb-6">
                  <div className="grid max-xl:grid-cols-2 max-lg:grid-cols-1 grid-cols-4 gap-5 items-center">
                    <div className="relative self-end ">
                      <FontAwesomeIcon
                        className="absolute top-[35%]  left-4 text-text-muted"
                        icon={faMagnifyingGlass}
                      />

                      <input
                        className=" text-text
            w-full pr-3 pl-10 py-4 text-left bg-white border-2 rounded-xl
            shadow-sm hover:shadow-md transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-blue-100
              focus:border-blue-500 focus:shadow-lg 
              border-gray-200 hover:border-gray-300"
                        type="text"
                        placeholder="search doctors..."
                      />
                    </div>

                    {/* Location Select */}
                    <CustomSelect
                      label="Location"
                      placeholder="Select a location..."
                      options={locations}
                      value={location}
                      onChange={setLocation}
                      icon={MapPin}
                    />

                    {/* Specialty Select */}
                    <CustomSelect
                      label="Medical Specialty"
                      placeholder="Select a specialty..."
                      options={specialties}
                      value={specialty}
                      onChange={setSpecialty}
                      icon={Stethoscope}
                    />

                    {/* Hospital Select */}
                    <CustomSelect
                      label="Hospital"
                      placeholder="Select a hospital..."
                      options={hospitals}
                      value={hospital}
                      onChange={setHospital}
                      icon={Building2}
                    />
                  </div>
                </div>

                <div>
                  {doctorLoading ? (
                    <div className="w-full grid grid-cols-3 max-lg:grid-cols-1 max-xl:grid-cols-2 p-6 pt-0 gap-4 ">
                      <div className="grid grid-cols-1  gap-4 animate-pulse">
                        <div className="p-6 bg-white rounded-lg  shadow-sm border space-y-6 border-gray-100">
                          <div className="w-full flex flex-col gap-3 justify-center items-center">
                            <div className="h-20 self w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-600 w-3/4"></div>
                            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-600 w-2/4"></div>
                          </div>
                          <div className="space-y-4 ">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 w-5/6"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 w-5/6"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-800 w-6/6"></div>
                          </div>

                          <div className="space-y-4 ">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 w-2/6"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 "></div>
                          </div>
                          <div className="w-full flex flex-col gap-3 justify-center items-center">
                            <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1  gap-4 animate-pulse">
                        <div className="p-6 bg-white rounded-lg  shadow-sm border space-y-6 border-gray-100">
                          <div className="w-full flex flex-col gap-3 justify-center items-center">
                            <div className="h-20 self w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-600 w-3/4"></div>
                            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-600 w-2/4"></div>
                          </div>
                          <div className="space-y-4 ">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 w-5/6"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 w-5/6"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-800 w-6/6"></div>
                          </div>

                          <div className="space-y-4 ">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 w-2/6"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 "></div>
                          </div>
                          <div className="w-full flex flex-col gap-3 justify-center items-center">
                            <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1  gap-4 animate-pulse">
                        <div className="p-6 bg-white rounded-lg  shadow-sm border space-y-6 border-gray-100">
                          <div className="w-full flex flex-col gap-3 justify-center items-center">
                            <div className="h-20 self w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-600 w-3/4"></div>
                            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-600 w-2/4"></div>
                          </div>
                          <div className="space-y-4 ">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 w-5/6"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 w-5/6"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-800 w-6/6"></div>
                          </div>

                          <div className="space-y-4 ">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 w-2/6"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-700 "></div>
                          </div>
                          <div className="w-full flex flex-col gap-3 justify-center items-center">
                            <div className="h-15 self w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg animate-[shimmer_2s_infinite] delay-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 max-lg:grid-cols-1 max-xl:grid-cols-2 p-6 pt-0 gap-4">
                      {doctorData.map((doctor) => (
                        <div
                          key={doctor._id}
                          className="p-6 max-sm:p-4 group flex flex-col items-center transform hover:-translate-y-1.5 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out shadow-lg rounded-2xl "
                        >
                          <div className="bg-gray-200 w-20 h-20 rounded-2xl  border-0 border-teal-500"></div>
                          <div className="text-center">
                            <h1 className="font-semibold text-text text-lg group-hover:text-teal transition-colors pt-4">
                              {doctor.doctor}
                            </h1>
                            <p className="text-teal-600 font-medium  pb-6">
                              {doctor.speciality}
                            </p>
                          </div>
                          <div className="space-y-3 pb-6 w-full">
                            <div className="flex items-center text-sm text-text-muted">
                              <div className="text-teal pr-2">
                                <FontAwesomeIcon icon={faLocationDot} />
                              </div>
                              <h1>{doctor.hospital}</h1>
                            </div>
                            <div className="flex items-center text-sm text-text-muted">
                              <div className="text-teal pr-2">
                                <FontAwesomeIcon icon={faClock} />
                              </div>
                              <h1>{doctor.experience} years experience</h1>
                            </div>

                            <div className="flex justify-between">
                              <div className="flex items-center text-sm text-text-muted">
                                <div className="text-yellow-300 pr-2">
                                  <FontAwesomeIcon icon={faStar} />
                                </div>
                                <h1>
                                  <span className="text-text font-bold text-md">
                                    4.9
                                  </span>{" "}
                                  (124 reviews)
                                </h1>
                              </div>
                              <h1 className="text-[rgb(6,182,212)]">
                                ${doctor.price}
                              </h1>
                            </div>
                          </div>
                          <div className="self-start">
                            <h1 className="text-xs  text-start text-text-muted mb-3 font-medium">
                              Available today:
                            </h1>
                            <div className="flex flex-wrap gap-2 text-center">
                              {times.map((time) => (
                                <div className="inline-flex w-18 h-5 items-center justify-center rounded-full border px-2 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-xs border-teal-200 text-teal-600 bg-teal-50">
                                  <h1>{time.time}</h1>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="pt-6  w-full">
                            <button
                              onClick={() => handleConfirm(doctor._id)}
                              className=" inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-teal hover:bg-teal/90 h-10 px-4 py-2 w-full gradient-teal text-white hover:shadow-lg transition-all duration-300"
                            >
                              Book Appointment
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {appointment && (
                <div className=" fixed inset-0 bg-black/40 z-60 backdrop-blur-sm min-h-dvh overflow-y-auto   ">
                  <div className="absolute top-1/2 left-1/2 bg-white -translate-x-1/2 -translate-y-1/2 w-[666px] max-h-[668px] overflow-y-auto rounded-xl">
                    <div className="flex justify-between w-full  border-b-gray-200 border-b-1 p-6 ">
                      <h1 className=" text-2xl font-bold text-text">
                        Book Appointment
                      </h1>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-white text-text h-9 rounded-xl px-3 hover:bg-teal "
                        onClick={handleClose}
                      >
                        {" "}
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                    <div className="p-8 max-sm:p-4 space-y-8">
                      <div className="bg-bg rounded-2xl flex gap-8 p-6 items-center ">
                        <div className="bg-gray-200 w-20 h-20 rounded-2xl  border-0 border-teal-500"></div>

                        {Doctor && (
                          <div>
                            <h1 className="font-semibold text-text text-xl">
                              {Doctor.doctor}
                            </h1>
                            <h1 className="text-teal-500 font-medium text-lg">
                              {Doctor.speciality}
                            </h1>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-text-muted">
                              <div className="flex gap-2">
                                <FontAwesomeIcon icon={faUser} />
                                <h1>{Doctor.hospital}</h1>
                              </div>
                              <h1>${Doctor.price}</h1>
                            </div>
                          </div>
                        )}
                      </div>
                      {toPayment ? (
                        <div>
                          {" "}
                          <div className="font-semibold text-text pb-4 flex flex-col text-lg">
                            <div className="flex gap-3 pb-4">
                              <div className="text-teal">
                                {" "}
                                <FontAwesomeIcon icon={faUser} />
                              </div>

                              <h1 className="">Select Date</h1>
                            </div>
                            <div className="grid grid-cols-5 gap-3">
                              {days.map((day) => (
                                <div
                                  key={day.date}
                                  onClick={() => handleClick(day)}
                                  className={`
          p-4 text-center rounded-2xl w-[110px] h-20 transition-all duration-300
          ${
            activeDay === day
              ? "text-white bg-gradient-to-r from-teal-600 to-teal-700 cursor-pointer"
              : "text-gray-800 bg-white hover:border-teal-300 hover:bg-teal-50 border-2 border-gray-200 cursor-pointer"
          }
        `}
                                >
                                  <h1 className="font-medium">{day.label}</h1>
                                  <h1 className="text-sm">{day.date}</h1>
                                </div>
                              ))}
                            </div>
                          </div>
                          {activeDay != null && (
                            <div className="font-semibold text-text pb-4 flex flex-col text-center text-lg">
                              <div className="flex gap-3 pb-4">
                                <div className="text-teal">
                                  {" "}
                                  <FontAwesomeIcon icon={faUser} />
                                </div>
                                <h1 className="">Select Time</h1>
                              </div>
                              <div className="grid grid-cols-3 gap-3">
                                {times.map((time, index) => (
                                  <div
                                    key={index}
                                    onClick={() =>
                                      handleTimeSelect(time, index)
                                    }
                                    className={`cursor-pointer p-3 text-center rounded-2xl  transition-all duration-300 
            ${
              atTime === index
                ? "text-white bg-gradient-to-r from-teal-600 to-teal-700"
                : "text-gray-800 bg-white hover:border-teal-300 hover:bg-teal-50 border-2 border-gray-200"
            }`}
                                  >
                                    <h1 className="font-medium text-md w-[157px]">
                                      {time.time}
                                    </h1>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {atTime != null && (
                            <div>
                              <button
                                onClick={() => setToPayment(false)}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-medium ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-teal hover:bg-teal/90 px-4 py-2 w-full h-12 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-lg hover:shadow-lg transition-all duration-300"
                              >
                                Continue to Confirmation{" "}
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div>
                            <h1 className="font-semibold text-text text-xl">
                              Appointment Summary
                            </h1>
                          </div>
                          {Doctor && (
                            <div>
                              <div className="bg-bg rounded-2xl">
                                <div className="grid grid-cols-2  p-6 mt-6  gap-4 ">
                                  <div>
                                    <h1 className="text-text-muted text-sm">
                                      Doctor
                                    </h1>
                                    <h1 className="font-medium text-text">
                                      {Doctor.doctor}
                                    </h1>
                                  </div>
                                  <div>
                                    <h1 className="text-text-muted text-sm">
                                      Specialty
                                    </h1>
                                    <h1 className="font-medium text-text">
                                      {Doctor.speciality}
                                    </h1>
                                  </div>
                                  <div>
                                    <h1 className="text-text-muted text-sm">
                                      Date
                                    </h1>
                                    <h1 className="font-medium text-text">
                                      {selected}
                                    </h1>
                                  </div>
                                  <div>
                                    <h1 className="text-text-muted text-sm">
                                      Time
                                    </h1>
                                    <h1 className="font-medium text-text">
                                      {Time.time}
                                    </h1>
                                  </div>
                                </div>
                                <div className="p-6 ">
                                  {" "}
                                  <div className="h-0.5 bg-teal-300 w-full"></div>
                                </div>

                                <div className="flex justify-between pb-4 px-6 pt-0 ">
                                  <h1 className="text-text-muted">
                                    Consultation fee
                                  </h1>
                                  <h1 className="font-bold text-2xl text-teal-500">
                                    ${Doctor.price}
                                  </h1>
                                </div>
                              </div>
                              <div className="w-full flex justify-between gap-4 pt-8">
                                <button
                                  onClick={() => setToPayment(true)}
                                  className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-white hover:text-text text-text-muted px-4 py-2 flex-1 h-12 border-gray-200 hover:bg-bg"
                                >
                                  Back
                                </button>
                                <button
                                  onClick={handleProceed}
                                  className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-teal hover:bg-teal/90 px-4 py-2 flex-1 h-12 gradient-teal text-white hover:shadow-lg transition-all duration-300"
                                >
                                  Proceed To Payment
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;

function generate5Days() {
  const days = [];

  for (let i = 0; i < 5; i++) {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + i);

    const fullDate = dateObj.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const dateNum = dateObj.getDate(); // 14
    const label =
      i === 0
        ? "Today"
        : i === 1
        ? "Tomorrow"
        : dateObj.toLocaleDateString("en-US", { weekday: "short" });

    days.push({ label, date: dateNum, fullDate });
  }

  return days;
}
