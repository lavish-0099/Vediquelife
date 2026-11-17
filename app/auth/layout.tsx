"use client";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="md:h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c3f3d0] to-[#c3f3d0] ">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
