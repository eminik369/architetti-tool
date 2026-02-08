import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "TS-P-0001",
    name: "Waterfront di Messina",
    location: "Messina, Sicilia, Italia",
    client: "Autorità di Sistema Portuale dello Stretto – Messina",
    typology: "Urban Renovation (Waterfront)",
    status: "1° Premio – in corso",
    surfaceM2: null,
    tags: ["waterfront", "urban renovation", "public space"],
  },
  {
    id: "TS-P-0002",
    name: "Museo Crypta Balbi",
    location: "Roma, Italia",
    client: "Museo Nazionale Romano",
    typology: "Restauro e Riutilizzo",
    status: "In corso",
    surfaceM2: 9000,
    tags: ["restoration", "reuse", "cultural heritage"],
  },
  {
    id: "TS-P-0003",
    name: "Scuola in via Mazzacurati",
    location: "Roma, Italia",
    client: "Comune di Roma – Dip. Riqualificazione Periferie",
    typology: "Riqualificazione e Risanamento (Education)",
    status: "Realizzato",
    surfaceM2: 4400,
    tags: ["education", "regeneration", "public building"],
  },
  {
    id: "TS-P-0004",
    name: "Centro Servizi Molo San Cataldo",
    location: "Taranto, Italia",
    client: "Autorità del Sistema Portuale del Mar Ionio",
    typology: "Waterfront",
    status: "Realizzato",
    surfaceM2: 5000,
    tags: ["waterfront", "public space", "gateway building"],
  },
];
