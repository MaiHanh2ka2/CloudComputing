var expesss = require('express')
const { insertProduct, viewAllProduct, deleteProduct, editProduct, findProduct, searchProductByName } = require('./databaseHandle')
var app = expesss()

app.set('view engine','hbs')
app.use(expesss.urlencoded({extended:true}))
app.use(expesss.static("publics"))

app.post('/search',async (req,res)=>{
    const search = req.body.search
    const results = await searchProductByName(search)
    res.render('allProduct',{'results':results})
})

// app.post('/edit',async (req,res)=>{
//     const id = req.body.id
//     const name = req.body.txtName
//     const price = req.body.txtPrice
//     const picture = req.body.txtPic
//     await editProduct(id, name, price, picture)
//     res.redirect('/all')
// })

// app.get('/edit',async (req,res)=>{
//     const id = req.query.id
//     const productToEdit = await findProduct(id)
//     res.render('edit',{product:productToEdit})
// })

app.get('/delete',async (req,res)=>{
    const id = req.query.id
    await deleteProduct(id)
    res.redirect('/all')
})

app.get('/all',async (req,res)=>{
    let results = await viewAllProduct()
    console.log(results)
    res.render('allProduct',{results:results})
})

app.post('/new',async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPic
    const newProduct = {
        name :name,
        price:price,
        picture: picture
    }
    let id = await insertProduct(newProduct)
    console.log(id)
    res.redirect('/all')

})

app.get('/new',(req,res)=>{
    res.render('newProduct')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is running!")