{
  ('use strict');

  /*
document.getElementById('test-button').addEventListener('click', function () {
	const links = document.querySelectorAll('.titles a');
	console.log('links:', links);
});*/

  const titleClickHandler = function (event) {
    // console.log('Link was clicked!');
    // console.log('event:', event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    event.preventDefault();
    const clickedElement = this;
    // console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

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
  const optArticleSelector = '.post',
    optTitleSelectior = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list';

  const removeTitleList = function () {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
  };

  const generateTitleLinks = function () {
    /* [DONE] remove contents of titleList */
    removeTitleList();

    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      // console.log('articleID', articleId);

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelectior).innerHTML;
      // console.log('articleTitle', articleTitle);

      /* [DONE] create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';
      // console.log('linkHTML:', linkHTML);

      /* [DONE] insert link into titleList */
      html = html + linkHTML;
    }

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      // console.log(link);
      link.addEventListener('click', titleClickHandler);
    }
  };

  const generateTags = function () {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagSelector);
      console.log('tagsWrapper:', tagsWrapper);

      /* make html variable with empty string */
      // eslint-disable-next-line no-unused-vars
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      // console.log('articleTags:', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      // console.log('articleTagsArray:', articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('tag:', tag);

        /* generate HTML of the link */

        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html = html + tagHTML;
        console.log('html:', html);

        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

      /* END LOOP: for every article: */
    }
  };

  generateTitleLinks();
  generateTags();
}
