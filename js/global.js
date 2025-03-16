

// string 

let myVar = "ma variable";
myVar = "variable changée";

const myVar2 = "ma variable 2";


// boolean
let isTrue = true;
let isFalse = false;


// chiffres et opérateurs

let chiffre1 = 4;
let chiffre2 = 3;


// template string, littéraux de gabarits et concat

let test = 'test ' + myVar + 'value';
let test2 = `test ${myVar} dzqdqzd `;


// tableaux 

let array = ['item 1', 'item 2', 'item 3', 'item 4'];

// objets

let obj = {
  title: 'Mon titre',
  description: 'Ma description'
}


// fonctions 

const myFunction = (item, item2) => {
  // console.log(item, item2);
}

myFunction('toto', 5);
myFunction('tata', 6);

const calcul = (nb1, nb2) => {
  return nb1 + nb1;
}

let result = calcul(4, 5);
// console.log(result);

// insertion dom et navigation dans le dom

let div = document.createElement('div');
div.classList.add('top');
div.innerHTML = `<span>Top zone</span>`;
// console.log(header.nextElementSibling);

// fin de la théorie 

/* Menu mobile */

function menuMobile() {
  const btn = document.querySelector('.burger');
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('.navbar a');

  btn.addEventListener('click', () => {
    header.classList.toggle('show-nav');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('show-nav');
    });
  });
}

menuMobile();

/* Porfolio */

function tabsFilters() {
  const tabs = document.querySelectorAll('.portfolio-filters a');
  const projets = document.querySelectorAll('.portfolio .card');

  const resetActiveLinks = () => {
    tabs.forEach(elem => {
      elem.classList.remove('active');
    })
  }

  const showProjets = (elem) => {
    console.log(elem);
    projets.forEach(projet => {

      let filter = projet.getAttribute('data-category');

      if (elem === 'all') {
        projet.parentNode.classList.remove('hide');
        return
      }

      console.log('tutu');
      // ne sera pas pris en compte !
      /*if (filter !== elem) {
        projet.parentNode.classList.add('hide');
      } else {
        projet.parentNode.classList.remove('hide');
      }*/

      // option pour les plus motivés - opérateur ternaire
      filter !== elem ? projet.parentNode.classList.add('hide') : projet.parentNode.classList.remove('hide');

    });
  }

  tabs.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      let filter = elem.getAttribute('data-filter');
      showProjets(filter)
      resetActiveLinks();
      elem.classList.add('active');
    });
  })
}

tabsFilters()

function showProjectDetails() {
  const links = document.querySelectorAll('.card__link');
  const modals = document.querySelectorAll('.modal');
  const btns = document.querySelectorAll('.modal__close');

  const hideModals = () => {
    modals.forEach(modal => {
      modal.classList.remove('show');
    });
    document.body.classList.remove('no-scroll'); // Réactive le scroll
  }

  links.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector(`[id=${elem.dataset.id}]`).classList.add('show');
      document.body.classList.add('no-scroll'); // Désactive le scroll
    });
  });

  btns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      hideModals();
    });
  });

}

showProjectDetails();


// effets

const observerIntersectionAnimation = () => {
  const sections = document.querySelectorAll('section');
  const skills = document.querySelectorAll('.skills .bar');

  sections.forEach((section, index) => {
    if (index === 0) return;
    section.style.opacity = "0";
    section.style.transition = "all 1.6s";
  });

  skills.forEach((elem, index) => {

    elem.style.width = "0";
    elem.style.transition = "all 1.6s";
  });

  let sectionObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.opacity = 1;
      }
    });
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  let skillsObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.width = elem.dataset.width + '%';
      }
    });
  });

  skills.forEach(skill => {
    skillsObserver.observe(skill);
  });
}

observerIntersectionAnimation();


$(document).ready(function () {
  // Sélectionne tous les liens du menu
  let sections = $('section'); // Toutes les sections avec un id
  let navLinks = $('.navbar a'); // Tous les liens du menu

  $(window).on('scroll', function () {
    let currentScroll = $(this).scrollTop();

    sections.each(function () {
      let top = $(this).offset().top - 100; // Ajuste selon la hauteur du header
      let bottom = top + $(this).outerHeight();

      if (currentScroll >= top && currentScroll < bottom) {
        let id = $(this).attr('id');
        navLinks.removeClass('active'); // Supprime la classe active
        $(".navbar a[href='#" + id + "']").addClass('active'); // Ajoute la classe active au lien correspondant
      }
    });
  });

  // Ajoute un effet de défilement fluide pour les liens du menu
  $(".navbar a").on("click", function (event) {
    event.preventDefault();
    let target = $(this).attr("href");

    $("html, body").animate(
      {
        scrollTop: $(target).offset().top - 80, // Ajuste selon la hauteur du header
      },
      800 // Durée de l'animation
    );
  });
});
