"use client";

const SkeletonOrderCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 animate-pulse">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="mt-4">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
          <div className="ml-4">
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 mt-2"></div>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
      <div className="mt-4 border-t pt-4">
        <div className="flex flex-col text-gray-300 space-y-2 text-end">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <div className="h-10 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default SkeletonOrderCard;
