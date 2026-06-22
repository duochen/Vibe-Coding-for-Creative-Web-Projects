// MiniWiki - Simple encyclopedia app using only vanilla JavaScript

// Sample article data stored as an array of objects (no database needed)
const articles = [
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    intro:
      "Artificial Intelligence (AI) is the field of computer science focused on creating systems that can perform tasks that usually require human intelligence.",
    sections: [
      {
        heading: "What is AI?",
        text: "AI includes technologies like machine learning, natural language processing, and computer vision. These tools help computers learn from data, understand language, and recognize images."
      },
      {
        heading: "Everyday Uses",
        text: "You may already use AI when you ask a voice assistant a question, get movie recommendations, or use autocorrect on your phone. AI is becoming part of many apps and services."
      },
      {
        heading: "Ethics and Responsibility",
        text: "Because AI can affect jobs, privacy, and fairness, developers and researchers work to build AI systems that are safe, transparent, and helpful for everyone."
      }
    ],
    related: ["javascript", "robotics", "web-development"]
  },
  {
    id: "web-development",
    title: "Web Development",
    intro:
      "Web development is the process of building websites and web applications that people can use in a browser.",
    sections: [
      {
        heading: "Frontend and Backend",
        text: "Frontend development focuses on what users see and interact with, using HTML, CSS, and JavaScript. Backend development handles data, servers, and logic that runs behind the scenes."
      },
      {
        heading: "Tools and Skills",
        text: "Web developers use text editors, browsers, and version control tools like Git. Good developers also care about accessibility, performance, and user experience."
      },
      {
        heading: "Getting Started",
        text: "Beginners often start by learning HTML for structure, CSS for styling, and JavaScript for interactivity. Building small projects is one of the best ways to practice."
      }
    ],
    related: ["javascript", "artificial-intelligence"]
  },
  {
    id: "javascript",
    title: "JavaScript",
    intro:
      "JavaScript is a programming language that runs in web browsers and is used to make websites interactive and dynamic.",
    sections: [
      {
        heading: "Why JavaScript Matters",
        text: "Almost every modern website uses JavaScript. It can update page content, respond to clicks, fetch data from servers, and create animations without reloading the page."
      },
      {
        heading: "Basic Concepts",
        text: "Beginners learn variables, functions, loops, and events. JavaScript can change HTML elements using the Document Object Model (DOM)."
      },
      {
        heading: "Beyond the Browser",
        text: "JavaScript is also used on servers with Node.js and in mobile apps. It is one of the most popular programming languages in the world."
      }
    ],
    related: ["web-development", "artificial-intelligence"]
  },
  {
    id: "robotics",
    title: "Robotics",
    intro:
      "Robotics is the branch of technology that designs, builds, and programs robots to perform useful tasks.",
    sections: [
      {
        heading: "Parts of a Robot",
        text: "Most robots have sensors to detect the world, actuators to move parts, and a computer brain to make decisions. Together, these parts let robots interact with their environment."
      },
      {
        heading: "Where Robots Are Used",
        text: "Robots help in factories, hospitals, farms, and space missions. Some robots vacuum homes, while others explore places too dangerous for humans."
      },
      {
        heading: "Programming Robots",
        text: "Robotics often combines mechanical engineering, electronics, and software. Students can start with simple kits and learn to program robot movement step by step."
      }
    ],
    related: ["artificial-intelligence", "space-exploration"]
  },
  {
    id: "climate-change",
    title: "Climate Change",
    intro:
      "Climate change refers to long-term shifts in global temperatures and weather patterns, largely driven by human activities such as burning fossil fuels.",
    sections: [
      {
        heading: "The Greenhouse Effect",
        text: "Gases like carbon dioxide trap heat in Earth's atmosphere. While some greenhouse effect is natural, extra emissions from cars, factories, and deforestation increase global warming."
      },
      {
        heading: "Effects on the Planet",
        text: "Climate change can lead to rising sea levels, stronger storms, droughts, and harm to wildlife. Scientists study these changes using weather records and satellite data."
      },
      {
        heading: "What We Can Do",
        text: "People can reduce impact by saving energy, using renewable power, recycling, and supporting policies that protect the environment. Small actions by many people can add up."
      }
    ],
    related: ["space-exploration"]
  },
  {
    id: "space-exploration",
    title: "Space Exploration",
    intro:
      "Space exploration is the investigation of outer space through telescopes, robotic probes, and human spaceflight.",
    sections: [
      {
        heading: "History of Exploration",
        text: "Humans first reached space in the 20th century. Milestones include the Moon landing in 1969 and the launch of space stations where astronauts live and work in orbit."
      },
      {
        heading: "Robotic Missions",
        text: "Rovers and orbiters study Mars, Jupiter, and other worlds. These missions send back photos and data that help scientists understand the solar system."
      },
      {
        heading: "The Future",
        text: "Plans include returning to the Moon, sending humans to Mars, and searching for signs of life beyond Earth. Space exploration inspires new technology on our own planet."
      }
    ],
    related: ["robotics", "climate-change"]
  }
];

