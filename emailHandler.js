function sendMail(emailOptions) {
  let emailTemplate = HtmlService.createTemplateFromFile('emailTemplate'),
      emailRecipient = 'peteriniubong@gmail.com,'+emailOptions.email;
      emailTemplate.data = emailOptions
      
  
  // createGoogleDriveTextFile(emailTemplate.getCode())
  // return

  const emailBody = emailTemplate.evaluate().getContent()

  // Send Mail
  MailApp.sendEmail({
    to: emailRecipient,
    subject: "Your application is approved!",
    htmlBody: emailBody,
    inlineImages:{
        topfive: emailOptions.headerChartImage,
    },
    attachments: emailOptions.attachment,
  })
}

