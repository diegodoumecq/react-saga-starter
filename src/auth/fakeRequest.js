import server from './fakeServer';

server.init();

export default {
    post(endpoint, data) {
        switch (endpoint) {
            case '/login':
                return server.login(data.username, data.password);
            case '/register':
                return server.register(data.username, data.password);
            case '/logout':
                return server.logout();
            default:
                break;
        }
    }
};
