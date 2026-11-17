"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "@/types/order";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import SkeletonOrderCard from "../../_components/order-skelton-card";
import { cn } from "@/lib/utils";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  const orderId = params.orderId;

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        try {
          const response = await axios.get(`/api/orders/order/${orderId}`);
          setOrder(response.data);
        } catch (error) {
          console.error("Failed to fetch order details", error);
        }
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!order) return <SkeletonOrderCard />;

  const grandTotal = (order?.subTotal || 0) + (order?.taxTotal || 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
      {/* Order Details */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Order #{order.id}
        </h2>
        <p className="text-gray-600 mt-2 sm:mt-0">
          Placed on: {formatDate(order.createdAt)}
        </p>
      </div>

      {/* Order Items or Plans */}
      {order.items.length > 0 && (
        <div className="mt-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center mt-4"
            >
              {item.product ? (
                // Product display
                <>
                  <Link href={`/product/${item.product?.slug}`}>
                    <img
                      src={item.product?.imageUrl || "/placeholder.png"}
                      alt={item.product?.title}
                      className="w-16 h-16 object-cover rounded-md shadow-md"
                    />
                  </Link>
                  <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                    <p className="text-lg font-semibold text-gray-700">
                      <Link href={`/product/${item.product?.slug}`}>
                        {item.product?.title}
                      </Link>
                    </p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600 font-bold">
                      Price: {item.price}
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Order Summary */}
      <div className="mt-4 border-t pt-4">
        <div className="flex flex-col text-gray-600 space-y-2 text-end">
          <p className="font-bold">
            Sub Amount: {`${order.currency} ${order.subTotal}`}
          </p>

          {/* Tax only for products */}
          {order.items.some((item) => item.product) && order.taxTotal! > 0 && (
            <p className="font-bold">
              Tax: {`${order.currency} ${order.taxTotal}`}
            </p>
          )}

          <p className="font-bold">
            Grand Total: {`${order.currency} ${grandTotal}`}
          </p>

          {/* Coupon if applied */}
          {order.coupon && (
            <p className="font-bold text-purple-500">Coupon: {order.coupon}</p>
          )}

          {/* Discount if applied */}
          {order.coupon && order.discount && order.discount > 0 && (
            <p className="font-bold text-green-500">
              Discount: {`${order.currency} - ${order.discount}`}
            </p>
          )}

          <p className="font-bold text-webprimary">
            Total Amount: {`${order.currency} ${order.totalAmount}`}
          </p>
          <p
            className={cn(
              "font-bold",
              order.paymentStatus === "Paid" && "text-green-500",
              order.paymentStatus === "Processing" && "text-pink-500",
              order.paymentStatus === "Failed" && "text-red-500",
            )}
          >
            Status: {order.paymentStatus}
          </p>
        </div>
      </div>

      {/* Back to Orders Link */}
      <div className="mt-4 flex justify-center sm:justify-start">
        <Link
          href="/user/orders"
          className="text-white bg-webprimary px-4 py-2 rounded-md shadow-md hover:bg-webtertiary hover:text-white transition flex items-center"
        >
          <Undo2 className="w-4 h-4 mr-2" /> Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;
