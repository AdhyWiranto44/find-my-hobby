import HobbyRepository from "../repositories/hobby_repository";
import CategoryRepository from "../repositories/category_repository";


export default class HobbyService {

  constructor() {}

  async getAll() {
    const hobbies = await new HobbyRepository().getAll();

    return hobbies;
  }

  async getOne(slug: string = "") {
    const hobby = await new HobbyRepository().getOne(slug);

    return hobby;
  }

  async create(req: any) {
    const newHobby = {
      name: req.body.name,
      slug: req.body.name.replace(/\s+/g, '-').toLowerCase(),
      description: req.body.description,
      category: "",
      img: "",
      visited_count: 0,
      created_at: Date(),
      updated_at: Date()
    }

    const category = await new CategoryRepository().findOne(req.body.category);
    newHobby.category = category;

    const hobby = await new HobbyRepository().insertOne(newHobby);

    return hobby;
  }

  async update(req: any, slug: string) {
    const hobby = await new HobbyRepository().update(slug, req.body);

    return hobby;
  }

  async delete(slug: string) {
    const hobby = await new HobbyRepository().remove(slug);

    return hobby;
  }
}