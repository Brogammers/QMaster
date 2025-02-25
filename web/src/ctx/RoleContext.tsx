import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "./LocationContext";

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  branches: string[]; // IDs of branches this role has access to
}

interface RoleContextType {
  userRole: Role | null;
  hasPermission: (permission: string) => boolean;
  hasBranchAccess: (branchId: string) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Temporary mock role for development
const MOCK_ROLE: Role = {
  id: "1",
  name: "Branch Manager",
  permissions: ["view_store", "view_queues", "view_display", "view_counter", "view_sharing-info", "view_details", "view_customer-feedback"],
  branches: ["1", "2", "3"], // Mock branch IDs
};

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<Role | null>(null);
  const { selectedLocation } = useLocation();

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchUserRole = async () => {
      try {
        // Mock API call
        // const response = await axios.get('/api/user/role');
        // setUserRole(response.data);
        setUserRole(MOCK_ROLE);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const hasPermission = (permission: string): boolean => {
    return userRole?.permissions.includes(permission) ?? false;
  };

  const hasBranchAccess = (branchId: string): boolean => {
    return userRole?.branches.includes(branchId) ?? false;
  };

  return (
    <RoleContext.Provider value={{ userRole, hasPermission, hasBranchAccess }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
