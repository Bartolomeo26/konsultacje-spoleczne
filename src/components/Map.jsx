import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getCommunitiesToMap } from '../util/fetch';
import { useQuery } from '@tanstack/react-query';
import LoadingIndicator from './LoadingIndicator';
function Map()
{
    const mapRef = useRef();
    const mapContainerRef = useRef();

    const { isPending, error, data: communities } = useQuery({
        queryKey: ['communities', 'map'],
        queryFn: getCommunitiesToMap,
        retry: 1,
        staleTime: 5 * 60 * 1000, 
        cacheTime: 10 * 60 * 1000
    });

   
    const communityData = communities?.value?.map((community) => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [community.longitude, community.latitude],
        },
        properties: {
            title: community.name
        }
    }));

    useEffect(() =>
    {
        if (!communities?.value) return; 

        mapboxgl.accessToken = 'pk.eyJ1IjoiYmFydG9sb21lbzI2IiwiYSI6ImNscGlodWV3NjBpMjIycW1hOG12bHQzc2kifQ.aI5LhzT-TGLNgcUkuqW-Bg';

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [19.5, 52], 
            zoom: 5.5, 
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl());

        mapRef.current.on('load', () =>
        {
            mapRef.current.addSource('communities', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: communityData,
                },
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 20,
            });

            mapRef.current.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'communities',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': '#FF5733',
                    'circle-radius': 20,
                    'circle-opacity': 0.6,
                },
            });

            mapRef.current.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'communities',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-size': 12,
                    'text-anchor': 'center',
                    'text-allow-overlap': true,
                },
                paint: {
                    'text-color': '#ffffff',
                    'text-halo-color': '#000000',
                    'text-halo-width': 1,
                },
            });

            mapRef.current.addLayer({
                id: 'markers',
                type: 'symbol',
                source: 'communities',
                filter: ['!', ['has', 'point_count']],
                layout: {
                    'icon-image': 'marker-15', 
                    'text-field': '{title}', 
                    'text-size': 13,
                    'text-anchor': 'top',
                    'text-offset': [0, 0.6], 
                },
                paint: {
                    'text-color': '#3388ff',
                    'circle-radius': 5,
                    'text-halo-color': '#333333',
                    'text-halo-width': 0.5,
                },
            });

            mapRef.current.on('click', 'markers', (e) =>
            {
                const features = mapRef.current.queryRenderedFeatures(e.point, {
                    layers: ['markers']
                });

                if (features.length > 0)
                {
                    const feature = features[0];
                    const clickedCoordinates = feature.geometry.coordinates;

                    const communitiesAtLocation = communityData.filter((data) =>
                    {
                        const [lng, lat] = data.geometry.coordinates;
                        const [clickedLng, clickedLat] = clickedCoordinates;

                        const lngDifference = Math.abs(lng - clickedLng);
                        const latDifference = Math.abs(lat - clickedLat);

                        return lngDifference < 0.001 && latDifference < 0.001;
                    });

                    const communityList = communitiesAtLocation.map(
                        (data, index) => `<li class="text-black"><span class="inline-block text-sm" style="width:15px;">${index + 1}.</span> ${data.properties.title}</li>`
                    ).join('');

                    new mapboxgl.Popup({ offset: 25 })
                        .setHTML(`<h3>Communities located here:</h3><ul>${communityList}</ul>`)
                        .setLngLat(clickedCoordinates)
                        .addTo(mapRef.current);
                }
            });

            mapRef.current.on('click', 'clusters', (e) =>
            {
                const features = mapRef.current.queryRenderedFeatures(e.point, {
                    layers: ['clusters'],
                });

                if (features.length > 0)
                {
                    const clusterId = features[0].properties.cluster_id;
                    mapRef.current.getSource('communities').getClusterExpansionZoom(clusterId, (err, zoom) =>
                    {
                        if (err) return;

                        mapRef.current.flyTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom,
                            essential: true,
                        });
                    });
                }
            });

            mapRef.current.on('zoom', () =>
            {
                const zoomLevel = mapRef.current.getZoom();
                if (zoomLevel > 14)
                {
                    mapRef.current.setLayoutProperty('clusters', 'visibility', 'none');
                    mapRef.current.setLayoutProperty('markers', 'visibility', 'visible');
                } else
                {
                    mapRef.current.setLayoutProperty('clusters', 'visibility', 'visible');
                    mapRef.current.setLayoutProperty('markers', 'visibility', 'visible');
                }
            });
        });

        return () =>
        {
            if (mapRef.current)
            {
                mapRef.current.remove();
            }
        };
    }, [communityData]);
    if (isPending) return (<div className="w-3/4 flex flex-col justify-center items-center mt-5 mb-10 text-center">
        <h1 className="text-4xl mb-5">Map of Communities</h1><div><LoadingIndicator /></div></div>)
    if (error) return (<div className="w-3/4 flex flex-col justify-center items-center mt-5 mb-10 text-center">
        <h1 className="text-4xl mb-5">Map of Communities</h1><div>An error occurred: {error.message}</div></div>)

    return (
        <div className="w-3/4 flex flex-col justify-center items-center mt-5 mb-10">
            <h1 className="text-4xl mb-5">Map of Communities</h1>
            <div id="map" className="shadow-2xl" ref={mapContainerRef} />
        </div>
    );
}

export default Map;
