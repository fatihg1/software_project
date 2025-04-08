package com.group13.RailLink.controller;

import com.group13.RailLink.model.Invoice;
import com.group13.RailLink.service.InvoiceService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    private final InvoiceService invoiceService;
    
    @Autowired
    public InvoiceController(InvoiceService invoiceService){
        this.invoiceService = invoiceService;
    }
    
    // Endpoint to create an invoice after a payment is made
    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        Invoice savedInvoice = invoiceService.createInvoice(invoice);
        return ResponseEntity.ok(savedInvoice);
    }
    
    // Endpoint to generate and download the invoice PDF by ticketId
    @GetMapping("/{ticketId}/pdf")
    public ResponseEntity<byte[]> downloadInvoicePdf(@PathVariable String ticketId) {
        Optional<Invoice> optionalInvoice = invoiceService.getInvoiceByTicketId(ticketId);
        if (!optionalInvoice.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Invoice invoice = optionalInvoice.get();

        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();

            // Add invoice title
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Paragraph title = new Paragraph("Invoice", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" "));

            // Add ticket id and transaction date
            Font subFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL);
            document.add(new Paragraph("Ticket ID: " + invoice.getTicketId(), subFont));
            String formattedDate = invoice.getTransactionDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            document.add(new Paragraph("Transaction Date: " + formattedDate, subFont));
            document.add(new Paragraph(" "));

            // Add payment details (mask sensitive data as needed)
            document.add(new Paragraph("Card Holder: " + invoice.getCardHolder(), subFont));
            // Mask card number except last 4 digits
            String maskedCard = "**** **** **** " + invoice.getCardNumber().substring(invoice.getCardNumber().length()-4);
            document.add(new Paragraph("Card Number: " + maskedCard, subFont));
            document.add(new Paragraph("Expiry Date: " + invoice.getExpiryDate(), subFont));
            // Do not show CVV in real invoices for security
            document.add(new Paragraph(" ", subFont));

            document.close();
            byte[] pdfBytes = baos.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "invoice_" + invoice.getTicketId() + ".pdf");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
