interface IShip {
    title: string;
    description: string;
    icons: {
        large: string;
        medium: string;
    };
    level: number;
    type: {
        name: string;
        title: string;
        icons: {
            default: string;
        };
    };
    nation: {
        name: string;
        title: string;
        color: string;
        icons: {
            large: string;
            medium: string;
            small: string;
        };

    };

}

interface IShipsData extends IShip {
    key: React.Key;
    image: string;
    country: string;
    class: string;
}

export type { IShip, IShipsData };