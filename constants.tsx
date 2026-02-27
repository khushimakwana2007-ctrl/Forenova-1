
import { EvidenceType, LabDivision, QuizQuestion, CaseStudy, CaseSimulation } from './types';

export const PRACTICE_CASES: CaseSimulation[] = [
  {
    id: 'sim-1',
    title: 'Operation Digital Ghost',
    difficulty: 'Intermediate',
    location: 'SecurTech Server Room, Floor 44',
    externalReference: 'https://www.nist.gov/forensics',
    victimInfo: {
      name: 'Marcus Vane',
      age: '42',
      occupation: 'Chief Security Officer',
      status: 'Critical / Unconscious',
      estimatedTime: '02:00 AM'
    },
    briefing: 'At 02:00 AM, silent alarms were triggered in the main data vault. Security found the CSO, Marcus Vane, unconscious near Rack #7. A server panel was unscrewed, and several backup tapes are missing. The air smells slightly of bitter almonds.',
    clues: [
      { 
        id: 'c1', 
        name: 'Bloodstain (Rack 7)', 
        description: 'A small smear of red fluid on the metal casing.', 
        requiredTool: 'Sterile Swab', 
        labDivision: 'Biology & Serology', 
        found: false,
        scientificReasoning: 'DNA extraction from this smear will confirm the identity of the person who cut themselves while unscrewing the rack.'
      },
      { 
        id: 'c2', 
        name: 'Discarded Syringe', 
        description: 'Hidden behind the cooling unit.', 
        requiredTool: 'Tweezers/Bio Container', 
        labDivision: 'Toxicology & Chemistry', 
        found: false,
        scientificReasoning: 'Analysis of the residue in the needle confirms the use of a fast-acting paralytic agent.'
      },
      { 
        id: 'c3', 
        name: 'Latent Print (Vault Door)', 
        description: 'Partial ridge detail on the keypad.', 
        requiredTool: 'Magnetic Powder', 
        labDivision: 'Fingerprints (Dactyloscopy)', 
        found: false,
        scientificReasoning: 'Magnetic powder is ideal for the plastic/metal keypad surface to visualize the intruder\'s unique ridge patterns.'
      },
      { 
        id: 'c4', 
        name: 'Locked Smartphone', 
        description: 'Found in the victim\'s pocket with a cracked screen.', 
        requiredTool: 'Faraday Bag', 
        labDivision: 'Digital Forensics', 
        found: false,
        scientificReasoning: 'A Faraday bag prevents remote wiping of the device, preserving crucial communication logs.'
      }
    ],
    suspects: [
      { id: 's1', name: 'Elena Vance', role: 'IT Contractor', motive: 'Corporate debt', isGuilty: false, evidenceLink: 'Digital records show her badge used at 01:45 AM, but DNA does not match the bloodstain.' },
      { id: 's2', name: 'Viktor Kraz', role: 'Former Employee', motive: 'Wrongful termination', isGuilty: true, evidenceLink: 'DNA from the bloodstain matches his profile in AFIS. The syringe contained a fast-acting sedative he had access to.' },
      { id: 's3', name: 'Sarah Chen', role: 'Night Security', motive: 'None identified', isGuilty: false, evidenceLink: 'Her prints were everywhere, as expected for her job, but nothing linked to the crime gear.' }
    ],
    walkthroughSteps: [
      "Navigate to Scene Scan.",
      "Collect the Bloodstain using a Sterile Swab.",
      "Collect the Syringe using Tweezers.",
      "Lift the Latent Print with Magnetic Powder.",
      "Bag the Smartphone in a Faraday Bag.",
      "Analyze all items in the Lab Hub.",
      "Link the Bloodstain DNA to Viktor Kraz.",
      "Confirm arrest of Viktor Kraz in the Verdict tab."
    ]
  },
  {
    id: 'sim-2',
    title: 'The Crimson Ledger',
    difficulty: 'Advanced',
    location: 'Finance District, Suite 201',
    externalReference: 'https://www.interpol.int/en/How-we-work/Forensics',
    victimInfo: {
      name: 'Arthur Penhaligon',
      age: '55',
      occupation: 'Forensic Accountant',
      status: 'Missing / Presumed Deceased',
      estimatedTime: '23:30 PM (Previous Night)'
    },
    briefing: 'Arthur Penhaligon, a top forensic accountant, has vanished. His office shows signs of a struggle. A half-full coffee cup sits on the desk next to a ledger stained with blood. A spent 9mm shell casing was found under the mahogany table.',
    clues: [
      { 
        id: 'cl-1', 
        name: '9mm Shell Casing', 
        description: 'Brass casing with a unique firing pin mark.', 
        requiredTool: 'Static-free Tweezers', 
        labDivision: 'Ballistics & Toolmarks', 
        found: false,
        scientificReasoning: 'Striation marks on the casing act as a ballistic fingerprint, matching the firing pin of the shooter\'s weapon.'
      },
      { 
        id: 'cl-2', 
        name: 'Bloody Ledger', 
        description: 'Financial book with a red thumbprint on Page 44.', 
        requiredTool: 'Evidence Bag (Large)', 
        labDivision: 'Fingerprints (Dactyloscopy)', 
        found: false,
        scientificReasoning: 'Chemical development of the print on the paper (using Ninhydrin) will link the person holding the book.'
      },
      { 
        id: 'cl-3', 
        name: 'Coffee Residue', 
        description: 'Smells faintly of almonds. Potential poison.', 
        requiredTool: 'Pipette & Sterile Vial', 
        labDivision: 'Toxicology & Chemistry', 
        found: false,
        scientificReasoning: 'Gas Chromatography (GC-MS) will detect Potassium Cyanide, confirming the attempt to poison the victim.'
      },
      { 
        id: 'cl-4', 
        name: 'Encrypted USB Drive', 
        description: 'Taped under the desk chair.', 
        requiredTool: 'Faraday Bag', 
        labDivision: 'Digital Forensics', 
        found: false,
        scientificReasoning: 'Bit-level imaging of the drive will uncover the embezzlement records Thorne was trying to hide.'
      }
    ],
    suspects: [
      { id: 'sus-1', name: 'Julian Thorne', role: 'Business Partner', motive: 'Embezzlement cover-up', isGuilty: true, evidenceLink: 'The 9mm casing matches his registered handgun. The ledger blood contains his DNA mixed with the victim\'s.' },
      { id: 'sus-2', name: 'Maria Rossi', role: 'Lead Auditor', motive: 'Professional jealousy', isGuilty: false, evidenceLink: 'Her prints are on the coffee cup, but Toxicology shows the poison was added later by someone else.' },
      { id: 'sus-3', name: 'Unknown "Fixer"', role: 'Hired Muscle', motive: 'Contract kill', isGuilty: false, evidenceLink: 'DNA at the scene doesn\'t match any known database, but Thorne\'s USB contains payments to this individual.' }
    ],
    walkthroughSteps: [
      "Navigate to Scene Scan.",
      "Tag the 9mm Shell Casing (Ballistics).",
      "Tag the Bloody Ledger (Dactyloscopy).",
      "Collect the Coffee Residue (Toxicology).",
      "Retrieve the USB Drive (Digital Forensics).",
      "Run Lab analysis on all 4 items.",
      "The 9mm casing confirms Thorne's weapon was fired.",
      "The Ledger print matches Thorne's Right Thumb.",
      "Issue the Verdict for Julian Thorne."
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'c1',
    title: 'The Pitchfork Files',
    category: 'DNA GENETICS',
    description: 'The revolutionary case where DNA profiling was used for the first time in history to exonerate an innocent man and convict the true killer, Colin Pitchfork.',
    techniquesUsed: ['RFLP Analysis', 'DNA Profiling', 'Mass Screening'],
    findings: [
      'DNA profiling established a common attacker for two murders.',
      'Mass blood testing of 5,000 local men.',
      'A friend of the suspect was overheard admitting he provided a sample on Pitchfork\'s behalf.'
    ],
    outcome: 'First conviction based on DNA evidence (1988).',
    color: 'bg-[#a32e2e]',
    subtext: 'REVOLUTIONARY: DNA PROFILING PIONEERED',
    sourceUrl: 'https://www.theguardian.com/uk-news/2021/jun/14/colin-pitchfork-the-first-killer-caught-by-dna-evidence'
  },
  {
    id: 'c2',
    title: 'The Night Stalker',
    category: 'DACTYLOSCOPY',
    description: 'The terrifying reign of Richard Ramirez was ended by a single latent fingerprint found on the rearview mirror of an orange Toyota.',
    techniquesUsed: ['AFIS Database', 'Latent Print Recovery', 'Public Mobilization'],
    findings: [
      'A stolen vehicle was recovered with a clean latent print.',
      'The print was processed through the newly installed AFIS system in California.',
      'Ramirez was identified in minutes, leading to his capture by a mob of citizens.'
    ],
    outcome: 'Identification and capture within 24 hours of the print recovery.',
    color: 'bg-[#1e293b]',
    subtext: 'BREAKTHROUGH: FIRST AFIS SUCCESS',
    sourceUrl: 'https://www.biography.com/crime-figure/richard-ramirez'
  },
  {
    id: 'c3',
    title: 'The Lindbergh Ladder',
    category: 'BOTANY & TOOLMARKS',
    description: 'The "Crime of the Century." Arthur Koehler used wood anatomy to trace the lumber used in a homemade kidnapping ladder back to a specific mill.',
    techniquesUsed: ['Forensic Botany', 'Wood Anatomy', 'Toolmark Analysis'],
    findings: [
      'The ladder was constructed from unique wood types (Douglas Fir and Ponderosa Pine).',
      'Koehler identified marks from a specific planer machine.',
      'Lumber was traced from a mill in South Carolina to a yard in the Bronx where Hauptmann shopped.'
    ],
    outcome: 'Lumber evidence provided critical physical link to the suspect.',
    color: 'bg-[#78350f]',
    subtext: 'PIONEER: WOOD ANALYSIS AS EVIDENCE',
    sourceUrl: 'https://www.fbi.gov/history/famous-cases/lindbergh-kidnapping'
  },
  {
    id: 'c4',
    title: 'The Poisoner of London',
    category: 'TOXICOLOGY',
    description: 'The case of Hawley Harvey Crippen, where forensics first used toxicology to identify Hyoscine (Scopolamine) in human remains.',
    techniquesUsed: ['Toxicological Screening', 'Forensic Pathology', 'Wireless Telegraphy'],
    findings: [
      'Discovery of a "fillet" of flesh in a basement.',
      'Chemical extraction identified lethal doses of Hyoscine.',
      'Crippen was caught via wireless telegraph while fleeing across the Atlantic.'
    ],
    outcome: 'First time wireless telegraphy led to a fugitive\'s arrest.',
    color: 'bg-[#065f46]',
    subtext: 'CLASSIC: EARLY CHEMICAL DETECTION',
    sourceUrl: 'https://www.britannica.com/biography/Harvey-Crippen'
  },
  {
    id: 'c5',
    title: 'The Tandoor Murder Case',
    category: 'INDIAN DNA FIRST',
    description: 'The Naina Sahni murder case marked the first time DNA profiling was successfully used as conclusive evidence in an Indian courtroom to identify remains.',
    techniquesUsed: ['DNA Fingerprinting', 'Forensic Pathology', 'Odontology'],
    findings: [
      'Severely charred remains were found in a tandoor (clay oven).',
      'DNA profiling by CCMB Hyderabad matched the remains to the victim\'s parents.',
      'Forensic pathology established the cause of death as multiple gunshot wounds.'
    ],
    outcome: 'First conviction in India based primarily on DNA evidence (1995).',
    color: 'bg-[#a16207]',
    subtext: 'MILESTONE: INDIAN FORENSIC PIONEER',
    sourceUrl: 'https://en.wikipedia.org/wiki/Tandoor_murder_case'
  },
  {
    id: 'c6',
    title: 'The Sheena Bora File',
    category: 'INDIAN DIGITAL/DNA',
    description: 'A complex case where skeletal remains were identified three years after the crime using advanced DNA extraction and facial reconstruction techniques.',
    techniquesUsed: ['Mitochondrial DNA', 'Facial Superimposition', 'Digital Forensics'],
    findings: [
      'Discovery of a skeleton in a Raigad forest after years of concealment.',
      'DNA extraction from teeth and femur matched the biological mother.',
      'Digital forensics on email trails and Skype logs revealed the conspiracy.'
    ],
    outcome: 'Scientific proof established the victim\'s identity and timeline of murder.',
    color: 'bg-[#1e1b4b]',
    subtext: 'ADVANCED: MULTI-MODAL INVESTIGATION',
    sourceUrl: 'https://en.wikipedia.org/wiki/Sheena_Bora_murder_case'
  },
  {
    id: 'c7',
    title: 'The Aarushi Talwar Case',
    category: 'INDIAN CRIME SCENE',
    description: 'A landmark case that highlighted the critical importance of crime scene preservation and the challenges of Touch DNA and Narco Analysis in India.',
    techniquesUsed: ['Touch DNA', 'Narco Analysis', 'Blood Spatter Reconstruction'],
    findings: [
      'Initial scene contamination by neighbors and media hindered collection.',
      'Scientific reconstruction of the scene challenged initial police theories.',
      'Extensive use of Brain Mapping and Narco Analysis on multiple suspects.'
    ],
    outcome: 'High-profile acquittal highlighting the need for scene integrity.',
    color: 'bg-[#451a03]',
    subtext: 'LESSON: SCENE PRESERVATION CRITICAL',
    sourceUrl: 'https://en.wikipedia.org/wiki/2008_Noida_double_murder_case'
  },
  {
    id: 'c8',
    title: 'The Nithari Serials',
    category: 'INDIAN SKELETAL',
    description: 'One of India\'s most gruesome cases involving the forensic identification of remains from dozens of victims discovered in a drain.',
    techniquesUsed: ['Skeletal Identification', 'Age Estimation', 'DNA Profiling'],
    findings: [
      'Recovery of multiple skulls and bone fragments from a municipal drain.',
      'Forensic anthropologists categorized remains of over 19 children.',
      'DNA profiling linked bone fragments to missing persons in the area.'
    ],
    outcome: 'Extensive forensic evidence led to multiple death sentences.',
    color: 'bg-[#4c0519]',
    subtext: 'MASS CASUALTY: BONE & REMAINS EXPERTISE',
    sourceUrl: 'https://en.wikipedia.org/wiki/Nithari_killings'
  }
];

export const EVIDENCE_DATA: EvidenceType[] = [
  {
    id: '1',
    name: 'Blood (Wet)',
    category: 'Biological',
    toolsNeeded: ['Sterile Swab', 'Saline', 'Gloves', 'Sterile Vials'],
    packaging: 'Paper bag after drying or sterile vial with anticoagulant',
    storage: 'Refrigerated',
    temperature: '4°C',
    description: 'Crucial for DNA analysis and serology. Avoid plastic bags for long-term storage of wet biologicals to prevent mold.'
  },
  {
    id: '2',
    name: 'Latent Print',
    category: 'Biological/Physical',
    toolsNeeded: ['Fingerprint Powder', 'Camel Hair Brush', 'Lifting Tape', 'Latent Lift Cards'],
    packaging: 'Rigid envelope or protective card',
    storage: 'Dry, room temperature',
    temperature: '15-25°C',
    description: 'Invisible impressions left behind by skin ridges, requiring development via physical or chemical means.'
  },
  {
    id: '3',
    name: 'DNA Swab (Saliva)',
    category: 'Biological',
    toolsNeeded: ['Sterile Swab', 'Gloves', 'Sterile Vials'],
    packaging: 'Paper envelope or sterile swab box',
    storage: 'Frozen or Refrigerated',
    temperature: '-20°C to 4°C',
    description: 'Used for reference profiling. Swabs must be completely air-dried before final packaging to prevent bacterial growth.'
  },
  {
    id: '4',
    name: 'Trace Fiber/Hair',
    category: 'Biological/Trace',
    toolsNeeded: ['Fine Tweezers', 'Gloves', 'Paper Bindles', 'Hand Lens'],
    packaging: 'Paper bindle (druggist fold) then outer paper envelope',
    storage: 'Dry, room temperature',
    temperature: '20°C',
    description: 'Small fibers or hair samples can link a suspect to a location. Avoid using adhesive tape for collection as it makes laboratory extraction difficult.'
  },
  {
    id: '5',
    name: 'Fired Cartridge Case',
    category: 'Physical/Ballistics',
    toolsNeeded: ['Rubber-tipped Tweezers', 'Gloves', 'Small Paper Envelope'],
    packaging: 'Small paper envelope or padded box',
    storage: 'Dry, room temperature',
    temperature: 'Ambient',
    description: 'Firing pin impressions and breech face marks are unique to each firearm. Handle with rubber-tipped tools to avoid adding new marks.'
  },
  {
    id: '6',
    name: 'Narcotics (Powder)',
    category: 'Chemical',
    toolsNeeded: ['Spatula', 'Gloves', 'Scales', 'Plastic Evidence Bag'],
    packaging: 'Sealable plastic evidence bag with tamper-evident seal',
    storage: 'Secure Locker',
    temperature: 'Ambient',
    description: 'Suspected controlled substances require careful weight measurement and chemical field testing (Marquis reagent) before storage.'
  },
  {
    id: '7',
    name: 'Firearm (Handgun)',
    category: 'Physical/Ballistics',
    toolsNeeded: ['Gloves', 'Rigid Cardboard Box', 'Zip-ties'],
    packaging: 'Rigid cardboard box with the weapon secured by zip-ties',
    storage: 'High-security Locker',
    temperature: 'Ambient',
    description: 'Must be rendered safe before packaging. Never insert objects into the barrel. Document serial numbers and state of the safety/hammer.'
  },
  {
    id: '8',
    name: 'Digital Device (USB)',
    category: 'Digital',
    toolsNeeded: ['Antistatic Bag', 'Gloves', 'Evidence Tags'],
    packaging: 'Faraday Bag or Antistatic Bag',
    storage: 'Dry, room temperature',
    temperature: '20°C',
    description: 'Preserving the electrical state of digital components is vital. Faraday bags prevent remote wiping by blocking all incoming wireless signals.'
  }
];

export const LAB_DIVISIONS: LabDivision[] = [
  {
    id: 'bio',
    name: 'Biology & Serology',
    description: 'Examines biological fluids and tissues to identify individuals and establish scientific links between suspects and crime scenes via genetic markers.',
    subFields: ['DNA Profiling', 'Blood Grouping', 'Forensic Botany'],
    color: 'emerald',
    equipment: [
      { 
        name: 'Thermal Cycler (PCR)', 
        description: 'Rapidly amplifies specific DNA sequences for accurate forensic testing.', 
        useCase: 'Analyzing minute samples like a single hair root or skin cells.' 
      },
      { 
        name: 'Genetic Analyzer', 
        description: 'Sequences DNA fragments to visualize and compare unique genetic profiles.', 
        useCase: 'Final profiling and matching scene evidence to suspect files.' 
      }
    ],
    procedure: [
      { step: 1, title: 'DNA Analysis Phase', action: 'Interactive process involving extraction, amplification (PCR), and digital profiling to identify unique genetic markers.' }
    ],
    quiz: [
      {
        id: 'lb1',
        question: 'Which technique is used to amplify small DNA samples?',
        options: ['Chromatography', 'PCR', 'Microscopy', 'Mass Spec'],
        correctAnswer: 1,
        explanation: 'PCR (Polymerase Chain Reaction) creates millions of copies of a DNA segment for detailed forensic analysis.',
        type: 'MCQ'
      }
    ]
  },
  {
    id: 'tox',
    name: 'Toxicology & Chemistry',
    description: 'Analyzes biological and environmental samples to detect drugs, poisons, and chemical residues vital for cause-of-death determinations.',
    subFields: ['Drug Analysis', 'Poisons & Toxins', 'Arson Investigation'],
    color: 'amber',
    equipment: [
      { 
        name: 'GC-MS', 
        description: 'Gas Chromatography-Mass Spectrometry isolates and identifies volatile substances in complex mixtures.', 
        useCase: 'Identifying lethal concentrations of sedatives or illegal narcotics.' 
      },
      { 
        name: 'Spectrophotometer', 
        description: 'Measures light absorption to determine chemical concentration.', 
        useCase: 'Screening for Carbon Monoxide or heavy metals in blood.' 
      }
    ],
    procedure: [
      { step: 1, title: 'Sample Preparation', action: 'Extracting toxins from tissue or blood using specialized chemical solvents.' },
      { step: 2, title: 'Instrumentation Run', action: 'Injecting the sample into a GC-MS for molecular weight and fragment analysis.' }
    ],
    quiz: [
      {
        id: 'tox1',
        question: 'What does "GC-MS" stand for in forensic chemistry?',
        options: ['General Chemical-Metric System', 'Gas Chromatography-Mass Spectrometry', 'Genomic Control-Micro Scanner', 'None of the above'],
        correctAnswer: 1,
        explanation: 'GC-MS is the gold standard for chemical identification in forensics.',
        type: 'MCQ'
      }
    ]
  },
  {
    id: 'ball',
    name: 'Ballistics & Toolmarks',
    description: 'Investigates firearms, discharged ammunition, and impressions left by tools to reconstruct shooting incidents or mechanical entries.',
    subFields: ['Firearm Mechanics', 'Ammunition ID', 'Striation Matching'],
    color: 'blue',
    equipment: [
      { 
        name: 'Comparison Microscope', 
        description: 'Allows side-by-side visualization of two separate specimens under high magnification.', 
        useCase: 'Matching land and groove marks on a test-fired bullet to a recovered evidence bullet.' 
      },
      { 
        name: 'Ballistic Water Tank', 
        description: 'A specialized recovery system for firing weapons safely without damaging the projectile.', 
        useCase: 'Obtaining pristine exemplars for comparison with crime scene projectiles.' 
      }
    ],
    procedure: [
      { step: 1, title: 'Test Firing', action: 'Recovering projectiles from a ballistic tank to create a known control sample.' },
      { step: 2, title: 'Comparison Analysis', action: 'Using a split-view microscope to align striations between test and evidence bullets.' }
    ],
    quiz: [
      {
        id: 'ball1',
        question: 'What is used to match two bullets simultaneously?',
        options: ['Luminol', 'Ninhydrin', 'Comparison Microscope', 'Calipers'],
        correctAnswer: 2,
        explanation: 'A comparison microscope lets experts see unique striations on both bullets at the same time.',
        type: 'MCQ'
      }
    ]
  },
  {
    id: 'digital',
    name: 'Digital Forensics',
    description: 'Utilizes scientific recovery and analysis of data from electronic storage media to uncover communication logs and hidden files.',
    subFields: ['Data Recovery', 'Network Forensics', 'Mobile Device Analysis'],
    color: 'indigo',
    equipment: [
      { 
        name: 'Write Blocker', 
        description: 'Hardware device that prevents accidental writing or modification to evidentiary media.', 
        useCase: 'Securing a suspect\'s hard drive before creating a bit-level image.' 
      },
      { 
        name: 'Forensic Workstation', 
        description: 'High-performance computing unit designed for processing vast amounts of raw digital data.', 
        useCase: 'Decrypting files and recovering deleted browser history.' 
      }
    ],
    procedure: [
      { step: 1, title: 'Imaging', action: 'Creating a bit-for-bit clone of the original device to ensure integrity.' },
      { step: 2, title: 'Data Analysis', action: 'Using forensic software to parse system logs and metadata for user activity.' }
    ],
    quiz: [
      {
        id: 'df1',
        question: 'Why is a "Write Blocker" essential?',
        options: ['To speed up the computer', 'To prevent data alteration', 'To fix broken screens', 'To delete viruses'],
        correctAnswer: 1,
        explanation: 'A write blocker ensures the original evidence is never modified during the investigation.',
        type: 'MCQ'
      }
    ]
  },
  {
    id: 'dactyl',
    name: 'Fingerprints (Dactyloscopy)',
    description: 'Focuses on the identification and comparison of unique skin ridge patterns recovered from surfaces using physical and chemical development.',
    subFields: ['Latent Print Development', 'AFIS Database', 'Ridge Analysis'],
    color: 'violet',
    equipment: [
      { 
        name: 'Fuming Chamber', 
        description: 'An airtight box for chemical vaporization (Cyanoacrylate) to develop fingerprints.', 
        useCase: 'Visualizing latent prints on non-porous surfaces like plastic or metal.' 
      },
      { 
        name: 'Magnetic Brush', 
        description: 'A tool that uses iron powder and magnetism to apply powder without surface friction.', 
        useCase: 'Developing delicate prints on fragile surfaces.' 
      }
    ],
    procedure: [
      { step: 1, title: 'Latent Development', action: 'Applying powders or chemicals to make invisible ridge patterns visible.' },
      { step: 2, title: 'AFIS Query', action: 'Inputting digital print images into the Automated Fingerprint Identification System for matching.' }
    ],
    quiz: [
      {
        id: 'dac1',
        question: 'Which chemical is used in "Superglue Fuming"?',
        options: ['Iodine', 'Cyanoacrylate', 'Acetone', 'Silver Nitrate'],
        correctAnswer: 1,
        explanation: 'Cyanoacrylate (Superglue) fumes bond with the amino acids in fingerprints.',
        type: 'MCQ'
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the "Locard\'s Exchange Principle"?',
    options: ['Every contact leaves a trace', 'DNA is unique', 'Blood never lies', 'Time is fixed'],
    correctAnswer: 0,
    explanation: 'Edmond Locard stated that every contact leaves a trace, which is the foundation of modern forensic science.',
    type: 'MCQ'
  }
];

export const EXAM_SYLLABUS = [
  "Introduction to Forensic Science",
  "Criminal Procedure & Laws",
  "Evidence Collection & Preservation",
  "Biology, Serology & DNA"
];
