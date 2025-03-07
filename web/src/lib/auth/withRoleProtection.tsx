import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/ctx/RoleContext";

export function withRoleProtection(
  WrappedComponent: React.ComponentType<any>,
  requiredPermission: string
) {
  return function ProtectedRoute(props: any) {
    const { hasPermission, userRole } = useRole();
    const router = useRouter();

    useEffect(() => {
      console.log(userRole);
      
      if (userRole && !hasPermission(requiredPermission)) {
        console.log("User does not have permission to access this page");
        router.push("/login");
      }
    }, [hasPermission, router, userRole]);

    if (!hasPermission(requiredPermission)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
