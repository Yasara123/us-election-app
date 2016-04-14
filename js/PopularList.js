var ColEle = function() {
    var xxx = $(".cTwitterCard-body p");
    xxx.each(function() {
        $(this).html($(this).text().replace(/(@|#)\w+/g, '<span class="blue">$&</span>'));
    });
};
var NumFor = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var ajaxLatest = function() {
    $.ajax({
        url: "js/jaggery-scripts/LatestTweetserver.jag",
        dataType: "json",
        type: "POST",
        success: function(data) {
            var table = $("#nt-latest");
            table.html(data);
            ColEle();

        },
        error: function(e) {
            console.log("Error" + e);
        }
    });
};
var ajaxCountR = function() {
    $.ajax({
        url: "js/jaggery-scripts/topCountNew2.jag",
        dataType: "json",
        type: "POST",
        success: function(data) {
            var table = $("#div2");
            table.html(NumFor(data));
        },
        error: function(e) {
            console.log("Error" + e);
        }
    });
};


var ajaxCountD = function() {
    $.ajax({
        url: "js/jaggery-scripts/topCountNew.jag",
        dataType: "json",
        type: "POST",
        success: function(data) {
            var table = $("#div1");
            table.html(NumFor(data));
        },
        error: function(e) {
            console.log("Error" + e);
        }
    });
};


var ajaxPopularLink = function() {
    $.ajax({
        url: "js/jaggery-scripts/PopularLinkServer.jag",
        dataType: "json",
        type: "POST",
        success: function(data) {
            var table = $("#nt-popularLink");
            table.html(data);
        },
        error: function(e) {
            console.log("Error" + e);
        }
    });
};
var ModNews = function() {
    alert('sss');
    jQuery(function($) {
        $("#nt-news").newsTicker();
    });
};
var ajaxNews = function() {
    $.ajax({
        url: "js/jaggery-scripts/NewsServer.jag",
        dataType: "json",
        type: "POST",
        success: function(data) {
            var table = $("#nt-example1");
            table.html(data);
        },
        error: function(er) {
            console.log("Error From News" + er);
        }
    });
};



var ajaxPopular = function(ChooseName) {
    var Candidat = {
        Choose: ChooseName
    };
    $.ajax({
        url: "js/jaggery-scripts/PopularServer.jag",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(Candidat),
        type: "POST",
        success: function(data) {
            var table = $("#nt-popular");
            table.html(data);
        },
        error: function(er) {
            console.log("Error Popular Tweet" + er);
        }
    });
};

var PopularElection = function(ChooseName) {
    var Candidat = {
        Choose: ChooseName
    };
    $.ajax({
        url: "js/jaggery-scripts/PopularElectionServer.jag",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(Candidat),
        type: "POST",
        success: function(data) {
            var table = $("#nt-popularElection");
            table.html(data); 
        },
        error: function(er) {
            alert("Error Popular Tweet" + er);
        }
    });
};

var ajaxGarphSentiment = function(ur, TopName, secondName, ChooseName) {
    var Candidates = {
        Choose: "BERNIE",
        Top: "TRUMP",
        Second: "CLINTON"
    };
    var wit = $("#graph2").width();
    var hight = $("#graph2").height();
    var dateCount = 20;
    $.ajax({
        url: "js/jaggery-scripts/DateCount.jag",
        dataType: "json",
        type: "POST",
        success: function(data) {
            dateCount = data;
        },
        error: function(er) {
            console.log("Error Graph GetDate" + er);
        }
    });


    $.ajax({
        url: ur,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(Candidates),
        type: "POST",
        success: function(data, k) {
            function convertData(data) {
                var Fdata = new Array();
                for (var i = 0; i < data.length; i++) {
                    var tem = new Array();
                    var d = new Date(data[i].Date + " 00:00:00");
                    tem.push(d.getTime());
                    tem.push(data[i].Candidate);
                    tem.push(data[i].Rate);
                    tem.push(data[i].News1);
                    tem.push(data[i].News2);
                    tem.push(data[i].News3);
                    Fdata.push(tem);
                }

                return Fdata;
            }
            var data = [{
                "metadata": {
                    "names": ["Date", "Candidate", "Rate", "News1", "News2", "News3"],
                    "types": ["time", "ordinal", "linear", "ordinal", "ordinal", "ordinal"]
                },
                "data": convertData(data, Number(dateCount))
            }];
            var config = {
                x: "Date",
                charts: [{
                    axesColor: "#FFFFFF",
                    titleFontColor: "#FFFFFF",
                    legendTitleColor: "#FFFFFF",
                    legendTextColor: "#FFFFFF",
                    type: "line",
                    padding: {
                        "top": 10,
                        "left": 50,
                        "bottom": 100,
                        "right": 100
                    },
                    xAxisAngle: true,
                    y: "Rate",
                    color: "Candidate",
                    colorDomain: ["TRUMP", "CLINTON", "BERNIE", "CRUZ"],
                    colorScale: ["#fa574b", "#3ec2ee", "#1c40fb", "#e51000"],
                    tooltip: {
                        "enabled": true,
                        "color": "#e5f2ff",
                        "type": "symbol",
                        "content": ["News1", "News2", "News3"],
                        "label": true
                    }
                }],
                width: wit * 0.95,
                height: hight * 0.95,
                xFormat: "%m/%d/%Y",
                xTicks: (Number(dateCount) / 3) * 2

            }
            var lineChart = new vizg(data, config);
            lineChart.draw("#graph2");

        }

    });

};
