import Container from "@/components/container";

interface Step {
  no: string;
  title: string;
  text: React.ReactNode;
}

export function VediqueTimeline({ steps }: { steps: Step[] }) {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="relative max-w-6xl mx-auto">
          {/* ================= MOBILE TIMELINE (SINGLE RENDER) ================= */}
          <div className="relative md:hidden">
            {/* ONE CONTINUOUS LINE */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-webprimary -translate-x-1/2" />

            <div className="flex flex-col gap-12">
              {steps.map((step) => (
                <div
                  key={step.no}
                  className="relative flex flex-col items-center"
                >
                  {/* POINT */}
                  <div className="w-10 h-10 rounded-full bg-webprimary text-white flex items-center justify-center text-sm font-semibold z-10">
                    {step.no}
                  </div>

                  {/* CARD */}
                  <div className="mt-6 w-full">
                    <div className="bg-[#e1f1e8] rounded-xl p-5 shadow-md text-center">
                      <h3 className="text-lg font-semibold text-webprimary mb-2">
                        {step.title}
                      </h3>
                      <div className="text-sm leading-relaxed">{step.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= DESKTOP TIMELINE (UNCHANGED) ================= */}
          <div className="hidden md:flex flex-col gap-16">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.no} className="relative flex justify-center">
                  {/* center line */}
                  {!isLast && (
                    <div className="absolute left-1/2 top-6 bottom-[-40px] w-[2px] bg-webprimary -translate-x-1/2" />
                  )}

                  {/* point */}
                  <div className="absolute left-1/2 -top-6 -translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-webprimary text-white flex items-center justify-center text-sm font-semibold">
                      {step.no}
                    </div>
                  </div>

                  {/* card */}
                  <div
                    className={`relative w-[45%] ${
                      isLeft ? "mr-auto" : "ml-auto"
                    }`}
                  >
                    <div className="bg-[#e1f1e8] rounded-xl p-6 shadow-md relative">
                      {/* arrow */}
                      <span
                        className={`absolute top-4 w-3 h-3 bg-[#e1f1e8] rotate-45 ${
                          isLeft ? "right-[-6px]" : "left-[-6px]"
                        }`}
                      />
                      <h3 className="text-xl font-semibold text-webprimary mb-3">
                        {step.title}
                      </h3>
                      <div className="text-base leading-relaxed">
                        {step.text}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
