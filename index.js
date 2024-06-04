/*
This application is a simple "Domain Finder" application
built with Node.JS, Axios, and EJS.

It helps to easily find domains which contain the text you provide in the search bar.


*/


import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

const API_URL = "https://api.domainsdb.info/v1/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  
    res.render('index.ejs');

});

app.post('/search', async (req, res) => {

    const data = req.body;
    const requestedDomain = req.body.domain;

    try {
        const response = await axios.get(API_URL + "domains/search?domain=" + requestedDomain);
        console.log(API_URL + "domains/search/?domain=" + requestedDomain);
        const domains = response.data.domains;
        // domains = domains.slice(0, 50);
        
        const domainObjects = [];
        for (const domain of domains) {
            domainObjects.push({ domain: domain.domain});
        }


        // const domainObjects = domains.map(domain => {
        //     return {
        //         domain: domain.domain
        //     };
        // });

        console.log(domainObjects[0]);
        console.log(JSON.stringify(domainObjects));

        // console.log(domains);
        // const first50Domains = domains.slice(0, 50);
        res.render("index.ejs", { content: domainObjects });

        // res.send(JSON.stringify(domainObjects));

    } catch (error) {
        console.error(error);
        res.render("index.ejs", { error: error.message });
    }

    

});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});




