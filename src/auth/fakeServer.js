import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
import genSalt from './salt';

let users;
const { localStorage } = global.window;
const salt = genSaltSync(10);

const server = {
    init() {
        if (localStorage.users === undefined || !localStorage.encrypted) {
            let bob = 'bob';
            let bobSalt = genSalt(bob);
            let bobPass = hashSync('password', bobSalt);

            users = {
                [bob]: hashSync(bobPass, salt)
            };

            localStorage.users = JSON.stringify(users);
            localStorage.encrypted = true;
        } else {
            users = JSON.parse(localStorage.users);
        }
    },

    login(username, password) {
        const userExists = this.doesUserExist(username);

        return new Promise((resolve, reject) => {
            if (userExists && compareSync(password, users[username])) {
                resolve({
                    authenticated: true,
                    // Fake a random token
                    token: Math.random().toString(36).substring(7)
                });
            } else {
                if (userExists) {
                    reject(new Error('Wrong password'));
                } else {
                    reject(new Error('User doesn\'t exist'));
                }

            }
        })
    },

    register(username, password) {
        return new Promise((resolve, reject) => {
            if (!this.doesUserExist(username)) {
                users[username] = hashSync(password, salt);
                localStorage.users = JSON.stringify(users);
                resolve({registered: true});
            } else {
                reject(new Error('Username already in use'));
            }
        });
    },

    logout() {
        return new Promise(resolve => {
            localStorage.removeItem('token');
            resolve(true);
        });
    },

    doesUserExist(username) {
        return users[username] !== undefined;
    }
};

server.init();

export default server;
