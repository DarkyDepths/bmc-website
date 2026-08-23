import { buildChart, CHART } from '@/lib/trajectory';

type CoverChartProps = {
  phases: string[];
  caption: string;
  note: string;
  axis: string;
  title: string;
  description: string;
  rtl?: boolean;
};

/**
 * The cover plate: the trajectory drawn upright as a plotted chart, with the five phases of
 * the method as the axis. It is a diagram of the method, not a claim about client numbers,
 * and it says so under the plot.
 *
 * Deliberately a server component. The draw is pure CSS on `stroke-dashoffset`, so this
 * ships zero JavaScript and still animates.
 */
export function CoverChart({
  phases,
  caption,
  note,
  axis,
  title,
  description,
  rtl = false,
}: CoverChartProps) {
  /**
   * The plot is not mirrored under RTL. A chart axis is a mathematical convention, and
   * Arabic financial reporting draws it left to right like everyone else; mirroring it
   * produces a line that falls across the page, which reads as decline no matter which
   * way the words run. The phase labels keep their true sequence underneath.
   */
  const chart = buildChart(phases.length, false);
  const last = chart.nodes.length - 1;

  return (
    <figure className="m-0">
      <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-rule pb-2.5">
        <span className="label">{caption}</span>
        {/* Dropped on a phone. There is no room for it beside the caption, and stacked
            under a caption that already ends in "performance" it reads as a stutter. */}
        <span className="label hidden text-ink-3 sm:inline">
          {axis}
          {/* Matches the plot, which is never mirrored. */}
          <span aria-hidden="true" className="ltr">
            {' '}
            ↗
          </span>
        </span>
      </div>

      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-labelledby="cover-chart-title cover-chart-desc"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="cover-chart-title">{title}</title>
        <desc id="cover-chart-desc">{description}</desc>

        {/* Ruled paper. */}
        <g stroke="var(--color-rule)" strokeWidth="1">
          {chart.gridlines.map((y) => (
            <line
              key={y}
              x1={chart.plotStartX}
              x2={chart.plotEndX}
              y1={y}
              y2={y}
              strokeDasharray="2 5"
            />
          ))}
        </g>

        {/* Baseline. */}
        <line
          x1={chart.plotStartX}
          x2={chart.plotEndX}
          y1={chart.baselineY}
          y2={chart.baselineY}
          stroke="var(--color-rule-2)"
          strokeWidth="1"
        />

        {/* Area under the curve. Faint enough to read as a tint, not a fill. */}
        <path d={chart.area} fill="var(--color-wine)" opacity="0.07" className="chart-area" />

        <path
          d={chart.path}
          pathLength={1}
          fill="none"
          stroke="var(--color-wine)"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="chart-curve"
        />

        {chart.nodes.map((node, index) => {
          const delay = 620 + index * 250;
          const isLast = index === last;

          return (
            <g key={node.index}>
              {/* Drop line to the axis. */}
              <line
                x1={node.x}
                x2={node.x}
                y1={chart.baselineY}
                y2={chart.baselineY + 7}
                stroke="var(--color-rule-2)"
                strokeWidth="1"
                className="chart-tick"
                style={{ '--node-delay': `${delay}ms` } as React.CSSProperties}
              />

              <circle
                cx={node.x}
                cy={node.y}
                r={isLast ? 6 : 4.25}
                fill={isLast ? 'var(--color-wine)' : 'var(--color-paper)'}
                stroke="var(--color-wine)"
                strokeWidth="1.5"
                className="chart-node"
                style={{ '--node-delay': `${delay}ms` } as React.CSSProperties}
              />

              {/* End labels are anchored outward so a long phase name cannot be
                  clipped by the viewBox. */}
              <text
                x={node.x}
                y={chart.baselineY + 26}
                textAnchor={index === 0 ? 'start' : isLast ? 'end' : 'middle'}
                fill="var(--color-ink-3)"
                className="chart-tick"
                style={
                  {
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: rtl ? '0' : '0.1em',
                    textTransform: rtl ? 'none' : 'uppercase',
                    '--node-delay': `${delay + 60}ms`,
                  } as React.CSSProperties
                }
              >
                {phases[index]}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption className="mt-3 text-micro text-ink-3">{note}</figcaption>
    </figure>
  );
}
