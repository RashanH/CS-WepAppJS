var Payload;
var Jsn;
var IDList = [];
var i = 0;
var id = 0;

var Pname = document.querySelector("#pname");
var cslvl = document.querySelector("#cslvl");
var img = document.querySelector("#img");

var requestOptions = { //set request oprions for fetcher
    method: 'GET',
    redirect: 'follow'
};

function fetcher() { //this one will get the JSON data
    fetch("https://api.splashthat.com/events/457584143/guestlist?page=1&limit=1&status%5B%5D=checkin_yes&sort=groupContact.id+ASC&viewGroups%5B%5D=contactTags&viewGroups%5B%5D=contactLists&viewGroups%5B%5D=bounceInfo&viewGroups%5B%5D=groupContactAnswer&viewGroups%5B%5D=groupContactEventList&viewGroups%5B%5D=contactList&access_token=ZDRmM2ZlMTc4NWM0ZDg3NDE0ZTlhYmVlNTM1NDQ3MTkxYzIwN2I0MzU0OTFmMWY4OWU3MDg1OTNhMzFmOGMwNw", requestOptions)
        .then(response => response.text())
        .then(result => Payload = result)
        .then(result => Jsn = JSON.parse(Payload))
        .catch(error => console.log('Error: ', error));

}




function DataOps() { //this is the one who fills data.
    console.log(Jsn.data.guests[0].contact.id);
    for (let index = 0; index < 5; index++) {
        var idcheck = Jsn.data.guests[0].answers[index].question_id;
        if (idcheck == '1039306') {
            lvl = Jsn.data.guests[0].answers[index].answer;
            console.log(lvl);
            cslvl.innerHTML = 'Crowdsource Level : ' + lvl;
        } else {
            cslvl.innerHTML = ' ';
        };
    };
    id = Jsn.data.guests[0].id;
    Fname = Jsn.data.guests[0].contact.first_name;
    Lname = Jsn.data.guests[0].contact.last_name;
    img.src = './assets/propics/' + id + '.jpg';
    Pname.innerHTML = Fname + ' ' + Lname;
    console.log(Fname);
    console.log(Lname);
    console.log('Splashthat ID: ' + id);
}

function totalLoop() { //main loop functions recursive
    //
    //NOTE : DO NOT BREAK THE TIME SYNC OR THIS WILL GO NUTS
    //

    //T-0
    console.log(IDList);
    fetcher();

    setTimeout(function() { //Runs At T+12 Sec
        DataOps();
    }, 12 * 1000);

    setTimeout(function() { //Runs At T+1 Sec
        i++;

        console.log(i + ' : Profile');
        if (IDList.includes(id)) { //checks for ID
            $('#div1').slideUp(0);
            $('#div2').addClass('animX');
        } else {
            $('#div1').slideDown(0);
            $('#div1').addClass('animX');
        };
        $('#div2').removeClass('animX');
    }, 1 * 1000);

    setTimeout(function() { //Runs At T+11 Sec
        i++;
        console.log(i + ' : Splash');
        $('#div1').slideUp(1);
        $('#div2').addClass('animX');
    }, 11 * 1000);

    setTimeout(function() { //Runs At T+21 Sec
        i++;
        console.log(i + ' : Profile');
        if (IDList.includes(id)) { //checks for id
            $('#div1').slideUp(0);
            $('#div2').addClass('animX');
        } else {
            $('#div1').slideDown(0);
            $('#div1').addClass('animX');
        };
        if (!IDList.includes(id)) {
            IDList.push(id);
        };
        $('#div2').removeClass('animX');
    }, 24 * 1000);

    setTimeout(function() { //Runs At T+25 Sec
        console.log(IDList);
        if (IDList.includes(id)) {
            console.log('ID is Here!');
        }
        totalLoop();
    }, 25 * 1000)

    //T+25 Sec
}



totalLoop();