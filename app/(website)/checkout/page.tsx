import CheckoutClient from "@/components/checkout/checkout-client";
import Container from "@/components/container";
import { PageHeader } from "@/components/page-header";

const CheckoutPage = () => {
  return (
    <div className="w-full bg-slate-100 pb-20">
      <PageHeader title="Checkout" pageTitle="Checkout" className="py-4" />
      <Container>
        <CheckoutClient />
      </Container>
    </div>
  );
};

export default CheckoutPage;
