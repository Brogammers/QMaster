"use client"

import { ChildrenProps } from "../../../types";
import { Layout } from "antd";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../shared/Sidebar";

const { Content } = Layout;


export default function Entity({ children }: ChildrenProps) {
  const { entity } = useParams();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleClick = (route: string) => {
    router.push(route);
  };

  return (
    <Layout className="min-h-screen">
      <Sidebar />
      {/* Main Content */}
      <Layout className="site-layout bg-coal-black text-white">
        <Content className="text-white mx-4">
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <h2>{entity}&apos;s Coworking Space</h2>
            {/* Main content */}
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
