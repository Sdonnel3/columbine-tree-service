// Photos marked "real: true" are the business's own, posted by the owner on
// its Google listing (collected November 16, 2026). The rest are stand-ins:
// scenery only (forest and trees), never another company's crew.
// "swapFor" says which real photo from Lou's archive or the shoot replaces it.
// To swap one: drop the new file in public/photos and change "src" here.

export type Photo = {
  src: string;
  alt: string;
  swapFor: string;
  credit: string;
  real?: boolean;
};

export const photos = {
  truckCrew: {
    src: "/photos/truck-crew.jpg",
    alt: "Three crew members in safety vests standing in front of the Columbine Tree truck",
    swapFor: "",
    credit: "Columbine Tree, from its Google listing",
    real: true,
  },
  climber: {
    src: "/photos/climber.jpg",
    alt: "A climber in orange near the top of a tall limbed trunk, seen from the ground",
    swapFor: "",
    credit: "Columbine Tree, from its Google listing",
    real: true,
  },
  bucketTruck: {
    src: "/photos/bucket-truck.jpg",
    alt: "A bucket truck lifting a worker up beside a large tree trunk, with a grapple truck behind",
    swapFor: "",
    credit: "Columbine Tree, from its Google listing",
    real: true,
  },
  cutting: {
    src: "/photos/cutting.jpg",
    alt: "A crew member in orange cutting through a very large trunk with a chainsaw",
    swapFor: "",
    credit: "Columbine Tree, from its Google listing",
    real: true,
  },
  boom: {
    src: "/photos/boom.jpg",
    alt: "A boom lift raised high against a blue sky on a tree lined street",
    swapFor: "",
    credit: "Columbine Tree, from its Google listing",
    real: true,
  },
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
