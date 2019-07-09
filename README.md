# HOTP TOTP CLI
[![npm](https://flat.badgen.net/npm/v/hotp-totp-cli)](https://npmjs.com/package/hotp-totp-cli)
[![npm license](https://flat.badgen.net/npm/license/hotp-totp-cli)](https://npmjs.com/package/hotp-totp-cli)
[![npm downloads](https://flat.badgen.net/npm/dm/hotp-totp-cli)](https://npmjs.com/package/hotp-totp-cli)

HMAC- and Time-Based One-Time Password (HOTP / TOTP) Command Line Interface

## Install via [npm](https://npmjs.com)

```sh
$ npm install --global hotp-totp-cli
```

Will install two CLI utilities, `hotp` and `totp`.

## Usage

The key can be either a **base32** ([RFC 3548]) encoded string, or an `optauth:` URI in [Key URI Format]

[RFC 3548]: http://tools.ietf.org/html/rfc3548
[Key URI Format]: https://github.com/google/google-authenticator/wiki/Key-Uri-Format

### totp

```
Usage: totp [options] <key>

Options:

  -d, --digits       Number of passcode digits to generate [6-10] (Default: 6)
  -a, --algorithm    HMAC algorithm to use (Default: sha1)
  -p, --period       Seconds the passcode is valid for (Default: 30)
  -t, --time         Time for which to calculate the passcode
  -e, --epoch        T-0

  -h, --help
  -v, --version

```

### hotp

```
Usage: hotp [options] <key>

Options:

  -c, --counter      Counter value to calculate the passcode for
  -a, --algorithm    HMAC algorithm to use (Default: sha1)
  -d, --digits       Number of passcode digits to generate [6-10] (Default: 6)

  -h, --help
  -v, --version

```

## Examples

### Publishing to npm

Avoid manually typing your OTP token with a CLI credential manager (i.e. [pass]):

[pass]: https://www.passwordstore.org/

```bash
npm publish --otp $( totp $( pass 2fa/npm.key ) )
```

**NOTE:** This is probably a bad idea if your GPG passphrase is stored anywhere else except your head.
