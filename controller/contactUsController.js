const ContactUs = require("../model/contactUsModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");


//exports.createContactUs = factory.createOne(ContactUs);
exports.getAllContactUss = factory.getAll(ContactUs);
exports.getContactUs = factory.getOne(ContactUs);
exports.updateContactUs = factory.updateOne(ContactUs);
exports.deleteContactUs = factory.deleteOne(ContactUs);




exports.createContactUs = catchAsync(async (req, res, next) => {
    const {
        name, ngo, state, stateName, city, area, road, landmark, houseNo, phone, pincode, email, website
    } = req.body;

    console.log(req.body);

    const receiverOutput = `
        <h3><u>Kit Request </u></h3>
        <ul>
          <li>Name: ${name}</li>
          <li>Name: ${ngo}</li>
          <li>Email: ${email}</li>
          <li>Email: ${phone}</li>

        </ul>
      <ul>
        <li>We Need Your Application. We Are From ${stateName}, ${city} ${road}, ${houseNo}, ${pincode}  </li>
        <li></li>
    
      </ul>`;

    try {
        // const doc = await ContactUs.create(req.body);
        let maillist = ["kamran@globuslabs.com", "zeeshan.globuslabs@gmail.com"];

        const newContactUs = new ContactUs({
            name, ngo, state, stateName, city, area, road, landmark, houseNo, phone, pincode, email, website,
        });
        const doc = await newContactUs.save();

        await sendEmail({
            to: maillist,
            subject: `A New User Contacted You`,
            output: receiverOutput
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
