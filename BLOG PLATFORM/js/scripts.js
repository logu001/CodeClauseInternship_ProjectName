const articles = [
    {
        title: "Article 1",
        image: "images/article1.jpg",
        category: "Category 1",
        summary: "Summary of article 1.",
        link: "articles/article1.html"
    },
    {
        title: "Article 2",
        image: "images/article2.jpg",
        category: "Category 2",
        summary: "Summary of article 2.",
        link: "articles/article2.html"
    }
    // Add more articles here
    
];

const articlesContainer = document.getElementById('articles');

articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.className = 'article';

    articleElement.innerHTML = `
        <h2>${article.title}</h2>
        <img src="${article.image}" alt="${article.title}">
        <p>${article.summary}</p>
        <a href="${article.link}">Read More</a>
    `;

    articlesContainer.appendChild(articleElement);
});
