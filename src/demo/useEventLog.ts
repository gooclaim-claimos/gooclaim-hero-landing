import { useCallback, useState } from "react";
import { clockTime } from "./speech";

export interface LogRow {
  ev: string;
  detail: string;
  c: string;
  time: string;
}

/** The "what the OS did" ledger beside a demo. Rows are only added from handlers. */
export function useEventLog() {
  const [log, setLog] = useState<LogRow[]>([]);
  const add = useCallback((ev: string, detail: string, c = "#2563EB") => {
    const time = clockTime();
    setLog((rows) => rows.concat([{ ev, detail, c, time }]));
  }, []);
  const clear = useCallback(() => setLog([]), []);
  return { log, add, clear };
}
