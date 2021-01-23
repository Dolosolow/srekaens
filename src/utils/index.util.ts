import fs from 'fs';
import path from 'path';

import { IData } from '../types/shared.types';

export const logger = (message: string) => {
  console.log('====================================');
  console.log(message);
  console.log('====================================\n');
};

export const getData = (): Promise<IData> => {
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

export const printbrand = () => {
  console.log(`
  \` \`'  \`.'.\` '. \` \` ' \`- \`..\`-\`. ' -   '-\`' -.\`- \` ' '\`. .'.-'. ' '   \`-\`.   \` ---\`\`  '-  \`\`.-.' .\`\`' -  \`\` '-\` - \` '.  '\`\`
  \`\`.\`-  .'\`\`-\`.' ' .\`   . ' - \` -\` ..  . '  .   '.'.-iFJsz1\! ..    .--\` -\`.\`'- .\`.-\` -    \`      \` -\`  -\`\` -  '.\`\`    \` \`
\`  . -..-- .'  '  ' - '- '  \`- .\`.\`\`\`\`-\` -..  ' .\`-'|KggBQgHWWG|   \` --' - -'  -'   -  ' -.- . -'  \`\`'-- ''\`..\`  '\` ''.. \`
-\`  .  -\`.' -'-..-\`'    . -'. - '  -' .\`  \`'-   \`\`-]BWBBWRHQWBRg7 '\`-  '.'-'-'\`- -.\`\`\` \`.  \`.\`'\` -  \`\` '.-...\` ' '\`'-.  .'
- .''\`-. .-  .-.-\`\`- \`'..-\`''\`-.>+ - ' \`   '\`---  \`MWggWRRQRQHRBHMt~'''' - \`.\`. '\`-\` .  \`   -\`..''\`.' - '\`'\`   -\`'.\`--. ' 
\`'.'-\` .\`-- '-\`-\`'-' ' \` . \`-- i&W0t=\`'- '. '\` .."tMWRRWQHRQgQRBRRHPtjr+.  . '  .\`''\` .'- \`\`'- \`-.\` .  .  \`  .\`  . \`     \`
.'\`-.\`- -   .--  . '\` - -. -  >VBgBHROnv=+<+|xnh&RWRWWHWBWQRQHHBWWgQWHBBbtv=.\`.'.  .'..\`\`- \`    .\`\`  \` \`'..\` \` .\`\`.  '  --
-'.-   .   '   '..\` '- - '- \`\`fgw4bRWWgBQHHWHHgHWWRQWRWQgQQQQRHgggWBHHQRQHWHNz/>'.\`.-  --.  . --\`.-\`  \`'\`'- \`'\` --. ..'-. '
- -'\` '.'\`  \`. ' -..' \`  ..\` =BPv:-!|TIpBgHQBBRQWgBQWHBBWgRHRggQWHQHgggBBQBHgWQgO4*-.'\`'- ...\`'' .'  -- ..'' - -. -\`'..  '\`
' -\`  \`'\`-'\`-.. - -. \`' .\`.\` YggWQO41?\`\`_;1Ip@HHWHQgWRHRggWBRWQBHRWwSRBBBWgHBBRQHgHMUj](\`- . --   -'.-'  . .   - \`- - \`--  
' \`-'\`-\`  .\`.--\` .- -. - .'  GQBQRgQWR@wui+   *itZm@BHBQBQWHBRHBRHg7'rwWWHgBQQWHHQHHBBRH8Y;! \`- -  .. '  '-.\`- \`- -\`. ' \`'
  -.'  ..   - ...- . .-.'   =gHQBHHBHRQQWBBOZtv> -' <v1IhM@QgHQRHW$!-  YQBWgWHgQgRQggBRWWRHNOXozYlv?">^-  \`\` '.'-'-.' \`\`. 
-.   . -. .  -- -.\`\` '--\`  -\HgBgWWRBgBHQRWHRBQgDS2l\, \` \`->|iTY{;''.  '5BRQQHHWWRQBRWWQHgWRgBgWRRBWWQ&NO06i' - ---.'\`- . 
'''- ' -'\`-'-\` .-...   '. '-*gHWBQRRRgHHgHgBQQgHQBHHWgM$ux(,.'\`'-\`' .' !0WgWWRQBgBRWRRRHBWWgQBHHRQBHRBgQQBQHv-.-   --..-'-\`
 \`\` .-\`.-'-'--. .   -\`   '  <DgHgHRgRgBWHBQBRBWRHRWBBWBRWQRWMXnx/^ .^"1bRQBHRRQQQBHHBQQgBHQgRHRHBBBQQQgBBRWge.-    '\`\`'- .
.-\`'  -\`-.\`'   \`''.'  \`\`\`\`-.\`BWHBQBRBBWHBQBRBBfF4XZXEUpMDQgQBHQRggBHWDNWBHWQgBRWgRBRRggHRQQRRBHRWQWgBRH&dE4y{?<'  '.' -''- - 
.-.\`\` '. \` \` ' \`- \`..\`-\`. ' -BWHBQBRBBfF4XZXEUpMXZXEUpMDQgQBHQRggBHWDNWBHWQgBRWgRBRRggHRQQRRBHRWQWgBRH&dE4y{?<''.  '\`-\`-.' .
-\`\`  .-''--.- .-' '\`.-\` '-.   ..-  '' \`.\`'-\`    .'-.'..\`'.   \`\`.  \`\`'\`.-,'\`_ -, \`.\`.-  '\`\`\`  '\`_ -, \`.\`.- '\`_ -, \`.\`.-  \`  
 .\` ''\` '. \` \` ' \`- \`..\`-\`. ' -   '-\`' -.\`- \` ' '\`. .'.-'. ' '   \`-\`.   \` ---\`\`  '-  \`\`.-.' .\`\`' -  \`\` '-\` - \` '.  '\`'''.
.  -\` '. \` \` ' \`- \`..\`-\`. ' -   '-\`' -.\`- \` ' '\`. .'.-'. ' '   \`-\`.   \` ---\`\`  '-  \`\`.-.' .\`\`' -  \`\` '-\` - \` '.  '\`.. -  
' '   -'-  ' ' .-\` - .' -- .      -. \`  __,,_.\`- \` ' '\`. .'.-'. ' '   \`-\`.   \` ---\`\`  '-  \`\`.-.' .\`\`' - .\`.  -\`' -'\`..'\`'\`
\`\`-  \`.    '   -   -  \`'--'  -\`'' '  \` . \`\`\`\`\`-'.    '\`-  -.\`..-  \`'\` \` .  '  \` '   \`   \`.. .  \`\`\`\` ... .'.\` \` .\` ''..'..-
  `);
};

export const printSuccess = () => {
  console.log(`
  ''\`' . \`\`\`...  .  ''\`.-' ---\`\`-.-- .'\`'- -  \`-.- .-  '- .'    .\`-- -\`. .'''\`  '    ..\`.- -\`\`\`'  \`' '.   --'.
  '   . -.\`.-'-. '-' '-'\`' ..'\`'  - .'\`\` ..' .\`.\`\` \`.\`-   \`-.'..\` ..\`' .\`  --\`'---  ..   \`.- \`.-''-  -    '  .
   '.' - \` -'  '\` - \`\`.-  .'\`\`-    .    ''      .\` - ' \` \`. ---  \`--' \` .\`''  ' .. -' \`'-- '\`'\`-.\`\`.-\`-.-    .
  .-\` .\`\` '\`  .\`    '.--.  \` -'-\`'- ' -\`.-- - -- ''..-.- --\` .  - -  ''' \`   - .\`'\`-'-- .-' \`.\`\`.    '. \`.   '
  \`-- \` -.\`-\`-  -- -.. .\`.\`'  . +"/)?+-.-   ---\`. ''' !"|/">  \`.\`\`  . \`.\`  \`' -  . '..'' ...'   - ''  \`\` \`\`. .
  \`' \` ..  .'     -\`'-'- \`\` >y9NRBgHgRg8j=--  \` '' iaMHBgWRBNKt< ..<&NNDN&N@&NDD&D@@n'   '- ''\`  '-'\` -' .  ' 
  ' -   \`.'   \`.\` --''\`   ^n&gWBWBgQQBQBWQX> '.  vOBBgBBgWBHHBWW#+ >QQBWBQQgHWQQWHRgo--\`   . ' \`   \`\`  .    ..
  -' ' \`\`  -   ---'- ' \` +MRQHRRRgHgWQRHWHQD|   FRQHgQBQQWQWWQgRBN;<gRHQBHHQWWBHRQHBF\`\`--   \`   \`'.- .- - '-\`-
  . ''.'- \`...  \`\`-''\`..^dgBgBRQNTrrtQgWQMhCv\`-sWHgWBgQd1cnWRgRWWBN;1YYYURQRHgHBs1T1\---' .''-- \`  '   '' .' -
    \`-\`   -' ' '-..  \`.'fHgBHgQBx . .v1?+\`.. .+BRHHBRgM~.\` xRWBHBRRZ- \`-#HRWWWHH+  .\`\` -.-'  \`  '\`--  '   \`\`'\`
   '\`.-.\`    '.-'\`\`\`' .-UBBHQQBN:'.'\`'  \`..-''fHBQWRQQt\`  \` DRWgBHgW:\`\`-VBBWQWgB<    .''--. '\`  -'.'-- - . -\` 
   .  -'.-\`  '\`.-  .  -\`OHRgHQBM\`.!MMMOMMOOOMtkQQHBBRHc\`  \` 8WBQHBWB? '.4WQWRQWH< \`.'' -.\`\` -'- .\`' '. '\`-\`--\`
    ' \`'--- \`  .. ' -\`'\`@ggQgHBM..<HRWBgHWHBHjXWRQRWWRi\`- -'qBRgHHRBv.  VWRHWQBB>\`\`.  ' .\`' -'- '-\`.--.'\`- -.-
  ... -\`'\` '  '.' ' .' .MHBQgRg@ '+HQWHQQRWgWzaBWgRQgR[ \`. -OgHBgBgHr  'aWBBgBgQ>  -\`'  .-\`  -' \` .'\`- .--  - 
  \`.\`.'' '  \`.\` --'  .  $RRgBQHW*.'+<TWBgHHHR?vQgBWRRgk..-\`;WHWHBWRO  .\`#WQRgBQg>'  \`'\` - .\`\` \`    '-.' \`\`..\`'
  - .   - \` .\`--.  ' '\`-rQHBQWWBw! \`<pBQgRRHO' 9HBHRgHHs!'"dBBBgQBRv'-- agQRQQWH<- \`'-'. ..' '\`''\` \`.  .\` \`- '
   -''-' '- -'...\`.\` \`' .1QWQgRBWNwURgBHQBWRi .+OWQQWWWRWDBQHWBRgWj\`\`\`'-4WQWQHWR+.-.-'\`.-  .\`  \`'\` - \`-  .'. .
  '\`\`  -'. '.. ..   \`.-   }@BgQWQWRQBBWBBB&c '.-<6BWgggQRgBQWggH@1'\`''\`\`3RgBgWWH+ ' --    \`'.''-'  .-'-   '. .
  \` -\` .-   \`  -.'\`. '.    _yMRHgQQBWHWQ@2<   \`. 'i6HBRBHQBWBWMz~\`..  '.IBRHRggQ<  .'-      ' .\`-  ' \` .  '.--
   .---' . .'.\`  -  '.--\`  '  ;]ze433FY(,.\`' ''.' - _ifJ#e4ncr'. '.-' \`'(L]cx{7x^\` .'  ..'  '\`'  .  '\`' -- -  
  .- \`'  .-' .'\`  \`'- -\`.- -*##eV4V#>~ee43V3#a#IeVaVi . ieeVI3I43e*.\`-\`u43e#VIa42\` '' .-' '-'. \`  \`-'  \`'\`'.\` 
  . .\`-'--'\`\` ''-  \`.\` '  .'EWQHQRgo.,WHHgQgRBQBQBWBs\`  5HQRRQHWRQJ   ;HBWgQBWBWR+    \` ''\`-' \` .  ...     --.
  \`....   ' '\`'\`\`.   . - - /BgBRBH8~ ,WWgWQgBHQRRWBQz.--@HHWBHRRHHO  \`uHHWBRBHQHWv\`\`- .-.'  . ..\`\`''\`  '. '-- 
   - .-\`\` -    .  .''- .-  hgRBRB@;\`':RQBQRRW@$kk$kXi'-*ggRHWRRgRQB?'.OHWQQRRBRRQf- . -'.'-  -''\`- -  . \`' \`  
  ''-  -'   \`\`..'''\`'-.\` -iQRWQBQ7\`  !gBWggQH$ \`- -  - YgBHHRRWBHHWC\`vBBBWgRgHgBHZ- ..'\`\` \` -\` \`. ''  \`\`    .'
  -.'\` \` \`'-.\` ..\`.\`'..-  EBgHBW$' -\`:gQBRQgRA<>+><!\`\`.kWQHggBgWRBQM.$WWQQQQggHgBM\`-....\`  . -\`  \`  .\`\`-.\` -'.
  .'.\` .. \`  \` ' --- \` -\`vHgHBBO~\`\`' :HQQQBHWHRgWRB8'--NRgWHHg$gBHWR\@BRBRXWggWBRB_ \`'.'-\` \`'.' -'\`\` \`'\`.-  '-
  - '-\`--..\`.. \` ''   ..\`"vivii>-'.  _WWBQQHWRBWHQRU\`';HBRRRWRvgHQBB9BQBBWvRQHHggg)..'..- \`\`-\`.'\` - -  \`.''..'
    '--\`\`.' .''\` \`- .\` '-\`'\`\`.  .'.  !RgRRHgRRRBHWWd.'{QRWRgB&'OgBHQBgHQWM DRRQHRgY-'   '- - \`.'\`\`.  .-. \`'-- 
  . .  '.. \`-\` \`  .\`\`   -  - \`.\` ' '-!RgWQgRHh>+<++>'\`eHBHgQWD jHBggHgBQHf'MRBgBRQV\`  ---''  .  -  - ..  .--  
  \`. -\`-.- \`--'. -'\`  .'   '-  \`'-- -:WWggHQBX\`    -\`'OHRWgWRd-?HRgQgBQBB+.kgRWHWHO\`.'  . \`-\`\`    \`-'. '.\` .  
  \`- -'\`   . ..\`   -.- '''  .. '. .\` ^gHgHWWBO###eIai>QHRBBRgk  ORWQRgWHE\` agWQHRWg~ \` '. \` ' \` '- -\`. \`-\`\`   
  - - - .\`'   -.' .\`'\`    - .- \`\`\`.  !HHBBBWgBBBRWRgy[RgWQgBRI'\`CHQBBQRg7\`'nWHWBRBQ\-  -\`' '..\`\`'\`-  .-'.. '  
  '-'.-\`\`-- .   ..- '..- \`. --  \`  -\`,BQgBgBBQWBRRBgtJgHBRRHRt .|RgWggQN^\`.yRWWHBQB1.-- \`-   '' - ''\`'-  .\`'  
      ..   \`  '-'\`.- -'' '''\` - -\`.'\`^GmdUGmUpGbb0K07jG8mU08Ki..-AdmKqmf-\` ]0KqpqUG1. '.-' '--    -\`-''.\`\`-\`  
  \`\`  ''\`--\` \`.-''\` '.- -   '\` '. ''-.-'-'.\`--\` -\`.- \`  . .-.\` -.-'.. . '  ..'-.\`.' . --\` -\`.'. \`  \` \`-  '\`..-
  \`.\`\`'''' - \`'\`-.-..' .-\`\`  '-. '\`' - - '.''-'' \`.-  .'\`'-     \`'-\`\`\`'.-.'--- .'. '.'\`. - - \`- '-' ' -.  --\` 
   -'. .-\`'    \`'\`'\`-   \`-   ' \` - .-'--   ...  .\`\`- .-.'..  --. . \`.-  '\`\`..'.  -\`\`\`'-  .\`'  .-'\`\`'\`.-. .\`  -
  `);
};
