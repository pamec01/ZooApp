import React, {useEffect} from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes, Route, Redirect} from "react-router-dom";

import Navbar from "./layout/Navbar";

import Navigace from "./pages/Navigace";
import ProtectedRoute from "./layout/ProtectedRoute";
import {SharedStateProvider} from "./utils/SharedStateContext";

import {user, admin} from "./utils/Auth";

import Pece from "./pages/pece/Pece";
import AddPece from "./pages/pece/Add";
import ViewPece from "./pages/pece/View";
import EditPece from "./pages/pece/Edit";
import Druh from "./pages/druh/Druh";
import ViewDruh from "./pages/druh/View";
import EditDruh from "./pages/druh/Edit";
import AddDruh from "./pages/druh/Add";
import Krmeni from "./pages/krmeni/Krmeni";
import ViewKrmeni from "./pages/krmeni/View";
import EditKrmeni from "./pages/krmeni/Edit";
import AddKrmeni from "./pages/krmeni/Add";
import Osetrovatel from "./pages/osetrovatel/Osetrovatel";
import ViewOsetrovatel from "./pages/osetrovatel/View";
import EditOsetrovatel from "./pages/osetrovatel/Edit";
import AddOsetrovatel from "./pages/osetrovatel/Add";
import Medikament from "./pages/medikament/Medikament";
import ViewMedikament from "./pages/medikament/View";
import EditMedikament from "./pages/medikament/Edit";
import AddMedikament from "./pages/medikament/Add";
import MedikamentZvire from "./pages/medikamentZvire/MedikamentZvire";
import ViewMedikamentZvire from "./pages/medikamentZvire/View";
import EditMedikamentZvire from "./pages/medikamentZvire/Edit";
import AddMedikamentZvire from "./pages/medikamentZvire/Add";
import Nemocnost from "./pages/nemocnost/Nemocnost";
import ViewNemocnost from "./pages/nemocnost/View";
import EditNemocnost from "./pages/nemocnost/Edit";
import AddNemocnost from "./pages/nemocnost/Add";
import PeceZvire from "./pages/peceZvire/PeceZvire";
import ViewPeceZvire from "./pages/peceZvire/View";
import EditPeceZvire from "./pages/peceZvire/Edit";
import AddPeceZvire from "./pages/peceZvire/Add";
import Suchozemske from "./pages/suchozemske/Suchozemske";
import ViewSuchozemske from "./pages/suchozemske/View";
import EditSuchozemske from "./pages/suchozemske/Edit";
import AddSuchozemske from "./pages/suchozemske/Add";
import Umisteni from "./pages/umisteni/Umisteni";
import ViewUmisteni from "./pages/umisteni/View";
import EditUmisteni from "./pages/umisteni/Edit";
import AddUmisteni from "./pages/umisteni/Add";
import Vodni from "./pages/vodni/Vodni";
import ViewVodni from "./pages/vodni/View";
import EditVodni from "./pages/vodni/Edit";
import AddVodni from "./pages/vodni/Add";
import TypVody from "./pages/typVody/TypVody";
import ViewTypVody from "./pages/typVody/View";
import EditTypVody from "./pages/typVody/Edit";
import AddTypVody from "./pages/typVody/Add";
import ViewZvire from "./pages/zvire/View";
import EditZvire from "./pages/zvire/Edit";
import AddZvire from "./pages/zvire/Add";
import Zvire from "./pages/zvire/Zvire";
import ZvireKrmeni from "./pages/zvireKrmeni/ZvireKrmeni";
import ViewZvireKrmeni from "./pages/zvireKrmeni/View";
import EditZvireKrmeni from "./pages/zvireKrmeni/Edit";
import AddZvireKrmeni from "./pages/zvireKrmeni/Add";
import ViewUzivatel from "./pages/uzivatel/View";
import EditUzivatel from "./pages/uzivatel/Edit";
import AddUzivatel from "./pages/uzivatel/Add";
import Uzivatel from "./pages/uzivatel/Uzivatel";
import ViewSoubor from "./pages/soubor/View";
import EditSoubor from "./pages/soubor/Edit";
import AddSoubor from "./pages/soubor/Add";
import Soubor from "./pages/soubor/Soubor";
import HiearchieView from "./pages/hiearchieView/HiearchieView";
import LoggingTable from "./pages/loggingTable/LoggingTable";
import AnalyzaPlatuView from "./pages/AnalyzaPlatuView/AnalyzaPlatuView";
import PodrizeniView from "./pages/PodrizeniView/PodrizeniView";
import PocetPodaniView from "./pages/pocetPodaniView/PocetPodaniView";
import FunkceView from "./pages/funkceView/FunkceView";
import ObjektyView from "./pages/objektyView/ObjektyView";

