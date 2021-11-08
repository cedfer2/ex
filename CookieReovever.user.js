// ==UserScript==
// @name         CookieReovever
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  CockiesRomve
// @author       You
// @include      *geeksforgeeks.org/*
// @include      *stackoverflow.com/*
// @include      *programamos.es/*
// @include      *mx.jooble.org/*
// @include      *.jooble.org/*
// @include      *buscojobs.mx/*
// @include      *jobatus.mx/*
// @include      *jobleads.mx/*


// @icon         https://iconarchive.com/download/i42995/oxygen-icons.org/oxygen/Apps-preferences-web-browser-cookies.ico
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle("body{overflow: scroll;} [aria-describedby='onetrust-policy-text'], .cc_banner, [data-test-name='_termsOfServices'], #cookies, .cdp-cookies-texto, .cookie-consent, .js-consent-banner { visibility: hidden; display: none !important; } height: 0px; width: 0px;");
console.log("TamperCookieHide");