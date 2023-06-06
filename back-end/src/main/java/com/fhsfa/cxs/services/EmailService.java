package com.fhsfa.cxs.services;

import com.fhsfa.cxs.entities.MailObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service("emailService")
public class EmailService
{
    private static final String NOREPLY_ADDRESS = "px.fhsfa@gmail.com";

    @Autowired
    private JavaMailSender emailSender;



    public void sendSimpleMessage(MailObject mailObject) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(NOREPLY_ADDRESS);
            message.setTo(mailObject.getTo());
            message.setSubject(mailObject.getSubject());
            message.setText(mailObject.getText());

            emailSender.send(message);

        } catch (MailException exception) {
            exception.printStackTrace();
        }
    }
}