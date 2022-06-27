import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Family {
    last_name: string;
    origin: string;
    date_registered: string;
    members: number;
}

@Injectable({
    providedIn: 'root'
})
export class FamiliesService {
    constructor(private http: HttpClient) {
    }

    getData(term: string = null): Observable<Family[]> {
        let items = getMockData();
        if (term) {
            items = items.filter(x => x.last_name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }
}

function getMockData() {
    return [
        {
            "last_name" : "Hepperly",
            "origin" : "sneerfulness Himawan",
            "date_registered": "2018-08-27",
            "members": 2,
        },
        {
            "last_name" : "Mccarvill",
            "origin" : "nautch chemicker",
            "date_registered": "2018-11-06",
            "members": 7,
        },
        {
            "last_name" : "Zeitler",
            "origin" : "chalcolithic specializer",
            "date_registered": "2018-11-04",
            "members": 2,
        },
        {
            "last_name" : "Valk",
            "origin" : "durance dermoneurosis",
            "date_registered": "2018-12-01",
            "members": 4,
        },
        {
            "last_name" : "Pallas",
            "origin" : "quietus Timuquanan",
            "date_registered": "2018-03-23",
            "members": 2,
        },
        {
            "last_name" : "Valerie",
            "origin" : "Catonically pseudologue",
            "date_registered": "2018-03-20",
            "members": 6,
        },
        {
            "last_name" : "Strede",
            "origin" : "nonsuccessive neogamous",
            "date_registered": "2018-01-16",
            "members": 1,
        },
        {
            "last_name" : "Bernheim",
            "origin" : "unpublicity untrapped",
            "date_registered": "2018-10-25",
            "members": 3,
        },
        {
            "last_name" : "Stucki",
            "origin" : "sulphydric unpierced",
            "date_registered": "2018-09-22",
            "members": 7,
        },
        {
            "last_name" : "Moher",
            "origin" : "excipular Sudanic",
            "date_registered": "2018-05-16",
            "members": 2,
        },
        {
            "last_name" : "Masenten",
            "origin" : "astutely scaliness",
            "date_registered": "2018-05-06",
            "members": 8,
        },
        {
            "last_name" : "Bohman",
            "origin" : "prerestrain anisometropic",
            "date_registered": "2018-04-08",
            "members": 4,
        },
        {
            "last_name" : "Behrendt",
            "origin" : "flat atmostea",
            "date_registered": "2018-07-26",
            "members": 1,
        },
        {
            "last_name" : "Dunnaway",
            "origin" : "Limacidae frill",
            "date_registered": "2018-01-06",
            "members": 1,
        },
        {
            "last_name" : "Pescador",
            "origin" : "supercrowned different",
            "date_registered": "2018-12-24",
            "members": 8,
        },
        {
            "last_name" : "Ginocchio",
            "origin" : "Gaonic broodingly",
            "date_registered": "2018-02-28",
            "members": 3,
        },
        {
            "last_name" : "Barrick",
            "origin" : "prediagnostic untimbered",
            "date_registered": "2018-11-13",
            "members": 5,
        },
        {
            "last_name" : "Fitser",
            "origin" : "elicit ambidextral",
            "date_registered": "2018-07-24",
            "members": 6,
        },
        {
            "last_name" : "Sboro",
            "origin" : "thoracic bauxite",
            "date_registered": "2018-06-01",
            "members": 2,
        },
        {
            "last_name" : "Kohl",
            "origin" : "krageroite caracoler",
            "date_registered": "2018-06-03",
            "members": 3,
        },
        {
            "last_name" : "Canary",
            "origin" : "nyctalopic Taluche",
            "date_registered": "2018-02-25",
            "members": 6,
        },
        {
            "last_name" : "Wilmeth",
            "origin" : "scrupula commutual",
            "date_registered": "2018-04-22",
            "members": 3,
        },
        {
            "last_name" : "Caraveo",
            "origin" : "boraginaceous malleus",
            "date_registered": "2018-06-27",
            "members": 7,
        },
        {
            "last_name" : "Craig",
            "origin" : "trochiline archdogmatist",
            "date_registered": "2018-12-28",
            "members": 8,
        },
        {
            "last_name" : "Hofe",
            "origin" : "daysman protevangelion",
            "date_registered": "2018-04-09",
            "members": 7,
        },
        {
            "last_name" : "Rueb",
            "origin" : "amniotome prolongment",
            "date_registered": "2018-04-23",
            "members": 6,
        },
        {
            "last_name" : "Gutreuter",
            "origin" : "smokewood predesign",
            "date_registered": "2018-11-26",
            "members": 4,
        },
        {
            "last_name" : "Turrey",
            "origin" : "unsmilingness unextortable",
            "date_registered": "2018-06-21",
            "members": 3,
        },
        {
            "last_name" : "Rickett",
            "origin" : "unimpressible unfinishedness",
            "date_registered": "2018-03-25",
            "members": 6,
        },
        {
            "last_name" : "Toa",
            "origin" : "epitaphic calibered",
            "date_registered": "2018-07-08",
            "members": 2,
        },
        {
            "last_name" : "Chiariello",
            "origin" : "urbanize seavy",
            "date_registered": "2018-09-10",
            "members": 6,
        },
        {
            "last_name" : "Kordiak",
            "origin" : "smalltime italics",
            "date_registered": "2018-09-15",
            "members": 2,
        },
        {
            "last_name" : "Media",
            "origin" : "pannum atheist",
            "date_registered": "2018-12-20",
            "members": 7,
        },
        {
            "last_name" : "Rentz",
            "origin" : "aerobian Iscariotic",
            "date_registered": "2018-05-02",
            "members": 6,
        },
        {
            "last_name" : "Toadvine",
            "origin" : "Dodonaeaceae triquetric",
            "date_registered": "2018-12-19",
            "members": 6,
        },
        {
            "last_name" : "Valent",
            "origin" : "sparrowtail piassava",
            "date_registered": "2018-08-16",
            "members": 1,
        },
        {
            "last_name" : "Varno",
            "origin" : "possessedness ultradolichocranial",
            "date_registered": "2018-01-07",
            "members": 3,
        },
        {
            "last_name" : "Margis",
            "origin" : "assaut fictitious",
            "date_registered": "2018-03-12",
            "members": 5,
        },
        {
            "last_name" : "Schreifels",
            "origin" : "backboned unbind",
            "date_registered": "2018-02-08",
            "members": 7,
        },
        {
            "last_name" : "Kalchik",
            "origin" : "conglobate unliveliness",
            "date_registered": "2018-11-23",
            "members": 2,
        },
        {
            "last_name" : "Benari",
            "origin" : "locky geelbec",
            "date_registered": "2018-09-17",
            "members": 3,
        },
        {
            "last_name" : "Glavan",
            "origin" : "Spathiflorae pleiotaxis",
            "date_registered": "2018-06-14",
            "members": 4,
        },
        {
            "last_name" : "Harootunian",
            "origin" : "forebody cearin",
            "date_registered": "2018-02-26",
            "members": 3,
        },
        {
            "last_name" : "Hun",
            "origin" : "nonfertility Bermuda",
            "date_registered": "2018-07-06",
            "members": 6,
        },
        {
            "last_name" : "Tieger",
            "origin" : "infamy dragonet",
            "date_registered": "2018-02-13",
            "members": 1,
        },
        {
            "last_name" : "Eveler",
            "origin" : "tossicated flecklessly",
            "date_registered": "2018-02-05",
            "members": 8,
        },
        {
            "last_name" : "Catinella",
            "origin" : "clipping tonograph",
            "date_registered": "2018-08-10",
            "members": 2,
        },
        {
            "last_name" : "Gebauer",
            "origin" : "virgula mammonist",
            "date_registered": "2018-02-04",
            "members": 6,
        },
        {
            "last_name" : "Wentworth",
            "origin" : "photomicroscopic tahr",
            "date_registered": "2018-08-13",
            "members": 8,
        },
        {
            "last_name" : "Spitz",
            "origin" : "cahow grinder",
            "date_registered": "2018-11-21",
            "members": 3,
        },
        {
            "last_name" : "Hilado",
            "origin" : "agariciform homophonous",
            "date_registered": "2018-07-19",
            "members": 7,
        },
        {
            "last_name" : "Rhinerson",
            "origin" : "revealed Lonk",
            "date_registered": "2018-08-03",
            "members": 3,
        },
        {
            "last_name" : "Freyer",
            "origin" : "westerner asparagus",
            "date_registered": "2018-12-27",
            "members": 7,
        },
        {
            "last_name" : "Geddis",
            "origin" : "secundiparity uniseriately",
            "date_registered": "2018-03-22",
            "members": 4,
        },
        {
            "last_name" : "Mccullum",
            "origin" : "Willy volubility",
            "date_registered": "2018-05-24",
            "members": 2,
        },
        {
            "last_name" : "Sarber",
            "origin" : "pyropus Mystacoceti",
            "date_registered": "2018-10-05",
            "members": 4,
        },
        {
            "last_name" : "Rankhorn",
            "origin" : "unsentimentalize studentless",
            "date_registered": "2018-05-20",
            "members": 8,
        },
        {
            "last_name" : "Setias",
            "origin" : "sphaerolite cardiogenic",
            "date_registered": "2018-10-26",
            "members": 7,
        },
        {
            "last_name" : "Recla",
            "origin" : "aleph cynophilist",
            "date_registered": "2018-02-12",
            "members": 8,
        },
        {
            "last_name" : "Gilcoine",
            "origin" : "hospodariate tyrannical",
            "date_registered": "2018-08-15",
            "members": 8,
        },
        {
            "last_name" : "Epson",
            "origin" : "goateed dipterad",
            "date_registered": "2018-11-10",
            "members": 8,
        },
        {
            "last_name" : "Kuennen",
            "origin" : "phonautograph lanterloo",
            "date_registered": "2018-08-11",
            "members": 6,
        },
        {
            "last_name" : "Siddon",
            "origin" : "cyananthrol gonophoric",
            "date_registered": "2018-02-20",
            "members": 8,
        },
        {
            "last_name" : "Bellemare",
            "origin" : "bovid Lenten",
            "date_registered": "2018-11-08",
            "members": 1,
        },
        {
            "last_name" : "Fischman",
            "origin" : "pachypod rompu",
            "date_registered": "2018-11-14",
            "members": 6,
        },
        {
            "last_name" : "Brunet",
            "origin" : "Cyclorrhapha oculistic",
            "date_registered": "2018-08-11",
            "members": 7,
        },
        {
            "last_name" : "Jeannoel",
            "origin" : "replenish unchaplain",
            "date_registered": "2018-08-08",
            "members": 3,
        },
        {
            "last_name" : "Kufeldt",
            "origin" : "anything stomatologic",
            "date_registered": "2018-03-08",
            "members": 1,
        },
        {
            "last_name" : "Ziraldo",
            "origin" : "iracundulous phosphorographic",
            "date_registered": "2018-05-22",
            "members": 3,
        },
        {
            "last_name" : "Marine",
            "origin" : "quadrifariously uncriminally",
            "date_registered": "2018-07-18",
            "members": 7,
        },
        {
            "last_name" : "Buttram",
            "origin" : "overfret Jaipuri",
            "date_registered": "2018-03-02",
            "members": 5,
        },
        {
            "last_name" : "Kelnhofer",
            "origin" : "visceroparietal nonuniversity",
            "date_registered": "2018-10-07",
            "members": 5,
        },
        {
            "last_name" : "Overdorf",
            "origin" : "cynarctomachy abutting",
            "date_registered": "2018-09-25",
            "members": 7,
        },
        {
            "last_name" : "Haigh",
            "origin" : "Planorbis unsymmetrically",
            "date_registered": "2018-08-04",
            "members": 2,
        },
        {
            "last_name" : "Sturgis",
            "origin" : "predicable empyema",
            "date_registered": "2018-06-17",
            "members": 3,
        },
        {
            "last_name" : "Danese",
            "origin" : "jara copastorate",
            "date_registered": "2018-09-22",
            "members": 3,
        },
        {
            "last_name" : "Casino",
            "origin" : "twitterboned salve",
            "date_registered": "2018-12-28",
            "members": 5,
        },
        {
            "last_name" : "Saemenes",
            "origin" : "nonaccess chirk",
            "date_registered": "2018-07-26",
            "members": 1,
        },
        {
            "last_name" : "Colondres",
            "origin" : "pumice griffaun",
            "date_registered": "2018-01-09",
            "members": 5,
        },
        {
            "last_name" : "Goethals",
            "origin" : "meeting unsuccessively",
            "date_registered": "2018-12-06",
            "members": 2,
        },
        {
            "last_name" : "Kriete",
            "origin" : "unsulky interprofessional",
            "date_registered": "2018-09-26",
            "members": 2,
        },
        {
            "last_name" : "Wickland",
            "origin" : "dehorter Aceratherium",
            "date_registered": "2018-08-21",
            "members": 4,
        },
        {
            "last_name" : "Kistenmacher",
            "origin" : "megatypy prebestowal",
            "date_registered": "2018-01-27",
            "members": 6,
        },
        {
            "last_name" : "Melich",
            "origin" : "versability surgical",
            "date_registered": "2018-05-12",
            "members": 3,
        },
        {
            "last_name" : "Backues",
            "origin" : "overcleverness chat",
            "date_registered": "2018-12-27",
            "members": 6,
        },
        {
            "last_name" : "Olszowka",
            "origin" : "bracteate Proreptilia",
            "date_registered": "2018-12-21",
            "members": 7,
        },
        {
            "last_name" : "Childres",
            "origin" : "Polynemidae encorbelment",
            "date_registered": "2018-04-10",
            "members": 6,
        },
        {
            "last_name" : "Peifer",
            "origin" : "playingly Talmud",
            "date_registered": "2018-03-03",
            "members": 8,
        },
        {
            "last_name" : "Gonsalez",
            "origin" : "swingletail subthalamic",
            "date_registered": "2018-01-25",
            "members": 2,
        },
        {
            "last_name" : "Guyon",
            "origin" : "Eurypterus unpilgrimlike",
            "date_registered": "2018-06-19",
            "members": 7,
        },
        {
            "last_name" : "Sellen",
            "origin" : "deckhead aristulate",
            "date_registered": "2018-06-15",
            "members": 5,
        },
        {
            "last_name" : "Mailo",
            "origin" : "naturize janitrix",
            "date_registered": "2018-07-21",
            "members": 4,
        },
        {
            "last_name" : "Debruler",
            "origin" : "sculpturesqueness unsinewing",
            "date_registered": "2018-09-02",
            "members": 8,
        },
        {
            "last_name" : "Maricle",
            "origin" : "foretaster sullage",
            "date_registered": "2018-04-21",
            "members": 3,
        },
        {
            "last_name" : "Orcutt",
            "origin" : "posteen cacographical",
            "date_registered": "2018-06-17",
            "members": 4,
        },
        {
            "last_name" : "Phanco",
            "origin" : "nonretention bhoosa",
            "date_registered": "2018-08-21",
            "members": 6,
        },
        {
            "last_name" : "Kleftogiannis",
            "origin" : "acetous perivascular",
            "date_registered": "2018-12-09",
            "members": 5,
        },
        {
            "last_name" : "Cambria",
            "origin" : "tannogallate needlemaker",
            "date_registered": "2018-06-03",
            "members": 3,
        },
        {
            "last_name" : "Snoke",
            "origin" : "hopeite dragomanate",
            "date_registered": "2018-02-25",
            "members": 5,
        },
        {
            "last_name" : "Yambao",
            "origin" : "bebless sacramentarian",
            "date_registered": "2018-09-01",
            "members": 7,
        }
    ];
}