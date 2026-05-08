import { StaticImageData } from "next/image";
import BlogImg1 from "@/public/temp/home/blogs/blog-16.jpg";
import BlogImg2 from "@/public/temp/home/blogs/blog-15.jpg";
import BlogImg3 from "@/public/temp/home/blogs/blog-14.jpg";
import BlogImg4 from "@/public/temp/home/blogs/blog-13.jpg";
import BlogImg5 from "@/public/temp/home/blogs/blog-12.webp";
import BlogImg6 from "@/public/temp/home/blogs/blog-11.jpg";
import BlogImg7 from "@/public/temp/home/blogs/blog-10.jpg";
import BlogImg8 from "@/public/temp/home/blogs/blog-9.jpg";
import BlogImg9 from "@/public/temp/home/blogs/blog-8.webp";
import BlogImg10 from "@/public/temp/home/blogs/blog-7.webp";
import BlogImg11 from "@/public/temp/home/blogs/blog-6.jpg";
import BlogImg12 from "@/public/temp/home/blogs/blog-5.jpg";
import BlogImg13 from "@/public/temp/home/blogs/blog-4.jpg";
import BlogImg14 from "@/public/temp/home/blogs/blog-3.jpg";
import BlogImg15 from "@/public/temp/home/blogs/blog-2.jpg";
import BlogImg16 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg17 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg18 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg19 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg20 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg21 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg22 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg23 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg24 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg25 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg26 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg27 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg28 from "@/public/temp/home/blogs/blog-1.jpg";
import BlogImg29 from "@/public/temp/home/blogs/blog-1.jpg";


export type ContentBlock =
  | {
    type: "text";
    title?: string; // New optional key for the title before the text
    value: string;
  }
  | { type: "image"; value: string | StaticImageData; caption?: string }
  | { type: "quote"; value: string };

export interface Blog {
  type: "blog";
  id: number;
  slug: string;
  category: string; // This MUST match the Nav Labels (Design, POV Blogs, etc.)
  categoryDisplay?: string; // Optional: The specific tag shown on the card
  author: string;
  date: string;
  isFeatured: boolean;
  image: StaticImageData; // Main Hero/Sticky Image
  thumbnail: StaticImageData; // Sidebar/Carousel Strip
  title: string;
  subtitle: string; // From Slides data
  description: string; // From Slides data
  featuredParagraphs: string[]; // For preview
  detailedContent: ContentBlock[]; // For inner pages
}

export type Ad = { type: "ad"; id: string; image: string; aspect: string; };
export type SidebarItem = Blog | Ad;

