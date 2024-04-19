"use client"

import { QueueModalProps } from "../../../types";
import { Layout } from "antd";
import { useParams, usePathname } from "next/navigation";
import Sidebar from "../shared/Sidebar";
import { calc } from "antd/es/theme/internal";

const { Content } = Layout;


export default function Entity({ children }: QueueModalProps) {
  const pathname = usePathname();
  let { entity } = useParams();
  let page: string | undefined = '';

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  if (typeof entity === 'string') {
    const segments = entity.split('/');
    page = segments.pop();
  }

  if (page) {
    const segments = pathname.split('/'); 
    page = capitalize(segments[segments.length - 1]); 
  }

  if (typeof entity === 'string') {
    entity = capitalize(entity);
  }

  return (
    <Layout className="custom w-full min-h-screen overflow-x-hidden">
      <Sidebar />
      <div className="custom bg-coal-black">
        <div className="container custom w-full text-white mx-4">
          <div className="entity__row">
            <h2 className="text-xl border-b-2 border-b-slight-slate-grey mb-4 py-3">
              {entity}&apos;s Coworking Space &gt; {page}
            </h2>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}
