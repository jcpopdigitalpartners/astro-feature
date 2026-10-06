export function estimate(raw: string, monthlyRate: number): { seats: number; total: number } | { error: string } {
  if (!/^\d+$/.test(raw.trim())) return {error:'Enter a whole number of seats from 1 to 1,000.'};
  const seats=Number(raw);
  if (!Number.isSafeInteger(seats)||seats<1||seats>1000) return {error:'Choose between 1 and 1,000 seats.'};
  return {seats,total:seats*monthlyRate};
}
