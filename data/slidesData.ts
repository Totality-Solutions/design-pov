import { StaticImageData } from "next/image";

// Image Imports
import BlogImg1 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg2 from "@/public/temp/home/blogs/blog-2.jpg";
import BlogImg3 from "@/public/temp/home/blogs/blog-3.jpg";
import BlogImg4 from "@/public/temp/home/blogs/blog-4.jpg";
import BlogImg5 from "@/public/temp/home/blogs/blog-5.jpg";
import BlogImg6 from "@/public/temp/home/blogs/blog-6.jpg";
import BlogImg7 from "@/public/temp/home/blogs/blog-7.webp";
import BlogImg8 from "@/public/temp/home/blogs/blog-8.webp";
import BlogImg9 from "@/public/temp/home/blogs/blog-9.jpg";
import BlogImg10 from "@/public/temp/home/blogs/blog-10.jpg";
import BlogImg11 from "@/public/temp/home/blogs/blog-11.jpg";
import BlogImg12 from "@/public/temp/home/blogs/blog-12.webp";
import BlogImg13 from "@/public/temp/home/blogs/blog-13.jpg";
import BlogImg14 from "@/public/temp/home/blogs/blog-14.jpg";
import BlogImg15 from "@/public/temp/home/blogs/blog-15.jpg";
import BlogImg16 from "@/public/temp/home/blogs/blog-16.jpg";

export interface Slide {
  id: number;
  slug: string;
  category: string;
  author: string;
  date: string;
  isFeatured: boolean;
  thumbnail: StaticImageData;
  main: StaticImageData;
  title: string;
  subtitle: string;
  description: string;
  midSectionTitle: string;
  paragraph: string[];
  midSectionImage: StaticImageData | string;
  outcomeSections: {
    heading?: string;
    text: string;
  }[];
}

