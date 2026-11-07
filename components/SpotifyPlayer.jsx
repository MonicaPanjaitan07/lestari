export default function SpotifyPlayer() {
  return (
    <iframe
      data-testid="embed-iframe"
      style={{ borderRadius: "12px" }}
      src="https://open.spotify.com/embed/track/1dGr1c8CrMLDpV6mPbImSI?utm_source=generator"
      width="100%"
      height="152"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}