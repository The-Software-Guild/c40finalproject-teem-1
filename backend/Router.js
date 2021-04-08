const bcrypt = require('bcrypt');
class Router {

    constructor(app, db){
        this.login(app, db);
        this.logout(app, db);
        this.add(app,db);
        this.isLoggedIn(app, db);
        this.store(app, db);

    }

    login(app, db){
        app.post('/login', (req, res) => {
           let username = req.body.username;
           let password = req.body.password;
           username = username.toLowerCase();
           
           if(username.length > 12 || password.length > 12){
               res.json({
                   success: false,
                   msg: 'Username or password too short'
               })
               return;

           }
           let cols = [username];
           db.query('SELECT * from user Where username = ? Limit 1', cols, (err, data, fields) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'An error occured, please try again'
                })
                return;
            }
            //found 1 user with this username
           if(data && data.length === 1){
            bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
                if (verified){
                    req.session.userID = data[0].id;
                    res.json({
                        success: true,
                        username: data[0].username
                    })
                    return;
                }
                else{
                    res.json({
                       success: false,
                        msg: "Invalid password"
                    })
                }
            });
       }else{
           res.json({
               success: false, 
               msg: "User not found, try again"
           })
       }
       
           });

        });
    }
    store(app, db){
        app.post('/store', (req,res) => {
            let userid = req.session.userID;
            let ingredients = req.body.uingredients;
           
           
          
            ingredients.forEach(element => {
                let cols = [userid, element];
                db.query('insert ignore into user_ingredient(id_ingredient, id_User) select ingredient.id, user.id from ingredient, user where user.id = ? and ingredient.strName like ?;', cols, (err, data, fields) => {
                    if(err){
                        console.log(err);
                        res.json({
                            success: false,
                            msg: 'An error occured, please try again'
                        })
                        return;
                    }
                   
                });
            });
            
            
        })
 
}
    add(app, db){
        app.post('/add', (req,res) => {
            let username = req.body.username;
            let password = req.body.password;
            console.log(username);
            username = username.toLowerCase();
            const bcrypt = require('bcrypt');

            let pswrd = bcrypt.hashSync(password, 9);
            let cols = [username, pswrd];
           db.query('INSERT INTO user(username, password) VALUES(?,?)', cols, (err, data, fields) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'An error occured, please try again'
                })
                return;
            }


        })
    })
    }
    logout(app, db){
       app.post('/logout', (req, res) => {
           if(req.session.userID) {
               req.session.destroy();
               res.json({
                   success: true
               })
               return true;
           }
           else{
               res.json({
                   success: false
               })
               return false;
           }
       }) 
    }
    isLoggedIn(app, db){
        app.post('/isLoggedIn', (req, res) => {
            if(req.session.userID){
                let cols = [req.session.userID];
                db.query('SELECT * FROM user WHERE id = ? LIMIT 1',cols, (err, data, fields) =>{
                    if(data && data.length ===1){
                        res.json({
                            success: true,
                            username: data[0].username
                        })
                        return true;
                    }
                    else{
                        res.json({
                            success: false
                        })
                    }
                });
            }
            else{
                res.json({
                    success:false
                })
            }
        });
    }
}
module.exports = Router;