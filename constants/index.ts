export const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL!;

export const NUDGES: Record<string, string> = {
  "Weight Loss":
    "💡 10–12 kg down in just 90 days, that’s the reality for lakhs of Vedique Diet clients like Alka Ji.",
  "PCOS / PCOD":
    "For 25+ years, Vedique Diet has helped women to manage irregular periods, improve fertility markers, and reduce stubborn weight through the concept of food as medicine.",
  Diabetes:
    "India is the Diabetes capital but early action can reverse the trend. With the Vedique Diet, many clients have lowered HbA1c, controlled sugar spikes, and safely reduced dependency on medication under expert guidance.",
  Thyroid:
    "⚡ Thyroid is not just a “hormonal issue”  it slows weight loss, drains energy, affects moods. Vedique Diet support thyroid balance, boost metabolism, and helps bring your energy back naturally.",
  "Gut Health":
    "Gas, acidity, bloating, and constipation are the signs that your body is asking for for help. Vedique Diet identifies the root cause and helps restore digestion, so you wake up lighter, cleaner, and full of energy every day.",
  "Menopause / Hormonal Balance":
    "Hot flashes, mood swings, stubborn weight — menopause shouldn’t dim your shine. Vedique Diet uses gentle, hormone-balancing foods so you sleep better, feel calmer, and stay active and confident through every phase. ",
  "Fatty Liver":
    "Fatty Liver often shows no symptoms… until it becomes serious. With Vedique Diet our clients have reduced liver fat, improved LFT reports, and restored energy without complex medicines.",
  "High Cholesterol":
    "High cholesterol silently increases the risk of heart disease and stroke. Vedique Diet focuses on anti-inflammatory foods and lifestyle corrections that help lower LDL, improve HDL, and protect your heart — naturally and sustainably.",
  Other:
    "💡 For 27 years, Vedique Diet has earned deep trust by guiding thousands through diverse health concerns with personalized  nutrition.",
};

export const CHALLENGE_NUDGES: Record<string, string> = {
  "Losing weight":
    "Don’t worry, we’ll help you lose weight in a healthy, sustainable way without stress or guesswork.",
  "Staying consistent":
    "Our nutritionist will keep you motivated and accountable at every step 💪.",
  "Meal cravings":
    "You’ll get delicious, easy-to-follow meal options that control cravings naturally 😌.",
  "Slow results / Weight not moving":
    "We’ll identify what’s blocking your progress and get your results moving again.",
  "Hormonal issues (PCOS / Thyroid / Menopause)":
    "Our experts specialize in hormone-linked weight challenges,  you’ll notice improvements within weeks.",
  "Time constraints / Busy schedule":
    "Quick, practical meal plans designed for busy people; your health fits into your routine ⏱️.",
};

export const WEIGHT_LOSS_TRIED_OPTIONS = [
  "I’m new to weight loss and have never tried anything before",
  "Paid diet plans (apps/programs/nutritionist)",
  "Gym workouts & fitness training",
  "Yoga / Zumba / Dance / Aerobics",
  "Something else I hoped would work",
] as const;

export const VEDIQUE_DIET_JOURNEY_OPTIONS = [
  "In the next 2–3 days",
  "This week, ready to start!",
  "This month, soon!",
  "Later sometime",
  "Just exploring for now",
] as const;

export const MOTIVATION_NUDGES = {
  "Extremely motivated":
    "Amazing! With your dedication and our expert plan, results come faster than you think. 🚀",
  "Motivated, need guidance":
    "Perfect! That’s exactly what our Certified Nutritionists are here for. We’ll guide you step-by-step. 💪",
  "Not sure yet / exploring":
    "No worries, let’s understand your body first. We’ll show you what’s possible for you 🌱",
} as const;

export const MOTIVATION_OPTIONS = Object.keys(
  MOTIVATION_NUDGES
) as (keyof typeof MOTIVATION_NUDGES)[];

export const CONSULTATION_OPTIONS = {
  true: "Yes, I want to consult for a personalized diet plan for great results.",
  false: "Not right now / I don’t want a paid plan.",
} as const;

export const CONSULTATION_NUDGES = {
  true: "👉 Great choice! With expert guidance, you can achieve faster and visible transformation in just a few weeks.",
  false:
    "👉 No worries! We’ll still guide you, but remember, expert support can help you avoid trial-and-error and see results much sooner.",
} as const;

export const HEALTH_NUDGES: Record<string, string> = {
  Pcos: "Thousands of clients like Ms. Riya lost 9+ kg naturally in 3 months while managing PCOS.",
  Menopause:
    "Thousands of clients like Ms. Anita shed 8 kg naturally and eased menopause symptoms in just 3 months.",
  Diabetes:
    "Thousands of clients like Ms. Rajesh reduced 10+ kg and improved sugar levels naturally within 3 months.",
  Hypothyroid:
    "Thousands of clients like Ms. Neha lost 10 kg naturally and regained energy while managing hypothyroid.",
  Hypertension:
    "Thousands of clients like Mr. Sunil lost 8–10 kg naturally and improved blood pressure within 3 months.",
  Cholesterol:
    "Thousands of clients like Ms. Meena shed 10+ kg naturally, reduced bad cholestrol and improved healthy cholesterol in only 3 months.",
  "Fatty Liver":
    "Thousands of clients like Mr. Amit dropped 12 kg naturally and improved liver health within 3 months.",
  "Gut Health":
    "Thousands of clients like Ms. Kavita improved their gut health and lost 8–10 kg naturally within 3 months.",
};

export const WEIGHT_NUDGE =
  "🎯 Thousands of clients like Mr. Jogi lost 10+ kg naturally within 3 months of the Vedique Diet Program.";

export const PRICE_ANCHOR =
  "🌟 Most clients start noticing changes within 2 weeks. Our personalized Vedique Diet Program starts at just <strong>₹5,999 per month</strong> — less than the cost of eating out twice a week — for complete medical nutrition guidance, recipes, and expert support.";

export type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const ADVISORY_USPDATA = [
  { value: 250000, label: "Nutrition Plans sent every month", suffix: "+" },
  { value: 100000, label: "Lives Transformed", suffix: "+" },
  { value: 50, label: "Vedique Nutrition Coaches", suffix: "+" },
  {
    value: 25,
    label: "Successful years of Industry experience",
    suffix: "+",
  },
];

export const ACADEMY_USPDATA = [
  { value: 2000, label: "Satisfied Students", suffix: "+" },
  { value: 150, label: "Batches", suffix: "+" },
  { value: 20, label: "Years Experienced Trainers", suffix: "+" },
  {
    value: 35,
    label: "Countries Presence",
    suffix: "+",
  },
];