// Keep track of which article is currently shown (null = homepage)
let currentArticleId = null;

// Get references to important HTML elements
const mainContent = document.getElementById("main-content");
const articleList = document.getElementById("article-list");
const searchBox = document.getElementById("search-box");
const randomBtn = document.getElementById("random-btn");
const homeLink = document.getElementById("home-link");

// Find an article by its unique id
function getArticleById(id) {
  return articles.find(function (article) {
    return article.id === id;
  });
}

// Build the sidebar list of all article titles
function renderSidebar(activeId) {
  articleList.innerHTML = "";

  articles.forEach(function (article) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = article.title;
    link.dataset.id = article.id;

    if (article.id === activeId) {
      link.classList.add("active");
    }

    link.addEventListener("click", function (event) {
      event.preventDefault();
      showArticle(article.id);
      searchBox.value = "";
    });

    listItem.appendChild(link);
    articleList.appendChild(listItem);
  });
}

// Show the homepage with title, description, and article list
function showHomepage() {
  currentArticleId = null;
  renderSidebar(null);

  let html = "<h1>Welcome to MiniWiki</h1>";
  html += "<p>A simple student-built encyclopedia. Browse our articles below or use the search box to find a topic.</p>";
  html += "<h2>Available Articles</h2>";
  html += '<ul class="home-list">';

  articles.forEach(function (article) {
    html +=
      '<li><a href="#" data-id="' +
      article.id +
      '">' +
      article.title +
      "</a></li>";
  });

  html += "</ul>";
  mainContent.innerHTML = html;

  // Add click handlers to homepage article links
  mainContent.querySelectorAll("a[data-id]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      showArticle(link.dataset.id);
    });
  });
}

// Show a single article with its sections and related links
function showArticle(articleId) {
  const article = getArticleById(articleId);
  if (!article) {
    return;
  }

  currentArticleId = articleId;
  renderSidebar(articleId);

  let html = "<h1>" + article.title + "</h1>";
  html += '<p class="intro">' + article.intro + "</p>";

  // Add each content section
  article.sections.forEach(function (section) {
    html += "<h2>" + section.heading + "</h2>";
    html += "<p>" + section.text + "</p>";
  });

  // Related article links at the bottom
  html += '<div class="related-links">';
  html += "<h2>Related Articles</h2>";
  html += "<ul>";

  article.related.forEach(function (relatedId) {
    const relatedArticle = getArticleById(relatedId);
    if (relatedArticle) {
      html +=
        '<li><a href="#" data-id="' +
        relatedId +
        '">' +
        relatedArticle.title +
        "</a></li>";
    }
  });

  html += "</ul></div>";
  mainContent.innerHTML = html;

  // Add click handlers to related article links
  mainContent.querySelectorAll("a[data-id]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      showArticle(link.dataset.id);
      searchBox.value = "";
    });
  });
}

// Search articles by keyword in title or content
function searchArticles(keyword) {
  const query = keyword.trim().toLowerCase();

  // If search box is empty, go back to homepage or current article
  if (query === "") {
    if (currentArticleId) {
      showArticle(currentArticleId);
    } else {
      showHomepage();
    }
    return;
  }

  // Filter articles that match the search keyword
  const matches = articles.filter(function (article) {
    const titleMatch = article.title.toLowerCase().includes(query);
    const introMatch = article.intro.toLowerCase().includes(query);

    const sectionMatch = article.sections.some(function (section) {
      return (
        section.heading.toLowerCase().includes(query) ||
        section.text.toLowerCase().includes(query)
      );
    });

    return titleMatch || introMatch || sectionMatch;
  });

  renderSidebar(currentArticleId);

  let html = '<div class="search-results">';
  html += "<h2>Search Results</h2>";

  if (matches.length === 0) {
    html += '<p class="no-results">No articles found.</p>';
  } else {
    html += "<ul>";
    matches.forEach(function (article) {
      html +=
        '<li><a href="#" data-id="' +
        article.id +
        '">' +
        article.title +
        "</a></li>";
    });
    html += "</ul>";
  }

  html += "</div>";
  mainContent.innerHTML = html;

  mainContent.querySelectorAll("a[data-id]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      showArticle(link.dataset.id);
      searchBox.value = "";
    });
  });
}

// Open a random article when the button is clicked
function showRandomArticle() {
  const randomIndex = Math.floor(Math.random() * articles.length);
  const randomArticle = articles[randomIndex];
  showArticle(randomArticle.id);
  searchBox.value = "";
}

// Event listeners
searchBox.addEventListener("input", function () {
  searchArticles(searchBox.value);
});

randomBtn.addEventListener("click", showRandomArticle);

homeLink.addEventListener("click", function () {
  searchBox.value = "";
  showHomepage();
});

// Start the app on the homepage
showHomepage();
