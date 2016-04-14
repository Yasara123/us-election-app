function updatePersonText(new_text, stopWords, cloudDiv, color) {
    var cloudDivID = "#" + cloudDiv;
    var width = $(cloudDivID).width();
    var height = $(cloudDivID).height();
    var colorset = [color, "#A19A9A", "#000000"];
    var text = {
        "width": width,
        "height": height,
        "padding": {
            "top": 0,
            "bottom": 0,
            "left": 0,
            "right": 0
        },

        "data": [{
            "name": "table",
            "values": [new_text],

            "transform": [{
                "type": "countpattern",
                "field": "data",
                "case": "upper",
                "pattern": "[\\w']{3,}",
                "stopwords": stopWords
            }, {
                "type": "formula",
                "field": "angle",
                "expr": "[-45, 0, 45][~~(random() * 3)]"
            }, {
                "type": "formula",
                "field": "weight",
                "expr": "if(datum.text=='VEGA', 600, 300)"
            }, {
                "type": "wordcloud",
                "size": [width, height],
                "text": {
                    "field": "text"
                },
                "rotate": {
                    "field": "angle"
                },
                "font": {
                    "value": "Verdana"
                },
                "fontSize": {
                    "field": "count"
                },
                "fontWeight": {
                    "field": "weight"
                },
                "fontScale": [20, 60]
            }]
        }],

        "scales": [{
            "name": "color",
            "type": "ordinal",
            "range": colorset
        }],

        "marks": [{
            "type": "text",
            "from": {
                "data": "table"
            },
            "properties": {
                "enter": {
                    "x": {
                        "field": "layout_x"
                    },
                    "y": {
                        "field": "layout_y"
                    },
                    "angle": {
                        "field": "layout_rotate"
                    },
                    "font": {
                        "field": "layout_font"
                    },
                    "fontSize": {
                        "field": "layout_fontSize"
                    },
                    "fontStyle": {
                        "field": "layout_fontStyle"
                    },
                    "fontWeight": {
                        "field": "layout_fontWeight"
                    },
                    "text": {
                        "field": "text"
                    },
                    "align": {
                        "value": "center"
                    },
                    "baseline": {
                        "value": "alphabetic"
                    },
                    "fill": {
                        "scale": "color",
                        "field": "text"
                    }
                },
                "update": {
                    "fillOpacity": {
                        "value": 1
                    }
                },
                "hover": {
                    "fillOpacity": {
                        "value": 0.5
                    }
                }
            }
        }]

    };


    return text;

};

function getPersonDataCloud(cloudDiv, Pname, color) {
    var cloudDivID = "#" + cloudDiv;
    var newTestString = " ";
    var Candidates = {
        Choose: Pname
    };
    $.ajax({
        url: "js/jaggery-scripts/candidateCloud.jag",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(Candidates),
        type: "POST",
        success: function(data) {
            var TextData = JSON.stringify(data);
            var res = TextData.split(";");
            var longstr = "";

            for (var i = 1; i < res.length - 1; i++) {
                var row = res[i].split(",");
                var word = row[0].split(":");
                var count = row[1].split(":");
                if (!(word[1] == ' nul')) {
                    for (var j = 0; j < count[1]; j++) {
                        longstr += word[1] + " ";

                    }
                }

            }
            new_cloud = updatePersonText(longstr, stopWords, cloudDiv, color);
            var viewUpdateFunction = (function(chart) {
                this.view = chart({
                    el: cloudDivID
                }).update();
            }).bind(this);
            vg.parse.spec(new_cloud, viewUpdateFunction);
        }

    });



};
