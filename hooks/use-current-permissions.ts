import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useCurrentRole } from "./use-current-role";

export function useCurrentPermissions() {
  const roleName = useCurrentRole();
  const [roleId, setRoleId] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<Set<string>>(new Set());
  const [loadingRole, setLoadingRole] = useState(true); // ✅ Track role loading
  const [loadingPermissions, setLoadingPermissions] = useState(true); // ✅ Track permissions loading

  // 🟢 Step 1: Fetch Role ID
  useEffect(() => {
    if (!roleName) return;

    const fetchRoleId = async () => {
      setLoadingRole(true);
      try {
        const response = await axios.get("/api/settings/role"); // ✅ Correct API
        const role = response.data.find((r: any) => r.name === roleName);

        if (role) {
          setRoleId(role.id); // ✅ Set Role ID
        } else {
          console.error("Role ID not found for", roleName);
        }
      } catch (error) {
        console.error("Failed to fetch role ID", error);
      } finally {
        setLoadingRole(false);
      }
    };

    fetchRoleId();
  }, [roleName]);

  // 🟢 Step 2: Fetch Permissions (Only when roleId is available)
  useEffect(() => {
    if (!roleId) return;

    const fetchPermissions = async () => {
      setLoadingPermissions(true);
      try {
        const response = await axios.get(
          `/api/settings/role/${roleId}/permissions`
        ); // ✅ Correct API
        if (Array.isArray(response.data)) {
          const formattedPermissions = new Set(
            response.data.map((perm: any) => `${perm.module}:${perm.action}`)
          );
          setPermissions(formattedPermissions);
        } else {
          setPermissions(new Set());
        }
      } catch (error) {
        console.error("Failed to fetch permissions", error);
        setPermissions(new Set());
      } finally {
        setLoadingPermissions(false);
      }
    };

    fetchPermissions();
  }, [roleId]); // ✅ Dependency change, ab jab roleId aayega tabhi chalega

  // ✅ Safe Permission Check
  const hasPermission = useCallback(
    (permission: string) => {
      if (loadingRole || loadingPermissions) {
        return false;
      }
      return permissions.has(permission);
    },
    [permissions, loadingRole, loadingPermissions]
  );

  const canViewAllPartners = useCallback(() => {
    if (loadingRole || loadingPermissions) {
      return false; // ✅ Jab tak load ho raha hai, false return karo
    }
    return permissions.has("all_partners:view"); // ✅ Specific permission check
  }, [permissions, loadingRole, loadingPermissions]);

  return {
    permissions,
    hasPermission,
    canViewAllPartners,
    loading: loadingRole || loadingPermissions,
  };
}
