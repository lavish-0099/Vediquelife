"use client";

import { DoneForm } from "@/components/onboarding/done-form";
import Container from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
export default function ThankYouPage() {
  return (
    <section className="min-h-screen bg-white py-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center px-4">
          <Card className="shadow-lg">
            <CardContent className="space-y-6 p-3 md:p-4">
              <DoneForm source="Meta" />
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
