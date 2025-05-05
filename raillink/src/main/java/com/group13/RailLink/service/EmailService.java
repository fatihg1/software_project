package com.group13.RailLink.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendInvoiceMail(String to, String subject, String text, byte[] pdfBytes, String filename) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);

            ByteArrayDataSource dataSource = new ByteArrayDataSource(pdfBytes, "application/pdf");
            helper.addAttachment(filename, dataSource);

            mailSender.send(message);
            
        } catch (MessagingException e) {
            System.err.println("Error occurred while sending email: " + e.getMessage());
            e.printStackTrace();
            
            throw new RuntimeException("Failed to send invoice email.");
        } catch (Exception e) {
            System.err.println("Unexpected error occurred: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Unexpected error occurred while sending email.");
        }
    }
}