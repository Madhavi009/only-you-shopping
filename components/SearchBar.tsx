"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center border rounded-xl overflow-hidden bg-white shadow">

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
          className="flex-1 px-4 py-3 outline-none"
        />

        <button className="bg-slate-900 text-white px-4 py-3">
          <Search size={20} />
        </button>

      </div>
    </div>
  );
}