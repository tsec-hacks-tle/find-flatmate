const cloudinary = require("cloudinary");

const FlatOwner = require("../models/flatOwnerModel");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.getAllFlatOwner = handlerFactory.getAll(FlatOwner);
exports.getFlatOwner = handlerFactory.getOne(FlatOwner);
exports.getMe = handlerFactory.getMe(FlatOwner);

// Update Profile
// Update Flatowner Profile ==> /api/v1/flatOwner/updateMe
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  if (req.body.role) {
    return next(new AppError("flat owner cannot edit role", 400));
  }

  const newFlatOwnerData = req.body;

  // Flatowner Profile Photo
  if (req?.body?.photo !== "") {
    // Update new photo
    const file = req.body.photo;

    // TODO: Check if the flatowner has not changes his photo. If yes not perform these steps
    // delete previous image from cloudinary
    if (req.flatOwner?.photo?.public_id) {
      cloudinary.v2.uploader.destroy(req.flatOwner.photo.public_id);
    }

    // add new image
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: process.env.CLOUDINARY_COMPANY_LOGO,
      width: 150,
      crop: "scale",
    });

    newFlatOwnerData.photo = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  if (req.body.photo === "") delete newFlatOwnerData.photo;

  const updatedFlatOwner = await FlatOwner.findByIdAndUpdate(
    req.user.id,
    newFlatOwnerData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: {
      user: updatedFlatOwner,
    },
  });
});
