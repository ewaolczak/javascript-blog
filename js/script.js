{
  ('use strict');
  // eslint-disable-next-line no-unused-vars
  const templates = {
    articleLink: Handlebars.compile(
      document.querySelector('#template-article-link').innerHTML
    ),
    tagLink: Handlebars.compile(
      document.querySelector('#template-tag-link').innerHTML
    ),
    tagCloudLink: Handlebars.compile(
      document.querySelector('#template-tag-cloud-link').innerHTML
    ),
    authorListLink: Handlebars.compile(
      document.querySelector('#template-author-list-link').innerHTML
    ),
    authorLink: Handlebars.compile(
      document.querySelector('#template-author-link').innerHTML
    ),
  };
  const opts = {
    tagSize: {
      count: 3,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
      titles: '.titles a.active',
      activeArticle: '.posts article.active',
    },
    listOf: {
      postTitles: '.post-title',
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  const titleClickHandler = function (event) {
    // console.log('Link was clicked!');
    // console.log('event:', event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(select.article.titles);

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    event.preventDefault();
    const clickedElement = this;
    // console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(
      select.article.activeArticle
    );

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    // console.log('articleSelector:', articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    // console.log('tergetArticle:', targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const removeTitleList = function () {
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';
  };

  const generateTitleLinks = function (customSelector = '') {
    /* [DONE] remove contents of titleList */
    removeTitleList();

    /* [DONE] for each article */
    const articles = document.querySelectorAll(
      select.all.articles + customSelector
    );

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      // console.log('articleID', articleId);

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(
        select.listOf.postTitles
      ).innerHTML;
      // console.log('articleTitle', articleTitle);

      /* [DONE] create HTML of the link */
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);
      // console.log('linkHTML:', linkHTML);

      /* [DONE] insert link into titleList */
      html = html + linkHTML;
    }

    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    // console.log(links);

    for (let link of links) {
      // console.log(link);
      link.addEventListener('click', titleClickHandler);
    }
  };

  const calculateTagsParams = function (tags) {
    const params = {
      max: 0,
      min: 999999,
    };

    for (let tag in tags) {
      // console.log(tag + ' is used ' + tags[tag] + ' times');

      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  };

  const calculateTagClass = function (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const presentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(presentage * (opts.tagSize.count - 1) + 1);
    // console.log('classNumber:', classNumber);
    return classNumber;
  };

  const generateTags = function () {
    /* [NEW] create a new variable allTags with empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* [DONE] START LOOP: for every article: */

    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);
      // console.log('tagsWrapper:', tagsWrapper);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      // console.log('articleTags:', articleTags);

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      // console.log('articleTagsArray:', articleTagsArray);

      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        // console.log('tag:', tag);

        /* [DONE] generate HTML of the link */
        const tagHTMLData = { tag: tag };
        const tagHTML = templates.tagLink(tagHTMLData);

        /* [DONE] add generated code to html variable */
        html += tagHTML;
        // console.log('html:', html);

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

      /* [DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    // console.log('tagsParams', tagsParams);
    const allTagsData = { tags: [] };

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams),
      });
      /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);

    // console.log('allTagsData:', allTagsData);
  };

  const tagClickHandler = function (event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    // console.log('clickedElement:', clickedElement);

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    // console.log('href:', href);

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    // console.log('tag:', tag);

    /* [DONE] find all tag links with class active */
    const clickedTags = document.querySelectorAll(select.all.linksTo.tags);
    // console.log('clickedTags:', clickedTags);

    /* [DONE] START LOOP: for each active tag link */
    for (let clickedTag of clickedTags) {
      // console.log(clickedTag);
      /* [DONE] remove class active */
      clickedTag.classList.remove('active');

      /* [DONE] END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(`a[href^="#tag-${tag}"]`);

    /* [DONE] START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');

      /* [DONE] END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    // console.log(generateTitleLinks);
  };

  const addClickListenersToTags = function () {
    /* [DONE] find all links to tags */
    const tagLinks = document.querySelectorAll(select.all.linksTo.tags);
    // console.log('tagLinks:', tagLinks);

    /* [DONE] START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  };

  const generateAuthors = function () {
    /* [NEW] create a new variable allAuthors with an empty array */
    let allAuthors = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* [DONE] START LOOP: fore every article */
    for (let article of articles) {
      // console.log('article', article);

      /* [DONE] find author wrapper */
      const authorWrapper = article.querySelector(select.article.author);
      // console.log('authorWrapper:', authorWrapper);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get authors from data-authors attribute */
      const author = article.getAttribute('data-author');

      /* [DONE] generate HTML of the link */
      const authorHTMLData = { author: author };
      const authorHTML = templates.authorLink(authorHTMLData);
      console.log(authorHTML);

      /* [DONE] add generated code to html variable */
      html += authorHTML;
      // console.log('html:', html);

      /* [NEW] check if this link is NOT already in allAuthors */
      if (!allAuthors[author]) {
        /* [NEW] add generated code to allAuthors array */
        allAuthors[author] = 1;
      }

      /* [DONE] insert HTML of all the links into the authors wrapper */
      authorWrapper.innerHTML = 'by ' + html;

      /* [DONE] END LOOP: for every article */
    }

    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(select.listOf.authors);

    /* [NEW] create variable for all links HTML code */
    const allAuthorsData = { authors: [] };

    /* [NEW] START LOOP: for each author in allAuthors: */
    for (let author in allAuthors) {
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      allAuthorsData.authors.push({
        author: author,
      });

      /* [NEW] END LOOP: for each tag in allAuthors: */
    }
    /*[NEW] add HTML from allAuthorsHTML to authorList */
    authorList.innerHTML = templates.authorListLink(allAuthorsData);
    console.log('allAuthorsData', allAuthorsData);
  };

  const authorClickHandler = function (event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('authorClickedElement:', clickedElement);

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href:', href);

    /* [DONE] make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    console.log('author:', author);

    /* [DONE] find all author links with class active */
    const clickedAuthors = document.querySelectorAll(
      select.all.linksTo.authors
    );
    console.log('clickedAuthor:', clickedAuthors);

    /* [DONE] START LOOP: for each active author link */
    for (let clickedAuthor of clickedAuthors) {
      /* [DONE] remove class active from each found author link */
      clickedAuthor.classList.remove('active');

      /* [DONE] END LOOP: for each active author link */
    }
    //   /* [DONE] add class active for clicked link */
    clickedElement.classList.add('active');

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
    console.log(generateTitleLinks);
  };

  const addClickListenersToAuthors = function () {
    /* [DONE] find all links to authors */
    const authorLinks = document.querySelectorAll(select.all.linksTo.authors);
    // console.log('authorLinks:', authorLinks);

    /* [DONE] START LOOP: for each link */
    for (let authorLink of authorLinks) {
      /* [DONE] add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  };

  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();
}
