

export function createHero(hero) {

    const heroContainer = document.querySelector(".hero-banner");

    let heroImage = hero.hero_banner.formats.large.url;

    heroContainer.style.background = 'url(' + "http://localhost:1337" + heroImage + ') center left no-repeat';
    heroContainer.style.backgroundSize = 'cover';
}











