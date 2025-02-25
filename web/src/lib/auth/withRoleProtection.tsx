import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/ctx/RoleContext";

export function withRoleProtection(
  WrappedComponent: React.ComponentType<any>,
  requiredPermission: string
) {
  return function ProtectedRoute(props: any) {
    const { hasPermission } = useRole();
    const router = useRouter();

    useEffect(() => {
      if (!hasPermission(requiredPermission)) {
        router.back();
      }
    }, [hasPermission, router]);

    if (!hasPermission(requiredPermission)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
