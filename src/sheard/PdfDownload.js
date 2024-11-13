import { jsPDF } from "jspdf"

const downloadPDF = (response) => {
    try {
        const document = new jsPDF();
        response.forEach((item, index) => {
            document.text(` Item Code: ${item.itemCode}`, 10, 10);
            document.text(` Item Name: ${item.itemName}`, 10, 20);
            document.text(` Material Name: ${item.materialName}`, 10, 30);
            document.text(` Material Type: ${item.materialType}`, 10, 40);
            document.text(` Final Price: ${item.finalPrice}`, 10, 50);
            document.text(` Buyer Name: ${item.buyerName}`, 10, 60);
            document.text(` Item Status: ${item.itemStatus}`, 10, 70);
        });
        const fileName = `${response.itemCode || 'Document'}.pdf`;
        document.save(fileName)
    } catch (error) {
        console.error("Download Fail:",error);
        
    }
};

export default downloadPDF;