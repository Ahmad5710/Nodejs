const express = require("express");
const errorHandler = require("../../middleware/error");
const Product = require("../../models/product");
const { generateAuthToken } = require("../../utils/helpers");
const createProductSchema = require("./validationSchema");
const authHandler = require("../../middleware/auth");


const router = express.Router();

router.get(
  "/",authHandler,
  errorHandler(async (req, res) => {
    const product = await Product.find();
    res.status(200).send(product);
  })
);

router.get(
  "/:prodId",authHandler,
  errorHandler(async (req, res) => {
    const product = await Product.findOne({ _id: req.params.prodId });

    res.status(200).send(Product);
  })
);


router.post("/",authHandler,async (req, res) => {
  const payload = req.body;
  const { error } = createProductSchema(payload);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  let product = new Product(payload);

  product = await product.save();
  res.status(200).send({ Product });
});



// ==============================
// Now Create a Update Route
router.patch("/:productId",authHandler, async (req, res) => {
  const updatedUser = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  try {
    res.status(200).json({
      status: "Success",
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// now create a delete route

router.delete("/:productId",authHandler, async (req, res) => {
  const id = req.params.productId;
  await Product.findByIdAndRemove(id).exec();
  res.send("Deleted");
});

module.exports = router;
