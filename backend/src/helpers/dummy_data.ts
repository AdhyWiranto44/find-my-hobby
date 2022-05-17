import { hashSync } from "bcrypt";
import { faker } from '@faker-js/faker';


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

export const default_hobbies: any[] = [];
for (let i = 0; i < 50; i++) {
  const categories = ["teknologi", "audio-visual", "sastra", "kerajinan", "otomotif"];
  const hobby: any = {
    name: faker.name.jobTitle(),
    slug: faker.name.jobTitle().replace(/\s+/g, '-').toLowerCase(),
    description: faker.lorem.paragraph(),
    category: categories[Math.floor(Math.random()*categories.length)],
    img: "",
    community_name: "Komunitas di Facebook",
    community_link: "https://facebook.com/",
    visited_count: 0
  }
  default_hobbies.push(hobby);
}

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

export const default_roles = [
  {
    name: "Administrator",
    slug: "administrator"
  },
  {
    name: "Moderator",
    slug: "moderator"
  }
];