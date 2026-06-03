/**
 * Renders a schema.org JSON-LD payload as an inline <script>.
 *
 * Server-rendered with static, config-derived data only — no user input
 * flows into `data`, so stringifying it here is XSS-safe.
 */
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
