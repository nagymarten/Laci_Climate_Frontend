
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://nagymarten.github.io/Laci_Climate_Frontend/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Laci_Climate_Frontend"
  },
  {
    "renderMode": 2,
    "route": "/Laci_Climate_Frontend/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 4115, hash: '23b75d468909be390fa6ccaa5698d2fa74443c8a8d9eac3a388db38645726ab9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1141, hash: 'f9cbdc0c0d224dd50716168fd39ad480c068ded280696177f4c59d83ade7fc24', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 92298, hash: 'c6779cc86ba0e2bea4901ef8df26609b34161721036d93cc7368fffa4ac4ce39', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-A523JBSO.css': {size: 24547, hash: 'vwL97U0t0lY', text: () => import('./assets-chunks/styles-A523JBSO_css.mjs').then(m => m.default)}
  },
};
