import DashboardNav from "./DashboardNav";
import {
  faCalendar,
  faClock,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState,useRef } from "react";
import axios from "../axiosInstance";
import toast from "react-hot-toast";

const MyAppointment = () => {
  const [appointmentData, setappointmentData] = useState([]);
  const [loading,setLoading] = useState(false);
  const hasRun = useRef(false)

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
  setLoading(true)
    axios.get(`/appointments/user/${user.id}`).then((res) => {
      setappointmentData(res.data);
    }).catch(()=>{  if (hasRun.current) return;
    hasRun.current = true;
      toast.error("Network Error")}).finally(()=>{ setLoading(false)})
  },[user.id]);

  return (
    <>
      <div className="pl-64 max-sm:pl-0">
        <div className="w-full flex flex-col">
          <DashboardNav />
          <div className="pt-16">
            <div className="bg-bg min-h-dvh max-sm:p-4 p-8 ">
              <div>
                <h1 className="text-4xl max-sm:text-3xl font-bold text-text mb-3">
                  My Appointments
                </h1>
                <h1 className="text-text-muted text-lg">
                  Manage and track all your medical appointments
                </h1>
              </div>
              {loading ? (
                <div>
                <div className="bg-white rounded-lg shadow-sm border mt-6 border-gray-100 p-6">
                  <div className="space-y-4 animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-2xl animate-[shimmer_2s_infinite] delay-1200"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-1300 w-1/3"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-1400 w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-1600 w-2/5"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-1700 w-3/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-1900 w-1/4"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-2000 w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                       <div className="bg-white rounded-lg shadow-sm border mt-6 border-gray-100 p-6">
                  <div className="space-y-4 animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-2xl animate-[shimmer_2s_infinite] delay-1200"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-1300 w-1/3"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-1400 w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-1600 w-2/5"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-1700 w-3/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-1900 w-1/4"></div>
                        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-2000 w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                
              ) : (
                <div>
                  {appointmentData.map((data) => (
                    <div className="bg-white mt-6 rounded-2xl">
                      <div className="flex p-8 max-sm:p-4 max-md:flex-col max-md:gap-4 max-sm:gap-4 justify-between items-center">
                        <div className="flex max-sm:flex-col max-sm:items-center max-sm:gap-4 ">
                          <div className="bg-gray-200 w-20 h-20 rounded-2xl  border-0 border-teal-500"></div>
                          <div className="pl-6 max-sm:pl-0">
                            <h1 className="text-xl max-sm:text-center font-semibold text-text">
                              {data.doctor}
                            </h1>
                            <h1 className="text-teal-500  max-sm:text-center font-medium text-lg pb-2">
                              {data.speciality}
                            </h1>
                            <div className="space-y-2 text-text-muted">
                              <div className="flex space-x-2 max-lg:flex-col max-lg:gap-2 ">
                                <div className="flex items-center space-x-2">
                                  <div>
                                    <FontAwesomeIcon icon={faCalendar} />
                                  </div>
                                  <div>{data.date}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div>
                                    <FontAwesomeIcon icon={faClock} />
                                  </div>
                                  <div>{data.time}</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div>
                                  <FontAwesomeIcon icon={faLocationDot} />
                                </div>
                                <div>{data.hospital}</div>
                              </div>
                              <div>
                                <h1 className="text-sm">
                                  123,Medical St,Downtown
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex max-lg:flex-col max-md:flex-row max-sm:flex-col max-xl:items-center gap-3">
                          <div className="inline-flex gap-3 items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-bg h-10 px-4 py-2 border-teal-200 text-teal-500 hover:bg-teal-50 bg-transparent">
                            <FontAwesomeIcon icon={faPhone} />
                            <button>Call</button>
                          </div>
                          <div className="inline-flex gap-3 items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-bg h-10 px-4 py-2 border-gray-300 text-[#c1966c] hover:bg-teal-50 bg-transparent">
                            <FontAwesomeIcon icon={faComment} />
                            <button>Message</button>
                          </div>
                          <div className="inline-flex gap-3 items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-bg h-10 px-4 py-2 border-gray-300 text-[#c1966c] hover:bg-teal-50 bg-transparent">
                            <button>Reschedule</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAppointment;
