package com.group13.RailLink.controller;

import com.group13.RailLink.model.Invoice;
import com.group13.RailLink.service.EmailService;
import com.group13.RailLink.service.InvoiceService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.group13.RailLink.service.TicketService;
import com.group13.RailLink.model.Ticket;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.TimeZone;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    private final TicketService ticketService;
    private final InvoiceService invoiceService;
    private final SpringTemplateEngine templateEngine;
    private final EmailService emailService;
    
    // Date formatters for java.util.Date objects
    private final SimpleDateFormat dateFmt = new SimpleDateFormat("yyyy-MM-dd");
    private final SimpleDateFormat timeFmt = new SimpleDateFormat("HH:mm");
    private final SimpleDateFormat txnFmt = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    
    // Define fonts to be used in the PDF
    private static Font TITLE_FONT;
    private static Font HEADER_FONT;
    private static Font NORMAL_FONT;
    private static Font BOLD_FONT;
    private static Font LOGO_FONT;
    private static Font COMPANY_FONT;
    private static Font SECTION_TITLE_FONT;
    private static Font STATION_FONT;
    private static Font LABEL_FONT;
    private static Font VALUE_FONT;
    private static Font PASSENGER_FONT;
    private static Font DETAIL_LABEL_FONT;
    private static Font DETAIL_VALUE_FONT;
    private static Font FOOTER_FONT;
    
    // Define colors to match the HTML template
    private static BaseColor BLUE_COLOR = new BaseColor(26, 115, 232); // #1a73e8
    private static BaseColor WHITE_COLOR = BaseColor.WHITE;
    private static BaseColor LIGHT_GRAY = new BaseColor(249, 249, 249); // #f9f9f9
    private static BaseColor GRAY_COLOR = new BaseColor(102, 102, 102); // #666
    private static BaseColor BORDER_COLOR = new BaseColor(224, 224, 224); // #e0e0e0
    
    static {
        try {
            // Initialize fonts with embedded support for international characters
            BaseFont baseFont = BaseFont.createFont(
                "src/main/resources/fonts/DejaVuSans.ttf",
                BaseFont.IDENTITY_H,
                BaseFont.EMBEDDED
            );
            
            TITLE_FONT = new Font(baseFont, 18, Font.BOLD, BaseColor.BLACK);
            HEADER_FONT = new Font(baseFont, 14, Font.BOLD, BaseColor.BLACK);
            NORMAL_FONT = new Font(baseFont, 11, Font.NORMAL, BaseColor.BLACK);
            BOLD_FONT = new Font(baseFont, 11, Font.BOLD, BaseColor.BLACK);
            LOGO_FONT = new Font(baseFont, 18, Font.BOLD, BLUE_COLOR);
            COMPANY_FONT = new Font(baseFont, 16, Font.BOLD, WHITE_COLOR);
            SECTION_TITLE_FONT = new Font(baseFont, 14, Font.BOLD, BLUE_COLOR);
            STATION_FONT = new Font(baseFont, 16, Font.BOLD, BaseColor.BLACK);
            LABEL_FONT = new Font(baseFont, 8, Font.NORMAL, GRAY_COLOR);
            VALUE_FONT = new Font(baseFont, 12, Font.BOLD, BaseColor.BLACK);
            PASSENGER_FONT = new Font(baseFont, 14, Font.BOLD, BaseColor.BLACK);
            DETAIL_LABEL_FONT = new Font(baseFont, 11, Font.NORMAL, BLUE_COLOR);
            DETAIL_VALUE_FONT = new Font(baseFont, 11, Font.NORMAL, BaseColor.BLACK);
            FOOTER_FONT = new Font(baseFont, 10, Font.NORMAL, GRAY_COLOR);
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        }
    }
    
    @Autowired
    public InvoiceController(InvoiceService invoiceService, TicketService ticketService, 
                            SpringTemplateEngine templateEngine, EmailService emailService) {
        this.ticketService = ticketService;
        this.invoiceService = invoiceService;
        this.templateEngine = templateEngine;
        this.emailService = emailService;
        
        // Initialize date formatters with system timezone
        TimeZone systemTZ = TimeZone.getDefault();
        this.dateFmt.setTimeZone(systemTZ);
        this.timeFmt.setTimeZone(systemTZ);
        this.txnFmt.setTimeZone(systemTZ);
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
            // Create PDF directly using iText
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Document document = new Document(PageSize.A4, 36, 36, 36, 36); // Margins: left, right, top, bottom
            PdfWriter writer = PdfWriter.getInstance(document, baos);
            
            document.open();
            
            // Create invoice container
            PdfPTable container = new PdfPTable(1);
            container.setWidthPercentage(100);
            
            // Create invoice header (blue bar with logo and title)
            PdfPTable header = new PdfPTable(2);
            header.setWidthPercentage(100);
            float[] headerWidths = {2f, 1f};
            header.setWidths(headerWidths);
            
            // Logo and company name cell
            PdfPCell logoCell = new PdfPCell();
            logoCell.setPadding(15);
            logoCell.setBackgroundColor(BLUE_COLOR);
            logoCell.setBorder(Rectangle.NO_BORDER);
            
            // Create logo placeholder with "RL" text
            Paragraph logoText = new Paragraph();
            
            // Try to load logo image if available
            try {
                Path path = Paths.get("src/main/resources/static/images/logo.png");
                byte[] logoBytes = Files.readAllBytes(path);
                Image logo = Image.getInstance(logoBytes);
                logo.scaleToFit(40, 40);
                logoText.add(new Chunk(logo, 0, 0, true));
                logoText.add("  ");
            } catch (IOException e) {
                // If image not found, create a circular text logo
                PdfTemplate template = writer.getDirectContent().createTemplate(40, 40);
                template.setColorFill(WHITE_COLOR);
                template.circle(20, 20, 20);
                template.fill();
                
                template.setColorFill(BLUE_COLOR);
                template.beginText();
                BaseFont bf = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                template.setFontAndSize(bf, 18);
                template.showTextAligned(Element.ALIGN_CENTER, "RL", 20, 15, 0);
                template.endText();
                
                Image img = Image.getInstance(template);
                logoText.add(new Chunk(img, 0, 0, true));
                logoText.add("  ");
            }
            
            // Add company name next to logo
            Chunk companyName = new Chunk("Rail Link", COMPANY_FONT);
            logoText.add(companyName);
            logoCell.addElement(logoText);
            header.addCell(logoCell);
            
            // Title cell (E-Ticket)
            PdfPCell titleCell = new PdfPCell(new Paragraph("E-Ticket", COMPANY_FONT));
            titleCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            titleCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            titleCell.setPadding(15);
            titleCell.setBackgroundColor(BLUE_COLOR);
            titleCell.setBorder(Rectangle.NO_BORDER);
            header.addCell(titleCell);
            
            PdfPCell headerContainer = new PdfPCell(header);
            headerContainer.setPadding(0);
            headerContainer.setBorder(Rectangle.NO_BORDER);
            container.addCell(headerContainer);
            
            // Ticket stub section
            PdfPCell stubContainer = new PdfPCell();
            stubContainer.setBorder(Rectangle.NO_BORDER);
            stubContainer.setPadding(0);
            
            // Create the ticket stub (with route and passenger info)
            PdfPTable stub = new PdfPTable(2);
            stub.setWidthPercentage(100);
            float[] stubWidths = {2f, 1f};
            stub.setWidths(stubWidths);
            
            // Route information
            PdfPCell routeCell = new PdfPCell();
            routeCell.setPadding(20);
            routeCell.setBorder(Rectangle.NO_BORDER);
            
            // Create stations with arrow
            Paragraph stations = new Paragraph();
            Chunk fromStation = new Chunk(ticket.getDepartureStation(), STATION_FONT);
            Chunk arrow = new Chunk(" → ", new Font(BaseFont.createFont(), 16, Font.NORMAL, BLUE_COLOR));
            Chunk toStation = new Chunk(ticket.getArrivalStation(), STATION_FONT);
            stations.add(fromStation);
            stations.add(arrow);
            stations.add(toStation);
            stations.setSpacingAfter(15);
            routeCell.addElement(stations);
            
            // Date and time info
            PdfPTable dateTimeTable = new PdfPTable(2);
            dateTimeTable.setWidthPercentage(100);
            
            // Date block
            PdfPCell dateBlock = new PdfPCell();
            dateBlock.setBorder(Rectangle.NO_BORDER);
            dateBlock.setPadding(0);
            Paragraph dateLabel = new Paragraph("DATE", LABEL_FONT);
            dateLabel.setSpacingAfter(3);
            dateBlock.addElement(dateLabel);
            
            String formattedDate = dateFmt.format(ticket.getDepartureDateTime());
            Paragraph dateValue = new Paragraph(formattedDate, VALUE_FONT);
            dateBlock.addElement(dateValue);
            dateTimeTable.addCell(dateBlock);
            
            // Time block
            PdfPCell timeBlock = new PdfPCell();
            timeBlock.setBorder(Rectangle.NO_BORDER);
            timeBlock.setPadding(0);
            Paragraph timeLabel = new Paragraph("DEPARTURE", LABEL_FONT);
            timeLabel.setSpacingAfter(3);
            timeBlock.addElement(timeLabel);
            
            String formattedTime = timeFmt.format(ticket.getDepartureDateTime());
            Paragraph timeValue = new Paragraph(formattedTime, VALUE_FONT);
            timeBlock.addElement(timeValue);
            dateTimeTable.addCell(timeBlock);
            
            routeCell.addElement(dateTimeTable);
            stub.addCell(routeCell);
            
            // Passenger information
            PdfPCell passengerCell = new PdfPCell();
            passengerCell.setPadding(20);
            passengerCell.setBorder(Rectangle.NO_BORDER);
            passengerCell.setCellEvent(new PdfPCellEvent() {
                public void cellLayout(PdfPCell cell, Rectangle position, PdfContentByte[] canvases) {
                    PdfContentByte cb = canvases[PdfPTable.LINECANVAS];
                    cb.setLineDash(3f, 3f);
                    cb.moveTo(position.getLeft(), position.getTop());
                    cb.lineTo(position.getLeft(), position.getBottom());
                    cb.stroke();
                }
            });
            
            // Passenger name
            Paragraph passengerName = new Paragraph(ticket.getName() + " " + ticket.getSurname(), PASSENGER_FONT);
            passengerName.setSpacingAfter(15);
            passengerCell.addElement(passengerName);
            
            // Create info rows (seat, wagon, amount)
            PdfPTable infoTable = new PdfPTable(2);
            infoTable.setWidthPercentage(100);
            
            // Seat info
            addInfoRow(infoTable, "Seat", ticket.getSeat());
            
            // Check if wagon number and type exist in your Ticket class
            String wagonInfo = "";
            try {
                // Try to access wagonNumber and wagonType - adjust according to your model
                String wagonNumber = ticket.getWagonNumber() != null ? ticket.getWagonNumber().toString() : "";
                String wagonType = ticket.getWagonType() != null ? ticket.getWagonType() : "";
                
                if (!wagonNumber.isEmpty() && !wagonType.isEmpty()) {
                    wagonInfo = wagonNumber + " (" + wagonType + ")";
                } else if (!wagonType.isEmpty()) {
                    wagonInfo = wagonType;
                } else {
                    wagonInfo = "N/A";
                }
            } catch (Exception e) {
                // If properties don't exist, use a default value
                wagonInfo = "N/A";
            }
            
            addInfoRow(infoTable, "Wagon", wagonInfo);
            
            // Amount info - format the price based on your model
            String price = "";
            price = "TL" + String.format("%.2f", ticket.getPrice());
            
            addInfoRow(infoTable, "Amount", price);
            
            passengerCell.addElement(infoTable);
            stub.addCell(passengerCell);
            
            stubContainer.addElement(stub);
            container.addCell(stubContainer);
            
            // Ticket divider with dotted line
            PdfPCell dividerCell = new PdfPCell();
            dividerCell.setPadding(0);
            dividerCell.setFixedHeight(15);
            dividerCell.setBorder(Rectangle.NO_BORDER);
            dividerCell.setCellEvent(new PdfPCellEvent() {
                public void cellLayout(PdfPCell cell, Rectangle position, PdfContentByte[] canvases) {
                    PdfContentByte cb = canvases[PdfPTable.LINECANVAS];
                    cb.setLineDash(10f, 5f);
                    cb.setColorStroke(BLUE_COLOR);
                    cb.moveTo(position.getLeft(), position.getTop() - 7.5f);
                    cb.lineTo(position.getRight(), position.getTop() - 7.5f);
                    cb.stroke();
                    
                    // Draw the left circle
                    cb.setColorFill(LIGHT_GRAY);
                    cb.circle(position.getLeft() - 10, position.getTop() - 7.5f, 10);
                    cb.fill();
                    
                    // Draw the right circle
                    cb.circle(position.getRight() + 10, position.getTop() - 7.5f, 10);
                    cb.fill();
                }
            });
            
            container.addCell(dividerCell);
            
            // Payment details section
            PdfPCell paymentSectionCell = new PdfPCell();
            paymentSectionCell.setPadding(20);
            paymentSectionCell.setBorder(Rectangle.NO_BORDER);
            paymentSectionCell.setBackgroundColor(LIGHT_GRAY);
            
            // Section title
            Paragraph paymentTitle = new Paragraph("Payment Details", SECTION_TITLE_FONT);
            paymentTitle.setSpacingAfter(15);
            paymentSectionCell.addElement(paymentTitle);
            
            // Payment details container
            PdfPTable paymentDetails = new PdfPTable(1);
            paymentDetails.setWidthPercentage(100);
            
            PdfPCell detailsContainer = new PdfPCell();
            detailsContainer.setBorder(Rectangle.NO_BORDER);
            detailsContainer.setBackgroundColor(BaseColor.WHITE);
            detailsContainer.setPadding(15);
            
            // Add payment detail rows
            PdfPTable detailsTable = new PdfPTable(2);
            detailsTable.setWidthPercentage(100);
            float[] detailsWidths = {1f, 2f};
            detailsTable.setWidths(detailsWidths);
            
            // Transaction date - using invoice.getDate() which returns a String
            addDetailRow(detailsTable, "Transaction Date:", invoice.getTransactionDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")).toString());
            
            // Amount paid
            addDetailRow(detailsTable, "Amount Paid:", price);
            
            // Card holder
            String cardHolder = ticket.getName() + " " + ticket.getSurname();
            addDetailRow(detailsTable, "Card Holder:", cardHolder);
            
            // Card number (masked)
            String cardNumber = "************" + invoice.getCardNumber().substring(invoice.getCardNumber().length() - 4);
            addDetailRow(detailsTable, "Card Number:", cardNumber);
            
            // Expiry date
            String expiryDate = invoice.getExpiryDate().substring(0,2) + "/" + invoice.getExpiryDate().substring(2);
            addDetailRow(detailsTable, "Expiry Date:", expiryDate);
            
            detailsContainer.addElement(detailsTable);
            paymentDetails.addCell(detailsContainer);
            paymentSectionCell.addElement(paymentDetails);
            
            // Ticket ID
            Paragraph ticketIdParagraph = new Paragraph("Ticket ID: " + ticket.getTicketId(), VALUE_FONT);
            ticketIdParagraph.setAlignment(Element.ALIGN_RIGHT);
            ticketIdParagraph.setSpacingBefore(15);
            paymentSectionCell.addElement(ticketIdParagraph);
            
            container.addCell(paymentSectionCell);
            
            // Footer
            PdfPCell footerCell = new PdfPCell();
            footerCell.setPadding(20);
            footerCell.setBorder(Rectangle.NO_BORDER);
            footerCell.setBackgroundColor(LIGHT_GRAY);
            
            // Add footer text
            Paragraph footerText = new Paragraph();
            footerText.setAlignment(Element.ALIGN_CENTER);
            footerText.add(new Chunk("Thank you for choosing Rail Link for your journey!\n", FOOTER_FONT));
            footerText.add(new Chunk("For customer support, please contact us at support@raillink.com", FOOTER_FONT));
            footerCell.addElement(footerText);
            
            container.addCell(footerCell);
            
            // Add the container to the document
            document.add(container);
            document.close();
            
            // Get the PDF as byte array
            byte[] pdfBytes = baos.toByteArray();
            
            // Send email with PDF attachment
            String email = ticket.getEmail();
            try {
                System.out.println("Sending email to: " + email);
                emailService.sendInvoiceMail(
                    email,
                    "Your Rail Link E-Ticket",
                    "Please find your e-ticket attached.",
                    pdfBytes,
                    "RailLink_Ticket_" + ticketId + ".pdf"
                );
                System.out.println("Email sent successfully!");
            } catch (Exception e) {
                System.err.println("Failed to send email: " + e.getMessage());
                e.printStackTrace();
            }
            
            // Set response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "RailLink_Ticket_" + ticketId + ".pdf");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
            
            return ResponseEntity.ok()
                .headers(headers)
                .contentLength(pdfBytes.length)
                .body(pdfBytes);
                
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Helper method to add info rows to the passenger info table
     */
    private void addInfoRow(PdfPTable table, String label, String value) {
        PdfPCell labelCell = new PdfPCell(new Paragraph(label, LABEL_FONT));
        labelCell.setBorder(Rectangle.NO_BORDER);
        labelCell.setPadding(3);
        table.addCell(labelCell);
        
        PdfPCell valueCell = new PdfPCell(new Paragraph(value, VALUE_FONT));
        valueCell.setBorder(Rectangle.NO_BORDER);
        valueCell.setPadding(3);
        table.addCell(valueCell);
    }
    
    /**
     * Helper method to add detail rows to the payment details table
     */
    private void addDetailRow(PdfPTable table, String label, String value) {
        PdfPCell labelCell = new PdfPCell(new Paragraph(label, DETAIL_LABEL_FONT));
        labelCell.setBorder(Rectangle.NO_BORDER);
        labelCell.setPadding(5);
        table.addCell(labelCell);
        
        PdfPCell valueCell = new PdfPCell(new Paragraph(value, DETAIL_VALUE_FONT));
        valueCell.setBorder(Rectangle.NO_BORDER);
        valueCell.setPadding(5);
        table.addCell(valueCell);
    }
    
    @GetMapping("/{ticketId}")
    public ResponseEntity<Invoice> getInvoiceByTicketId(@PathVariable String ticketId) {
        Optional<Invoice> invoice = invoiceService.getInvoiceByTicketId(ticketId);
        return invoice.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}