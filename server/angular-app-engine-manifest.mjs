
export default {
  basePath: 'https://nagymarten.github.io/Laci_Climate_Frontend',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
