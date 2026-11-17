import { useState } from "react";
import { Order } from "@/types/order";
import Link from "next/link";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!order) return null;

  const grandTotal = order?.subTotal! + order?.taxTotal!;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4">
        <h2 className="text-lg font-bold text-gray-800">Order #{order.id}</h2>
        <p className="text-gray-600 mt-2 sm:mt-0">
          Placed on: {formatDate(order.createdAt)}
        </p>
      </div>

      {/* Display Items */}
      {order.items.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            {order.items[0].product ? (
              <Link href={`/product/${order.items[0].product?.slug}`}>
                <img
                  src={order.items[0].product?.imageUrl || "/placeholder.png"}
                  alt={order.items[0].product?.title}
                  className="w-16 h-16 object-cover rounded-md shadow-md"
                />
              </Link>
            ) : null}

            <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
              {order.items[0].product ? (
                <>
                  <p className="text-lg font-semibold text-gray-700">
                    <Link href={`/product/${order.items[0].product?.slug}`}>
                      {order.items[0].product?.title}
                    </Link>
                  </p>
                  <p className="text-gray-600">
                    Quantity: {order.items[0].quantity}
                  </p>
                  <p className="text-gray-600 font-bold">
                    Price: {order.items[0].price}
                  </p>
                </>
              ) : null}
            </div>
          </div>

          {order.items.length > 1 && (
            <button
              onClick={toggleExpand}
              className="text-webprimary font-bold mt-2 inline-block"
            >
              {isExpanded
                ? "Hide additional items"
                : `View ${order.items.length - 1} more items`}
            </button>
          )}
        </div>
      )}

      {/* Expanded Items */}
      {isExpanded && (
        <div className="mt-4">
          {order.items.slice(1).map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center mt-2"
            >
              {item.product ? (
                <Link href={`/product/${item.product?.slug}`}>
                  <img
                    src={item.product?.imageUrl || "/placeholder.png"}
                    alt={item.product?.title}
                    className="w-16 h-16 object-cover rounded-md shadow-md"
                  />
                </Link>
              ) : null}

              <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                {item.product ? (
                  <>
                    <p className="text-lg font-semibold text-gray-700">
                      <Link href={`/product/${item.product?.slug}`}>
                        {item.product?.title}
                      </Link>
                    </p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600 font-bold">
                      Price: {item.price}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total and Coupon Details */}
      <div className="mt-4 border-t pt-4 ">
        <div className="flex flex-col text-gray-600 space-y-2 justify-end text-end">
          <p className="font-bold">
            Sub Amount: {`${order.currency} ${order.subTotal}`}
          </p>
          {order.items.length > 0 &&
            order.items[0].product &&
            order?.taxTotal! > 0 && (
              <p className="font-bold">
                Tax: {`${order.currency} ${order.taxTotal}`}
              </p>
            )}
          <p className="font-bold">
            Grand Total: {`${order.currency} ${grandTotal}`}
          </p>
          {order.coupon && (
            <p className="font-bold text-purple-500">Coupon: {order.coupon}</p>
          )}
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

      {/* View Details Button */}
      <div className="mt-4 flex justify-center sm:justify-end">
        <Link
          href={`/user/orders/${order.id}`}
          className="text-white bg-webprimary px-4 py-2 rounded-md shadow-md hover:bg-webtertiary hover:text-white font-bold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
