import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import ContactThankyouMail from "@/emails/contact-thankyou-mail";
import ContactAdminMail from "@/emails/contact-admin-mail";
import { render } from "@react-email/render";
import { sendEmail } from "@/lib/mail";
import { sendWhatsAppMessage } from "@/lib/send-whatsapp";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const {
      name,
      email,
      phoneNumber,
      country,
      state,
      city,
      query,
      //whatsapp_optin,
    } = body;

    // Check if all required fields are present
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !country ||
      !state ||
      !city ||
      !query
    ) {
      return NextResponse.json("Missing required fields", { status: 400 });
    }

    const combinedData = {
      name,
      email,
      phoneNumber,
      country,
      state,
      city,
      query,
    };

    // Create the contact in the database
    const contact = await db.contactUsQueries.create({
      data: combinedData,
    });

    const createdAt =
      contact.createdAt instanceof Date
        ? contact.createdAt
        : new Date(contact.createdAt);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    // Format the date according to options
    const formattedTimestamp = createdAt.toLocaleString("en-IN", options);

    // Send WhatsApp message to the user
    // if (whatsapp_optin) {
    //   await sendWhatsAppMessage({
    //     to: phoneNumber,
    //     name,
    //     email,
    //     templateId: process.env.QUICKREPLY_CONTACT_TEMPLATE_ID as string,
    //     params: [name],
    //     // button_params: [
    //     //   `https://wa.me/${phoneNumber}?text=Hi%20${name},%20I%20am%20interested%20in%20the%20Vedique%20program.`,
    //     // ],
    //     link: process.env.QUICKREPLY_VIDEO_URL as string,
    //   });
    // }

    // Send thank you email to the user
    await sendEmail({
      to: combinedData.email,
      subject: "Thank you for contacting us!",
      html: render(ContactThankyouMail({ name: combinedData.name })),
    });

    // Send notification email to the admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL as string,
      subject: "New contact query from dr shikha sharma website",
      html: render(
        ContactAdminMail({
          name: combinedData.name,
          email: combinedData.email,
          phoneNumber: combinedData.phoneNumber,
          country: combinedData.country,
          state: combinedData.state,
          city: combinedData.city,
          message: combinedData.query,
          timestamp: formattedTimestamp,
        })
      ),
    });

    return NextResponse.json(
      "Thank you for getting in touch with us. We have received your message and our team will get back to you as soon as possible.",
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("[CONTACT]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
