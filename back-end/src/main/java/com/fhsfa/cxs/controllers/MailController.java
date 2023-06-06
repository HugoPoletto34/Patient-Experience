package com.fhsfa.cxs.controllers;

import java.util.HashMap;
import java.util.Map;

import com.fhsfa.cxs.entities.MailObject;
import com.fhsfa.cxs.services.EmailService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/mail")
public class MailController {

    @Autowired
    public EmailService emailService;

    private static final Map<String, Map<String, String>> labels;

    static {
        labels = new HashMap<>();

        //Simple email
        Map<String, String> props = new HashMap<>();
        props.put("headerText", "Send Simple Email");
        props.put("messageLabel", "Message");
        props.put("additionalInfo", "");
        labels.put("send", props);

        //Email with template
        props = new HashMap<>();
        props.put("headerText", "Send Email Using Text Template");
        props.put("messageLabel", "Template Parameter");
        props.put("additionalInfo",
                "The parameter value will be added to the following message template:<br>" +
                        "<b>This is the test email template for your email:<br>'Template Parameter'</b>"
        );
        labels.put("sendTemplate", props);

        //Email with attachment
        props = new HashMap<>();
        props.put("headerText", "Send Email With Attachment");
        props.put("messageLabel", "Message");
        props.put("additionalInfo", "To make sure that you send an attachment with this email, change the value for the 'attachment.invoice' in the application.properties file to the path to the attachment.");
        labels.put("sendAttachment", props);

    }


    @RequestMapping(value = "/send", method = RequestMethod.POST)
    public ResponseEntity<MailObject> createMail(@RequestBody MailObject mailObject) {
        MailObject mail = new MailObject();
        BeanUtils.copyProperties(mailObject, mail);
        emailService.sendSimpleMessage(mail);

        return new ResponseEntity<>(mail, HttpStatus.CREATED);

    }

}