export const blogs: Blog[] = [
  {
  type: "blog",
  id: 1,
  slug: "the-bombay-storey-s-british-architecture-mumbai",
  category: "Design",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg1,
  thumbnail: BlogImg1,
  title: "The Bombay Storey-s: A carousel through the British architecture in Mumbai",
  subtitle: "A carousel through the British architecture in Mumbai",
  description: "First and foremost, let me establish that in all my twenty-one years of existence, I’ve resided in Mumbai.",
  featuredParagraphs: [
    "First and foremost, let me establish that in all my twenty-one years of existence, I’ve resided in Mumbai. I’ve lived in the ‘city of dreams’ hoping to hold my own and been consumed whole in the infamous local train crowds, which means yes, I’ve had to take Virar trains on multiple occasions and grabbed quite a few brunches at the fanciest cafes. And while I’m well-acquainted with the cobblestone alleys across the city, I always get into a situation where I rediscover a part that intrigues me. This time, it was just a coincidental picture I clicked in front of the CSMT railway station. As I strutted past the Queen Victoria terminal, I couldn’t help but gape at the intricate detailing. Even the darkening bricks couldn’t disguise the ornamental carvings on the station that have added to the Mumbai skyline for decades.",
    "I developed a fancy for Mumbai’s architectural landmarks quite effortlessly. They recall the city’s cultural heritage more than they contribute to its aesthetic. While the British tried to mark India with their colonial architectonic symbols, it’s ironic how their works faithfully weave a narrative of the stylistic revivals of various architectural styles throughout the 18th and a better part of the 19th century. Neoclassical, Victorian, neo-Greek, neo-Gothic, Indo-Saracenic and Art Deco styles assert themselves unabashedly across the city’s silhouette.",
  ],
  detailedContent: [
    {
      type: "text",
      value: "First and foremost, let me establish that in all my twenty-one years of existence, I’ve resided in Mumbai. I’ve lived in the ‘city of dreams’ hoping to hold my own and been consumed whole in the infamous local train crowds, which means yes, I’ve had to take Virar trains on multiple occasions and grabbed quite a few brunches at the fanciest cafes. And while I’m well-acquainted with the cobblestone alleys across the city, I always get into a situation where I rediscover a part that intrigues me. This time, it was just a coincidental picture I clicked in front of the CSMT railway station. As I strutted past the Queen Victoria terminal, I couldn’t help but gape at the intricate detailing. Even the darkening bricks couldn’t disguise the ornamental carvings on the station that have added to the Mumbai skyline for decades."
    },
    {
      type: "text",
      value: "I developed a fancy for Mumbai’s architectural landmarks quite effortlessly. They recall the city’s cultural heritage more than they contribute to its aesthetic. While the British tried to mark India with their colonial architectonic symbols, it’s ironic how their works faithfully weave a narrative of the stylistic revivals of various architectural styles throughout the 18th and a better part of the 19th century. Neoclassical, Victorian, neo-Greek, neo-Gothic, Indo-Saracenic and Art Deco styles assert themselves unabashedly across the city’s silhouette."
    },
    {
      type: "text",
      title: "A Confluence of Interpretations",
      value: "The mosaic of influences reminisces Bombay’s identity as the crown jewel in the colonial past. The city was deemed the East India Company’s headquarters in 1708. Soon after, the Fort area conquered a monopoly over the city’s trading operations, leveraging its location by the sea harbours for the seven islands. The swamp didn’t appreciate construction beyond its boundaries, so all architectural sites near the area are built up and not out. The city tried to conform to the Fort’s constricted boundaries, homes standing tall and deep, peering over the lanes to breathe as much as possible. Balconies in the area almost look like remodelled ship parts."
    },
    {
      type: "text",
      value: "However, soon, the city’s map started transforming. The first few buildings built were a Governor’s residence, The Town Hall, and a Mint at the start of the 19th century. This is where the neoclassical influence starts. In a thirst for some intellectual nourishment, I left to witness the passage of time in the past through architecture, starting with the Bombay Town Hall."
    },
    {
      type: "text",
      title: "A Classic Restoration",
      value: "My first stop was the Bombay Town Hall, home to the Asiatic Society of Mumbai, an association that has valued research and scholarship since 1804, and the State Central Library. The neoclassical influence on the building, located at the Horniman Circle in the core of the ‘Fort’ area of Mumbai, could be detectable by any dilettante or even a layperson. Its resemblance to the Pantheon in Rome, Italy, was a source of delight for me."
    },
    {
      type: "image",
      value: "/temp/magazine/1/blog-1-1.jpg",
      caption: "The neoclassical grandeur of Bombay Town Hall with its iconic Doric columns."
    },
    {
      type: "text",
      value: "Governed by ivory Doric columns and a triangular pediment, indigenous engraved wooden awnings boast their presence above the tall entry doors to aerate the building. The historical building was finished in 1833 and engineered by the acclaimed architect Colonel Thomas Cowper. It adorns columns shipped from England and accommodates artistic features that acclimatise it to the equatorial climate."
    },
    {
      type: "text",
      title: "A Goth Uprising",
      value: "The next iconic building I decided to explore was CSMT. As I determinedly marched around the Chhatrapati Shivaji Maharaj Terminus, renamed from Victoria Terminus, I slowly recognised why it still stands as one of Mumbai’s most prominent architectural landmarks."
    },
    {
      type: "image",
      value: "/temp/magazine/1/blog-1-2.jpg",
      caption: "The Gothic Revival splendour of Chhatrapati Shivaji Maharaj Terminus."
    },
    {
      type: "text",
      value: "Inspired by Gothic architecture, it is a feast for any architecture enthusiast like myself. The ornate crocodile gargoyles, a tremendous variety of engraved capitals, and a spellbinding interior staircase, all topped with an octagonal dome, contemplate a balance between Indian and Gothic influences. It’s almost as if the structure is awarding the city an unobstructed view of its animal figurines on spandrels. These medallion portrait sculptures are embedded into the rustic facade and granite columns. The arched windows and doors add the much-needed elegant dramatism to the combination of Gothic and Indian exteriors."
    },
    {
      type: "text",
      title: "A Victorian Gothic Affair",
      value: "As much as I adore Gothic architecture, witnessing a blend of two architectural techniques is still more interesting. And so, I moved to observe Victorian-Gothic architecture. European elements like flying buttresses, carvings, bold colours, stained glasses, and lancet windows reinvent themselves with Victorian architecture. Birthed during the mid-19th century, this form merged with Gothic architecture seamlessly. A better part of public buildings from the 1860s to the second half of the nineteenth century display this style."
    },
    {
      type: "text",
      value: "The Knesset Eliyahoo Synagogue’s beautiful blue reflects the sky as it towers in the art district of Kala Ghoda in Mumbai. Jacob Sassoon imagined a religious haven for the Baghdadi and Benne Israeli Jewish communities in Mumbai and assembled a breathtaking wonder with Corinthian columns and triangular roofs."
    },
    {
      type: "image",
      value: "/temp/magazine/1/blog-1-3.jpg",
      caption: "The sky-blue Victorian Gothic facade of the Knesset Eliyahoo Synagogue."
    },
    {
      type: "text",
      value: "The exteriors and interiors seem in a tussle to get the most attention, with the external facade adorning cast-iron panels and semi-circular, segmented fenestrations. At the same time, the indoors showcase a display of Minton tiles, religious motifs, and grapevine. The sky-blue blends into a subtle sage green and pale inside."
    },
    {
      type: "text",
      value: "Dutch roofs, Swiss timbering, German gables, Tudor casements, and Roman arches all intermingle with traditional Indian design to create Victorian Gothic architecture. The Fort campus of the University of Mumbai, Saint Xavier’s College, Bombay University, the Telegraph Office, and even the University of Mumbai Library resemble an archetype of this appealing artwork."
    },
    {
      type: "image",
      value: "/temp/magazine/1/blog-1-4.jpg",
      caption: "Historic Victorian Gothic architecture across Mumbai’s academic institutions."
    },
    {
      type: "text",
      title: "An Indo-Saracenic Trademark",
      value: "Mumbai is known for its sunsets by the sea. After a long day of discerning its architecture, I decided to watch the sunset near the crowded Gateway of India. As the historical monument stood before me, the sun setting behind it and the sea breeze ruining my hair, I couldn’t help but stare at its Indo-Saracenic features."
    },
    {
      type: "image",
      value: "/temp/magazine/1/blog-1-5.jpg",
      caption: "The Indo-Saracenic silhouette of the Gateway of India during sunset."
    },
    {
      type: "text",
      value: "The intriguing blend of traditional Indian, Islamic, and British architectural elements, with dashes of neoclassical and gothic styles, exemplifies my argument that fusion architecture triumphs all. The arch monument commemorates King George V and Queen Mary’s arrival at the Apollo Bunder in India. Onion-shaped Mughal domes meet Romanesque arches as intricate floral and geometric motifs decorate the local yellow basalt walls. Colonnaded corridors and balustrades with ornamental railings enhance its grandeur."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "As the sun sets beyond the Mumbai skyline, its pink and orange hues conquering the sky, I silently think about what it would be like to experience these forms of architecture transforming your city in front of you, how one must have observed the city go from swamps and marshes to a living timeline of architectural styles from across the world. And how one can still find traces of colonialism scattered across Mumbai, breathing as if they belong here."
    },
    {
      type: "text",
      value: "The hoi polloi seem unfazed by my profound thoughts, and I snap out of reverie when someone’s shoulder rams into mine. At the end of the day, while nothing can undo the marks of colonialism, I try to do the next best thing: appreciate whatever’s left of its architecture."
    }
  ]
},

  {
  type: "blog",
  id: 2,
  slug: "splendour-living-warehouse-creative-workspace",
  category: "Design",
  author: "Dyumni Pandit",
  date: "24 May 2021",
  isFeatured: false,
  image: BlogImg2,
  thumbnail: BlogImg2,
  title: "Splendour Living transforms an abandoned warehouse into a creative workspace",
  subtitle: "An abandoned warehouse reimagined into a contemporary creative studio",
  description: "As time passes and a city develops, its essence starts transforming.",
  featuredParagraphs: [
    "As time passes and a city develops, its essence starts transforming. In the heart of Mumbai stands a forgotten hamlet that used to hold the city’s spirit—Sewri. The place ripples with historical significance, its features narrating the story of its many lives.",
    "Similar to its location, Splendour Living’s new creative studio elucidates its journey to becoming the expressive workplace it is. From a strategic infantry fort in the 1800s to a functional industrial hub and finally, to an abandoned mill, the warehouse has experienced it all.",
    "Blending into its industrial backdrop, the warehouse preserves its commercial appeal while introducing clean lines, bespoke installations, and contemporary design aesthetics."
  ],
  detailedContent: [
    {
      type: "text",
      value: "As time passes and a city develops, its essence starts transforming. In the heart of Mumbai stands a forgotten hamlet that used to hold the city’s spirit—Sewri. The place ripples with historical significance, its features narrating the story of its many lives."
    },
    {
      type: "text",
      value: "Similar to its location, Splendour Living’s new creative studio elucidates its journey to becoming the expressive workplace it is. From a strategic infantry fort in the 1800s to a functional industrial hub and finally, to an abandoned mill, the warehouse has experienced it all. When Sharan Parekh, the managing director of Splendour Living, saw the abandoned building, he thought it had endless potential."
    },
    {
      type: "text",
      value: "“Splendour has always had its roots in the island city. We immediately fell in love with this part of Bombay that was once the city’s heart but now almost forgotten,” shared Parekh with AD."
    },
    {
      type: "image",
      value: "/temp/magazine/1/blog-2-1.jpg",
      caption: "Maraal studio preserves the industrial identity of the original warehouse while embracing contemporary design."
    },
    {
      type: "text",
      title: "An Industrial Canvas",
      value: "The flamingos that migrate to the region during winters inspired the founders to name their studio ‘Maraal’. Blending into its industrial backdrop, the warehouse preserves its commercial appeal. With dashes of the charm and character that period pieces carry, Maraal envisions clean lines and contemporary design aesthetics."
    },
    {
      type: "text",
      value: "Steel girders, exposed beams, and decrepit floors embody the previous structure and unabashedly flaunt bespoke design installations. The surfeit of space in the warehouse makes the perfect blank canvas."
    },
    {
      type: "text",
      title: "Spaces With Purpose",
      value: "Its 1400 sq ft space splits into a workshop and prototyping facility, an experimental kitchen, and a race shop. Cultivating Nyishi Parekh’s, the Director of Architecture and Hospitality, adoration for the culinary world, the space’s experimental kitchen hosts tasting menus and cooking events for fellow enthusiasts."
    },
    {
      type: "text",
      value: "On the other hand, the race shop savours Sharan’s inner car enthusiast and motorsport engineer, providing a designated area for car maintenance, preparation, and development. A suspended wooden cabin, designed to host clients, peers at the area."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/maraal-workshop-space.jpg",
      caption: "The multi-functional warehouse combines a race shop, workshop, and experimental kitchen under one roof."
    },
    {
      type: "text",
      value: "“The play between the raw, rugged architecture and the refined elegance of the interiors created a compelling juxtaposition,” Nyishi told AD."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/maraal-office-space.jpg",
      caption: "Open layouts and natural light redefine the industrial warehouse into a contemporary creative workspace."
    },
    {
      type: "text",
      title: "Curated Design Expression",
      value: "The gallery space entertains an exclusive range of design pieces crafted by Thierry Betancourt, the Creative Director at Splendour Living. Its bold innovation captures much-deserved attention. The area’s high ceilings expose it to soft natural light as the open layout showcases a spread of collector’s items."
    },
    {
      type: "text",
      value: "These span from a 20th-century solid wood Naga table to a pair of large Huanghuali yoke back chairs that contrast Splendour’s collection, like the Interference table."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "The old warehouse stands as a living testament to the power of design and the adaptability of urban spaces. True to its vision, Maraal brings forth the city’s industrial spirit and complements it beautifully with contemporary artistic expression."
    }
  ]
},

  {
  type: "blog",
  id: 3,
  slug: "studio-camarada-1522-the-pub-kamanahalli",
  category: "Design",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg3,
  thumbnail: BlogImg3,
  title: "Studio Camarada brings the set of Peaky Blinders to 1522 The Pub Kamanahalli",
  subtitle: "A British-Irish pub inspired by the cinematic world of Peaky Blinders",
  description: "When you walk into a watering hole, you expect to be greeted by strangers trying to speak over the blasting music, dim lights, and a bartender doing tricks at the counter.",
  featuredParagraphs: [
    "When you walk into a watering hole, you expect to be greeted by strangers trying to speak over the blasting music, dim lights, and a bartender doing tricks at the counter. Instead, at 1522 The Pub Kamanahalli, designed by Studio Camarada, you walk into an ambiance straight out of Peaky Blinders.",
    "A busy bank on the ground floor flowers into a thematic British pub on the first floor as you move up the staircase, revealing the pleasant surprise.",
    "Wooden arches, antique furniture, textured ceilings, and dramatic staircases transform the pub into a richly layered cinematic experience."
  ],
  detailedContent: [
    {
      type: "text",
      value: "When you walk into a watering hole, you expect to be greeted by strangers trying to speak over the blasting music, dim lights, and a bartender doing tricks at the counter. Instead, at 1522 The Pub Kamanahalli, designed by Studio Camarada, you walk into an ambiance straight out of Peaky Blinders."
    },
    {
      type: "text",
      value: "As you walk into the posh neighbourhood of Kamanahalli, also known as Kamanahattan, in Bengaluru, you anticipate the cosmopolitan setting that accommodates classy restaurants and state-of-the-art residential areas. And so, when you first enter the building that houses 1522 The Pub, you might feel confusion seep in."
    },
    {
      type: "text",
      value: "A busy bank on the ground floor flowers into a thematic British pub on the first floor as you move up the staircase, revealing the pleasant surprise. Bespoke wallpapers, mirrors, and ornamental frames comprise the essence of the space."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/1522-pub-main-interior.jpg",
      caption: "The British-inspired interiors recreate the cinematic atmosphere of a vintage Peaky Blinders setting."
    },
    {
      type: "text",
      value: "“Our brief was to make it a British-Irish pub with a Peaky Blinders feel. We worked on adapting the idea – a more post-industrial theme,” revealed Andre Acacio Camara, the Project Lead at Studio Camarada."
    },
    {
      type: "text",
      title: "An Industrial British Pub",
      value: "The architects of the space were given an empty canvas in the form of two 5,000 sq ft floors. Unanimously deciding that the pub would be incomplete without a dedicated entrance, apart from the common elevator and staircase, the architects consulted a Vasu consultant."
    },
    {
      type: "text",
      value: "The structural glazing that confined the space opened up to fabricate an outdoor seating area that has become a favourite. Instead, the architects introduced a brick facade that runs common across all 1522 outlets."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/1522-pub-brick-interior.jpg",
      caption: "Brick facades, arched ceilings, and warm lighting define the pub’s post-industrial atmosphere."
    },
    {
      type: "text",
      value: "“We didn’t want to rely solely on Bengaluru’s legendary good weather. To ensure that a guest is comfortable, we introduced a treated air cooling system. The landscaping, and being able to see the busy road from above gives the space an overall laid-back vibe,” revealed Andre to AD."
    },
    {
      type: "text",
      title: "Layers of Texture and Drama",
      value: "A beautiful, bold black-and-white pattern staggers across the floor in rows, matching stripes that scamper across the muted olive-green pillars. The false ceiling, made from mesh-plaster, flexi-ply, and brick cladding, is enclosed in textured paint and brings a much-needed dramatic flair to the space."
    },
    {
      type: "text",
      value: "Wood-framed, cane-backed furniture sits in the room, ornamentally placed to make comfortable lounging quarters. As you push through the olive double doors, sound isolating, if you may, you find yourself between an embellished staircase you can only describe as ‘grand’ and an imposing bar on one end."
    },
    {
      type: "text",
      value: "Andre splits the floor plates open strategically, maintaining the necessary beams while creating a double ceiling. “The staircase adds a dramatic touch here, and a bridge from where you can see both floors enhances the view,” shares Andre with AD."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/1522-pub-staircase.jpg",
      caption: "The grand staircase acts as a dramatic architectural centerpiece within the pub."
    },
    {
      type: "text",
      title: "Old-World Charm",
      value: "Blossoms, the famous bookstore, Bamboo Bazaar, and some stores on Coles Road leave their remnants within the watering hole as shelves line with books and antiques."
    },
    {
      type: "text",
      value: "The pub’s intricate detailing, which combines the feel and look of teak wood and veneer with carvings and cornice in pinewood of red sal, makes it an architectural inspiration. Muted tropical wallpaper partners the wood, and brocade fabric frames itself onto the sheath of the bar."
    },
    {
      type: "text",
      value: "A vestibule in front of the bar has one end leading patrons up the stairs to a general seating area. Just off the bar, an elevated platform is curated to support intimate family gatherings. Ornamentally sculpted wooden frames from Goa depicting 70s and 80s pop culture line the walls here, as a tinted glass window hints at an old-world charm."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/1522-pub-vintage-details.jpg",
      caption: "Vintage wooden frames and stained glass windows reinforce the pub’s nostalgic aesthetic."
    },
    {
      type: "text",
      title: "An Immersive Experience",
      value: "Wooden tables scatter across the open floor plan, making 1522 The Pub ideal for events with an AI-designed wallpaper customised to highlight the setting. Wooden arches are responsible for dividing various sections while breathing some art into the space with its carvings."
    },
    {
      type: "text",
      value: "As you move upwards, you are met with ceiling vaults that Harry Louis of Bonda Soup Art took the courtesy to hand-paint."
    },
    {
      type: "text",
      value: "Construction of the space took only about five months, despite it being one of the ‘quirkiest projects’ for Andre and his team. Shravya Shetty, Kannika Prakash, Bhoomika N, and Aditi Srivastava were vital team members for the project."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "A playful encounter of texture and theme, 1522 The Pub refreshes the area of Kamanahalli. Its wooden interiors play a pivotal role swerving from the stereotypical watering hole, making it an exquisite experience to visit."
    }
  ]
},

  {
  type: "blog",
  id: 4,
  slug: "house-on-the-edge-hyderabad-quirk-studio",
  category: "Design",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg4,
  thumbnail: BlogImg4,
  title: "The House on the Edge in Hyderabad by Quirk Studio is a lesson in eclectic art contrasting subtle hues",
  subtitle: "An eclectic Hyderabad home balancing art, texture, and muted tones",
  description: "Your home should embody you; comfort should come from the familiarity of your presence in the space more than its interior.",
  featuredParagraphs: [
    "Your home should embody you; comfort should come from the familiarity of your presence in the space more than its interior.",
    "And so, when a young couple quipped, describing their love for art, cocktails, and gourmet food, Quirk Studio decided to construct the ‘House on the Edge’.",
    "The Hyderabad haven is as authentic a representation of the couple’s passions as it could be, with its magnificent 5,000 sq ft built leaning on the edge of a cliff in the Jubilee Hills."
  ],
  detailedContent: [
    {
      type: "text",
      value: "Your home should embody you; comfort should come from the familiarity of your presence in the space more than its interior. And so, when a young couple quipped, describing their love for art, cocktails, and gourmet food, Quirk Studio decided to construct the ‘House on the Edge’."
    },
    {
      type: "text",
      value: "The Hyderabad haven is as authentic a representation of the couple’s passions as it could be, with its magnificent 5,000 sq ft built leaning on the edge of a cliff in the Jubilee Hills."
    },
    {
      type: "text",
      value: "Principal Architect Disha Bhavsar describes the duplex, “While beginning with a blank canvas can be daunting, the couple’s clear directive guided the design. Prioritising their passion for vibrant art and quirky furniture, the residence veered towards a backdrop that embraced a raw, unfinished aesthetic.”"
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/house-on-the-edge-living-room.jpg",
      caption: "The double-height living area combines eclectic art, modern furniture, and a raw unfinished aesthetic."
    },
    {
      type: "text",
      title: "A Neutral Canvas",
      value: "The architects use the rare neutral backdrop to blend vintage and modern furniture pieces, often bringing a pop of colour and art to the plain shell. The Kota stone flooring and lime-finished plaster walls layer in some texture."
    },
    {
      type: "text",
      value: "The duplex has a ground floor that transforms into the perfect place to host friends and family, while the first floor envisions a private sanctuary. The clients’ love for holding soirees is reflected in the open living, kitchen, dining, and bar areas."
    },
    {
      type: "text",
      value: "Light spills into the room through tall, 20-foot-high windows, accenting the volume and pliancy of the pocket."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/house-on-the-edge-bar.jpg",
      caption: "Bold colours and playful elements bring energy to the eclectic bar space."
    },
    {
      type: "text",
      title: "Eclectic Contrasts",
      value: "The grey monotone here is accentuated by a ribbed oakwood high ceiling and a fragile wicker division that splits the living and foyer. The room’s curved sofas with soft corners, potted greens, eccentric accents, and striking art especially add a point of contrast across the home."
    },
    {
      type: "text",
      value: "The soft couches from Moroso make an ideal spot for some late-night movie marathons, while the rust-coloured swivel chairs pop in the moody palette. A beautiful coiled Channapatna light, curated by Ashiesh Shah, overlooks the double-height dining area, held up by its green and yellow anchors."
    },
    {
      type: "text",
      value: "The pixel-coloured BD Barcelona side table complements the deep blue upholstered chairs with an iridescent metal frame. Contrasting the moody design board, the bar is a strike of boldness. The orange bar counterposes the monochrome backdrop."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/house-on-the-edge-bedroom.jpg",
      caption: "Muted textures and soft furnishings shape the calming atmosphere of the bedroom."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/house-on-the-edge-dining.jpg",
      caption: "The living and dining areas merge under dramatic double-height volumes and artistic lighting."
    },
    {
      type: "text",
      title: "Spaces of Familiarity",
      value: "As you move through the space, you notice a library with tall bookshelves, reaching the ceiling, filled with a spectrum of books. The careful choice of art and furniture here is a balance of playfulness and comfort."
    },
    {
      type: "text",
      value: "A desk, record player, rocking chair, and couch nearby help the room transform into a cosy seating for friends of the couple in the evenings."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/house-on-the-edge-library.jpg",
      caption: "Abstract art and carefully curated furniture bring warmth and personality to the living spaces."
    },
    {
      type: "text",
      title: "A Personal Sanctuary",
      value: "As you climb upstairs, you almost visibly feel the levels of familiarity and presence of the residents increase. The master bedroom, which hosts two walk-in closets, a small pantry, a guest bedroom, a utility area, and a den, all huddle together on the first floor."
    },
    {
      type: "text",
      value: "The soft lines and muted shades maintain the theme of the master suite as sensual furniture and textured walls bring personalisation. A calming palette of colours and textures, including a dusty rose wall, green tufted bed, and black wall sconces, reflect the couple’s idea of a haven."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "This Hyderabad sanctuary embodies a young couple’s passions and memories. It pays homage to gourmet delights, memoirs from their travels, and, most of all – art."
    }
  ]
},

  {
  type: "blog",
  id: 5,
  slug: "villa-palladio-jaipur-barbara-miolini-marie-anna-oudejans",
  category: "Design",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg5,
  thumbnail: BlogImg5,
  title: "Barbara Miolini, Marie Anna Oudejans, and Rajasthani painter Vikas Soni reunite to curate Jaipur Palladio",
  subtitle: "A whimsical red retreat nestled in the folds of the Aravalli hills",
  description: "Barbara Miolini, Marie Anna Oudejans, and Rajasthani painter Vikas Soni gather to curate an exquisite experience for patrons of the Pink City in the folds of the Aravalli hills.",
  featuredParagraphs: [
    "Barbara Miolini, Marie Anna Oudejans, and Rajasthani painter Vikas Soni gather to curate an exquisite experience for patrons of the Pink City in the folds of the Aravalli hills.",
    "The triad convenes after curating the Bar Palladio, a restaurant that boasts the sky’s hues to bring character to the Narain Niwas Palace.",
    "The trio convenes to design a small palace, possibly a former hunting lodge for a royal family, with a bright white facade, nestled amongst almond and neem trees."
  ],
  detailedContent: [
    {
      type: "text",
      value: "Barbara Miolini, Marie Anna Oudejans, and Rajasthani painter Vikas Soni gather to curate an exquisite experience for patrons of the Pink City in the folds of the Aravalli hills."
    },
    {
      type: "text",
      value: "The triad convenes after curating the Bar Palladio, a restaurant that boasts the sky’s hues to bring character to the Narain Niwas Palace. Enclosed within the lawns of the palace, where, more often than not, you can sight peacocks, the arbor might just be one of the most hypnotically beautiful restaurants in the world."
    },
    {
      type: "text",
      value: "Swiss Italian architect Barbara Miolini, a resident of Jaipur, turned her daydream into a site of admiring eyes. The cafe’s aesthetic creeps outside the palace gates to the tangerine and mint-coloured Caffe Palladio nearby."
    },
    {
      type: "text",
      value: "The trio convenes to design a small palace, possibly a former hunting lodge for a royal family, with a bright white facade, nestled amongst almond and neem trees, waiting to be crafted to its potential."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/villa-palladio-bedroom.jpg",
      caption: "Rich red hues and intricate detailing shape the whimsical interiors of Villa Palladio."
    },
    {
      type: "text",
      title: "A Hidden Palace",
      value: "Miolini and Oudejan first discovered this buried marvel, that occasionally lodges lazy leopards under the chhatri domes, and came to love it because of its large empty rooms and percolated jali screens."
    },
    {
      type: "text",
      value: "“It was in remarkably good state. We loved the simplicity, it felt like a villa in the Italian countryside somehow,” shares Oudejans."
    },
    {
      type: "text",
      value: "In addition to the pandemic, the duo had to jump through a lot of difficulties. The space was destined to experience being a part of the Palladio family. While Jaipur practically owns the rights to unearthed gems, the architects knew that the palazzetto was perfect for their boutique-hotel dream."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/villa-palladio-exterior.jpg",
      caption: "The striking white facade and red accents frame Villa Palladio amidst the Aravalli landscape."
    },
    {
      type: "text",
      title: "Inspired by Rajasthan",
      value: "As you drive to the location, a few miles from the city, the glimpses of haveli courtyards along the journey build anticipation for Villa Palladio. Miolini relishes the breath of fresh air that the place brings from the noisy Jaipur city."
    },
    {
      type: "text",
      value: "She comments on it, “The creation, despite the obvious stress of starting any project, has been such a pleasure. Each day I find myself again in the air, amid village living and a simple way of life.”"
    },
    {
      type: "text",
      value: "The starting vision of the contemporary interpretation of a desert caravanserai comes from the idea of blending the exuberance of the maharajas with a hint of Italian flair."
    },
    {
      type: "text",
      value: "Oudejans explains to AD, “The countryside has given me countless moments of visual inspiration. The women in the fields, scarlet, yellow, aquamarine figures, the Rajput princesses celebrating in their finery, their veils…”"
    },
    {
      type: "text",
      value: "The rural influences from her travels across Rajasthan were poured into her vision of the place – a vibrant, magnificent shade of red. “Red, is the great clarifier: bright, cleansing, and revealing. It makes all colours beautiful,” share the duo, reassuring the choice of their colour palette."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/villa-palladio-dining.jpg",
      caption: "Outdoor dining spaces immerse guests in Villa Palladio’s theatrical red palette."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/villa-palladio-courtyard.jpg",
      caption: "Patterns, arches, and vivid tones create an immersive old-world atmosphere."
    },
    {
      type: "text",
      title: "The Language of Colour",
      value: "Miolini further elucidated, “This is all about how pattern and colour work to create a mood. The red was actually inspired by cardinals’ robes and our memories of Rome.”"
    },
    {
      type: "text",
      value: "Villa Palladio is a playful and delightful experience, as red, white, and black marble smears across the space. The tall ceilings of the central hall and salon are bejewelled with vivacious artificial crests of roosters and bears."
    },
    {
      type: "text",
      value: "A canopy of palm trees snakes up the walls with maroon fronds creeping around them. The red-striped corridors are kindled with black and red sconces that add a certain surrealness to the space."
    },
    {
      type: "text",
      value: "In all, they branch into nine bedrooms. A twin room holds a pagoda-shaped bed that rests against coloured walls reminiscent of bright red treillage and palm trees. While another chamber holds a scalloped four-poster bed bound by tinted glass arches."
    },
    {
      type: "text",
      value: "A vaulted kitchen, suggestive of an English country house, was created by the accomplished ceramicist Simon Marks."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/villa-palladio-lounge.jpg",
      caption: "Bold geometry and theatrical interiors reinforce Villa Palladio’s playful fantasy."
    },
    {
      type: "text",
      title: "A Secret Garden",
      value: "“We wanted there to be a strong element of privacy and peace,” shares Miolini with AD, “So we constructed the ramparts to enclose the space and make it feel more intimate – a secret garden. There is something conspiratorial and playful here that is meant to evoke a sense of childlike fantasy.”"
    },
    {
      type: "text",
      value: "The magical air spreads across the space, even beyond a tall hedge that accommodates a chevron-striped pool house, its canopy visible in the glinting water below. Royal hibiscus and palm trees conceal what is “a nod to European formal gardens with their garden follies.”"
    },
    {
      type: "text",
      title: "Conclusion",
      value: "The architects accomplish their task of leaving a mark on any traveller’s heart — a vivid memory of the red in the Pink City."
    }
  ]
},

  {
  type: "blog",
  id: 6,
  slug: "ancestral-gujarat-home-doro-minimalism",
  category: "Design",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg6,
  thumbnail: BlogImg6,
  title: "This ancestral Gujarat home by Doro is a lesson in traditional yet elegant minimalism",
  subtitle: "A restored Gujarat home balancing heritage with contemporary minimalism",
  description: "As the summer rolls in and schools take a break, parents worry about taking their children on vacation for a quaint getaway from the hassle of life.",
  featuredParagraphs: [
    "As the summer rolls in and schools take a break, parents worry about taking their children on vacation for a quaint getaway from the hassle of life.",
    "However, some families choose to return to their roots in the villages where generations of the lineage come from.",
    "These homes, usually tall, smell of the family’s history, heritage, culture, and sweet memories."
  ],
  detailedContent: [
    {
      type: "text",
      value: "As the summer rolls in and schools take a break, parents worry about taking their children on vacation for a quaint getaway from the hassle of life. However, some families choose to return to their roots in the villages where generations of the lineage come from."
    },
    {
      type: "text",
      value: "These homes, usually tall, smell of the family’s history, heritage, culture, and sweet memories."
    },
    {
      type: "text",
      value: "When Naomy Parikh, the Founder and Project Architect, and Niyati Shah, the Project Architect, at Doro, were tasked with restoring an old family home in Gujarat, their first thought was to preserve its essence."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/gujarat-home-exterior.jpg",
      caption: "The restored ancestral home preserves the quiet charm of Gujarat’s village architecture."
    },
    {
      type: "text",
      title: "Preserving a Legacy",
      value: "The home has belonged to the family for over 120 years, and is dubbed as ‘apdu gaam nu ghar’ or ‘Our home in our native village’. While the architect duo had to revive the 1,300 sq ft nostalgic quaint haven, its 150-year-old weakening wooden structure summoned a reconstruction completely."
    },
    {
      type: "text",
      value: "The heirloom was reconstructed to adopt modern-functional clues with strategic emptiness."
    },
    {
      type: "text",
      value: "“The village tells a tale of two narratives: one where individuals preserve their heritage by transforming their inherited homes into cherished retreats, and the other where homes are abandoned, succumbing to the passage of time, while some adapt chaotically to the evolving lifestyle,” Niyati and Naomy shared with AD."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/gujarat-home-interior.jpg",
      caption: "Minimal interiors and open volumes reinterpret the ancestral home for modern living."
    },
    {
      type: "text",
      title: "Balancing Old and New",
      value: "Describing their design language, the duo commented, “Our response was clear, departing from the previous form of the old house, we embraced larger volumns, accommodated temporal yet crucial social norms and mediated the balance between the old and the new.”"
    },
    {
      type: "text",
      value: "The yellow quaint home, while empty, has a certain charm to it."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "The restored Gujarat home quietly honours memory, heritage, and evolving lifestyles while embracing a restrained and elegant sense of minimalism."
    }
  ]
},

  {
  type: "blog",
  id: 7,
  slug: "bakers-arch-cafe-laurie-baker-legacy",
  category: "Design",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg7,
  thumbnail: BlogImg7,
  title: "Baker’s Arch Cafe: A Laurie Baker Legacy with a Tropical Twist",
  subtitle: "A tropical garden café rooted in Laurie Baker’s architectural philosophy",
  description: "Nestled in the heart of Thiruvananthapuram, Kerala, Baker’s Arch Cafe seamlessly blends Laurie Baker’s architectural ethos with a lush, tropical aesthetic.",
  featuredParagraphs: [
    "Nestled in the heart of Thiruvananthapuram, Kerala, Baker’s Arch Cafe seamlessly blends Laurie Baker’s architectural ethos with a lush, tropical aesthetic.",
    "At first glance, it feels like a Baker-designed marvel transported into Bali’s vibrant landscape.",
    "Yet, a step into its backyard reveals a surprising transformation—a whimsical open garden café."
  ],
  detailedContent: [
    {
      type: "text",
      value: "Nestled in the heart of Thiruvananthapuram, Kerala, Baker’s Arch Cafe seamlessly blends Laurie Baker’s architectural ethos with a lush, tropical aesthetic. At first glance, it feels like a Baker-designed marvel transported into Bali’s vibrant landscape."
    },
    {
      type: "text",
      value: "Yet, a step into its backyard reveals a surprising transformation—a whimsical open garden café. Kochi-based architect Vinod Mathews of Kriya crafts this unique ambiance, who envisioned this space as much more than just a café."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/bakers-arch-cafe-exterior.jpg",
      caption: "Baker’s Arch Cafe blends Laurie Baker’s signature brick architecture with tropical design elements."
    },
    {
      type: "text",
      title: "A Storied Past",
      value: "Baker’s Arch Cafe has a rich history. Originally built in the early 1980s by Laurie Baker as a private residence, it passed through the hands of Malayalam actor Captain Raju in 1992 before being acquired by the Muthoot Pappachan Group in 2003."
    },
    {
      type: "text",
      value: "For 12 years, the building served as Vinod’s architectural studio. When the decision was made to convert it into a café, Preethi John Muthoot and Thomas John Muthoot entrusted Vinod with complete creative freedom, knowing his deep familiarity with the structure and his previous successes designing for MPG’s ventures."
    },
    {
      type: "text",
      value: "Vinod’s vision was clear: preserve the building’s legacy while transforming it into a contemporary garden café. Unlike many of Baker’s buildings that have fallen into disrepair, this project revitalized the structure, merging the past with the present."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/bakers-arch-cafe-courtyard.jpg",
      caption: "Cobblestone pathways and exposed brick details preserve the original character of the building."
    },
    {
      type: "text",
      title: "From Residence to Garden Cafe",
      value: "The three-level Baker’s Arch embodies Laurie Baker’s philosophy of harmonizing architecture with the natural landscape. The dramatic entrance, perched on the highest level, leads visitors down a cobblestone pathway to an exposed feature wall and an iconic arch."
    },
    {
      type: "text",
      value: "These additions, including a gracefully aging fountain, were Vinod’s contributions when the space served as his office."
    },
    {
      type: "text",
      value: "The second level houses the main café building, encircling the fountain, while the backyard has been reimagined as an outdoor garden café and coffee bar."
    },
    {
      type: "text",
      value: "Inside, the rooms are thoughtfully repurposed into versatile spaces: a co-working area, a lounge, and both common and private dining rooms. The basement has been converted into a state-of-the-art kitchen."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/bakers-arch-cafe-interior.jpg",
      caption: "The restored interiors balance historic charm with contemporary café functions."
    },
    {
      type: "text",
      title: "Sensitive Interventions",
      value: "The architect makes minimal yet thoughtful interventions to the original structure. Mathews removes some walls to accommodate washrooms, and extends the basement kitchen to meet the café’s needs."
    },
    {
      type: "text",
      value: "Remarkably, he conserves features like the roof, flooring, and windows in their original form. The Lotus Hall, the primary dining area, retains its iconic design with three grand brick arches forming a lotus-like frame."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/bakers-arch-cafe-lotus-hall.jpg",
      caption: "The Lotus Hall preserves Laurie Baker’s iconic brick arches and timeless architectural detailing."
    },
    {
      type: "text",
      title: "A Tropical Escape",
      value: "The highlight of Baker’s Arch Cafe lies in its outdoors. Vinod’s design focus was on creating an inviting garden-like space while respecting the original architectural essence."
    },
    {
      type: "text",
      value: "Statement brick walls—a hallmark of Baker’s style—are strategically placed outdoors at the wash area, near the waterbody, and at the entrance. The coffee bar counters feature brass plates with cutout patterns mimicking Baker’s signature brickwork."
    },
    {
      type: "text",
      title: "Design and Aesthetic",
      value: "The café’s colour palette harmoniously blends black, grey, and brick red. Indoors, the vibrant brick walls are softened with grey tones to strike a balance, while outdoors, grey limestone flooring complements the red brick walls."
    },
    {
      type: "text",
      value: "Lush greenery, featuring plumeria and bamboo varieties, adds a tropical flair. A bamboo-designed false ceiling, covered with glass, protects the space from Kerala’s rains and mitigates the summer heat."
    },
    {
      type: "text",
      value: "A challenge arose in repurposing furniture from previous MPG hospitality projects, which varied in colour. Painting them black unified the aesthetic, further enhanced by statement lighting and fans finished in black."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/bakers-arch-cafe-garden.jpg",
      caption: "The tropical outdoor café creates an immersive garden-like dining experience."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "Baker’s Arch Cafe is a testament to thoughtful design and preservation. By blending Laurie Baker’s architectural philosophy with a contemporary tropical vibe, Vinod Mathews has created a space that invites guests to experience both history and modernity."
    },
    {
      type: "text",
      value: "Whether enjoying the airy garden café or soaking in the architectural brilliance indoors, visitors are sure to be captivated by the charm of this one-of-a-kind venue."
    }
  ]
},

  {
  type: "blog",
  id: 8,
  slug: "house-of-grace-vintage-contemporary-home",
  category: "Design",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg8,
  thumbnail: BlogImg8,
  title: "House of Grace: A Vintage Haven with Contemporary Elegance",
  subtitle: "A soulful Raipur residence blending vintage charm with contemporary sophistication",
  description: "A home often serves as a designer’s canvas—a space where creativity knows no bounds and design rules are reimagined.",
  featuredParagraphs: [
    "A home often serves as a designer’s canvas—a space where creativity knows no bounds and design rules are reimagined.",
    "Such is the story of House of Grace, a soulful yet regal residence in Raipur, Chhattisgarh.",
    "Designed by Azure Interiors, this 5,000 sq. ft. home blends vintage charm with modern comforts within a palette of inky black and white hues."
  ],
  detailedContent: [
    {
      type: "text",
      value: "A home often serves as a designer’s canvas—a space where creativity knows no bounds and design rules are reimagined. Such is the story of House of Grace, a soulful yet regal residence in Raipur, Chhattisgarh."
    },
    {
      type: "text",
      value: "Designed by Azure Interiors, led by Rashi Bothra and Ruchi Gehani, this 5,000 sq. ft. home blends vintage charm with modern comforts, all within a palette of inky black and white hues."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/house-of-grace-living-room.jpg",
      caption: "Classic English influences merge with modern elegance across the monochromatic interiors."
    },
    {
      type: "text",
      title: "A Timeless Design Philosophy",
      value: "True to its name, House of Grace exudes elegance and sophistication. The home’s open-concept floor plan fosters a seamless connection between spaces, with the architecture serving as a silent enabler of fluidity and warmth."
    },
    {
      type: "text",
      value: "Each corner of the residence reflects meticulous attention to detail, crafting an environment where classic English aesthetics meet contemporary design elements."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/house-of-grace-foyer.jpg",
      caption: "The grand foyer introduces the home’s balance of vintage charm and contemporary refinement."
    },
    {
      type: "text",
      title: "Classic Meets Contemporary",
      value: "Step through the grand double doors into a spacious foyer, where a striking art piece of a cathedral takes center stage above a geometric console. This introduction sets the tone for the formal living room—a sophisticated retreat defined by its monochromatic palette, plush seating, and a sculptural fireplace."
    },
    {
      type: "text",
      value: "Layered with decadent décor, exquisite light fixtures, and elegant window treatments, the room is a study in timeless style."
    },
    {
      type: "text",
      value: "“We have tempered the home’s classical grandeur with energetic bursts of eye-catching shapes, clean lines, and subtle nuances of English architecture,” share Rashi and Ruchi."
    },
    {
      type: "text",
      value: "These thoughtful touches extend to the hallways, which lead to a unique feature of the home—a Gurdwara infused with Lippan art, embodying spiritual depth and artisanal craftsmanship."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/house-of-grace-dining.jpg",
      caption: "The dining space continues the home’s understated yet elegant monochromatic language."
    },
    {
      type: "text",
      title: "Balancing Fancy with Functionality",
      value: "The dining area maintains the home’s cohesive theme, its understated elegance creating a welcoming atmosphere. Adjacent to this space, the kitchen combines functionality and style, featuring a pristine white island and soft mint-green cabinetry that add a contemporary edge to the classic design."
    },
    {
      type: "text",
      value: "Each room within the residence reflects the diverse tastes of its occupants while adhering to the overarching theme of contemporary elegance."
    },
    {
      type: "text",
      value: "The family room—comfortable and lively—balances the home’s grandeur with an inviting charm. At the end of the hall, a thoughtfully designed home office offers abundant shelving and a garden view, merging utility with beauty."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/house-of-grace-bedroom.jpg",
      caption: "Vintage-inspired furnishings and custom detailing elevate the master suite."
    },
    {
      type: "text",
      title: "A Testament to Artisanship",
      value: "House of Grace celebrates the artistry and craftsmanship that elevate design. “Designing the master suite was particularly enjoyable,” Ruchi reveals."
    },
    {
      type: "text",
      value: "The suite features custom-made furniture and vintage pieces that exude bespoke luxury. The accompanying en-suite walk-in closet is a standout, with patterned flooring, lacquered cabinetry, and a grand central island reminiscent of Victorian-era sophistication."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/house-of-grace-closet.jpg",
      caption: "The walk-in closet channels Victorian-era luxury through patterned flooring and lacquered cabinetry."
    },
    {
      type: "text",
      title: "Sustainability Meets Luxury",
      value: "In addition to its visual and functional appeal, House of Grace integrates sustainable practices to minimize its ecological footprint. Large windows usher in natural light, while low-VOC paints and energy-efficient appliances underscore the home’s commitment to the environment."
    },
    {
      type: "text",
      value: "Smart home systems further enhance sustainability, ensuring the residence harmonizes luxury with responsibility."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "House of Grace stands as a testament to Azure Interiors’ philosophy of blending timeless design with contemporary needs. It’s a home where vintage elements, modern conveniences, and sustainable practices coalesce, offering a living space that is as beautiful as it is meaningful."
    },
    {
      type: "text",
      value: "With its poised elegance and thoughtful design, House of Grace redefines what it means to create a truly timeless home."
    }
  ]
},

  {
  type: "blog",
  id: 9,
  slug: "benefits-of-attending-design-pov-2025",
  category: "POV Blogs",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg9,
  thumbnail: BlogImg9,
  title: "5 Ways Architects and Designers Can Benefit from Attending Design POV 2025",
  subtitle: "Why Design POV 2025 is shaping the future of architecture and interiors",
  description: "As the world of design continues to expand across continents and concepts, it becomes essential for architects and interior professionals to stay in step with the ideas shaping tomorrow.",
  featuredParagraphs: [
    "As the world of design continues to expand across continents and concepts, it becomes essential for architects and interior professionals to stay in step with the ideas shaping tomorrow.",
    "And few platforms offer such a curated, immersive experience as Design POV 2025—an upcoming architecture conference 2025 that brings together the many layers of design thinking under one roof.",
    "Hosted in Mumbai, India’s creative capital, this is more than an event. It’s a meeting of minds, a celebration of material, and a redefinition of what it means to design for now—and what’s next."
  ],
  detailedContent: [
    {
      type: "text",
      value: "As the world of design continues to expand across continents and concepts, it becomes essential for architects and interior professionals to stay in step with the ideas shaping tomorrow."
    },
    {
      type: "text",
      value: "And few platforms offer such a curated, immersive experience as Design POV 2025—an upcoming architecture conference 2025 that brings together the many layers of design thinking under one roof."
    },
    {
      type: "text",
      value: "Hosted in Mumbai, India’s creative capital, this is more than an event. It’s a meeting of minds, a celebration of material, and a redefinition of what it means to design for now—and what’s next."
    },
    {
      type: "text",
      value: "Whether you’re part of a legacy firm or carving out your own aesthetic language, here’s why the benefits of attending architecture events like Design POV 2025 should be on your calendar."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/design-pov-main.jpg",
      caption: "Design POV 2025 brings together architects, designers, innovators, and creative thinkers under one roof."
    },
    {
      type: "text",
      title: "1. Learn Beyond the Studio",
      value: "We often speak of design as a visual language. But what fuels it are the ideas, influences, and provocations that live beyond our daily projects."
    },
    {
      type: "text",
      value: "At Design POV 2025, expect a line-up that goes deeper than surface-level trends. From design exhibitions that showcase the evolution of materials to keynote panels dissecting architectural responsibility in the Indian context, the sessions are designed to engage, question, and inspire."
    },
    {
      type: "text",
      value: "This isn’t about what’s ‘on-trend.’ It’s about what’s timeless, timely, and transformative."
    },
    {
      type: "text",
      value: "For architects, it means tapping into conversations around climate consciousness, urban regeneration, and cultural preservation. For interior designers, it’s a look into the future of spaces—adaptive, sensorial, and deeply human."
    },
    {
      type: "text",
      value: "Attendees will witness how technological interventions are shaping design thinking—from AI-powered drafting tools to sustainability-driven material innovation."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/design-pov-learning.jpg",
      caption: "Panel discussions and immersive sessions encourage deeper conversations around the future of design."
    },
    {
      type: "text",
      title: "2. Design Industry Networking That Moves the Needle",
      value: "At the heart of any successful event lies its ability to foster connection. And at Design POV 2025, design industry networking isn’t relegated to handshakes over cocktails. It’s embedded into the fabric of the experience."
    },
    {
      type: "text",
      value: "Expect thoughtful networking lounges, curated design walks, and conversation-led sessions with some of India’s most prolific practitioners."
    },
    {
      type: "text",
      value: "Networking for designers in 2025 isn’t about visibility—it’s about meaningful alignment. Who you speak with might shape your next collection, collaboration, or commission."
    },
    {
      type: "text",
      value: "Design POV’s approach to networking is intentional. Speed-networking booths, mentorship pairings, and industry mixers are built into the program so attendees leave with not just names—but relationships."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/design-pov-networking.jpg",
      caption: "Curated networking spaces encourage collaboration across architecture, interiors, and design disciplines."
    },
    {
      type: "text",
      title: "3. The Rise of Interior Design Expos in India",
      value: "As India asserts its voice in global design narratives, interior design expos in India have become more than trade events—they are cultural moments."
    },
    {
      type: "text",
      value: "Design POV 2025 is poised to reflect this shift, offering a rare convergence of international perspectives with Indian craft, storytelling, and innovation."
    },
    {
      type: "text",
      value: "For interior professionals, it’s a masterclass in materiality—whether it’s exploring experimental textiles, homegrown sustainable surfaces, or the revival of vernacular forms."
    },
    {
      type: "text",
      value: "Interactive design labs, mini ateliers, and live demonstrations ensure that this experience is rooted in action, not observation."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/design-pov-materials.jpg",
      caption: "Material showcases and interactive exhibits spotlight the future of Indian design innovation."
    },
    {
      type: "text",
      title: "4. Bridging Global Ideas with Indian Contexts",
      value: "Design is no longer siloed by geography. It travels across time zones, cultures, and mediums. But for that travel to be meaningful, it must be grounded in context."
    },
    {
      type: "text",
      value: "From Scandinavian restraint to South American vibrancy, the event captures a spectrum of global design influences, then weaves them seamlessly into Indian narratives."
    },
    {
      type: "text",
      value: "An Italian lighting brand might collaborate with local ceramicists. A Japanese spatial philosophy might inform how we think about Mumbai’s vertical living."
    },
    {
      type: "text",
      value: "This isn’t just another architecture conference—it’s a mirror and a map. A place to reflect on where Indian design stands today and where it could go."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/design-pov-global.jpg",
      caption: "International collaborations and Indian craftsmanship intersect across the Design POV experience."
    },
    {
      type: "text",
      title: "5. Design Serendipity",
      value: "Ask any creative professional what changed their trajectory, and it’s rarely something planned. It’s a chance meeting with a mentor. A material that sparks a project. A conversation that unlocks a collaboration."
    },
    {
      type: "text",
      value: "This is one of the most understated yet powerful benefits of attending architecture events—and Design POV 2025 is curated to allow for these serendipitous sparks."
    },
    {
      type: "text",
      value: "The event features collaborative zones, breakout labs, portfolio reviews, and experience-based showcases where interaction is encouraged."
    },
    {
      type: "text",
      value: "Because sometimes, the most meaningful shift in your career isn’t made in your studio. It’s made in a room filled with strangers, ideas, and a shared sense of purpose."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/design-pov-community.jpg",
      caption: "Design POV 2025 creates opportunities for unexpected conversations and meaningful collaborations."
    },
    {
      type: "text",
      title: "Why Design POV 2025 Matters",
      value: "What sets this experience apart is its deep intent. From its editorial curation to its layered programming, everything about Design POV 2025 is built to engage the design mind at every level."
    },
    {
      type: "text",
      value: "Held in Mumbai, a city that blends heritage with high-rises, the event captures the pulse of India’s evolving design story. It is an essential destination for those who aren’t just following design trends but are helping shape them."
    },
    {
      type: "text",
      title: "Preparing to Attend",
      value: "To truly experience the richness of Design POV 2025, plan with intention. Define your lens, curate your time, bring your work, engage in conversations, and leave room for the unexpected."
    },
    {
      type: "text",
      title: "Who Will Find Value",
      value: "Design POV 2025 welcomes architects, interior designers, students, makers, developers, hoteliers, and cultural curators invested in the future of design and space-making."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "Design POV 2025 is not just a design exhibition or a conference—it’s a pause, a provocation, and a platform. It’s where the future of Indian design begins to take shape."
    },
    {
      type: "text",
      value: "Walk the exhibits. Listen to the quiet provocations. Start that conversation. Because sometimes, the next big leap comes from looking inward—surrounded by others doing the same."
    }
  ]
},

  {
  type: "blog",
  id: 10,
  slug: "echoes-of-tomorrow-design-pov-2025-theme",
  category: "POV Blogs",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg10,
  thumbnail: BlogImg10,
  title: "Echoes of Tomorrow — Theme 2025",
  subtitle: "Design POV 2025 explores the dialogue between memory, heritage, and the future",
  description: "Design POV is a collective mediation on design, culture, and creativity.",
  featuredParagraphs: [
    "Design POV is a collective mediation on design, culture, and creativity.",
    "But to truly ignite dialogue and provoke a deeper design consciousness, there needs to be a thread, something to tether the abstract to the real, to give voice to intention.",
    "For 2025, the theme is Echoes of Tomorrow, a poetic paradox that invites India’s top architecture and design firms to step into the future, guided by the past."
  ],
  detailedContent: [
    {
      type: "text",
      value: "Design POV is a collective mediation on design, culture, and creativity. But to truly ignite dialogue and provoke a deeper design consciousness, there needs to be a thread, something to tether the abstract to the real, to give voice to intention."
    },
    {
      type: "text",
      value: "The theme is integral here. Design POV has always believed that the strongest ideas often emerge when creators are unified, not confined, by a prompt."
    },
    {
      type: "text",
      value: "A theme at the event isn’t a rulebook but a conversation starter. Each year, a single conceptual anchor becomes a catalyst to create a common language, allowing vastly different practices and perspectives to express themselves in parallel."
    },
    {
      type: "text",
      value: "For 2025, the theme is Echoes of Tomorrow, a poetic paradox that invites India’s top architecture and design firms to step into the future, guided by the past."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/echoes-of-tomorrow-main.jpg",
      caption: "Echoes of Tomorrow explores how memory, heritage, and culture shape future design narratives."
    },
    {
      type: "text",
      title: "A Dialogue Between Past and Future",
      value: "This isn’t a look back with nostalgia or a leap forward with blind optimism. It’s about turning toward the past’s quiet reverberations and allowing them to shape tomorrow’s built environments, philosophies, and spatial stories."
    },
    {
      type: "text",
      value: "Design isn’t formed in isolation. It’s shaped by memory, lineage, and cultural inheritance as much as by intent, imagination, and intuition."
    },
    {
      type: "text",
      value: "Echoes of Tomorrow was born from this realisation—that the future we’re dreaming of is always, in some way, touched by what came before."
    },
    {
      type: "text",
      value: "“This year’s concept invites architects, designers, and creative thinkers to embark on an exploratory journey to envision spaces, products, and experiences that reflect an imagined tomorrow while remaining deeply connected to the cultural heritage and practices of the past,” says Team Design POV."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/echoes-of-tomorrow-installation.jpg",
      caption: "The theme encourages designers to reinterpret tradition through future-facing spatial experiences."
    },
    {
      type: "text",
      title: "Memory as Material",
      value: "Design doesn’t emerge in a vacuum. It’s shaped as much by memory, lineage, and cultural inheritance as by intent, imagination, and instinct."
    },
    {
      type: "text",
      value: "It invites each participating studio to explore deeply personal interpretations of cultural heritage, inherited ideologies, and evolving design identities."
    },
    {
      type: "text",
      value: "Somewhere between the ancestral and the aspirational lies a vast and fertile space for creative reflection."
    },
    {
      type: "text",
      value: "For some, this might mean resurrecting long-forgotten techniques. For others, it’s the abstraction of the past—using light, shadow, geometry, and materials to explore what time means in a designed space."
    },
    {
      type: "text",
      value: "“As a child, he watched his father commission local artisans to create custom-made tortoise shell jewelry boxes. Their glowing amber hues and intricate bone fretwork fascinated him… drawing from these memories, I’ve conceptualized this entertainment room,” shares Ameet Mirpuri."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/echoes-of-tomorrow-memory.jpg",
      caption: "Craftsmanship and inherited memories become integral elements within future-oriented design concepts."
    },
    {
      type: "text",
      title: "Fluid Futures",
      value: "Other firms chose to explore temporality through transitions of purpose, light, and rhythm. BNK Group reimagines the very function of space as something fluid, alive, and multifaceted."
    },
    {
      type: "text",
      value: "“Our design for the futuristic luxury hotel lobby, titled ‘Blurring Boundaries,’ is an ode to seamless living—a monolithic landscape sculpted from simplicity, elegance, and intent,” reveals BNK Group."
    },
    {
      type: "text",
      value: "By day, it transforms into a calm coworking haven, while by night, it evolves into a lounge where ideas turn into conversations."
    },
    {
      type: "text",
      value: "Here, the past doesn’t appear as a literal element, but its spirit is embedded in how we once gathered, slowed down, and communed."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/echoes-of-tomorrow-bnk.jpg",
      caption: "Installations explore evolving spatial identities and fluid transitions between purpose and experience."
    },
    {
      type: "text",
      title: "Symbols of Warmth and Presence",
      value: "Hiren Patel Architects take another route: honouring one of the oldest symbols of warmth and presence—the lamp."
    },
    {
      type: "text",
      value: "“The concept of the booth revolves around the theme of light, the theme of lamps. Placing the brass oil lamps as a central motif, the source of warmth, birthing light, the space entertains the surrounding themes of what it stands for,” comment Hiren Patel Architects."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/echoes-of-tomorrow-light.jpg",
      caption: "Traditional motifs like lamps are reinterpreted as symbols of continuity and warmth."
    },
    {
      type: "text",
      title: "A Playful Rebellion",
      value: "Some studios take the thematic provocation to its most radical edge. Purple Backyard approaches the future as something chaotic, surreal, and defiantly unstructured."
    },
    {
      type: "text",
      value: "“The future isn’t just silent serenity—it’s a paradox, a dreamscape, a playful rebellion against predictability. This is a Mad Hatter’s party reimagined, where the rules of time and space blur,” they explain."
    },
    {
      type: "text",
      value: "Here, the past isn’t a direct reference—it’s an energy, a freedom we once had before constraints crept in. And the future? It’s unafraid to misbehave."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/echoes-of-tomorrow-surreal.jpg",
      caption: "Surrealist installations challenge traditional ideas of time, order, and spatial storytelling."
    },
    {
      type: "text",
      title: "A Shared Reflection",
      value: "There is no template here. Instead, there’s a design spectrum, where each installation feels like a chapter in a larger spatial memoir."
    },
    {
      type: "text",
      value: "It asks: Which parts of the past still belong to us? Which rituals, materials, and stories still hold relevance? How do we transform them into design gestures that speak to a new world?"
    },
    {
      type: "text",
      value: "In a world where creativity can often be rushed or reactive, a theme becomes a pause. A prompt to return to intention. To reflect, reconnect, and reinterpret."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "Because design, at its most powerful, is not about invention alone. It’s about continuation. About giving shape to what still speaks—through craft, through memory, through material, through light."
    },
    {
      type: "text",
      value: "Design POV holds space for meaning. The kind that resonates, lingers, and echoes."
    }
  ]
},

  {
  type: "blog",
  id: 11,
  slug: "credai-mchi-design-pov",
  category: "POV Blogs",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg11,
  thumbnail: BlogImg11,
  title: "CREDAI-MCHI",
  subtitle: "Shaping conversations around design, luxury, and urban living at Design POV",
  description: "Design POV was thrilled to be supported by CREDAI-MCHI, the apex body representing private sector developers across the Mumbai Metropolitan Region (MMR).",
  featuredParagraphs: [
    "Design POV was thrilled to be supported by CREDAI-MCHI, the apex body representing private sector developers across the Mumbai Metropolitan Region (MMR).",
    "With over 2,000 member developers and a presence across key urban regions, CREDAI-MCHI plays a vital role in structuring the city’s built environment.",
    "Their work goes beyond policy—they are actively shaping how cities grow and how people live."
  ],
  detailedContent: [
    {
      type: "text",
      value: "Design POV was thrilled to be supported by CREDAI-MCHI, the apex body representing private sector developers across the Mumbai Metropolitan Region (MMR)."
    },
    {
      type: "text",
      value: "With over 2,000 member developers and a presence across key urban regions, CREDAI-MCHI plays a vital role in structuring the city’s built environment, making real estate more transparent, organized, and future-ready."
    },
    {
      type: "text",
      value: "The body also forms part of CREDAI National, an umbrella association of 13,000+ developers across India."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/credai-mchi-panel.jpg",
      caption: "CREDAI-MCHI brought together leading voices from real estate, architecture, and design at Design POV."
    },
    {
      type: "text",
      title: "Shaping Urban Conversations",
      value: "Through its consistent engagement with state and local governments, CREDAI-MCHI has become a credible voice in the national conversation around housing and urban development."
    },
    {
      type: "text",
      value: "Their work goes beyond policy—they are actively shaping how cities grow and how people live."
    },
    {
      type: "text",
      value: "At Design POV, their involvement brought depth to the programming by creating space for critical conversations between developers, architects, and designers, particularly around the intersection of affordability, liveability, and good design."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/credai-mchi-discussion.jpg",
      caption: "Panel discussions explored the evolving meaning of luxury, sustainability, and liveability."
    },
    {
      type: "text",
      title: "Redefining Luxury",
      value: "The opening panel at Design POV, supported by CREDAI-MCHI, brought together some of the sharpest minds in real estate, architecture, and design to unpack what truly defines luxury in today’s urban context."
    },
    {
      type: "text",
      value: "Day 1 kicked off with Honourable Mr. Vijay Wadhwa, Chairman of The Wadhwa Group, reflecting on how design must evoke personal innovation. “A person who’s wanting to make something innovative… experiences it, it gives him some idea that this is how I can do for myself,” he shared."
    },
    {
      type: "text",
      value: "Guest of Honour Rakshit Hargave, CEO of Birla Opus Paints, emphasized co-creation with designers. “We are here to learn from experts,” he said, noting the importance of translating creative ideas into tangible innovations."
    },
    {
      type: "text",
      value: "The discussion then delved into the idea of luxury, particularly the use, or restraint of FSI (Floor Space Index). “You cannot take FSI to your grave,” quipped Karl Wadia."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/credai-mchi-luxury.jpg",
      caption: "Industry leaders reflected on the future of luxury, housing, and urban growth in India."
    },
    {
      type: "text",
      title: "Designing for Liveability",
      value: "Good planning, natural light, ventilation, and access to greenery were universally acknowledged as key drivers of livability."
    },
    {
      type: "text",
      value: "Heritage preservation also took center stage. When discussing redevelopment in areas like South Mumbai, panelists stressed the importance of blending modern functionality with historical aesthetics, retaining the “philosophy of the place.”"
    },
    {
      type: "text",
      value: "The conversation shifted to the evolving luxury landscape in Thane, with panelists describing luxury as enhancing the “happiness index,” pointing to Thane’s natural surroundings and optimal Vastu conditions."
    },
    {
      type: "text",
      value: "Karl Wadia brought an essential caution: luxury should not be confused with size. “Often luxury is mistaken with size… In the aspiration to buy bigger, customers end up working for the bank,” he noted."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/credai-mchi-event.jpg",
      caption: "The opening session encouraged a deeper dialogue on building cities that are sustainable, thoughtful, and future-ready."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "The first session at Design POV set a rich tone for the event, urging everyone—from developers to designers—to rethink how cities can be built better, more beautifully, and more sustainably."
    }
  ]
},

  {
  type: "blog",
  id: 12,
  slug: "bombay-founders-club-design-pov-2025",
  category: "POV Blogs",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg12,
  thumbnail: BlogImg12,
  title: "Bombay Founders Club",
  subtitle: "Building conversations around entrepreneurship, creativity, and innovation at Design POV 2025",
  description: "We were thrilled to have Bombay Founders’ Club (BFC) at Design POV 2025 as a Supporting Association.",
  featuredParagraphs: [
    "We were thrilled to have Bombay Founders’ Club (BFC) at Design POV 2025 as a Supporting Association.",
    "Born from an intimate conversation between six founders in a single room, BFC has quickly grown into one of India’s most trusted ecosystems for early-stage entrepreneurs.",
    "Their gatherings are driven not by pitches or performance, but by vulnerability, trust, and shared ambition."
  ],
  detailedContent: [
    {
      type: "text",
      value: "We were thrilled to have Bombay Founders’ Club (BFC) at Design POV 2025 as a Supporting Association."
    },
    {
      type: "text",
      value: "Born from an intimate conversation between six founders in a single room, BFC has quickly grown into one of India’s most trusted ecosystems for early-stage entrepreneurs."
    },
    {
      type: "text",
      value: "With a collective of over 200 founders and counting, their gatherings are driven not by pitches or performance, but by vulnerability, trust, and shared ambition."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/bombay-founders-club-main.jpg",
      caption: "Bombay Founders’ Club brought together entrepreneurship, creativity, and collaboration at Design POV 2025."
    },
    {
      type: "text",
      title: "An Ecosystem Built on Dialogue",
      value: "In just one year, BFC has hosted 50+ curated meetups and peer mentorship sessions that have helped shape ventures and minds alike."
    },
    {
      type: "text",
      value: "At Design POV, this energy translated into a partnership that celebrates real dialogue and the fearless spirit of building something new."
    },
    {
      type: "text",
      value: "As Design POV brought together leading architects, designers, and creative studios from across the country, the collaboration strengthened a shared vision—to create spaces and systems where creativity and entrepreneurship can truly thrive."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/bombay-founders-club-panel.jpg",
      caption: "The BFC session sparked conversations around innovation, venture-building, and creative leadership."
    },
    {
      type: "text",
      title: "The Spirit of Building",
      value: "At Design POV 2025, the energy shifted gears when Bombay Founders’ Club took the stage. What began as an intimate circle of six early-stage entrepreneurs has rapidly become one of India’s most respected founder ecosystems."
    },
    {
      type: "text",
      value: "The BFC session reflected this spirit: real talk, sharp insight, and a shared passion for building."
    },
    {
      type: "text",
      value: "Kicking off the session, BFC founder Devarsh Sarath pushed back against the need for dividing founders by categories like D2C, B2B, or tech."
    },
    {
      type: "text",
      value: "“As founders, we’re solving problems. That’s our identity, not the current vertical we operate in,” he said, setting the tone for a conversation rooted in versatility and curiosity."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/bombay-founders-club-discussion.jpg",
      caption: "Founders and creatives explored the evolving relationship between business, design, and innovation."
    },
    {
      type: "text",
      title: "Rethinking Venture Capital",
      value: "The keynote by Gopal Modi, whose career spans advertising, LPG, construction, VC, and more, revealed a powerful new initiative: a venture fund focused on the built environment, backed by India’s top architects and developers."
    },
    {
      type: "text",
      value: "“Architects influence so much of brand building but rarely participate in the wealth creation journey. This fund aims to change that,” he shared."
    },
    {
      type: "text",
      value: "Unlike many small funds that simply follow the big players, Gopal emphasized a bottom-up, insight-driven approach. “We leverage industry intel, not just capital. We know which brands have product-market fit because the architects and developers are already using them.”"
    },
    {
      type: "text",
      value: "The fund, he explained, is deeply invested in long-term value and disruption through sustainability, design, and innovation."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/bombay-founders-club-speaker.jpg",
      caption: "Industry leaders shared insights on scaling ventures, design innovation, and sustainable growth."
    },
    {
      type: "text",
      title: "People, Culture, and Growth",
      value: "Diving into people strategy, Gopal offered practical advice that resonated with the room. For top hires, he said, “Don’t just interview, take them out to dinner. Get to know the person deeply.”"
    },
    {
      type: "text",
      value: "He stressed the value of learners who execute, citing stories of long-time colleagues who rose from junior roles to leadership through curiosity and determination."
    },
    {
      type: "text",
      value: "When it came to culture, he kept it simple: reward people, respect their time, and make work fun. Especially in Gen Z-dominated teams, lightness, recognition, and emotional connection are non-negotiable."
    },
    {
      type: "text",
      title: "A Founder’s Playbook",
      value: "During the audience Q&A, founders explored the mechanics of venture capital and sustainable growth."
    },
    {
      type: "text",
      value: "On ROI, Gopal noted that funds aim for 30–35%+ returns, but success ultimately depends on smart and scalable execution."
    },
    {
      type: "text",
      value: "On burn versus profitability, he explained, “Burn is okay if your unit economics work. Don’t lose money on every product sold, use capital to grow, not to survive.”"
    },
    {
      type: "text",
      value: "Addressing startup trends, he reflected on how tech moats are shrinking, while in physical businesses, distribution and design differentiation matter more than ever."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/bombay-founders-club-networking.jpg",
      caption: "The BFC session encouraged emerging founders to think critically about growth, culture, and innovation."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "Closing the session, Gopal left founders with a powerful reflection: “India is the most exciting country to build in right now. Massive opportunities lie ahead in every space. What matters is your agility and clarity in how you grow.”"
    },
    {
      type: "text",
      value: "The BFC panel became more than a discussion—it evolved into a playbook for entrepreneurs navigating a chaotic yet promising future."
    }
  ]
},

  {
  type: "blog",
  id: 13,
  slug: "nrai-design-pov-2025",
  category: "POV Blogs",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg13,
  thumbnail: BlogImg13,
  title: "National Restaurant Association of India (NRAI)",
  subtitle: "Exploring the future of hospitality, dining, and experience design at Design POV 2025",
  description: "Design POV ’25 was thrilled to be supported by the National Restaurant Association of India (NRAI), bringing with it over four decades of advocacy for India’s vibrant food service sector.",
  featuredParagraphs: [
    "Design POV ’25 was thrilled to be supported by the National Restaurant Association of India (NRAI), bringing with it over four decades of advocacy for India’s vibrant food service sector.",
    "Representing over 500,000 restaurants and a ₹5.69 lakh crore industry, NRAI has long been the voice of restaurateurs, chains, and independents.",
    "At Design POV, NRAI anchored dialogues around the evolving food and hospitality experience, from spatial aesthetics and experience design to the realities of running a future-forward restaurant."
  ],
  detailedContent: [
    {
      type: "text",
      value: "Design POV ’25 was thrilled to be supported by the National Restaurant Association of India (NRAI), bringing with it over four decades of advocacy for India’s vibrant food service sector."
    },
    {
      type: "text",
      value: "Representing over 500,000 restaurants and a ₹5.69 lakh crore industry, NRAI has long been the voice of restaurateurs, chains, and independents."
    },
    {
      type: "text",
      value: "From policy lobbying and skilling programs to research and networking, the association plays a pivotal role in shaping the business of hospitality in India."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/nrai-main.jpg",
      caption: "NRAI brought conversations around hospitality, dining culture, and restaurant innovation to Design POV 2025."
    },
    {
      type: "text",
      title: "A Legacy of Hospitality",
      value: "Founded in 1982 by leaders from iconic establishments like Nirula’s, Volga, and Khyber, NRAI has grown into a trusted body with a pan-India presence and a deep understanding of both tradition and innovation."
    },
    {
      type: "text",
      value: "At Design POV, NRAI anchored dialogues around the evolving food and hospitality experience, from spatial aesthetics and experience design to the realities of running a future-forward restaurant."
    },
    {
      type: "text",
      value: "With restaurants playing a bigger cultural and creative role in cities today, the collaboration felt both timely and essential."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/nrai-panel.jpg",
      caption: "The Hunger Games panel explored the changing dynamics of dining, hospitality, and restaurant design."
    },
    {
      type: "text",
      title: "The Hunger Games Panel",
      value: "The Hunger Games panel brought together India’s top restaurateurs and hospitality innovators for a thought-provoking discussion on the future of dining."
    },
    {
      type: "text",
      value: "Moderated by Anurag Katriar, founder of Indigo Hospitality and former NRAI President, the session opened with reflections on India’s culinary future."
    },
    {
      type: "text",
      value: "“India is a culinary powerhouse,” he noted, adding that it’s time to channel that potential into thoughtful, future-forward dining experiences."
    },
    {
      type: "text",
      value: "Karan Kapur of K Hospitality Corp challenged the idea that delivery is overtaking dine-in, asserting that dine-in remains the core brand experience."
    },
    {
      type: "text",
      value: "“Delivery is still in single digits for fine dining,” he shared, explaining that it plays a more significant role in QSR formats where pricing and accessibility differ."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/nrai-discussion.jpg",
      caption: "Hospitality leaders reflected on delivery culture, dine-in experiences, and evolving customer expectations."
    },
    {
      type: "text",
      title: "Experience Over Convenience",
      value: "Yash Bhanage, the mind behind Bombay Canteen and O Pedro, drew a sharp comparison: “Cloud kitchens are like Netflix, but restaurants are the theatre.”"
    },
    {
      type: "text",
      value: "He explained that food delivered at home is rooted in convenience, while restaurants must focus on creating experiences compelling enough to make customers step out."
    },
    {
      type: "text",
      value: "For Pawan Shahri of Chrome Asia, design is fundamental—not just an add-on. “The eye is pleased before the mouth,” he said, emphasizing visual storytelling, spatial identity, and how interiors influence perception."
    },
    {
      type: "text",
      value: "His philosophy split a restaurant’s impact equally across food, design, and service—each forming one-third of the overall experience."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/nrai-design.jpg",
      caption: "Design was discussed as a critical tool for storytelling, branding, and customer engagement."
    },
    {
      type: "text",
      title: "Designing Memorable Spaces",
      value: "Pranav Rangta of Naksha and Otoki highlighted how design must remain contextually rooted. At Naksha, Art Deco influences pay homage to the surrounding art district."
    },
    {
      type: "text",
      value: "He noted that customers often associate clean and thoughtful design with hygiene and operational quality. “Customers associate clean design with clean kitchens,” he shared."
    },
    {
      type: "text",
      value: "The panel collectively agreed that in today’s digital world, restaurants must be camera-friendly. Design is no longer just décor—it functions as communication, branding, and marketing."
    },
    {
      type: "text",
      value: "“If your product doesn’t look good on camera, you’ll spend 10x more to market it,” remarked Pawan Shahri."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/nrai-hospitality.jpg",
      caption: "Thoughtful hospitality design emerged as the foundation for memorable dining experiences."
    },
    {
      type: "text",
      title: "Balancing Technology and Human Touch",
      value: "Automation also became a key topic during the session. While robotic servers and digital menus continue to shape the industry, panelists emphasized the importance of maintaining emotional connection and human interaction."
    },
    {
      type: "text",
      value: "Yash shared how his team integrated subtle experiential cues into dining spaces, such as fidget spinners in chairs to detect guest boredom, prompting staff to respond with live magic tricks and thoughtful interactions."
    },
    {
      type: "text",
      value: "This approach highlighted how service design can create memorable experiences without sacrificing warmth or personality."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "Closing the session, Anurag Katriar summarized the essence of hospitality: “What we’re selling in a restaurant is hospitality. What people consume is experience. And what they take back is memory.”"
    }
  ]
},

  {
  type: "blog",
  id: 14,
  slug: "how-to-use-color-psychology-in-restaurant-interiors",
  category: "POV Blogs",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg14,
  thumbnail: BlogImg14,
  title: "How to Use Color Psychology in Restaurant Interiors",
  subtitle: "Using colour to shape atmosphere, appetite, and dining experiences",
  description: "The scent of freshly baked bread wafts through the air, warm and familiar, like a quiet invitation.",
  featuredParagraphs: [
    "The scent of freshly baked bread wafts through the air, warm and familiar, like a quiet invitation.",
    "But what truly pulls you in isn’t on the plate. You realise it’s the space.",
    "For designers and architects, colour is a powerful tool shaping emotion, guiding appetite, and setting the rhythm of a meal."
  ],
  detailedContent: [
    {
      type: "text",
      value: "The scent of freshly baked bread wafts through the air, warm and familiar, like a quiet invitation. Behind the glass counter, desserts glisten under soft light while flavours from distant coasts and bustling streets wait to unfold."
    },
    {
      type: "text",
      value: "But what truly pulls you in isn’t on the plate. You realise it’s the space. The hush of terracotta walls holding the day’s warmth, the whisper of muted greens that calm the senses, the slow pour of golden sunlight slipping through tall windows."
    },
    {
      type: "text",
      value: "For designers and architects, colour is a powerful tool shaping emotion, guiding appetite, and setting the rhythm of a meal. Because colour psychology in restaurant interiors is atmosphere made tangible."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/restaurant-color-psychology-main.jpg",
      caption: "Warm earthy tones and layered lighting shape emotional dining experiences."
    },
    {
      type: "text",
      title: "Why Colour Matters in Dining Spaces",
      value: "Colour has the power to shape mood, appetite, and even the way a dish is perceived. When we speak of colour psychology in restaurant interiors, we’re composing an emotional journey before the first bite."
    },
    {
      type: "text",
      value: "Burnt ochre and terracotta invite spirited chatter and connection, while muted greens and teals usher in calm. Vibrant reds and glowing oranges awaken the senses, while deep greens and blues slow the rhythm of dining."
    },
    {
      type: "text",
      value: "In intimate settings, pale neutrals and light tones make compact restaurants feel expansive. In grand dining rooms, darker shades like charcoal, olive, or aubergine create cocoon-like intimacy."
    },
    {
      type: "text",
      value: "Restaurant branding through colour also signals whether a dining experience feels casual or refined, indulgent or restrained, traditional or experimental."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/restaurant-color-palettes.jpg",
      caption: "Restaurant colour palettes influence mood, energy, and spatial perception."
    },
    {
      type: "text",
      title: "Strong Appetite Stimulants",
      value: "Warm tones like reds, oranges, and yellows stimulate appetite and energy. Red in dining spaces raises excitement and intensity, making it ideal for fast-paced restaurants and social dining environments."
    },
    {
      type: "text",
      value: "Orange creates comfort and warmth, while yellow introduces positivity and cheerfulness when used thoughtfully."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/restaurant-red-orange.jpg",
      caption: "Warm reds and oranges energize dining spaces and encourage social interaction."
    },
    {
      type: "text",
      title: "Mild Stimulants",
      value: "Greens and turquoises evoke freshness, wellness, and calm without dulling the appetite. These hues work particularly well in organic cafés, wellness-driven restaurants, and tropical dining spaces."
    },
    {
      type: "text",
      value: "Turquoise and aqua tones introduce clarity and rejuvenation, creating relaxed environments that encourage guests to linger comfortably."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/restaurant-green-tones.jpg",
      caption: "Muted greens and turquoise tones create calming and refreshing dining atmospheres."
    },
    {
      type: "text",
      title: "Appetite Suppressants",
      value: "Cooler shades like blues, purples, and black tend to suppress appetite when overused. However, when balanced correctly, they evoke sophistication, luxury, and restraint."
    },
    {
      type: "text",
      value: "Blue works beautifully in fine-dining spaces and waterfront restaurants, while deep purples and blacks add drama when layered with warm lighting and textured finishes."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/restaurant-dark-tones.jpg",
      caption: "Deep blues, blacks, and purples create intimate and luxurious dining settings."
    },
    {
      type: "text",
      title: "Choosing the Right Colour Scheme",
      value: "Every restaurant has a pace and personality. Fast-casual spaces often lean toward lively terracotta, burnt orange, and mustard tones, while boutique cafés and fine-dining restaurants favour muted greens, warm browns, and layered neutrals."
    },
    {
      type: "text",
      value: "A dominant colour should define the restaurant’s tone, while secondary colours and textures create depth through furniture, lighting, and materials."
    },
    {
      type: "text",
      value: "Consistency across menus, signage, interiors, and branding ensures that the restaurant feels visually cohesive and emotionally intentional."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/restaurant-materials.jpg",
      caption: "Textures, finishes, and layered materials help colours feel grounded and immersive."
    },
    {
      type: "text",
      title: "Practical Design Guidelines",
      value: "Designers should consider how colour interacts with lighting, circulation, materials, and customer movement throughout the restaurant."
    },
    {
      type: "text",
      value: "Warm bulbs enrich earthy palettes, while cool LEDs sharpen greens and blues. Matte finishes absorb light softly, while gloss and reflective materials amplify brightness and drama."
    },
    {
      type: "text",
      value: "Colour can also guide customer flow. Brighter tones near pathways and exits subtly influence movement, while darker ceilings create intimacy in expansive spaces."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/restaurant-lighting.jpg",
      caption: "Lighting and colour work together to influence atmosphere, depth, and comfort."
    },
    {
      type: "text",
      title: "Colour in Supporting Elements",
      value: "Beyond walls, colour appears through upholstery, ceramics, furniture, flooring, and decorative accents. Velvet seating, reclaimed wood, metallic finishes, coloured glass, and textured fabrics all contribute to the emotional language of a restaurant."
    },
    {
      type: "text",
      value: "Amber glass softens the atmosphere, brushed brass introduces warmth, while natural wood tones ground brighter palettes with familiarity and tactility."
    },
    {
      type: "text",
      value: "Every design gesture—whether subtle or bold—adds to the overall story of the dining experience."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/restaurant-details.jpg",
      caption: "Furniture, fabrics, ceramics, and metallic accents extend the restaurant’s colour narrative."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "Colour is a language spoken through the smallest gestures. The psychology of colour in commercial interiors shapes how people arrive, settle, taste, and remember."
    },
    {
      type: "text",
      value: "The most successful hospitality spaces understand that colour orchestrates atmosphere. When thoughtfully layered, the right palette transforms restaurants into experiences guests carry with them long after the meal ends."
    }
  ]
},

  {
  type: "blog",
  id: 15,
  slug: "inside-art-mumbai-from-where-we-stood",
  category: "Design",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg15,
  thumbnail: BlogImg15,
  title: "Inside Art Mumbai, From Where We Stood",
  subtitle: "A walkthrough of Art Mumbai’s third edition through the eyes of a first-time visitor",
  description: "As soon as I entered Art Mumbai, I had an overwhelming realisation of my adoration for art and design.",
  featuredParagraphs: [
    "As soon as I entered Art Mumbai, I had an overwhelming realisation of my adoration for art and design.",
    "It was my first time at an edition, and the first thing I saw didn’t disappoint: a mirror under a plaque that reads “Currently under interpretation.”",
    "By the time I walked out of Art Mumbai, my feet aching and my mind buzzing, I realised something: such fairs are all about the conversations that art incites."
  ],
  detailedContent: [
    {
      type: "text",
      value: "As soon as I entered Art Mumbai, I had an overwhelming realisation of my adoration for art and design. No one, and I repeat, no one other than someone who’s genuinely in love with art would willingly subject themselves to the excursion it takes to reach Mahalaxmi Racecourse."
    },
    {
      type: "text",
      value: "It was my first time at an edition, and the first thing I saw didn’t disappoint: a mirror under a plaque that reads “Currently under interpretation.” Beyond the flattering implication that I was a piece of art, I was intrigued by how it asked the audience to keep an open mind and perspective about what awaited them."
    },
    {
      type: "text",
      value: "I was ready."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/art-mumbai-entry.jpg",
      caption: "Art Mumbai welcomed visitors with installations that encouraged interpretation and curiosity."
    },
    {
      type: "text",
      title: "The Seven Colours",
      value: "The first piece that stopped me in my tracks was Subodh Gupta’s The Seven Colours. Hundreds of stainless steel tongs, coated in PVD, burst from the wall like a firework frozen mid-explosion."
    },
    {
      type: "text",
      value: "The chimtas, a staple in Indian kitchens, became a commentary on India’s industrial rise, middle-class domesticity, and mass manufacture."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/subodh-gupta-seven-colours.jpg",
      caption: "Subodh Gupta’s The Seven Colours transformed everyday kitchen tools into a striking visual commentary."
    },
    {
      type: "text",
      title: "Meandering Histories",
      value: "Remen Chopra W. Van Der Vaart’s Meandering Histories Intertwined demanded a closer look. Carved from recycled wood and set against fragments of woven carpet, the multidisciplinary piece resembled a fragmented map."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/meandering-histories.jpg",
      caption: "Meandering Histories Intertwined layered recycled materials into a textured visual narrative."
    },
    {
      type: "text",
      title: "The Stranger",
      value: "Bharat Sikka’s KOTOKUNIBITO series initially appeared simple—three photographs of vending machines in yellow, blue, and white. But the title, translating to “the stranger,” reframed the work entirely."
    },
    {
      type: "text",
      value: "The machines stood in isolation, quietly symbolising absence, distance, and the feeling of navigating unfamiliar terrain."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/bharat-sikka-kotokunibito.jpg",
      caption: "Bharat Sikka’s KOTOKUNIBITO explored solitude and displacement through quiet urban imagery."
    },
    {
      type: "text",
      title: "Ramachandran’s Early Drawings",
      value: "One of the most moving displays was A. Ramachandran’s early untitled drawings from 1965–80. Unlike his large-scale murals and paintings, these sketches felt deeply personal and intimate."
    },
    {
      type: "text",
      value: "The lines were frenetic and improvisational, revealing an artist experimenting with thought and form. Influenced by Romantic and melancholic Santiniketan traditions, the works became precursors to his later visual language."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/ramachandran-yayati.jpg",
      caption: "A. Ramachandran’s early works revealed a quieter and more intimate artistic language."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/ramachandran-works.jpg",
      caption: "A collector’s edition display of Ramachandran’s early drawings and studies."
    },
    {
      type: "text",
      title: "Raghu Rai’s Trees",
      value: "To my surprise, right after this display, I walked by Raghu Rai’s Trees series. The legendary photojournalist shifted focus from reportage to something quieter—trees as witnesses to human existence."
    },
    {
      type: "text",
      value: "The black-and-white photographs captured vulnerability, memory, and the subtle passage of time."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/raghu-rai-trees.jpg",
      caption: "Raghu Rai’s Trees transformed landscapes into emotional meditations on memory and time."
    },
    {
      type: "text",
      title: "Kanu Gandhi’s Photo Documentary",
      value: "Kanu Gandhi’s intimate documentation of Mahatma Gandhi became another standout moment. Over twelve years, armed only with a Rolleiflex camera, he documented Gandhi’s everyday life under strict conditions: no flash, no posed shots, and no requests for funding."
    },
    {
      type: "text",
      value: "The resulting silver gelatin prints with sepia toning carried the earthy warmth of another era."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/kanu-gandhi-documentary.jpg",
      caption: "Kanu Gandhi’s photographs documented Mahatma Gandhi through quiet and intimate moments."
    },
    {
      type: "text",
      title: "Roger Ballen’s New Colour Works",
      value: "Roger Ballen’s New Colour Works was unsettling in the best way possible. Distorted faces, staged animals, broken instruments, and claustrophobic interiors unfolded in muted blues, yellows, and grey-greens."
    },
    {
      type: "text",
      value: "It felt like European Surrealism reborn within South African realities—a psychological theatre of absurdity and discomfort."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/roger-ballen-colour-works.jpg",
      caption: "Roger Ballen’s surreal interiors blurred the line between fantasy and psychological reality."
    },
    {
      type: "text",
      title: "The Looking Glass",
      value: "Dinabandhu Das’s The Looking Glass (Arshinagar) featured nine photographs arranged in a perfect grid, documenting empty Bengali interiors frozen in time."
    },
    {
      type: "text",
      value: "Using in-camera masks and double exposures, Das removed all traces of human presence, leaving behind eerie architectural stillness."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/dinabandhu-das-looking-glass.jpg",
      caption: "Dinabandhu Das’s The Looking Glass transformed forgotten interiors into surreal architectural studies."
    },
    {
      type: "text",
      title: "Behind the Marquee",
      value: "Ketaki Sheth’s Behind the Marquee became a vivid portal into old Bollywood. The photographs revealed the unfiltered reality behind glamour—film sets, bedrooms, rehearsals, and candid celebrity moments."
    },
    {
      type: "text",
      value: "From Rekha mid-shoot to Amitabh Bachchan across multiple sets, the series captured Bollywood with intimacy rather than spectacle."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/ketaki-sheth-marquee.jpg",
      caption: "Ketaki Sheth’s Behind the Marquee documented the candid realities behind Bollywood glamour."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/ketaki-sheth-bollywood.jpg",
      caption: "The series captured actors and film sets through deeply personal and human moments."
    },
    {
      type: "text",
      title: "The Double",
      value: "Zaam Arif’s The Double featured two oil paintings arranged unusually—one portrait above another dimly lit interior scene. The works explored estrangement, introspection, and emotional disassociation."
    },
    {
      type: "text",
      value: "The references to Albert Camus, Andrei Tarkovsky, and Satyajit Ray deepened the existential undertones of the paintings."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/zaam-arif-the-double.jpg",
      caption: "Zaam Arif’s The Double reflected themes of identity, isolation, and existential thought."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "By the time I walked out of Art Mumbai, my feet aching and my mind buzzing, I realised something: such fairs are all about the conversations that art incites."
    },
    {
      type: "text",
      value: "People smiled at sculptures, paused before paintings, and quietly shifted perspectives while standing in front of someone else’s life’s work."
    },
    {
      type: "text",
      value: "And if this is what Art Mumbai offered in its third edition, I can only imagine what’s coming next for platforms that champion art and design in India."
    },
    {
      type: "text",
      value: "Of course, I’m talking about Design POV India, returning in 2026 at the Jio World Convention Centre from May 15–17. Unlike conventional showcases, it explores how design is personal, intentional, and deeply reflective of its creator."
    },
    {
      type: "text",
      value: "For someone like me, who stood mesmerized in front of Subodh Gupta’s shimmering tongs and Raghu Rai’s quiet trees, the idea of walking through 19 distinct narratives crafted by some of India’s finest design minds feels like the best idea out there."
    }
  ]
},

  {
  type: "blog",
  id: 16,
  slug: "cordkraft-design-studio-laad-5-ahmedabad",
  category: "Design",
  author: "Dyumni Pandit",
  date: "17 May 2021",
  isFeatured: false,
  image: BlogImg16,
  thumbnail: BlogImg16,
  title: "Cordkraft Design Studio’s LAAD-5 in Ahmedabad is a monochrome retreat defined by a handcrafted ceiling mural",
  subtitle: "A monochrome Ahmedabad home where the ceiling becomes the focal point",
  description: "Every room has a characteristic that grounds it. The sofa anchors your gaze. The artwork commands the wall. The rug defines the floor.",
  featuredParagraphs: [
    "Every room has a characteristic that grounds it. The sofa anchors your gaze. The artwork commands the wall. The rug defines the floor.",
    "In Cordkraft Design Studio’s LAAD-5 in Ahmedabad, the most captivating element of the space is the forgotten fifth wall—the ceiling.",
    "A sculpted handcrafted plaster-of-Paris installation transforms the ceiling into the defining artistic gesture of the home."
  ],
  detailedContent: [
    {
      type: "text",
      value: "Every room has a characteristic that grounds it. The sofa anchors your gaze. The artwork commands the wall. The rug defines the floor."
    },
    {
      type: "text",
      value: "However, in Cordkraft Design Studio’s LAAD-5 in Ahmedabad, Gujarat, the most captivating element of the space is the forgotten fifth wall, where eyes rarely wander unless forced upward by a chandelier."
    },
    {
      type: "text",
      value: "The architects challenged the idea that murals belong only on walls, introducing a sculpted handcrafted plaster-of-Paris installation across the ceiling that required weeks of physical labour."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/laad-5-ceiling.jpg",
      caption: "The handcrafted ceiling mural transforms the living room into a sculptural monochrome retreat."
    },
    {
      type: "text",
      title: "The Brief",
      value: "When homeowners approached Cordkraft Design Studio in 2022 for the Vastrapur bungalow, their requests appeared deceptively simple: connect the formal living room to the garden and maintain a subtle colour palette."
    },
    {
      type: "text",
      value: "However, the 370 sq. ft. space concealed technical challenges. The load-bearing structure meant that removing walls demanded careful engineering and structural intervention."
    },
    {
      type: "text",
      value: "Working alongside structural consultants, the architects transformed the space into a 700 sq. ft. volume that seamlessly merges interior and exterior while preserving intimacy when required."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/laad-5-living-room.jpg",
      caption: "The redesigned living space creates a seamless dialogue between the interiors and the garden."
    },
    {
      type: "text",
      title: "The Monochrome Palette",
      value: "With the ceiling taking center stage, the remaining elements assume supporting roles within the composition."
    },
    {
      type: "text",
      value: "Italian marble sweeps dramatically across the flooring, its reflective surface amplifying spatial openness, while lime-washed walls soften the room with matte neutrality."
    },
    {
      type: "text",
      value: "The palette moves fluidly through shades of black, grey, and pearl, creating a restrained yet deeply atmospheric environment."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/laad-5-monochrome.jpg",
      caption: "Muted monochrome tones allow texture, light, and sculptural elements to take prominence."
    },
    {
      type: "text",
      title: "Sculptural Interventions",
      value: "Against the monochromatic shell, sculptural furniture and lighting emerge as artistic interventions. A coiled floor lamp in bronze-copper tones rises dramatically from the dark marble flooring, adding warmth to the otherwise cool palette."
    },
    {
      type: "text",
      value: "Its stacked disc structure creates vertical rhythm, almost behaving like an architectural object rather than a decorative accessory."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/laad-5-lamp.jpg",
      caption: "The sculptural bronze-copper floor lamp introduces warmth and rhythm into the monochrome setting."
    },
    {
      type: "text",
      title: "The Decor",
      value: "A generous grey sectional anchors the seating arrangement, paired with layered coffee tables in marble, wood, and resin that introduce subtle shifts in texture and materiality."
    },
    {
      type: "text",
      value: "Each element contributes intentionally to the room’s visual vocabulary, including the television console, whose circular sculptural forms integrate seamlessly into the larger composition."
    },
    {
      type: "text",
      value: "The home consciously distances itself from excessive luxury trends. Instead of overwhelming abundance, LAAD-5 embraces restraint and intentionality."
    },
    {
      type: "image",
      value: "/temp/magazine/blogs/laad-5-decor.jpg",
      caption: "Layered textures and sculptural furniture create a restrained yet luxurious atmosphere."
    },
    {
      type: "text",
      title: "A Quiet Definition of Luxury",
      value: "Italian marble, bespoke furniture, and labour-intensive craftsmanship are all present throughout the home, but they are never excessive."
    },
    {
      type: "text",
      value: "Instead, Cordkraft Design Studio positions luxury as thoughtful minimalism, creating a home designed for living rather than spectacle."
    },
    {
      type: "text",
      title: "Conclusion",
      value: "LAAD-5 reimagines the role of ceilings within residential design, transforming an often-overlooked surface into the emotional and artistic centerpiece of the home."
    },
    {
      type: "text",
      value: "Through monochrome restraint, sculptural detailing, and carefully curated materiality, Cordkraft Design Studio crafts a retreat where silence, texture, and craftsmanship speak louder than ornamentation."
    }
  ]
},

  {
    "type": "blog",
    "id": 17,
    "slug": "woven-legacy-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": false,
    image: BlogImg16,
    thumbnail: BlogImg17,
    "title": "Woven Legacy brings handcrafted rug traditions into contemporary interiors at Design POV ’26",
    "subtitle": "A Mirzapur-based rug brand redefining handcrafted luxury through materiality and craftsmanship",
    "description": "Rooted in Mirzapur, Woven Legacy creates handmade luxury rugs that bridge traditional weaving techniques with contemporary interior design.",
    "featuredParagraphs": [
      "Woven Legacy brings India’s rug-making heritage into contemporary living spaces through handcrafted luxury rugs.",
      "The brand works closely with designers and homeowners to create rugs rooted in craftsmanship and authenticity.",
      "At Design POV ’26, Woven Legacy joins the conversation around craft, materiality, and Indian design heritage."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Rooted in Mirzapur, Woven Legacy is a participating brand at Design POV India 2026 that brings India's rug-making heritage into contemporary living spaces with clarity and intent."
      },
      {
        "type": "text",
        "value": "The brand crafts handmade luxury rugs that work at the intersection of traditional technique and modern design. Their philosophy is that rugs are the foundation of a well-designed space."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/woven-legacy-1.jpg",
        "caption": "Handcrafted luxury rugs from Woven Legacy bridge the gap between tradition and modern interiors."
      },
      {
        "type": "text",
        "title": "The Pillars of Craftsmanship",
        "value": "Every piece is made by skilled artisans using time-tested methods, developed through close collaboration with designers, architects, and homeowners. The process is guided by four values: craftsmanship, integrity, authenticity, and ambition."
      },
      {
        "type": "text",
        "value": "Woven Legacy works directly with the design community to translate creative briefs into handcrafted pieces that are built to last. Their collections are designed to carry warmth, texture, and character into interiors without overpowering them."
      }
    ]
  },

  {
    "type": "blog",
    "id": 18,
    "slug": "kuche7-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": false,
    image: BlogImg18,
    thumbnail: BlogImg18,
    "title": "Kuche7 explores stainless steel luxury interiors at Design POV ’26",
    "subtitle": "The modular kitchen brand brings precision-engineered stainless steel systems into contemporary living",
    "description": "Kuche7 designs modular kitchens and living systems using 304 food-grade stainless steel engineered for durability and hygiene.",
    "featuredParagraphs": [
      "Kuche7 specialises in modular kitchens and living solutions crafted in stainless steel.",
      "Their systems balance engineering precision with long-term functionality and aesthetics.",
      "At Design POV ’26, the brand will unveil a statement stainless steel island installation."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Kuche7 joins Design POV '26 as a participating brand, bringing their craft of designing modular kitchens and living spaces to the show. Their 304 food-grade stainless steel material choice is deliberate: it's strong, hygienic, and built for long-term use."
      },
      {
        "type": "text",
        "title": "Precision and Hygiene",
        "value": "Stainless steel as a design material carries specific advantages. It doesn't absorb bacteria, holds up over decades, and responds well to precision engineering. Kuche7 builds its product range around these properties, making a case for the material across the broader interior."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/kuche7-island.jpg",
        "caption": "The statement stainless steel island installation at Design POV '26 highlights precision engineering."
      },
      {
        "type": "text",
        "title": "Design Flexibility",
        "value": "With over 20,000 options across colours, finishes, and textures, Kuche7 gives designers and homeowners the room to work within their own aesthetic without having to compromise on material quality."
      }
    ]
  },

  {
    "type": "blog",
    "id": 19,
    "slug": "kstairs-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": false,
    image: BlogImg19,
    thumbnail: BlogImg19,
    "title": "KStairs showcases custom staircase engineering at Design POV ’26",
    "subtitle": "Over two decades of staircase manufacturing and installation expertise comes to the event",
    "description": "KStairs designs and manufactures custom staircases across residential and commercial spaces using advanced CNC fabrication technology.",
    "featuredParagraphs": [
      "KStairs has spent over 21 years designing custom staircases across Maharashtra.",
      "Their work spans floating, helical, curved, cantilever, and spiral staircase systems.",
      "At Design POV ’26, the brand brings together technical precision and design craftsmanship."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Formerly known as Khodiyar Stairs Pvt. Ltd., KStairs has spent over 21 years designing, manufacturing, and installing staircases for residential and commercial spaces across Maharashtra."
      },
      {
        "type": "text",
        "title": "Advanced Fabrication",
        "value": "Their manufacturing facility in Vasai operates with CNC laser cutting and bending machines, giving the team the ability to handle complex installations. Their work covers a range of forms including floating, cantilever, helical, curved, and spiral configurations."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/kstairs-floating.jpg",
        "caption": "KStairs specializes in complex geometries, from helical to floating cantilever systems."
      },
      {
        "type": "text",
        "value": "At Design POV '26, KStairs brings that manufacturing depth into a space where craft, material, and design thinking are in direct conversation."
      }
    ]
  },

  {
    "type": "blog",
    "id": 20,
    "slug": "astronea-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": false,
    image: BlogImg20,
    thumbnail: BlogImg20,
    "title": "Astronea introduces Italian wardrobe systems and precision hardware at Design POV ’26",
    "subtitle": "The Mumbai-based brand combines modular design with international hardware collaborations",
    "description": "Astronea creates premium wardrobe systems and interior solutions through collaborations with leading international hardware brands.",
    "featuredParagraphs": [
      "Astronea specialises in Italian wardrobe concepts and modular interior systems.",
      "The brand collaborates with international hardware manufacturers for precision-engineered solutions.",
      "At Design POV ’26, Astronea will showcase how design and engineering coexist within contemporary interiors."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Astronea is a Mumbai-based interior design brand specialising in Italian wardrobe concepts. The brand's approach sits at the intersection of design intent and functional engineering."
      },
      {
        "type": "text",
        "title": "International Collaborations",
        "value": "A significant part of their offering comes through collaborations with international hardware brands such as Porta Pivot (Belgium), Terno Scorrevoli (Italy), and Effegibrevetti. These partnerships give Astronea access to hardware that directly affects the precision and finish of their installations."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/astronea-wardrobe.jpg",
        "caption": "Modular wardrobe systems featuring precision hardware from international partners."
      },
      {
        "type": "text",
        "value": "At Design POV '26, Astronea will be displaying their work in context, giving architects and designers a direct look at how their systems translate into the final product."
      }
    ]
  },

  {
    "type": "blog",
    "id": 21,
    "slug": "sunrooof-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": true,
    image: BlogImg21,
    thumbnail: BlogImg21,
    "title": "Sunrooof reimagines artificial lighting through sky simulation technology at Design POV ’26",
    "subtitle": "A wellness lighting system designed to recreate natural sunlight indoors",
    "description": "Founded in 2019, Sunrooof creates intelligent ceiling systems that simulate natural daylight using advanced optics and AI integration.",
    "featuredParagraphs": [
      "Sunrooof transforms ceilings into immersive simulations of natural sky and sunlight.",
      "The technology is designed to support circadian rhythms and overall well-being indoors.",
      "At Design POV ’26, the brand presents a new category between lighting, wellness, and interior design."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Founded by Ishat Jain in 2019, Sunrooof is a wellness lighting system that transforms ceilings into a simulation of natural sky. The technology works by recreating the experience of natural sunlight indoors, including in spaces without windows."
      },
      {
        "type": "text",
        "title": "Circadian Support",
        "value": "Using advanced optics and AI integration, the system adjusts colour and brightness to mirror the sky outside in real time. The technology is designed to support circadian rhythms, affecting mood, focus, energy, and overall well-being."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/sunrooof-sky.jpg",
        "caption": "Sky simulation technology recreates the visual and wellness benefits of natural daylight."
      },
      {
        "type": "text",
        "title": "Global Expansion",
        "value": "Sunrooof has completed 500-plus installations across diverse project types within its first ten months. At Design POV '26, the brand brings a product category that addresses how built environments affect the people living in them."
      }
    ]
  },

  {
    "type": "blog",
    "id": 22,
    "slug": "pare-innovations-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": false,
    image: BlogImg22,
    thumbnail: BlogImg22,
    "title": "PARÉ Innovations brings premium surface systems to Design POV ’26",
    "subtitle": "From wall panels to flooring and facade systems, the brand expands material possibilities",
    "description": "PARÉ Innovations develops premium surface materials across ceilings, walls, facades, and flooring applications.",
    "featuredParagraphs": [
      "PARÉ Innovations works across premium wall, ceiling, facade, and flooring systems.",
      "Their catalogue spans acoustic panels, louvres, SPC flooring, and UV-protected facades.",
      "At Design POV ’26, the brand showcases its material systems within a designed spatial context."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Headquartered in Mumbai with a manufacturing unit near Vapi, PARÉ Innovations works in the building materials space, focusing on premium surfaces for ceilings, walls, flooring, and facade systems."
      },
      {
        "type": "text",
        "title": "Material Catalogue",
        "value": "Their product range spans over 35 offerings, including baffle and acoustic panels, louvered configurations, and UV-protected exterior-grade panels. Their flooring line includes LVT, SPC, and HDF options."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/pare-panels.jpg",
        "caption": "Versatile surface systems designed for both interior acoustics and exterior durability."
      },
      {
        "type": "text",
        "value": "At Design POV '26, PARÉ Innovations will give architects and designers a direct look at their surface systems in a designed context."
      }
    ]
  },

  {
    "type": "blog",
    "id": 23,
    "slug": "kubik-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": false,
    image: BlogImg23,
    thumbnail: BlogImg23,
    "title": "Kubik presents demountable partition systems and Porta Lino doors at Design POV ’26",
    "subtitle": "A decade of partition design and installation expertise comes to the event",
    "description": "Kubik designs and installs demountable glass partition systems that support flexible contemporary interiors.",
    "featuredParagraphs": [
      "Kubik has completed over 12,00,000 sq. ft. of partition installations across India.",
      "Their systems focus on flexible interiors that minimise construction disruption and waste.",
      "At Design POV ’26, Kubik brings together partition systems and next-generation door solutions."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Founded by Jimesh Shah, Kubik has spent over a decade designing, manufacturing, and installing demountable partition systems across India, covering over 12,00,000 sq. ft. of glass installations."
      },
      {
        "type": "text",
        "title": "The Porta Lino System",
        "value": "More recently, Kubik has extended into doors with Porta Lino, a next-generation system available in granite, wood, ceramic, and glass finishes. The demountable nature of their partitions allows interiors to be reconfigured without conventional construction waste."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/kubik-partitions.jpg",
        "caption": "Demountable glass partitions offer flexibility for evolving contemporary workspaces."
      },
      {
        "type": "text",
        "value": "At Design POV '26, Kubik brings a product range that speaks directly to how modern commercial and residential interiors are being designed and built."
      }
    ]
  },

  {
    "type": "blog",
    "id": 24,
    "slug": "deluxe-veneers-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": false,
    image: BlogImg24,
    thumbnail: BlogImg24,
    "title": "Deluxe Veneers brings four decades of veneer craftsmanship to Design POV ’26",
    "subtitle": "The factory-owned veneer brand showcases globally sourced natural wood collections",
    "description": "Deluxe Veneers produces A++ grade natural veneers through globally sourced timber and advanced embossing technology.",
    "featuredParagraphs": [
      "Deluxe Veneers has spent over four decades working in natural veneer manufacturing.",
      "Their collections span marquetry, fluted surfaces, dyed veneers, and embossed textures.",
      "At Design POV ’26, the brand showcases veneer craftsmanship within contemporary interiors."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "With over four decades in the industry, Deluxe Veneers is a factory-owned brand working in natural veneers, producing A++ grade surfaces from globally handpicked wood."
      },
      {
        "type": "text",
        "title": "Exclusive Textures",
        "value": "Notably, Deluxe Veneers is the only company in India equipped with heavy embossing machines, allowing them to produce textures and finishes—such as Rilevo Legno and Marquetry—that aren't available elsewhere in the market."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/deluxe-veneers-texture.jpg",
        "caption": "Heavily embossed natural veneers create tactile architectural surfaces."
      },
      {
        "type": "text",
        "value": "Their 6,500 sq. ft. experience centre in Worli allows designers to engage with the collections, which will be showcased in context at Design POV ‘26."
      }
    ]
  },

  {
    "type": "blog",
    "id": 25,
    "slug": "paradigm-quartz-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": false,
    image: BlogImg25,
    thumbnail: BlogImg25,
    "title": "Paradigm Quartz showcases engineered stone innovation at Design POV ’26",
    "subtitle": "Quartz, terrazzo, and artificial marble systems designed for large-format architecture",
    "description": "Paradigm Quartz manufactures engineered stone surfaces across quartz, terrazzo, and artificial marble categories.",
    "featuredParagraphs": [
      "Paradigm Quartz operates dedicated manufacturing plants for engineered stone production.",
      "Their Super Jumbo Quartz slabs respond to the growing demand for large-format surfaces.",
      "At Design POV ’26, the brand presents durability, scale, and material innovation together."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Paradigm Stone India Pvt. Ltd. was established in 2010. Over the past fifteen years, the brand has built out a full engineered stone portfolio covering quartz, artificial marble, and terrazzo."
      },
      {
        "type": "text",
        "title": "Industrial Scale",
        "value": "Their quartz plant runs a monthly production capacity of 3,00,000 sq. ft. The Super Jumbo Quartz slab, introduced in 2022, meets the growing demand for large-format surfaces in contemporary architecture."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/paradigm-stone.jpg",
        "caption": "Super Jumbo Quartz slabs designed for seamless, large-format architectural applications."
      },
      {
        "type": "text",
        "value": "At Design POV '26, Paradigm Quartz brings the depth of a vertically integrated manufacturer into a space where material quality is central."
      }
    ]
  },

  {
    "type": "blog",
    "id": 26,
    "slug": "acespace-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": false,
    image: BlogImg26,
    thumbnail: BlogImg26,
    "title": "Acespace brings a decade of veneer expertise to Design POV ’26",
    "subtitle": "Globally sourced wood veneers crafted for contemporary architectural applications",
    "description": "Acespace develops premium veneer collections for walls, ceilings, furniture, and cabinetry across residential and commercial interiors.",
    "featuredParagraphs": [
      "Acespace creates premium veneer collections sourced from forests across the world.",
      "Their surfaces are designed for architectural and interior applications across multiple scales.",
      "At Design POV ’26, the brand presents natural wood textures within contemporary design contexts."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Celebrating ten years in the industry, Acespace works in premium veneer production, sourcing wood from forests across the world to craft surfaces for high-end applications."
      },
      {
        "type": "text",
        "title": "Pattern and Precision",
        "value": "The range spans exclusive colours and patterns designed to work across walls, cabinets, and furniture. Their focus has been on maintaining consistency while expanding species and finishes available to designers."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/acespace-wood.jpg",
        "caption": "Acespace presents a decade of expertise in natural wood textures and finishes."
      },
      {
        "type": "text",
        "value": "At Design POV '26, Acespace brings a collection that gives the design community a direct look at what natural wood surfaces can bring to contemporary interiors."
      }
    ]
  },

  {
    "type": "blog",
    "id": 27,
    "slug": "embelliish-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": false,
    image: BlogImg27,
    thumbnail: BlogImg27,
    "title": "Embelliish brings luxury soft furnishings and drapery expertise to Design POV ’26",
    "subtitle": "The Mumbai and Hyderabad-based brand specialises in premium curtains and upholstery",
    "description": "Embelliish develops luxury curtains, upholstery, blinds, and soft furnishing systems for residential and hospitality interiors.",
    "featuredParagraphs": [
      "Embelliish works across curtains, upholstery, and luxury window treatments.",
      "The brand focuses on material specificity, texture, and custom detailing.",
      "At Design POV ’26, Embelliish explores how soft furnishings shape interior atmospheres."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Led by Hitesh and Neelam Bhanushali, Embelliish works in luxury curtains and soft furnishings with flagship stores in Mumbai and Hyderabad."
      },
      {
        "type": "text",
        "title": "Material Specificity",
        "value": "The brand's approach is distinguished by the level of specificity applied to fabric selection. Every weave and detail is chosen with the finished interior in mind, covering everything from classic drapery to automated blind systems."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/embelliish-fabrics.jpg",
        "caption": "Luxury curtains and soft furnishings that define the atmospheric quality of a space."
      },
      {
        "type": "text",
        "value": "At Design POV '26, Embelliish explores how soft furnishings shape interior atmospheres through material quality and custom detailing."
      }
    ]
  },

  {
    "type": "blog",
    "id": 28,
    "slug": "kajaria-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": true,
    image: BlogImg28,
    thumbnail: BlogImg28,
    "title": "Kajaria joins Design POV ’26 as Presenting Partner",
    "subtitle": "India’s largest tile manufacturer brings over three decades of surface innovation to the event",
    "description": "Kajaria operates nine manufacturing plants across India, producing ceramic and vitrified tile collections for residential and commercial applications.",
    "featuredParagraphs": [
      "Kajaria joins Design POV ’26 as the event’s Presenting Partner.",
      "The brand produces over 4,000 tile designs across ceramic and vitrified categories.",
      "At Design POV ’26, Kajaria presents large-format surfaces and evolving material applications."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Founded in 1985, Kajaria is India's largest manufacturer of ceramic and vitrified tiles, operating nine plants with an annual capacity of 87.80 million square metres."
      },
      {
        "type": "text",
        "title": "Evolving Formats",
        "value": "Their Eternity range, which includes extra-large vitrified slabs, reflects a direct response to the growing demand for large-format surfaces. The portfolio covers over 4,000 designs exported to 25 countries."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/kajaria-slabs.jpg",
        "caption": "Kajaria's extra-large vitrified slabs represent the next evolution in surface innovation."
      },
      {
        "type": "text",
        "value": "At Design POV '26, Kajaria's presence will extend across the event, engaging designers with a brand that has shaped Indian spaces for three decades."
      }
    ]
  },

  {
    "type": "blog",
    "id": 29,
    "slug": "pacific-homes-design-pov-2026",
    "category": "Spotlight",
    "author": "Design POV Editorial",
    "date": "08 May 2026",
    "isFeatured": true,
    image: BlogImg29,
    thumbnail: BlogImg29,
    "title": "Pacific Homes powers Design POV ’26 with engineered stone and surface innovation",
    "subtitle": "The exporter showcases Super Jumbo slabs and globally sourced stone collections",
    "description": "Pacific Homes manufactures quartz, granite, and engineered stone slabs using Bretonstone technology for architectural applications.",
    "featuredParagraphs": [
      "Pacific Homes joins Design POV ’26 as the powering partner of the event.",
      "Their product portfolio spans quartz, granite, exotic stones, and engineered surfaces.",
      "At Design POV ’26, the brand showcases material innovation through large-format slab systems."
    ],
    "detailedContent": [
      {
        "type": "text",
        "value": "Design POV '26 is powered by Pacific Homes, whose manufacturing facility runs on Bretonstone technology, producing full-body Super Jumbo slabs."
      },
      {
        "type": "text",
        "title": "Technological Edge",
        "value": "The portfolio covers quartz, granite, and rare exotic stones sourced globally. A recent addition is CHROMIA, a slab enhancement technology developed in-house that extends design possibilities within their range."
      },
      {
        "type": "image",
        "value": "/temp/magazine/blogs/pacific-homes-quartz.jpg",
        "caption": "Full-body Super Jumbo slabs provide architectural scale and material durability."
      },
      {
        "type": "text",
        "value": "As the powering partner, Pacific Homes brings their stone and engineered surface range on display for architects and homeowners attending the event."
      }
    ]
  }
];

export const advertisements: Ad[] = [
  { type: "ad", id: "ad-1", image: "/temp/ads/3.png", aspect: "aspect-[3/4]" },
  { type: "ad", id: "ad-2", image: "/temp/ads/4.png", aspect: "aspect-square" }
];