import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadInvoicePDF = async () => {
  try {
    const invoice = document.getElementById(
      "invoice-preview"
    );

    if (!invoice) {
      console.error(
        "Invoice preview not found"
      );
      return;
    }

    const canvas = await html2canvas(
      invoice,
      {
        scale: 2,
      }
    );

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const imgProps =
      pdf.getImageProperties(imgData);

    const pdfHeight =
      (imgProps.height *
        pdfWidth) /
      imgProps.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      `invoice-${Date.now()}.pdf`
    );
  } catch (error) {
    console.error(
      "PDF Generation Error:",
      error
    );
  }
};