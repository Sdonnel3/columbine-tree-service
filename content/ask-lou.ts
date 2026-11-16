// Ask Lou. Every answer here is a DRAFT written before talking to Lou.
// Each one opens with the direct answer, then the reasoning.
// After Shannon records the conversation, rewrite these from his real words
// and set "draft" to false. No specific species advice until he confirms it.

export const story = {
  title: "Ask Lou.",
  paragraphs: [
    "Lou Fohn was a fireman around here before he was a tree man. [CONFIRM WITH LOU: which department, how many years, and that he is happy to have it mentioned]",
    "He started moving trees about four decades ago and never stopped. His son Tim grew up in it and works beside him now. Between them they have planted, moved and watched a lot of Colorado trees.",
    "These are the questions they hear most. Lou answers them the way he would on the phone.",
  ],
};

export type QA = {
  q: string;
  direct: string;
  more: string;
  confirm: string;
  draft: boolean;
};

export const questions: QA[] = [
  {
    q: "How do I pick the right tree for a specific spot?",
    direct: "Start with the spot, not the tree.",
    more: "Look at how much sun it gets, how much room there is overhead and underground, what the soil is like, and how water moves through it. Then think about what you want from the tree in twenty years. Shade, privacy, fruit, or just something good to look at. Most trouble starts when someone falls for a tree first and tries to make the spot fit it later. Tell us about the spot, or better, let us see it. Then come walk the farm and we will point you to the ones that suit it.",
    confirm: "Lou's own rules of thumb for matching a tree to a spot",
    draft: true,
  },
  {
    q: "Which trees last longest in Littleton?",
    direct: "The ones that were raised here.",
    more: "A tree that has already been through Littleton winters, dry spells and spring snow has a head start over one that grew up somewhere mild. That is the whole reason we grow our own. Past that, a long life comes down to the right tree in the right spot, planted properly and watered through its first seasons. Lou has opinions on which kinds hold up best around here, and he will share them when you call.",
    confirm: "the trees Lou recommends most for Littleton, and why",
    draft: true,
  },
  {
    q: "Which trees shed the least?",
    direct: "Every tree drops something, so the real question is what you can live with.",
    more: "Leaves, needles, seeds, fruit, twigs. Some trees drop it all in one week in the fall. Some drop a little all year. Where the tree sits matters as much as what kind it is. The same tree that is no trouble at the back of a lot can be a chore over a patio, a pool or a parking area. Tell us what is under the spot and how much cleanup you are willing to do, and we will steer you to a good fit.",
    confirm: "Lou's low mess picks, and the trees he would never plant here",
    draft: true,
  },
  {
    q: "When can you transplant a tree in Colorado?",
    direct: "Most of the year, just not December or January.",
    more: "The textbook gives you a short window in spring and another in fall. A tree spade changes that, because the tree travels with a big ball of its own soil and its roots stay put inside it. That gives us more of the calendar to work with. The rest is judgment. Colorado weather does not follow a schedule, so we look at the ground, the forecast and the tree itself before we set a date. If you are planning a project, call early and we will tell you what the timing looks like.",
    confirm: "when Lou will and will not transplant, month by month",
    draft: true,
  },
  {
    q: "How big a tree can you move?",
    direct: "Bigger than most people expect, but we are not moving redwoods.",
    more: "We run more than one tree spade, so we can match the machine to the tree. What decides it is the trunk width, the height, the kind of tree, and whether we can get the truck to it and to where it is going. Overhead lines, fences, slopes and buried utilities all count. The fastest way to find out is to call and describe the tree, or send a note with where it is. We will tell you straight whether it can move.",
    confirm: "spade sizes, and the largest trunk width and height they can move",
    draft: true,
  },
  {
    q: "Why buy a tree grown in Littleton instead of one shipped in?",
    direct: "Because it is already used to the place it is going to live.",
    more: "Our trees grow in Littleton soil for years before we sell them. They have been through the cold snaps, the dry wind and the heavy spring snow. A tree shipped in from a milder place has to get used to all of that at the same time it is recovering from the move. That is a lot to ask. Ours only have to handle the move. You can also see exactly what you are buying. Come walk the rows and pick your tree while it is still in the ground.",
    confirm: "how long the typical farm tree has been in the ground",
    draft: true,
  },
  {
    q: "What should I do after my tree is planted?",
    direct: "Water it, and keep watering it longer than you think you need to.",
    more: "A newly planted tree is living on the roots that came with it until new ones grow out into your soil. That takes time. Steady, deep watering through that stretch matters more than anything else you can do. Before we leave on planting day we will tell you what your tree needs, how much and how often, based on the tree and your spot. If something looks off later, call us. We would rather hear about it early.",
    confirm: "what Lou tells every customer to do after planting",
    draft: true,
  },
  {
    q: "Do you work in the mountains?",
    direct: "Yes, we work all over Colorado, mountain towns included.",
    more: "We have taken trees and equipment up to Aspen and plenty of places in between. Mountain jobs take more planning. The roads, the season and the altitude all change what makes sense, and the right tree for Littleton is not always the right tree higher up. Call us with where the property is and what you have in mind. We will tell you what we think will work and when we can get there. We were also once flown to Hawaii for a tree job, but that is a longer story.",
    confirm: "the Aspen and Hawaii jobs: what, when, and okay to publish",
    draft: true,
  },
  {
    q: "What does a commercial planting project look like?",
    direct: "It starts with a conversation and ends with us planting trees from our own farm.",
    more: "A builder, HOA or property manager calls with a site and a goal. Lou or Tim talks it through, and then we look at the property. Some clients want a planting plan. Some already have one and need the trees. Many want both. We quote it, and you come pick trees at the farm if you would like to. On planting day we bring our own spades and trucks, so nothing waits on a rental. One company does the planning, the trees and the install.",
    confirm: "a typical commercial project size and timeline",
    draft: true,
  },
];
