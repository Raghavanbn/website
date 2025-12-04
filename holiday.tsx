import React, { useState } from "react";

type Holiday = {
  date: string;
  name: string;
  type: "National" | "Festival" | "Company";
  description: string;
};

const holidays: Holiday[] = [
  { date: "2026-01-01", name: "New Year's Day", type: "Company", description: "Beginning of the year." },
  { date: "2026-01-26", name: "Republic Day", type: "National", description: "Adoption of the Indian Constitution." },
  { date: "2026-03-04", name: "Holi", type: "Festival", description: "Festival of colors." },
  { date: "2026-03-21", name: "Id-ul-Fitr", type: "Festival", description: "Marks end of Ramadan." },
  { date: "2026-03-26", name: "Ram Navami", type: "Festival", description: "Birth of Lord Rama." },
  { date: "2026-03-31", name: "Mahavir Jayanti", type: "Festival", description: "Birth of Lord Mahavir." },
  { date: "2026-04-03", name: "Good Friday", type: "Festival", description: "Crucifixion of Jesus Christ." },
  { date: "2026-05-01", name: "Buddha Purnima", type: "Festival", description: "Birth of Buddha." },
  { date: "2026-05-27", name: "Id-ul-Zuha (Bakrid)", type: "Festival", description: "Festival of sacrifice." },
  { date: "2026-06-26", name: "Muharram", type: "Festival", description: "Islamic New Year." },
  { date: "2026-08-15", name: "Independence Day", type: "National", description: "India’s independence from British rule." },
  { date: "2026-09-04", name: "Janmashtami", type: "Festival", description: "Birth of Lord Krishna." },
  { date: "2026-09-24", name: "Milad-un-Nabi", type: "Festival", description: "Birthday of Prophet Muhammad." },
  { date: "2026-10-02", name: "Gandhi Jayanti", type: "National", description: "Birth anniversary of Mahatma Gandhi." },
  { date: "2026-10-20", name: "Dussehra", type: "Festival", description: "Victory of good over evil." },
  { date: "2026-11-08", name: "Diwali", type: "Festival", description: "Festival of lights." },
  { date: "2026-11-24", name: "Guru Nanak Jayanti", type: "Festival", description: "Birth of Guru Nanak." },
  { date: "2026-12-25", name: "Christmas", type: "Festival", description: "Birth of Jesus Christ." }
];

function HolidayCalendar(): JSX.Element {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const [modalHoliday, setModalHoliday] = useState<Holiday | null>(null);
  const [view, setView] = useState<"table" | "calendar">("table");

  const filtered = holidays
    .filter(h =>
      (filter === "All" || h.type === filter) &&
      h.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const months = Array.from({ length: 12 }, (_, m) => m);

  return (
    <div className="max-w-4xl mx-auto p-4">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Company Holiday Calendar — 2026</h2>
        <button
          onClick={() => setView(view === "table" ? "calendar" : "table")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Switch to {view === "table" ? "Calendar View" : "Table View"}
        </button>
      </div>

      {/* Search + Filter */}
      {view === "table" && (
        <div className="flex gap-3 mb-4">
          <input
            placeholder="Search holidays..."
            className="border px-3 py-2 rounded flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>National</option>
            <option>Festival</option>
            <option>Company</option>
          </select>

          <button
            className="px-4 py-2 border rounded"
            onClick={() => setSortAsc(!sortAsc)}
          >
            Sort {sortAsc ? "↓" : "↑"}
          </button>
        </div>
      )}

      {/* TABLE VIEW */}
      {view === "table" && (
        <table className="min-w-full border divide-y divide-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Holiday</th>
              <th className="px-4 py-2 text-left">Type</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filtered.map((h, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setModalHoliday(h)}
              >
                <td className="px-4 py-2">
                  {new Date(h.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2">{h.name}</td>
                <td className="px-4 py-2">{h.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* CALENDAR VIEW */}
      {view === "calendar" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {months.map((month) => {
            const monthHolidays = holidays.filter(
              (h) => new Date(h.date).getMonth() === month
            );

            return (
              <div key={month} className="border rounded p-3 bg-white shadow">
                <h3 className="text-lg font-semibold mb-2">
                  {new Date(2026, month).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>

                {monthHolidays.length === 0 && (
                  <p className="text-gray-500 text-sm">No holidays this month</p>
                )}

                {monthHolidays.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-blue-50 border rounded mb-2 cursor-pointer hover:bg-blue-100"
                    onClick={() => setModalHoliday(h)}
                  >
                    <p className="font-medium">{h.name}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(h.date).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {modalHoliday && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-96 rounded-lg p-5 shadow-lg">
            <h2 className="text-xl font-bold">{modalHoliday.name}</h2>
            <p className="text-gray-600 mb-3">
              {new Date(modalHoliday.date).toLocaleDateString("en-IN")}
            </p>
            <p className="mb-4">{modalHoliday.description}</p>

            <button
              onClick={() => setModalHoliday(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default HolidayCalendar;
