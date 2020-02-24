import crypto from 'crypto-js';
import { useState } from 'react';

export default () => {
  const SECRET = 'verysecret';
  const encryptedWord = crypto.AES.encrypt('this is a message!', SECRET).toString();

  const [secret, setSecret] = useState(SECRET);
  const [message, setMessage] = useState(encryptedWord);
  const [enc, setEnc] = useState('');
  const [dec, setDec] = useState('');

  const encrypt = (input: string) => {
    setEnc(crypto.AES.encrypt(input, secret).toString());
  };
  const decrypt = (input: string) => {
    const bytes = crypto.AES.decrypt(input, secret);
    let decrypted;
    try {
      decrypted = bytes.toString(crypto.enc.Utf8);
    } catch {
      return;
    }
    setDec(decrypted);
  };

  return (
    <>
      <h2>AES 256</h2>
      <label>secret</label>
      <input value={secret} onChange={e => setSecret(e.target.value)} />

      <label>message</label>
      <textarea value={message} onChange={e => setMessage(e.target.value)} />

      <br />

      <label>encrypted</label>
      <button
        onClick={() => {
          encrypt(message);
        }}
      >
        encrypt
      </button>
      <textarea className="inline-block" value={enc} />

      <label>decrypted</label>
      <button
        onClick={() => {
          decrypt(message);
        }}
      >
        decrypt
      </button>
      <textarea className="inline-block" value={dec} />

      <style jsx>{`
        * {
          display: block;
        }
        button {
          margin: 1vmin;
        }
        button,
        .inline-block {
          display: inline-block;
        }
        br {
          margin-top: 5vmin;
        }
        textarea {
          height: 20vh;
          width: 20vw;
        }
      `}</style>
    </>
  );
};
