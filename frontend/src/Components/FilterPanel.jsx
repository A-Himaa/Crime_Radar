import React from "react";

export default function FilterPanel({
  severityOptions,
  typeOptions,
  districtOptions,
  filters,
  onChange,
  onFilter,
  onReset
}) {
  return (
    <div className="p-4 bg-white rounded shadow flex items-end space-x-4">
      {/* Severity */}
      <div>
        <label className="block mb-1 font-medium">Severity</label>
        <select
          value={filters.severity}
          onChange={e => onChange("severity", e.target.value)}
          className="border p-1 rounded"
        >
          <option value="">All</option>
          {severityOptions.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div>
        <label className="block mb-1 font-medium">Type</label>
        <select
          value={filters.type}
          onChange={e => onChange("type", e.target.value)}
          className="border p-1 rounded"
        >
          <option value="">All</option>
          {typeOptions.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* District */}
      <div>
        <label className="block mb-1 font-medium">District</label>
        <select
          value={filters.district}
          onChange={e => onChange("district", e.target.value)}
          className="border p-1 rounded"
        >
          <option value="">All</option>
          {districtOptions.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Filter button */}
      <button
        type="button"
        onClick={onFilter}
        className="bg-amber-500 text-white px-2 py-1 rounded hover:bg-amber-600"
      >
        Filter
      </button>

      {/* Reset button */}
      <button
        type="button"
        onClick={onReset}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  );
}
