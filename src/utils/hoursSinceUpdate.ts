export function hoursSinceUpdate(lastUpdateAt: number | null | undefined) {
  if (!lastUpdateAt) {
    return "";
  }

  const lastUpdatedDate = new Date(lastUpdateAt);
  const nowDate = new Date();

  const HOUR = 1000 * 60 * 60;

  const utc1 = Date.UTC(
    lastUpdatedDate.getFullYear(),
    lastUpdatedDate.getMonth(),
    lastUpdatedDate.getDate()
  );
  const utc2 = Date.UTC(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate()
  );

  return `${Math.floor((utc2 - utc1) / HOUR)}hr`;
}
