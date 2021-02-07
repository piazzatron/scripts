// ==UserScript==
// @name         Save to Matter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Michael Piazza
// @match        *://*/*
// @grant        GM.xmlHttpRequest
// ==/UserScript==

// Hacky Firefox Tampermonkey script
// for forwarding articles to Matter (until they open up a FF extension).
// Grab a token by inspecting network traffic in their Chrome extension

(function() {
  'use strict';
  // Add your token here
  const token = ""
  const url = window.location.href
  const matterUrl = "https://getmatter.app/api/v3/save/"
  const body = JSON.stringify({ url })

  const buttonCallback = () => {
    GM.xmlHttpRequest({
      method: 'POST',
      url: matterUrl,
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language":" en-US,en;q=0.9",
        "authorization": "",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "origin": "chrome-extension://knjbgabkeojmfdhindppcmhhfiembkeb",
        "token": token,
        "pragma": "no-cache",
        "sec-ch-ua":'"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
        "sec-ch-ua-mobile":'?0',
        "sec-fetch-dest":'empty',
        "sec-fetch-mode":'cors',
        "sec-fetch-site":'none',
        "user-agent":'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        "x-matter-extension-version":"0.0.0.4"
      },
      data: body,
      onload: () => {
        alert("Success!")
      },
      onError: () => {
        alert("Error!")
      }
    })
  }
  const btn = document.createElement("div")
  btn.style.cssText = `
    z-index: 100000;
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 28px;
    cursor: pointer;
  `

  btn.innerText = "📤"

  btn.addEventListener("click", buttonCallback)

  document.body.appendChild(btn)

})()
