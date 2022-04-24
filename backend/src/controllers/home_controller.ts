import Hobby from "../models/Hobby";
import { Category } from "../models/Category";
// const [default_categories, default_hobbies, default_suggestions] = require("../helpers/dummy_data");
import Suggestion from "../models/Suggestion";


class HomeController {

  async index(req: any, res: any) {
    let hobbies: any[] = [];
    let categories: any[] = [];

    await Hobby.find().limit(5).sort({ visited_count: -1 }).exec()
      .then((foundHobbies) => {
        if (foundHobbies.length < 1) {
          // this.insertDefaultCategories();
          // this.insertDefaultHobbies();
          // this.insertDefaultSuggestions();
          return res.redirect("/");
        }
        hobbies = [...foundHobbies];
        return Category.find().exec();
      })
      .then((foundCategories) => {
        categories = [...foundCategories];
      })
      .catch(err => { console.error(err) });

    const data = {
      currentDate: new Date().getFullYear(),
      hobbies: hobbies,
      categories: categories
    }
    res.render("index", data);
  }

find = async (req: any, res: any) => {
    const search = req.query.title || "";
    let hobbies: any[] = [];

    if (search == "") return res.redirect("/");

    await Hobby.find({ name: { $regex: ".*" + search + ".*", $options: 'i' } }).exec()
      .then(foundHobbies => {
        if (foundHobbies.length > 0) {
          hobbies = [...foundHobbies];
        }
      })
      .catch(() => {
        return res.redirect("/");
      });

    const data = {
      currentDate: new Date().getFullYear(),
      kind: "mencari",
      hobbies: hobbies,
      search: search
    }
    res.render("cari-hobi", data);
  }

findRandomHobby = (req: any, res: any) => {
    Hobby.aggregate([{ $sample: { size: 1 } }]).exec()
      .then(foundHobby => {
        const recommendedHobby = foundHobby[0].slug;
        const hobbyCategory = foundHobby[0].category[0].slug;
        res.redirect(`/hobby/${hobbyCategory}/${recommendedHobby}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  // insertDefaultCategories() {
  //   Category.insertMany(default_categories);
  // }

  // insertDefaultHobbies() {
  //   Hobby.insertMany(default_hobbies);
  // }
  // insertDefaultSuggestions() {
  //   Suggestion.insertMany(default_suggestions);
  // }

}


export default HomeController;