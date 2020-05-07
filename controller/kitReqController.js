const KitRequest = require("../model/kitRequestModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");


//exports.createKitRequest = factory.createOne(KitRequest);
exports.getAllKitRequests = factory.getAll(KitRequest);
exports.getKitRequest = factory.getOne(KitRequest);
exports.updateKitRequest = factory.updateOne(KitRequest);
exports.deleteKitRequest = factory.deleteOne(KitRequest);


exports.createKitRequest = catchAsync(async (req, res, next) => {
  const {
    name, state, stateName, city, area, road, landmark, houseNo, kitQuantity, phone, email
  } = req.body;

  const receiverOutput = `
        <h3><u>Kit Request </u></h3>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          <li>Email: ${phone}</li>

        </ul>
      <ul>
        <li>There is a needy people in ${stateName}, ${city} ${road}, ${houseNo} they Required ${kitQuantity} Kits. </li>
        <li></li>
    
      </ul>`;

  const senderOutput = `
    <h3><u>Kit Request </u></h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Email: ${phone}</li>

    </ul>
  <ul>
    <li>There is a needy people in ${stateName}, ${city} ${road}, ${houseNo} they Required ${kitQuantity} Kits. </li>
    <li></li>

  </ul>
  
      <small>Please ignore this email if it's not meant for you. Thank you.</small>`;

  try {
    // const doc = await KitRequest.create(req.body);
    let maillist = ["kamran@globuslabs.com", "zeeshan.globuslabs@gmail.com"];

    const newKitRequest = new KitRequest({
      name, state, stateName, city, area, road, landmark, houseNo, kitQuantity, phone, email
    });
    const doc = await newKitRequest.save();
    console.log(req.body);
    await sendEmail({
      to: maillist,
      subject: `New Required Ration Kit Alert`,
      output: receiverOutput
    });
    await sendEmail({
      to: email,
      subject: `New Required Ration Kit Alert`,
      output: senderOutput
    });
    res.status(200).json({
      status: "success",
      data: doc,
      message: "Email sent successfully!"
    });
  } catch (err) {
    console.log(err);
    return next(
      new AppError("There was an error sending email. Try again later!"),
      500
    );
  }
});
