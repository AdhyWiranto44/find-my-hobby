import Hobby from "../models/Hobby";
import Suggestion from "../models/Suggestion";


class DashboardController {

  async index(req: any, res: any) {
    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    let hobbies = [];
    let suggestions = [];

    await Hobby.find().exec()
      .then((foundHobbies: any) => {
        hobbies = [...foundHobbies];
      })
      .catch((err: any) => {
        console.error(err);
      });

    await Suggestion.find().exec()
      .then((foundSuggestions: any) => {
        suggestions = [...foundSuggestions];
      })
      .catch((err: any) => {
        console.error(err);
      });

    const data = {
      title: "Dashboard",
      hobbies_length: hobbies.length,
      suggestions_length: suggestions.length
    }
    res.render("dashboard", data);
  }

}


export default DashboardController;