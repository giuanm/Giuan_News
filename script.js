const searchForm = document.getElementById('search-form');
const newsContainer = document.getElementById('news-container');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const keyword = document.getElementById('keyword').value;
  const date = document.getElementById('date').value || ''; // Se a data for vazia, use uma string vazia

  const apiKey = 'API_KEY'; // Insira sua chave API da News API
  const url = `https://newsapi.org/v2/everything?q=${keyword}&from=${date}&sortBy=popularity&apiKey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'error') {
        console.error('Erro na API:', data.message);
        return;
      }

      const articles = data.articles;

      newsContainer.innerHTML = ''; // Limpa o conteúdo da seção antes de adicionar novas notícias

      articles.forEach((article) => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        if (article.urlToImage) {
          const image = document.createElement('img');
          image.src = article.urlToImage;
          image.alt = article.title;
          newsItem.appendChild(image);
        }

        const title = document.createElement('h3');
        title.innerHTML = `<a href="${article.url}" target="_blank" class="titleNews">${article.title}</a>`;
        newsItem.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description;
        newsItem.appendChild(description);

        const source = document.createElement('p');
        source.textContent = `Fonte: ${article.source.name}`;
        newsItem.appendChild(source);

        const date = document.createElement('p');
        date.textContent = `Data: ${article.publishedAt}`;
        newsItem.appendChild(date);

        newsContainer.appendChild(newsItem);
      });
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
});
