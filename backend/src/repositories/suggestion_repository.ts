import Suggestion from "../models/Suggestion";


export default class SuggestionRepository {

  constructor() {}
  
  async getAll(filter = {}, limit: number = 1, skip: number = 0) {
    const suggestions = await Suggestion.find(filter)
    .limit(limit)
    .skip(skip)
    .sort({ created_at: -1 })
    .exec();

    return suggestions;
  }

  async getOne(slug: any) {
    const suggestion = Suggestion.findOne({ slug }).exec();

    return suggestion;
  }

  async insertOne(suggestion: any) {
    const created = await new Suggestion(suggestion).save();

    return created;
  }

  async update(slug: string, category: any) {
    const updated = Suggestion.findOneAndUpdate({slug}, category, { runValidators: true });

    return updated;
  }

  async remove(slug: string) {
    const removed = Suggestion.findOneAndRemove({slug});

    return removed;
  }

}