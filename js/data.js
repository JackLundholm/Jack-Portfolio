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
    blurb: "Two summers as an infrastructure & transport engineering student at EXP, a consulting firm in northern Ontario — drafting, modeling and design support on 20+ contracted projects.",
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
   images[] ({src, thumb, alt, caption}), links[] ({label, url})   */

const PROJECTS = [
  // ------------------------------------------------ EXP
  {
    id: "water-treatment-plant",
    title: "Water Treatment Plant Design",
    category: "exp",
    coverImage: "images/covers/water-treatment-plant.jpg",
    summary: "3D plant model and P&ID deliverables for a contracted municipal water treatment facility.",
    description: [
      "As part of EXP’s summer team I produced the 3D plant model and process drawings for a municipal water treatment facility — laying out process equipment, piping runs and tie-ins, and developing the P&ID sheets used for client review.",
      "Every drawing went through review rounds with senior engineers, where I’d walk the model, catch clashes and fold in client feedback from project instruction meetings before anything was issued.",
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
    title: "Cobalt & Nickel Process Infrastructure",
    category: "exp",
    coverImage: "images/covers/process-infrastructure.jpg",
    summary: "Design support for process infrastructure at cobalt sulphate and nickel processing facilities.",
    description: [
      "I contributed engineering deliverables for process infrastructure at cobalt sulphate and nickel processing facilities — from general arrangement layouts to process piping details.",
      "The work had to respect existing plant constraints, which meant a lot of careful clash-checking against survey data and decades of legacy drawings. Nothing on these sites moves unless it’s drawn first.",
    ],
    role: "Summer engineering student — drafting & design support",
    tools: ["AutoCAD", "Plant 3D"],
    timeframe: "Summer 2025 · EXP",
    images: [
      { src: "images/detail/process-infrastructure-1.jpg", thumb: "images/thumbs/process-infrastructure-1.jpg", alt: "Aerial view of a processing facility surrounded by forest", caption: "Site of the processing facility" },
      { src: "images/detail/process-infrastructure-2.jpg", thumb: "images/thumbs/process-infrastructure-2.jpg", alt: "Process area of the facility with tanks and piping", caption: "Process area — tanks and piping" },
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
      "I also wrote the client-facing design brief that walked the municipality through the operating assumptions in plain language — the version of the project that non-engineers actually read.",
    ],
    role: "Summer engineering student",
    tools: ["AutoCAD", "SewerGEMS", "Excel"],
    timeframe: "Summers 2025 & 2026 · EXP",
    images: [
      { src: "images/detail/lift-station-design-1.jpg", thumb: "images/thumbs/lift-station-design-1.jpg", alt: "Lift station drawing with plan view and wet-well section", caption: "KL lift station — plan and wet-well section" },
      { src: "images/detail/lift-station-design-2.jpg", thumb: "images/thumbs/lift-station-design-2.jpg", alt: "Client-facing lift station design brief document", caption: "Client-facing design brief" },
      { src: "images/detail/lift-station-design-3.jpg", thumb: "images/thumbs/lift-station-design-3.jpg", alt: "IF lift station drawing sheet", caption: "IF lift station — issued drawing" },
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
      "I built and calibrated hydraulic models of sewer and water distribution networks in SewerGEMS and WaterGEMS — sizing mains, checking capacities and supporting fire-prevention studies for contracted municipal projects.",
      "Results and assumptions were summarized in client-facing design briefs, so the models had to survive being explained, not just run.",
    ],
    role: "Summer engineering student",
    tools: ["SewerGEMS", "WaterGEMS", "Excel"],
    timeframe: "Summer 2025 · EXP",
    images: [
      { src: "images/detail/network-modeling-1.jpg", thumb: "images/thumbs/network-modeling-1.jpg", alt: "Hydraulic model of a water distribution network shown in modeling software", caption: "Distribution network model" },
      { src: "images/detail/network-modeling-2.jpg", thumb: "images/thumbs/network-modeling-2.jpg", alt: "Forcemain analysis spreadsheet with hydraulic calculations", caption: "Forcemain analysis spreadsheet" },
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
    images: [
      { src: "images/detail/python-automation-1.jpg", thumb: "images/thumbs/python-automation-1.jpg", alt: "The custom Python file-management tool running in a dark code editor", caption: "The tool in use" },
      { src: "images/detail/python-automation-2.jpg", thumb: "images/thumbs/python-automation-2.jpg", alt: "Project file tree managed by the automation script", caption: "Automated file structure" },
      { src: "images/detail/python-automation-3.jpg", thumb: "images/thumbs/python-automation-3.jpg", alt: "Console output from the file-management script", caption: "Batch processing run" },
    ],
    links: [],
  },

  // ------------------------------------------------ School
  {
    id: "orthographic-drawings",
    title: "Orthographic Drawing Set",
    category: "school",
    coverImage: "images/covers/orthographic-drawings.jpg",
    summary: "A complete orthographic drawing set from first-year engineering graphics.",
    description: [
      "A full orthographic drawing set from a first-year engineering communication module: multiview layouts, sections and dimensioning done to drafting standard.",
      "Drawings are the contract between design and fabrication — this module is where that clicked for me, and it’s the skill I used daily at EXP two semesters later.",
    ],
    role: "Individual coursework",
    tools: ["Technical drafting", "CAD"],
    timeframe: "2025–26 · UBC",
    images: [
      { src: "images/detail/orthographic-drawings-1.jpg", thumb: "images/thumbs/orthographic-drawings-1.jpg", alt: "Orthographic drawing sheet with front, top and side views and dimensions", caption: "Drawing sheet — multiviews, sections and dimensions" },
    ],
    links: [],
  },
  {
    id: "product-renders",
    title: "Product Study — Tube Renders",
    category: "school",
    coverImage: "images/covers/product-renders.jpg",
    summary: "A surfacing and rendering exercise: modeling a product and lighting it from a series of angles.",
    description: [
      "A surfacing and rendering exercise from a graphics module: model a deceptively simple product, then light and render it from a series of angles.",
      "More effort than a tube deserves — which is exactly what made it a good exercise in surfaces, materials and light.",
    ],
    role: "Individual coursework",
    tools: ["CAD modeling", "Rendering"],
    timeframe: "2025–26 · UBC",
    images: [
      { src: "images/detail/product-renders-1.jpg", thumb: "images/thumbs/product-renders-1.jpg", alt: "Render of the product model, angled view", caption: "Angle one" },
      { src: "images/detail/product-renders-2.jpg", thumb: "images/thumbs/product-renders-2.jpg", alt: "Render of the product model, second angle", caption: "Angle two" },
      { src: "images/detail/product-renders-3.jpg", thumb: "images/thumbs/product-renders-3.jpg", alt: "Render of the product model, third angle", caption: "Angle three" },
    ],
    links: [],
  },
  {
    id: "pcb-design",
    title: "Mixed-Signal PCB Design",
    category: "school",
    coverImage: "images/covers/pcb-design.svg",
    summary: "Laid out, grounded and manufactured a circuit board in KiCad — digital, analog and mixed signal.",
    description: [
      "In UBC’s PCB Design and Prototyping eLab I developed circuit board layouts in KiCad, with a focus on grounding and partitioning strategies to keep noise down across digital, analog and mixed-signal sections.",
      "The final layout was sent out and manufactured — a working board at the end, not just a gerber folder.",
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
    title: "Human-Powered Submarine",
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
      { src: "images/detail/human-powered-submarine-1.jpg", thumb: "images/thumbs/human-powered-submarine-1.jpg", alt: "The human-powered submarine in the water during testing", caption: "In the water" },
      { src: "images/detail/human-powered-submarine-2.jpg", thumb: "images/thumbs/human-powered-submarine-2.jpg", alt: "The submarine team working on the hull", caption: "Team work on the hull" },
      { src: "images/detail/human-powered-submarine-3.jpg", thumb: "images/thumbs/human-powered-submarine-3.jpg", alt: "The submarine being prepared in the workshop", caption: "Shop prep" },
      { src: "images/detail/human-powered-submarine-4.jpg", thumb: "images/thumbs/human-powered-submarine-4.jpg", alt: "The finished submarine on display", caption: "The finished boat" },
    ],
    links: [
      { label: "SUBC — UBC’s Submarine Design Team", url: "https://subc.ca" },
    ],
  },
  {
    id: "propeller-design",
    title: "Propeller Design & Prototyping",
    category: "subc",
    coverImage: "images/covers/propeller-design.jpg",
    summary: "Designed, fabricated and tank-tested four propeller prototypes for the race submarine.",
    description: [
      "I designed the submarine’s propeller in SolidWorks, starting from OpenProp blade sections and iterating through four prototypes that balanced thrust and efficiency against what we could actually manufacture in-house.",
      "Each prototype was fabricated and tested, with motion studies checking blade loading before the final design went on the boat. I also researched next-generation concepts — single-blade props and biomimetic designs — and presented the findings to the team.",
      "The calculations and design process were written up in the team’s professional-grade final report submitted to eISR.",
    ],
    role: "Propulsion — propeller designer",
    tools: ["SolidWorks", "SolidWorks Flow Simulation", "OpenProp", "3D printing", "CNC"],
    timeframe: "2025–26 · SUBC",
    images: [
      { src: "images/detail/propeller-design-1.jpg", thumb: "images/thumbs/propeller-design-1.jpg", alt: "Render of the designed propeller", caption: "Final propeller design" },
      { src: "images/detail/propeller-design-2.jpg", thumb: "images/thumbs/propeller-design-2.jpg", alt: "Propeller model with blade section lines overlaid", caption: "Blade sections overlaid on the model" },
      { src: "images/detail/propeller-design-3.jpg", thumb: "images/thumbs/propeller-design-3.jpg", alt: "Blade section curves generated in OpenProp", caption: "Sections from OpenProp" },
      { src: "images/detail/propeller-design-4.jpg", thumb: "images/thumbs/propeller-design-4.jpg", alt: "Motion study of the propeller under load", caption: "Motion study — blade loading" },
    ],
    links: [],
  },
  {
    id: "composites-manufacturing",
    title: "Composites & Parts Manufacturing",
    category: "subc",
    coverImage: "images/covers/composites-manufacturing.jpg",
    summary: "GRP layup, 3D printing and subtractive manufacturing for hull and drive-train parts.",
    description: [
      "Beyond design work, I manufacture parts for the submarine: glass-reinforced plastic layup for hull sections and fairings, 3D-printed components, and subtractive machining for drive-train parts.",
      "Building what you designed is the fastest way to learn why the next design should be different.",
    ],
    role: "Manufacturing team member",
    tools: ["GRP layup", "3D printing", "CNC / subtractive"],
    timeframe: "2025–26 · SUBC",
    images: [
      { src: "images/detail/composites-manufacturing-1.jpg", thumb: "images/thumbs/composites-manufacturing-1.jpg", alt: "Working on submarine parts in the workshop", caption: "In the shop" },
    ],
    links: [
      { label: "SUBC — UBC’s Submarine Design Team", url: "https://subc.ca" },
    ],
  },
];
