"use client"

import { ReactNode } from "react";
import Sidebar from "../shared/Sidebar";

interface EntityProps {
  children: ReactNode;
}

export default function Entity({ children }: EntityProps) {
  return (
    <>
      <Sidebar />
      {/* <main>{children}</main> */}
    </>
  )
}