import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const slugs = ['digital-marketing','multimedia','interior-designing','accounting','ms-office','sap','software-courses'];
const companySlugs = ['bytrix-hub','northstar-accounts','pixelcraft-studio','urbannest-interiors','brightdesk-solutions','cloudline-erp'];
const routes = ['/', '/about', '/courses', '/placements', '/life', '/contact', ...slugs.map(s => '/courses/' + s), ...companySlugs.map(s => '/placements/companies/' + s)];
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4178','--strictPort'], { stdio: 'pipe' });
const origin = 'http://127.0.0.1:4178';
let browser;
try {
  for (let i = 0; i < 80; i++) { try { if ((await fetch(origin)).ok) break; } catch {} await new Promise(r=>setTimeout(r,250)); }
  const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
  const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  browser = await chromium.launch({ headless: true, ...(existsSync(edge) ? {executablePath: edge} : existsSync(chrome) ? {executablePath:chrome} : {}) });
  const page = await browser.newPage({viewport:{width:1200,height:630}});
  await page.goto(origin + '/social-card.svg', {waitUntil:'load'});
  await page.screenshot({path:'dist/social-card.png',clip:{x:0,y:0,width:1200,height:630}});
  await page.route('https://images.unsplash.com/**',route=>route.abort());
  await page.route('https://fonts.**',route=>route.abort());
  const template = await readFile('dist/index.html','utf8');
  for (const route of routes) {
    await page.goto(origin + route, {waitUntil:'domcontentloaded'});
    await page.locator('h1').waitFor();
    await page.waitForFunction(()=>document.querySelector('link[rel="canonical"]'));
    const { title, meta, canonical, schema } = await page.evaluate(() => ({title:document.title,meta:[...document.head.querySelectorAll('meta[name="description"], meta[property^="og:"], meta[name^="twitter:"]')].map(e=>e.outerHTML).join(''),canonical:document.querySelector('link[rel="canonical"]').outerHTML,schema:document.querySelector('#structured-data').outerHTML}));
    const markup = await page.locator('#root').innerHTML();
    let html=template.replace(/<title>.*?<\/title>/s,`<title>${title}</title>`).replace(/<meta name="description"[^>]*\/>/,'').replace('</head>',`${meta}${canonical}${schema}</head>`).replace('<div id="root"></div>',`<div id="root">${markup}</div>`);
    if(route !== '/') {
      const names=route.split('/').filter(Boolean);
      const crumbs={ '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://gtecmahe.com/'},...names.map((name,i)=>({'@type':'ListItem',position:i+2,name:name.replaceAll('-',' ').replace(/\b\w/g,c=>c.toUpperCase()),item:'https://gtecmahe.com/'+names.slice(0,i+1).join('/')}))]};
      html=html.replace('</head>',`<script type="application/ld+json">${JSON.stringify(crumbs)}</script></head>`);
    }
    const directory=path.join('dist',route.slice(1));await mkdir(directory,{recursive:true});await writeFile(path.join(directory,'index.html'),html);
    console.log('Prerendered '+route);
  }
  await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>https://gtecmahe.com${r}</loc></url>`).join('')}</urlset>`);
  await writeFile('dist/robots.txt','User-agent: *\nAllow: /\nSitemap: https://gtecmahe.com/sitemap.xml\n');
} finally { await browser?.close(); server.kill(); }



