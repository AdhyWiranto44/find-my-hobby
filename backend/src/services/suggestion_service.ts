import CategoryRepository from "../repositories/category_repository";
import SuggestionRepository from "../repositories/suggestion_repository";
import { StatusCodes} from 'http-status-codes';
import createError from 'http-errors';
import SuggestionInterface from "../interfaces/suggestion_interface";


export default class SuggestionService {

  constructor() {}

  async getAll(filter = {}, limit: number = 1, skip: number = 0) {
    const suggestions = await new SuggestionRepository().getAll(filter, limit, skip);

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

  async create(newSuggestion: SuggestionInterface) {
    if (Object.keys(newSuggestion).length === 0) {
      throw createError(StatusCodes.BAD_REQUEST, "Data can't be empty.");
    }

    newSuggestion["slug"] = newSuggestion.name.replace(/\s+/g, '-').toLowerCase();

    const category = await new CategoryRepository().getOne(newSuggestion.category);
    if (category == null) throw createError(StatusCodes.BAD_REQUEST, "Category not found.");
    const suggestion = await new SuggestionRepository().insertOne(newSuggestion);

    return suggestion;
  }

  async update(updateSuggestion: SuggestionInterface, slug: string) {
    if (Object.keys(updateSuggestion).length === 0) {
      throw createError(StatusCodes.BAD_REQUEST, "Data can't be empty.");
    }

    const category = await new CategoryRepository().getOne(updateSuggestion.category);
    if (category == null) throw createError(StatusCodes.BAD_REQUEST, "Category not found.");

    const suggestion = await new SuggestionRepository().update(slug, updateSuggestion);

    if (suggestion == null) throw createError(StatusCodes.BAD_REQUEST, "Suggestion not found.");

    return suggestion;
  }

  async delete(slug: string) {
    const suggestion = await new SuggestionRepository().remove(slug);

    if (suggestion == null) throw createError(StatusCodes.BAD_REQUEST, "Suggestion not found.");

    return suggestion;
  }

}