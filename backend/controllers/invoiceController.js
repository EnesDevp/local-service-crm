const PDFDocument = require('pdfkit');
const Lead = require('../models/Lead');

exports.generateInvoice = async (req, res) => {
    try {
        const { leadId, amount, description } = req.body;
        const lead = await Lead.findOne({ _id: leadId, userId: req.user._id });
        if (!lead) return res.status(404).json({ message: 'Lead not found' });

        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=invoice-${lead.name.replace(/\s+/g, '-')}.pdf`
            });
            res.end(pdfData);
        });

        doc.fontSize(24).text('INVOICE', { align: 'center' });
        doc.moveDown(2);

        doc.fontSize(12).text(req.user.businessName || 'Business Name');
        doc.text(req.user.name || 'Your Name');
        doc.text(req.user.phone || 'Phone');
        doc.moveDown();

        doc.text('Customer:');
        doc.fontSize(14).text(lead.name);
        doc.fontSize(12).text(lead.phone);
        doc.text(lead.address || 'No address provided');
        doc.moveDown();

        doc.fontSize(14).text(`Service: ${description || lead.serviceType || 'General Service'}`);
        doc.fontSize(18).text(`Amount: ${amount} TL`, { align: 'right' });
        doc.moveDown(3);

        doc.fontSize(10).text('Thank you for your business!', { align: 'center' });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate PDF' });
    }
};