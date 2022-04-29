import CategoryRepository from "../repositories/category_repository";


export default class CategoryService {

  constructor() {}

  async getAll() {
    const categories = await new CategoryRepository().getAll();

    if (categories.length < 1) throw new Error("Categories empty.");

    return categories;
  }

  async getOne(slug: string = "") {
    const category = await new CategoryRepository().getOne(slug);

    if (category == null) throw new Error("Category not found.");

    return category;
  }

  async create(req: any) {
    const newCategory = {
      name: req.body.name,
      slug: req.body.name.replace(/\s+/g, '-').toLowerCase(),
    }

    const category = await new CategoryRepository().insertOne(newCategory);

    return category;
  }

  async update(req: any, slug: string) {
    const category = await new CategoryRepository().update(slug, req.body);

    return category;
  }

  async delete(slug: string) {
    const category = await new CategoryRepository().remove(slug);

    return category;
  }
}