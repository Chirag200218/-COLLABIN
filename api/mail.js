import nodemailer from 'nodemailer';
export default async (req, res) => {
    if(req.method === 'POST') {
        const { name, myemail,toemail,desc } = req.body;
        console.log(toemail);
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
            user: "complementme001@gmail.com",
            pass: "tunetbdaudhuimyy",
            },
        });
        const mailOptions = {
            from: myemail,
            to: toemail,
            subject: `Message from ${name}`,
            html: `<p>Wanted to apply for this title ${desc}</p>`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ status: 'success' });
    }
}