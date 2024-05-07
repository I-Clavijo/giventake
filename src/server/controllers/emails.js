


export const sendEmail = async (req, res) => {

    const { emailHTML, userEmail, userName } = req.body;
    console.log("userEmail: ", userEmail);
/*
    console.log('req.body: ', req.body);
    const userEmail = req.body.email || req.params.email; 
    const userName = req.body.name || req.params.name;  


    sendEmail(userEmail, userName)
        .then(() => res.send("Email sent successfully!")) 
        .catch(error => res.status(500).send("Error sending email")) 
*/
}