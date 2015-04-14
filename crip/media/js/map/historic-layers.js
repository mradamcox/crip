define([
    'jquery',
    'openlayers',
    'underscore',
    'arches'
], function($, ol, _, arches) {

    // sanborn map 1914
    var sanborn1914black_Lyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //url: 'http://199.184.68.66:8080/geoserver/confed_parish/wms/',
            url: 'http://54.148.201.140:8080/geoserver/raster/wms/',
            params: {
                //'LAYERS': 'confed_parish:sheet42_full',
                'LAYERS': 'raster:sanborn1914_blk',
                'TILED': true,
                },
            serverType: 'geoserver'   
        }),
        visible: false,
    });
    
    // transparent confederate map (for altlayer)
    var sanborn1914red_Lyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //url: 'http://199.184.68.66:8080/geoserver/confed_parish/wms/',
            url: 'http://54.148.201.140:8080/geoserver/raster/wms/',
            params: {
                //'LAYERS': 'confed_parish:sheet42_full',
                'LAYERS': 'raster:sanborn1914_red',
                'TILED': true,
                },
            serverType: 'geoserver'   
        }),
        visible: false,
    });
    
    var sanborn1914 = {
        id: 'sanborn1914',
        name: 'Sanborn\u00A9 Maps (1914)',
        icon: arches.urls.media + 'img/map/thb_san1914.png',
        layer: sanborn1914black_Lyr,
        altlayer: sanborn1914red_Lyr,
        showInfo: 'Sanborn\u00A9 Fire Insurance Maps (1914 series) show structures in Natchitoches and information useful for insurance agencies.  The original map sheets have been stitched together here to show a single seamless layer for the whole year.',
    }
    sanborn1914.layer.matchid = sanborn1914.id;
    sanborn1914.altlayer.matchid = sanborn1914.id;
 
    // full confederate map
    var confed_fullLyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //url: 'http://199.184.68.66:8080/geoserver/confed_parish/wms/',
            url: 'http://54.148.201.140:8080/geoserver/raster/wms/',
            params: {
                //'LAYERS': 'confed_parish:sheet42_full',
                'LAYERS': 'raster:confed_color',
                'TILED': true,
                },
            serverType: 'geoserver'   
        }),
        visible: false,
    });
    
    // transparent confederate map (for altlayer)
    var confed_transLyr = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //url: 'http://199.184.68.66:8080/geoserver/confed_parish/wms/',
            url: 'http://54.148.201.140:8080/geoserver/raster/wms/',
            params: {
                //'LAYERS': 'confed_parish:sheet42_trans',
                'LAYERS': 'raster:confed_trans',
                'TILED': true,
                },
            serverType: 'geoserver'   
        }),
        visible: false,
    });
    
    var confed = {
        id: 'confed',
        name: 'Captured Confederate Map',
        icon: arches.urls.media + 'img/map/thb_confed_clr.png',
        layer: confed_fullLyr,
        altlayer: confed_transLyr,
        showInfo: 'This map is from the <a href="http://research.archives.gov/description/305566" target="_blank">Civil Works Map File</a>.  The record group contains many Civil War era maps that were purportedly captured from the confederate army.',
    }
    confed.layer.matchid = confed.id;
    confed.altlayer.matchid = confed.id;
    
    // tiled plat map layer
    var platmaps_transLyr = new ol.layer.Tile({
        name: "platmaps_transLyr",
        source: new ol.source.XYZ({
            url: 'http://199.184.68.66/tiles/platmaps_trans/{z}/{x}/{y}.png'
            //url: 'https://s3-us-west-2.amazonaws.com/natchdata/tiles/historictownplats/{z}/{x}/{y}.png'
        }),
        visible: false,
    });   
    
    // DO NOT ACTIVATE FULL LAYER (altlayer) AT THIS TIME
    var platmaps_fullLyr = new ol.layer.Tile({
        name: "platmaps_fullLyr",
        source: new ol.source.XYZ({
            url: 'http://199.184.68.66/tiles/platmaps_white/{z}/{x}/{y}.png'
            //url: 'https://s3-us-west-2.amazonaws.com/natchdata/tiles/historictownplats/{z}/{x}/{y}.png'
        }),
        visible: false,
    });
        
    var platmaps = {
        id: 'platmaps',
        name: 'Plat Maps',
        icon: arches.urls.media + 'img/map/thb_plats.png',
        layer: platmaps_transLyr,
        altlayer: false,
        showInfo: 'This layer comprises many historic township plat maps, all acquired through the Louisiana State Land Office <a href="https://wwwslodms.doa.la.gov/" target="_blank">Historical Documents</a> database.  These plat maps are not all from the same year, so the date has been added in the top right/northeast corner of each township.',
    }
    platmaps.layer.matchid = platmaps.id;
    
    // tiled road map layer
    var roadmapLyr = new ol.layer.Tile({
        name: "roadmapLyr",
        source: new ol.source.XYZ({
            url: 'http://199.184.68.66/tiles/civilwarroadmap/{z}/{x}/{y}.png'
            //url: 'https://s3-us-west-2.amazonaws.com/natchdata/tiles/historictownplats/{z}/{x}/{y}.png'
        }),
        visible: false,
    });
    var roadmap = {
        id: 'roadmap',
        name: 'Confederate Road Map',
        icon: arches.urls.media + 'img/map/thb_roadmap.png',
        layer: roadmapLyr,
        altlayer: false,
        showInfo: 'This is a captured confederate map showing the road between Natchitoches and Alexandria (only the portions within Natchitoches Parish are shown here).  It was originally drawn in many segments on both sides of a single piece of paper.',
    }
    roadmap.layer.matchid = roadmap.id;
    
    // map 174
    var map174Lyr = new ol.layer.Tile({
        name: "map174Lyr",
        source: new ol.source.TileWMS({
            //url: 'http://199.184.68.66:8080/geoserver/natchcity/wms/',
            url: 'http://54.148.201.140:8080/geoserver/raster/wms/',
            params: {
                //'LAYERS': 'natchcity:map174',
                'LAYERS': 'raster:map174',
                'TILED': true,
                },
            serverType: 'geoserver'   
        }),
        visible: false,
    });    
    var map174 = {
        id: 'map174',
        name: 'Map 174',
        icon: arches.urls.media + 'img/map/thb_map174.png',
        layer: map174Lyr,
        altlayer: false,
        showInfo: 'This is a plat map of the city of Natchitoches from 1866.  It is map number 174 at the <a href="https://library.nsula.edu/cammie-henry-research-center/" target="_blank">Cammie G. Henry Research Library</a>.',
    }
    map174.layer.matchid = map174.id;
    
    // aggregate layers in historicLayers array
    var historicLayers = [
        platmaps,
        confed,
        roadmap,
        sanborn1914,       
    ]  
   
    return historicLayers;
});