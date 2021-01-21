import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

import { KSizes, IData } from '../types/shared.types';
import { logger } from '../utils/index.util';

export default class Order {
  private selectedSize: KSizes | null = null;
  private control: puppeteer.Page;
  private config: IData;
  private isTestRun: boolean;

  private url: string;
  private loginUrl: string =
    'https://www.nike.com/login?continueUrl=https://www.nike.com/member/profile';

  constructor(url: string) {
    this.url = url;
  }

  private getConfiguration = (): Promise<IData> => {
    return new Promise((resolve, reject) => {
      const profilePath = path.join(__dirname, '../data/profile.json');
      fs.readFile(profilePath, (err, data) => {
        if (!err) {
          const profileData: IData = JSON.parse(data.toString());
          resolve(profileData);
        } else {
          reject(err);
        }
      });
    });
  };

  private launchBrowser = async () => {
    const browser = await puppeteer.launch({ headless: false });
    this.control = await browser.newPage();
    await this.control.setViewport({ width: 1300, height: 800 });
    await this.control.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    );
  };

  launch = async (runTest: boolean = true) => {
    logger(`${runTest ? 'Starting test run' : 'Here to serve up a nice "Got\'em"'}`);
    logger('Receiving profile');

    try {
      logger('Setting up configurations...');

      const results = await this.getConfiguration();
      this.config = results;
      this.isTestRun = runTest;
      await this.launchBrowser();
    } catch (err) {
      console.log(err);
    }
  };

  login = async () => {
    const { email, password } = this.config.userInfo;
    try {
      logger('Preparing to login with the given credentials...');

      await this.control.goto(this.loginUrl, { waitUntil: 'networkidle2' });

      logger('signing in...');

      await this.control.evaluate(
        ({ email, pwd }) => {
          document.querySelector<HTMLInputElement>('input[name="emailAddress"]')!.value = email;
          document.querySelector<HTMLInputElement>('input[name="password"]')!.value = pwd;
        },
        { email, pwd: password }
      );

      await this.control.waitForSelector('input[type=button]');
      const [signinBtn] = await this.control.$$('input[type=button]');
      await signinBtn.click();
      await this.isLoggedIn();
    } catch (err) {
      console.log(err);
    }
  };

  isLoggedIn = async () => {
    try {
      await this.control.waitForFunction(
        'document.querySelector("body").innerText.includes("AN ERROR OCCURRED")'
      );
      logger('Failed to login...\nMaking another attempt to login');
      await this.login();
    } catch (err) {
      console.log('Login Successful');
    }
  };

  startTask = async () => {
    try {
      await this.beginOrder();
      await this.selectSizes();
      await this.addItemToCart();
    } catch (err) {
      console.log(err);
    }
  };

  private beginOrder = async () => {
    await this.control.goto(this.url, { waitUntil: 'networkidle2' });
  };

  private genderSize = (buttons: any[]) => {
    const gender = this.config.appConfig.gender;
    if (gender === 'f') {
      return 0;
    } else {
      if (this.selectedSize!.length >= 3) {
        return buttons.length - 1;
      }
      return buttons.length - 2;
    }
  };

  private selectSizes = async () => {
    logger('Validating size....');

    this.selectedSize = this.config.appConfig.preferredSize;
    await this.control.waitForXPath(`//button[contains(text(), "${this.selectedSize}")]`);
    const sizebtn = await this.control.$x(`//button[contains(text(), "${this.selectedSize}")]`);
    const gender = this.genderSize(sizebtn);

    logger(`Attempting to add a size ${this.config.appConfig.gender}${this.selectedSize}...`);

    this.triggerSizeSelection(sizebtn[gender]);
  };

  private triggerSizeSelection = async (sizeBtn: puppeteer.ElementHandle<Element>) => {
    if (sizeBtn) {
      const [availability] = await sizeBtn.$x('..');
      const elm: string = (await (
        await availability.getProperty('className')
      ).jsonValue()) as string;

      logger(`Availability: ${elm.includes('disabled') ? 'sold_out' : 'available'}`);

      if (!elm.includes('disabled')) {
        await sizeBtn.click();
      }
    }
  };

  private addItemToCart = async () => {
    logger('Adding item to cart...');
    await this.control.waitForSelector('button[data-qa="add-to-cart"]');
    const [cartBtn] = await this.control.$$('button[data-qa="add-to-cart"]');
    await cartBtn.click();
    logger('Item added successfully');
    logger('Proceeding to checkout...');
    await this.naviageToCheckout();
  };

  private naviageToCheckout = async () => {
    await this.control.goto('https://www.nike.com/checkout', { waitUntil: 'networkidle2' });
    await this.completeCheckout();
  };

  private loadCheckoutFrame = async (): Promise<puppeteer.Frame | null> => {
    logger('Waiting for iframe to load form content...');

    const frame = await this.control.waitForSelector('iframe');
    const frameContent = await frame.contentFrame();

    logger('frame loaded and ready');

    return frameContent;
  };

  private completeCheckout = async () => {
    logger('At checkout');
    await this.filloutCvc();
    await this.getOrderReview();
  };

  private filloutCvc = async () => {
    const { ccCvc } = this.config.userInfo;
    try {
      logger('Completing cc-information');
      const frame = await this.loadCheckoutFrame();
      await frame?.type('input[id="cvNumber"]', ccCvc);
      logger('cc-information added');
    } catch (err) {
      logger('Frame was not loaded properly');
      await this.filloutCvc();
    }
  };

  private getOrderReview = async () => {
    logger('Clicking order review');
    await this.control.waitForSelector('button[data-attr="continueToOrderReviewBtn"]');
    const [cartBtn] = await this.control.$$('button[data-attr="continueToOrderReviewBtn"]');
    await cartBtn.click();
    if (!this.isTestRun) {
      logger('Finalizing order....');
      await this.finishOrder();
      this.printReceipt();
    } else {
      logger('👨🏽‍🔬 This was a test run. So the task ends here. 👨🏽‍🔬');
      this.printReceipt();
    }
  };

  private finishOrder = async () => {
    await this.control.waitForXPath(`//button[contains(text(), "Place Order")]`);
    const [orderBtn] = await this.control.$x(`//button[contains(text(), "Place Order")]`);
    await orderBtn.click();
    logger("👟👟 YOU GOT EM'..... SKIKE lol 👟👟");
  };

  private printReceipt = () => {
    logger('Saving a screenshot of receipt');
    setTimeout(async () => {
      if (this.isTestRun) {
        await this.control.screenshot({ fullPage: true, path: 'fake_run.png' });
      } else {
        this.control.screenshot({ fullPage: true, path: 'order.png' });
      }
    }, 1000);
  };
}
