const UserDashboard = () => {
  return (
    <div className="bg-white rounded-md shadow-sm transition p-4">
      <h1 className="text-3xl font-bold border-b-2 border-slate-200 pb-2 text-gray-700">
        Dashboard
      </h1>

      <p className="mt-8 text-md">
        From <span className="font-bold">membership dashboard</span> you may
        manage your recent
        <span className="font-bold"> orders</span> or{" "}
        <span className="font-bold"> edit your account</span> details.
      </p>
    </div>
  );
};

export default UserDashboard;
