export const getStatusColor = (status: string): string => {
  switch (status.toUpperCase()) {
    case "CREATED":
      return "bg-gray-500";
    case "PLACED":
    case "PROCESSING":
      return "bg-blue-500";
    case "SHIPPED":
      return "bg-indigo-500";
    case "DELIVERED":
      return "bg-green-600";
    case "CANCELLED":
    case "RETURNED":
    case "FAILED":
      return "bg-red-600";
    case "REFUNDED":
      return "bg-yellow-600";
    default:
      return "bg-gray-800";
  }
};
