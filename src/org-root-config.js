import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';
import microFrontendLayout from './microfrontend-layout.html';

const loadFns = {
  '@org/vite-app': () =>
    import(/* webpackIgnore: true */ 'http://localhost:3000/src/main.js'),
};

const routes = constructRoutes(microFrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name).catch(() => {
      const loadFn = loadFns[name];
      return loadFn();
    });
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start({ urlRerouteOnly: true });
