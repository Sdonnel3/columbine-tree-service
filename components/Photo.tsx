import Image from "next/image";
import type { Photo as PhotoT } from "@/content/photos";

// A photograph cut to the plug shape, with its stand-in label underneath.
export function PlugPhoto({
  photo,
  ratio = "4 / 4.4",
  sizes = "(max-width: 720px) 100vw, 50vw",
  caption,
}: {
  photo: PhotoT;
  ratio?: string;
  sizes?: string;
  caption?: string;
}) {
  return (
    <figure className="plug-fig" data-reveal>
      <div className="plug" style={{ aspectRatio: ratio }}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} />
      </div>
      {caption || !photo.real ? (
        <figcaption>
          {caption ?? `Stand-in photo. Goes here: ${photo.swapFor}.`}
        </figcaption>
      ) : null}
    </figure>
  );
}
