import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import ts from 'typescript';

// This helper has no runtime imports; exercise the actual TypeScript implementation.
const source = await readFile(new URL('../src/lib/language.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { preferredLocale, isLocale, localePath, savedLocaleChoice } = await import(`data:text/javascript,${encodeURIComponent(outputText)}`);

test('an old automatically stored English default cannot suppress device detection', () => {
    assert.equal(savedLocaleChoice(null, 'en'), null);
    assert.equal(preferredLocale(undefined, savedLocaleChoice(null, 'en'), ['fr-FR']), 'fr');
    assert.equal(savedLocaleChoice('en', 'fr'), 'en');
    assert.equal(savedLocaleChoice(null, 'fr'), 'fr');
    assert.equal(savedLocaleChoice(null, 'sw'), null);
    assert.equal(savedLocaleChoice('bad-value', 'bad-value'), null);
});

test('direct language URLs take precedence over saved and device preferences', () => {
    assert.equal(preferredLocale('fr', 'en', ['sw-KE']), 'fr');
    assert.equal(preferredLocale('en', 'fr', ['fr-FR']), 'en');
    assert.equal(preferredLocale('sw', 'fr', ['en-GB']), 'fr');
});

test('an explicit saved choice overrides the device', () => {
    assert.equal(preferredLocale(undefined, 'en', ['fr-CA']), 'en');
    assert.equal(preferredLocale(undefined, 'sw', ['fr-FR']), 'fr');
});

test('regional device languages select the first supported preference', () => {
    assert.equal(preferredLocale(undefined, null, ['fr-CA', 'en-US']), 'fr');
    assert.equal(preferredLocale(undefined, null, ['sw-KE', 'en-GB']), 'en');
    assert.equal(preferredLocale(undefined, null, ['de-DE', 'fr-FR']), 'fr');
    assert.equal(preferredLocale(undefined, null, ['en-GB', 'fr-FR']), 'en');
    assert.equal(preferredLocale(undefined, null, ['FR_ca']), 'fr');
});

test('unsupported or missing preferences safely fall back to English', () => {
    assert.equal(preferredLocale(undefined, null, []), 'en');
    assert.equal(preferredLocale('de', 'bad-value', ['de-DE', 'it-IT']), 'en');
    assert.equal(preferredLocale(undefined, 'bad-value', ['sw-TZ']), 'en');
    assert.equal(isLocale('en-US'), false);
    assert.equal(isLocale(null), false);
});

test('all supported languages have explicit, stable URLs', () => {
    assert.deepEqual(['en', 'fr'].map(localePath), ['/en/', '/fr/']);
});

test('disabled Swahili cannot be selected by URL, storage, or device language', () => {
    assert.equal(isLocale('sw'), false);
    assert.equal(savedLocaleChoice('sw', 'sw'), null);
    assert.equal(preferredLocale('sw', 'sw', ['sw-KE']), 'en');
    assert.equal(preferredLocale(undefined, 'sw', ['sw-KE', 'fr-FR']), 'fr');
});
