import { hashSync } from "bcrypt";


export const default_categories = [
  {
    name: "Teknologi",
    slug: "teknologi"
  },
  {
    name: "Audio Visual",
    slug: "audio-visual"
  },
  {
    name: "Sastra",
    slug: "sastra"
  },
  {
    name: "Kerajinan",
    slug: "kerajinan"
  },
  {
    name: "Otomotif",
    slug: "otomotif"
  }
];

export const default_hobbies = [
  {
    name: "Menyanyi",
    slug: "menyanyi",
    description: "Menyanyi merupakan salah satu hobi yang populer di dunia.",
    category: "audio-visual",
    img: "",
    visited_count: 0
  },
  {
    name: "Menari",
    slug: "menari",
    description: "Menari merupakan salah satu hobi yang populer di dunia.",
    category: "audio-visual",
    img: "",
    visited_count: 0
  },
  {
    name: "Coding",
    slug: "coding",
    description: "Coding adalah memuat program seperti website.",
    category: "teknologi",
    img: "",
    visited_count: 0
  }
];

export const default_suggestions = [
  {
    name: "Mendayung perahu",
    slug: "mendayung-perahu",
    description: "ya mendayung",
    category: "teknologi",
    img: "",
    visited_count: 0,
    suggester_email: "adhy@gmail.com"
  },
  {
    name: "Memancing",
    slug: "memancing",
    description: "ya mendayung",
    category: "teknologi",
    img: "",
    visited_count: 0,
    suggester_email: "adhy@gmail.com"
  },
  {
    name: "Berlayar",
    slug: "berlayar",
    description: "ya mendayung",
    category: "teknologi",
    img: "",
    visited_count: 0,
    suggester_email: "adhy@gmail.com"
  }
];

export const default_users = [
  {
    "username": "admin",
    "password": hashSync("12345", 12)
  }
];