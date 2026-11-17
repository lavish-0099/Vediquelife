import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { billingSchema, checkoutSchema } from "@/schemas";
import { User } from "@/types/user";
import { useUserAddress } from "./use-user-address";
import { useEffect, useMemo } from "react";

export const useCheckoutForm = (
  user?: User,
  sameAsBilling: boolean = false
) => {
  const { billingAddress, shippingAddress } = useUserAddress();

  const [firstName = "", lastName = ""] = user?.name?.split(" ") ?? [];

  // Dynamically decide schema
  const formSchema = useMemo(() => {
    return sameAsBilling ? billingSchema : checkoutSchema;
  }, [sameAsBilling]);

  const defaultValues = useMemo(() => {
    return {
      billing_firstName: firstName || "",
      billing_lastName: lastName || "",
      billing_email: user?.email || "",
      billing_phoneNumber: user?.phoneNumber || "",
      billing_address: "",
      billing_country: "",
      billing_city: "",
      billing_state: "",
      billing_zip: "",
      code: "",
      ...(sameAsBilling
        ? {}
        : {
            shipping_firstName: "",
            shipping_lastName: "",
            shipping_email: user?.email || "",
            shipping_phoneNumber: user?.phoneNumber || "",
            shipping_address: "",
            shipping_city: "",
            shipping_state: "",
            shipping_zip: "",
          }),
    };
  }, [user, sameAsBilling]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (!billingAddress) return;

    const [billingFirstName = "", billingLastName = ""] =
      billingAddress?.name?.split(" ") ?? [];
    const [shippingFirstName = "", shippingLastName = ""] =
      shippingAddress?.name?.split(" ") ?? [];

    const baseValues = {
      billing_firstName: billingFirstName || firstName,
      billing_lastName: billingLastName || lastName,
      billing_email: billingAddress?.email || user?.email || "",
      billing_phoneNumber:
        billingAddress?.phoneNumber || user?.phoneNumber || "",
      billing_address: billingAddress?.address || "",
      billing_country: billingAddress?.country || "",
      billing_city: billingAddress?.city || "",
      billing_state: billingAddress?.state || "",
      billing_zip: billingAddress?.zip || "",
      code: "",
    };

    const fullValues = sameAsBilling
      ? baseValues
      : {
          ...baseValues,
          shipping_firstName:
            shippingFirstName || billingFirstName || firstName,
          shipping_lastName: shippingLastName || billingLastName || lastName,
          shipping_email:
            shippingAddress?.email ||
            billingAddress?.email ||
            user?.email ||
            "",
          shipping_phoneNumber:
            shippingAddress?.phoneNumber ||
            billingAddress?.phoneNumber ||
            user?.phoneNumber ||
            "",
          shipping_address:
            shippingAddress?.address || billingAddress?.address || "",
          shipping_city: shippingAddress?.city || billingAddress?.city || "",
          shipping_state: shippingAddress?.state || billingAddress?.state || "",
          shipping_zip: shippingAddress?.zip || billingAddress?.zip || "",
        };

    form.reset(fullValues);
  }, [billingAddress, shippingAddress, sameAsBilling]);

  return form;
};
