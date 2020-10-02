import React, { useState } from 'react'
import './SidePanel.css';
import PresetList from './PresetList'
import CustomRouteMaker from './CustomRouteMaker'
import { Add,Search,ArrowBack }  from '@material-ui/icons';
import { Button } from '@material-ui/core';

function getRouteJsonUrl(startLocation, endLocation) {
    // startLocation [lng, lat]
    // endLocation [lng, lat]
    const url = new URL('https://api.openrouteservice.org/v2/directions/cycling-regular');

    const params = {
        api_key: '5b3ce3597851110001cf62484de2cf33999b4e06a16c3242e98d4443',
        start:  startLocation, //userMarker.position.lng() + ',' + userMarker.position.lat(),
        end: endLocation
      };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
}

export default function SidePanel(props) {
    const [chosenRoute, setChosenRoute] = props.handlers
    const [startLocation, setStartLocation] = props.startLocation
    const [endLocation, setEndLocation] = props.endLocation
    const [presetList, setPresetList] = useState([{name:'NTU - Jurong Point',
                                                      id: 1,
                                                      area: 'somewhere',
                                                      startLocation: {lat: 1.3515884060989078, lng: 103.68053888918688},
                                                      endLocation: {lat: 1.3399830076139192, lng: 103.70708202959825},
                                                      calories: 400,
                                                      distance: 5320,
                                                      json:{"type":"FeatureCollection","features":[{"bbox":[103.67976,1.339579,103.707718,1.35209],"type":"Feature","properties":{"segments":[{"distance":4825.8,"duration":1013.7,"steps":[{"distance":89.7,"duration":23.1,"type":11,"instruction":"Head east","name":"-","way_points":[0,10]},{"distance":156.9,"duration":31.4,"type":0,"instruction":"Turn left onto Nanyang Crescent","name":"Nanyang Crescent","way_points":[10,13]},{"distance":338,"duration":67.6,"type":0,"instruction":"Turn left onto Nanyang Walk","name":"Nanyang Walk","way_points":[13,24]},{"distance":380,"duration":76,"type":7,"instruction":"Enter the roundabout and take the 1st exit onto Nanyang Drive","name":"Nanyang Drive","exit_number":1,"way_points":[24,42]},{"distance":54.1,"duration":10.8,"type":7,"instruction":"Enter the roundabout and take the 2nd exit onto Lien Ying Chow Drive","name":"Lien Ying Chow Drive","exit_number":2,"way_points":[42,52]},{"distance":636.2,"duration":127.2,"type":4,"instruction":"Turn slight left onto Lien Ying Chow Drive","name":"Lien Ying Chow Drive","way_points":[52,79]},{"distance":42.2,"duration":8.4,"type":0,"instruction":"Turn left","name":"-","way_points":[79,83]},{"distance":244.2,"duration":48.8,"type":4,"instruction":"Turn slight left onto Nanyang Crescent","name":"Nanyang Crescent","way_points":[83,92]},{"distance":346.6,"duration":69.3,"type":1,"instruction":"Turn right","name":"-","way_points":[92,109]},{"distance":35.3,"duration":21.2,"type":0,"instruction":"Turn left","name":"-","way_points":[109,110]},{"distance":22.6,"duration":23.1,"type":1,"instruction":"Turn right","name":"-","way_points":[110,112]},{"distance":7.9,"duration":4.7,"type":1,"instruction":"Turn right","name":"-","way_points":[112,113]},{"distance":286,"duration":57.2,"type":0,"instruction":"Turn left onto Pioneer Road North","name":"Pioneer Road North","way_points":[113,121]},{"distance":33.4,"duration":6.7,"type":6,"instruction":"Continue straight onto Pioneer Road North","name":"Pioneer Road North","way_points":[121,124]},{"distance":236.3,"duration":47.3,"type":0,"instruction":"Turn left onto Jurong West Avenue 5","name":"Jurong West Avenue 5","way_points":[124,130]},{"distance":220,"duration":44,"type":1,"instruction":"Turn right onto Jurong West Street 71","name":"Jurong West Street 71","way_points":[130,136]},{"distance":295.6,"duration":59.1,"type":13,"instruction":"Keep right onto Jurong West Street 71","name":"Jurong West Street 71","way_points":[136,151]},{"distance":629,"duration":125.8,"type":0,"instruction":"Turn left onto Jurong West Street 62","name":"Jurong West Street 62","way_points":[151,165]},{"distance":44.8,"duration":9,"type":6,"instruction":"Continue straight onto Jurong West Street 62","name":"Jurong West Street 62","way_points":[165,169]},{"distance":84.4,"duration":16.9,"type":1,"instruction":"Turn right onto Jurong West Street 64","name":"Jurong West Street 64","way_points":[169,174]},{"distance":377.3,"duration":75.4,"type":12,"instruction":"Keep left","name":"-","way_points":[174,189]},{"distance":164,"duration":32.8,"type":1,"instruction":"Turn right onto Jurong West Central 2","name":"Jurong West Central 2","way_points":[189,199]},{"distance":82.5,"duration":16.5,"type":6,"instruction":"Continue straight onto Jurong West Central 2","name":"Jurong West Central 2","way_points":[199,204]},{"distance":18.8,"duration":11.3,"type":0,"instruction":"Turn left","name":"-","way_points":[204,205]},{"distance":0,"duration":0,"type":10,"instruction":"Arrive at your destination, on the left","name":"-","way_points":[205,205]}]}],"summary":{"distance":4825.8,"duration":1013.7},"way_points":[0,205]},"geometry":{"coordinates":[[103.680548,1.351588],[103.680607,1.351572],[103.680663,1.351578],[103.680763,1.351623],[103.680842,1.351727],[103.680886,1.351826],[103.680878,1.351894],[103.68085,1.351949],[103.680767,1.352024],[103.680731,1.352056],[103.680694,1.35209],[103.680375,1.351729],[103.680095,1.351421],[103.67976,1.351032],[103.680425,1.350586],[103.680743,1.350273],[103.680939,1.350025],[103.681067,1.349867],[103.681092,1.349837],[103.681254,1.349618],[103.681548,1.349308],[103.681767,1.349127],[103.681809,1.34909],[103.681856,1.349057],[103.681927,1.348939],[103.681947,1.348943],[103.681987,1.348939],[103.682006,1.348929],[103.682187,1.349025],[103.682287,1.349079],[103.682328,1.349084],[103.682498,1.349171],[103.682641,1.349254],[103.682884,1.349395],[103.68328,1.349625],[103.683865,1.349948],[103.684246,1.350004],[103.684386,1.349977],[103.684501,1.349925],[103.684693,1.349844],[103.684813,1.349804],[103.684868,1.349791],[103.685011,1.349703],[103.685046,1.349702],[103.685079,1.34969],[103.685105,1.34967],[103.685122,1.349642],[103.68513,1.34961],[103.685128,1.349582],[103.685118,1.349556],[103.685171,1.349445],[103.685196,1.349379],[103.685206,1.349311],[103.685225,1.349284],[103.685278,1.349206],[103.685416,1.349058],[103.685496,1.348988],[103.685777,1.348878],[103.685894,1.348844],[103.685995,1.348805],[103.686239,1.348741],[103.686397,1.348635],[103.686501,1.348489],[103.686567,1.34832],[103.686573,1.348265],[103.686585,1.348109],[103.686572,1.347908],[103.686555,1.347523],[103.686551,1.347378],[103.686556,1.34719],[103.686607,1.346976],[103.686675,1.346866],[103.686765,1.346767],[103.686971,1.346598],[103.687443,1.346181],[103.687744,1.345825],[103.687863,1.345684],[103.688084,1.345376],[103.688154,1.345266],[103.688282,1.345017],[103.688375,1.34501],[103.688489,1.344989],[103.688529,1.344995],[103.68865,1.345042],[103.688936,1.345313],[103.689168,1.345537],[103.689436,1.345774],[103.689483,1.345817],[103.68966,1.346023],[103.689734,1.346172],[103.689759,1.346247],[103.689766,1.346513],[103.689764,1.346789],[103.689937,1.346864],[103.689977,1.346873],[103.690057,1.346855],[103.69013,1.34678],[103.690187,1.346582],[103.690194,1.346379],[103.690286,1.346316],[103.690318,1.346277],[103.690409,1.34609],[103.690527,1.345741],[103.690535,1.345644],[103.690509,1.345526],[103.690516,1.3455],[103.69059,1.345461],[103.690646,1.345412],[103.690725,1.345249],[103.691212,1.344419],[103.69147,1.344606],[103.691512,1.344547],[103.691581,1.344436],[103.691523,1.344395],[103.691539,1.344369],[103.69173,1.344138],[103.692505,1.343174],[103.692542,1.343125],[103.692609,1.34305],[103.692692,1.342946],[103.692968,1.342602],[103.693136,1.342392],[103.693201,1.34231],[103.693278,1.342212],[103.693324,1.342157],[103.693566,1.342356],[103.694295,1.342906],[103.694402,1.342995],[103.694768,1.343296],[103.694912,1.343414],[103.694992,1.343473],[103.695055,1.343394],[103.695149,1.343275],[103.695475,1.342865],[103.695835,1.342423],[103.696111,1.342064],[103.696228,1.341928],[103.696376,1.341789],[103.69639,1.341775],[103.696399,1.341767],[103.69644,1.341729],[103.696518,1.341644],[103.696563,1.341605],[103.696589,1.341582],[103.696756,1.341438],[103.696925,1.341279],[103.697288,1.340899],[103.697653,1.340514],[103.697811,1.340291],[103.697912,1.340134],[103.69795,1.340057],[103.697996,1.339964],[103.698108,1.339999],[103.698124,1.340002],[103.698235,1.340024],[103.698423,1.340069],[103.698892,1.340156],[103.699913,1.340347],[103.700258,1.340404],[103.700889,1.340517],[103.700945,1.340526],[103.700977,1.340531],[103.702157,1.340747],[103.703062,1.340934],[103.703263,1.340975],[103.70355,1.341039],[103.703769,1.341084],[103.703814,1.341094],[103.703844,1.3411],[103.703945,1.341116],[103.703955,1.341016],[103.703961,1.340957],[103.703977,1.340801],[103.704016,1.340494],[103.704034,1.340363],[103.704112,1.340158],[103.704141,1.340086],[103.704228,1.340005],[103.704287,1.339979],[103.704394,1.339952],[103.704643,1.340038],[103.704758,1.340083],[103.704832,1.34011],[103.705438,1.340341],[103.705525,1.340373],[103.705916,1.340521],[103.706019,1.34056],[103.706792,1.340843],[103.706916,1.340888],[103.707021,1.34093],[103.707051,1.340846],[103.707069,1.340796],[103.707112,1.340679],[103.707191,1.340466],[103.707204,1.340434],[103.707309,1.34021],[103.707413,1.340013],[103.707498,1.33989],[103.707633,1.339744],[103.707718,1.339649],[103.70764,1.339579],[103.707554,1.339674],[103.707409,1.339834],[103.707335,1.33996],[103.707264,1.340089],[103.707108,1.340024]],"type":"LineString"}}],"bbox":[103.67976,1.339579,103.707718,1.35209],"metadata":{"attribution":"openrouteservice.org | OpenStreetMap contributors","service":"routing","timestamp":1601645967779,"query":{"coordinates":[[103.6805343,1.3515333],[103.7067297,1.3397443]],"profile":"cycling-regular","format":"json"},"engine":{"version":"6.3.0","build_date":"2020-09-21T01:00:26Z","graph_date":"1970-01-01T00:00:00Z"}}}
                                                    }, 
                                                     {name: 'Bukit Batok - Beauty World',
                                                      id: 2,
                                                      area: 'somewhere2',
                                                      startLocation: {lat: 1.3492831109322838, lng: 103.74969300608637},
                                                      endLocation: {lat: 1.343355271129999, lng: 103.77513256839377},
                                                      calories: 700,
                                                      distance: 1230,
                                                      json:{"type":"FeatureCollection","features":[{"bbox":[103.749028,1.342947,103.775316,1.349737],"type":"Feature","properties":{"segments":[{"distance":4057.1,"duration":966.5,"steps":[{"distance":103,"duration":61.8,"type":11,"instruction":"Head southwest","name":"-","way_points":[0,2]},{"distance":177.8,"duration":35.6,"type":0,"instruction":"Turn left onto Bukit Batok Central","name":"Bukit Batok Central","way_points":[2,8]},{"distance":770.6,"duration":154.1,"type":1,"instruction":"Turn right onto Bukit Batok Street 21","name":"Bukit Batok Street 21","way_points":[8,40]},{"distance":590.4,"duration":118.1,"type":6,"instruction":"Continue straight onto Bukit Batok Street 21","name":"Bukit Batok Street 21","way_points":[40,56]},{"distance":47.9,"duration":9.6,"type":6,"instruction":"Continue straight onto Bukit Batok East Avenue 4","name":"Bukit Batok East Avenue 4","way_points":[56,58]},{"distance":233.5,"duration":46.7,"type":1,"instruction":"Turn right onto Bukit Batok East Avenue 2","name":"Bukit Batok East Avenue 2","way_points":[58,65]},{"distance":117.2,"duration":70.3,"type":0,"instruction":"Turn left","name":"-","way_points":[65,70]},{"distance":1490.8,"duration":298.2,"type":0,"instruction":"Turn left onto Bukit Timah Park Connector","name":"Bukit Timah Park Connector","way_points":[70,111]},{"distance":7.3,"duration":4.4,"type":1,"instruction":"Turn right","name":"-","way_points":[111,112]},{"distance":50,"duration":30,"type":0,"instruction":"Turn left","name":"-","way_points":[112,114]},{"distance":29.8,"duration":17.9,"type":0,"instruction":"Turn left","name":"-","way_points":[114,116]},{"distance":49.9,"duration":12.8,"type":1,"instruction":"Turn right","name":"-","way_points":[116,123]},{"distance":73.3,"duration":44,"type":1,"instruction":"Turn right","name":"-","way_points":[123,126]},{"distance":315.8,"duration":63.2,"type":1,"instruction":"Turn right onto Cheong Chin Nam Road","name":"Cheong Chin Nam Road","way_points":[126,138]},{"distance":0,"duration":0,"type":10,"instruction":"Arrive at Cheong Chin Nam Road, on the right","name":"-","way_points":[138,138]}]}],"summary":{"distance":4057.1,"duration":966.5},"way_points":[0,138]},"geometry":{"coordinates":[[103.749593,1.34906],[103.74959,1.349057],[103.749028,1.34835],[103.749329,1.348162],[103.749572,1.34805],[103.749816,1.347968],[103.749984,1.347929],[103.750478,1.347896],[103.75053,1.3479],[103.750534,1.347816],[103.750533,1.347741],[103.750566,1.347206],[103.750583,1.346958],[103.75062,1.346854],[103.750723,1.346726],[103.75087,1.346594],[103.750959,1.346545],[103.751103,1.346511],[103.751299,1.346505],[103.751396,1.346517],[103.751536,1.346533],[103.751609,1.34654],[103.751757,1.346551],[103.752357,1.346555],[103.752715,1.346561],[103.752993,1.346561],[103.753246,1.346558],[103.753754,1.346464],[103.753835,1.346449],[103.753978,1.346424],[103.754231,1.346385],[103.754445,1.346362],[103.754773,1.346382],[103.754905,1.346418],[103.755029,1.346456],[103.75518,1.346514],[103.755302,1.346574],[103.75552,1.346709],[103.755724,1.346891],[103.755913,1.347079],[103.756054,1.347241],[103.756211,1.347401],[103.75627,1.347473],[103.756326,1.347541],[103.756561,1.347796],[103.756818,1.348066],[103.75719,1.348484],[103.757252,1.34856],[103.757319,1.348637],[103.757921,1.349268],[103.758088,1.349344],[103.758299,1.349405],[103.758767,1.349476],[103.759543,1.349566],[103.759831,1.349607],[103.760228,1.349664],[103.760431,1.349687],[103.760778,1.349728],[103.760858,1.349737],[103.76087,1.349666],[103.760883,1.349538],[103.760908,1.349271],[103.760915,1.34797],[103.760916,1.347896],[103.760917,1.347722],[103.760917,1.34764],[103.760992,1.3476],[103.761197,1.347454],[103.761762,1.347112],[103.761783,1.34709],[103.761789,1.347064],[103.762133,1.346935],[103.76257,1.346871],[103.762717,1.346868],[103.763115,1.34693],[103.763401,1.347015],[103.763539,1.347081],[103.764307,1.347728],[103.76446,1.347809],[103.764673,1.347861],[103.764898,1.347855],[103.76506,1.34782],[103.765205,1.347751],[103.765381,1.347623],[103.765621,1.347459],[103.765731,1.347424],[103.765852,1.347414],[103.766785,1.347389],[103.766902,1.347397],[103.767117,1.347449],[103.767663,1.347697],[103.769513,1.34871],[103.769843,1.348872],[103.769864,1.348882],[103.769959,1.349014],[103.769997,1.349004],[103.7701,1.348978],[103.770182,1.349017],[103.770392,1.349104],[103.770486,1.349123],[103.770698,1.348741],[103.770785,1.348696],[103.770822,1.348659],[103.770838,1.34861],[103.770831,1.348566],[103.770875,1.348485],[103.771064,1.348146],[103.7718,1.347078],[103.771951,1.346859],[103.772212,1.346561],[103.772544,1.346321],[103.772779,1.34617],[103.772746,1.346113],[103.772868,1.346036],[103.772715,1.345771],[103.772808,1.345717],[103.772946,1.345637],[103.772931,1.345607],[103.772927,1.345553],[103.772945,1.345525],[103.773125,1.345426],[103.773177,1.345425],[103.77321,1.345458],[103.773219,1.345478],[103.773389,1.345379],[103.77372,1.345186],[103.773788,1.345146],[103.77377,1.345116],[103.773787,1.345066],[103.774182,1.344849],[103.774451,1.344684],[103.774649,1.344511],[103.774788,1.344351],[103.77491,1.344146],[103.774991,1.343951],[103.775027,1.343874],[103.77515,1.343607],[103.775265,1.343221],[103.775316,1.342947]],"type":"LineString"}}],"bbox":[103.749028,1.342947,103.775316,1.349737],"metadata":{"attribution":"openrouteservice.org | OpenStreetMap contributors","service":"routing","timestamp":1601646302378,"query":{"coordinates":[[103.7495883,1.3490636],[103.7751758,1.3429208]],"profile":"cycling-regular","format":"json"},"engine":{"version":"6.3.0","build_date":"2020-09-21T01:00:26Z","graph_date":"1970-01-01T00:00:00Z"}}}
                                                    }])
    const [mode, setMode] = useState('preset')

    function handleChangeButton() {
        if (mode === 'preset') setMode('custom')
        else setMode('preset')
        setChosenRoute(null)
        setStartLocation(null)
        setEndLocation(null)
    }

    function handleSearchCustomRoute() {
        if (!startLocation) {
            window.alert("Please enter your start point before proceeding.")
            return
        }
        if (!endLocation) {
            window.alert("Please enter your end point before proceeding.")
            return
        }
        console.log('Generating route.....')
        var url = getRouteJsonUrl([startLocation.lng, startLocation.lat], [endLocation.lng, endLocation.lat]);
        console.log("URL for JSON: ", url)
        fetch(url).then(response => {
            console.log("ResponseJson: ", response)
            response.json().then(
                routeJson => {
                    console.log(JSON.stringify(routeJson))
                    setChosenRoute(routeJson)
                }
            )
        })
        console.log('Done generating route.')
    }

    if (mode === 'preset'){
        return (
            <div id="side-panel-container">
                <div id="side-panel">
                    <div id="side-panel-title">
                        {/* Routes */}
                    </div>
                    <Button id="custom-route-transition-button" onClick={handleChangeButton} variant="contained" color="primary">Custom Route<Add /></Button>
                    <PresetList presetList={presetList} handlers={[chosenRoute,setChosenRoute, setStartLocation, setEndLocation]}/>
                </div>
            </div>
        )
    } else {
        return (
            <div id="side-panel-container">
                <div id="side-panel">
                    <div id="side-panel-title">
                        {/* Routes */}
                    </div>
                    <Button id="preset-route-transition-button" onClick={handleChangeButton} variant="contained" color="primary"><ArrowBack/>Back</Button>
                    <CustomRouteMaker handlers={[setStartLocation, setEndLocation]}/>
                    <Button id="search-route-button" onClick={handleSearchCustomRoute} color="primary" variant="contained" component="span">
                        <Search />
                    </Button>
                    {/* <PresetList presetList={presetList}/> */}
                </div>
            </div>
        )
    }
}
