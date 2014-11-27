#!/usr/bin/env python
"""

  A small program to automatically generate passwords. After much discussion, I
  settled on this solution. The problem is that places often have weird
  restrictions on passwords, disallowing certain symbols. The password I
  generated for myself long ago has lots of strange symbols which are typically
  disallowed by these filters; I'm not sure why, as it reduces password entropy
  :-(. Anyway, I wanted to have a way to automatically generate passwords which
  has the following properties:

    * different passwords per site
    * good passwords (modulo the next point)
    * passwords get past most filters (i.e. they're in the base62 alphabet)
    * no persistant storage. I want to be able to recover the password from
      anywhere, not just a particular computer with some GUI on it. Further,
      persistant storage means it could be stored insecurely by mistake, since
      I'm not a crypto genius.

  The entropy of these passwords is fairly high due to hashing (it's a little
  watered down due to the last two steps, but not much), and the solution
  satisfies the other three properties. It is highly likely that there are both
  upper and lower case letters, though numbers is less likely, but we do some
  post-processing to insert one if need-be).

  I believe this is secure unless there is some kind of attack on the first few
  bits of sha512. Your user secret should be a *good* password that is *long*!
  The longer the better. See the relevant xkcd for more info:
  https://xkcd.com/936/

"""

from hashlib import sha512
from base64 import b64encode


def contains_a_number(s):
    """ Does this string contain a number? """
    for c in s:
        try:
            int(c)
            return True
        except ValueError:
            pass


def to_number(c):
    """ Turn the specified character into a number """
    return str((ord(c.upper()) - ord('A'))%10)


def generate(string, password, length=10):
    string = str(string)
    password = str(password)
    length = int(length)

    # get some secret bits from the user
    secret = sha512(string + password).digest()

    ans = b64encode(secret, string)[:length]

    if not contains_a_number(ans):
        ans = ans[:-1] + to_number(ans[-1])

    return ans
