import Order from './models/site.model';

const newOrder = new Order('https://www.nike.com/launch/t/daybreak-pure-platinum');

(async () => {
  await newOrder.launch();
  await newOrder.login();
  await newOrder.startTask();
})();
