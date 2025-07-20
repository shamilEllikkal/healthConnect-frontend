import React from "react";
import NavBar from "../components/NavBar";
import {
  faArrowRight,
  faStar,
  faPhone,
  faLocationDot,
  faEnvelope,
  faStethoscope,
  faShield,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faCalendar,
  faUser,
  faClock,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePage = () => {
  return (
    <div className="bg-bg">
      <div className="relative">
        <NavBar />
      </div>
      <div className=" w-full min-h-dvh pt-[71px] pb-10 flex px-16.5 max-md:px-8  items-center gap-7 max-lg:flex-col max-lg:justify-around  ">
        <div className="flex flex-col w-[100%] max-lg:w-auto max-lg:py-8 ">
          <div className="">
            <h1 className="text-7xl  max-xl:text-6xl max-md:text-5xl  leading-none  font-bold text-text ">
              Find the Right <br />{" "}
              <span className="text-teal">Doctor Near You</span>
            </h1>
          </div>
          <div>
            <h1 className="text-text-muted text-xl max-w-lg pt-5 ">
              Connect with qualified healthcare professionals in your area. Book
              appointments instantly and take control of your health journey
              with ease.
            </h1>
          </div>
          <div className="flex max-md:flex-col gap-4 pt-8 ">
            <Link to="/signup">
              <div className="flex items-center gap-3 h-11 w-60 justify-center bg-[#14B8A6] text-white text-medium text-lg rounded-2xl hover:bg-teal-600 transition duration-300 ease-in-out group ">
                <div className="">
                  <button>Book Appointment </button>
                </div>
                <div className="transform group-hover:translate-x-1.5 ease-out duration-300 text-sm ">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>{" "}
              </div>
            </Link>
            <button className="h-11 w-41 hover:bg-white text-teal-600 text-lg font-medium border rounded-2xl border-teal/50 transition duration-300 ease-in-out  ">
              Learn More
            </button>
          </div>
          <div className="flex gap-8 text-center pt-14 ">
            <div>
              <h1 className="text-3xl font-bold text-text">500+</h1>
              <p className="text-sm text-text-muted">Qualified Doctors</p>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text">50k+</h1>
              <p className="text-sm text-text-muted">Happy Patients</p>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text">4.9</h1>
              <p className="text-sm text-text-muted">Average Rating</p>
            </div>
          </div>
        </div>
        <div className=" w-full  max-lg:w-auto ">
          <div className="relative w-125 h-125  max-xl:w-112 max-xl:h-112 max-md:w-full max-md:h-full max-md:flex ">
            <div className="h-20 w-50 bg-white flex justify-between items-center rounded-2xl absolute p-4 -top-9 -left-12 max-md:-left-5 z-5 animate-small-1 ">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-3xl text-2xl text-white  ">
                <FontAwesomeIcon icon={faStethoscope} />
              </div>
              <div>
                <h1 className="font-semibold text-text">24/7 Care</h1>
                <p className="text-sm text-text-muted ">Always Available</p>
              </div>
            </div>

            <img
              className="w-125 h-125 bg-gray-200 rounded-2xl max-xl:w-112 max-xl:h-112 max-md:w-75 max-md:h-75 animate-float object-cover z-4"
              src="null"
              alt=""
            />

            <div className="bg-white flex justify-between items-center rounded-2xl absolute p-4 h-20 w-50 -right-12 -bottom-9 max-md:-right-5 animate-small-2 z-5">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-3xl text-2xl text-white  ">
                <FontAwesomeIcon icon={faShield} />
              </div>
              <div className="">
                <h1 className="font-semibold text-text">Secure & Safe</h1>
                <p className="text-sm text-text-muted ">HIPAA compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white/50 p-16.5 max-md:px-8  flex flex-col items-center ">
        <div className="text-center">
          <h1 className="text-text text-4xl font-bold ">
            Why Choose HealthConnect?
          </h1>
          <p className="text-text-muted text-xl max-w-2xl pt-4 ">
            Experience healthcare booking like never before with our innovative
            features
          </p>
        </div>
        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-8 pt-12 ">
          <div className="h-61 bg-white p-8 text-center rounded-2xl shadow-sm group transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out ">
            <div className="w-full flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center transform group-hover:scale-111 hover:shadow-lg transition-all duration-200 ease-out justify-center rounded-2xl text-2xl  text-white  ">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>

            <h1 className="text-xl font-semibold text-text pt-6 pb-3">
              Search by Specialty
            </h1>
            <p className="text-text-muted leading-relaxed">
              Find doctors by their medical specialty and expertise areas
            </p>
          </div>
          <div className="h-61  bg-white p-8 text-center  rounded-2xl shadow-sm  group transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out  ">
            <div className="w-full flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-2xl text-2xl text-white transform group-hover:scale-111 hover:shadow-lg transition-all duration-200 ease-out   ">
                <FontAwesomeIcon icon={faCalendar} />{" "}
              </div>
            </div>
            <h1 className="text-xl font-semibold text-text pt-6 pb-3">
              Book Time Slots Easily
            </h1>
            <p className="text-text-muted leading-relaxed">
              Choose from available time slots that fit your schedule
            </p>
          </div>
          <div className="h-61  bg-white p-8  text-center  rounded-2xl shadow-sm group transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out  ">
            <div className="w-full flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center transform group-hover:scale-111 hover:shadow-lg transition-all duration-200 ease-out justify-center rounded-2xl text-2xl text-white  ">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
            </div>
            <h1 className="text-xl font-semibold text-text pt-6 pb-3">
              Nearby Hospitals
            </h1>
            <p className="text-text-muted leading-relaxed">
              Discover healthcare facilities and clinics near your location
            </p>
          </div>
        </div>
      </div>
      <div className="p-16.5 max-md:px-8  px-20 flex flex-col items-center text-center ">
        <div className="pb-16">
          <h1 className="text-4xl text-text font-bold">How It Works</h1>
          <p className="text-xl text-text-muted max-w-2xl ">
            Get started with your healthcare journey in just three simple steps
          </p>
        </div>
        <div className="grid grid-cols-3  max-md:grid-cols-1 gap-8">
          <div className="text-center flex flex-col items-center relative group ">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-full text-[40px] text-white transform group-hover:scale-111 hover:shadow-lg transition-all duration-200 ease-out  ">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <h1 className="text-xl font-semibold  text-text pt-8">
              Choose Doctor
            </h1>
            <p className="text-text-muted leading-relaxed pt-3">
              {" "}
              Browse through our network of qualified healthcare professionals
            </p>
            <div className="w-8 h-8 rounded-3xl bg-teal text-white flex justify-center items-center absolute -top-4 -right-4  ">
              01
            </div>
            <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-teal-300 -translate-x-1/2"></div>
          </div>
          <div className="text-center flex flex-col items-center relative group ">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-full text-[40px] text-white transform group-hover:scale-111 hover:shadow-lg transition-all duration-200 ease-out ">
              <FontAwesomeIcon icon={faClock} />
            </div>
            <h1 className="text-xl font-semibold  text-text pt-8">
              {" "}
              Pick Time Slot
            </h1>
            <p className="text-text-muted leading-relaxed pt-3">
              {" "}
              Select your preferred appointment time from available slots
            </p>
            <div className="w-8 h-8 rounded-3xl bg-teal text-white flex justify-center items-center absolute -top-4 -right-4 ">
              02
            </div>
            <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-teal-300 -translate-x-1/2"></div>
          </div>
          <div className="text-center flex flex-col items-center relative group">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-full text-[40px] text-white transform group-hover:scale-111 hover:shadow-lg transition-all duration-200 ease-out ">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <h1 className="text-xl font-semibold  text-text pt-8">
              Confirm Appointment{" "}
            </h1>
            <p className="text-text-muted leading-relaxed pt-3">
              {" "}
              Complete your booking and receive instant confirmation
            </p>
            <div className="w-8 h-8 rounded-3xl bg-teal text-white flex justify-center items-center absolute -top-4 -right-4 ">
              03
            </div>
          </div>
        </div>
      </div>
      <div className="p-16.5 max-md:px-8  bg-white/50 ">
        <div className="text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-4">
            What Our Patients Say
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Real experiences from real people who trust HealthConnect
          </p>
        </div>
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-8 pt-16">
          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out  ">
            <div className="text-teal pb-4">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div>
              <h1 className="text-text-muted pb-6 italic leading-relaxed">
                "This platform made booking my appointment so simple and
                stress-free. The interface is intuitive and the doctors are
                excellent!"
              </h1>
            </div>
            <div className="flex  gap-3 items-start  ">
              <div className="w-10 h-10 rounded-3xl flex items-center justify-center bg-teal text-white">
                SJ
              </div>
              <div>
                <h1 className="text-text  font-semibold">Sarah Johnson</h1>
                <p className="text-sm text-text-muted">Patient</p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl   transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out ">
            <div className="text-teal pb-4">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div>
              <h1 className="text-text-muted pb-6 italic leading-relaxed">
                "I love how I can book appointments during my lunch break. The
                time slot system is perfect for my busy schedule."
              </h1>
            </div>
            <div className="flex  gap-3 items-start">
              <div className="w-10 h-10 rounded-3xl flex items-center justify-center bg-teal text-white">
                MC
              </div>
              <div>
                <h1 className="text-text  font-semibold">Michael Chen</h1>
                <p className="text-sm text-text-muted">Working Professional</p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl   transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out">
            <div className="text-teal pb-4">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div>
              <h1 className="text-text-muted pb-6 italic leading-relaxed">
                "Finding pediatricians for my kids has never been easier. The
                search by specialty feature is a game-changer!"
              </h1>
            </div>
            <div className="flex  gap-3 items-start">
              <div className="w-10 h-10 rounded-3xl flex items-center justify-center bg-teal text-white">
                ER
              </div>
              <div>
                <h1 className="text-text  font-semibold">Emily Rodriguez</h1>
                <p className="text-sm text-text-muted">Mother of Two</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-teal-600  w-full p-16.5 max-md:px-8  flex flex-col items-center justify-center text-center ">
        <h1 className="text-3xl lg:text-4xl font-bold text-white pb-4">
          Ready to Take Control of Your Health?
        </h1>
        <p className="text-xl text-white/90 pb-8 max-w-2xl mx-auto">
          Join thousands of patients who have discovered a better way to connect
          with healthcare professionals
        </p>
        <Link to="/signup">
          <button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-2xl bg-white text-teal-600 hover:bg-bg hover:text-teal-600 px-8 py-4 text-lg transition-all duration-300">
            Start Your Journey Today
          </button>
        </Link>
      </div>
      <div className="bg-white max-md:px-8  p-16.5 ">
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-8 ">
          <div>
            {" "}
            <div className="flex items-center gap-3  ">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-2xl text-2xl text-white  ">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <h1 className="font-bold text-text text-2xl  ">HealthConnect</h1>
            </div>
            <p className="text-text-muted pt-4">
              Your trusted partner for seamless healthcare experiences and
              professional medical care.
            </p>
          </div>
          <div>
            <h1 className="font-semibold text-text pb-4">Quick Links</h1>

            <div className="text-text-muted flex flex-col gap-2">
              <Link className="hover:text-teal duration-200 ease-out" to="">
                About
              </Link>
              <Link className="hover:text-teal duration-200 ease-out" to="">
                Contact
              </Link>
              <Link className="hover:text-teal duration-200 ease-out" to="">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-text pb-4">Services</h1>

            <div className="text-text-muted flex flex-col gap-2">
              <Link className="hover:text-teal duration-200 ease-out" to="">
                Find Doctors
              </Link>
              <Link className="hover:text-teal duration-200 ease-out" to="">
                Book Appointments
              </Link>
              <Link className="hover:text-teal duration-200 ease-out" to="">
                Health Records
              </Link>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-text pb-4">Contact Info</h1>

            <div className="text-text-muted flex flex-col gap-2">
              <div className="flex items-center gap-2  ">
                <div className="w-5 h-5 flex items-center justify-center ">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <Link to="">+1 (555) 123-4567</Link>
              </div>
              <div className="flex items-center gap-2 ">
                <div className="w-5 h-5 flex items-center justify-center ">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>{" "}
                <Link to="">hello@healthconnect.com</Link>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center ">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>{" "}
                <Link to="">123 Health St, Medical City</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-text-muted text-center pt-20 max-md:text-sm">
          <h1>
            © 2024 HealthConnect. All rights reserved. Made with ❤️ for better
            healthcare.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
