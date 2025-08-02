export const promptExamples = [
  {
    level: 1,
    title: "The Detailed Concept",
    description: "Start with a full sentence describing a complete scene. Include the subject, style, and setting.",
    prompt: "A fluffy white cat, Studio Ghibli anime style, sleeping on a pile of old books.",
    breakdown: [
      "Subject: A fluffy white cat",
      "Style: Studio Ghibli anime style",
      "Action: sleeping",
      "Setting: on a pile of old books"
    ]
  },
  {
    level: 2,
    title: "Adding Composition & Atmosphere",
    description: "Direct the 'camera' and add details about lighting and mood to flesh out the world.",
    prompt: "Cinematic low-angle shot of a fluffy white cat, Studio Ghibli anime style, sleeping peacefully on dusty, leather-bound books inside a cozy, dimly-lit library. Soft morning light streams from a window.",
    breakdown: [
      "Composition: Cinematic low-angle shot",
      "Subject Detail: sleeping peacefully, dusty books",
      "Setting Detail: inside a cozy, dimly-lit library",
      "Lighting: Soft morning light streams from a window"
    ]
  },
  {
    level: 3,
    title: "Mastering Nuance & Artistic Control",
    description: "Add fine details, emotional tone, and specific artist influences for maximum control.",
    prompt: "Cinematic low-angle shot of a fluffy white cat, in the distinct whimsical style of Hayao Miyazaki, sleeping peacefully on a pile of dusty, leather-bound books inside a cozy, dimly-lit library. Soft morning light streams from a window, illuminating floating dust particles. The mood is tranquil and magical. Ultra-detailed.",
    breakdown: [
      "Artist Influence: in the distinct whimsical style of Hayao Miyazaki",
      "Atmosphere: illuminating floating dust particles",
      "Mood: The mood is tranquil and magical",
      "Quality: Ultra-detailed"
    ]
  }
]


export const promptExamplesText = [
  {
    level: 1,
    title: "The Clear Task",
    description: "Clearly state the subject, format, and what you want the AI to do.",
    prompt: "Write a short story about a detective who is also a ghost.",
    breakdown: [
      "Format: Write a short story",
      "Subject: about a detective who is also a ghost"
    ]
  },
  {
    level: 2,
    title: "Adding Constraints & Tone",
    description: "Provide specific rules for the output, like length, and define the desired mood.",
    prompt: "Write a short story (around 100 words) about a detective who is also a ghost. The tone should be mysterious and slightly sad.",
    breakdown: [
      "Constraint: around 100 words",
      "Tone: mysterious and slightly sad"
    ]
  },
  {
    level: 3,
    title: "Defining Persona & Voice",
    description: "Give the AI a personality and tell it exactly how to behave and structure the response.",
    prompt: "Act as a hardboiled 1940s detective who is secretly a ghost. Narrate a short story (around 200 words) about solving your own murder. The tone must be noir, cynical, and witty. Use metaphors related to being insubstantial or unseen.",
    breakdown: [
      "Persona: Act as a hardboiled 1940s detective who is secretly a ghost",
      "Task: Narrate a short story about solving your own murder",
      "Constraint: around 200 words",
      "Voice: noir, cynical, and witty",
      "Literary Device: Use metaphors related to being insubstantial or unseen"
    ]
  }
];
