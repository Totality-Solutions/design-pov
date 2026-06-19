export interface Trigger {
  phrase: string;
  type: "redirect" | "form";
  url?: string;
  formId?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  triggers?: Trigger[];
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    category: "General",
    items: [
      {
        question: "What is Design POV?",
        answer: "Design POV is a curated platform that brings together architecture, interiors, art, material innovation, and cultural dialogue through immersive spatial experiences and collaborations."
      },
      {
        question: "When and where is Design POV '27 taking place?",
        answer: "Design POV '27 will take place from 02-04 May 2027 at Jio World Convention Centre. Show timings are from 11am to 8pm on all three days."
      },
      {
        question: "Who is Design POV for?",
        answer: "The platform is designed for architects, interior designers, artists, brands, developers, hoteliers, restaurateurs, homeowners, collectors, design students, and anyone interested in how design shapes lived experiences."
      },
      {
        question: "Is Design POV only for design professionals?",
        answer: "Not at all. While the platform is rooted in the design industry, it is equally relevant for homeowners, business owners, hospitality professionals, and culturally curious design enthusiasts."
      },
      {
        question: "How can I purchase tickets?",
        answer: "Tickets can be purchased directly through the website. Multiple pass categories and pricing tiers are available.",
        triggers: [{ phrase: "website", type: "redirect", url: "https://tktplz.events/gjdlb5-design-pov" }]
      },
      {
        question: "What can I expect at the show?",
        answer: "Visitors can experience immersive Core spaces, brand pavilions, installations, conversations, launches, Objects, editorial programming, art and invite-only events across the three days."
      },
      {
        question: "Is Design POV limited to architecture and interiors?",
        answer: "No. While architecture and spatial design form the foundation of the platform, Design POV is intentionally multidisciplinary and extends into art, craft, fashion, culture, and adjacent creative practices."
      },
      {
        question: "Are tickets refundable?",
        answer: "Tickets once purchased are non-refundable and non-transferable."
      },
      {
        question: "Will there be invite-only events?",
        answer: "Yes, certain experiences, launches, tastings, and networking events during the show will be accessible only through curated invitations."
      }
    ]
  },
  {
    category: "The Core",
    items: [
      {
        question: "What is The Core?",
        answer: "The Core is the central spatial showcase at Design POV, featuring architecture and design studios interpreting the annual theme through fully realised environments."
      },
      {
        question: "How are Core studios selected?",
        answer: "Studios are curated based on their body of work, perspective, approach to spatial storytelling, and alignment with the edition's vision."
      },
      {
        question: "Can I apply to be part of The Core?",
        answer: "Yes. Applications for future editions can be submitted through the Collaborate page on the website. Alternatively, you can click here to apply.",
        triggers: [
          { phrase: "Collaborate page", type: "redirect", url: "/collaborate" },
          { phrase: "click here to apply", type: "form", formId: "core-form" }
        ]
      }
    ]
  },
  {
    category: "Brands & Participation",
    items: [
      {
        question: "How can my brand participate in Design POV?",
        answer: "Brands can participate through collaborations with Core studios, experiential installations, sponsorships, launches, and ecosystem initiatives like POV Objects.",
        triggers: [
          { phrase: "POV Objects", type: "form", formId: "participate-form" }
        ]
      },
      {
        question: "Do participating brands only receive booth space?",
        answer: "No. Design POV is structured around contextual integration and collaboration, allowing brands to become part of larger narratives and experiences across the platform."
      },
      {
        question: "Are there marketing and amplification opportunities available for brands?",
        answer: "Yes. Participating brands can access additional media, influencer, editorial, outdoor, and content opportunities through Design POV's extended ecosystem and partner network."
      }
    ]
  },
  {
    category: "Sponsorships & Collaborations",
    items: [
      {
        question: "How can I become a sponsor?",
        answer: "Sponsorship enquiries can be submitted through the Collaborate page. Opportunities range from presenting partnerships to experiential integrations and curated programming.",
        triggers: [
          { phrase: "Collaborate page", type: "form", formId: "sponsorship-form" }
        ]
      },
      {
        question: "Can brands collaborate on custom experiences or installations?",
        answer: "Yes. We actively encourage collaborative and concept-led integrations that align with the larger vision of the platform."
      },
      {
        question: "What is POV Elevate?",
        answer: "POV Elevate is an extension of Design POV, accessible only to brands already a part of the show's ecosystem. It is designed to help brands create meaningful visibility beyond the show floor through curated events, launches, conversations, and strategic collaborations.",
        triggers: [
          { phrase: "POV Elevate", type: "redirect", url: "/ecosystem/elevate" }
        ]
      },
      {
        question: "How are artists and galleries integrated into the platform?",
        answer: "Depending on the edition and curatorial direction, collaborations may take the form of installations, exhibitions, Objects, conversations, spatial interventions, or interdisciplinary partnerships."
      }
    ]
  },
  {
    category: "Media",
    items: [
      {
        question: "How can media publications partner with Design POV?",
        answer: "Media houses, editorial platforms, and content creators can reach out through the Collaborate page for partnerships, coverage, walkthroughs, and editorial collaborations.",
        triggers: [
          { phrase: "Collaborate page", type: "form", formId: "media-enquiry-form" }
        ]
      },
      {
        question: "Can creators and influencers attend the show?",
        answer: "Yes. A curated set of creators across architecture, lifestyle, art, and culture are invited to experience and document the platform each year."
      },
      {
        question: "Who do I contact for collaborations or enquiries?",
        answer: "All participation, sponsorship, media, and collaboration enquiries can be submitted through the Collaborate page on the website.",
        triggers: [
          { phrase: "Collaborate page", type: "redirect", url: "/collaborate" }
        ]
      }
    ]
  },
  {
    category: "Circle & Programming",
    items: [
      {
        question: "What is The Circle?",
        answer: "The Circle is Design POV's live programming platform featuring panel discussions, fireside chats, and cultural conversations across design and adjacent creative industries.",
        triggers: [
          { phrase: "The Circle", type: "redirect", url: "/edition/schedule" }
        ]
      },
      {
        question: "Can I apply to speak at Circle?",
        answer: "Yes. Speaker and programming recommendations can be submitted for consideration by the curatorial team. Click here to apply.",
        triggers: [
          { phrase: "Click here to apply", type: "form", formId: "circle-form" }
        ]
      }
    ]
  },
  {
    category: "Objects & Magazine",
    items: [
      {
        question: "What are POV Objects?",
        answer: "POV Objects is a curated initiative inviting architects, designers, artists, and makers to create original objects, collaboratively, responding to the edition's theme.",
        triggers: [
          { phrase: "POV Objects", type: "redirect", url: "/ecosystem/objects" }
        ]
      },
      {
        question: "What is the Design POV Magazine?",
        answer: "The magazine is an editorial extension of the platform featuring stories, interviews, perspectives, and conversations from across the design ecosystem. Have a submission? Click here to apply.",
        triggers: [
          { phrase: "Click here to apply", type: "form", formId: "magazine-form" }
        ]
      }
    ]
  },
  {
    category: "Practical Information",
    items: [
      {
        question: "Are children allowed?",
        answer: "Yes, children under the age of 12 can enter without a pass, however those over will need a ticket to enter."
      },
      {
        question: "Is parking available at the venue?",
        answer: "Yes, paid self-parking is available at Jio World Centre for the duration of the show. You can drive in from Gate 11 for four-wheelers and Gate 5 for two-wheelers. To enter, vehicles must pass a security check."
      },
      {
        question: "Is the venue wheelchair accessible?",
        answer: "Jio World Convention Centre offers smooth, step-free entry points and wide pathways that make navigation easy for attendees using wheelchairs, mobility aids, or prams. The venue is designed to be fully wheelchair accessible, with step-free entry and exit points across all major areas."
      }
    ]
  }
];

export default faqData;