export type PlanId = "trial" | "monthly" | "yearly";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    id: "trial",
    name: "Free Trial",
    price: 0,
    period: "7 days",
    description: "Test secure VPN speed and private browsing with no commitment.",
    features: [
      "Military-grade encryption",
      "Anonymous browsing",
      "Basic global server access",
      "1 device",
    ],
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price: 9.99,
    period: "per month",
    description: "Flexible monthly billing for secure VPN and fast performance.",
    features: [
      "Unlimited private internet access",
      "Fast global servers",
      "Cross-platform support",
      "Up to 3 devices",
    ],
  },
  {
    id: "yearly",
    name: "Yearly Plan",
    price: 79.99,
    period: "per year",
    description: "Best value with priority routing and long-term privacy protection.",
    features: [
      "Everything in Monthly",
      "Priority speed routing",
      "Streaming optimized paths",
      "Up to 5 devices",
    ],
  },
];

export function getPlanById(id: string) {
  return PLANS.find((p) => p.id === id);
}

