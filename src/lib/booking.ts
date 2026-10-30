/**
 * The founder's Cal.com booking page for a 20-minute walkthrough. Empty = no
 * booking step: the thank-you panel says the team will write to fix a time.
 * The lead is always saved by /api/waitlist FIRST; booking comes after it, so a
 * visitor who closes the calendar is still a lead. Keep in step with
 * BOOKING_URL in api/waitlist.ts.
 */
export const BOOKING_URL = "https://cal.com/gooclaimos/walkthrough";

/** The booking page with what the visitor already typed, so they do not type it twice. */
export function bookingLink(form: { name: string; work_email: string; company: string }): string {
  const url = new URL(BOOKING_URL);
  url.searchParams.set("name", form.name.trim());
  url.searchParams.set("email", form.work_email.trim());
  // The booking form asks "Company" (required) under the identifier `company`.
  if (form.company.trim()) url.searchParams.set("company", form.company.trim());
  return url.toString();
}
