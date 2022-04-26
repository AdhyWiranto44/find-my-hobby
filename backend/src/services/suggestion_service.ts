import CategoryRepository from "../repositories/category_repository";
import SuggestionRepository from "../repositories/suggestion_repository";


export default class SuggestionService {

  constructor() {}

  async getAll() {
    const suggestions = await new SuggestionRepository().getAll();

    if (suggestions.length < 1) throw new Error("Suggestions empty.");

    return suggestions;
  }

  async getByCategory(slug: string) {
    let suggestions = await new SuggestionRepository().getAll();
    
    suggestions = suggestions.filter(suggestion => {
      return suggestion.category[0].slug == slug;
    });

    if (suggestions.length < 1) throw new Error("Suggestions not found.");

    return suggestions;
  }

  async getOne(slug: string = "") {
    const suggestion = await new SuggestionRepository().getOne(slug);

    if (suggestion == null) throw new Error("Suggestion not found.");

    return suggestion;
  }

  async create(req: any) {
    const newSuggestion = {
      name: req.body.name,
      slug: req.body.name.replace(/\s+/g, '-').toLowerCase(),
      description: req.body.description,
      category: "",
      img: "",
      visited_count: 0,
      suggester_email: req.body.suggester_email,
      created_at: Date(),
      updated_at: Date()
    }

    const category = await new CategoryRepository().getOne(req.body.category);
    newSuggestion.category = category;

    const suggestion = await new SuggestionRepository().insertOne(newSuggestion);

    return suggestion;
  }

  async update(req: any, slug: string) {
    let category: any = req.body.category;
    if (category) {
      const foundCategory: any = await new CategoryRepository().getOne(category);
      if (!foundCategory) throw new Error("Category not found.");
      req.body.category = [foundCategory];
    }
    const suggestion = await new SuggestionRepository().update(slug, req.body);

    if (suggestion == null) throw new Error("Suggestion not found.");

    return suggestion;
  }

  async delete(slug: string) {
    const suggestion = await new SuggestionRepository().remove(slug);

    if (suggestion == null) throw new Error("Suggestion not found.");

    return suggestion;
  }

}