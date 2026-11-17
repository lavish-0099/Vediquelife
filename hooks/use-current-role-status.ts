import { useSession } from "next-auth/react";

export const useCurrentRoleStatus = () => {
  const session = useSession();

  return session.data?.user?.isPartner;
};
