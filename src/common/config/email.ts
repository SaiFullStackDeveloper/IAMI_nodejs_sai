import { MailtrapClient } from "mailtrap"
import { env } from "./env";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

const { FROM_EMAIL, NODE_ENV, MAILTRAP_API_KEY } = env

const mg = new MailtrapClient({
    token: MAILTRAP_API_KEY,
});


export const emailHtml = (file: string, data: Object) => {
    // Read the Handlebars template file
    // const templatePath = path.join(__dirname, NODE_ENV === 'development' ? '../../templates' : "./templates", file);
    const templatePath = path.resolve(
        __dirname,
        NODE_ENV === 'development' ? '../src/templates' : './templates',
        file
      );
    const templateSource = fs.readFileSync(templatePath, "utf8");

    // Compile the template with Handlebars
    const template = Handlebars.compile(templateSource, {
        noEscape: true
    });

    // Generate the email HTML with the provided data
    return template(data);
}

export const signupEmail = async (email: string, name: string, link: string) => {

    const html = emailHtml('auth/signup/signup.hbs', {
        name,
        link
    })

    const plainText = emailHtml('auth/signup/signup-plain.hbs', {
        name,
        link
    })

    try {

        await mg.send({
            from: {
                name: "Iamiinsure",
                email: FROM_EMAIL
            },
            to: [{
                email: email,
                name: name
            }],
            subject: `${name} - Email Verification`,
            html: html,
            text: plainText
        })
    } catch (e) {
        console.log(e)
    }
}

export const forgotEmail = async (email: string, name: string, link: string) => {

    const html = emailHtml('auth/forgot/forgot.hbs', {
        name,
        link
    })

    const plainText = emailHtml('auth/forgot/forgot-plain.hbs', {
        name,
        link
    })

    try {
        await mg.send({
            from: {
                name: "Iamiinsure",
                email: FROM_EMAIL
            },
            to: [{
                email: email,
            }],
            subject: `${name} - Forgot Password Link`,
            html: html,
            text: plainText
        })

    } catch (e) {
        console.log(e)
    }
}