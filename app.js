/*#######
Language Selector
#########*/
//fetch lang.json
async function getData(data) {
  let response = await fetch(data);
  return response.json();
}
let langText = await getData('./lang.json');
////langText structure: langText.lang.EN or langText.lang.ES

//LocalStorage lang and theme set
let langSel;
let themeSel;
(function () {
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'ES');
  }
  langSel = localStorage.getItem('lang');

  if (localStorage.getItem('theme') == 'dark') {
    let htmlBody = document.body;
    htmlBody.classList.add('dark');
  }
  themeSel = localStorage.getItem('theme');
})();

//navbar lang display and change event
let langNav = document.querySelector('[data-lang]');
let textTarget = document.querySelectorAll('[data-text-lang]');
let textReplacer = () => {
  textTarget.forEach((text) => {
    text.textContent = langText.lang[langSel][text.dataset.textLang]
  });
}
langNav.textContent = langSel;
textReplacer()

langNav.addEventListener('click', () => {
  if (langSel == 'ES') {
    localStorage.setItem('lang', 'EN');
  } else {
    localStorage.setItem('lang', 'ES');
  };
  langSel = localStorage.getItem('lang');
  langNav.textContent = langSel;

  textReplacer()
})

/*#######
THEME CHANGER
#########*/
let themeNav = document.querySelector('#theme');

themeNav.addEventListener('click', () => { //shold not be resetting after lang change
  let htmlBody = document.body;
  if (themeSel == 'dark') {
    htmlBody.classList.remove('dark');
    localStorage.setItem('theme', 'light')
  } else {
    htmlBody.classList.add('dark');
    localStorage.setItem('theme', 'dark')
  };
  themeSel = localStorage.getItem('theme');
})

/*#######
MOBILE NAV BAR
#########*/
let navBar = document.querySelector('.navbar');
let navToggle = document.querySelector('.mobile-navtool');
let navToggleOff = document.querySelector('#svg-tool') //Normal state button
let navToggleOn = document.querySelector('#svg-tool-close') //Active state button

navToggle.addEventListener('click', () => {
  navToggleOff.classList.toggle('hide');
  navToggleOn.classList.toggle('hide');
  navToggle.classList.toggle('active');
  navBar.classList.toggle('nav-active');
})

/*########
SCROLLING ANIMATION
#########*/
let animTarget = document.querySelectorAll('.animation');

let observer = new IntersectionObserver(itemCard => {
  itemCard.forEach(item => {
    item.target.classList.toggle('active', item.isIntersecting)
  })
})

animTarget.forEach(target => {
  observer.observe(target)
})