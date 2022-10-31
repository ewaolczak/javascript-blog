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

  const generateTitleLinks = function (customSelector = '') {
    /* [DONE] remove contents of titleList */
    removeTitleList();

    /* [DONE] for each article */
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );

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
    // console.log(links);

    for (let link of links) {
      // console.log(link);
      link.addEventListener('click', titleClickHandler);
    }
  };

  const generateTags = function () {
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */

    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagSelector);
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

        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* [DONE] add generated code to html variable */
        html = html + tagHTML;
        // console.log('html:', html);

        /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

      /* [DONE] END LOOP: for every article: */
    }
  };

  // eslint-disable-next-line no-unused-vars
  const tagClickHandler = function (event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag:', tag);

    /* [DONE] find all tag links with class active */
    const clickedTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('clickedTags:', clickedTags);

    /* [DONE] START LOOP: for each active tag link */
    for (let clickedTag of clickedTags) {
      console.log(clickedTag);
      /* [DONE] remove class active */
      clickedTag.classList.remove('active');

      /* [DONE] END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');

      /* [DONE] END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    console.log(generateTitleLinks);
  };

  const addClickListenersToTags = function () {
    /* find all links to tags */
    /* START LOOP: for each link */
    /* add tagClickHandler as event listener for that link */
    /* END LOOP: for each link */
  };

  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
}
