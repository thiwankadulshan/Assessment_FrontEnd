import { jsPDF } from "jspdf"

const downloadPDF = (response) => {
    console.log("RSPONSE IS: "+JSON.stringify(response, null, 2));
    try {
        const doccument = new jsPDF();
        response.forEach((item, index) => {
            doccument.text(` Item Code: ${item.itemCode}`, 10, 10);
            doccument.text(` Item Name: ${item.itemName}`, 10, 20);
            doccument.text(` Material Name: ${item.materialName}`, 10, 30);
            doccument.text(` Material Type: ${item.materialType}`, 10, 40);
            doccument.text(` Final Price: ${item.finalPrice}`, 10, 50);
            doccument.text(` Buyer Name: ${item.buyerName}`, 10, 60);
            doccument.text(` Item Status: ${item.itemStatus}`, 10, 70);
        });
        const fileName = `${response.itemCode || 'Document'}.pdf`;
        doccument.save(fileName)
    } catch (error) {
        console.error("Download Fail:",error);
        
    }
};

export default downloadPDF;