"use client";
import { useState } from "react";
import { CNav, CNavItem, CNavLink } from "@coreui/react";
import { onSelectedProps } from "../../../types";

export default function AdminDetailsNavBar({
  onItemSelected,
}: onSelectedProps) {
  const [activeLink, setActiveLink] = useState<string>("Details");

  const handleClick = (item: string): void => {
    setActiveLink(item);
    onItemSelected(item);
  };

  return (
    <div className="mb-6">
      <CNav variant="underline" style={{ borderBottom: "1px solid #D9D9D9" }}>
        <CNavItem>
          <CNavLink
            href="#"
            style={{
              fontWeight: activeLink === "Details" ? "bold" : "normal",
              color: activeLink === "Details" ? "#1DCDFE" : "grey",
            }}
            onClick={() => handleClick("Details")}
          >
            Details
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            style={{
              fontWeight: activeLink === "Opening Hours" ? "bold" : "normal",
              color: activeLink === "Opening Hours" ? "#1DCDFE" : "grey",
            }}
            onClick={() => handleClick("Opening Hours")}
          >
            Opening Hours
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            style={{
              fontWeight: activeLink === "Socials" ? "bold" : "normal",
              color: activeLink === "Socials" ? "#1DCDFE" : "grey",
            }}
            onClick={() => handleClick("Socials")}
          >
            Socials
          </CNavLink>
        </CNavItem>
      </CNav>
    </div>
  );
}
