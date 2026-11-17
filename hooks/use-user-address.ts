import { BillingAddress, ShippingAddress } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export const useUserAddress = () => {
  const [address, setAddress] = useState<{
    billingAddress: BillingAddress | null;
    shippingAddress: ShippingAddress | null;
  }>({
    billingAddress: null,
    shippingAddress: null,
  });

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await axios.get("/api/user/address");
        const userData = response.data;

        const billingAddress = userData.billingAddress?.[0] || null;
        const shippingAddress = userData.shippingAddress?.[0] || null;

        setAddress({
          billingAddress,
          shippingAddress,
        });
      } catch (error) {
        console.error("[USER_ADDRESS]", error);
      }
    };

    fetchUserAddress();
  }, []);

  return address;
};
