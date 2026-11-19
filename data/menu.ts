export interface SubNavItem {
  label: string;
  href: string;
  desc?: string;
}

export interface NavItem {
  label: string;
  href: string;
  hasChild?: boolean;
  children?: SubNavItem[];
}

export const navbarItems: NavItem[] = [
  {
    label: "Vedique Wellness",
    href: "/vedique-wellness",
    hasChild: true,
    children: [
      {
        label: "Vedique Diet",
        href: "/vedique-diet",
        desc: "Personalised, doctor-led Ayurvedic nutrition plans",
      },
      {
        label: "Doctor Consultation",
        href: "/vedique-wellness#services",
        desc: "Ayurvedic physicians & clinical nutritionists",
      },
      {
        label: "Yoga Consultation",
        href: "/vedique-wellness#services",
        desc: "Personalised therapeutic yoga & breathwork",
      },
      {
        label: "Success Coach",
        href: "/vedique-wellness#services",
        desc: "Daily habit tracking, support & accountability",
      },
      {
        label: "Prakriti Analysis",
        href: "/#prakriti",
        desc: "Discover your unique Ayurvedic body constitution",
      },
    ],
  },
  {
    label: "Vedique Shop",
    href: "/products",
    hasChild: false,
  },
  {
    label: "Meet The Team",
    href: "/meet-our-team",
    hasChild: false,
  },
  {
    label: "Free Resources",
    href: "/blog",
    hasChild: false,
  },
  {
    label: "Testimonials",
    href: "/#testimonials",
    hasChild: false,
  },
  {
    label: "About Us",
    href: "/about",
    hasChild: false,
  },
];
