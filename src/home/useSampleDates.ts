import { useEffect, useState } from "react";
import { sampleDates } from "@/data/sampleClaim";

type SampleDates = ReturnType<typeof sampleDates>;

/**
 * The sample claim's dates, filled in after hydration. The prerender has no
 * "today", so it renders without them and the browser adds them.
 */
export function useSampleDates(): SampleDates | null {
  const [dates, setDates] = useState<SampleDates | null>(null);
  useEffect(() => setDates(sampleDates()), []);
  return dates;
}
