/* =====================================================================
   SITE DATA — this file is the single source of truth for content.
   To add a project: append one object to PROJECTS.
   To add a category (e.g. "Personal" or "Research"): append one object
   to CATEGORIES — the tab, its count and its blurb appear automatically.
   Nothing in index.html / main.js needs to change.
   ===================================================================== */

const SITE = {
  name: "Jack Lundholm",
  identity: "Engineering Physics Student @ UBC",
  tagline: "From submarine propellers to water-treatment plants — I like designing things that have to actually work.",
  email: "lundholmje@gmail.com",
  linkedin: "https://www.linkedin.com/in/jack-lundholm-3223a131a",
  github: "https://github.com/JackLundholm",
  resume: "resume/Jack-Lundholm-Resume.pdf",
  subc: "https://subc.ca",
};

const CATEGORIES = [
  {
    id: "exp",
    label: "EXP",
    name: "Work Experience",
    blurb: "Two summers as an infrastructure & transport engineering student at EXP, a consulting firm in northern Ontario — drafting, modeling and design support on 20+ contracted projects. Of note: As I was under an NDA, none of the included graphics include finished products given to clients or actual project specific information. Additionally, all Electra related graphics are publicly available due to additional NDA constraints.",
  },
  {
    id: "school",
    label: "School",
    name: "Coursework at UBC",
    blurb: "Selected coursework and extended-learning projects: engineering graphics, CAD rendering and printed-circuit-board design.",
  },
  {
    id: "subc",
    label: "SUBC",
    name: "UBC Submarine Design Team",
    blurb: "UBC’s human-powered submarine team — propulsion design, composites manufacturing and racing at the European International Submarine Races.",
  },
];

/* Fields:
   id, title, category (CATEGORIES id), coverImage, summary (one line),
   description (array of paragraphs), role, tools[], timeframe,
   images[] ({type, src, thumb, alt, caption} — type is "image" (default),
             "video" (plays inline in the gallery) or "pano" (drag-to-look
             360° panorama)), links[] ({label, url}),
   presentation ({src, caption} — a video that auto-plays in its own
             section of the popout)   */

