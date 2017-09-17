import { createNetworkInterface, ApolloClient } from 'react-apollo';
import storage from 'store';
import { GC_AUTH_TOKEN } from '../utils/graphcool';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj7o5s0nt06qk0121itcnk1tt',
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      const token = storage.get(GC_AUTH_TOKEN);
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
    },
  },
]);

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
});

export default client;
