import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kontraktly",
    short_name: "Kontraktly",
    description:
      "Norske kontraktmaler tilpasset norsk lovgivning — freelance, leie, NDA, arbeidsavtale og flere. Last ned som PDF fra 59 kr.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#0a0a0b",
    lang: "nb-NO",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
