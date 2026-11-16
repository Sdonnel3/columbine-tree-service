// Every picture on the site right now is a stand-in.
// They are scenery only (forest and trees), never another company's crew.
// "swapFor" says which real photo from Lou's archive or the shoot replaces it.
// To swap one: drop the new file in public/photos and change "src" here.

export type Photo = {
  src: string;
  alt: string;
  swapFor: string;
  credit: string;
};

export const photos = {
  rows: {
    src: "/photos/rows.jpg",
    alt: "A band of dark conifers between a meadow and a pale sky",
    swapFor: "the farm rows, wide",
    credit: "Jens Lelie, Unsplash",
  },
  snow: {
    src: "/photos/snow.jpg",
    alt: "Fir trees heavy with snow in winter fog",
    swapFor: "close up of a conifer on the farm",
    credit: "Gabriel Santiago, Unsplash",
  },
  trunks: {
    src: "/photos/trunks.jpg",
    alt: "Tall straight pine trunks over a bright green forest floor",
    swapFor: "a spade lifting a tree",
    credit: "Jon Ottosson, Unsplash",
  },
  autumn: {
    src: "/photos/autumn.jpg",
    alt: "Low cloud drifting over a conifer forest in autumn",
    swapFor: "a finished commercial install",
    credit: "Vadim Sherbakov, Unsplash",
  },
  fog: {
    src: "/photos/fog.jpg",
    alt: "A path through tall pines fading into fog",
    swapFor: "a customer walking the rows",
    credit: "Orlova Maria, Unsplash",
  },
  redwood: {
    src: "/photos/redwood.jpg",
    alt: "Looking up at towering redwood trunks",
    swapFor: "keep this one, it is the joke",
    credit: "Kim Daniel, Unsplash",
  },
  path: {
    src: "/photos/path.jpg",
    alt: "A wooden footbridge leading into green forest",
    swapFor: "a deciduous tree on the farm",
    credit: "Tim Swaan, Unsplash",
  },
} satisfies Record<string, Photo>;
