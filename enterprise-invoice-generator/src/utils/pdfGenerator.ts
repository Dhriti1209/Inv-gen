import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export const downloadInvoicePDF = async (
  invoiceNumber: string
) => {
  try {
    const invoice = document.getElementById("invoice-preview");

    if (!invoice) {
      console.error("Invoice preview not found");
      return;
    }

    // Hide Download button before capturing
    const downloadBtn = document.getElementById("download-btn");

    if (downloadBtn) {
      (downloadBtn as HTMLElement).style.display = "none";
    }

    // Convert invoice to image
    const dataUrl = await toPng(invoice, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });

    // Show button again
    if (downloadBtn) {
      (downloadBtn as HTMLElement).style.display = "block";
    }

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgProps = pdf.getImageProperties(dataUrl);

    const pdfHeight =
      (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    // Download PDF with invoice number
    pdf.save(`${invoiceNumber}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
  }
};