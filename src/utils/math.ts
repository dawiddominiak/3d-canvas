function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}

export function cos(degrees: number) {
  return Math.cos(toRadians(degrees));
}

export function sin(degrees: number) {
  return Math.sin(toRadians(degrees));
}
