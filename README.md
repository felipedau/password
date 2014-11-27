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
  
The code that generates the password is on `password.py`

As the current version is a prototype, this is the unpacked extension and it is
not on **Chrome Webstore**.

## Installing

Unfortunately, the only way that I found to call a python function from
JavaScript was creating a web app using [Flask]. Therefore, after cloning the
repo, you have to run `./app.py`. I set the host to `http://127.0.0.1:5000`
(default). If you get a different one when you run the app, make sure to change
the **third** line of `password.js`:

> url: 'http://127.0.0.1:5000/generatePassword',

Install the extension by going to `Menu > More tools > Extensions` on Chrome,
clicking `Load unpacked extension...` and pointing to the `extension` directory
inside the cloned repo.

## Screenshot

![password screenshot]

## Usage

When you need a strong password for a specific website, click on the **puzzle
piece** icon  on the top bar of the browser and the first field should already
have the current domain. Type a password, length (if you would like it to be
different than ten) and click `Generate`.

The last field should have the password and will be automatically copied to the
clipboard :)

## Feedback

I would love to get feedback since I do not know much about Flask, JavaScript
and Chrome Extensions. I do not like the current solution, since the user needs
to run the app to make the extension work, but this was the best approach I
could find. I might change everything to JavaScript or maybe find a better way
to keep using python. So far, that is what I have.
I still have to work on some details such as icon, error handling, etc...

**Thank you!**

[Flask]: http://flask.pocoo.org
[original repo]: https://github.com/tych0/password
[password screenshot]: screenshot.png
[tych0]: https://github.com/tych0
