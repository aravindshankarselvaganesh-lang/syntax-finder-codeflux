export const MOCK_SITES = [
  // India (Assam, Gujarat, Rajasthan, Tripura)
  { id: 'GJ-12', pos: [23.0225, 72.5714], status: 'green', state: 'Gujarat (Cambay)', name: 'Gujarat-12', operator: 'ONGC', spud: '14 May 2026', td: '2,800 m', formation: 'Kalol Formation', rca: 'Optimal Operations' },
  { id: 'GJ-14', pos: [22.3, 71.5], status: 'green', state: 'Gujarat (Cambay)', name: 'Gujarat-14', operator: 'ONGC', spud: '11 Jun 2026', td: '2,100 m', formation: 'Cambay Shale', rca: 'N/A' },
  { id: 'TR-02', pos: [23.8, 91.2], status: 'yellow', state: 'Tripura', name: 'Tripura-02', operator: 'ONGC', spud: '03 Jan 2026', td: '4,000 m', formation: 'Bhuban Formation', rca: 'Equipment Failure' },
  { id: 'RJ-05', pos: [26.2, 73.0], status: 'green', state: 'Rajasthan', name: 'Rajasthan-05', operator: 'Cairn India', spud: '22 Aug 2026', td: '1,500 m', formation: 'Barmer Basin', rca: 'Optimal' },
  { id: 'AS-08', pos: [26.1445, 91.7362], status: 'yellow', state: 'Assam', name: 'Assam-08', operator: 'Oil India Ltd', spud: '01 Jul 2026', td: '4,500 m', formation: 'Tipam Sandstone', rca: 'Mud Weight Loss' },
  { id: 'AS-07', pos: [27.2, 95.0], status: 'red', state: 'Assam', name: 'Assam-07', operator: 'Oil India Ltd', spud: '12 Aug 2026', td: '3,102 m', formation: 'RDFC', rca: 'Pressure Anomaly / Instability' },
  { id: 'BH-01', pos: [19.3, 71.3], status: 'green', state: 'Offshore (Bombay High)', name: 'Bombay-High-Alpha', operator: 'ONGC', spud: '05 Feb 2026', td: '1,900 m', formation: 'L-III Reservoir', rca: 'Optimal' },
  { id: 'KG-09', pos: [16.5, 82.3], status: 'yellow', state: 'Offshore (KG Basin)', name: 'KG-D6-09', operator: 'Reliance', spud: '19 Mar 2026', td: '3,200 m', formation: 'Mio-Pliocene', rca: 'Subsea Valve Alert' },

  // Middle East
  { id: 'GH-01', pos: [25.5, 49.5], status: 'green', state: 'Saudi Arabia', name: 'Ghawar-Alpha', operator: 'Saudi Aramco', spud: '10 Jan 2026', td: '2,200 m', formation: 'Arab-D Limestone', rca: 'Optimal' },
  { id: 'SF-04', pos: [28.0, 48.8], status: 'yellow', state: 'Offshore Saudi Arabia', name: 'Safaniya-04', operator: 'Saudi Aramco', spud: '28 Feb 2026', td: '1,500 m', formation: 'Khafji Sandstone', rca: 'H2S Gas Kick Detected' },
  { id: 'BZ-99', pos: [30.1, 47.4], status: 'green', state: 'Iraq', name: 'Rumaila-99', operator: 'BP / BOC', spud: '15 Apr 2026', td: '3,100 m', formation: 'Mishrif Formation', rca: 'Optimal' },
  { id: 'ND-12', pos: [25.9, 51.5], status: 'green', state: 'Qatar', name: 'North-Dome-12', operator: 'QatarEnergy', spud: '02 May 2026', td: '2,900 m', formation: 'Khuff Formation', rca: 'Optimal' },

  // North America
  { id: 'PB-101', pos: [31.8, -102.3], status: 'red', state: 'Texas (Permian)', name: 'Permian-101', operator: 'ExxonMobil', spud: '10 Aug 2026', td: '4,100 m', formation: 'Wolfcamp Shale', rca: 'Severe Frac Hit / Pressure Loss' },
  { id: 'PB-205', pos: [32.1, -101.9], status: 'green', state: 'Texas (Permian)', name: 'Permian-205', operator: 'Chevron', spud: '22 Jul 2026', td: '3,800 m', formation: 'Bone Spring', rca: 'Optimal' },
  { id: 'BA-44', pos: [48.1, -102.5], status: 'yellow', state: 'North Dakota (Bakken)', name: 'Bakken-44', operator: 'ConocoPhillips', spud: '14 Jun 2026', td: '3,200 m', formation: 'Middle Bakken', rca: 'Drill String Vibration' },
  { id: 'GM-88', pos: [28.0, -90.0], status: 'red', state: 'Offshore GOM', name: 'Deepwater-Thunder', operator: 'Shell', spud: '01 Mar 2026', td: '8,500 m', formation: 'Lower Tertiary', rca: 'BOP Telemetry Failure' },
  { id: 'AS-99', pos: [70.2, -148.6], status: 'green', state: 'Alaska (Prudhoe Bay)', name: 'Prudhoe-99', operator: 'Hilcorp', spud: '11 Feb 2026', td: '2,700 m', formation: 'Ivishak Sandstone', rca: 'Optimal' },

  // South America
  { id: 'CM-01', pos: [-22.5, -40.0], status: 'green', state: 'Offshore Brazil', name: 'Campos-PreSalt-01', operator: 'Petrobras', spud: '30 May 2026', td: '6,200 m', formation: 'Tupi Carbonate', rca: 'Optimal' },
  { id: 'VM-15', pos: [-38.2, -68.5], status: 'yellow', state: 'Argentina', name: 'Vaca-Muerta-15', operator: 'YPF', spud: '17 Aug 2026', td: '3,000 m', formation: 'Vaca Muerta Shale', rca: 'Proppant Screen-Out' },
  { id: 'OR-07', pos: [9.5, -63.0], status: 'green', state: 'Venezuela', name: 'Orinoco-07', operator: 'PDVSA', spud: '04 Apr 2026', td: '1,100 m', formation: 'Oficina Formation', rca: 'Optimal' },

  // Europe / North Sea
  { id: 'NS-33', pos: [61.2, 2.0], status: 'yellow', state: 'Offshore Norway', name: 'Troll-33', operator: 'Equinor', spud: '09 Jul 2026', td: '1,500 m', formation: 'Sognefjord Formation', rca: 'Weather Delay' },
  { id: 'NS-12', pos: [58.4, 1.2], status: 'green', state: 'Offshore UK', name: 'Brent-Delta-12', operator: 'Shell', spud: '20 Aug 2026', td: '2,800 m', formation: 'Brent Group Sandstone', rca: 'Optimal' },

  // Africa
  { id: 'ND-05', pos: [5.3, 6.4], status: 'red', state: 'Nigeria', name: 'Niger-Delta-05', operator: 'Chevron', spud: '11 Jun 2026', td: '3,400 m', formation: 'Agbada Formation', rca: 'Security Incident / Evacuation' },
  { id: 'AN-22', pos: [-8.8, 13.0], status: 'green', state: 'Offshore Angola', name: 'Block-15-22', operator: 'ExxonMobil', spud: '03 Mar 2026', td: '4,100 m', formation: 'Oligocene Sands', rca: 'Optimal' },
  { id: 'EG-01', pos: [31.5, 30.0], status: 'green', state: 'Offshore Egypt', name: 'Zohr-01', operator: 'Eni', spud: '15 Jan 2026', td: '4,000 m', formation: 'Miocene Carbonates', rca: 'Optimal' },

  // Asia / Pacific / Australasia
  { id: 'NW-44', pos: [-19.5, 116.0], status: 'yellow', state: 'Offshore Australia', name: 'NWS-44', operator: 'Woodside', spud: '29 Jul 2026', td: '3,800 m', formation: 'Triassic Sandstone', rca: 'Drilling Fluid Loss' },
  { id: 'SK-12', pos: [51.5, 143.5], status: 'green', state: 'Offshore Russia', name: 'Sakhalin-12', operator: 'Gazprom', spud: '10 May 2026', td: '3,100 m', formation: 'Nutovo Formation', rca: 'Optimal' },
  { id: 'MA-09', pos: [4.5, 114.2], status: 'green', state: 'Offshore Malaysia', name: 'Baram-Delta-09', operator: 'Petronas', spud: '07 Aug 2026', td: '2,600 m', formation: 'Cycle V', rca: 'Optimal' },
  { id: 'CH-88', pos: [38.0, 118.5], status: 'yellow', state: 'China (Bohai)', name: 'Bohai-88', operator: 'CNOOC', spud: '12 Sep 2026', td: '2,100 m', formation: 'Guantao Formation', rca: 'High Torque Indications' },
  { id: 'IN-02', pos: [-2.5, 117.5], status: 'green', state: 'Indonesia (Mahakam)', name: 'Mahakam-02', operator: 'Pertamina', spud: '21 Jun 2026', td: '3,500 m', formation: 'Balikpapan Formation', rca: 'Optimal' }
];
