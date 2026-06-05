/**
 * Renders one or more schema.org JSON-LD payloads, each as its own inline
 * <script type="application/ld+json"> block.
 *
 * Each block is a standalone object with its own top-level "@context", which
 * is the form Google recommends and which schema/SEO parsers expect. Emitting
 * a bare top-level array instead breaks consumers that read `data["@context"]`
 * directly (an array has no "@context" key).
 *
 * Server-rendered with static, config-derived data only — no user input flows
 * into `data`, so stringifying it here is XSS-safe.
 */
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  const blocks = Array.isArray(data) ? data : [data];

  return (
    <>
      {blocks.map((block, index) => (
        <script
          // Static, ordered, config-derived list — index is a stable key here.
          key={index}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
