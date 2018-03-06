class HomeMenuControl {

    constructor(config) {
        this._config = config;
    }

    onAdd(map) {
        this._map = map;
        let tips = ``;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._container.innerHTML = tips;
        return this._container;
    }

    getDefaultPosition() {
        return 'top-right'
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

export default HomeMenuControl;