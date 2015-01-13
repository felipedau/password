# password - extension for Google Chrome

I really like the solution created by [tych0] and decided to make a Chrome
extension of it. The generation of the password is being done the same way the
[original repo] does. Here is the docstring written by *tych0*:


>  A small program to automatically generate passwords. After much discussion, I
  settled on this solution. The problem is that places often have weird
  restrictions on passwords, disallowing certain symbols. The password I
  generated for myself long ago has lots of strange symbols which are typically
  disallowed by these filters; I'm not sure why, as it reduces password entropy
  :-(. Anyway, I wanted to have a way to automatically generate passwords which
  has the following properties:
  
> * different passwords per site

> * good passwords (modulo the next point)

> * passwords get past most filters (i.e. they're in the base62 alphabet)

> * no persistant storage. I want to be able to recover the password from
     anywhere, not just a particular computer with some GUI on it. Further,
     persistant storage means it could be stored insecurely by mistake, since
     I'm not a crypto genius.
  
> The entropy of these passwords is fairly high due to hashing (it's a little
  watered down due to the last two steps, but not much), and the solution
  satisfies the other three properties. It is highly likely that there are both
  upper and lower case letters, though numbers is less likely, but we do some
  post-processing to insert one if need-be).
  
> I believe this is secure unless there is some kind of attack on the first few
  bits of sha512. Your user secret should be a *good* password that is *long*!
  The longer the better. See the relevant xkcd for more info:
  https://xkcd.com/936/
  
The code that generates the password is on `extension/js/password.js`

As the current version is a prototype, this is the unpacked extension and it is
not on **Chrome Webstore**.

The first version depended on the Python script and it was not very practical.
*tych0* got in touch and assisted me on implementing it using only JavaScript
for this new version. Unfortunately you will not get the same results from them.

## Installing

After cloning the repo, install the extension by going to `Menu > More tools >
Extensions` on Chrome, clicking `Load unpacked extension...` and pointing to the
`extension` directory.

## Screenshot

![password screenshot]

## Usage

When you need a strong password for a specific website, click on the **puzzle
piece** icon  on the top bar of the browser and the first field should already
have the current domain. Type a length (if you would like it to be different
than ten), a password, and finally click `Generate` (or press enter).

The last field should have the password and will be automatically copied to the
clipboard :)

## Performance

I am not sure why, but CryptoJS' PBKDF2 is not performing well. While the Python
script generates the key with 100,000 iterations in a reasonable time, the
JavaScript runs only 100 iterations to generate a key in the approximate same
time. Switching to 1,000 iterations already makes it unfeasible, because it
takes around 6 seconds and more iterations than that will make it crash. You can
check [this test] that I did.

## Feedback

I would love to get feedback since I do not know much about JavaScript, CryptoJS
and Chrome Extensions. I will keep improving it whenever I am able to.

**Thank you!**

[original repo]: https://github.com/tych0/password
[password screenshot]: screenshot.png
[this test]: http://jsperf.com/cryptojs-pbkdf2
[tych0]: https://github.com/tych0
