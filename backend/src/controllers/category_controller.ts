import Hobby from "../models/Hobby";
import { Category } from "../models/Category";


class CategoryController {
 
  async index(req: any, res: any) {
    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    let categories: any[] = [];

    await Category.find().sort({ name: 1 }).exec()
      .then(foundCategories => {
        if (foundCategories.length > 0) {
          categories = [...foundCategories];
        } else {
          res.redirect("/admin/dashboard");
        }
      })
      .catch(err => {
        console.log(err);
        res.redirect("/admin/dashboard");
      });

    const data = {
      title: "Tampil Kategori",
      alert: "",
      categories: categories
    }
    res.render("tampil-kategori", data);
  }

  async show(req: any, res: any) {
    const categorySlug = req.params.categorySlug;
    let category: any = null;
    let hobbies: any[] = [];

    await Category.findOne({ slug: categorySlug }).exec()
      .then((foundCategory) => {
        if (foundCategory !== null) {
          category = foundCategory;
        } else {
          return res.redirect("/");
        }
      })
      .catch(err => {
        console.error(err);
        return res.redirect("/");
      })

    await Hobby.find({ "category.slug": category.slug }).exec()
      .then((foundHobbies) => {
        if (foundHobbies.length > 0) {
          hobbies = [...foundHobbies];
        } else {
          return res.redirect("/");
        }
      })
      .catch(err => {
        console.log(err);
        return res.redirect("/");
      });

    const data = {
      currentDate: new Date().getFullYear(),
      kind: "kategori",
      category: category,
      hobbies: hobbies
    }
    res.render("cari-hobi", data);
  }

create(req: any, res: any) {
    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    const data = {
      title: "Tambah Kategori",
      alert: "",
      category: ""
    }
    res.render("tambah-kategori", data);
  }

store(req: any, res: any) {
    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    const kategoriBaru = req.body;

    Category.findOne({ name: kategoriBaru.name }).exec()
      .then(foundCategory => {
        if (foundCategory === null) {
          const newCategory = new Category({
            name: kategoriBaru.name,
            slug: kategoriBaru.name.replace(/\s+/g, '-').toLowerCase()
          });
          newCategory.save();
        }
      })
      .catch(err => {
        console.log(err);
      });

    res.redirect("/admin/tampil-kategori");
  }

  async find(req: any, res: any) {
    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    const search = req.body.search || "";

    if (search === "") {
      return res.redirect("/admin/tampil-kategori");
    }

    let categories: any[] = [];

    await Category.find({ name: { $regex: ".*" + search + ".*", $options: 'i' } }).exec()
      .then(foundCategories => {
        if (foundCategories.length > 0) {
          categories = [...foundCategories];
        } else {
          return res.redirect("/admin/tampil-kategori");
        }
      })
      .catch(err => {
        console.log(err);
        return res.redirect("/admin/tampil-kategori");
      });

    const data = {
      title: "Tampil Kategori",
      categories: categories
    }
    res.render("tampil-kategori", data);
  }

  destroy(req: any, res: any) {
    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    const categoryId = req.body.categoryId;

    Category.findByIdAndRemove({ _id: categoryId }, (err: any) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin/tampil-kategori");
      }
    })
  }


  async edit(req: any, res: any) {
    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    const categorySlug = req.params.slug;
    let category = null;

    await Category.findOne({ slug: categorySlug }).exec()
      .then(foundCategory => {
        if (foundCategory !== null) {
          category = foundCategory;
        } else {
          return res.redirect("/admin/tampil-kategori");
        }
      })
      .catch(err => {
        console.log(err);
        return res.redirect("/admin/tampil-kategori");
      });

    const data = {
      title: "Mengubah Kategori",
      category: category,
      alert: ""
    }
    res.render("tambah-kategori", data);
  }

  update(req: any, res: any) {
    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    const kategori = req.body;

    Category.findByIdAndUpdate(kategori.id_kategori, { name: kategori.name }).exec()
      .catch(err => {
        console.log(err);
      });

    res.redirect("/admin/tampil-kategori");
  }

}


export default CategoryController;