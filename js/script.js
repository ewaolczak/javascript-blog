{
	('use strict');

	/*
document.getElementById('test-button').addEventListener('click', function () {
	const links = document.querySelectorAll('.titles a');
	console.log('links:', links);
});*/

	const titleClickHandler = function (event) {
		console.log('Link was clicked!');
		console.log('event:', event);

		/* [DONE] remove class 'active' from all article links  */
		const activeLinks = document.querySelectorAll('.titles a.active');

		for (let activeLink of activeLinks) {
			activeLink.classList.remove('active');
		}

		/* [DONE] add class 'active' to the clicked link */
		event.preventDefault();
		const clickedElement = this;
		console.log('clickedElement:', clickedElement);
		clickedElement.classList.add('active');

		/* [DONE] remove class 'active' from all articles */
		const activeArticles = document.querySelectorAll('.posts article.active');

		for (let activeArticle of activeArticles) {
			activeArticle.classList.remove('active');
		}

		/* [DONE] get 'href' attribute from the clicked link */
		const articleSelector = clickedElement.getAttribute('href');
		console.log('articleSelector:', articleSelector);

		/* [DONE] find the correct article using the selector (value of 'href' attribute) */
		const targetArticle = document.querySelector(articleSelector);
		console.log('tergetArticle:', targetArticle);

		/* [DONE] add class 'active' to the correct article */
		targetArticle.classList.add('active');
	};

	const links = document.querySelectorAll('.titles a');
	console.log(links);

	for (let link of links) {
		// console.log(link);
		link.addEventListener('click', titleClickHandler);
	}

	const optArticleSelector = '.post',
		optTitleSelectior = '.post-title',
		optTitleListSelector = '.titles';

	function generateTitleLinks() {
		/* [DONE] remove contents of titleList */
		const titleList = document.querySelector(optTitleListSelector);

		function removeTitleList() {
			titleList.innerHTML = '';
		}

		removeTitleList();

		/* [IN PROGRESS] for each article */
		const articles = document.querySelectorAll(optArticleSelector);

		let html = '';

		for (let article of articles){
		

		/* [DONE] get the article id */
		const articleId = article.getAttribute('id');
		// console.log('articleID', articleId);

		/* [DONE] find the title element */
		/* [DONE] get the title from the title element */
		const articleTitle = article.querySelector(optTitleSelectior).innerHTML;
		// console.log('articleTitle', articleTitle);

		/* create HTML of the link */
		const linkHTML =
			'<li><a href="#' +
			articleId +
			'"><span>' +
			articleTitle +
			'</span></a></li>';
		// console.log('linkHTML:', linkHTML);

		/* insert link into titleList */
		html = html + linkHTML;
	}
	titleList.innerHTML = html;
}

	generateTitleLinks();
}
