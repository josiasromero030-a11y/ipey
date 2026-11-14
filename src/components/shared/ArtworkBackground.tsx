interface ArtworkBackgroundProps {
  src: string;
  mobileSrc?: string;
  priority?: boolean;
  shade?: boolean;
}

/** Artwork and contrast are separate from logos and interactive HTML. */
export function ArtworkBackground({ src, mobileSrc, priority = false, shade = true }: ArtworkBackgroundProps) {
  const artwork = (
    <img
      className="visual-background ipey-cover__background"
      src={src}
      alt=""
      aria-hidden="true"
      draggable="false"
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
    />
  );

  return (
    <>
      {mobileSrc ? (
        <picture>
          <source media="(max-width: 680px)" srcSet={mobileSrc} />
          {artwork}
        </picture>
      ) : artwork}
      {shade && <span className="visual-shade ipey-cover__shade" aria-hidden="true" />}
    </>
  );
}
