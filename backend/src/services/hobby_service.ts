import HobbyRepository from "../repositories/hobby_repository";
import CategoryRepository from "../repositories/category_repository";


export default class HobbyService {

  constructor() {}

  async getAll() {
    const hobbies = await new HobbyRepository().getAll();

    if (hobbies.length < 1) throw new Error("Hobbies empty.");

    return hobbies;
  }

  async getByCategory(slug: string) {
    let hobbies = await new HobbyRepository().getAll();
    
    hobbies = hobbies.filter(hobby => {
      return hobby.category[0].slug == slug;
    });

    if (hobbies.length < 1) throw new Error("Hobbies not found.");

    return hobbies;
  }

  async getOne(slug: string = "") {
    const hobby = await new HobbyRepository().getOne(slug);

    if (hobby == null) throw new Error("Hobby not found.");

    return hobby;
  }

  async create(req: any) {
    const newHobby = {
      name: req.body.name,
      slug: req.body.name.replace(/\s+/g, '-').toLowerCase(),
      description: req.body.description,
      category: "",
      img: "",
      visited_count: 0
    }

    const category = await new CategoryRepository().getOne(req.body.category);
    newHobby.category = category;

    const hobby = await new HobbyRepository().insertOne(newHobby);

    return hobby;
  }

  async update(req: any, slug: string) {
    let category: any = req.body.category;
    if (category) {
      const foundCategory: any = await new CategoryRepository().getOne(category);
      if (!foundCategory) throw new Error("Category not found.");
      req.body.category = [foundCategory];
    }
    const hobby = await new HobbyRepository().update(slug, req.body);

    if (hobby == null) throw new Error("Hobby not found.");

    return hobby;
  }

  async delete(slug: string) {
    const hobby = await new HobbyRepository().remove(slug);

    if (hobby == null) throw new Error("Hobby not found.");

    return hobby;
  }
}