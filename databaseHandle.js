const { ObjectId } = require('bson')
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://maihanh2012:vit01062022@cluster0.xw85oue.mongodb.net/test'

async function insertProduct(newProduct) {
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1002")
    let id = await db.collection("products").insertOne(newProduct)
    return id
}


async function viewAllProduct() {
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1002")
    let results = await db.collection("products").find().toArray()
    return results
}


async function deleteProduct(id) {
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1002")
    await db.collection("products").deleteOne({ _id: ObjectId(id) })
}

// async function editProduct(id, name, price, picture) {
//     let client = await mongoClient.connect(url)
//     let db = client.db("GCH1002")
//     db.collection("products").updateOne({ _id: ObjectId(id) },
//         { $set: { "name": name, "price": price, "pictureURL": picture } })
// }

// async function findProduct(id) {
//     let client = await mongoClient.connect(url)
//     let db = client.db("GCH1002")
//     const productToEdit = await db.collection("products").findOne({ _id: ObjectId(id) })
//     return productToEdit
// }

async function searchProductByName(name){
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1002")
    const results = await db.collection("products").find({ name: new  RegExp(name)  }).toArray()
    return results
}

module.exports = { insertProduct, viewAllProduct, deleteProduct, searchProductByName}