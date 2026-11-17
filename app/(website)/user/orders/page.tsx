"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Order } from "@/types/order";
import OrderCard from "../_components/order-card";
import SkeletonOrderCard from "../_components/order-skelton-card";
import NoOrdersCard from "../_components/no-order-card";

const OrdersPage = () => {
  const user = useCurrentUser();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/${user?.id}`);
        const orders = response.data;

        setOrders(orders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  return (
    <div className="bg-white rounded-md shadow-sm transition p-4">
      <h1 className="text-3xl font-bold border-b-2 border-slate-200 pb-2 text-gray-700">
        My Orders
      </h1>
      {loading ? (
        // Show 2-3 skeleton cards while loading
        <>
          <SkeletonOrderCard />
          <SkeletonOrderCard />
          <SkeletonOrderCard />
        </>
      ) : // Show the orders once fetched or "No Orders" card if there are no orders
      orders.length === 0 ? (
        <NoOrdersCard />
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </div>
  );
};

export default OrdersPage;