const PROJECTS = [
  // ------------------------------------------------ EXP
  {
    id: "water-treatment-plant",
    title: "Water Treatment Plant Design",
    category: "exp",
    coverImage: "images/covers/water-treatment-plant.jpg",
    summary: "3D plant model and P&ID deliverables for a contracted municipal water treatment facility.",
    description: [
      "As part of EXP’s summer team I produced a Plant 3D model of the Val Rita water treatment plant. This consisted of referencing process and instrumentation diagrams and executing pipe design to follow guidelines, avoid water hammers, minimize pipe degredation and minimize piping cost.",
      "Every iteration went through review rounds with senior engineers, who would aprove sections or discuss areas tbat require improvement. The full water treatment plant design and drawing set was eventually shipped to the client, although it is currently on backlog.",
        "This project gave me a tast of pipe routing and plant design, that I would eventually fully explore on Electra."
    ],
    role: "Summer engineering student — modeling & drafting",
    tools: ["AutoCAD Plant 3D", "AutoCAD"],
    timeframe: "Summer 2025 · EXP, New Liskeard, ON",
    images: [
      { src: "images/detail/water-treatment-plant-1.jpg", thumb: "images/thumbs/water-treatment-plant-1.jpg", alt: "3D model of the water treatment facility in AutoCAD Plant 3D, showing tanks and piping", caption: "3D plant model — process equipment and piping runs" },
      { src: "images/detail/water-treatment-plant-2.jpg", thumb: "images/thumbs/water-treatment-plant-2.jpg", alt: "Piping and instrumentation diagram sheet for the water treatment facility", caption: "P&ID sheet issued for client review" },
    ],
    links: [],
  },
  {
    id: "process-infrastructure",
    title: "Electra Cobalt Sulphate Processing Plant",
    category: "exp",
    coverImage: "images/covers/process-infrastructure.jpg",
    summary: "Design support for process infrastructure at cobalt sulphate plant.",
    description: [
      "For most of my role during the summer of 2026 I contriubted to design and project management work for Electra's Northern Ontario battery materials processing plant. This work mainly included pipe routing and design work, 3D modelling and isometric drawing creation.",
        "As per Electra's website, this hydrometallurgical facility is the only facility of its kind in North America. It will supply the electric vehicle market with cobalt sulfate, and has an operating history of previously producing cobalt carbonate and nickel carbonate. The full capcity of the plant would produce enough cobalt sulphate to supply over 1 million EVs each year.",
        "I worked effectively with large teams of engineers to hit tight deadlines and get piping designs ready for the contractors on the ground at site."
    ],
    role: "Summer engineering student — drafting & design support",
    tools: ["AutoCAD", "Plant 3D", "Navisworks"],
    timeframe: "Summer 2026 · EXP",
    images: [
      { src: "images/detail/process-infrastructure-1.jpg", thumb: "images/thumbs/process-infrastructure-1.jpg", alt: "Aerial view of a processing facility surrounded by forest", caption: "Site of the processing facility" },
      { src: "images/detail/process-infrastructure-2.jpg", thumb: "images/thumbs/process-infrastructure-2.jpg", alt: "Wide banner view of the Ontario refinery site", caption: "Ontario refinery site — wide view" },
      { src: "images/detail/process-infrastructure-3.jpg", thumb: "images/thumbs/process-infrastructure-3.jpg", alt: "Wide banner view of the processing plant", caption: "Plant overview" },
      { type: "pano", src: "images/pano/process-infrastructure-360.jpg", thumb: "images/pano/process-infrastructure-360.jpg", alt: "Interactive 360 degree panorama of the processing facility", caption: "360° panorama — drag to look around, scroll to zoom" },
    ],
    links: [],
  },
  {
    id: "lift-station-design",
    title: "Sewage Lift Station Design",
    category: "exp",
    coverImage: "images/covers/lift-station-design.jpg",
    summary: "Complete design and drafting packages for two municipal sewage lift stations.",
    description: [
      "I designed and drafted full deliverables for two sewage lift stations: site plans, wet-well sections, valve chambers and forcemain profiles. Hydraulic sizing was checked in SewerGEMS, with forcemain analysis spreadsheets behind the pump selection.",
        "The entire project, while checked and given feedback by my project manager was completed solo and ahead of schedule.",
      "I also wrote the client-facing design brief that walked the municipality through the operating assumptions in plain language.",
    ],
    role: "Summer engineering student",
    tools: ["AutoCAD", "SewerGEMS", "Excel"],
    timeframe: "Summers 2025 & 2026 · EXP",
    images: [
      { src: "images/detail/lift-station-design-1.jpg", thumb: "images/thumbs/lift-station-design-1.jpg", alt: "Lift station drawing with plan view and wet-well section", caption: "KL lift station — plan and wet-well section" },
      { src: "images/detail/lift-station-design-2.jpg", thumb: "images/thumbs/lift-station-design-2.jpg", alt: "Client-facing lift station design brief document", caption: "Client-facing design brief" },
      { src: "images/detail/lift-station-design-3.jpg", thumb: "images/thumbs/lift-station-design-3.jpg", alt: "IF lift station drawing sheet", caption: "IF lift station — issued drawing" },
      { src: "images/detail/lift-station-design-4.jpg", thumb: "images/thumbs/lift-station-design-4.jpg", alt: "Screenshot of lift station design calculations", caption: "Supporting design calculations" },
    ],
    links: [],
  },
  {
    id: "network-modeling",
    title: "Water & Sewer Network Modeling",
    category: "exp",
    summary: "Hydraulic models of sewer and water distribution systems for contracted municipal projects.",
    coverImage: "images/covers/network-modeling.jpg",
    description: [
      "I built and calibrated hydraulic models of sewer and water distribution networks in SewerGEMS and WaterGEMS. This work included sizing mains, checking capacities, modelling piping lengths and supporting fire-prevention studies for contracted municipal projects.",
        "The biggest roadblock I faced for the construction of these models were the quality of drawings that were presented by the different townships and municipalities. As the majority of these towns are small, they lack the ability to routinely upgrade their water and sewer systems, resulting in very old documentation that is sometimes scattered among old archives. In order to read some of these old scans, I had to come up with some creative solutions in manipulating image data to sharpen faded lines or research outdated drafting practices that had been utilized previously.",
        "The models were as follows: water and sewer models for Longlac, Ontario; water and sewer models for Cobalt, Ontario; water and sewer models for Porcus, Ontario and a fire prevention inspection and design brief for Agnico Eagle mines.",
      "Results and assumptions were summarized in client-facing design briefs.",
    ],
    role: "Summer engineering student",
    tools: ["SewerGEMS", "WaterGEMS", "Excel"],
    timeframe: "Summer 2025 · EXP",
    images: [
      { src: "images/detail/network-modeling-1.jpg", thumb: "images/thumbs/network-modeling-1.jpg", alt: "Hydraulic model of a water distribution network shown in modeling software", caption: "Distribution network model" },
      { src: "images/detail/network-modeling-2.jpg", thumb: "images/thumbs/network-modeling-2.jpg", alt: "Forcemain analysis spreadsheet with hydraulic calculations", caption: "Forcemain analysis spreadsheet" },
      { src: "images/detail/network-modeling-3.jpg", thumb: "images/thumbs/network-modeling-3.jpg", alt: "Screenshot of a water and sewer network model under construction", caption: "Network model — working view" },
    ],
    links: [],
  },
  {
    id: "python-automation",
    title: "Python File-Workflow Automation",
    category: "exp",
    coverImage: "images/covers/python-automation.jpg",
    summary: "Custom Python tool that automated file management for the office’s largest project — admin time down ~30%.",
    description: [
      "The office’s largest active project had a file-naming and transmittal workflow that quietly ate hours of administrative time every week. I wrote a Python tool that automated the sorting, renaming and versioning of project files — and estimated it cut processing time by about 30%.",
      "It’s a small thing next to the design work, but it’s the project coworkers mentioned most. I also ran informal training sessions on it alongside SolidWorks, SewerGEMS, WaterGEMS, Plant 3D, AutoCAD and Inventor.",
    ],
    role: "Developer",
    tools: ["Python"],
    timeframe: "Summer 2025 · EXP",
    images: [],
    links: [],
  },

  // ------------------------------------------------ School
  {
    id: "orthographic-drawings",
    title: "The Claw",
    category: "school",
    coverImage: "images/covers/orthographic-drawings.jpg",
    summary: "A complete orthographic drawing set from first-year engineering graphics.",
    description: [
      "Alongside a team of other engineering students, I designed and manudactured two functional automatic claw devices. The crux of the project was the gathering of data and multiple different prototypes that were created to become more informed on our project goals and refine the final project. The claw was programmed on an arduino in C using ultrasonic and physical sensors to automatically detect and grab a hold of objects. In addition to the claw itself, I created the fully dimensioned orthographic drawings and aided in the presentation of final deliverables.",
      "This project helped me to ground my connection between design and manufacturing, although there are unlimited wild and creative designs you can think of, it's the ones that can be manufactured that actually get built.",
    ],
    role: "Individual coursework",
    tools: ["Technical drafting", "CAD", "C", "Arduino"],
    timeframe: "2025–26 · UBC",
    images: [
      { src: "images/detail/orthographic-drawings-1.jpg", thumb: "images/thumbs/orthographic-drawings-1.jpg", alt: "Fully dimensioned orthographic drawing set for the claw", caption: "Fully dimensioned orthographic drawing set" },
      { type: "video", src: "images/videos/claw-demonstration.mp4", thumb: "images/thumbs/claw-demo-video.jpg", poster: "images/videos/demo-poster.jpg", caption: "The Claw in action — automatic grab demonstration" },
    ],
    presentation: { src: "images/videos/claw-presentation.mp4", poster: "images/videos/pres-poster.jpg", caption: "Design presentation — running" },
    links: [],
  },

  
  {
    id: "pcb-design",
    title: "Mixed-Signal PCB Design",
    category: "school",
    coverImage: "images/covers/pcb-design.svg",
    summary: "Currently in progress",
    description: [
      "",
    ],
    role: "Student — PCB Design & Prototyping eLab",
    tools: ["KiCad"],
    timeframe: "Sept – Nov 2026 · UBC",
    images: [
      { src: "images/covers/pcb-design.svg", thumb: "images/covers/pcb-design.svg", alt: "Line drawing of a printed circuit board layout with traces, pads and mounting holes", caption: "Board layout (illustrative)" },
    ],
    links: [],
  },

  // ------------------------------------------------ SUBC
  {
    id: "human-powered-submarine",
    title: "Submarine Prop Design and Manufacturing",
    category: "subc",
    coverImage: "images/covers/human-powered-submarine.jpg",
    summary: "A fully functional human-powered submarine — 8th internationally at eISR 2026.",
    description: [
      "I’m a member of the UBC Submarine Design Team (SUBC), which designs, builds and races a fully functional human-powered submarine. At the European International Submarine Races 2026 in Gosport, UK, we placed 8th internationally.",
      "My home on the team is propulsion — see the propeller project — but everyone turns a wrench: I’ve laid glass, printed and machined parts, and helped get the boat ready for the water and the race course.",
    ],
    role: "Propulsion team member",
    tools: ["SolidWorks", "GRP layup", "3D printing", "Machining"],
    timeframe: "Sept 2025 – present",
    images: [
      { src: "images/detail/propeller-design-1.jpg", thumb: "images/thumbs/propeller-design-1.jpg", alt: "Render of the designed propeller", caption: "Final propeller design" },
      { src: "images/detail/propeller-design-2.jpg", thumb: "images/thumbs/propeller-design-2.jpg", alt: "Propeller model with blade section lines overlaid", caption: "Blade sections overlaid on the model" },
      { src: "images/detail/propeller-design-3.jpg", thumb: "images/thumbs/propeller-design-3.jpg", alt: "Blade section curves generated in OpenProp", caption: "Sections from OpenProp" },
      { src: "images/detail/propeller-design-4.jpg", thumb: "images/thumbs/propeller-design-4.jpg", alt: "Motion study of the propeller under load", caption: "Motion study — blade loading" },
      { src: "images/detail/composites-manufacturing-1.jpg", thumb: "images/thumbs/composites-manufacturing-1.jpg", alt: "Working on submarine parts in the workshop", caption: "In the shop" },
      { src: "images/detail/human-powered-submarine-1.jpg", thumb: "images/thumbs/human-powered-submarine-1.jpg", alt: "The human-powered submarine in the water during testing", caption: "In the water" },
      { src: "images/detail/human-powered-submarine-2.jpg", thumb: "images/thumbs/human-powered-submarine-2.jpg", alt: "The submarine team working on the hull", caption: "Team work on the hull" },
      { src: "images/detail/human-powered-submarine-3.jpg", thumb: "images/thumbs/human-powered-submarine-3.jpg", alt: "The submarine being prepared in the workshop", caption: "Shop prep" },
      { src: "images/detail/human-powered-submarine-4.jpg", thumb: "images/thumbs/human-powered-submarine-4.jpg", alt: "The finished submarine on display", caption: "The finished boat" },
    ],
    links: [
      { label: "SUBC — UBC’s Submarine Design Team", url: "https://subc.ca" },
    ],
  },

];