function App() {
  return (
      <div className="App">
        <SharedStateProvider>
          <Router>
            <Navbar/>
            <Routes>
              <Route exact path="/navigace" element={<Navigace/>}/>

              <Route exact path="/pece" element={<ProtectedRoute Role={user} children={<Pece/>}/>}/>
              <Route exact path="/pece/view/:id" element={<ProtectedRoute Role={user} children={<ViewPece/>}/>}/>
              <Route exact path="/pece/edit/:id" element={<ProtectedRoute Role={user} children={<EditPece/>}/>}/>
              <Route exact path="/pece/add" element={<ProtectedRoute Role={user} children={<AddPece/>}/>}/>

              <Route exact path="/druh" element={<ProtectedRoute Role={user} children={<Druh/>}/>}/>
              <Route exact path="/druh/view/:id" element={<ProtectedRoute Role={user} children={<ViewDruh/>}/>}/>
              <Route exact path="/druh/edit/:id" element={<ProtectedRoute Role={user} children={<EditDruh/>}/>}/>
              <Route exact path="/druh/add" element={<ProtectedRoute Role={user} children={<AddDruh/>}/>}/>

              <Route exact path="/krmeni" element={<ProtectedRoute Role={user} children={<Krmeni/>}/>}/>
              <Route exact path="/krmeni/view/:id" element={<ProtectedRoute Role={user} children={<ViewKrmeni/>}/>}/>
              <Route exact path="/krmeni/edit/:id" element={<ProtectedRoute Role={user} children={<EditKrmeni/>}/>}/>
              <Route exact path="/krmeni/add" element={<ProtectedRoute Role={user} children={<AddKrmeni/>}/>}/>

              <Route exact path="/osetrovatel" element={<ProtectedRoute Role={user} children={<Osetrovatel/>}/>}/>
              <Route exact path="/osetrovatel/view/:id" element={<ProtectedRoute Role={user} children={<ViewOsetrovatel/>}/>}/>
              <Route exact path="/osetrovatel/edit/:id" element={<ProtectedRoute Role={user} children={<EditOsetrovatel/>}/>}/>
              <Route exact path="/osetrovatel/add" element={<ProtectedRoute Role={user} children={<AddOsetrovatel/>}/>}/>

              <Route exact path="/medikament" element={<ProtectedRoute Role={user} children={<Medikament/>}/>}/>
              <Route exact path="/medikament/view/:id" element={<ProtectedRoute Role={user} children={<ViewMedikament/>}/>}/>
              <Route exact path="/medikament/edit/:id" element={<ProtectedRoute Role={user} children={<EditMedikament/>}/>}/>
              <Route exact path="/medikament/add" element={<ProtectedRoute Role={user} children={<AddMedikament/>}/>}/>

              <Route exact path="/medikament-zvire" element={<ProtectedRoute Role={user} children={<MedikamentZvire/>}/>}/>
              <Route exact path="/medikament-zvire/view/:id" element={<ProtectedRoute Role={user} children={<ViewMedikamentZvire/>}/>}/>
              <Route exact path="/medikament-zvire/edit/:id" element={<ProtectedRoute Role={user} children={<EditMedikamentZvire/>}/>}/>
              <Route exact path="/medikament-zvire/add" element={<ProtectedRoute Role={user} children={<AddMedikamentZvire/>}/>}/>

              <Route exact path="/nemocnost" element={<ProtectedRoute Role={user} children={<Nemocnost/>}/>}/>
              <Route exact path="/nemocnost/view/:id" element={<ProtectedRoute Role={user} children={<ViewNemocnost/>}/>}/>
              <Route exact path="/nemocnost/edit/:id" element={<ProtectedRoute Role={user} children={<EditNemocnost/>}/>}/>
              <Route exact path="/nemocnost/add" element={<ProtectedRoute Role={user} children={<AddNemocnost/>}/>}/>

              <Route exact path="/pece-zvire" element={<ProtectedRoute Role={user} children={<PeceZvire/>}/>}/>
              <Route exact path="/pece-zvire/view/:id" element={<ProtectedRoute Role={user} children={<ViewPeceZvire/>}/>}/>
              <Route exact path="/pece-zvire/edit/:id" element={<ProtectedRoute Role={user} children={<EditPeceZvire/>}/>}/>
              <Route exact path="/pece-zvire/add" element={<ProtectedRoute Role={user} children={<AddPeceZvire/>}/>}/>

              <Route exact path="/suchozemske" element={<ProtectedRoute Role={user} children={<Suchozemske/>}/>}/>
              <Route exact path="/suchozemske/view/:id" element={<ProtectedRoute Role={user} children={<ViewSuchozemske/>}/>}/>
              <Route exact path="/suchozemske/edit/:id" element={<ProtectedRoute Role={user} children={<EditSuchozemske/>}/>}/>
              <Route exact path="/suchozemske/add" element={<ProtectedRoute Role={user} children={<AddSuchozemske/>}/>}/>

              <Route exact path="/umisteni" element={<ProtectedRoute Role={user} children={<Umisteni/>}/>}/>
              <Route exact path="/umisteni/view/:id" element={<ProtectedRoute Role={user} children={<ViewUmisteni/>}/>}/>
              <Route exact path="/umisteni/edit/:id" element={<ProtectedRoute Role={user} children={<EditUmisteni/>}/>}/>
              <Route exact path="/umisteni/add" element={<ProtectedRoute Role={user} children={<AddUmisteni/>}/>}/>

              <Route exact path="/vodni" element={<ProtectedRoute Role={user} children={<Vodni/>}/>}/>
              <Route exact path="/vodni/view/:id" element={<ProtectedRoute Role={user} children={<ViewVodni/>}/>}/>
              <Route exact path="/vodni/edit/:id" element={<ProtectedRoute Role={user} children={<EditVodni/>}/>}/>
              <Route exact path="/vodni/add" element={<ProtectedRoute Role={user} children={<AddVodni/>}/>}/>

              <Route exact path="/typ-vody" element={<ProtectedRoute Role={user} children={<TypVody/>}/>}/>
              <Route exact path="/typ-vody/view/:id" element={<ProtectedRoute Role={user} children={<ViewTypVody/>}/>}/>
              <Route exact path="/typ-vody/edit/:id" element={<ProtectedRoute Role={user} children={<EditTypVody/>}/>}/>
              <Route exact path="/typ-vody/add" element={<ProtectedRoute Role={user} children={<AddTypVody/>}/>}/>


              <Route exact path="/zvire" element={<ProtectedRoute Role={user} children={<Zvire/>}/>}/>
              <Route exact path="/zvire/view/:id" element={<ProtectedRoute Role={user} children={<ViewZvire/>}/>}/>
              <Route exact path="/zvire/edit/:id" element={<ProtectedRoute Role={user} children={<EditZvire/>}/>}/>
              <Route exact path="/zvire/add" element={<ProtectedRoute Role={user} children={<AddZvire/>}/>}/>

              <Route exact path="/zvire-krmeni" element={<ProtectedRoute Role={user} children={<ZvireKrmeni/>}/>}/>
              <Route exact path="/zvire-krmeni/view/:id"
                     element={<ProtectedRoute Role={user} children={<ViewZvireKrmeni/>}/>}/>
              <Route exact path="/zvire-krmeni/edit/:id"
                     element={<ProtectedRoute Role={user} children={<EditZvireKrmeni/>}/>}/>
              <Route exact path="/zvire-krmeni/add"
                     element={<ProtectedRoute Role={user} children={<AddZvireKrmeni/>}/>}/>

              <Route exact path="/soubor" element={<ProtectedRoute Role={admin} children={<Soubor/>}/>}/>
              <Route exact path="/soubor/view/:id" element={<ProtectedRoute Role={admin} children={<ViewSoubor/>}/>}/>
              <Route exact path="/soubor/edit/:id" element={<ProtectedRoute Role={admin} children={<EditSoubor/>}/>}/>
              <Route exact path="/soubor/add" element={<ProtectedRoute Role={admin} children={<AddSoubor/>}/>}/>

              {/*ADMIN*/}
              <Route exact path="/uzivatel" element={<ProtectedRoute Role={admin} children={<Uzivatel/>}/>}/>
              <Route exact path="/uzivatel/view/:id"
                     element={<ProtectedRoute Role={admin} children={<ViewUzivatel/>}/>}/>
              <Route exact path="/uzivatel/edit/:id"
                     element={<ProtectedRoute Role={admin} children={<EditUzivatel/>}/>}/>
              <Route exact path="/uzivatel/add" element={<ProtectedRoute Role={admin} children={<AddUzivatel/>}/>}/>

              <Route exact path="/logging-table" element={<ProtectedRoute Role={admin} children={<LoggingTable/>}/>}/>

              {/*VIEWS*/}
              <Route exact path="/hiearchie-view" element={<ProtectedRoute Role={user} children={<HiearchieView/>}/>}/>
              <Route exact path="/funkce-view" element={<ProtectedRoute Role={user} children={<FunkceView/>}/>}/>
              <Route exact path="/pocet-podani-view" element={<ProtectedRoute Role={user} children={<PocetPodaniView/>}/>}/>

              <Route exact path="/analyza-platu-view" element={<ProtectedRoute Role={admin} children={<AnalyzaPlatuView/>}/>}/>
              <Route exact path="/objekty-view" element={<ProtectedRoute Role={admin} children={<ObjektyView/>}/>}/>
              <Route exact path="/podrizeni-view" element={<ProtectedRoute Role={admin} children={<PodrizeniView/>}/>}/>

              {/*Fallback*/}
              <Route path="*" element={<Navigace/>} />
            </Routes>
          </Router>
        </SharedStateProvider>
      </div>
  );
}

export default App;
