"use client";

import { USPCard } from "./usp-card";
import Container from "../container";

export default function USPSection() {
  const uspData = [
    { value: 100000, label: "Lives Transformed", suffix: "+" },
    { value: 50, label: "Countries served", suffix: "+" },
    {
      value: 25,
      label: "Successful years of Industry experience",
      suffix: "+",
    },
    {
      value: 99.6,
      label: "Success Rate",
      suffix: "+",
    },
    {
      value: 4.5,
      label: "Rating on Google",
      suffix: "+",
    },
  ];

  return (
    <section className="bg-webprimary">
      <Container>
        <USPCard usps={uspData} />
      </Container>
    </section>
  );
}
