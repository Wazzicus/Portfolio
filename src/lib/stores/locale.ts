import { getContext, setContext } from 'svelte';
import { derived, writable } from 'svelte/store';
import type { Locale } from '$lib/language';

const en = {
    language: 'Language', navigation: 'Main navigation', portrait: 'Portrait of Emmanuel Abelle', email: 'Email',
    nav: { about: 'about', projects: 'projects', skills: 'skills', contact: 'contact' },
    meta: {
        title: 'Emmanuel Abelle | Software Developer', role: 'Software Developer', ogLocale: 'en_GB',
        description: 'Emmanuel Abelle is an aspiring software developer who builds web and mobile applications with a passion for ethical design and great user experiences.',
        short: 'An aspiring software developer who builds web and mobile applications.',
    },
    hero: {
        greeting: 'hi, my name is', subtitle: 'i build things for the web and mobile.',
        description: "I'm a software developer in alpha with a knack (or at least I'd like to think so) for creating elegant solutions to complex problems. Currently focused on building accessible, ethical and user-centered applications that make a difference.",
    },
    about: {
        title: 'about me', paragraphs: [
            "Hello! I'm Emmanuel, a software developer in the making based in Nairobi, Kenya. I enjoy creating things that live on the internet (and those that don't), whether that be websites, applications, or anything else.",
            'My main focus these days is learning new technologies and building accessible, inclusive solutions that solve real problems for real users.',
            "When I'm not coding, you can find me tinkering with open-source projects, taking photos in Expert RAW on my phone or watching The Arsenal! #COYG",
            'I’m also learning French. This portfolio is a small way to bring that learning into something I enjoy building.',
        ],
    },
    skills: {
        title: 'skills & technologies', languages: 'programming languages', frameworks: 'frameworks', tools: 'tools & platforms', conceptsTitle: 'concepts',
        concepts: { 'REST APIs': 'REST APIs', 'Responsive Design': 'Responsive Design', 'Mobile Development': 'Mobile Development' },
    },
    projects: {
        title: "things i've built", gallery: 'Project gallery. Use left and right arrow keys to explore.', built: 'what i built',
        mobile: 'mobile app', website: 'website', technologies: 'Technologies', visit: 'Visit project', source: 'View source',
        image: (title: string) => `${title} interface`, playLabel: (title: string) => `View ${title} on Google Play`, sourceLabel: (title: string) => `View ${title} source on GitHub`,
        items: {
            'Shopping Manager': {
                title: 'Shopping Manager', description: 'A household shopping list app built around simplicity, collaboration, and thoughtful everyday interactions.',
                contribution: 'Built a native Android app with Kotlin and Material Design, and published it on Google Play.',
            },
            'Portfolio Website': {
                title: 'Portfolio Website', description: 'My own corner of the internet: projects, a few interests, and the technologies I’m learning along the way.',
                contribution: 'This very website, built to showcase my projects and skills. Designed with a focus on performance, accessibility, and clean aesthetics.',
            },
        },
    },
    contact: {
        overline: "what's next?", heading: 'get in touch', button: 'say hello',
        description: "My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    },
    inspired: 'Inspired by', and: 'and',
};

const fr: typeof en = {
    language: 'Langue', navigation: 'Navigation principale', portrait: 'Portrait d’Emmanuel Abelle', email: 'E-mail',
    nav: { about: 'à propos', projects: 'projets', skills: 'compétences', contact: 'contact' },
    meta: {
        title: 'Emmanuel Abelle | Développeur logiciel', role: 'Développeur logiciel', ogLocale: 'fr_FR',
        description: 'Emmanuel Abelle est un développeur logiciel en devenir qui crée des applications web et mobiles, avec une attention particulière à la conception éthique et à l’expérience utilisateur.',
        short: 'Un développeur logiciel en devenir qui crée des applications web et mobiles.',
    },
    hero: {
        greeting: 'salut, je m’appelle', subtitle: 'je crée des applications web et mobiles.',
        description: 'Je suis développeur en version alpha, avec un petit talent (enfin, j’ose le croire) pour trouver des solutions élégantes à des problèmes compliqués. En ce moment, je crée surtout des applications accessibles, respectueuses de leurs utilisateurs et qui ont un vrai impact.',
    },
    about: {
        title: 'à propos de moi', paragraphs: [
            'Salut ! Moi, c’est Emmanuel, apprenti développeur à Nairobi, au Kenya. J’aime créer des choses pour le web (et pas seulement) : des sites, des applis et tout ce qui me passe par la tête.',
            'Ces temps-ci, j’explore de nouvelles technologies et je construis des outils accessibles à tous, pensés pour résoudre de vrais problèmes.',
            'Quand je ne suis pas en train de coder, je bidouille des projets open source, je prends des photos avec Expert RAW sur mon téléphone ou je suis les matchs d’Arsenal ! #COYG',
            'J’apprends aussi le français. Et quoi de mieux que ce portfolio pour pratiquer tout en créant quelque chose qui me plaît ?',
        ],
    },
    skills: {
        title: 'compétences et technologies', languages: 'langages de programmation', frameworks: 'frameworks', tools: 'outils et plateformes', conceptsTitle: 'concepts',
        concepts: { 'REST APIs': 'API REST', 'Responsive Design': 'Design responsive', 'Mobile Development': 'Développement mobile' },
    },
    projects: {
        title: 'ce que j’ai créé', gallery: 'Galerie de projets. Utilisez les flèches gauche et droite pour explorer.', built: 'ce que j’ai créé',
        mobile: 'application mobile', website: 'site web', technologies: 'Technologies', visit: 'Voir le projet', source: 'Voir le code',
        image: (title: string) => `Interface de ${title}`, playLabel: (title: string) => `Voir ${title} sur Google Play`, sourceLabel: (title: string) => `Voir le code de ${title} sur GitHub`,
        items: {
            'Shopping Manager': {
                title: 'Shopping Manager', description: 'Une appli de listes de courses à partager à la maison, pensée pour faire simple, s’organiser ensemble et faciliter le quotidien.',
                contribution: 'J’ai créé une application Android native avec Kotlin et Material Design, puis je l’ai publiée sur Google Play.',
            },
            'Portfolio Website': {
                title: 'Site portfolio', description: 'Mon petit coin du web : mes projets, quelques passions et les technologies que je découvre en chemin.',
                contribution: 'Le site sur lequel vous êtes ! Je l’ai conçu pour partager mes projets et mes compétences, sans sacrifier la rapidité, l’accessibilité ni la simplicité du design.',
            },
        },
    },
    contact: {
        overline: 'et ensuite ?', heading: 'on se parle ?', button: 'dire bonjour',
        description: 'Une question, une idée ou juste envie de dire salut ? Écrivez-moi, je ferai de mon mieux pour vous répondre !',
    },
    inspired: 'Inspiré par', and: 'et',
};
const sw: typeof en = {
    language: 'Lugha', navigation: 'Urambazaji mkuu', portrait: 'Picha ya Emmanuel Abelle', email: 'Barua pepe',
    nav: { about: 'kunihusu', projects: 'miradi', skills: 'ujuzi', contact: 'mawasiliano' },
    meta: {
        title: 'Emmanuel Abelle | Msanidi wa programu', role: 'Msanidi wa programu', ogLocale: 'sw_KE',
        description: 'Emmanuel Abelle ni msanidi wa programu anayeendelea kujifunza. Anatengeneza tovuti na programu za simu zinazozingatia mahitaji ya watu, matumizi rahisi na ubunifu wenye maadili.',
        short: 'Msanidi wa programu anayeendelea kujifunza na kutengeneza tovuti na programu za simu.',
    },
    hero: {
        greeting: 'habari, naitwa', subtitle: 'ninatengeneza tovuti na programu za simu.',
        description: 'Mimi ni developer ambaye bado niko kwenye toleo la alpha. Napenda kutafuta njia nzuri za kutatua matatizo magumu (na naamini nina kipaji kidogo hapo!). Kwa sasa, natengeneza programu zilizo rahisi kutumia, zinazomjali mtumiaji na zinazoweza kuleta mabadiliko ya kweli.',
    },
    about: {
        title: 'kunihusu', paragraphs: [
            'Mambo! Mimi ni Emmanuel, developer ninayeendelea kujifunza hapa Nairobi, Kenya. Napenda kutengeneza vitu vya mtandaoni (na hata visivyohitaji intaneti), kuanzia tovuti na apps hadi chochote kinachonipa wazo jipya.',
            'Siku hizi najifunza teknolojia mpya na kutengeneza vitu ambavyo kila mtu anaweza kutumia, vinavyosaidia kutatua matatizo ya maisha halisi.',
            'Nisipokuwa naandika code, huwa najishughulisha na miradi ya open source, napiga picha kwa Expert RAW kwenye simu yangu, au natazama mechi za Arsenal! #COYG',
            'Pia najifunza Kifaransa. Portfolio hii ni njia yangu ya kufanya mazoezi huku nikifanya kitu ninachokipenda.',
        ],
    },
    skills: {
        title: 'ujuzi na teknolojia', languages: 'lugha za programu', frameworks: 'frameworks', tools: 'zana na majukwaa', conceptsTitle: 'dhana',
        concepts: { 'REST APIs': 'API za REST', 'Responsive Design': 'Responsive design', 'Mobile Development': 'Utengenezaji wa programu za simu' },
    },
    projects: {
        title: 'miradi yangu', gallery: 'Miradi yangu. Tumia mishale ya kushoto na kulia kuona miradi mingine.', built: 'miradi yangu',
        mobile: 'programu ya simu', website: 'tovuti', technologies: 'Teknolojia', visit: 'Tazama mradi', source: 'Tazama code',
        image: (title: string) => `Kiolesura cha ${title}`, playLabel: (title: string) => `Angalia ${title} kwenye Google Play`, sourceLabel: (title: string) => `Tazama code wa ${title} kwenye GitHub`,
        items: {
            'Shopping Manager': {
                title: 'Shopping Manager', description: 'App ya orodha za manunuzi ya nyumbani, inayorahisisha kupanga ununuzi pamoja na watu wa nyumbani.',
                contribution: 'Nilitengeneza app ya Android kwa Kotlin na Material Design, kisha nikaiweka Google Play.',
            },
            'Portfolio Website': {
                title: 'Tovuti ya kazi zangu', description: 'Kona yangu ndogo mtandaoni: miradi yangu, mambo ninayopenda na teknolojia ninazojifunza njiani.',
                contribution: 'Ni tovuti hii unayoitazama sasa! Niliitengeneza kuonyesha miradi na ujuzi wangu, huku nikizingatia kasi, urahisi wa kuitumia na muonekano safi.',
            },
        },
    },
    contact: {
        overline: 'nini kinafuata?', heading: 'wasiliana nami', button: 'nisalimie',
        description: 'Una swali, wazo au unataka tu kusema mambo? Niandikie! Nitafanya niwezavyo kukujibu.',
    },
    inspired: 'Imehamasishwa na', and: 'na',
};

export const translations = { en, fr, sw };


const contextKey = Symbol('portfolio-locale');

// Each layout owns its stores so server-rendered requests cannot share a language.
export function initializeLocale(initial: Locale) {
    const locale = writable<Locale>(initial);
    const copy = derived(locale, value => translations[value]);
    const stores = { locale, copy };
    setContext(contextKey, stores);
    return stores;
}

export function getLocaleContext() {
    const stores = getContext<ReturnType<typeof initializeLocale>>(contextKey);
    if (!stores) throw new Error('Language context must be initialized by the root layout.');
    return stores;
}
