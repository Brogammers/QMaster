"use client"

import { ChildrenProps } from "../../../types";
import { Layout } from "antd";
import { useParams } from "next/navigation";
import Sidebar from "../shared/Sidebar";

const { Content } = Layout;


export default function Entity({ children }: ChildrenProps) {
  let { entity } = useParams();
  if (Array.isArray(entity)) {
    entity = entity[0];
  }
  entity = entity.charAt(0).toUpperCase() + entity.slice(1);

  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout className="site-layout bg-coal-black">
        <Content className="container text-white mx-4">
          <div className="row site-layout-background">
            <h2 className="text-xl">{entity}&apos;s Coworking Space</h2>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
