/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/games/match": {
        post: operations["createMatch"];
    };
    "/games/enter-match/{code}": {
        post: operations["enterInMatch"];
    };
    "/games/initial-load": {
        get: operations["getInitialGameState"];
    };
    "/games/{gameId}/state": {
        post: operations["updateTurn"];
    };
    "/auth/login": {
        post: operations["signIn"];
    };
}

export type webhooks = Record<string, never>;

export interface components {
    schemas: {
        PlayerData: Record<string, never>;
        MatchData: {
            id: number;
            code: string;
            players: components["schemas"]["PlayerData"][];
            active: boolean;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        MoneyData: {
            playerId: string;
            value: number;
        };
        UnitMovement: {
            distance: number;
            localization: string;
        };
        UnitData: {
            id: string;
            /** @enum {string} */
            category: "military" | "structure";
            playerId: string;
            /** @enum {string} */
            class:
                | "castle"
                | "gate"
                | "archer"
                | "spearman"
                | "horseman"
                | "wall";
            movement: components["schemas"]["UnitMovement"];
            movementInTurn: {
                turn?: number;
                moved?: boolean;
            };
        };
        SquareData: {
            id: string;
            type: string;
        };
        MapData: {
            rows: components["schemas"]["SquareData"][][];
        };
        GameState: {
            gameId: string;
            playerIds: string[];
            money: components["schemas"]["MoneyData"][];
            turns: number;
            units: components["schemas"]["UnitData"][];
            gameMap: components["schemas"]["MapData"];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
    createMatch: {
        responses: {
            201: {
                content: {
                    "application/json": components["schemas"]["MatchData"];
                };
            };
        };
    };
    enterInMatch: {
        responses: {
            201: {
                content: {
                    "application/json": components["schemas"]["MatchData"];
                };
            };
        };
    };
    getInitialGameState: {
        responses: {
            200: {
                content: {
                    "application/json": components["schemas"]["GameState"];
                };
            };
        };
    };
    updateTurn: {
        responses: {
            201: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    signIn: {
        responses: {
            200: {
                content: never;
            };
        };
    };
}

/**
 * This is auto generated by the command g-enum, check ./package.json and ./src/add-enums-to-schema.ts into Villagers
 * Do not make direct changes to this.
 */
export enum UNITDATA_CATEGORY {
    "MILITARY" = "military",
    "STRUCTURE" = "structure",
}

export enum UNITDATA_CLASS {
    "CASTLE" = "castle",
    "GATE" = "gate",
    "ARCHER" = "archer",
    "SPEARMAN" = "spearman",
    "HORSEMAN" = "horseman",
    "WALL" = "wall",
}
