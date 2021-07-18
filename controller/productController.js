const products = require('../models/products')

// get all products
const getProducts = (req, res) => {
  res.status(200).json(products);
}

// get single product
const getSingleProduct = (req, res) => {
// find product by id
const productId = Number(req.params.id);
const singleProduct = products.filter(_singleProduct => _singleProduct.id === productId);

if (singleProduct.length == 1) {
  res.status(200).json({ success: true, data: singleProduct[0] });
} else {
  res.status(404).json({ success: false, msg: `Product with Id: ${productId} not Found` });
}
};

// create new products
const postProducts = (req, res) => {
  const { name, price, description, image } = req.body
  if (!name || !price || !description || !image) {
    return res.status(400).json({ success: false, msg: 'please provide name, price,desc,image' })
  }
  const newProducts = { id: products.length + 1, name: name, price: price, description: description, image: image }
  products.push(newProducts);

  res.status(200).json({ success: true, data: products })
}

// update existing product
const updateProducts = (req, res) => {
  const { id } = req.params
  const { name, price, description, image } = req.body
  const product = products.find((product) => product.id === Number(id))

  if (!product)
    return res.status(400).json({ success: false, msg: ` no products with id ${id}` })

  const newProduct = products.map((product) => {
    if (product.id === Number(id)) {
      product.id = Number(id)
      product.name = name
      product.price = price
      product.description = description
      product.image = image
    }
    return product
  })
  res.status(200).json({ success: true, data: newProduct })
}

// delete products
const deleteProducts = (req, res) => {
  const { id } = req.params
  const product = products.find((product) => product.id === Number(req.params.id))
  if (!product) {
    return res.status(404).json({ success: false, msg: `no product with id ${id}` })
  }
  const deleteProduct = products.filter(
    (product) => product.id !== Number(id)
  )
  return res.status(200).json({ success: true, data: deleteProduct });
}

module.exports = {
  getProducts,
  getSingleProduct,
  postProducts,
  updateProducts,
  deleteProducts,
};