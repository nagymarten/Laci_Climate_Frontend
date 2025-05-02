
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
    'index.csr.html': {size: 4115, hash: '179be39a819c7eb4f0d3ac00a12d0494dbf9cf2885a0f5db85b553b79b595f00', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1141, hash: '7784e7c6bde94e5c0276cc12682ba7fd4ceb03187a47ba34d588581ca099a913', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 97232, hash: 'eb6e18a7519bb11435a761a9def57934d9ea7ed91e75f2d38d956164677c6680', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-IKKLX6N5.css': {size: 24143, hash: 'UFgsSEQ/CiI', text: () => import('./assets-chunks/styles-IKKLX6N5_css.mjs').then(m => m.default)}
  },
};
