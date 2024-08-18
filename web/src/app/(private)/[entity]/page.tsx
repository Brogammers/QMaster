"use client";

import { QueueModalProps } from "../../../../types";
import { Layout } from "antd";
import { useParams, usePathname } from "next/navigation";
import Sidebar from "@/app/shared/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { setEntityName } from "@/app/redux/entitySlice";
import { RootState } from "@/app/redux/store";
import { useEffect } from 'react';

export default function Entity({ children }: QueueModalProps) {
  const pathname = usePathname();
  let { entity } = useParams();
  let page: string | undefined = "";
  const dispatch = useDispatch();
  const entityName = useSelector((state: RootState) => state.entity.name);

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
      dispatch(setEntityName(formattedEntity));
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
    <Layout className="custom w-full min-h-screen overflow-x-hidden">
      <Sidebar />
      <div className="custom bg-coal-black">
        <div className="container custom w-full text-white mx-4">
          <div className="entity__row">
            <h2 className="text-xl border-b-2 border-b-slight-slate-grey mb-4 py-3">
              {entityName}&apos;s Coworking Space &gt; {page}
            </h2>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}
