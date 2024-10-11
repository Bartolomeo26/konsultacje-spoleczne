import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map()
{
    const mapRef = useRef();
    const mapContainerRef = useRef();

    // Przykładowe dane koordynatów dla markerów
    const coordinates = [
        { lng: 19.9450, lat: 50.0647, title: "Kraków" },
        { lng: 21.0122, lat: 52.2297, title: "Warszawa" },
        { lng: 17.0385, lat: 51.1079, title: "Wrocław" }
    ];

    useEffect(() =>
    {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmFydG9sb21lbzI2IiwiYSI6ImNscGlodWV3NjBpMjIycW1hOG12bHQzc2kifQ.aI5LhzT-TGLNgcUkuqW-Bg';

        // Inicjalizacja mapy
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11', // Style mapy
            center: [19.5, 52], // Początkowe położenie
            zoom: 5.5, // Początkowy zoom
        });

        // Dodanie markerów na mapie
        coordinates.forEach((coord) =>
        {
            const marker = new mapboxgl.Marker()
                .setLngLat([coord.lng, coord.lat]) // Ustawienie współrzędnych
                .setPopup(new mapboxgl.Popup().setHTML(`<h3>${coord.title}</h3>`)) // Popup z tytułem
                .addTo(mapRef.current); // Dodanie markera do mapy
        });

        // Usuwanie mapy po odmontowaniu komponentu
        return () =>
        {
            mapRef.current.remove();
        };
    }, []);

    return (
        <div className="w-3/4 flex flex-col justify-center items-center mt-5 mb-10">
            <h1 className="text-4xl mb-5">Map of Communities</h1>
            <div id="map" className="shadow-2xl" ref={mapContainerRef} />
        </div>
    );
}

export default Map;
