#!/bin/bash

BLUE=$'\e[0;34m'
GREEN=$'\e[1;32m'
YELLOW=$'\e[1;33m'
NC=$'\e[0m'

URL=""
URLCONFIRMED="n"

REQLOG="y"

SANDBOX="test"

SSCHDULE="n"
STIMECONFRIMED="n"
STIME="10:00"

SIZECONFIRMED="n"
SIZE=0

function configureEnviornment() {
    showHttpLog
    getUrl
    getTaskType

    echo
    echo -e "\t${GREEN} preparing for a $SANDBOX run${NC}"

    scheduling
    getSize
    getOverview
}

function showHttpLog() {
    CONFIRMLOGGING="n"
    
    echo "${BLUE}Enable Http logging${NC}"
    echo
    echo "Enabling this will print out all the request made on the fly by nike. If your ok with small progress msgs enter \"n\" for no."
    echo
    read -p "Would you like to see the http GET/POST request as they are made? y/n: " REQLOG
    read -p "Are you sure? y/n: " CONFIRMLOGGING

    while [ "$CONFIRMLOGGING" == 'n' ]
    do
        echo
        showHttpLog
    done
}

function getUrl() {
    echo
    echo "${BLUE}Enter a SNKRS url${NC}"
    echo
    read -p "Enter the sneaker url: " URL
    read -p "You entered \"$URL\" is this correct? y/n: " URLCONFIRMED

    while [ "$URLCONFIRMED" == 'n' ]
    do
        getUrl
    done
}

function getTaskType() {
    echo
    echo "${BLUE}TYPE OF TASK TO RUN${NC}"
    echo
    read -p "Enter (1) test run | (2) real run: " SANDBOX

    if [ "$SANDBOX" == "1" ]
        then SANDBOX="test"
    else
        SANDBOX="real"
    fi
}

function scheduling() {
    echo
    echo "${BLUE}SCHEDULE A TIME${NC}"
    echo
    echo "This will reserve a time for when you want the task to start."
    echo "For testing purposes you can set it from anything > 1min. On a realrun we suggest you give it 5-10min before release."
    echo
    echo "${YELLOW}To enter a time use the following format =>  10:00 or 12:15 or 3:00 or 2:30${NC}"
    echo
    read -p "Would you like to create a time reservation? y/n: " SSCHDULE

    if [ "$SSCHDULE" == "y" ]
        then createSchedule
    fi
}

function createSchedule() {
    echo
    echo "${YELLOW}Reminder, use only the following format => 10:00 or 12:15 or 3:00 or 2:30${NC}"
    echo
    read -p "Enter the time: " STIME
    read -p "You entered \"$STIME\" is this correct? y/n: " STIMECONFRIMED

    while [ "$STIMECONFRIMED" == 'n' ]
    do
        createSchedule
    done

    echo
    echo -e "\t${GREEN}$SANDBOX run is scheduled for $STIME ${NC}"
}

function getSize() {
    echo
    echo "${BLUE}SET SNEAKER SIZE IN MEN${NC}"
    echo
    read -p "Enter sneaker size i.e. \"8\" or \"8.5\" not including the quotations: " SIZE
    read -p "You entered \"$SIZE\" is this correct? y/n: " SIZECONFIRMED

    while [ "$SIZECONFIRMED" == 'n' ]
    do
        getSize
    done
}

function getOverview() {
    echo
    echo "${BLUE}Confirm the following if something is wrong enter n to restart the process.${NC}"
    echo
    echo -e "\t1.  SNKR url: ${GREEN}$URL${NC}"
    echo
    echo -e "\t2.  Type of task: ${GREEN}$SANDBOX${NC}"
    echo
    if [ "$SSCHDULE" == 'y' ]
        then echo -e "\t3.  Scheduled Run: ${GREEN}$STIME AM${NC}"
    else 
        echo -e "\t3.  Scheduled Run: ${GREEN}Immediate${NC}"
    fi

    echo
    echo -e "\t4.  Sneaker size: ${GREEN}$SIZE${NC}"
    echo

    NEEDCORRECTION="f"

    read -p "Does everything look ok? y/n: " NEEDCORRECTION

    if [ "$NEEDCORRECTION" == 'y' ]
        then runscript
    else 
        checkForWantedChanges
    fi
}

function checkForWantedChanges() {
    VALUES=""
    echo
    echo "${YELLOW}If you need to change more than one value use a space to seperate them.${NC}"
    echo
    read -p "Enter number of the values you want to change: " VALUES
    echo

    for VALUE in $VALUES
        do
            case "$VALUE" in
                [1])
                getUrl
                ;;
                [2])
                getTaskType
                ;;
                [3])
                scheduling
                ;;
                [4])
                getSize
                ;;
                *)
                echo "Invalid entry, Please try again"
                getOverview
                ;;
            esac
    done

    getOverview
}

function runscript() {
    URL=${URL} REQLOG=${REQLOG} SANDBOX=${SANDBOX} SCHEDULED=${SSCHDULE} TIME=${STIME} SIZE=${SIZE} npm start
}

# -------------------------------------
# below is the main start of the script
# -------------------------------------

cat << "EOF"



 _/\_        (           )  (               )  (          )      )    (     (    (         _/\_ 
 >  <        )\ )     ( /(  )\ )   (     ( /(  )\ )    ( /(   ( /(    )\ )  )\ ) )\ )      >  < 
  \/     (  (()/(     )\())(()/(   )\    )\())(()/(    )\())  )\())  (()/( (()/((()/( (     \/  
         )\  /(_))  |((_)\  /(_))(((_) |((_)\  /(_))  ((_)\  ((_)\    /(_)) /(_))/(_)))\        
        ((_)(_))    |_ ((_)(_))  )\___ |_ ((_)(_))      ((_)  _((_)  (_))_|(_)) (_)) ((_)       
       _ | || |     | |/ / |_ _|((/ __|| |/ / / __|    / _ \ | \| |  | |_  |_ _|| _ \| __|      
      | || || |__     ' <   | |  | (__   ' <  \__ \   | (_) || .` |  | __|  | | |   /| _|       
       \__/ |____|   _|\_\ |___|  \___| _|\_\ |___/    \___/ |_|\_|  |_|   |___||_|_\|___|                                                                                               
                                                                         by Jochy 2020 ©                  


EOF

echo -e "\t\t\t\tWelcome to Kicks of Fire"
echo -e "\t\t\tComplete the questions below to begin a task."
echo

configureEnviornment