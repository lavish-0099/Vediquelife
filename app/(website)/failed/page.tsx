"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useEffect, useState } from "react";

import Container from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { CircleX } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductFeatureItem from "@/components/products/product-feature-item";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/order";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getOrderDetails } from "@/actions/get-order-details";

const FailedPage = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const user = useCurrentUser();
  useEffect(() => {
    const controller = new AbortController();
    const fetchOrder = async () => {
      try {
        if (!orderId) throw new Error("Order ID not found");

        const fetchedOrder = await getOrderDetails(orderId);

        setOrder(fetchedOrder.order);
        setLoading(false);
      } catch (error) {
        router.refresh();
        console.error("Error fetching order:", error);
        toast.error("Error fetching order details");
        router.push("/");
      }
    };

    fetchOrder();
    return () => {
      controller.abort();
    };
  }, [orderId, router]);

  const products = order?.items.filter((item) => item.product?.id) || [];

  return (
    <div>
      <PageHeader title="Payment Failed" className="py-6" />
      <Container>
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden my-20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-center mb-4">
              <div className="relative inline-block">
                <CircleX className="w-20 h-20 text-rose-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full animate-ping absolute inset-0 border-4 border-rose-500"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
            </div>
            <div className="flex items-center justify-center">
              {loading ? (
                <div className="w-full flex flex-col items-center">
                  <p className="text-lg mb-2">Loading order details...</p>
                  <Progress value={100} variant="vediqueDark" />
                </div>
              ) : (
                <div className="w-full">
                  <ProductFeatureItem title="Order ID" value={order?.orderId} />
                  <ProductFeatureItem
                    title="Sub Total"
                    value={order?.subTotal}
                    titleClassName="font-bold"
                    valueClassName="font-bold"
                    currency={order?.currency}
                  />

                  {products && products.length > 0 && order?.taxTotal! > 0 && (
                    <ProductFeatureItem
                      title="Tax"
                      value={order?.taxTotal}
                      currency={order?.currency}
                    />
                  )}

                  {order?.coupon && (
                    <ProductFeatureItem
                      title="Coupon"
                      value={order?.coupon}
                      titleClassName="text-purple-500 font-bold"
                      valueClassName="text-purple-500 font-bold"
                    />
                  )}
                  {order?.coupon && order?.discount && (
                    <ProductFeatureItem
                      title="Coupon Discount"
                      value={"-" + order?.discount}
                      titleClassName="text-emerald-500 font-bold"
                      valueClassName="text-emerald-500 font-bold"
                      currency={order?.currency}
                    />
                  )}
                  {order?.coupon && order?.discount && (
                    <ProductFeatureItem
                      title="Grand Total"
                      value={Number(
                        (order?.subTotal! - order.discount).toFixed(2),
                      )}
                      valueClassName="font-bold"
                      currency={order?.currency}
                    />
                  )}

                  <ProductFeatureItem
                    title="Total Amount"
                    value={order?.totalAmount}
                    titleClassName="text-webprimary font-bold"
                    valueClassName="text-webprimary font-bold"
                    currency={order?.currency}
                  />
                  <ProductFeatureItem
                    title="Payment Method"
                    value={order?.paymentMethod}
                  />
                  <ProductFeatureItem
                    title="Payment Status"
                    value={order?.paymentStatus}
                  />

                  {/* Products List */}
                  {products.length > 0 && (
                    <div className="w-full flex flex-col md:flex-row justify-between mx-2 my-4 border-b-2 border-gray-200">
                      <div className="text-gray-600 font-bold mb-1">
                        Products
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {products.slice(0, 1).map((item) => (
                          <Badge key={item.id} className="bg-webvedique">
                            {item.itemName}
                          </Badge>
                        ))}
                        {products.length > 1 && (
                          <Badge className="bg-gray-300 text-gray-800 hover:text-white">
                            +{products.length - 1} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center mt-8">
              <Link href="/checkout">
                <Button size="lg" variant="destructive">
                  Try Again
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FailedPage;
