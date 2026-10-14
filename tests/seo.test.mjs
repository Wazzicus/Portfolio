import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { test } from 'node:test';

const origin = 'https://emmanuel.abelle.site';
const names = { en: 'Software Developer', fr: 'Développeur logiciel', sw: 'Msanidi wa programu' };
const greetings = { en: 'hi, my name is', fr: 'salut, je m’appelle', sw: 'habari, naitwa' };

function tags(html, name) {
    return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(match =>
        Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(attr => [attr[1], attr[2]])),
    );
}

for (const code of ['en', 'fr']) {
    test(`${code} is fully translated and indexable before JavaScript runs`, async () => {
        const html = await readFile(new URL(`../build/${code}/index.html`, import.meta.url), 'utf8');
        assert.match(html, new RegExp(`<html lang="${code}">`));
        assert.ok(html.includes(`<title>Emmanuel Abelle | ${names[code]}</title>`));
        assert.ok(html.includes(greetings[code]));
        const links = tags(html, 'link');
        assert.equal(links.find(link => link.rel === 'canonical')?.href, `${origin}/${code}/`);
        for (const other of ['en', 'fr']) {
            assert.equal(links.find(link => link.rel === 'alternate' && link.hreflang === other)?.href, `${origin}/${other}/`);
        }
        assert.equal(links.find(link => link.hreflang === 'x-default')?.href, `${origin}/`);
        const metadata = tags(html, 'meta');
        assert.ok(metadata.find(meta => meta.name === 'description')?.content);
        assert.equal(metadata.find(meta => meta.property === 'og:url')?.content, `${origin}/${code}/`);
        assert.equal(metadata.find(meta => meta.name === 'twitter:title')?.content, `Emmanuel Abelle | ${names[code]}`);
        const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? 'null');
        assert.equal(schema?.['@type'], 'ProfilePage');
        assert.equal(schema?.inLanguage, code);
        assert.equal(schema?.url, `${origin}/${code}/`);
        assert.equal(schema?.mainEntity?.['@id'], `${origin}/#person`);
        const anchors = tags(html, 'a');
        for (const other of ['en', 'fr']) {
            assert.ok(anchors.some(anchor => anchor.href === `/${other}/` && anchor.hreflang === other));
        }
    });
}

test('the neutral entry is English without JavaScript and canonicalizes to English', async () => {
    const html = await readFile(new URL('../build/index.html', import.meta.url), 'utf8');
    assert.match(html, /<html lang="en">/);
    assert.equal(tags(html, 'link').find(link => link.rel === 'canonical')?.href, `${origin}/en/`);
});

test('the sitemap contains exactly the enabled canonical language pages', async () => {
    const xml = await readFile(new URL('../build/sitemap.xml', import.meta.url), 'utf8');
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
    assert.deepEqual(urls, ['en', 'fr'].map(code => `${origin}/${code}/`));
});

test('disabled Swahili is not built or advertised in SEO and navigation', async () => {
    assert.equal(existsSync(new URL('../build/sw/index.html', import.meta.url)), false);
    for (const code of ['en', 'fr']) {
        const html = await readFile(new URL('../build/' + code + '/index.html', import.meta.url), 'utf8');
        assert.equal(tags(html, 'link').some(link => link.hreflang === 'sw'), false);
        assert.equal(tags(html, 'a').some(anchor => anchor.hreflang === 'sw'), false);
        assert.equal(tags(html, 'meta').some(meta => meta.property === 'og:locale:alternate' && meta.content === 'sw_KE'), false);
    }
});
