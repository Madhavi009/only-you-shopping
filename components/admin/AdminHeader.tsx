"use client";

export default function AdminHeader({ showSidebar }: any) {
  return (
    <header
      className={`fixed top-0 right-0 z-40 h-16 bg-white border-b shadow-sm transition-all duration-300 ${
        showSidebar ? "md:left-60 left-0" : "md:left-16 left-0"
      }`}
    >
      <div className="h-full px-4 md:px-8 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">

          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>

          <h1 className="font-bold tracking-[2px] md:tracking-[4px] text-sm md:text-xl truncate">
            ONLYYOULIFESTYLE
          </h1>

          <span className="text-gray-400 hidden md:block">
            /
          </span>

          <span className="text-slate-400 font-bold tracking-[2px] md:tracking-[3px] text-xs md:text-sm hidden lg:block">
            COMMAND CENTER
          </span>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 md:gap-6">

          <button className="text-xl md:text-3xl text-slate-400">
            ↪
          </button>

          <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm md:text-base">
            👤
          </button>

        </div>

      </div>
    </header>
  );
}