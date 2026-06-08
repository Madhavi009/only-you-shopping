"use client";

export default function AdminHeader({ showSidebar }: any) {
  return (
    <header
      className={`fixed top-0 right-0 z-50 h-16 bg-white border-b shadow-sm transition-all duration-300 ${
        showSidebar ? "left-60" : "left-16"
      }`}
    >
      <div className="h-full px-8 flex items-center justify-between">

        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <h1 className="font-bold tracking-[4px] text-xl">
            ONLYYOULIFESTYLE
          </h1>

          <span className="text-gray-400">/</span>

          <span className="text-slate-400 font-bold tracking-[3px]">
            COMMAND CENTER
          </span>
        </div>

        <div className="flex items-center gap-6">

          <button className="text-3xl text-slate-400">
            ↪
          </button>

          <button className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
            👤
          </button>

        </div>

      </div>
    </header>
  );
}