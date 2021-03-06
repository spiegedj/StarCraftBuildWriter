data = {
    "units": [
        {
            "Name": "Probe",
            "Minerals": 50,
            "Gas": 0,
            "Supply": 1,
            "BuildTime": 17,
        },

        {
            "Name": "Zealot",
            "Minerals": 100,
            "Gas": 0,
            "Supply": 2,
            "BuildTime": 38,
            "Req": ["Gateway"]
        },

        {
            "Name": "Stalker",
            "Minerals": 125,
            "Gas": 50,
            "Supply": 2,
            "BuildTime": 42,
            "Req": ["Gateway", "Cybernetics Core"]
        },
        {
            "Name": "Sentry",
            "Minerals": 50,
            "Gas": 100,
            "Supply": 2,
            "BuildTime": 37,
            "Req": ["Gateway", "Cybernetics Core"]
        },
        {
            "Name": "Observer",
            "Minerals": 25,
            "Gas": 75,
            "Supply": 1,
            "BuildTime": 30,
            "Req": ["Robotics Facility"]
        },
        {
            "Name": "Immortal",
            "Minerals": 250,
            "Gas": 100,
            "Supply": 4,
            "BuildTime": 55,
            "Req": ["Robotics Facility"]
        },
        {
            "Name": "Warp Prism",
            "Minerals": 200,
            "Gas": 0,
            "Supply": 2,
            "BuildTime": 90,
            "Req": ["Robotics Facility"]
        },
        {
            "Name": "Colossus",
            "Minerals": 300,
            "Gas": 200,
            "Supply": 6,
            "BuildTime": 75,
            "Req": ["Robotics Facility", "Robotics Bay"]
        },
        {
            "Name": "Phoenix",
            "Minerals": 150,
            "Gas": 100,
            "Supply": 2,
            "BuildTime": 35,
            "Req": ["Stargate"]
        },
        {
            "Name": "Void Ray",
            "Minerals": 250,
            "Gas": 150,
            "Supply": 4,
            "BuildTime": 60,
            "Req": ["Stargate"]
        },
        {
            "Name": "High Templar",
            "Minerals": 50,
            "Gas": 150,
            "Supply": 2,
            "BuildTime": 55,
            "Req": ["Gateway", "Templar Archives"]
        },
        {
            "Name": "Dark Templar",
            "Minerals": 125,
            "Gas": 125,
            "Supply": 2,
            "BuildTime": 55,
            "Req": ["Gateway", "Dark Shrine"]
        },
        {
            "Name": "Carrier",
            "Minerals": 350,
            "Gas": 250,
            "Supply": 6,
            "BuildTime": 120,
            "Req": ["Stargate", "Fleet Beacon"]
        },
        {
            "Name": "Mothership",
            "Minerals": 300,
            "Gas": 300,
            "Supply": 6,
            "BuildTime": 100,
            "Req": ["Stargate", "Fleet Beacon"]
        },
        {
            "Name": "Mothership Core",
            "Minerals": 100,
            "Gas": 100,
            "Supply": 2,
            "BuildTime": 30,
            "Req": ["Cybernetics Core"]
        },
        {
            "Name": "Oracle",
            "Minerals": 150,
            "Gas": 150,
            "Supply": 3,
            "BuildTime": 50,
            "Req": ["Stargate"]
        },
        {
            "Name": "Tempest",
            "Minerals": 300,
            "Gas": 200,
            "Supply": 4,
            "BuildTime": 60,
            "Req": ["Stargate", "Fleet Beacon"]
        }
    ],

    "buildings": [
        {
            "Name": "Pylon",
            "Minerals": 100,
            "Gas": 0,
            "BuildTime": 25
        },
        {
            "Name": "Nexus",
            "Minerals": 400,
            "Gas": 0,
            "BuildTime": 100
        },
        {
            "Name": "Assimilator",
            "Minerals": 75,
            "Gas": 0,
            "BuildTime": 30
        },
        {
            "Name": "Photon Cannon",
            "Minerals": 150,
            "Gas": 0,
            "BuildTime": 40,
            "Req": ["Forge"]
        },
        {
            "Name": "Gateway",
            "Minerals": 150,
            "Gas": 0,
            "BuildTime": 65
        },
        {
            "Name": "Stargate",
            "Minerals": 150,
            "Gas": 150,
            "BuildTime": 60,
            "Req": ["Cybernetics Core"]
        },
        {
            "Name": "Robotics Facility",
            "Minerals": 200,
            "Gas": 100,
            "BuildTime": 65,
            "Req": ["Cybernetics Core"]
        },
        {
            "Name": "Forge",
            "Minerals": 150,
            "Gas": 0,
            "BuildTime": 45
        },
        {
            "Name": "Cybernetics Core",
            "Minerals": 150,
            "Gas": 0,
            "BuildTime": 50,
            "Req": ["Gateway"]
        },
        {
            "Name": "Twilight Council",
            "Minerals": 150,
            "Gas": 100,
            "BuildTime": 50,
            "Req": ["Cybernetics Core"]
        },
        {
            "Name": "Templar Archives",
            "Minerals": 150,
            "Gas": 200,
            "BuildTime": 50,
            "Req": ["Twilight Council"]
        },
        {
            "Name": "Dark Shrine",
            "Minerals": 150,
            "Gas": 150,
            "BuildTime": 100,
            "Req": ["Twilight Council"]
        },
        {
            "Name": "Fleet Beacon",
            "Minerals": 300,
            "Gas": 200,
            "BuildTime": 60,
            "Req": ["Stargate"]
        },
        {
            "Name": "Robotics Bay",
            "Minerals": 200,
            "Gas": 200,
            "BuildTime": 65,
            "Req": ["Robotics Facility"]
        },
    ],

    "upgrades": [
        {
            "Name": "Warp Gate",
            "Minerals": 50,
            "Gas": 50,
            "BuildTime": 160,
            "Req": ["Cybernetics Core"]
        },

        {
            "Name": "Ground Weapons Level 1",
            "Minerals": 100,
            "Gas": 100,
            "BuildTime": 160,
            "Req": ["Forge"]
        },

        {
            "Name": "Ground Weapons Level 2",
            "Minerals": 150,
            "Gas": 150,
            "BuildTime": 190,
            "Req": ["Forge", "Ground Weapons Level 1"]
        },

        {
            "Name": "Ground Weapons Level 3",
            "Minerals": 200,
            "Gas": 200,
            "BuildTime": 220,
            "Req": ["Forge", "Ground Weapons Level 2"]
        },

        {
            "Name": "Ground Armor Level 1",
            "Minerals": 100,
            "Gas": 100,
            "BuildTime": 160,
            "Req": ["Forge"]
        },

        {
            "Name": "Ground Armor Level 2",
            "Minerals": 150,
            "Gas": 150,
            "BuildTime": 190,
            "Req": ["Forge", "Ground Armor Level 1"]
        },

        {
            "Name": "Ground Armor Level 3",
            "Minerals": 200,
            "Gas": 200,
            "BuildTime": 220,
            "Req": ["Forge", "Ground Armor Level 2"]
        },

        {
            "Name": "Air Weapons Level 1",
            "Minerals": 100,
            "Gas": 100,
            "BuildTime": 160,
            "Req": ["Cybernetics Core"]
        },

        {
            "Name": "Air Weapons Level 2",
            "Minerals": 175,
            "Gas": 175,
            "BuildTime": 190,
            "Req": ["Cybernetics Core", "Air Weapons Level 1"]
        },

        {
            "Name": "Air Weapons Level 3",
            "Minerals": 250,
            "Gas": 250,
            "BuildTime": 220,
            "Req": ["Cybernetics Core", "Air Weapons Level 2"]
        },

        {
            "Name": "Air Armor Level 1",
            "Minerals": 100,
            "Gas": 100,
            "BuildTime": 160,
            "Req": ["Cybernetics Core"]
        },

        {
            "Name": "Air Armor Level 2",
            "Minerals": 175,
            "Gas": 175,
            "BuildTime": 190,
            "Req": ["Cybernetics Core", "Air Armor Level 1"]
        },

        {
            "Name": "Air Armor Level 3",
            "Minerals": 250,
            "Gas": 250,
            "BuildTime": 220,
            "Req": ["Cybernetics Core", "Air Armor Level 2"]
        },

        {
            "Name": "Shields Level 1",
            "Minerals": 150,
            "Gas": 150,
            "BuildTime": 160,
            "Req": ["Forge"]
        },

        {
            "Name": "Shields Level 2",
            "Minerals": 225,
            "Gas": 225,
            "BuildTime": 190,
            "Req": ["Forge", "Shields Level 1"]
        },

        {
            "Name": "Shields Level 3",
            "Minerals": 300,
            "Gas": 300,
            "BuildTime": 220,
            "Req": ["Forge", "Shields Level 2"]
        },

        {
            "Name": "Charge",
            "Minerals": 200,
            "Gas": 200,
            "BuildTime": 140,
            "Req": ["Twilight Council"]
        },

        {
            "Name": "Blink",
            "Minerals": 150,
            "Gas": 150,
            "BuildTime": 140,
            "Req": ["Twilight Council"]
        },

        {
            "Name": "Extended Thermal Lance",
            "Minerals": 200,
            "Gas": 200,
            "BuildTime": 140,
            "Req": ["Robotics Bay"]
        },

        {
            "Name": "Psionic Storm",
            "Minerals": 200,
            "Gas": 200,
            "BuildTime": 110,
            "Req": ["Templar Archives"]
        },

        {
            "Name": "Gravity Boosters",
            "Minerals": 100,
            "Gas": 100,
            "BuildTime": 80,
            "Req": ["Robotics Bay"]
        },

        {
            "Name": "Gravity Drive",
            "Minerals": 100,
            "Gas": 100,
            "BuildTime": 80,
            "Req": ["Robotics Bay"]
        },

        {
            "Name": "Anion Pulse-Crystals",
            "Minerals": 150,
            "Gas": 150,
            "BuildTime": 90,
            "Req": ["Fleet Beacon"]
        },

        {
            "Name": "Graviton Catapult",
            "Minerals": 150,
            "Gas": 150,
            "BuildTime": 80,
            "Req": ["Fleet Beacon"]
        },
    ]
}