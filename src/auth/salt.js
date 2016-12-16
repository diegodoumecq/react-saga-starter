import btoa from 'btoa';

export default function (seed) {
    const bytes = [];

    for (let i = 0, l = seed.length; i < l; i++) {
        bytes.push(seed.charCodeAt(i));
    }

    while (bytes.length < 16) {
        bytes.push(0);
    }

    const salt = btoa(String.fromCharCode.apply(String, bytes.slice(0, 16)));

    return '$2a$10$' + salt;
};
