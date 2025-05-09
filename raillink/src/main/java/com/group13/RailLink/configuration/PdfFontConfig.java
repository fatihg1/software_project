package main.java.com.group13.RailLink.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.xhtmlrenderer.pdf.ITextOutputDevice;
import org.xhtmlrenderer.pdf.ITextRenderer;
import org.xhtmlrenderer.pdf.ITextUserAgent;
import com.itextpdf.text.pdf.BaseFont;
import com.lowagie.text.DocumentException;
import java.io.File;
import java.io.IOException;

@Configuration
public class PdfFontConfig {

    @Bean
    public ITextRenderer iTextRenderer() throws IOException, DocumentException {
        ITextRenderer renderer = new ITextRenderer();

        // Register all fonts from the fonts directory
        String fontPath = "src/main/resources/fonts";
        File fontsDir = new File(fontPath);

        if (fontsDir.exists() && fontsDir.isDirectory()) {
            for (File fontFile : fontsDir.listFiles()) {
                if (fontFile.getName().endsWith(".ttf")) {
                    renderer.getFontResolver().addFont(
                        fontFile.getAbsolutePath(),
                        BaseFont.IDENTITY_H,
                        BaseFont.EMBEDDED
                    );
                }
            }
        }

        // Explicitly register DejaVuSans as a fallback font
        renderer.getFontResolver().addFont(
            "src/main/resources/fonts/DejaVuSans.ttf",
            BaseFont.IDENTITY_H,
            BaseFont.EMBEDDED
        );

        return renderer;
    }
}