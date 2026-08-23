/**
 * La Trajectoire.
 *
 * One curve, drawn twice: upright on the cover as a plotted performance chart, and rotated
 * a quarter turn in the margin rail where reading progress runs top to bottom and the
 * curve swings outward as the document advances.
 *
 * The curve is convex (slow, then steep) because that is the shape of compounding advisory
 * work, and because it echoes the rising arrow in the client's existing logo.
 */

export type Point = { x: number; y: number };

/** Convexity. Above 1 the curve starts flat and accelerates. */
export const CURVE_EXPONENT = 1.85;

/** Normalised curve value at position `t` (0 to 1). Returns 0 to 1. */
export function curveValue(t: number): number {
  return Math.pow(Math.min(Math.max(t, 0), 1), CURVE_EXPONENT);
}

/**
 * `steps` evenly spaced nodes along the curve, in normalised space:
 * `t` runs 0 to 1 across the axis, `v` runs 0 to 1 up the value axis.
 */
export function curveNodes(steps: number): { t: number; v: number }[] {
  if (steps < 2) return [{ t: 0, v: 0 }];
  return Array.from({ length: steps }, (_, i) => {
    const t = i / (steps - 1);
    return { t, v: curveValue(t) };
  });
}

/** A denser sample of the same curve, for drawing rather than for plotting nodes. */
export function curveSamples(resolution: number): { t: number; v: number }[] {
  return Array.from({ length: resolution + 1 }, (_, i) => {
    const t = i / resolution;
    return { t, v: curveValue(t) };
  });
}

/**
 * Catmull-Rom through the given points, emitted as cubic beziers. Produces a path that
 * actually passes through every node, which matters because the nodes are the chapters.
 */
export function smoothPath(points: readonly Point[], tension = 1): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${r(points[0].x)} ${r(points[0].y)}`;
  if (points.length === 2) {
    return `M ${r(points[0].x)} ${r(points[0].y)} L ${r(points[1].x)} ${r(points[1].y)}`;
  }

  const at = (i: number) => points[Math.min(Math.max(i, 0), points.length - 1)];
  let d = `M ${r(points[0].x)} ${r(points[0].y)}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);

    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d += ` C ${r(c1x)} ${r(c1y)}, ${r(c2x)} ${r(c2y)}, ${r(p2.x)} ${r(p2.y)}`;
  }

  return d;
}

function r(n: number): number {
  return Math.round(n * 100) / 100;
}

/* -------------------------------------------------------------------------- */
/* Cover chart geometry                                                        */
/* -------------------------------------------------------------------------- */

export const CHART = {
  width: 720,
  height: 330,
  padTop: 18,
  padBottom: 44,
  padStart: 10,
  padEnd: 22,
} as const;

export type ChartGeometry = {
  path: string;
  area: string;
  nodes: (Point & { index: number })[];
  baselineY: number;
  plotStartX: number;
  plotEndX: number;
  gridlines: number[];
};

/**
 * Builds the cover chart for `steps` phase nodes. `flip` mirrors the whole plot for RTL so
 * the curve still rises in the direction of reading.
 */
export function buildChart(steps: number, flip = false): ChartGeometry {
  const { width, height, padTop, padBottom, padStart, padEnd } = CHART;

  const left = flip ? padEnd : padStart;
  const right = width - (flip ? padStart : padEnd);
  const baselineY = height - padBottom;
  const plotHeight = baselineY - padTop;

  const toX = (t: number) => (flip ? right - t * (right - left) : left + t * (right - left));
  const toY = (v: number) => baselineY - v * plotHeight;

  const nodes = curveNodes(steps).map((n, index) => ({
    x: toX(n.t),
    y: toY(n.v),
    index,
  }));

  const dense = curveSamples(64).map((n) => ({ x: toX(n.t), y: toY(n.v) }));
  const path = smoothPath(dense);

  const first = dense[0];
  const last = dense[dense.length - 1];
  const area = `${path} L ${last.x} ${baselineY} L ${first.x} ${baselineY} Z`;

  // Four horizontal gridlines, evenly spaced, excluding the baseline itself.
  const gridlines = [0.25, 0.5, 0.75, 1].map((f) => baselineY - f * plotHeight);

  return {
    path,
    area,
    nodes,
    baselineY,
    plotStartX: Math.min(left, right),
    plotEndX: Math.max(left, right),
    gridlines,
  };
}

/* -------------------------------------------------------------------------- */
/* Margin rail geometry                                                        */
/* -------------------------------------------------------------------------- */

export const RAIL = {
  width: 68,
  height: 430,
  padBlock: 14,
  inset: 10,
} as const;

export type RailGeometry = {
  path: string;
  nodes: (Point & { index: number })[];
};

/**
 * The same curve rotated a quarter turn: reading progress runs down the rail, and the
 * curve swings toward the outer edge as the document advances.
 */
export function buildRail(steps: number): RailGeometry {
  const { width, height, padBlock, inset } = RAIL;

  const top = padBlock;
  const bottom = height - padBlock;
  const near = inset;
  const far = width - inset;

  const toY = (t: number) => top + t * (bottom - top);
  const toX = (v: number) => near + v * (far - near);

  const nodes = curveNodes(steps).map((n, index) => ({
    x: toX(n.v),
    y: toY(n.t),
    index,
  }));

  const dense = curveSamples(48).map((n) => ({ x: toX(n.v), y: toY(n.t) }));

  return { path: smoothPath(dense), nodes };
}