export const slides: Slide[] = [
  {
    id: 1,
    slug: "cordkraft-design-studio-laad-5-ahmedabad",
    category: "Architectural Spotlight",
    author: "Aman Pandey",
    date: "2026-04-17",
    isFeatured: true,
    thumbnail: BlogImg1,
    main: BlogImg1,
    title: "Cordkraft Design Studio’s LAAD-5 in Ahmedabad is a monochrome retreat defined by a handcrafted ceiling mural",
    subtitle: "Vol. 01 — Architectural Series",
    description: "Every room has a characteristic that grounds it. The sofa anchors your faze. The artwork commands the wall. The rug defines the floor.",
    midSectionTitle: "The Brief & Structural Challenge",
    paragraph: [
      "However, in Cordkraft Design Studio’s LAAD-5 in Ahmedabad, Gujarat, the most captivating element of the space is the forgotten fifth wall, where eyes rarely wander unless forced upward by a chandelier. The architects thought that the idea that murals were only restricted to walls confined creativity. And so, a sculpted, handcrafted plaster-of-Paris installation that required weeks of physical labour was drawn on the ceiling.",
      "“The ceiling was physically, mentally, and economically tiring, making it the hardest and most challenging to do,” reflects the team. However, fortunately, the design studio loves challenges. This philosophy is reflected in other aspects of the home as well.",
      "When homeowners approached Cordkraft in 2022 for the Vastrapur bungalow, their requests seemed simple enough. They had to connect the formal living room to the garden and work with a subtle colour palette. However, the 370 sq. ft. space held technical complexity that would test their problem-solving prowess. It was housed within a load-bearing structure that turned a simple wall removal into a complex engineering task."
    ],
    midSectionImage: "/images/blog/blog1-detail.jpg",
    outcomeSections: [
      { 
        heading: "The Monochrome", 
        text: "With the ceiling taking over as the living room’s spotlight, other elements assume a supporting role. Italian marble sweeps across the floor in dark, dramatic specks, its polished surface making the room expansive through reflection. Subtle hues of lime wash softens the walls in matte neutrality, a finish that absorbs light, embracing warmth. The palette moves fluidly through shades of black, grey, and pearl." 
      },
      { 
        heading: "The Decor & Philosophy", 
        text: "“It breaks away from the luxury trends of today’s market,” the studio notes. While much of contemporary Indian luxury design equates richness with abundance, like more marble, more gold, more everything, LAAD-5 argues for luxury as minimalism. The expensive materials are present (Italian marble, custom sculptural furniture, that labour-intensive ceiling), but they’re placed intentionally. This creates a room for living rather than staging." 
      }
    ]
  },
 {
    id: 2,
    slug: "inside-art-mumbai-from-where-we-stood",
    category: "Art & Culture",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg2,
    main: BlogImg2,
    title: "Inside Art Mumbai, From Where We Stood",
    subtitle: "Vol. 02 — Art Edition",
    description: "As soon as I entered Art Mumbai, I had an overwhelming realisation of my adoration for art and design. No one other than someone who’s genuinely in love with art would subject themselves to the excursion to Mahalaxmi Racecourse.",
    midSectionTitle: "The Seven Colours & Meandering Histories",
    paragraph: [
      "It was my first time at an edition, and the first thing I saw didn’t disappoint: a mirror under a plaque that reads “Currently under interpretation.” Beyond the flattering implication that I was a piece of art, I was intrigued by how it asked the audience to keep an open mind and perspective about what awaited them.",
      "The first piece that stopped me in my tracks was Subodh Gupta’s The Seven Colours. Hundreds of stainless steel tongs, coated in PVD, burst from the wall like a firework frozen mid-explosion. The chimtas (a staple in Indian kitchens) were meant to become a commentary on India’s industrial rise, middle-class domesticity, and mass manufacture.",
      "Then there was Remen Chopra W. Van Der Vaart’s Meandering Histories Intertwined. I had to lean in close to look at this piece. Carved from recycled wood and set against fragments of woven carpet, its multidisciplinary approach seemed like a map."
    ],
    midSectionImage: "/images/blog/blog2-art.jpg",
    outcomeSections: [
      { 
        heading: "Documentary & Photojournalism", 
        text: "I walked by Raghu Rai’s Trees series. A collection of black-and-white photographs, the legendary photojournalist’s work focused on something quieter – trees as living memories of human existence. Alongside was Kanu Gandhi’s private atlas of Mahatma Gandhi. Over twelve years, armed with a Rolleiflex, he documented Gandhi’s daily life under strict conditions: no flash, no posed shots, and no requests for funding." 
      },
      { 
        heading: "Psychological Theatre & Reality", 
        text: "I stumbled upon Roger Ballen’s New Colour Works. Distorted, mask-like faces and claustrophobic interiors were intact, but in muted blues and sticky yellows. This was Ballen’s way of documenting reality as psychological theatre. Similarly, Dinabandhu Das’s The Looking Glass (Arshinagar) used in-camera masks to remove any trace of human presence from architectural documentation of old Calcutta houses." 
      },
      { 
        heading: "Behind the Marquee & The Double", 
        text: "Ketaki Sheth’s Behind the Marquee offered a portal to old Bollywood—the messy, human, behind-the-scenes reality of film sets. Finally, Zaam Arif’s The Double featured two oil paintings where protagonists were 'charged with a deep interiority,' grappling with estrangement as they questioned the meaning of life, informed by Camus, Tarkovsky, and Satyajit Ray." 
      }
    ]
  },
  {
    id: 3,
    slug: "how-to-use-color-psychology-in-restaurant-interiors",
    category: "Interior Design",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg3,
    main: BlogImg3,
    title: "How to Use Color Psychology in Restaurant Interiors",
    subtitle: "Vol. 03 — Design Series",
    description: "In Cordkraft Design Studio’s LAAD-5, colour doesn’t just decorate, it orchestrates. For designers and architects, it’s a powerful tool shaping emotion and guiding appetite.",
    midSectionTitle: "Why Colour Matters in Dining Spaces",
    paragraph: [
      "The scent of freshly baked bread wafts through the air, warm and familiar, like a quiet invitation. Behind the glass counter, desserts glisten under soft light. Pastries glazed to perfection, tarts that promise a delicate crumble. But what truly pulls you in isn’t on the plate. You realise it’s the space.",
      "Colour has the power to shape mood, appetite, and even the way a dish is perceived. When we speak of colour psychology in restaurant interiors, we’re composing an emotional journey before the first bite. The benefits unfold deliberately in the background, letting you dictate ambiance through color.",
      "Burnt ochre and terracotta are energy-evoking hues, inviting spirited chatter and connection. Soft greens and muted teals usher in rest. Vibrant reds and glowing oranges awaken the senses, favourable in eateries wanting energy and quick turnover, while blues and deep greens calm the pace, coaxing a slower rhythm to dining."
    ],
    midSectionImage: "/images/blog/blog3-restaurant.jpg",
    outcomeSections: [
      { 
        heading: "Appetite Stimulators vs. Suppressors", 
        text: "Warm tones like Reds, Oranges, and Yellows are strong stimulants; red evokes energy and excitement, while orange creates comfort. Mild stimulants like Greens and Turquoises evoke freshness and wellness, perfect for health-driven menus. Conversely, Appetite Suppressants like Blues and Purples reduce hunger but evoke sophistication and luxury in fine-dining or waterfront settings." 
      },
      { 
        heading: "Choosing a Scheme Aligned with Goals", 
        text: "Define your intention: Is it a buzz of conversation or candlelight? Fast-casual eats lean toward warm, lively colours, while fine-dining favors muted blues and sage greens. It is vital to test colours under real lighting: warm bulbs enhance reds and golds, while cool LEDs can flatten soft tones. Implement gradually, starting with high-impact areas like the entrance or bar." 
      },
      { 
        heading: "Color in Supporting Elements", 
        text: "The walls set the stage, but details like furniture and fabrics hold the performance. A modern wine bar might opt for deep emerald velvet, while a bistro chooses honey-toned oak. Matte weaves soften bold tones, while leather amplifies them. Tabletops also carry weight—raw marble veined with grey anchors a neutral palette, while reclaimed wood introduces organic grounding color." 
      }
    ]
  },
  {
    id: 4,
    slug: "nrai-design-pov-the-hunger-games-panel",
    category: "Hospitality & Business",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg4,
    main: BlogImg4,
    title: "National Restaurant Association of India (NRAI)",
    subtitle: "Vol. 04 — Industry Insights",
    description: "Design POV’ 25 was thrilled to be supported by National Restaurant Association of India (NRAI), bringing with it over four decades of advocacy for India’s vibrant food service sector.",
    midSectionTitle: "The Hunger Games: Future of Dining Panel",
    paragraph: [
      "Representing over 500,000 restaurants and a ₹5.69 lakh crore industry, NRAI has long been the voice of restaurateurs, chains, or independents. Founded in 1982 by leaders from iconic establishments like Nirula’s, Volga, and Khyber, NRAI has grown into a trusted body with pan-India presence and a deep understanding of both tradition and innovation.",
      "The Hunger Games panel brought together India’s top restaurateurs and hospitality innovators for a thought-provoking discussion on the future of dining. Moderated by Anurag Katriar (AK), founder of Indigo Hospitality, the session set the tone for a candid conversation around experience, design, delivery, and the shifting expectations of Indian diners.",
      "“India is a culinary powerhouse,” AK noted, adding that it’s time to channel that potential into thoughtful, future-forward dining experiences. Karan Kapur of K Hospitality Corp challenged the idea that delivery is overtaking dine-in, asserting that dine-in remains the core brand experience."
    ],
    midSectionImage: "/images/blog/blog4-nrai.jpg",
    outcomeSections: [
      { 
        heading: "Theatre vs. Netflix", 
        text: "Yash Bhanage of Bombay Canteen drew a sharp parallel: “Cloud kitchens are like Netflix, but restaurants are the theatre.” He explained that food served at home is about convenience, but the goal of a restaurateur should be to create an in-person experience strong enough to make customers leave their homes, accepting that the product won’t travel at 100%." 
      },
      { 
        heading: "Design as Communication", 
        text: "For Pawan Shahri of Chrome Asia, design is fundamental: “The eye is pleased before the mouth.” He emphasized visual storytelling and Instagram presence, noting that if a product isn't camera-friendly, marketing costs skyrocket. Pranav Rangta added that design signals hygiene: “Customers associate clean design with clean kitchens.”" 
      },
      { 
        heading: "Hospitality and Memory", 
        text: "The panel argued for a balance in automation. Yash shared how his team used subtle cues, like fidget spinners in chairs to detect guest boredom, prompting staff to respond with live magic tricks. As AK summed it up: “What we’re selling is hospitality. What people consume is experience. And what they take back is memory.”" 
      }
    ]
  },
  {
    id: 5,
    slug: "bombay-founders-club-design-pov-entrepreneurship",
    category: "Entrepreneurship & VC",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg5,
    main: BlogImg5,
    title: "Bombay Founders Club",
    subtitle: "Vol. 05 — Founder Ecosystems",
    description: "Born from an intimate conversation between six founders, BFC has quickly grown into one of India’s most trusted ecosystems for early-stage entrepreneurs.",
    midSectionTitle: "BFC: Real Talk, Sharp Insight, and Building",
    paragraph: [
      "We were thrilled to have Bombay Founders’ Club (BFC) to Design POV 2025 as a Supporting Association. With a collective of over 200 founders and counting, their gatherings are driven not by pitches or performance, but by vulnerability, trust, and shared ambition.",
      "At Design POV 2025, the energy shifted gears when BFC founder Devarsh Sarath pushed back against the need for dividing founders by categories like D2C, B2B, or tech. “As founders, we’re solving problems. That’s our identity, not the current vertical we operate in,” he said, setting the tone for a conversation rooted in versatility and curiosity.",
      "The keynote by Gopal Modi revealed a powerful new initiative: a venture fund focused on the built environment, backed by India’s top architects and developers. “Architects influence so much of brand building but rarely participate in the wealth creation journey. This fund aims to change that,” he shared."
    ],
    midSectionImage: "/images/blog/blog5-bfc.jpg",
    outcomeSections: [
      { 
        heading: "Insight-Driven Capital", 
        text: "Gopal emphasized a bottom-up approach: “We leverage industry intel, not just capital. We know which brands have product-market fit because the architects and developers are already using them.” The fund is deeply invested in long-term value and disruption through sustainability, design, and innovation." 
      },
      { 
        heading: "People and Culture Strategy", 
        text: "Diving into people strategy, Gopal offered practical advice: “Don’t just interview, take them out to dinner. Get to know the person deeply.” Especially in Gen Z-dominated teams, he stressed that rewarding people, respecting their time, and making work fun are non-negotiable for emotional connection." 
      },
      { 
        heading: "VC Mechanics: Burn vs. Profitability", 
        text: "On the mechanics of venture capital, Gopal’s advice was direct: “Burn is okay if your unit economics work. Don’t lose money on every product sold; use capital to grow, not to survive.” He noted that while tech moats are shrinking, in physical businesses, distribution and design differentiation matter more than ever." 
      }
    ]
  },
  {
    id: 6,
    slug: "credai-mchi-design-pov-urban-development",
    category: "Real Estate & Urbanism",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg6,
    main: BlogImg6,
    title: "CREDAI-MCHI",
    subtitle: "Vol. 06 — Urban Future",
    description: "Design POV was thrilled to be supported by CREDAI-MCHI, the apex body representing private sector developers across the Mumbai Metropolitan Region (MMR).",
    midSectionTitle: "Redefining Luxury and Livability",
    paragraph: [
      "With over 2,000 member developers and a presence across key urban regions, CREDAI-MCHI plays a vital role in structuring the city’s built environment, making real estate more transparent, organized, and future-ready. Through its consistent engagement with state and local governments, it has become a credible voice in the national conversation around housing and urban development.",
      "The opening panel at Design POV, supported by CREDAI-MCHI, brought together sharp minds to unpack luxury in today’s urban context. Honourable Mr. Vijay Wadhwa, Chairman of The Wadhwa Group, reflected on how design must evoke personal innovation: “A person who’s wanting to make something innovative… experiences it, it gives him some idea that this is how I can do for myself.”",
      "Our Guest of Honour, Birla Opus Paints CEO Rakshit Hargave emphasized co-creation with designers: “We are here to learn from experts,” he said, noting the importance of translating creative ideas into tangible innovations."
    ],
    midSectionImage: "/images/blog/blog6-credai.jpg",
    outcomeSections: [
      { 
        heading: "The Restraint of FSI", 
        text: "The discussion delved into the use of FSI (Floor Space Index). “You cannot take FSI to your grave,” quipped Karl Wadia. Good planning, natural light, ventilation, and access to greenery were universally acknowledged as the key drivers of livability over mere square footage." 
      },
      { 
        heading: "Heritage & Happiness Index", 
        text: "Heritage preservation took center stage, with panelists stressing the importance of blending modern functionality with historical aesthetics in redevelopment. The conversation also shifted to the evolving landscape in Thane, describing luxury as enhancing the “happiness index” through natural surroundings and optimal conditions." 
      },
      { 
        heading: "Luxury vs. Size", 
        text: "Karl brought an essential caution: luxury should not be confused with size. “Often luxury is mistaken with size… In the aspiration to buy bigger, customers end up working for the bank.” This session urged developers and designers to rethink how cities can be built more beautifully and sustainably." 
      }
    ]
  },
  {
    id: 7,
    slug: "echoes-of-tomorrow-theme-2025-design-pov",
    category: "Design Philosophy",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg7,
    main: BlogImg7,
    title: "Echoes of Tomorrow- Theme 2025",
    subtitle: "Vol. 07 — Thematic Anchor",
    description: "Design POV is a collective mediation on design, culture, and creativity. For 2025, the theme is Echoes of Tomorrow, a poetic paradox that invites India’s top 19 firms to step into the future, guided by the past.",
    midSectionTitle: "A Catalyst for Parallel Perspectives",
    paragraph: [
      "Design POV has always believed that the strongest ideas often emerge when creators are unified, not confined, by a prompt. A theme at the event isn’t a rulebook but a conversation starter. Each year, a single conceptual anchor will become a catalyst to create a common language, allowing vastly different practices and perspectives to express themselves in parallel.",
      "Design doesn’t emerge in a vacuum. It’s shaped as much by memory, lineage, and cultural inheritance as by intent, imagination, and instinct. Echoes of Tomorrow was born from the understanding that the future we dream of is always, in some quiet way, touched by what came before.",
      "“This year’s concept invites architects, designers, and creative thinkers to embark on an exploratory journey to envision spaces, products, and experiences that reflect an imagined tomorrow while remaining deeply connected to the cultural heritage and practices of the past,” says Team Design POV."
    ],
    midSectionImage: "/images/blog/blog7-theme.jpg",
    outcomeSections: [
      { 
        heading: "Memory as Material", 
        text: "For Ameet Mirpuri, memories of his father commissioning tortoise shell jewelry boxes with intricate bone fretwork became the literal foundation for an entertainment room. Generational craftsmanship is woven into the future-facing function of the space. Similarly, Hiren Patel Architects honored the brass oil lamp as a central motif—a source of warmth birthing light." 
      },
      { 
        heading: "Blurring Boundaries", 
        text: "The BNK Group reimagined space as something fluid and multifaceted. Their design, 'Blurring Boundaries,' is a monolithic landscape where a calm coworking haven by day evolves into an energetic lounge by night. The spirit of the past is embedded in how we gather and commune, allowing spaces to shift without losing their soul." 
      },
      { 
        heading: "The Radical Edge", 
        text: "Purple Backyard approached the theme as a 'Mad Hatter’s party reimagined,' where the future is a paradoxical dreamscape. A playful rebellion against predictability, their work represents a surrealist dance between the minimal and the maximal, viewing the future as a space that is unafraid to misbehave and break from constraints." 
      }
    ]
  },
  {
    id: 8,
    slug: "5-ways-architects-and-designers-benefit-from-design-pov-2025",
    category: "Professional Development",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg8,
    main: BlogImg8,
    title: "5 Ways Architects and Designers Can Benefit from Attending Design POV 2025",
    subtitle: "Vol. 08 — Career Series",
    description: "As the world of design expands, staying in step with ideas shaping tomorrow is essential. Design POV 2025 offers a curated, immersive experience for architecture and interior professionals.",
    midSectionTitle: "Networking, Learning, and Contextual Design",
    paragraph: [
      "Hosted in Mumbai, India’s creative capital, this is more than an event. It’s a meeting of minds, a celebration of material, and a redefinition of what it means to design for now—and what’s next. Whether you’re part of a legacy firm or carving out your own aesthetic language, the benefits of attending should be on your calendar.",
      "At Design POV 2025, expect a line-up that goes deeper than surface-level trends. From design exhibitions that showcase the evolution of materials to keynote panels dissecting architectural responsibility in the Indian context, the sessions are designed to engage, question, and inspire. This isn’t about what’s ‘on-trend.’ It’s about what’s timeless, timely, and transformative.",
      "Networking for designers in 2025 isn’t about visibility—it’s about meaningful alignment. Speed-networking booths, mentorship pairings, and industry mixers are built into the program so attendees leave with not just names—but relationships. This is networking redefined—not transactional, but transformational."
    ],
    midSectionImage: "/images/blog/blog8-benefits.jpg",
    outcomeSections: [
      { 
        heading: "Interior Design Expos & Materiality", 
        text: "Design POV 2025 offers a rare convergence of international perspectives with Indian craft. For interior professionals, it’s a masterclass in materiality—exploring experimental textiles, homegrown sustainable surfaces, and the revival of vernacular forms. From bamboo modularity to reclaimed stone, the pavilions shine a light on conscious building." 
      },
      { 
        heading: "Global Ideas vs. Indian Context", 
        text: "The event captures a spectrum of global design influences—from Scandinavian restraint to South American vibrancy—weaving them into Indian narratives. Workshops on cross-border design thinking help participants understand not just ‘what works globally,’ but ‘what translates meaningfully locally,’ ensuring work is both informed and intentional." 
      },
      { 
        heading: "Firm Highlights: Pooja Bihani & Sanjyt Syngh", 
        text: "Pooja Bihani (Spaces and Design) presents a sensory capsule honoring Jamdani, Bengal’s ethereal handwoven textile, for the traveler of tomorrow. Sanjyt Syngh introduces 'Studio S5', where luxury meets rebellion, drawing on the energy of Studio 54 and the sophistication of Halston’s red office to create a visionary design of tomorrow." 
      }
    ]
  },
  {
    id: 9,
    slug: "house-of-grace-vintage-haven-contemporary-elegance",
    category: "Residential Interiors",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: true,
    thumbnail: BlogImg9,
    main: BlogImg9,
    title: "House of Grace: A Vintage Haven with Contemporary Elegance",
    subtitle: "Vol. 09 — Residential Series",
    description: "Designed by Azure Interiors, this 5,000 sq. ft. home in Raipur blends vintage charm with modern comforts within a palette of inky black and white hues.",
    midSectionTitle: "A Timeless Design Philosophy",
    paragraph: [
      "A home often serves as a designer’s canvas—a space where creativity knows no bounds and design rules are reimagined. Such is the story of House of Grace, a soulful yet regal residence in Raipur, Chhattisgarh. Designed by Azure Interiors, led by Rashi Bothra and Ruchi Gehani, this home blends vintage charm with modern comforts, all within a palette of inky black and white hues.",
      "True to its name, House of Grace exudes elegance and sophistication. The home’s open-concept floor plan fosters a seamless connection between spaces, with the architecture serving as a silent enabler of fluidity and warmth. Each corner reflects meticulous attention to detail, crafting an environment where classic English aesthetics meet contemporary design elements.",
      "“We have tempered the home’s classical grandeur with energetic bursts of eye-catching shapes, clean lines, and subtle nuances of English architecture,” share Rashi and Ruchi. These thoughtful touches extend to the hallways, which lead to a unique feature—a Gurdwara infused with Lippan art, embodying spiritual depth."
    ],
    midSectionImage: "/images/blog/blog9-house-of-grace.jpg",
    outcomeSections: [
      { 
        heading: "Classic Meets Contemporary", 
        text: "Step through grand double doors into a spacious foyer featuring a cathedral art piece above a geometric console. The formal living room is a sophisticated retreat defined by its monochromatic palette, plush seating, and a sculptural fireplace. The dining area maintains this cohesive theme, while the kitchen adds a contemporary edge with a pristine white island and soft mint-green cabinetry." 
      },
      { 
        heading: "A Testament to Artisanship", 
        text: "House of Grace celebrates the artistry that elevates design. The master suite features custom-made furniture and vintage pieces that exude bespoke luxury. The accompanying en-suite walk-in closet is a standout, featuring patterned flooring, lacquered cabinetry, and a grand central island reminiscent of Victorian-era sophistication." 
      },
      { 
        heading: "Sustainability Meets Luxury", 
        text: "The residence integrates sustainable practices to minimize its ecological footprint. Large windows usher in natural light, while low-VOC paints and energy-efficient appliances underscore a commitment to the environment. Smart home systems further enhance sustainability, ensuring the residence harmonizes luxury with responsibility." 
      }
    ]
  },
  {
    id: 10,
    slug: "bakers-arch-cafe-laurie-baker-legacy-tropical-twist",
    category: "Hospitality Architecture",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg10,
    main: BlogImg10,
    title: "Baker’s Arch Cafe: A Laurie Baker Legacy with a Tropical Twist",
    subtitle: "Vol. 10 — Heritage Series",
    description: "Nestled in Thiruvananthapuram, Baker’s Arch Cafe seamlessly blends Laurie Baker’s architectural ethos with a lush, tropical aesthetic.",
    midSectionTitle: "A Storied Past & Sensitive Interventions",
    paragraph: [
      "Originally built in the early 1980s by Laurie Baker as a private residence, the building passed through the hands of actor Captain Raju and the Muthoot Pappachan Group. For 12 years, it served as the studio for architect Vinod Mathews of Kriya. When tasked to convert it into a café, Vinod’s vision was clear: preserve the building’s legacy while transforming it into a contemporary garden space.",
      "The three-level structure embodies Baker’s philosophy of harmonizing architecture with the landscape. The dramatic entrance leads visitors down a cobblestone pathway to an exposed feature wall and an iconic arch. Inside, rooms are repurposed into a co-working area, a lounge, and versatile dining rooms, while the basement houses a state-of-the-art kitchen.",
      "Mathews made minimal yet thoughtful interventions. While some walls were removed to accommodate modern facilities, iconic features like the roof, flooring, and windows were conserved in their original form. The Lotus Hall retains its three grand brick arches, forming a lotus-like frame that defines the primary dining area."
    ],
    midSectionImage: "/images/blog/blog10-bakers-arch.jpg",
    outcomeSections: [
      { 
        heading: "A Tropical Escape", 
        text: "The highlight lies in the outdoors. Statement brick walls—a hallmark of Baker’s style—are strategically placed near the waterbody and entrance. The coffee bar counters feature brass plates with cutout patterns mimicking Baker’s signature brickwork, creating an inviting garden-like space that respects the original essence." 
      },
      { 
        heading: "Design and Aesthetic", 
        text: "The colour palette blends black, grey, and brick red. Outdoors, grey limestone flooring complements the red brick walls, while lush greenery like plumeria and bamboo adds tropical flair. A bamboo-designed false ceiling, protected by glass, mitigates the Kerala rains and summer heat while maintaining an organic feel." 
      },
      { 
        heading: "Bridges Across Eras", 
        text: "Baker’s Arch Cafe is a testament to preservation. By blending Laurie Baker’s philosophy with a contemporary vibe, the space invites guests to experience history and modernity simultaneously. Repurposed furniture was unified with a black finish, enhanced by statement lighting to soak in the architectural brilliance." 
      }
    ]
  },
 {
    id: 11,
    slug: "ancestral-gujarat-home-doro-traditional-minimalism",
    category: "Heritage Restoration",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg11,
    main: BlogImg11,
    title: "This ancestral Gujarat home by Doro is a lesson in traditional yet elegant minimalism",
    subtitle: "Vol. 11 — Thematic Series",
    description: "When Naomy Parikh and Niyati Shah of Doro were tasked with restoring a 120-year-old home in Gujarat, their first thought was to preserve its essence.",
    midSectionTitle: "Apdu Gaam Nu Ghar: Our Native Home",
    paragraph: [
      "As the summer rolls in and schools take a break, parents worry about taking their children on vacation for a quaint getaway from the hassle of life. However, some families choose to return to their roots in the villages where generations of the lineage come from. These homes, usually tall, smell of the family’s history, heritage, culture, and sweet memories.",
      "The home has belonged to the family for over 120 years, and is dubbed as ‘apdu gaam nu ghar’ or ‘Our home in our native village’. While the architect duo had to revive the 1,300 sq ft nostalgic quaint haven, its 150-year-old weakening wooden structure summoned a reconstruction completely.",
      "The heirloom was reconstructed to adopt modern-functional clues with strategic emptiness. Departure from the previous form allowed for larger volumes, accommodating temporal yet crucial social norms while mediating the balance between the old and the new. The yellow quaint home, while empty, has a certain charm to it."
    ],
    midSectionImage: "/images/blog/blog11-doro-gujarat.jpg",
    outcomeSections: [
      { 
        heading: "A Tale of Two Narratives", 
        text: "“The village tells a tale of two narratives: one where individuals preserve their heritage by transforming their inherited homes into cherished retreats, and the other where homes are abandoned, succumbing to the passage of time,” Niyati and Naomy shared. Their response was to embrace the former, ensuring the lineage continues in a space that adapts without losing its soul." 
      },
      { 
        heading: "Traditional Elegance", 
        text: "The design language focuses on larger volumes and strategic emptiness, moving away from chaotic adaptations to evolving lifestyles. By preserving the emotional essence of the 150-year-old structure while rebuilding for modern functionality, the project serves as a bridge for the family to reconnect with their village roots." 
      }
    ]
  },
 {
    id: 12,
    slug: "villa-palladio-jaipur-barbara-miolini-marie-anne-oudejans",
    category: "Boutique Hospitality",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg12,
    main: BlogImg12,
    title: "Barbara Miolini, Marie Anna Oudejans, and Rajasthani painter Vikas Soni reunite to curate Jaipur Palladio",
    subtitle: "Vol. 12 — Architectural Series",
    description: "Barbara Miolini, Marie Anna Oudejans, and Rajasthani painter Vikas Soni gather to curate an exquisite experience for patrons of the Pink City in the folds of the Aravalli hills.",
    midSectionTitle: "A Contemporary Interpretation of a Desert Caravanserai",
    paragraph: [
      "The triad convenes after curating the Bar Palladio, a restaurant that boasts the sky’s hues to bring character to the Narain Niwas Palace. The trio convenes to design a small palace, possibly a former hunting lodge for a royal family, with a bright white facade, nestled amongst almond and neem trees, waiting to be crafted to its potential. Miolini and Oudejan first discovered this buried marvel, that occasionally lodges lazy leopards under the chhatri domes, and came to love it because of its large empty rooms and percolated jali screens.",
      "“It was in remarkably good state. We loved the simplicity, it felt like a villa in the Italian countryside somehow,” shares Oudejans. The starting vision comes from the idea of blending the exuberance of the maharajas with a hint of the Italian flair. Oudejans explains, “The countryside has given me countless moments of visual inspiration. The women in the fields, scarlet, yellow, aquamarine figures, the Rajput princesses celebrating in their finery, their veils…”",
      "The rural influences from her travels across Rajasthan were poured into her vision of the place – a vibrant, magnificent shade of red. “Red, is the great clarifier: bright, cleansing, and revealing. It makes all colours beautiful,” share the duo, that reassures the choice of their colour palette. The red was actually inspired by cardinals’ robes and our memories of Rome."
    ],
    midSectionImage: "/images/blog/blog12-villa-palladio.jpg",
    outcomeSections: [
      { 
        heading: "Pattern, Colour, and Mood", 
        text: "The Villa Palladio is a playful experience, as red, white, and black marble smears across the space. The tall ceilings of the central hall and salon are bejewelled with vivacious artificial crests of roosters and bears. A canopy of palm trees snakes up the walls with maroon fronds creeping around them, while red-striped corridors kindle with black and red sconces that add a certain surrealness." 
      },
      { 
        heading: "Childlike Fantasy & Intimacy", 
        text: "“We wanted there to be a strong element of privacy and peace,” shares Miolini. Ramparts enclose the space to make it feel more intimate—a secret garden meant to evoke a sense of childlike fantasy. The magical air spreads even beyond a tall hedge to a chevron-striped pool house, a nod to European formal gardens with their garden follies." 
      },
      { 
        heading: "Design Details", 
        text: "The boutique-hotel features nine bedrooms. A twin room holds a pagoda-shaped bed against red treillage and palm trees, while another chamber holds a scalloped four-poster bed bound by tinted glass arches. A vaulted kitchen, suggestive of an English country house, was created by the accomplished ceramicist Simon Marks, completing the vision of red in the Pink City." 
      }
    ]
  },
  {
    id: 13,
    slug: "house-on-the-edge-hyderabad-quirk-studio-eclectic-art",
    category: "Residential Architecture",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg13,
    main: BlogImg13,
    title: "The House on the Edge in Hyderabad by Quirk Studio is a lesson in eclectic art contrasting subtle hues",
    subtitle: "Vol. 13 — Art & Space Series",
    description: "Your home should embody you; comfort should come from familiarity. Quirk Studio constructed the ‘House on the Edge’ for a couple who love art, cocktails, and gourmet food.",
    midSectionTitle: "A Blank Canvas for Passionate Curation",
    paragraph: [
      "The Hyderabad haven is as authentic a representation of the couple’s passions as it could be, with its magnificent 5,000 sq ft built leaning on the edge of a cliff in the Jubilee Hills. Principal Architect Disha Bhavsar describes the duplex: “While beginning with a blank canvas can be daunting, the couple’s clear directive guided the design. Prioritising their passion for vibrant art and quirky furniture, the residence veered towards a backdrop that embraced a raw, unfinished aesthetic.”",
      "The architects use the rare neutral backdrop to blend vintage and modern furniture pieces, often bringing a pop of colour and art to the plain shell. The Kota stone flooring and lime-finished plaster walls layer in some texture. The ground floor transforms into the perfect place to host, while the first floor envisions a private sanctuary. Light spills through tall, 20-foot-high windows, accenting the volume and pliancy of the pocket.",
      "The grey monotone here is accentuated by a ribbed oakwood high ceiling and a fragile wicker division that splits the living and foyer. The room’s curved sofas with soft corners, potted greens, eccentric accents, and striking art especially add a point of contrast across the home. This Hyderabad sanctuary pays homage to gourmet delights, memoirs from travels, and, most of all – art."
    ],
    midSectionImage: "/images/blog/blog13-house-edge.jpg",
    outcomeSections: [
      { 
        heading: "Curated Accents & Bold Contrasts", 
        text: "The soft couches from Moroso make an ideal spot for movie marathons, while rust-coloured swivel chairs pop in the moody palette. A coiled Channapatna light, curated by Ashiesh Shah, overlooks the dining area. Contrasting the moody design board, the bar is a strike of boldness—an orange counter that counterposes the monochrome backdrop. Nearby, a library with floor-to-ceiling bookshelves holds a spectrum of books and playfulness." 
      },
      { 
        heading: "A Private Sanctuary Upstairs", 
        text: "As you climb upstairs, the levels of familiarity and presence increase. The master bedroom hosts two walk-in closets, a small pantry, and a den. Soft lines and muted shades maintain the theme of the master suite, while sensual furniture and textured walls bring personalisation. A calming palette of a dusty rose wall, green tufted bed, and black wall sconces reflect the couple’s idea of a haven." 
      }
    ]
  },
  {
    id: 14,
    slug: "studio-camarada-1522-the-pub-kamanahalli-peaky-blinders",
    category: "Hospitality Design",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg14,
    main: BlogImg14,
    title: "Studio Camarada brings the set of Peaky Blinders to 1522 The Pub Kamanahalli",
    subtitle: "Vol. 14 — Thematic Interiors",
    description: "At 1522 The Pub Kamanahalli, designed by Studio Camarada, you walk into an ambiance straight out of Peaky Blinders—a post-industrial British-Irish haven.",
    midSectionTitle: "A Post-Industrial British-Irish Transformation",
    paragraph: [
      "“Our brief was to make it a British-Irish pub with a Peaky Blinders feel. We worked on adapting the idea – a more post-industrial theme,” revealed Andre Acacio Camara, the Project Lead at Studio Camarada. In the posh neighbourhood of Kamanahalli, a busy bank on the ground floor flowers into a thematic British pub on the first floor. Bespoke wallpapers, mirrors, and ornamental frames comprise the essence of the space.",
      "The architects were given an empty canvas of two 5,000 sq ft floors. Deciding the pub would be incomplete without a dedicated entrance, they introduced a brick facade common across all 1522 outlets. The external facade adorns cast-iron panels and semi-circular segmented fenestrations, while the indoors showcase Minton tiles, religious motifs, and grapevine imagery.",
      "Andre splits the floor plates open strategically, maintaining necessary beams while creating a double ceiling. As you push through the olive double doors, you find yourself between a grand embellished staircase and an imposing bar. Wood-framed, cane-backed furniture sits in the room, ornamentally placed to make comfortable lounging quarters."
    ],
    midSectionImage: "/images/blog/blog14-1522-pub.jpg",
    outcomeSections: [
      { 
        heading: "Intricate Detailing & Materials", 
        text: "The pub’s detailing combines teak wood and veneer with carvings and cornice in pinewood of red sal. Muted tropical wallpaper partners the wood, and brocade fabric frames the sheath of the bar. A beautiful black-and-white pattern staggers across the floor, matching stripes that scamper across muted olive-green pillars under a false ceiling made from mesh-plaster and brick cladding." 
      },
      { 
        heading: "Curation & Old-World Charm", 
        text: "Remnants of Blossoms bookstore and Bamboo Bazaar line the shelves with books and antiques. An elevated platform off the bar supports intimate family gatherings, lined with sculpted wooden frames from Goa depicting 70s and 80s pop culture. Tinted glass windows hint at an old-world charm, while ceiling vaults were hand-painted by Harry Louis of Bonda Soup Art." 
      },
      { 
        heading: "Quirky Construction", 
        text: "Construction took only five months, despite it being one of the ‘quirkiest projects’ for Andre and his team, including Shravya Shetty, Kannika Prakash, Bhoomika N, and Aditi Srivastava. The space uses AI-designed wallpaper customized to highlight the setting, with wooden arches responsible for dividing sections while breathing art into the space through detailed carvings." 
      }
    ]
  },
 {
    id: 15,
    slug: "splendour-living-maraal-studio-sewri-warehouse-transformation",
    category: "Workspace Design",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg15,
    main: BlogImg15,
    title: "Splendour Living transforms an abandoned warehouse into a creative workspace",
    subtitle: "Vol. 15 — Industrial Adaptive",
    description: "In the heart of Mumbai’s forgotten hamlet, Sewri, Splendour Living transforms an abandoned mill into 'Maraal'—a studio blending industrial spirit with contemporary art.",
    midSectionTitle: "Maraal: A Blank Canvas of Industrial History",
    paragraph: [
      "Similar to its location, Splendour Living’s new creative studio elucidates its journey from a strategic infantry fort in the 1800s to a functional industrial hub and finally, an abandoned mill. Sharan Parekh, the managing director, saw endless potential in the ruins: “We immediately fell in love with this part of Bombay that was once the city’s heart but now almost forgotten,” he shared.",
      "The flamingos that migrate to the region during winters inspired the name ‘Maraal’. Blending into its industrial backdrop, the warehouse preserves its commercial appeal while envisioning clean lines and contemporary design aesthetics. Steel girders, exposed beams, and decrepit floors embody the previous structure and unabashedly flaunt bespoke design installations.",
      "The 1,400 sq ft space splits into a workshop facility, an experimental kitchen, and a race shop. Cultivating Nyishi Parekh’s adoration for the culinary world, the kitchen hosts tasting menus, while the race shop savours Sharan’s inner motorsport engineer. A suspended wooden cabin, designed to host clients, peers over the entire area."
    ],
    midSectionImage: "/images/blog/blog15-splendour.jpg",
    outcomeSections: [
      { 
        heading: "Raw Architecture vs. Refined Elegance", 
        text: "“The play between the raw, rugged architecture and the refined elegance of the interiors created a compelling juxtaposition,” Nyishi told AD. High ceilings expose the layout to soft natural light, showcasing a spread of collector’s items that range from 20th-century solid wood Naga tables to Splendour’s own bold innovations like the Interference table." 
      },
      { 
        heading: "A Gallery of Design Heritage", 
        text: "The gallery space entertains an exclusive range of design pieces crafted by Thierry Betancourt, the Creative Director. Collector's items like a pair of large Huanghuali yoke back chairs contrast the studio's modern pieces. The indoors showcase a display of Minton tiles, religious motifs, and grapevine, where sky-blue blends into subtle sage green." 
      },
      { 
        heading: "Urban Adaptability", 
        text: "The old warehouse stands as a living testament to the power of design and the adaptability of urban spaces. Maraal brings forth Mumbai's industrial spirit and complements it with contemporary artistic expression. The external facade, adorning cast-iron panels and segmented fenestrations, maintains a visual tussle with the sophisticated interiors." 
      }
    ]
  },
  {
    id: 16,
    slug: "the-bombay-storey-s-british-architecture-mumbai",
    category: "Architectural History",
    author: "Aman Mishra",
    date: "2026-04-17",
    isFeatured: false,
    thumbnail: BlogImg16,
    main: BlogImg16,
    title: "The Bombay Storey-s: A carousel through the British architecture in Mumbai",
    subtitle: "Vol. 16 — Colonial Heritage",
    description: "In all my twenty-one years in Mumbai, I’ve lived in the ‘city of dreams’ hoping to hold my own. This is a journey through the architectural landmarks that recall the city’s cultural heritage.",
    midSectionTitle: "A Confluence of Interpretations",
    paragraph: [
      "I developed a fancy for Mumbai’s architectural landmarks quite effortlessly. While the British tried to mark India with colonial symbols, it’s ironic how their works faithfully weave a narrative of the stylistic revivals of the 18th and 19th centuries. Neoclassical, Victorian, neo-Greek, neo-Gothic, Indo-Saracenic and Art Deco styles assert themselves unabashedly across the city’s silhouette.",
      "The city was deemed the East India Company’s headquarters in 1708. Soon after, the Fort area conquered a monopoly over trading operations. The swamp didn’t appreciate construction beyond its boundaries, so architectural sites are built up and not out. Balconies in the area almost look like remodelled ship parts. The neoclassical influence starts with the Town Hall, home to the Asiatic Society, featuring ivory Doric columns and a triangular pediment.",
      "The next iconic building I explored was CSMT. Inspired by Gothic architecture, it is a feast for any enthusiast. The ornate crocodile gargoyles, a variety of engraved capitals, and a spellbinding interior staircase, all topped with an octagonal dome, contemplate a balance between Indian and Gothic influences. Medallion portrait sculptures are embedded into the rustic facade and granite columns."
    ],
    midSectionImage: "/images/blog/blog16-mumbai-heritage.jpg",
    outcomeSections: [
      { 
        heading: "A Victorian Gothic Affair", 
        text: "The Knesset Eliyahoo Synagogue’s beautiful blue reflects the sky in Kala Ghoda. Jacob Sassoon assembled a breathtaking wonder with Corinthian columns and triangular roofs. The external facade adorns cast-iron panels and semi-circular, segmented fenestrations, while the indoors showcase Minton tiles, religious motifs, and grapevine. Dutch roofs, Swiss timbering, and Tudor casements intermingle with traditional Indian design." 
      },
      { 
        heading: "An Indo-Saracenic Trademark", 
        text: "The Gateway of India exemplifies fusion architecture. Onion-shaped Mughal domes meet Romanesque arches as intricate floral and geometric motifs decorate the local yellow basalt walls. Colonnaded corridors and balustrades with ornamental railings enhance its grandeur, commemorating King George V and Queen Mary’s arrival at the Apollo Bunder." 
      },
      { 
        heading: "Conclusion: A Living Timeline", 
        text: "As the sun sets beyond the Mumbai skyline, I think about what it would be like to see the city go from swamps and marshes to a living timeline of architectural styles from across the world. While nothing can undo the marks of colonialism, one can still find traces breathing as if they belong here—a memory of the red in the Pink City, and the yellow basalt in the blue harbor." 
      }
    ]
  } 
];