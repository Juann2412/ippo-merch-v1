export function now() {
  return Date.now();
}

export function timestamps() {
  const t = now();
  return { createdAt: t, updatedAt: t };
}

export function touch() {
  return { updatedAt: now() };
}
