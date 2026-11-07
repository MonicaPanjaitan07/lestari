"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const TRACK = "spotify:track:1dGr1c8CrMLDpV6mPbImSI";

export default function SpotifyPlayer() {
  const holder = useRef(null);
  const ctrl = useRef(null);
  const created = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dead = false;
    const init = (api) => {
      if (dead || created.current || !holder.current) return;
      created.current = true;
      api.createController(holder.current, { uri: TRACK, width: 300, height: 80 }, (c) => {
        ctrl.current = c;
        c.addListener("ready", () => setReady(true));
        c.addListener("playback_update", (e) => setPlaying(!e.data.isPaused));
      });
    };
    if (window.SpotifyIframeApi) {
      init(window.SpotifyIframeApi);
    } else {
      window.onSpotifyIframeApiReady = (api) => {
        window.SpotifyIframeApi = api;
        init(api);
      };
      if (!document.getElementById("spotify-iframe-api")) {
        const s = document.createElement("script");
        s.id = "spotify-iframe-api";
        s.src = "https://open.spotify.com/embed/iframe-api/v1";
        s.async = true;
        document.body.appendChild(s);
      }
    }
    return () => { dead = true; };
  }, []);

  return (
    <>
      {/* player asli Spotify, disembunyikan */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", bottom: 0, right: 0, width: 300, height: 80, opacity: 0.01, pointerEvents: "none", zIndex: -1 }}
      >
        <div ref={holder} />
      </div>

      {/* tombol play buatan sendiri */}
      <button
        onClick={() => ctrl.current && ctrl.current.togglePlay()}
        disabled={!ready}
        aria-label={playing ? "Pause music" : "Play music"}
        style={{
          position: "fixed", bottom: 16, right: 16, zIndex: 50,
          width: 52, height: 52, borderRadius: "50%", border: "none",
          cursor: ready ? "pointer" : "wait", opacity: ready ? 1 : 0.6,
          background: "#ec4f84", color: "#fff", display: "grid", placeItems: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,.2)",
        }}
      >
        {playing ? <Pause size={22} /> : <Play size={22} />}
      </button>
    </>
  );
}