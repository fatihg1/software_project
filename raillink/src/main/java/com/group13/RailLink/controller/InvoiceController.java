package com.group13.RailLink.controller;

import com.group13.RailLink.model.Invoice;
import com.group13.RailLink.service.EmailService;
import com.group13.RailLink.service.InvoiceService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.xhtmlrenderer.pdf.ITextRenderer;
import org.thymeleaf.context.Context;

import com.group13.RailLink.service.TicketService;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import com.group13.RailLink.model.Ticket;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    private final TicketService ticketService;
    private final InvoiceService invoiceService;
    @Autowired
    private SpringTemplateEngine templateEngine;
    private EmailService emailService;
    
    @Autowired
    public InvoiceController(InvoiceService invoiceService, TicketService ticketService, SpringTemplateEngine templateEngine, EmailService emailService) {
        this.ticketService = ticketService;
        this.invoiceService = invoiceService;
        this.templateEngine = templateEngine;
        this.emailService = emailService;
    }

    // Endpoint to create an invoice after a payment is made
    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        Invoice savedInvoice = invoiceService.createInvoice(invoice);
        return ResponseEntity.ok(savedInvoice);
    }
    
    @GetMapping("/{ticketId}/pdf")
    public ResponseEntity<byte[]> downloadInvoicePdf(@PathVariable String ticketId) {
        Optional<Invoice> optionalInvoice = invoiceService.getInvoiceByTicketId(ticketId);
        if (!optionalInvoice.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Invoice invoice = optionalInvoice.get();

        // Get the associated ticket
        Ticket ticket = ticketService.getTicketByTicketId(ticketId);
        if (ticket == null) {
            return ResponseEntity.notFound().build();
        }

        try {
        // Process Thymeleaf template
        Context context = new Context();
        context.setVariable("invoice", invoice);
        context.setVariable("ticket", ticket);
        String processedHtml = templateEngine.process("invoice", context);
        
        // Convert to PDF
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ITextRenderer renderer = new ITextRenderer();
        renderer.setDocumentFromString(processedHtml);
        renderer.layout();
        renderer.createPDF(baos);
        baos.close();
        
        // Return the PDF
        byte[] pdfBytes = baos.toByteArray();
        
                
        String email = ticket.getEmail();
        try {
            System.out.println("email sender working...");
            emailService.sendInvoiceMail(
                email,
                "RailLink Ticket: " + ticketId,
                "Hello, your PDF version of your invoice is below",
                pdfBytes,
                "invoice_" + ticketId + ".pdf"
            );
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            e.printStackTrace();
        }
        
       
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "invoice_" + ticketId + ".pdf");
        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(e.getMessage().getBytes());
    }
    }
}
