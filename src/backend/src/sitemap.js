const expressSitemapXml = require("express-sitemap-xml");
const fetch = require('node-fetch');

const staticURLs = [
    "", // don't forget the base route!
    "/articles/sport/1", // Basketball category
    "/articles/sport/2", // American football category
    "/articles/sport/4", // Baseball category
    "/articles/sport/6", // MMA category
    "/articles/sport/5", // Tennis category
];

const dynamicPaths = {
    articles : '/article',
};

async function getArticles(){
    
    try{
        // get all article
        const articles = await fetch('http://harden.southeastasia.azurecontainer.io/api/articles', {
            // set up appropriate header in order get access to API
            headers : {'Accept' : 'application/json'}
        });
        const articlesJSON = await articles.json();
        return articlesJSON;
    }catch(err){
        console.error(err)
    }
}

async function getURLs(){

    const articles = await getArticles();

    // create list of dynamic url
    const dynamicURLs = articles.map(article => `${dynamicPaths['articles']}/${article.id_article}`);
    
    // combine static + dynamic URL
    return staticURLs.concat(dynamicURLs);
}

export const generateSitemap = expressSitemapXml(getURLs, "http://harden.southeastasia.azurecontainer.io/");