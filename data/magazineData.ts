export type ContentBlock = 
  | { type: "text"; value: string }
  | { type: "image"; value: string; caption?: string } 
  | { type: "quote"; value: string };

export type Blog = {
  type: "blog";
  id: number;
  slug: string;
  title: string;
  image: string;
  author: string;
  date: string;
  category: string;
  featuredParagraphs: string[]; 
  detailedContent: ContentBlock[]; 
};

export type Ad = { type: "ad"; id: string; image: string; aspect: string; };
export type SidebarItem = Blog | Ad;

export const blogs: Blog[] = [
  {
    type: "blog",
    id: 1,
    slug: "architectural-storytelling",
    title: "The Future of Architectural Storytelling",
    image: "/temp/magazine/blogs/blog-1.png",
    date: "18 Mar 2026",
    author: "Manisha AR",
    category: "Editorial",
    featuredParagraphs: [
      "Architecture today is no longer confined to physical structures—it has evolved into a medium of storytelling. Every line drawn, every material chosen, and every void created contributes to a narrative.",
      "In contemporary design, the focus has shifted from mere functionality to emotional resonance. Spaces are now designed to be felt through experience rather than explanation.",
      "Minimalism continues to play a significant role, but it is no longer about emptiness—it is about intention. Every element that exists within a space serves a purpose, contributing to a larger, cohesive story."
    ],
    detailedContent: [
      { type: "image", value: "/temp/magazine/blogs/inner-long-1.jpg", caption: "The dramatic interplay of light and shadow in a brutalist hallway, defining the sequence of discovery." },
      { type: "text", value: "Architecture is often perceived as a static art, a collection of bricks and mortar frozen in time. However, the true essence of a building lies in its ability to facilitate human experience. As we move further into 2026, the 'Editorial' approach to design has become paramount. It’s no longer enough to just build; we must curate a journey. A well-designed building should function like a well-written novel—having a clear introduction (the facade), a compelling plot (the circulation), and an emotional climax (the primary living space)." },
      { type: "image", value: "/temp/magazine/blogs/inner-long-1.jpg", caption: "The dramatic interplay of light and shadow in a brutalist hallway, defining the sequence of discovery." },
      { type: "text", value: "This curation starts with the understanding of light. In this project, the void was used as a primary material. By creating large apertures in the concrete shell, we allowed the sun to act as a dynamic storyteller. The space transforms from a cold, stark environment in the morning to an intimate, warm sanctuary by sunset. This is where architecture becomes cinema—it’s about the frame and what you choose to show the inhabitant." },
      { type: "quote", value: "A room is not a room without natural light. Light is what gives the soul to the concrete and makes the story visible." },
      { type: "text", value: "Beyond the visual, the tactile qualities of a structure define its long-term narrative. We chose materials that don't just age, but mature. Reclaimed timber, hand-poured concrete, and oxidized steel—each carries a history. When a user runs their hand along a wall, they are touching a piece of time. This physical connection is what separates a house from a home. It’s about the warmth of wood against the coldness of stone." },
      { type: "image", value: "/temp/magazine/blogs/inner-2.jpg", caption: "Vertical pacing and the sense of infinity through layered structural voids." },
      { type: "text", value: "Sustainability is the subtext of every modern architectural story. It’s not just about solar panels; it’s about the longevity of materials. Using local stone that ages gracefully over decades tells a story of permanence in an era of disposable aesthetics. As designers, our duty is to ensure that the story remains relevant for generations. We are writing the history of the future, one brick at a time." },
      { type: "text", value: "Ultimately, the future of architectural storytelling lies in restraint. In a world filled with digital noise, the most powerful stories are told in the quietest rooms. The absence of clutter allows the inhabitant to insert their own life into the 'Draft' of the designer. We provide the canvas; they provide the life. The story ends only when the space is no longer inhabited." }
    ]
  },
  {
    type: "blog",
    id: 2,
    slug: "reimagining-materiality",
    title: "Reimagining Spaces Through Materiality",
    image: "/temp/magazine/blogs/blog-1.png",
    date: "26 Feb 2026",
    author: "Aman Mishra",
    category: "Architecture",
    featuredParagraphs: [
      "Materiality has become one of the most powerful tools in defining modern architecture. Beyond aesthetics, materials influence how a space feels, ages, and interacts.",
      "Designers are increasingly drawn to honest materials—those that express their true nature without excessive treatment. Raw concrete, natural stone, untreated wood.",
      "The interplay of textures is where design truly comes alive. Smooth surfaces contrasted with rough finishes create a tactile richness that engages both sight and touch."
    ],
    detailedContent: [
      { type: "text", value: "In the pursuit of perfection, modernism often lost its soul. The clinical white walls and flawless glass facades of the last decade are giving way to something more primal. We are reimagining materiality as a sensory experience. It's about the grit of the sand in the plaster, the coolness of the marble, and the smell of cedar in the air. Materials are the vocabulary of architecture; they tell us if a space is welcoming or formal, temporary or eternal." },
      { type: "image", value: "/temp/magazine/blogs/mat-1.jpg", caption: "Raw stone honesty meeting modern precision in a residential courtyard." },
      { type: "text", value: "Honesty in materials means allowing them to express their true nature. Concrete is not just a flat surface; it's a liquid stone that captures the impressions of its wooden formwork. When we leave these marks visible, we reveal the process of creation. This transparency builds a profound trust between the user and the built environment. We are no longer hiding the construction; we are celebrating it." },
      { type: "quote", value: "Materials have their own will. A brick wants to be an arch; concrete wants to be a mountain. Our job is to let them speak." },
      { type: "text", value: "Contrast is the tool of the master. Placing a polished brass fixture against a rough, weathered stone wall creates a tension that is visually arresting. It’s about the dialogue between the refined and the rugged. This interplay of textures is where design truly comes alive, creating a tactile richness that engages the dweller in a way that purely visual design never can." },
      { type: "text", value: "As we move towards a circular economy, materiality also becomes an ethical manifesto. We are looking at bio-materials—mycelium bricks, algae-based glass, and recycled polymers—that not only look stunning but contribute back to the earth. Materiality is no longer just an aesthetic choice; it's a survival strategy for the 21st century." }
    ]
  },
  {
    type: "blog",
    id: 3,
    slug: "modern-urban-living",
    title: "Modern Living: A Deep Dive into Urban Spaces",
    image: "/temp/magazine/blogs/blog-1.png",
    date: "20 Feb 2026",
    author: "Design POV",
    category: "Interiors",
    featuredParagraphs: [
      "Urban living has transformed the way we perceive space. With increasing density and limited square footage, design must be both efficient and inspiring.",
      "Modern interiors are moving towards simplicity—not as a trend, but as a necessity. Clean lines, neutral palettes, and open layouts help create openness.",
      "Functionality is at the core of urban design. Furniture is no longer static—it adapts, transforms, and serves multiple purposes."
    ],
    detailedContent: [
      { type: "text", value: "Urban living has transformed the way we perceive space. With increasing density and limited square footage, design must be both efficient and inspiring. The challenge for the modern designer is to make 400 square feet feel like 4000. This requires a radical rethinking of the 'home'—moving away from traditional room divisions toward fluid, multi-purpose zones." },
      { type: "image", value: "/temp/magazine/blogs/urban-1.jpg", caption: "Maximizing volume through vertical storage and translucent partitions in a Tokyo micro-apartment." },
      { type: "text", value: "Simplicity is not about having less; it's about making what you have work harder. Every piece of furniture in a modern urban apartment must be a multi-tasker. A dining table that becomes a workspace; a sofa that hides storage; a wall that moves to reveal a bedroom. This flexibility is the key to psychological comfort in dense cities. It’s about giving the user control over their environment." },
      { type: "quote", value: "Simplicity is the ultimate sophistication. In small spaces, it is the only way to breathe." },
      { type: "text", value: "Natural elements are being reintroduced into urban homes to counterbalance the fast-paced city lifestyle. Indoor plants, natural textures, and soft, warm lighting bring a sense of calm and grounding. Even in a skyscraper, we need the touch of wood and the sight of green to remain human. This 'Biophilic' design is no longer a luxury—it’s a necessity for mental well-being in the urban jungle." },
      { type: "text", value: "Ultimately, modern urban living is about the balance between technology and nature. Smart home systems that disappear into the background, allowing the beauty of a simple ceramic vase or the texture of a linen curtain to take center stage. We are creating sanctuaries within the chaos." }
    ]
  }
];

export const advertisements: Ad[] = [
  { type: "ad", id: "ad-1", image: "/temp/3.jpg", aspect: "aspect-[3/4]" },
  { type: "ad", id: "ad-2", image: "/temp/2.jpg", aspect: "aspect-square" }
];