/**                                                             

            ,-.                               .-. .-')                    .-. .-')   .-')         ,-.       
            / /                               \  ( OO )                   \  ( OO ) ( OO ).       \ \       
           / /            ,--. ,--.           ,--. ,--.  ,-.-')   .-----. ,--. ,--.(_)---\_)       \ \      
          / /         .-')| ,| |  |.-')       |  .'   /  |  |OO) '  .--./ |  .'   //    _ |         \ \     
         / /         ( OO |(_| |  | OO )      |      /,  |  |  \ |  |('-. |      /,\  :` `.          \ \    
        / /          | `-'|  | |  |`-' |      |     ' _) |  |(_//_) |OO  )|     ' _)'..`''.)          \ \   
       / /           ,--. |  |(|  '---.'      |  .   \  ,|  |_.'||  |`-'| |  .   \ .-._)   \           \ \  
      / /            |  '-'  / |      |       |  |\   \(_|  |  (_'  '--'\ |  |\   \\       /            \ \ 
      `-'             `-----'  `------'       `--' '--'  `--'     `-----' `--' '--' `-----'             `-' 
                                                              
*/
/*
|
| PREREQUISITES
|
|   BEFORE ANYTHING ON THE LEFT THERE SHOULD BE A FILE NAMED "YARN.LOCK". DELETE IT.
|   AFTER IT HAS BEEN DELETED/REMOVED RUN THE COMMAND W/O THE QUOTES: "npm install"
|
| INSTRUCTIONS
|
| You should and can make the terminal window bigger by clicking and dragging the top line of the terminal window up. Enough to see
| to see everything.
|
| On the terminal to allow your computer to run shell scripts copy and paste this without the quotes ("): "chmod +x ./launch.sh"
| After entered press enter and should look like it added a new line. This is good, means its done.
|
| Afterwards enter the following to start the bot, again minus the ("): "npm run launch"
|
| If everything went as planned you should be seeing a welcome screen followed by a set of questions and instructions for the task.
| As of now you can only run environment at a time. If you would like more open another terminal by selecting the split terminal
| icon looks like [|] to the left of the 🗑 icon
|
| Best of luck !
|
*/

import Order from './models/site.model';

const snkrUrl: string = process.env.URL!;
const sandbox: boolean = process.env.SANDBOX === 'test' ? true : false;
const time: string = process.env.TIME!;
const scheduled: boolean = process.env.SCHEDULED === 'y';
const newOrder = new Order(snkrUrl);

const runTask = async (): Promise<void> => {
  await newOrder.launch(sandbox);
  await newOrder.login();
  await newOrder.startTask(scheduled, time);
};

runTask();
