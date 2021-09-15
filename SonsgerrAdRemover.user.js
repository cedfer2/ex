// ==UserScript==
// @name         SongsrerrAdRemove
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *.songsterr.com/a/wsa/*
// @icon         https://songsterr.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var styles = `
    .C7l1sl,
    #showroom{
    display:none!important;
    height: 0px !important;
    width: 0px !important
    }
`

var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
})();