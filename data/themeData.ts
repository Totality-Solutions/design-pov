// DEFAULT SEED DATA — migrated to Supabase `studios` table.
// The app fetches studios from the database; these arrays exist for seeding only via /api/cms/seed-studios.
// Do not import coreData or themeData in frontend components.
import { cdn } from "@/lib/cdn";
export type CoreItem = {
  id: string;
  src: string;
  label: string;
  architects?: string[];
  description: string;
  additionalImages?: string[];
  logo: string;
  website: string;
  instagram: string;
};

export const themeData: CoreItem[] = [
  {
    id: "01",
    src: cdn("/temp/home/core/Abin.jpg"),
    label: "Abin Design Studio",
    architects:[
      "Abin Chaudhury"
    ],
    description: "In today’s context of compressed urban living—where apartments are multifunctional and the boundary between inside and outside has become a luxury—the courtyard garden feels almost radical, even utopian. Yet Abin Design Studio treats it not as an exception, but as an essential gesture, where even the smallest courtyard—a shaft of sky, a potted garden, or a narrow green threshold—carries the same soulfulness. Scale does not diminish its impact; a single tree can still hold the centre, inviting pause, orientation, and the feeling of place over mere room. The pavilion quietly asserts that the soul of a space is defined not by its square footage, but by the quality of connection it offers.",
    // additionalImages: [
    //   "/temp/home/core/ABIN_1.jpg",
    // ],
    logo: cdn("/temp/edition/core-logo/ads.png"),
    website: "https://www.abindesignstudio.com/",
    instagram: "https://www.instagram.com/abindesign_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },

  {
    id: "02",
    src: cdn("/temp/home/core/ADND.jpg"),
    label: "ADND",
    architects:[
      "Anand Menon",
      "Shobhan Kothari"
    ],
    description: "Antaraal by ADND is an architectural pause—an act of disobedience that resists continuity, function, and permanence. Positioned between sense and sensibility, it inhabits the fleeting interval where perception slows and awareness begins. Two curved earthen forms rise without meeting, holding a central void that cannot be defined or possessed. Built from stacked kulhads—objects of momentary use—the pavilion transforms the disposable into the structural, embracing fragility, memory, and time. Porous and unfinished, it allows light and air to move freely, existing in a constant state of becoming and dissolving. Antaraal does not seek occupation; it compels stillness, inviting visitors to linger in hesitation, and in doing so, reimagines architecture as something transient, sensory, and fully alive.",
    // additionalImages: [
    //   "/temp/home/core/ADND_1.jpg",
    // ],
    logo: cdn("/temp/edition/core-logo/adnd.png"),
    website: "https://www.adnd.in/",
    instagram: "https://www.instagram.com/adnd_studio/"
  },
  

  {
    id: "03",
    src: cdn("/temp/home/core/ALARA STUDIO.jpg"),
    label: "Alara Studio",
    architects:[
      "Amrita Thomas"
    ],
    description: "The Inhabited Void by Alara Studio reinterprets the traditional South Indian courtyard as a contemporary living space shaped not by walls, but by atmosphere. Anchored in the idea that emptiness can hold memory, ritual, and time, the design places a shallow water body at its core, creating a calming acoustic and emotional centre. In line with Sense & Sensibility, the space engages all five senses through filtered light, natural materials like teak and Kadappa stone, the scent of native flowers, and the gentle sound of water. Vintage artefacts and handcrafted details add layers of lived history, bridging past and present. Rather than a static room, it becomes a sensory landscape where the void connects, holds, and quietly brings the space to life.",
    // additionalImages: [
    //   "/temp/home/core/ALARA_1.jpg",
    // ],
    logo: cdn("/temp/edition/core-logo/alara.png"),
    website: "https://www.alarastudio.in/",
    instagram: "https://www.instagram.com/alarastudio/"
  },

  {
    id: "04",
    src: cdn("/temp/home/core/BALDIWALA EDGE.jpg"),
    label: "Baldiwala Edge",
    architects:["Ali Baldiwala"],
    description: "The exhibition frames life as an emotional spectrum, unfolding through colour, darkness, and calm. A sequence of immersive spaces—a vibrant market, a contemplative courtyard, and a serene tea haven—captures the coexistence of energy, introspection, and peace. Rooted in Sense & Sensibility, fashion, art, and interiors become expressive mediums of theatre and versatility, while the booth itself offers a visual pause within the larger exhibition—inviting visitors to slow down, engage, and experience the layered rhythms where intensity and stillness exist in balanced, maximal beauty.",
    // additionalImages: [
    //   "/temp/home/core/BALDIWALA_logo.jpg",
    // ],
    logo: cdn("/temp/edition/core-logo/baldiwala.png"),
    website: "https://baldiwalaedge.com/",
    instagram: "https://www.instagram.com/baldiwala_edge?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },

  {
    id: "05",
    src: cdn("/temp/home/core/CITYSPACE.png"),
    label: "Cityspace’82 Architects",
    architects:["Sumit Dhawan"],
    description: "Brew & Breathe is a sensory coffee pavilion designed as a moment of pause within the exhibition. Anchored by bamboo structures and softened with suspended greenery, the space centers around a reflective water element that captures light and movement above. The aroma of coffee, the texture of natural materials, and the play of reflections come together to create a calming, immersive environment encouraging visitors to slow down, engage their senses, and simply breathe.",
    // additionalImages: [
    //   "/temp/home/core/CITYSPACE_1.jpg",
    // ],
    logo: cdn("/temp/edition/core-logo/cityspace82.png"),
    website: "https://www.cityspace82.com/",
    instagram: "https://www.instagram.com/cityspace82_architects/"
  },

  {
    id: "06",
    src: cdn("/temp/home/core/DESIGN HEX.jpg"),
    label: "Design Hex",
    architects:["Shimona Bhansali"],
    description: "Before a person becomes aware of space, they become aware of feeling. A shift in air. The softness of light. The silence between sounds. Where Time Bends, a spatial installation by DesignHex for DesignPOV, is conceived as an exploration of that invisible threshold where architecture begins to affect human consciousness. The space investigates how sensory environments can distort our perception of time, dissolving the rigidity of past, present, and future into a singular, immersive now. Through a careful orchestration of tactility, reflection, atmosphere, fragrance, and emotional stillness, the space invites the body to slow down and fully arrive within itself. Rather than replicating nature literally, it distills its emotional essence, fluidity, calm, depth, and silence. Existing somewhere between sanctuary and dreamscape, Where Time Bends proposes a future where interiors are designed not only to shelter the body, but to recalibrate the mind.",
    // additionalImages: [
    //   "/temp/home/core/DESIGNHEX_1.jpg",
    // ],
    logo: cdn("/temp/edition/core-logo/design-hex.png"),
    website: "https://www.designhex.in/",
    instagram: "https://www.instagram.com/design_hex/"
  },

  {
    id: "07",
    src: cdn("/temp/home/core/DSP DESIGN.jpg"),
    label: "DSP Design",
    architects:["Bimal Desai", "Mehul Shah", "Yatin Patel"],
    description: "The DSP pavilion creates a rare kind of darkness that reveals rather than conceals, drawing visitors into a deeply atmospheric bar lounge defined by quiet intensity and sensory richness. The space unfolds as a layered, intimate experience—centred around a circular arrangement of burnished red velvet seating that encourages stillness and inward focus—while a softly glowing bar and carefully diffused lighting establish a warm, ember-like ambience. Overhead, a constellation-like ceiling and fluid sculptural form emit a refracted glow, adding a sense of presence rather than direct illumination. Tactile walls woven with natural fibres, pigments, and subtle irregularities absorb sound and light, revealing depth gradually, while reclaimed materials and restrained finishes reinforce a sense of quiet longevity. Through controlled light, softened surfaces, and immersive materiality, the pavilion expands and contains space simultaneously, creating an environment where time slows and the experience lingers well beyond the moment.",
    // additionalImages: [
    //   "/temp/home/core/DSP_1.jpg",
    // ],
    logo: cdn("/temp/edition/core-logo/dsp.png"),
    website: "https://www.dspdesign.co/home.php",
    instagram: "https://www.instagram.com/dspdesignassociates/"
  },

  {
    id: "08",
    src: cdn("/temp/home/core/JANNAT VASI.jpg"),
    label: "Jannat Vasi Design",
    architects:["Jannat Vasi"],
    description: "Edition by Jannat Vasi Design reflects the studio’s philosophy of perceiving, understanding, and constructing form in space through a confluence of architecture, interiors, and bespoke product design. Centred on the user, the concept manifests as an immersive lounge framed by an expansive architectural promenade that creates a dynamic visual journey with constantly shifting perspectives. A cool monochromatic palette is balanced against a warm wooden shell, where the brutalist expression of the shelving system contrasts with the soft curves of the ramp and plush, rounded furniture. Rooted in experience and wellness, the design is guided by how people move, interact, and feel, with every material, colour, and light source chosen deliberately. By blurring the boundaries between form, furniture, light, and art, the space becomes a sensory sanctuary that bridges modern structures with timeless interiors—defining the studio’s vision.",
    // additionalImages: [
    //   "/temp/home/core/JANNAT_1.jpg",
    // ],
    logo: cdn("/temp/edition/core-logo/jannat-vasi.png"),
    website: "https://www.jannatvasi.com/",
    instagram: "https://www.instagram.com/jannatvasiinteriordesign/"
  },

  {
    id: "09",
    src: cdn("/temp/home/core/NA ARCHITECT.jpg"),
    label: "NA Architects",
    architects:["Niroop Reddy", "Rupana Reddy"],
    description: "The Oasis Suite is conceived as a liminal desert retreat that emerges like a mirage shaped by wind and time, defined by sand-toned spherical volumes that form a continuous, carved mass where structure and space dissolve. This geological-like enclosure connects deeply to the dunes while giving rise to fluid interiors organized as a gradient from private to collective zones. Movement is seamless and intuitive, guided by curvature, compression, and flowing spatial transitions rather than fixed circulation. Carefully placed apertures and two arches frame vistas that blur interior and horizon, creating a total environment where light, form, and material merge into a sensorial continuum, redefining luxury as effortless inhabitation.",
    // additionalImages: [
    //   "/temp/home/core/NA_1.jpg",
    // ],
    logo: cdn("/temp/edition/core-logo/na-arch.png"),
    website: "https://www.naarchitects.net/",
    instagram: "https://www.instagram.com/na_architects/"
  },

  {
    id: "10",
    src: cdn("/temp/home/core/POONAM AKASH.jpg"),
    label: "Poonam Akash",
    architects:["Poonam Mehta", "Akash Mehta"],
    description: "Brahm challenges the illusion that luxury in India is defined by imported aesthetics, instead reclaiming it as something deeply rooted in the country’s own craft, materiality, and cultural memory. Aligned with Sense & Sensibility, the installation engages the senses through texture, colour, fragrance, sound, and artisanal detail, while fostering a deeper awareness that true luxury lies in authenticity and emotional connection. Rather than a visual showcase, it invites visitors to experience and feel India—reframing heritage not as past, but as a living expression of contemporary luxury.",
    // additionalImages: [
    //   "/temp/home/core/POONAM_1.jpg",
    // ],
    logo: cdn("/temp/edition/core-logo/poonam-akash.png"),
    website: "https://poonamakash.com/",
    instagram: "https://www.instagram.com/ampm_designs/"
  },

  {
    id: "11",
    src: cdn("/temp/home/core/SANJAY PURI.jpg"),
    label: "Sanjay Puri Architects",
    architects:["Ayesha Puri"],
    description: "Flower Shop by Sanjay Puri Architects reimagines the transient Indian street florist as a lasting sensory environment where emotion, memory, and material converge. Rooted in Sense & Sensibility, the space layers tactile terrazzo, tiled pedestals, and stepped platforms from which flowers seem to grow, dissolving the boundary between display and architecture. A perforated coloured-glass wall transforms light into shifting hues that wash the interior, making the space as temporal as the blooms it holds. Here, intuition meets innovation—where colour uplifts, texture grounds, and light becomes material—turning a simple act of buying flowers into an immersive, ever-evolving sensory experience.",
    // additionalImages: [
    //   "/temp/home/core/SANJAYPURI_1.jpg",
    // ],
    logo: cdn("/temp/edition/core-logo/sanjay-arch.png"),
    website: "https://sanjaypuriarchitects.com/",
    instagram: "https://www.instagram.com/sanjay_puri_architects/"
  },

  {
    id: "12",
    src: cdn("/temp/home/core/SAV.jpg"),
    label: "SAV",
    architects:["Amita Kulkarni", "Vikrant Tike"],
    description: "Memory in Space frames the design as a multi-sensory experience, encouraging engagement through sound, touch, light, and atmosphere so that memories are felt rather than simply seen. Chromatic Horizon explores the sensorial quality of the horizon as a moment where sun, sky, and earth dissolve into shifting fields of colour and light. OFEK explores a sensorial experience of the horizon through the interplay of color, light, and reflection, where textures and reflective surfaces transform the space into an immersive field of changing tones, inviting viewers to experience an atmosphere where perception, emotion, and light converge.",
    // additionalImages: [
    //   "/temp/home/core/SAV_1.jpg",
    // ],
    logo:cdn("/temp/edition/core-logo/sav.png"),
    website: "https://www.studioamitavikrant.com/",
    instagram: "https://www.instagram.com/studioamitavikrant/"
  },

  {
    id: "13",
    src: cdn("/temp/home/core/SHROFFLEON.jpg"),
    label: "Shroffleón",
    architects:["Kayzad Shroff", "Maria Isabel Jimenez Leon"],
    description: "The Curated Continuum presents a dialogue between modern minimalism and historical opulence, exploring the intersection of ephemeral event design and timeless craftsmanship. Anchored by a winding, opulent dining table that snakes through the space, it creates an organic flow that invites tactile exploration. A tension in texture emerges as sharp, sterile white serpentine displays act as a canvas for intricate antique Persian rugs, contrasting the industrial present with artisanal history. Overhead, a singular halo of globes casts a soft, diffused light that grounds the space and draws focus to curated vessels below, while mirrors extend the experience—reflecting forms and lighting to create an illusion of infinite geometry. As visitors move, these reflections shift, offering layered perspectives and kinetic depth, transforming the room into a boundless field where craftsmanship is amplified from every angle. In doing so, the space rejects the frantic pace of modern retail in favor of a more ceremonial, contemplative atmosphere.",
    // additionalImages: [
    //   "/temp/home/core/SHROFFLEON_1.jpg",
    // ],
    logo:cdn("/temp/edition/core-logo/shroffleon.png"),
    website: "https://shroffleon.com/",
    instagram: "https://www.instagram.com/shroffleon/"
  },

  {
    id: "14",
    src: cdn("/temp/home/core/SPARC DESIGN.jpg"),
    label: "Sparc Design",
    architects:["Suhani Lal Sanghra", "Vikram Sanghra"],
    description: "The space is conceived as a sensorial home anchored around a central court—an emotional nucleus of pause, reflection, and gathering. Wrapped in a powder blue envelope inspired by sky and sea, it evokes calm, openness, and fluidity. At its heart, a rotating sculptural volume introduces movement, revealing shifting colours and textures that invite touch and discovery, while a centrally placed gong anchors the space with a resonant acoustic presence. Rooted in Sense & Sensibility, the design engages sight, touch, sound, and spatial intuition to move beyond visual display into a deeper, immersive experience—one that asks visitors to feel space as much as see it.",
    // additionalImages: [
    //   "/temp/home/core/SPARC_1.jpg",
    // ],
    logo:cdn("/temp/edition/core-logo/sparc-design.png"),
    website: "https://sparcdesign.co.in/",
    instagram: "https://www.instagram.com/sparcdesignofficial/"
  },

  {
    id: "15",
    src: cdn("/temp/home/core/STUDIO ARCHOHM.jpg"),
    label: "Studio Archohm",
    architects:["Kunal Savarkar","Sourabh Gupta","Mridu Sahai"],
    description: "The Self, Unfolding explores how moments of friction, interruption, and detour make spatial experiences truly memorable by reframing perception. It manifests as a continuously revealing ground of shifting levels—inclines, pauses, and departures—that choreograph both bodily movement and mental engagement. At its core, the stair transcends its functional role, framing paths and views while enabling multiple modes of inhabitation: ascent for panoramic perspectives, pauses for interaction, and moments of solitude. Three trajectories emerge—collective, purposeful, and introspective—shaping varied experiences within the same form. Surrounding this, a restrained palette of absorbing blacks and grounding metals is punctuated by a singular red that flows through the pavilion, guiding movement and intent. As a deliberate and disruptive insert, the project creates space for engagement and introspection, ultimately reframing views, perspectives, and thought.",
    // additionalImages: [
    //   "/temp/home/core/ARCHOHM_1.jpg",
    // ],
    logo:cdn("/temp/edition/core-logo/archohm.png"),
    website: "https://www.archohm.com/",
    instagram: "https://www.instagram.com/archohm/"
  },

  {
    id: "16",
    src: cdn("/temp/home/core/TALATI & PARTNER.jpg"),
    label: "Talati & Partners",
    architects:["Nistas Sanga"],
    description: "The design creates a transitional threshold between outdoors and indoors that is not a passage but a destination in itself, slowing visitors down and heightening awareness through sensory engagement. A solid, earthy outer shell builds curiosity and contrast, leading into a calm, immersive courtyard-like space that shifts the experience from the noise of the exhibition to a more introspective and tactile setting. This courtyard acts as a sensory buffer, blurring built and natural boundaries as light, material, and spatial sequencing shape perception. In this language, “sense” refers to perception of space, while “sensory” refers to how it is felt and experienced.",
    // additionalImages: [
    //   "/temp/home/core/TALATI_1.jpg",
    // ],
    logo:cdn("/temp/edition/core-logo/talati-partners.png"),
    website: "https://talatiandpartners.com/",
    instagram: "https://www.instagram.com/talatiandpartners/"
  }
];
