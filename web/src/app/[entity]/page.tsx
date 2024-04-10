"use client"

import { EntityProps } from "../../../types";
import Sidebar from "../shared/Sidebar";


export default function Entity({ children }: EntityProps) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}