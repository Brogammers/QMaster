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
    <Layout className="w-full min-h-screen">
      <Sidebar />
      <Layout className="bg-coal-black">
        <Content className="container w-full mx-4 text-white">
          <div className="row site-layout-background">
            <h2 className="py-3 mb-4 text-xl border-b-2 border-b-slight-slate-grey">
              {entity}&apos;s Coworking Space &gt; {page}
            </h2>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
