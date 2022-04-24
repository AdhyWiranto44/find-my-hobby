import showAlert from "../helpers/show_alert";
import { Category } from "../models/Category";
import Hobby from "../models/Hobby";
import Suggestion from "../models/Suggestion";


class SuggestionController {

  async index(req: any, res: any) {
    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    let suggestions: any[] = [];

    await Suggestion.find().sort({ name: 1 }).exec()
      .then(foundSuggestions => {
        suggestions = [...foundSuggestions];
      })
      .catch(err => {
        console.error(err);
      });

    const data = {
      title: "Tampil Saran Hobi",
      suggestions: suggestions
    }
    res.render("tampil-saran-hobi", data);
  }

  async acceptSuggestion(req: any, res: any) {
    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    const tambahSaran = req.body.tambahSaran;
    let suggestion: any = null;

    await Suggestion.findOne({ _id: tambahSaran }).exec()
      .then(foundSuggestion => {
        if (foundSuggestion !== null) {
          suggestion = foundSuggestion;
        }
      })
      .catch(err => {
        console.error(err);
      });

    await Hobby.findOne({ slug: suggestion.slug }).exec()
      .then(foundHobby => {
        if (foundHobby === null) {
          const saranHobi = new Hobby({
            name: suggestion.name,
            slug: suggestion.slug,
            description: suggestion.description,
            category: [{
              _id: suggestion.category[0]._id,
              name: suggestion.category[0].name,
              slug: suggestion.category[0].slug
            }],
            img: suggestion.img,
            visited_count: 0,
            suggester_email: suggestion.suggester_email,
            created_at: Date(),
            updated_at: Date()
          });
          saranHobi.save();
          Suggestion.findByIdAndRemove(suggestion._id).exec();
        }
      })
      .catch(err => {
        console.error(err);
      });

    res.redirect("/admin/tampil-saran-hobi");
  }

denySuggestion = (req: any, res: any) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    const tolakSaran = req.body.tolakSaran;

    Suggestion.findByIdAndRemove(tolakSaran).exec()
      .catch(err => {
        console.log(err);
      });
    res.redirect("/admin/tampil-saran-hobi");
  }

create = async (req: any, res: any) => {
    let categories: any[] = [];

    await Category.find().sort({ name: 1 }).exec()
      .then(foundCategories => {
        categories = [...foundCategories];
      })
      .catch(err => {
        console.error(err);
      });

    const data = {
      title: "Form Saran Hobi",
      alert: "",
      categories: categories
    }
    res.render("saran-hobi", data);
  }

store = async (req: any, res: any) => {
    const saranHobi = req.body;
    let suggestion = null;
    let categories: any[] = [];

    // Mengecek apakah ada saran hobi yang sama
    await Suggestion.findOne({ name: { $regex: saranHobi.name, $options: 'i' } }).exec()
      .then(foundSuggestion => {
        if (foundSuggestion !== null) {
          suggestion = foundSuggestion;
        }
      })
      .catch(err => {
        console.error(err);
      });

    await Category.find().exec()
      .then(foundCategories => {
        categories = [...foundCategories];
      })
      .catch(err => {
        console.error(err);
        const data = {
          title: "Form Saran Hobi",
          alert: showAlert("alert-danger", "Terjadi kegagalan sistem, silakan coba beberapa saat lagi."),
          categories: categories
        }
        res.render("saran-hobi", data);
      });

    // Jika ada saran hobi yang sama, maka kembali ke halaman tambah saran hobi
    if (suggestion !== null) {
      const data = {
        title: "Form Saran Hobi",
        alert: showAlert("alert-danger", "Sudah pernah ada yang menambahkan saran hobi tersebut! Silakan sarankan hobi yang lain."),
        categories: categories
      }
      return res.render("saran-hobi", data);
    }

    // Jika saran hobi tidak sama, maka lanjut tambahkan saran hobi tersebut
    await Category.findOne({ _id: saranHobi.category }).exec()
      .then(foundCategory => {
        if (foundCategory !== null) {
          const newSuggestion = new Suggestion({
            name: saranHobi.name,
            slug: saranHobi.name.replace(/\s+/g, '-').toLowerCase(),
            description: saranHobi.description,
            category: [foundCategory],
            img: "",
            visited_count: 0,
            suggester_email: saranHobi.email,
            created_at: Date(),
            updated_at: Date()
          });
          newSuggestion.save();

          const data = {
            title: "Form Saran Hobi",
            alert: showAlert("alert-success", "Saran hobi berhasil kami terima."),
            categories: categories
          }
          res.render("saran-hobi", data);
        }
      })
      .catch(err => {
        console.error(err);
        const data = {
          title: "Form Saran Hobi",
          alert: showAlert("alert-danger", "Saran hobi gagal dikirim, silakan coba beberapa saat lagi."),
          categories: categories
        }
        res.render("saran-hobi", data);
      });
  }

}


export default SuggestionController;