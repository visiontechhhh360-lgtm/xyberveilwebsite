import { PLANS } from "@/lib/plans";

type KnowledgeItem = {
  id: string;
  intent: "about" | "security" | "privacy" | "pricing" | "usage" | "support";
  question: string;
  answer: string;
  keywords: string[];
};

const PLAN_SUMMARY = PLANS.map(
  (plan) => `- ${plan.name}: $${plan.price.toFixed(2)} ${plan.period}`
).join("\n");

const KNOWLEDGE: KnowledgeItem[] = [
  {
    id: "what-is-xyberveil",
    intent: "about",
    question: "What is Xyber Veil?",
    answer:
      "Xyber Veil is a privacy-focused VPN product experience built for secure browsing, private internet access, and smooth performance across everyday use cases.",
    keywords: ["what is", "about", "company", "xyber", "veil", "vpn"],
  },
  {
    id: "safety",
    intent: "security",
    question: "Is Xyber Veil safe?",
    answer:
      "Xyber Veil is designed around strong encryption, secure tunneling, and privacy-first defaults. For production-grade trust, pair this with audited infrastructure, hardened servers, and transparent security documentation.",
    keywords: [
      "safe",
      "security",
      "secure",
      "encryption",
      "encrypted",
      "hack",
      "breach",
    ],
  },
  {
    id: "logs",
    intent: "privacy",
    question: "Does Xyber Veil keep logs?",
    answer:
      "The product messaging follows a no-log policy approach. In production, ensure telemetry, analytics, and backend retention policies strictly match your legal privacy terms.",
    keywords: [
      "logs",
      "log",
      "no log",
      "privacy policy",
      "track",
      "tracking",
      "data collection",
    ],
  },
  {
    id: "streaming",
    intent: "usage",
    question: "Can I use it for streaming?",
    answer:
      "Yes. The service is designed for fast routing and stable throughput, which helps with streaming, browsing, and day-to-day low-latency usage.",
    keywords: ["stream", "streaming", "netflix", "youtube", "video", "speed"],
  },
  {
    id: "plans",
    intent: "pricing",
    question: "What plans are available?",
    answer: `Current plans are:\n${PLAN_SUMMARY}\n\nThe Yearly plan is the best-value option on the site.`,
    keywords: [
      "plan",
      "plans",
      "pricing",
      "price",
      "cost",
      "monthly",
      "yearly",
      "trial",
      "subscription",
    ],
  },
  {
    id: "platforms",
    intent: "usage",
    question: "Which devices are supported?",
    answer:
      "Xyber Veil is positioned for cross-platform use on desktop and mobile. Device allowance depends on your selected plan (trial, monthly, or yearly).",
    keywords: [
      "device",
      "devices",
      "platform",
      "platforms",
      "mobile",
      "desktop",
      "windows",
      "android",
      "ios",
      "mac",
      "linux",
    ],
  },
  {
    id: "setup",
    intent: "support",
    question: "How do I set up Xyber Veil?",
    answer:
      "Quick setup: choose a plan -> enter account details -> checkout -> payment -> connect. If setup fails, share your device + browser + exact error and I can guide step-by-step troubleshooting.",
    keywords: [
      "setup",
      "install",
      "configure",
      "configuration",
      "onboard",
      "start",
      "connect",
    ],
  },
  {
    id: "refund",
    intent: "support",
    question: "Do you offer refunds?",
    answer:
      "Yes. The website includes a 30-day money-back guarantee flow. For real operations, define refund terms, response SLA, and support channels in your legal policy pages.",
    keywords: ["refund", "money back", "guarantee", "cancel", "cancellation"],
  },
  {
    id: "slow-speed",
    intent: "support",
    question: "What if my VPN feels slow?",
    answer:
      "Try these steps: switch server region, reconnect, close heavy background downloads, and test another network. If speed is still low, share your location and device so support can suggest the best route.",
    keywords: [
      "slow",
      "speed issue",
      "lag",
      "latency",
      "buffering",
      "disconnect",
      "unstable",
    ],
  },
];

const SMALL_TALK: Array<{ triggers: string[]; reply: string }> = [
  {
    triggers: ["hi", "hello", "hey", "good morning", "good evening"],
    reply:
      "For more queries, please fill out the form. Our team will reach out to you shortly. Thank you.",
  },
  {
    triggers: ["thank you", "thanks", "thx"],
    reply: "You're welcome. If you want, I can also compare plans based on your usage.",
  },
];

function normalize(input: string) {
  return input.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(input: string) {
  return new Set(normalize(input).split(" ").filter(Boolean));
}

function score(item: KnowledgeItem, input: string) {
  const normalized = normalize(input);
  const tokens = tokenize(input);
  let s = 0;

  for (const kw of item.keywords) {
    const kwNormalized = normalize(kw);
    if (normalized.includes(kwNormalized)) s += 3;
    if (tokens.has(kwNormalized)) s += 1;
  }

  const questionNormalized = normalize(item.question.replace("?", ""));
  if (normalized.includes(questionNormalized)) s += 4;

  return s;
}

function smallTalkReply(message: string) {
  const normalized = normalize(message);
  for (const item of SMALL_TALK) {
    if (item.triggers.some((t) => normalized.includes(normalize(t)))) {
      return item.reply;
    }
  }
  return null;
}

function buildSuggestions(excludeId: string) {
  return KNOWLEDGE.filter((item) => item.id !== excludeId)
    .slice(0, 3)
    .map((item) => item.question)
    .join(" | ");
}

export function answerXyberVeilQuestion(userMessage: string) {
  const chatty = smallTalkReply(userMessage);
  if (chatty) return chatty;

  const ranked = KNOWLEDGE.map((item) => ({
    item,
    score: score(item, userMessage),
  })).sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const second = ranked[1];

  if (!best || best.score < 2) {
    return "For more queries, please fill out the form. Our team will reach out to you shortly. Thank you.";
  }

  if (
    second &&
    second.score >= 4 &&
    second.item.intent !== best.item.intent
  ) {
    return `${best.item.answer}\n\nAlso related: ${second.item.answer}`;
  }

  return `${best.item.answer}\n\nYou can also ask: ${buildSuggestions(best.item.id)}`;
}

