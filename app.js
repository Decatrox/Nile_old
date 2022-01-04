const express = require('express');
const app = express();
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require('bcrypt');
var user = ''

const products = [
    { product: 'Iphone 13 pro',
      link: '/iphone'
    },
    { product: 'Galaxy S21 Ultra',
      link: '/galaxy'
    },
    { product: 'Leaves of Grass',
      link: '/leaves'
    },
    { product: 'The Sun and Her Flowers',
      link: '/sun'
    },
    { product: 'Boxing Bag',
      link: '/boxing'
    },
    { product: 'Tennis Racket',
      link: '/tennis'
    }
]



app.use( express.static( "public" ) );
app.use(express.urlencoded({extended : true}));
app.set('views', __dirname + '/views');
app.listen(3000);



const dbURI = "mongodb+srv://mongoose:Habal123@cluster0.qqjp6.mongodb.net/netw?retryWrites=true&w=majority";

mongoose.connect(dbURI)
    .then((res) => {
        console.log('c to db');
    })
    .catch((err) => {
        console.log(err);
    });




// app.get('/add-user', (req, res) => {

    

//     const bcrypt = require('bcrypt');
//     const saltRounds = 10;
//     const myPlaintextPassword = 'test123';
//     const someOtherPlaintextPassword = 'not_bacon';

//     //gen pass
//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hash = bcrypt.hashSync(myPlaintextPassword, salt);

//     //check pass
//     console.log(bcrypt.compareSync(myPlaintextPassword, hash));

//     const user = new User({
//         Username : 'test',
//         Password : hash
//     });
    
//     user.save()
//     .then(
//         (result) => {res.send(result);
//     })
//     .catch(
//         (err) => { console.log(err);
//     });
    
// });



app.get('/', (req, res) => {

    if(user == ''){
        res.redirect('/login')
    }else{

        res.render('./home.ejs');
    }
});

app.get('/books', (req, res) => {

    if(user == ''){
        res.redirect('/login')
    }else{

        res.render('./books.ejs');
    }
});

app.get('/boxing', (req, res) => {

    if(user == ''){
        res.redirect('/login')
    }else{

        res.render('./boxing.ejs');
    }
});

app.get('/cart', (req, res) => {

    if(user == ''){
        res.redirect('/login')
    }else{

        var query = { Username: user };
    
        User.find(query).then((d)=>{
            
        var values123 = d[0].Cart;
        res.render('./cart.ejs', {results: values123, error:''});
         
        });

    }
});

app.get('/galaxy', (req, res) => {

    if(user == ''){
        res.redirect('/login')
    }else{

        res.render('./galaxy.ejs');
    }
});

app.get('/iphone', (req, res) => {

    if(user == ''){
        res.redirect('/login')
    }else{

        res.render('./iphone.ejs');
    }
});

app.get('/leaves', (req, res) => {

    if(user == ''){
        res.redirect('/login')
    }else{

        res.render('./leaves.ejs');
    }
});

app.get('/login', (req, res) => {
    res.render('./login.ejs', {error:''});
});

app.get('/login-user', (req, res) => {
    res.render('./login.ejs', {error:'Wrong Username'});
});

app.get('/login-pass', (req, res) => {
    res.render('./login.ejs', {error:'Wrong Password'});
});



app.get('/phones', (req, res) => {

    if(user == ''){
        res.redirect('/login')
    }else{

        res.render('./phones.ejs');
    }
});

app.get('/registration', (req, res) => {
    res.render('./registration.ejs', {error:''});
});

app.get('/registration-user', (req, res) => {
    res.render('./registration.ejs', {error:'Username taken'});
});

app.get('/sports', (req, res) => {

    if(user == ''){
        res.redirect('/login')
    }else{

        res.render('./sports.ejs');
    }
});

app.get('/sun', (req, res) => {

    if(user == ''){
        res.redirect('/login')
    }else{

        res.render('./sun.ejs');
    }
});

app.get('/tennis', (req, res) => {

    if(user == ''){
        res.redirect('/login')
    }else{

        res.render('./tennis.ejs');
    }
});

// app.get('/searchresults', (req, res) => {

//     if(user == ''){
//         res.redirect('/login')
//     }else{

//         res.render('./searchresults.ejs', {results: {}});
//     }
// });

app.post('/search', (req, res) => {

    let value = req.body.Search

    if (value && value.trim().length > 0){

        value = value.trim().toLowerCase()
        var po = products.filter((p) => { return p.product.toLowerCase().includes(value) })
        res.render('./searchresults.ejs', {results: po})
    }else{
        
        res.render('./searchresults.ejs', {results: []})
    }

});


app.post('/register', (req, res) => {


    let saltRounds = 10;
    let username = req.body.username;
    let PlaintextPassword = req.body.password;

    //gen pass
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(PlaintextPassword, salt);

    User.find({Username: username}, (err, data) =>{
        if(err){
            console.log(err);
        }else{
            
        
            if(data.length > 0){
                
            
                res.redirect('/registration-user')

            }else{

                const cuser = new User({
                    Username : username,
                    Password : hash,
                    Cart: []
                });
                
                cuser.save()
                .then(
                    (result) => {res.redirect('/login'); })
                .catch(
                    (err) => { console.log(err); });
                


            }
        }

    })

    

});


app.post('/login', (req, res) => {

    let username = req.body.username;
    let PlaintextPassword = req.body.password;

    User.find({Username: username})
    .then((result) =>{

        
        if(bcrypt.compareSync(PlaintextPassword, result[0].Password)){
            user = username
            res.redirect('/')

        }else{
            res.redirect('/login-pass');
        }
        

    }).catch((err) => {
        res.redirect('/login-user');
    });

});


app.post('/putitem', (req, res) => {

    var query = { Username: user };
    var link1 = req.body.item 
    var prod = req.body.val


    User.find(query).then((d)=>{
            

        var values12 = d[0].Cart;

         if(!values12.includes(prod)){

            values12.push(prod)
            

             User.findByIdAndUpdate(d[0]._id, {Cart: values12},(err,dd)=>{
                 if(err){
                     console.log(err)
                 }else{
                     console.log(dd)
                 }
                 
             });
             res.redirect('/'+ link1);
        }else{
            
            res.render('./cart.ejs', {results: values12, error:'Item Already Exists'})

        }

        });

     

});
