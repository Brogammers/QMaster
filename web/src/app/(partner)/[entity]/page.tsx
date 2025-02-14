"use client";

import { QueueModalProps } from "../../../../types";
import { useParams, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setEntity } from "@/store/features/entitySlice";
import { RootState } from "@/store/store";
import { useEffect, useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useLocation } from "@/ctx/LocationContext";

export default function Entity({ children }: QueueModalProps) {
  const pathname = usePathname();
  let { entity } = useParams();
  let page: string | undefined = "";
  const dispatch = useDispatch();
  const entityName = useSelector((state: RootState) => state.entity.name);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { selectedLocation, locations, setSelectedLocation } = useLocation();

  const formatPageName = (name: string) => {
    const formattedName = name.replace(/[^\w\s]/gi, " ");
    const capitalizeWord = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);
    const capitalizedWords = formattedName.split(" ").map(capitalizeWord);
    return capitalizedWords.join(" ");
  };

  useEffect(() => {
    if (typeof entity === "string") {
      const formattedEntity = formatPageName(entity);
      dispatch(setEntity({ name: formattedEntity, id: null, type: null }));
    }
  }, [entity, dispatch]);

  if (typeof entity === "string") {
    const segments = entity.split("/");
    page = segments.pop();
  }

  if (page) {
    const segments = pathname.split("/");
    page = formatPageName(segments[segments.length - 1]);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">
          <span className="text-baby-blue">{entityName}</span>
          {page && (
            <>
              <span className="mx-2 text-slate-400">/</span>
              <span>{page}</span>
            </>
          )}
        </h2>
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 w-fit min-w-[280px] px-4 py-2 bg-white rounded-full border border-gray-200 focus:outline-none"
          >
            <div className="flex-1 min-w-0">
              <div className="truncate text-base font-medium">
                {selectedLocation?.name}
              </div>
              <div className="truncate text-xs text-gray-500">
                {selectedLocation?.city},{" "}
                {selectedLocation?.country}
              </div>
            </div>
            <FiChevronDown
              className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 py-2">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    setSelectedLocation(location);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-gray-50 text-left"
                >
                  <div className="min-w-0">
                    <div className="truncate text-base font-medium">
                      {location.name}
                    </div>
                    <div className="truncate text-xs text-gray-500">
                      {location.city}, {location.country}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
