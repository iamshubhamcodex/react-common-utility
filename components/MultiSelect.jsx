import React, { useEffect, useRef, useState } from "react";
import { isArray } from "../../lib/utility";

const MultiSelect = ({
  options,
  onChange,
  value,
  labelValue,
  placeholder = "-Select-",
  shoAllOption = false,
  // above = false,
  log = false,
}) => {
  const [selectedValues, setSelectedValues] = useState(
    labelValue ?? value ?? []
  );
  const [selectedIds, setSelectedIds] = useState(value ?? []);
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const multiSelectRef = useRef();
  const { top, left, bottom, width, height, y, x } =
    multiSelectRef?.current?.getBoundingClientRect() ?? {};
  const above = window.innerHeight - y - height - 3 < 200;
  options = options ? Array.from(new Set(options)) : [];

  const handleMultiSelectClick = (e, focus) => {
    if (e.target.id === "multiSelect" || focus) setFocused((prev) => !prev);
  };

  const handleOutSideClick = (e) => {
    if (
      e.target.id !== "multiSelect" &&
      multiSelectRef.current &&
      !multiSelectRef.current.contains(e.target)
    ) {
      setFocused(false);
      window.removeEventListener("click", handleOutSideClick);
    }
  };

  const handleOptionClick = (opt) => {
    if (selectedIds.includes(opt.id)) {
      setSelectedIds((prev) => prev.filter((id) => id !== opt.id));
      setSelectedValues((prev) => prev.filter((val) => val !== opt.label));
      onChange(selectedIds.filter((id) => id !== opt.id));
    } else {
      setSelectedIds((prev) => [...prev, opt.id]);
      setSelectedValues((prev) => [...prev, opt.label]);
      onChange([...selectedIds, opt.id]);
    }
  };

  const handleOptionAllClick = () => {
    if (selectedIds.length === options.length) {
      setSelectedIds([]);
      setSelectedValues([]);
      onChange([]);
    } else {
      setSelectedIds(options.map((opt) => opt.id));
      setSelectedValues(options.map((opt) => opt.label));
      onChange(options.map((opt) => opt.id));
    }
  };

  useEffect(() => {
    if (focused) {
      window.addEventListener("click", handleOutSideClick);
    }
  }, [focused]);

  useEffect(() => {
    if (value && isArray(value)) {
      if (value.length === 0 && selectedIds.length !== 0) {
        setSelectedIds([]);
        setSelectedValues([]);
      } else {
        setSelectedIds(value);
        setSelectedValues(value);
      }
    }
  }, [value]);

  useEffect(() => {
    if (labelValue && isArray(labelValue)) setSelectedValues(labelValue);
    return () => {};
  }, [labelValue]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={"multiSelect fw-400 " + (focused ? "focus" : "")}
      onClick={handleMultiSelectClick}
      ref={multiSelectRef}
      id="multiSelect"
    >
      <style>
        {`
          .multiSelect {
            position: relative;
            border: 1px solid #ced4da;
            padding: 6px 36px 6px 12px;
            border-radius: 5px;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right .75rem center;
            background-size: 16px 12px;
          }
          .multiSelect.focus {
            border-color: #86b7fe;
            outline: 0;
            box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .2);
          }
          .multiSelect > p.text-gray {
            color: gray;
          }
          .multiSelect > p {
            max-width: 100%;
            overflow: auto;
            max-height: 200px;
            overflow-y: auto;
            overflow-x: hidden;
          }
          .multiSelect .dropdown.above {
            bottom: ${window.innerHeight - y + 3}px !important;
          }
          .multiSelect .dropdown.below {
            top: ${parseInt(y + height + 3)}px !important;
          }
          .multiSelect .dropdown {
            position: fixed;
            left: ${parseInt(x)}px;
            padding: 6px;
            display: block;
            z-index: 999;
            background: white;
            border: 1px solid #ced4da;
            border-radius: 4px;
            width: ${parseInt(width)}px;
            overflow: auto;
            max-height: 200px;
            overflow-x: hidden;
          }
          .multiSelect .dropdown .option {
            cursor: pointer;
            border-radius: 4px;
            padding: 0 6px;
          }
          .multiSelect .dropdown .option:hover {
            background: #eee;
          }
          .multiSelect .dropdown .option input {
            height: 16px;
            width: 16px;
            border-radius: 8px;
          }
          .multiSelect .dropdown .option label {
            pointer-events: none;
          }
        `}
      </style>
      <p
        tabIndex={-1}
        className={
          "m-0 " + (selectedIds.length === 0 ? "text-gray" : "text-black")
        }
        onClick={(e) => handleMultiSelectClick(e, true)}
      >
        {selectedValues.length === 0 ? placeholder : selectedValues.join(", ")}
      </p>
      {focused && (
        <div
          className={"dropdown " + (above ? "above" : "below")}
          tabIndex={-1}
        >
          <div className="search-container">
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {(options.length !== 0 || shoAllOption) && (
            <div
              className="d-flex gap-2 align-items-center py-1 option"
              onClick={() => handleOptionAllClick()}
            >
              <input
                type="checkbox"
                name=""
                checked={selectedValues.length === options.length}
                readOnly
              />
              <label className="form-label flex-grow w-100 m-0">ALL</label>
            </div>
          )}
          {filteredOptions.map((opt) => (
            <div
              className="d-flex gap-2 align-items-center py-1 option"
              onClick={() => handleOptionClick(opt)}
              key={opt.id}
            >
              <input
                type="checkbox"
                name=""
                id={opt.value}
                checked={selectedIds.includes(opt.id)}
                readOnly
              />
              <label
                className="form-label flex-grow w-100 m-0"
                htmlFor={opt.value}
              >
                {opt.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
