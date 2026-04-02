import { Reveal } from "@/components/motion/Reveal";

const rows = [
  { label: "Devices", trial: "1", monthly: "3", yearly: "5" },
  { label: "Data policy", trial: "Fair use", monthly: "Unlimited*", yearly: "Unlimited*" },
  {
    label: "Secure VPN encryption",
    trial: "AES-256 level",
    monthly: "AES-256 level",
    yearly: "AES-256 level",
  },
  {
    label: "No-log policy",
    trial: "Included",
    monthly: "Included",
    yearly: "Included",
  },
  {
    label: "Streaming optimized routing",
    trial: "Basic",
    monthly: "Yes",
    yearly: "Priority",
  },
  {
    label: "Support",
    trial: "Community",
    monthly: "Email support",
    yearly: "Priority email support",
  },
];

export default function ComparisonTable() {
  return (
    <Reveal
      as="div"
      className="mt-10 rounded-[1.8rem] glass-strong p-6 ring-1 ring-white/10"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Plan comparison</h3>
          <p className="mt-2 text-sm text-white/70">
            Clear differences between the best VPN options.
          </p>
        </div>
        <p className="text-xs text-white/60">*Demo policy text for UI.</p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-widest text-white/60">
              <th className="py-4 pr-4">Feature</th>
              <th className="py-4 pr-4">Free Trial</th>
              <th className="py-4 pr-4">Monthly</th>
              <th className="py-4">Yearly</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-white/10">
                <td className="py-4 pr-4 text-sm text-white/80">{r.label}</td>
                <td className="py-4 pr-4 text-sm text-white/70">{r.trial}</td>
                <td className="py-4 pr-4 text-sm text-white/70">{r.monthly}</td>
                <td className="py-4 text-sm text-white/70">{r.yearly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

