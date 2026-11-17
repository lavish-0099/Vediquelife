import { Language, Specialty, TeamMember, Testimonial } from "@prisma/client";

export interface MemberWithRelations extends TeamMember {
  specialties: Specialty[];
  testimonials: Testimonial[];
  languages: Language[];
}
