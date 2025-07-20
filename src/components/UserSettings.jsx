import React from "react";
import DashboardNav from "./DashboardNav";

const UserSettings = () => {
  return (
    <>
      <div className="pl-64 max-sm:pl-0">
        <div className=" w-full flex flex-col">
          <DashboardNav />
          <div className="pt-16">
            <div className="bg-bg h-screen ">
              <div className="grid grid-cols-1  gap-4 animate-pulse">
                <div className="p-6 bg-white rounded-lg  shadow-sm border space-y-6 border-gray-100">
                  <div className="w-full flex flex-col gap-3 justify-center items-center">
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-600 w-3/4"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded animate-[shimmer_2s_infinite] delay-600 w-2/4"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
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
             
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettings;
