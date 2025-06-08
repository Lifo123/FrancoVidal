import CryptoJS from 'crypto-js';
import SHA256 from 'crypto-js/sha256';

export const generateSalt = (length = 16) => {
    return CryptoJS.lib.WordArray.random(length).toString();
}

export const hashPass = (pass: string, salt: string) => {
    return SHA256(pass + salt).toString();
}


const xorWithSalt = (text: string, salt: string) => {
    return text.split('').map((char, i) =>
        String.fromCharCode(char.charCodeAt(0) ^ salt.charCodeAt(i % salt.length))
    ).join('');
}

export const encrypt = (text: string, salt: string) => {
    const xorText = xorWithSalt(text, salt);
    return btoa(xorText)
}

export const decrypt = (encodedText: string, salt: string) => {
    const decodedText = atob(encodedText);
    return xorWithSalt(decodedText, salt)
}