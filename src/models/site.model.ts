import puppeteer from 'puppeteer';
import moment from 'moment';
// ** FOR DEVELOPMENT ONLY **
// import util from 'util';
// import fs from 'fs';

import { IData } from '../types/shared.types';
import { logger, getData, printbrand, printSuccess } from '../utils/index.util';

export default class Order {
  private selectedSize: string | undefined = undefined;
  private control: puppeteer.Page;
  private config: IData;
  private isTestRun: boolean;
  // ** FOR DEVELOPMENT ONLY **
  // private fileReqId: number = 0;
  // private fileResId: number = 0;

  private url: string;
  private loginUrl: string =
    'https://www.nike.com/login?continueUrl=https://www.nike.com/member/profile';

  constructor(url: string) {
    this.url = url;
  }

  private launchBrowser = async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--enable-automation',
        '--disable-accelerated-2d-canvas',
      ],
    });
    this.control = await browser.newPage();
    await this.control.setViewport({ width: 1300, height: 800 });

    await this.control.setRequestInterception(true);

    this.control.on('request', (req) => {
      if (
        req.resourceType() === 'stylesheet' ||
        req.resourceType() === 'font' ||
        req.resourceType() === 'image'
      ) {
        req.abort();
      } else {
        const showLogs = process.env.REQLOG === 'y';
        if (showLogs) {
          console.log(req.method());
          console.log(req.headers());
        }
        // ** FOR DEVELOPMENT ONLY **
        // fs.writeFileSync(`x_requests/req.${this.fileReqId}-${req.method()}.txt`, util.inspect(req));
        // this.fileReqId++;
        req.continue();
      }
    });

    // ** FOR DEVELOPMENT ONLY **
    // this.control.on('response', (res) => {
    //   fs.writeFileSync(`x_response/res.${this.fileResId}-s${res.status()}.txt`, util.inspect(res));
    //   this.fileResId++;
    // });
  };

  launch = async (runTest: boolean = true) => {
    printbrand();
    logger(`${runTest ? 'Starting test run' : 'Here to serve up a nice "Got\'em"'}`);
    logger('Receiving profile');
    logger(`Making an order for a size ${process.env.SIZE}`);

    try {
      logger('Setting up configurations...');

      const results = await getData();
      this.config = results;
      this.isTestRun = runTest;

      await this.launchBrowser();
    } catch (err) {
      console.log(err);
    }
  };

  login = async () => {
    try {
      logger('Preparing to login with credentials...');

      await this.control.goto(this.loginUrl, { waitUntil: 'networkidle2' });

      logger('signing in...');

      await this.control.type('input[name="emailAddress"]', 'jochy07c@gmail.com', { delay: 100 });
      await this.control.type('input[name="password"]', 'Florida1.', { delay: 100 });

      await this.control.waitForSelector('input[type=button]');
      const [signinBtn] = await this.control.$$('input[type=button]');
      await signinBtn.click({ delay: 100 });
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
      console.log('Login Successful\n');
    }
  };

  startTask = async (scheduled: boolean, time: string) => {
    if (scheduled && time) {
      this.scheduleRun(time, this.beginOrder);
    } else {
      await this.beginOrder();
    }
  };

  private beginOrder = async () => {
    try {
      await this.navigateToTarget();
      await this.selectSizes();
      await this.addItemToCart();
    } catch (err) {
      console.log(err);
    }
  };

  private scheduleRun = (time: string, cb: any): void => {
    let timerId: any;
    let currentTime;

    const stoptimer = () => {
      logger('stopping timer');
      clearInterval(timerId);
    };

    timerId = setInterval(() => {
      currentTime = moment().format('LTS');
      console.log(
        `time remaining: ${moment
          .utc(moment(`${time}:00 AM`, 'h:mm:ss A').diff(moment(currentTime, 'h:mm:ss A')))
          .format('mm:ss')}`
      );
      if (currentTime === `${time}:00 AM`) {
        cb();
        stoptimer();
      }
    }, 350);
  };

  private navigateToTarget = async () => {
    await this.control.goto(this.url, { waitUntil: 'networkidle0' });
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
    try {
      logger('Validating size....');

      this.selectedSize = process.env.SIZE;
      await this.control.waitForXPath(`//button[contains(text(), "${this.selectedSize}")]`);
      const sizebtn = await this.control.$x(`//button[contains(text(), "${this.selectedSize}")]`);
      const gender = this.genderSize(sizebtn);

      logger(`Attempting to add a size ${this.config.appConfig.gender}${this.selectedSize}...`);

      await sizebtn[gender].click();
    } catch (err) {
      logger('...trying again to select size smh');
      await this.selectSizes();
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
    await this.control.goto('https://www.nike.com/checkout', { waitUntil: 'networkidle0' });
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
  };

  private printReceipt = () => {
    logger('Saving a screenshot of receipt');
    setTimeout(async () => {
      if (this.isTestRun) {
        await this.control.screenshot({ fullPage: true, path: 'fake_run.png' });
        printSuccess();
      } else {
        await this.control.screenshot({ fullPage: true, path: 'order.png' });
        printSuccess();
      }
    }, 2000);
  };
}
