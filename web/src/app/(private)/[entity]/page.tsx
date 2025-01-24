"use client";

import { QueueModalProps } from "../../../../types";
import { useParams, usePathname } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { setEntity } from "@/store/features/entitySlice";
import { RootState } from "@/store/store";
import { useContext, useEffect } from 'react';
import { Select } from "antd";
import { LocationContext } from "@/ctx/LocationContext";
const { Option } = Select;



export default function Entity({ children }: QueueModalProps) {
  const pathname = usePathname();
  let { entity } = useParams();
  let page: string | undefined = "";
  const dispatch = useDispatch();
  const entityName = useSelector((state: RootState) => state.entity.name);
  const { locations } = useContext(LocationContext);

  const formatPageName = (name: string) => {
    const formattedName = name.replace(/[^\w\s]/gi, " ");
    const capitalizeWord = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          <span className="text-baby-blue">{entityName}</span>
          {page && (
            <>
              <span className="mx-2 text-slate-400">/</span>
              <span>{page}</span>
            </>
          )}
        </h2>
        <Select defaultValue={locations[0].id} style={{ width: 200 }}>
          {locations.map((location) => (
            <Option key={location.id} value={location.id}>
              {location.branchName}
              <div className="text-xs text-gray-500">
                {location.name} - {location.city}, {location.country}
              </div>
            </Option>
          ))}
        </Select>
      </div>
      {children}
    </div>
  );
}
