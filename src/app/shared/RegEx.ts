import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class REGEX {
  DECIMALS = /^[1-9]+[0-9]*(\.[0-9]+)?|0\.[0-9]+$/;
  ONE_LOWERCASE = /[a-z]+/;
  ONE_NUMBER = /[0-9]+/;
  ONE_SYMBOL = /[!@#$%&*<>?+=.\-]+/;
  ONE_UPPERCASE = /[A-Z]+/;
}
