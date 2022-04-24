import User from "../models/User";


class AuthController {

  index(req: any, res: any) {
      if (req.isAuthenticated()) {
          return res.redirect("/admin/dashboard");
      }
  
      User.findOne().exec()
      .then((foundUser: any) => {
          if (foundUser === null) {
              // User.register({username: "admin"}, "12345");
              res.redirect("/auth/login");
          }
      })
      .catch((err: any) => {
          console.error(err);
          res.redirect("/");
      });
  
      res.render("login", {currentDate: new Date().getFullYear()});
  }
  
  login(req: any, res: any) {
      const user = new User({
          username: req.body.username,
          password: req.body.password
      });
  
      User.findOne({username: user.username}).exec()
      .then((foundUser: any) => {
          if (foundUser !== null) {
              // req.login(user, (err: any) => {
              //     passport.authenticate('local')(req, res, function() {
              //         console.log("logged in!");
              //     });
              // });
              res.redirect('/admin/dashboard');
          } else {
              res.redirect('/auth/login');
          }
      })
      .catch((err: any) => {
          console.error(err);
          res.redirect('/auth/login');
      });
      
  }
  
  logout(req: any, res: any) {
      try {
          req.logout();
          res.redirect("/auth/login");
      } catch (err) {
          console.error(err);
          res.redirect("/");
      }
  }

}


export default AuthController;