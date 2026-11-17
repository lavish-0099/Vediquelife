import MemberProfile from "@/components/team-members/member-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const MemberPage = async ({ params }: { params: { memberId: string } }) => {
  const member = await db.teamMember.findUnique({
    where: { id: params.memberId },
    include: {
      languages: true,
      specialties: true,
      testimonials: true,
    },
  });

  if (!member) return redirect("/");

  return <MemberProfile member={member} />;
};

export default MemberPage;
