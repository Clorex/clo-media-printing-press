"use client";

import { useCountdown } from "@/lib/hooks/useCountdown";

interface Props {
  endTime: Date;
}

export function CountdownTimer({ endTime }: Props) {
  const { expired, days, hours, minutes, seconds } =
    useCountdown(endTime);

  if (expired) return null;

  return (
    <div className="flex justify-center gap-4 text-center mt-6 flex-wrap">
      <TimeBox label="Days" value={days} />
      <TimeBox label="Hours" value={hours} />
      <TimeBox label="Minutes" value={minutes} />
      <TimeBox label="Seconds" value={seconds} />
    </div>
  );
}

function TimeBox({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-brand p-4 min-w-[70px]">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs uppercase opacity-70">
        {label}
      </div>
    </div>
  );
}
