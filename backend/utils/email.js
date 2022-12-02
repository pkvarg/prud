import nodemailer from 'nodemailer'
import { htmlToText } from 'html-to-text'
import pug from 'pug'
import path from 'path'

class Email {
  constructor(user, url, file) {
    console.log('user:', user)
    this.user = user.user
    this.to = user.email
    this.firstName = user.name
    this.url = url
    this.from = `Prúd Eshop <${process.env.EMAIL_FROM}>`
    // order
    this.products = []
    this.productsCount = user.productsCount
    for (let i = 0; i < user.productsCount; i++) {
      this.products.push(user[i])
    }
    this.addressinfo = user.addressinfo
    this.paidByWhom = user.paidByWhom
    //this.paymentMethod = user.paymentMethod
    let paymentMethod
    if (user.paymentMethod === 'Cash') {
      paymentMethod = 'Zaplatíte pri prevzatí'
    } else {
      paymentMethod = 'Zvolili ste platbu kartou'
    }
    this.paymentMethod = paymentMethod
    this.isPaid = user.isPaid ? 'Zaplatené kartou' : 'Nezaplatené'
    this.shippingPrice = user.shippingPrice
    this.taxPrice = user.taxPrice
    this.totalPrice = user.totalPrice
    this.orderId = user.orderId
    this.file = file
    //this.subject = user.subject
    this.message = user.message
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    // nodejs@pictusweb.sk
    return nodemailer.createTransport({
      pool: true,
      host: 'email.active24.com',
      port: 465,
      secure: true, // use TLS
      auth: {
        user: process.env.NODEJS_USERNAME,
        pass: process.env.NODEJS_PASSWORD,
      },
    })
  }

  // send the actual email
  async send(template, subject) {
    const __dirname = path.resolve()
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/backend/utils/mailTemplates/${template}.pug`,
      {
        user: this.user,
        firstName: this.firstName,
        email: this.to,
        url: this.url,
        subject,
        // order
        products: this.products,
        address: this.addressinfo,
        paidByWhom: this.paidByWhom,
        paymentMethod: this.paymentMethod,
        paid: this.isPaid,
        shippingPrice: this.shippingPrice,
        taxPrice: this.taxPrice,
        totalPrice: this.totalPrice,
        orderId: this.orderId,
        file: this.file,
        // contactForm
        emailSubject: this.subject,
        message: this.message,
      }
    )

    if (!this.file) {
      console.log('no file')
      let mailOptions = {
        from: this.from,
        to: this.to,
        bcc: 'info@pictusweb.sk',
        subject,
        html,
        text: htmlToText(html),
        // file attachment
        // attachments: [
        //   {
        //     filename: this.file,
        //     path: __dirname + `/${this.file}`,
        //     cid: `uniq-${this.file}`,
        //   },
        // ],
      }

      // 3) Create a transport and send email

      await this.newTransport().sendMail(mailOptions)
    }
    if (this.file) {
      console.log('is file')
      // 2) Define email options
      let mailOptions = {
        from: this.from,
        to: this.to,
        bcc: 'info@pictusweb.sk',
        subject,
        html,
        text: htmlToText(html),
        // file attachment
        attachments: [
          {
            filename: this.file,
            path: __dirname + `/${this.file}`,
            cid: `uniq-${this.file}`,
          },
        ],
      }
      // 3) Create a transport and send email

      await this.newTransport().sendMail(mailOptions)
    }
  }

  async sendOrderToEmail() {
    await this.send('orderToEmail', `Vaša objednávka ${this.orderId}`)
  }

  async sendPaymentSuccessfullToEmail() {
    await this.send('paymentSuccessfull', `Objednávka zaplatená`)
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Zmeňte si Vaše heslo')
  }

  async sendWelcome() {
    await this.send('welcome', 'Úspešná registrácia')
  }

  // contact Form
  async sendContactForm() {
    await this.send('emailForm', 'Kontakt Eshop')
  }
}

export default Email
