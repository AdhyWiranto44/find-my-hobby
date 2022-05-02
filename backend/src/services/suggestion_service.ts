import CategoryRepository from "../repositories/category_repository";
import SuggestionRepository from "../repositories/suggestion_repository";
import { StatusCodes} from 'http-status-codes';
import createError from 'http-errors';


export default class SuggestionService {

  constructor() {}

  async getAll() {
    const suggestions = await new SuggestionRepository().getAll();

    if (suggestions.length < 1) throw createError(StatusCodes.NOT_FOUND, "Suggestions empty.");

    return suggestions;
  }

  async getByCategory(category: string) {
    let suggestions = await new SuggestionRepository().getAll();
    
    suggestions = suggestions.filter(suggestion => {
      return suggestion.category == category;
    });

    if (suggestions.length < 1) throw createError(StatusCodes.NOT_FOUND, "Suggestions not found.");

    return suggestions;
  }

  async getOne(slug: string = "") {
    const suggestion = await new SuggestionRepository().getOne(slug);

    if (suggestion == null) throw createError(StatusCodes.NOT_FOUND, "Suggestion not found.");

    return suggestion;
  }

  async create(req: any) {
    const newSuggestion = {
      name: req.body.name,
      slug: req.body.name.replace(/\s+/g, '-').toLowerCase(),
      description: req.body.description,
      category: req.body.category,
      img: "",
      visited_count: 0,
      suggester_email: req.body.suggester_email
    }

    const category = await new CategoryRepository().getOne(newSuggestion.category);
    if (category == null) throw createError(StatusCodes.NOT_FOUND, "Category not found.");

    const suggestion = await new SuggestionRepository().insertOne(newSuggestion);

    return suggestion;
  }

  async update(req: any, slug: string) {
    const category = await new CategoryRepository().getOne(req.body.category);
    if (category == null) throw createError(StatusCodes.NOT_FOUND, "Category not found.");

    const suggestion = await new SuggestionRepository().update(slug, req.body);

    if (suggestion == null) throw createError(StatusCodes.NOT_FOUND, "Suggestion not found.");

    return suggestion;
  }

  async delete(slug: string) {
    const suggestion = await new SuggestionRepository().remove(slug);

    if (suggestion == null) throw createError(StatusCodes.NOT_FOUND, "Suggestion not found.");

    return suggestion;
  }

}